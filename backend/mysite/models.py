

from django.db import models
from django.contrib.auth.models import AbstractUser
from operator import itemgetter
import uuid



class Tweet(models.Model):
  uid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  content = models.TextField()
  postedBy = models.ForeignKey('User', on_delete=models.CASCADE)
  isReply = models.BooleanField(default=False)
  parentTweet = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
  childTweets = models.ManyToManyField('self', related_name="child_tweets", symmetrical=False, blank=True)
  createdAt = models.DateTimeField(auto_now_add=True)

  '''
  @classmethod
  def create(cls, postedBy, content):
    tweet = cls(postedBy=postedBy, content=content)
    return tweet
  '''
  
  def as_json(self):
    _timestamp = int(self.createdAt.timestamp() * 1000)
    return {
      'content': self.content,
      'timestamp': _timestamp,
      'uid': self.uid,
      'postedBy': {
        'avatar': self.postedBy.avatar,
        'biography': self.postedBy.biography,
        'birthday': self.postedBy.birthday,
        'location': self.postedBy.location,
        'name': self.postedBy.name,
        'uid': self.postedBy.uid,
        'username': self.postedBy.username,
        'website': self.postedBy.website,
      }
    }
  
  def add_parent_tweet(self, tweetObj):
    if self.parentTweet != None:
      self.parentTweet.clear()
    self.parentTweet = tweetObj
  
  def add_child_tweet(self, tweetObj):
    self.childTweets.add(tweetObj)
  
  def remove_parent_tweet(self):
    self.parentTweet.clear()
  
  def remove_child_tweet(self, tweetObj):
    self.childTweets.remove(tweetObj)
  
  def get_replies(self):
    res = [tweetObj.as_json() for tweetObj in self.childTweets.all()]
    res = sorted(res, key=itemgetter('timestamp'), reverse=True)
    return res
  
  def is_not_reply(self):
    return not self.isReply



#class User(AbstractUser):
class User(models.Model):
  uid = models.TextField(unique=True)

  tweets = models.ManyToManyField(Tweet, related_name="tweets", symmetrical=False, blank=True)
  following = models.ManyToManyField('self', related_name="follows", symmetrical=False, blank=True)
  followers = models.ManyToManyField('self', related_name="followed_by", symmetrical=False, blank=True)
  likes = models.ManyToManyField(Tweet, related_name="likes", symmetrical=False, blank=True)
  lists = models.ManyToManyField(Tweet, related_name="lists", symmetrical=False, blank=True)
  moments = models.ManyToManyField(Tweet, related_name="moments", symmetrical=False, blank=True)

  avatar = models.TextField(default="/static/images/profile-image.jpg")
  biography = models.TextField(default='')
  birthday = models.TextField(default='')
  location = models.TextField(default='')
  name = models.TextField()
  username = models.TextField(unique=True)
  website = models.TextField(default='')
  createdAt = models.DateTimeField(auto_now_add=True)


  @classmethod
  def create(cls, uid, name, username):
    user = cls(uid=uid, name=name, username=username)
    return user

  def as_json(self):
    return {
      'uid': self.uid,
      'tweets': [tweet.uid for tweet in self.tweets.all()],
      'following': [user.uid for user in self.following.all()],
      'followers': [user.uid for user in self.followers.all()],
      'likes': [tweet.uid for tweet in self.likes.all()],
      'lists': [tweet.uid for tweet in self.lists.all()],
      'moments': [tweet.uid for tweet in self.moments.all()],
      'avatar': self.avatar,
      'biography': self.biography,
      'birthday': self.birthday,
      'location': self.location,
      'name': self.name,
      'username': self.username,
      'website': self.website,
      'createdAt': self.createdAt,
    }

  def as_simple_json(self):
    return {
      'uid': self.uid,
      'avatar': self.avatar,
      'biography': self.biography,
      'birthday': self.birthday,
      'location': self.location,
      'name': self.name,
      'username': self.username,
      'website': self.website,
      'createdAt': self.createdAt,
    }
  
  def add_tweet(self, tweetObj):
    self.tweets.add(tweetObj)
  
  def delete_tweet(self, tweetObj):
    self.tweets.remove(tweetObj)
  
  def follow(self, userObj):
    self.following.add(userObj)
  
  def unfollow(self, userObj):
    self.following.remove(userObj)
  
  def add_follower(self, userObj):
    self.followers.add(userObj)
  
  def remove_follower(self, userObj):
    self.followers.remove(userObj)
  
  def check_following(self, targetUserObj):
    return targetUserObj in self.following.all()
  
  def like(self, tweetObj):
    self.likes.add(tweetObj)
    return True

  def unlike(self, tweetObj):
    self.likes.remove(tweetObj)
    return True

  def check_like(self, tweetObj):
    return tweetObj in self.likes.all()

  def get_likes(self):
    res = [tweet.as_json() for tweet in self.likes.all()]
    return res[::-1]

  def get_following_list(self):
    return [user.as_simple_json() for user in self.following.all()]
  
  def get_followers_list(self):
    return [user.as_simple_json() for user in self.followers.all()]

  def get_num_tweets(self):
    return self.tweets.all().count()

  def get_num_following(self):
    return self.following.all().count()

  def get_num_followers(self):
    return self.followers.all().count()

  def get_num_likes(self):
    return self.likes.all().count()

  def get_num_lists(self):
    return self.lists.all().count()

  def get_num_moments(self):
    return self.moments.all().count()

