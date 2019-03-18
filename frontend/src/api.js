
import axios from "axios";
import Cookies from 'js-cookie';


//const base_url = 'http://127.0.0.1:8000/';
const base_url = 'https://api-twitterclone-nextjs.herokuapp.com/';



export const searchTweet = async (query) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/searchtweet/',
    params: {query: query},
  });
}

export const getUserById = async (userId) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/getuserbyid/',
    params: {uid: userId},
  });
}

export const getUserByUsername = async (username) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/getuserbyusername/',
    params: {username: username},
  });
}

export const getPostFeed = async (currentUserId, count, timestamp) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/getpostfeed/',
    params: {
      currentUserId: currentUserId,
      count: count,
      timestamp: timestamp,
    }
  });
}

export const getUserFeed = async (targetUserId, count, timestamp) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/getuserfeed/',
    params: {
      targetUserId: targetUserId,
      count: count,
      timestamp: timestamp,
    }
  });
}


export const getLikedTweets = async (userId, count, timestamp) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/getlikedtweets/',
    params: {
      userId: userId,
      count: count,
      timestamp: timestamp,
    }
  });
}



export const getReplies = async (parentTweetId, count, timestamp) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/getreplies/',
    params: {
      parentTweetId: parentTweetId,
      count: count,
      timestamp: timestamp,
    },
  });
}



export const getFollowing = async (targetUserId, numCol, count) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/getfollowing/',
    params: {
      targetUserId: targetUserId,
      numCol: numCol,
      count: count,
    },
  });
}

export const getFollowers = async (targetUserId, numCol, count) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/getfollowers/',
    params: {
      targetUserId: targetUserId,
      numCol: numCol,
      count: count
    },
  });
}

export const addTweet = async ({currentUserId, tweetContent}) => {
  const csrftoken = Cookies.get('csrftoken');
  return await axios({
    method: 'post',
    url: base_url + 'api/addtweet/',
    data: {
      currentUserId: currentUserId,
      content: tweetContent,
    },
    headers: {'X-CSRFToken': csrftoken}
  });
}

export const addReply = async ({currentUserId, parentTweetId, tweetContent}) => {
  return await axios({
    method: 'post',
    url: base_url + 'api/addreply/',
    data: {
      content: tweetContent,
      currentUserId: currentUserId,
      parentTweetId: parentTweetId,
    },
  });
}

export const addReply2 = async (currentUserId, parentTweetId, tweetContent) => {
  return await axios({
    method: 'post',
    url: base_url + 'api/addreply/',
    data: {
      content: tweetContent,
      currentUserId: currentUserId,
      parentTweetId: parentTweetId,
    },
  });
}

export const deleteReply = async (currentUserId, deletedTweetId) => {
  const csrftoken = Cookies.get('csrftoken');
  return await axios({
    method: 'delete',
    url: base_url + 'api/deletetweet/',
    data: {
      currentUserId: currentUserId,
      deletedTweetId: deletedTweetId,
    },
    headers: {'X-CSRFToken': csrftoken}
  });
}

export const deleteTweet = async ({currentUserId, deletedTweetId}) => {
  const csrftoken = Cookies.get('csrftoken');
  return await axios({
    method: 'delete',
    url: base_url + 'api/deletetweet/',
    data: {
      currentUserId: currentUserId,
      deletedTweetId: deletedTweetId,
    },
    headers: {'X-CSRFToken': csrftoken}
  });
}

export const likeTweet = async ({currentUserId, likedTweetId}) => {
  const csrftoken = Cookies.get('csrftoken');
  return await axios({
    method: 'put',
    url: base_url + 'api/liketweet/',
    data: {
      currentUserId: currentUserId,
      likedTweetId: likedTweetId,
    },
    headers: {'X-CSRFToken': csrftoken}
  });
}

export const unlikeTweet = async ({currentUserId, unlikedTweetId}) => {
  const csrftoken = Cookies.get('csrftoken');
  return await axios({
    method: 'put',
    url: base_url + 'api/unliketweet/',
    data: {
      currentUserId: currentUserId,
      unlikedTweetId: unlikedTweetId,
    },
    headers: {'X-CSRFToken': csrftoken}
  });
}

export const follow = async ({currentUserId, targetUserId}) => {
  const csrftoken = Cookies.get('csrftoken');
  return await axios({
    method: 'put',
    url: base_url + 'api/follow/',
    data: {
      currentUserId: currentUserId,
      followingUserId: targetUserId,
    },
    headers: {'X-CSRFToken': csrftoken}
  });
}

export const unfollow = async ({currentUserId, targetUserId}) => {
  const csrftoken = Cookies.get('csrftoken');
  return await axios({
    method: 'put',
    url: base_url + 'api/unfollow/',
    data: {
      currentUserId: currentUserId,
      unfollowingUserId: targetUserId,
    },
    headers: {'X-CSRFToken': csrftoken}
  });
}

export const registerUser = async (user) => {
  const csrftoken = Cookies.get('csrftoken');
  return await axios({
    method: 'post',
    url: base_url + 'api/registeruser/',
    data: {
      uid: user.uid,
      name: user.name,
      username: user.username,
    },
    headers: {'X-CSRFToken': csrftoken}
  });
}




export const getTweetById = async (tweetId) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/gettweetbyid/',
    params: {
      tweetId: tweetId,
    }
  });
}


export const checkIfUserIdExists = async (userId) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/checkifuseridexists/',
    params: {
      userId: userId,
    }
  });
}


export const checkIfUsernameExists = async (username) => {
  return await axios({
    method: 'get',
    url: base_url + 'api/checkifusernameexists/',
    params: {
      username: username,
    }
  });
}
