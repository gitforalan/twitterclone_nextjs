from django.urls import path
from . import views 


urlpatterns = [

  path('tweets/', views.TweetList.as_view()),
  path('tweets/<int:pk>/', views.TweetDetail.as_view()), 

  path('users/', views.UserList.as_view()),
  path('users/<int:pk>/', views.UserDetail.as_view()),

  path('searchtweet/', views.searchTweet),

  path('getpostfeed/', views.getPostFeed),
  path('getuserfeed/', views.getUserFeed),
  path('getreplies/', views.getReplies),
  path('liketweet/', views.likeTweet),
  path('unliketweet/', views.unlikeTweet),
  path('addtweet/', views.addTweet),
  path('addreply/', views.addReply),
  path('deletetweet/', views.deleteTweet),
  path('getlikedtweets/', views.getLikedTweets),
  path('gettweetbyid/', views.getTweetById),

  path('getfollowing/', views.getFollowing),
  path('getfollowers/', views.getFollowers),

  path('checkifuseridexists/', views.checkIfUserIdExists),
  path('checkifusernameexists/', views.checkIfUsernameExists),
  
  path('registeruser/', views.registerUser),
  path('getuserbyid/', views.getUserById),
  path('getuserbyusername/', views.getUserByUsername),
  path('follow/', views.follow),
  path('unfollow/', views.unfollow),



]