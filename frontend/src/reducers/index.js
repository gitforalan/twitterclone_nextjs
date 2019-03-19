

import { combineReducers } from "redux";
import { Types } from '../actions';


const initialUserState = {
  currentUser: null,
  targetUser: null,
  targetUserFollowing: [],
  targetUserFollowers: [],
};



const user_reducer = (state=initialUserState, action) => {
  switch (action.type) {

    case Types.SET_TARGET_USER_FOLLOWING_SUCCESS: {

      if(action.payload.isInit) {
        return {
          ...state,
          targetUserFollowing: action.payload.following,
        }
      }

      return {
        ...state,
        targetUserFollowing: [
          ...state.targetUserFollowing,
          ...action.payload.following,
        ],
      }
    }

    case Types.SET_TARGET_USER_FOLLOWERS_SUCCESS: {

      if(action.payload.isInit) {
        return {
          ...state,
          targetUserFollowers: action.payload.followers,
        }
      }

      return {
        ...state,
        targetUserFollowers: [
          ...state.targetUserFollowers,
          ...action.payload.followers,
        ],
      }
    }

    case Types.CLEAR_USER_STATE: {
      return {
        ...state,
        currentUser: null,
        targetUser: null,
        targetUserFollowing: [],
        targetUserFollowers: [],
      }
    }

    case Types.SET_CURRENT_USER: {
      return {
        ...state,
        currentUser: action.payload.currentUser
      }
    }

    case Types.SET_CURRENT_USER_BY_ID_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.currentUser
      }
    }

    case Types.SET_TARGET_USER: {
      return {
        ...state,
        targetUser: action.payload.targetUser
      }
    }

    case Types.CLEAR_TARGET_USER: {
      return {
        ...state,
        targetUser: null
      }
    }

    case Types.SET_TARGET_USER_BY_USERNAME_SUCCESS: {
      return {
        ...state,
        targetUser: action.payload.targetUser
      }
    }

    case Types.CLEAR_CURRENT_USER: {
      return {
        ...state,
        currentUser: null,
      }
    }

    default: {
      return state;
    }
  }
}


const initialTweetState = {
  postFeed: [],
  userFeed: [],
  tweetsLoading: true,
  replies: [],
  likedTweets: [],
  tweetModal: null,
  stateChangeTrigger: false,
  updateUserStatsTrigger: false,
  tweetClickedTrigger: false,
  replyIconClickedTrigger: false,
  followTrigger: false,
  userStatsTabClickedTrigger: false,
}

