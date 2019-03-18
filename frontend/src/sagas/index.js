
import {all} from 'redux-saga/effects';
import {takeEvery, takeLatest, take, call, put, fork} from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../api';
import Router from "next/router";








function* setTargetUserFollowing(payload){
  try{
    const result = yield call(
      api.getFollowing,
      payload.targetUserId,
      payload.numCol,
      payload.count,
    );
    yield put(actions.setTargetUserFollowingSuccess({
      following: result.data.result,
      isInit: payload.isInit
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to get the users'
    }));
  }
}

function* watchSetTargetUserFollowingRequest(){
  while(true){
    const {payload} = yield take(actions.Types.SET_TARGET_USER_FOLLOWING);
    yield call(setTargetUserFollowing, payload);
  }
}




function* setTargetUserFollowers(payload){
  try{
    const result = yield call(
      api.getFollowers,
      payload.targetUserId,
      payload.numCol,
      payload.count,
    );
    yield put(actions.setTargetUserFollowersSuccess({
      followers: result.data.result,
      isInit: payload.isInit
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to get the users'
    }));
  }
}

function* watchSetTargetUserFollowersRequest(){
  while(true){
    const {payload} = yield take(actions.Types.SET_TARGET_USER_FOLLOWERS);
    yield call(setTargetUserFollowers, payload);
  }
}



function* setCurrentUserById(userId){
  try{
    const result = yield call(api.getUserById, userId);
    yield put(actions.setCurrentUserByIdSuccess({
      currentUser: result.data
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to get the users'
    }));
  }
}

function* watchSetCurrentUserByIdRequest(){
  while(true){
    const {payload} = yield take(actions.Types.SET_CURRENT_USER_BY_ID);
    yield call(setCurrentUserById, payload.userId);
  }
}


function* setTargetUserByUsername(username){
  try{
    const result = yield call(api.getUserByUsername, username);
    yield put(actions.setTargetUserByUsernameSuccess({
      targetUser: result.data
    }));
  }catch(e){
    Router.push("/pagedoesnotexist");
    yield put(actions.usersError({
      error: 'An error occurred when trying to get the users'
    }));
  }
}

function* watchSetTargetUserByUsernameRequest(){
  while(true){
    const {payload} = yield take(actions.Types.SET_TARGET_USER_BY_USERNAME);
    yield call(setTargetUserByUsername, payload.username);
  }
}











function* setPostFeed(payload){
  try{
    const result = yield call(
      api.getPostFeed,
      payload.userId,
      payload.bottomCount,
      payload.timestamp,
    );
    yield put(actions.setPostFeedSuccess({
      tweets: result.data.tweets,
      nextLength: result.data.nextLength,
      isInit: payload.isInit,
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to get the users'
    }));
  }
}

function* watchSetPostFeedRequest(){
  while(true){
    const {payload} = yield take(actions.Types.SET_POST_FEED);
    yield call(setPostFeed, payload);
  }
}


function* setUserFeed(payload){
  try{
    const result = yield call(
      api.getUserFeed,
      payload.userId,
      payload.bottomCount,
      payload.timestamp,
    );
    yield put(actions.setUserFeedSuccess({
      tweets: result.data.tweets,
      nextLength: result.data.nextLength,
      isInit: payload.isInit,
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to get the users'
    }));
  }
}

function* watchSetUserFeedRequest(){
  while(true){
    const {payload} = yield take(actions.Types.SET_USER_FEED);
    yield call(setUserFeed, payload);
  }
}

function* setLikedTweets(payload){
  try{
    const result = yield call(
      api.getLikedTweets,
      payload.userId,
      payload.bottomCount,
      payload.timestamp
    );
    yield put(actions.setLikedTweetsSuccess({
      tweets: result.data.tweets,
      nextLength: result.data.nextLength,
      isInit: payload.isInit,
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to get the users'
    }));
  }
}

function* watchSetLikedTweetsRequest(){
  while(true){
    const {payload} = yield take(actions.Types.SET_LIKED_TWEETS);
    yield call(setLikedTweets, payload);
  }
}











function* setReplies(parentTweetId){
  try{
    const result = yield call(api.getReplies, parentTweetId);
    yield put(actions.setRepliesSuccess({
      replies: result.data.replies
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to get the users'
    }));
  }
}

function* watchSetRepliesRequest(){
  while(true){
    const {payload} = yield take(actions.Types.SET_REPLIES);
    yield call(setReplies, payload.parentTweetId);
  }
}







function* addTweet(payload){
  try{
    const result = yield call(api.addTweet, {
      currentUserId: payload.currentUserId,
      tweetContent: payload.tweetContent
    });
    yield put(actions.addTweetSuccess({
      tweet: result.data
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to create the user'
    }));
  }
}

function* watchAddTweetRequest(){
  while(true) {
    const {payload} = yield take(actions.Types.ADD_TWEET);
    yield call(addTweet, payload);
  }
}


function* addReply(payload){
  try{
    const result = yield call(api.addReply, {
      currentUserId: payload.currentUserId,
      parentTweetId: payload.parentTweetId,
      tweetContent: payload.tweetContent
    });
    yield put(actions.addReplySuccess({
      reply: result.data
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to create the user'
    }));
  }
}

