export const Types = {
  CLEAR_USER_STATE: "CLEAR_USER_STATE",
  CLEAR_TWEET_STATE: "CLEAR_TWEET_STATE",
  CLEAR_CURRENT_USER: "CLEAR_CURRENT_USER",
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_CURRENT_USER_BY_ID: 'SET_CURRENT_USER_BY_ID',
  SET_CURRENT_USER_BY_ID_SUCCESS: 'SET_CURRENT_USER_BY_ID_SUCCESS',
  SET_TARGET_USER: 'SET_TARGET_USER',
  CLEAR_TARGET_USER: 'CLEAR_TARGET_USER',
  SET_TARGET_USER_BY_USERNAME: 'SET_TARGET_USER_BY_USERNAME',
  SET_TARGET_USER_BY_USERNAME_SUCCESS: 'SET_TARGET_USER_BY_USERNAME_SUCCESS',
  SET_POST_FEED: 'SET_POST_FEED',
  SET_POST_FEED_SUCCESS: 'SET_POST_FEED_SUCCESS',
  SET_USER_FEED: 'SET_USER_FEED',
  SET_USER_FEED_SUCCESS: 'SET_USER_FEED_SUCCESS',
  SET_REPLIES: 'SET_REPLIES',
  SET_REPLIES_SUCCESS: 'SET_REPLIES_SUCCESS',
  SET_LIKED_TWEETS: 'SET_LIKED_TWEETS',
  SET_LIKED_TWEETS_SUCCESS: 'SET_LIKED_TWEETS_SUCCESS',
  CLEAR_REPLIES: 'CLEAR_REPLIES',
  ADD_TWEET: 'ADD_TWEET',
  ADD_TWEET_SUCCESS: 'ADD_TWEET_SUCCESS',
  ADD_REPLY: 'ADD_REPLY',
  ADD_REPLY_SUCCESS: 'ADD_REPLY_SUCCESS',
  DELETE_TWEET: 'DELETE_TWEET',
  DELETE_TWEET_SUCCESS: 'DELETE_TWEET_SUCCESS',
  DELETE_REPLY: 'DELETE_REPLY',
  DELETE_REPLY_SUCCESS: 'DELETE_REPLY_SUCCESS',
  DELETE_LIKED_TWEET: 'DELETE_LIKED_TWEET',
  DELETE_LIKED_TWEET_SUCCESS: 'DELETE_LIKED_TWEET_SUCCESS',
  LIKE_TWEET: 'LIKE_TWEET',
  LIKE_TWEET_SUCCESS: 'LIKE_TWEET_SUCCESS',
  UNLIKE_TWEET: 'UNLIKE_TWEET',
  UNLIKE_TWEET_SUCCESS: 'UNLIKE_TWEET_SUCCESS',
  FOLLOW: 'FOLLOW',
  FOLLOW_SUCCESS: 'FOLLOW_SUCCESS',
  UNFOLLOW: 'UNFOLLOW',
  UNFOLLOW_SUCCESS: 'UNFOLLOW_SUCCESS',
  TWEET_CLICKED: 'TWEET_CLICKED',
  REPLY_ICON_CLICKED: 'REPLY_ICON_CLICKED',
  SET_TWEET_MODAL: 'SET_TWEET_MODAL',
  SET_TWEET_MODAL_SUCCESS: 'SET_TWEET_MODAL_SUCCESS',
  SET_TARGET_USER_FOLLOWING: 'SET_TARGET_USER_FOLLOWING',
  SET_TARGET_USER_FOLLOWING_SUCCESS: 'SET_TARGET_USER_FOLLOWING_SUCCESS',
  SET_TARGET_USER_FOLLOWERS: 'SET_TARGET_USER_FOLLOWERS',
  SET_TARGET_USER_FOLLOWERS_SUCCESS: 'SET_TARGET_USER_FOLLOWERS_SUCCESS',
  UPDATE_USER_STATS: 'UPDATE_USER_STATS',
  USER_STATS_TAB_CLICKED: 'USER_STATS_TAB_CLICKED',
}