const tweet_reducer = (state=initialTweetState, action) => {
  switch (action.type) {

    case Types.USER_STATS_TAB_CLICKED: {
      return {
        ...state,
        userStatsTabClickedTrigger: !state.userStatsTabClickedTrigger,
      }
    }

    case Types.UPDATE_USER_STATS: {
      return {
        ...state,
        updateUserStatsTrigger: !state.updateUserStatsTrigger,
      }
    }

    case Types.SET_TWEET_MODAL_SUCCESS: {
      return {
        ...state,
        tweetModal: action.payload.tweet,
      }
    }

    case Types.TWEET_CLICKED: {
      return {
        ...state,
        tweetClickedTrigger: !state.tweetClickedTrigger,
      }
    }

    case Types.REPLY_ICON_CLICKED: {
      return {
        ...state,
        replyIconClickedTrigger: !state.replyIconClickedTrigger,
      }
    }

    case Types.CLEAR_TWEET_STATE: {
      return {
        ...state,
        postFeed: [],
        userFeed: [],
        likedTweets: [],
        replies: [],
        tweetsLoading: false,
        stateChangeTrigger: false,
        updateUserStatsTrigger: false,
        tweetClickedTrigger: false,
        replyIconClickedTrigger: false,
        followTrigger: false,
      }
    }


    case Types.SET_POST_FEED_SUCCESS: {

      if(action.payload.isInit) {
        return {
          ...state,
          postFeed: action.payload.tweets,
          tweetsLoading: action.payload.nextLength > 0
        }
      }
      return {
        ...state,
        postFeed: [
          ...state.postFeed,
          ...action.payload.tweets
        ],
        tweetsLoading: action.payload.nextLength > 0
      }
    }

    case Types.SET_USER_FEED_SUCCESS: {
      if(action.payload.isInit) {
        return {
          ...state,
          userFeed: action.payload.tweets,
          tweetsLoading: action.payload.nextLength > 0
        }
      }
      return {
        ...state,
        userFeed: [
          ...state.userFeed,
          ...action.payload.tweets
        ],
        tweetsLoading: action.payload.nextLength > 0
      }
    }


    case Types.SET_LIKED_TWEETS_SUCCESS: {
      if(action.payload.isInit) {
        return {
          ...state,
          likedTweets: action.payload.tweets,
          tweetsLoading: action.payload.nextLength > 0
        }
      }
      return {
        ...state,
        likedTweets: [
          ...state.likedTweets,
          ...action.payload.tweets
        ],
        tweetsLoading: action.payload.nextLength > 0
      }
    }


    case Types.SET_REPLIES_SUCCESS: {
      if(action.payload.isInit) {
        return {
          ...state,
          replies: action.payload.tweets,
          tweetsLoading: action.payload.nextLength > 0
        }
      }
      return {
        ...state,
        replies: [
          ...state.replies,
          ...action.payload.tweets
        ],
        tweetsLoading: action.payload.nextLength > 0
      }
    }

    

    case Types.CLEAR_REPLIES: {
      return {
        ...state,
        replies: []
      }
    }
    
    case Types.ADD_TWEET_SUCCESS: {
      const updatedPostFeed = [
        action.payload.tweet,
        ...state.postFeed
      ];
      const updatedUserFeed = [
        action.payload.tweet,
        ...state.userFeed
      ];
      return {
        ...state,
        postFeed: updatedPostFeed,
        userFeed: updatedUserFeed,
        updateUserStatsTrigger: !state.updateUserStatsTrigger,
      }
    }

    case Types.ADD_REPLY_SUCCESS: {
      const updatedReplies = [
        action.payload.reply,
        ...state.replies
      ];
      return {
        ...state,
        replies: updatedReplies,
        updateUserStatsTrigger: !state.updateUserStatsTrigger,
      }
    }

    case Types.DELETE_TWEET_SUCCESS: {
      const deletedTweet = action.payload.deletedTweet;
      const postFeed = state.postFeed;
      const userFeed = state.userFeed;
      const postIndex1 = postFeed.findIndex(
        tweet => tweet.uid === deletedTweet.uid
      );
      const postIndex2 = userFeed.findIndex(
        tweet => tweet.uid === deletedTweet.uid
      );
      
      const updatedPostFeed = [
        ...postFeed.slice(0, postIndex1),
        ...postFeed.slice(postIndex1 + 1)
      ];
      const updatedUserFeed = [
        ...userFeed.slice(0, postIndex2),
        ...userFeed.slice(postIndex2 + 1)
      ];
      return {
        ...state,
        postFeed: updatedPostFeed,
        userFeed: updatedUserFeed,
        updateUserStatsTrigger: !state.updateUserStatsTrigger,
      }
    }

    case Types.DELETE_REPLY_SUCCESS: {
      const deletedReply = action.payload.reply;
      const replies = state.replies;
      const postIndex = replies.findIndex(
        reply => reply.uid === deletedReply.uid
      );
      const updatedReplies = [
        ...replies.slice(0, postIndex),
        ...replies.slice(postIndex + 1)
      ];
      return {
        ...state,
        replies: updatedReplies,
        updateUserStatsTrigger: !state.updateUserStatsTrigger,
      }
    }

    case Types.DELETE_LIKED_TWEET_SUCCESS: {
      const deletedTweet = action.payload.tweet;
      const tweets = state.likedTweets;
      const postIndex = tweets.findIndex(
        tweet => tweet.uid === deletedTweet.uid
      );
      const updatedTweets = [
        ...tweets.slice(0, postIndex),
        ...tweets.slice(postIndex + 1)
      ];
      return {
        ...state,
        likedTweets: updatedTweets,
        updateUserStatsTrigger: !state.updateUserStatsTrigger,
      }
    }

    case Types.LIKE_TWEET_SUCCESS: {
      return {
        ...state,
        updateUserStatsTrigger: !state.updateUserStatsTrigger,
        stateChangeTrigger: !state.stateChangeTrigger,
      }
    }

    case Types.UNLIKE_TWEET_SUCCESS: {
      return {
        ...state,
        updateUserStatsTrigger: !state.updateUserStatsTrigger,
        stateChangeTrigger: !state.stateChangeTrigger,
      }
    }

    case Types.FOLLOW_SUCCESS: {
      return {
        ...state,
        updateUserStatsTrigger: !state.updateUserStatsTrigger,
        stateChangeTrigger: !state.stateChangeTrigger,
        followTrigger: !state.followTrigger,
      }
    }

    case Types.UNFOLLOW_SUCCESS: {
      return {
        ...state,
        updateUserStatsTrigger: !state.updateUserStatsTrigger,
        //stateChangeTrigger: !state.stateChangeTrigger,
        followTrigger: !state.followTrigger,
      }
    }
    
    default: {
      return state;
    }
  }
}

const rootReducer = combineReducers({
  user: user_reducer,
  tweet: tweet_reducer,
});

export default rootReducer;