function* watchAddReplyRequest(){
  while(true) {
    const {payload} = yield take(actions.Types.ADD_REPLY);
    yield call(addReply, payload);
  }
}


function* deleteTweet(payload){
  try{
    const result = yield call(api.deleteTweet, {
      currentUserId: payload.currentUserId,
      deletedTweetId: payload.deletedTweetId
    });
    yield put(actions.deleteTweetSuccess({
      deletedTweet: result.data
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to delete the user'
    }));
  }
}

function* watchDeleteTweetRequest(){
  while(true){
    const {payload} = yield take(actions.Types.DELETE_TWEET);
    yield call(deleteTweet, payload);
  }
}


function* deleteReply(payload){
  try{
    const result = yield call(api.deleteTweet, {
      currentUserId: payload.currentUserId,
      deletedTweetId: payload.deletedTweetId,
    });
    yield put(actions.deleteReplySuccess({
      reply: result.data
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to delete the user'
    }));
  }
}

function* watchDeleteReplyRequest(){
  while(true){
    const {payload} = yield take(actions.Types.DELETE_REPLY);
    yield call(deleteReply, payload);
  }
}


function* deleteLikedTweet(payload){
  try{
    const result = yield call(api.deleteTweet, {
      currentUserId: payload.currentUserId,
      deletedTweetId: payload.deletedTweetId
    });
    yield put(actions.deleteLikedTweetSuccess({
      tweet: result.data
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to delete the user'
    }));
  }
}

function* watchDeleteLikedTweetRequest(){
  while(true){
    const {payload} = yield take(actions.Types.DELETE_LIKED_TWEET);
    yield call(deleteLikedTweet, payload);
  }
}


function* likeTweet(payload){
  try{
    yield call(api.likeTweet, {
      currentUserId: payload.currentUserId,
      likedTweetId: payload.likedTweetId
    });
    yield put(actions.likeTweetSuccess());
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to create the user'
    }));
  }
}

function* watchLikeTweetRequest(){
  while(true) {
    const {payload} = yield take(actions.Types.LIKE_TWEET);
    yield call(likeTweet, payload);
  }
}


function* unlikeTweet(payload){
  try{
    yield call(api.unlikeTweet, {
      currentUserId: payload.currentUserId,
      unlikedTweetId: payload.unlikedTweetId
    });
    yield put(actions.unlikeTweetSuccess());
  } catch(e) {
    yield put(actions.usersError({
      error: 'An error occurred when trying to create the user'
    }));
  }
}

function* watchUnlikeTweetRequest(){
  while(true) {
    const {payload} = yield take(actions.Types.UNLIKE_TWEET);
    yield call(unlikeTweet, payload);
  }
}


function* follow(payload){
  try{
    yield call(api.follow, {
      currentUserId: payload.currentUserId,
      targetUserId: payload.targetUserId
    });
    yield put(actions.followSuccess());
  } catch(e) {
    yield put(actions.usersError({
      error: 'An error occurred when trying to create the user'
    }));
  }
}

function* watchFollowRequest(){
  while(true) {
    const {payload} = yield take(actions.Types.FOLLOW);
    yield call(follow, payload);
  }
}


function* unfollow(payload){
  try {
    yield call(api.unfollow, {
      currentUserId: payload.currentUserId,
      targetUserId: payload.targetUserId
    });
    yield put(actions.unfollowSuccess());
  } catch(e) {
    yield put(actions.usersError({
      error: 'An error occurred when trying to create the user'
    }));
  }
}

function* watchUnfollowRequest(){
  while(true) {
    const {payload} = yield take(actions.Types.UNFOLLOW);
    yield call(unfollow, payload);
  }
}



function* setTweetModal(tweetId){
  try{
    const result = yield call(api.getTweetById, tweetId);
    yield put(actions.setTweetModalSuccess({
      tweet: result.data
    }));
  }catch(e){
    yield put(actions.usersError({
      error: 'An error occurred when trying to get the users'
    }));
  }
}

function* watchSetTweetModalRequest(){
  while(true){
    const {payload} = yield take(actions.Types.SET_TWEET_MODAL);
    yield call(setTweetModal, payload.tweetId);
  }
}






const userSagas = [
  fork(watchSetCurrentUserByIdRequest),
  fork(watchSetTargetUserByUsernameRequest),
  fork(watchSetPostFeedRequest),
  fork(watchSetUserFeedRequest),
  fork(watchSetRepliesRequest),
  fork(watchSetLikedTweetsRequest),
  fork(watchAddTweetRequest),
  fork(watchAddReplyRequest),
  fork(watchDeleteTweetRequest),
  fork(watchDeleteReplyRequest),
  fork(watchDeleteLikedTweetRequest),
  fork(watchLikeTweetRequest),
  fork(watchUnlikeTweetRequest),
  fork(watchFollowRequest),
  fork(watchUnfollowRequest),
  fork(watchSetTweetModalRequest),
  fork(watchSetTargetUserFollowingRequest),
  fork(watchSetTargetUserFollowersRequest),
];





export default function* rootSaga(){
	yield all([
		...userSagas
	]);
}