export const userStatsTabClicked = () => {
  return {
    type: Types.USER_STATS_TAB_CLICKED,
  }
}


export const updateUserStats = () => {
  return {
    type: Types.UPDATE_USER_STATS,
  }
}


export const replyIconClicked = () => {
  return {
    type: Types.REPLY_ICON_CLICKED,
  }
}

export const tweetClicked = () => {
  return {
    type: Types.TWEET_CLICKED,
  }
}

export const clearUserState = () => {
  return {
    type: Types.CLEAR_USER_STATE,
  }
}

export const clearTweetState = () => {
  return {
    type: Types.CLEAR_TWEET_STATE,
  }
}

export const clearCurrentUser = () => {
  return {
    type: Types.CLEAR_CURRENT_USER
  }
}



export const setCurrentUser = (currentUser) => {
  return {
    type: Types.SET_CURRENT_USER,
    payload: {currentUser},
  }
}

export const setCurrentUserById = (userId) => ({
  type: Types.SET_CURRENT_USER_BY_ID,
  payload: {userId}
});

export const setCurrentUserByIdSuccess = ({currentUser}) => ({
  type: Types.SET_CURRENT_USER_BY_ID_SUCCESS,
  payload: {currentUser}
});

export const setTargetUser = (targetUser) => ({
  type: Types.SET_TARGET_USER,
  payload: {targetUser}
});

export const clearTargetUser = () => ({
  type: Types.CLEAR_TARGET_USER,
});

export const setTargetUserByUsername = (username) => ({
  type: Types.SET_TARGET_USER_BY_USERNAME,
  payload: {username}
});

export const setTargetUserByUsernameSuccess = ({targetUser}) => {
  return {
    type: Types.SET_TARGET_USER_BY_USERNAME_SUCCESS,
    payload: {targetUser}
  }
}

export const setTargetUserFollowing = (targetUserId, numCol, count, isInit) => ({
  type: Types.SET_TARGET_USER_FOLLOWING,
  payload: {targetUserId, numCol, count, isInit},
});

export const setTargetUserFollowingSuccess = ({following, isInit}) => ({
  type: Types.SET_TARGET_USER_FOLLOWING_SUCCESS,
  payload: {following, isInit}
});

export const setTargetUserFollowers = (targetUserId, numCol, count, isInit) => ({
  type: Types.SET_TARGET_USER_FOLLOWERS,
  payload: {targetUserId, numCol, count, isInit},
});

export const setTargetUserFollowersSuccess = ({followers, isInit}) => ({
  type: Types.SET_TARGET_USER_FOLLOWERS_SUCCESS,
  payload: {followers, isInit}
});






export const setPostFeed = (userId, bottomCount, timestamp, isInit) => ({
  type: Types.SET_POST_FEED,
  payload: {
    userId: userId, 
    bottomCount: bottomCount, 
    timestamp: timestamp, 
    isInit: isInit,
  }
});

export const setPostFeedSuccess = ({tweets, nextLength, isInit}) => ({
  type: Types.SET_POST_FEED_SUCCESS,
  payload: {tweets, nextLength, isInit}
});


export const setUserFeed = (userId, bottomCount, timestamp, isInit) => ({
  type: Types.SET_USER_FEED,
  payload: {
    userId: userId, 
    bottomCount: bottomCount, 
    timestamp: timestamp, 
    isInit: isInit,
  }
});

export const setUserFeedSuccess = ({tweets, nextLength, isInit}) => ({
  type: Types.SET_USER_FEED_SUCCESS,
  payload: {tweets, nextLength, isInit}
});


export const setLikedTweets = (userId, bottomCount, timestamp, isInit) => ({
  type: Types.SET_LIKED_TWEETS,
  payload: {
    userId: userId, 
    bottomCount: bottomCount, 
    timestamp: timestamp, 
    isInit: isInit,
  }
});

export const setLikedTweetsSuccess = ({tweets, nextLength, isInit}) => {
  return {
    type: Types.SET_LIKED_TWEETS_SUCCESS,
    payload: {tweets, nextLength, isInit}
  }
};



