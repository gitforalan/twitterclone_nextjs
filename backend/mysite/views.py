from rest_framework import generics
from . import models
from . import serializers
import json
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from operator import itemgetter
from django.core.exceptions import ValidationError
import datetime
import math


FEED_BATCH_SIZE = 50
REPLY_BATCH_SIZE = 10
FOLLOWING_BATCH_SIZE = 3
FOLLOWERS_BATCH_SIZE = 3

@csrf_exempt
def addTweet(request):
  params = json.loads(request.body)
  currentUserId = params['currentUserId']
  content = params['content']
  currentUser = models.User.objects.get(uid=currentUserId)
  tweet = models.Tweet(postedBy=currentUser, content=content)
  tweet.save()
  currentUser.add_tweet(tweet)
  return JsonResponse(tweet.as_json())
  


@csrf_exempt
def addReply(request):
  params = json.loads(request.body)
  currentUserId = params['currentUserId']
  parentTweetId = params['parentTweetId']
  content = params['content']
  currentUser = models.User.objects.get(uid=currentUserId)
  parentTweet = models.Tweet.objects.get(uid=parentTweetId)
  tweet = models.Tweet(
    postedBy=currentUser,
    content=content,
    parentTweet=parentTweet,
    isReply=True,
  )
  tweet.save()
  parentTweet.add_child_tweet(tweet)
  tweet.save()
  parentTweet.save()
  currentUser.add_tweet(tweet)
  currentUser.save()
  return JsonResponse(tweet.as_json())



@csrf_exempt
def deleteTweet(request):
  params = json.loads(request.body)
  currentUserId = params['currentUserId']
  deletedTweetId = params['deletedTweetId']
  user = models.User.objects.get(uid=currentUserId)
  tweet = models.Tweet.objects.get(uid=deletedTweetId)
  tweetjson = tweet.as_json()
  user.delete_tweet(tweet)
  tweet.delete()
  return JsonResponse(tweetjson)
  



@csrf_exempt
def likeTweet(request):
  params = json.loads(request.body)
  likedTweetId = params['likedTweetId']
  currentUserId = params['currentUserId']
  tweet = models.Tweet.objects.get(uid=likedTweetId)
  user = models.User.objects.get(uid=currentUserId)
  return JsonResponse({ 'success':user.like(tweet) })
  
  

@csrf_exempt
def unlikeTweet(request):
  params = json.loads(request.body)
  unlikedTweetId = params['unlikedTweetId']
  currentUserId = params['currentUserId']
  tweet = models.Tweet.objects.get(uid=unlikedTweetId)
  user = models.User.objects.get(uid=currentUserId)
  return JsonResponse({ 'success':user.unlike(tweet) })
  


def searchTweet(request):
  query = request.GET['query']
  if query:
    tweets = models.Tweet.objects.filter(content__contains=query)
    res = [tweet.as_json() for tweet in tweets]
    res = sorted(res, key=itemgetter('timestamp'), reverse=True)
    return JsonResponse({ 'tweets':res })
  return JsonResponse({ 'tweets':[] })
  
    


def getPostFeed(request):
  
  currentUserId = request.GET['currentUserId']
  count = int( request.GET['count'] )
  timestamp = request.GET['timestamp']
  timestamp = datetime.datetime.fromtimestamp(
    math.floor(float(timestamp) / 1000.0)
  )

  currentUser = models.User.objects.get(uid=currentUserId)
  userIdList = [user.uid for user in currentUser.following.all()] + [currentUser.uid]

  queryset = models.Tweet.objects.filter(
    postedBy__uid__in=userIdList,
    createdAt__lt=timestamp,
    isReply=False,
  ).order_by('-createdAt')

  tweets = queryset[count*FEED_BATCH_SIZE : (count+1)*FEED_BATCH_SIZE]
  nextLength = len(queryset[(count+1)*FEED_BATCH_SIZE : (count+2)*FEED_BATCH_SIZE])

  res = [tweet.as_json() for tweet in tweets]
  return JsonResponse({ 'tweets':res, 'nextLength':nextLength })
  



def getUserFeed(request):
  targetUserId = request.GET['targetUserId']
  count = int( request.GET['count'] )
  timestamp = request.GET['timestamp']
  timestamp = datetime.datetime.fromtimestamp(
    math.floor(float(timestamp) / 1000.0)
  )

  queryset = models.Tweet.objects.filter(
    postedBy__uid=targetUserId,
    createdAt__lt=timestamp,
    isReply=False,
  ).order_by('-createdAt')

  tweets = queryset[count*FEED_BATCH_SIZE : (count+1)*FEED_BATCH_SIZE]
  nextLength = len(queryset[(count+1)*FEED_BATCH_SIZE : (count+2)*FEED_BATCH_SIZE])

  res = [tweet.as_json() for tweet in tweets]
  return JsonResponse({ 'tweets':res, 'nextLength':nextLength })