export const setReplies = (parentTweetId) => ({
  type: Types.SET_REPLIES,
  payload: {parentTweetId}
});

export const setRepliesSuccess = ({replies}) => ({
  type: Types.SET_REPLIES_SUCCESS,
  payload: {replies}
});



export const clearReplies = () => ({
  type: Types.CLEAR_REPLIES,
  payload: {}
});



export const addTweet = (currentUserId, tweetContent) => ({
  type: Types.ADD_TWEET,
  payload: {
    currentUserId,
    tweetContent,
  }
});

export const addTweetSuccess = ({tweet}) => ({
  type: Types.ADD_TWEET_SUCCESS,
  payload: {tweet}
});



export const addReply = (currentUserId, parentTweetId, tweetContent) => {
  return {
    type: Types.ADD_REPLY,
    payload: {
      currentUserId,
      parentTweetId,
      tweetContent,
    }
  }
}

export const addReplySuccess = ({reply}) => ({
  type: Types.ADD_REPLY_SUCCESS,
  payload: {reply}
});


export const deleteTweet = (currentUserId, deletedTweetId) => ({
  type: Types.DELETE_TWEET,
  payload: {
    currentUserId,
    deletedTweetId,
  }
});

export const deleteTweetSuccess = ({deletedTweet}) => {
  return {
    type: Types.DELETE_TWEET_SUCCESS,
    payload: {deletedTweet}
  }
};



export const deleteReply = (currentUserId, deletedTweetId) => ({
  type: Types.DELETE_REPLY,
  payload: {
    currentUserId,
    deletedTweetId,
  }
});

export const deleteReplySuccess = ({reply}) => ({
  type: Types.DELETE_REPLY_SUCCESS,
  payload: {reply}
});



export const deleteLikedTweet = (currentUserId, deletedTweetId) => ({
  type: Types.DELETE_LIKED_TWEET,
  payload: {
    currentUserId,
    deletedTweetId,
  }
});

export const deleteLikedTweetSuccess = ({tweet}) => ({
  type: Types.DELETE_LIKED_TWEET_SUCCESS,
  payload: {tweet}
});






export const likeTweet = (currentUserId, likedTweetId) => ({
  type: Types.LIKE_TWEET,
  payload: {
    currentUserId,
    likedTweetId,
  }
});

export const likeTweetSuccess = () => ({
  type: Types.LIKE_TWEET_SUCCESS,
});

export const unlikeTweet = (currentUserId, unlikedTweetId) => ({
  type: Types.UNLIKE_TWEET,
  payload: {
    currentUserId,
    unlikedTweetId,
  }
});

export const unlikeTweetSuccess = () => ({
  type: Types.UNLIKE_TWEET_SUCCESS,
});

export const follow = (currentUserId, targetUserId) => ({
  type: Types.FOLLOW,
  payload: {
    currentUserId,
    targetUserId,
  }
});

export const followSuccess = () => ({
  type: Types.FOLLOW_SUCCESS,
});

export const unfollow = (currentUserId, targetUserId) => ({
  type: Types.UNFOLLOW,
  payload: {
    currentUserId,
    targetUserId,
  }
});

export const unfollowSuccess = () => ({
  type: Types.UNFOLLOW_SUCCESS,
});

export const setTweetModal = (tweetId) => ({
  type: Types.SET_TWEET_MODAL,
  payload: {tweetId}
});

export const setTweetModalSuccess = ({tweet}) => ({
  type: Types.SET_TWEET_MODAL_SUCCESS,
  payload: {tweet}
});

/*
export const registerUser = (user) => {
  return {
    type: Types.REGISTER_USER,
    payload: {user}
  }
}

export const registerUserSuccess = ({user}) => ({
  type: Types.REGISTER_USER_SUCCESS,
  payload: {user}
});
*/

export const usersError = ({error}) => ({
    type: Types.USERS_ERROR,
    payload: {
        error
    }
});