def getLikedTweets(request):
  userId = request.GET['userId']
  count = int( request.GET['count'] )
  timestamp = request.GET['timestamp']
  timestamp = datetime.datetime.fromtimestamp(
    math.floor(float(timestamp) / 1000.0)
  )

  user = models.User.objects.get(uid=userId)
  queryset = user.get_likes()

  res = queryset[count*FEED_BATCH_SIZE : (count+1)*FEED_BATCH_SIZE]
  nextLength = len(queryset[(count+1)*FEED_BATCH_SIZE : (count+2)*FEED_BATCH_SIZE])

  return JsonResponse({ 'tweets':res, 'nextLength':nextLength })


 


def getReplies(request):
  parentTweetId = request.GET['parentTweetId']
  try:
    count = request.GET['count']
  except:
    return JsonResponse({ 'replies':[] })
  count = int(count)
  timestamp = request.GET['timestamp']
  timestamp = datetime.datetime.fromtimestamp(
    math.floor(float(timestamp) / 1000.0)
  )

  queryset = models.Tweet.objects.filter(
    parentTweet__uid=parentTweetId,
    createdAt__lt=timestamp,
  ).order_by('-createdAt')

  tweets = queryset[count*REPLY_BATCH_SIZE : (count+1)*REPLY_BATCH_SIZE]
  nextLength = len(queryset[(count+1)*FEED_BATCH_SIZE : (count+2)*FEED_BATCH_SIZE])

  res = [tweet.as_json() for tweet in tweets]
  return JsonResponse({ 'replies':res, 'nextLength':nextLength })






def getTweetById(request):
  tweetId = request.GET['tweetId']
  tweet = models.Tweet.objects.get(uid=tweetId)
  return JsonResponse(tweet.as_json())
  



def getFollowing(request):
  targetUserId = request.GET['targetUserId']
  numCol = int( request.GET['numCol'] )
  count = int( request.GET['count'] )
  BATCH_SIZE = 12 if numCol==2 else 18
  targetUser = models.User.objects.get(uid=targetUserId)
  followingList = targetUser.get_following_list()
  res = followingList[
    count*BATCH_SIZE : (count+1)*BATCH_SIZE
  ]
  return JsonResponse({"result": res})



def getFollowers(request):
  targetUserId = request.GET['targetUserId']
  numCol = int( request.GET['numCol'] )
  count = int( request.GET['count'] )
  BATCH_SIZE = 12 if numCol==2 else 18
  targetUser = models.User.objects.get(uid=targetUserId)
  followersList = targetUser.get_followers_list()
  res = followersList[
    count*BATCH_SIZE : (count+1)*BATCH_SIZE
  ]
  return JsonResponse({"result": res})



@csrf_exempt
def follow(request):
  params = json.loads(request.body)
  currentUserId = params['currentUserId']
  followingUserId = params['followingUserId']
  currentUser = models.User.objects.get(uid=currentUserId)
  userIveJustFollowed = models.User.objects.get(uid=followingUserId)
  currentUser.follow(userIveJustFollowed)
  userIveJustFollowed.add_follower(currentUser)
  return JsonResponse({ 'success':True })
  


@csrf_exempt
def unfollow(request):
  params = json.loads(request.body)
  currentUserId = params['currentUserId']
  unfollowingUserId = params['unfollowingUserId']
  currentUser = models.User.objects.get(uid=currentUserId)
  userIveJustUnfollowed = models.User.objects.get(uid=unfollowingUserId)
  currentUser.unfollow(userIveJustUnfollowed)
  userIveJustUnfollowed.remove_follower(currentUser)
  return JsonResponse({ 'success':True })
  


def getUserById(request):
  uid = request.GET['uid']
  try:
    user = models.User.objects.get(uid=uid)
    return JsonResponse(user.as_json())
  except:
    return JsonResponse({})
  


def getUserByUsername(request):
  username = request.GET['username']
  user = models.User.objects.get(username=username)
  return JsonResponse(user.as_json())
  


@csrf_exempt
def registerUser(request):
  params = json.loads(request.body)
  uid = params['uid']
  name = params['name']
  username = params['username']
  user = models.User(uid=uid, name=name, username=username)
  user.save()
  return JsonResponse(user.as_json())



def checkIfUserIdExists(request):
  userId = request.GET['userId']
  try:
    user = models.User.objects.get(uid=userId)
  except:
    return JsonResponse({'res': False})
  if user.uid == userId:
    return JsonResponse({'res': True})
  return JsonResponse({'res': False})



def checkIfUsernameExists(request):
  username = request.GET['username']
  try:
    user = models.User.objects.get(username=username)
  except:
    return JsonResponse({'res': False})
  if user.username == username:
    return JsonResponse({'res': True})
  return JsonResponse({'res': False})












class UserList(generics.ListCreateAPIView):
  queryset = models.User.objects.all()
  serializer_class = serializers.UserSerializer

class UserDetail(generics.ListAPIView):
  queryset = models.User.objects.all()
  serializer_class = serializers.UserSerializer





class TweetList(generics.ListCreateAPIView):
  queryset = models.Tweet.objects.all()
  serializer_class = serializers.TweetSerializer

class TweetDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = models.Tweet.objects.all()
  serializer_class = serializers.TweetSerializer



