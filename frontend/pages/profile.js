import React from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Card,
  Icon,
  Search,
  Button,
  Form,
  Modal,
  Popup
} from 'semantic-ui-react';
import { connect } from "react-redux";
import firebase from "../lib/firebase";


import ProfileCard2 from "../src/components/ProfileCard2.js";
import TransparentProfileCard from "../src/components/TransparentProfileCard.js";
import WhoToFollowCards from "../src/components/WhoToFollowCards.js";
import WorldwideTrendsCard from "../src/components/WorldwideTrendsCard.js";
import AboutTwitter from "../src/components/AboutTwitter.js";
import Tweets from "../src/components/Tweets.js";
import LikedTweets from "../src/components/LikedTweets.js";
import FollowingCards from "../src/components/FollowingCards";


import TweetsHeader from "../src/components/TweetsHeader.js";
import LikesHeader from "../src/components/LikesHeader.js";
import ListsHeader from "../src/components/ListsHeader.js";
import MomentsHeader from "../src/components/MomentsHeader.js";
import FollowerCards from "../src/components/FollowerCards.js";


import UserStatsBar from "../src/components/UserStatsBar.js";
import UserAvatarModal from "../src/components/UserAvatarModal";
import CircularProgress from '@material-ui/core/CircularProgress';
import Router from "next/router";
import * as api from '../src/api';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';

import {
  clearCurrentUser,
  setCurrentUserById,
  setTargetUser,
  setTargetUserByUsername,
  setTargetUserFollowing,
  setTargetUserFollowers,
} from "../src/actions";




class Profile extends React.Component {
  

  constructor(props) {
    super(props);

    this.state = {
      currentUser: this.props.currentUser,
      targetUser: this.props.targetUser,
      hasError: null,
      screenWidth: null,
      username: null,
      pagename: null,
      stateChangeTrigger: this.props.stateChangeTrigger,
    };
  }

  updateScreenWidth() {
    this.setState({
      screenWidth: window.innerWidth,
    });
  }

  componentWillUnmount() {
    window.removeEventListener(
      "resize", this.updateScreenWidth.bind(this)
    );
  }

  setCurrentUser = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.props.setCurrentUserById(user.uid);
      } else {
        Router.push("/signin");
        this.props.clearCurrentUser();
      }
    });
  }

  updateCurrentUser = () => {
    const { currentUser } = this.props;
    this.props.setCurrentUserById(currentUser.uid);
  }

  componentDidMount() {
    const { currentUser, router } = this.props;

    if(currentUser===null) {
      this.setCurrentUser();
    }

    router.prefetch("/pagedoesnotexist");

    const {username, pagename} = this.getUsernameAndPagename();
    this.setState({
      username: username,
      pagename: pagename,
    });
    api.getUserByUsername(username)
      .then(response => {
        this.props.setTargetUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    this.updateScreenWidth();
    window.addEventListener(
      "resize", this.updateScreenWidth.bind(this)
    ); 
  }


  componentDidUpdate(prevProps) {
    const { stateChangeTrigger } = this.props;
    const { username } = this.getUsernameAndPagename();

    var flag = (
      this.state.username !== null &&
      this.state.username !== username
    );
    if(flag) {
      this.setStateListener();
    }
    
    var flag2 = (
      prevProps.stateChangeTrigger !==
      stateChangeTrigger
    );
    if(flag2) {
      try {
        this.updateCurrentUser();
        this.setStateListener();
      } catch {
        this.setState({hasError:true});
      }
    }
  }


  getUsernameAndPagename = () => {
    const {router} = this.props;
    var _query = router.query;
    var username = "u" in _query ? _query.u:null;
    var pagename = "p" in _query ? _query.p:null;
    return {username, pagename};
  }

  setStateListener = () => {
    var {username, pagename} = this.getUsernameAndPagename();

    this.setState({
      username: username,
      pagename: pagename,
    });

    this.props.setTargetUserByUsername(username);
  }

  isLoading = () => {
    const { username } = this.state;
    const { currentUser, targetUser } = this.props;

    if(targetUser===null) {
      return true;
    }

    return (
      targetUser.username !== username ||
      currentUser === null ||
      !currentUser.uid
    );
  }

  tweetsTwoColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95, marginLeft:2}}>
          <UserAvatarModal
            targetUser={targetUser} 
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WhoToFollowCards />
          <WorldwideTrendsCard />
          <AboutTwitter />
        </div>
        <Segment.Group style={{
          width: 602,
          marginTop:10,
          marginLeft:10,
          borderColor:"transparent",
          marginBottom:40,
        }}>
          <TweetsHeader />
          <Tweets
            targetUser={targetUser}
            isUserFeed={true}
          />
        </Segment.Group>
      </div>
    );
  }

  tweetsThreeColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95,}}>
          <UserAvatarModal
            targetUser={targetUser}
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WorldwideTrendsCard />
        </div>
        <Segment.Group style={{
          width: 602,
          marginTop:10,
          marginLeft:10,
          borderColor:"transparent",
          marginBottom:40,
        }}>
          <TweetsHeader />
          <Tweets
            targetUser={targetUser}
            isUserFeed={true}
          />
        </Segment.Group>
        <div style={{marginTop:10, marginLeft:10}}>
          <WhoToFollowCards />
          <AboutTwitter />
        </div>
      </div>
    );
  }

  followingTwoColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95, marginLeft:40}}>
          <UserAvatarModal
            targetUser={targetUser} 
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WhoToFollowCards />
          <WorldwideTrendsCard />
          <AboutTwitter />
        </div>
        <div style={{
          width:650,
          overflow:"hidden",
          marginBottom:60,
          paddingBottom:1,
        }}>
          <FollowingCards numCol={2} />
        </div>
      </div>
    );
  }

  followingThreeColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95, marginLeft:3}}>
          <UserAvatarModal
            targetUser={targetUser}
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WorldwideTrendsCard />
          <WhoToFollowCards />
          <AboutTwitter />
        </div>
        <div style={{
          width:915,
          overflow:"hidden",
          marginBottom:60,
          paddingBottom:1,
        }}>
          <FollowingCards numCol={3} />
        </div>
      </div>
    );
  }

  followersTwoColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95, marginLeft:40}}>
          <UserAvatarModal
            targetUser={targetUser} 
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WhoToFollowCards />
          <WorldwideTrendsCard />
          <AboutTwitter />
        </div>
        <div style={{
          width:650,
          overflow:"hidden",
          marginBottom:60,
          paddingBottom:1,
        }}>
          <FollowerCards numCol={2} />
        </div>
      </div>
    );
  }

  followersThreeColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95, marginLeft:3}}>
          <UserAvatarModal
            targetUser={targetUser}
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WorldwideTrendsCard />
          <WhoToFollowCards />
          <AboutTwitter />
        </div>
        <div style={{
          width:915,
          overflow:"hidden",
          marginBottom:60,
          paddingBottom:1,
        }}>
          <FollowerCards numCol={3} />
        </div>
      </div>
    );
  }

 
  likesTwoColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95, marginLeft:2}}>
          <UserAvatarModal
            targetUser={targetUser} 
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WhoToFollowCards />
          <WorldwideTrendsCard />
          <AboutTwitter />
        </div>
        <Segment.Group
          style={{
            borderColor:"transparent",
            width: 602,
            marginTop:10,
            marginLeft:10,
            marginBottom:40,
          }}
        >
          <LikesHeader />
          <LikedTweets
            targetUser={targetUser}
          />
        </Segment.Group>
      </div>
    );
  }

  likesThreeColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95,}}>
          <UserAvatarModal
            targetUser={targetUser}
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WorldwideTrendsCard />
        </div>
        <Segment.Group
          style={{
            borderColor:"transparent",
            width: 602,
            marginTop:10,
            marginLeft:10,
            marginBottom:40,
          }}
        >
          <LikesHeader />
          <LikedTweets
            targetUser={targetUser}
          />
        </Segment.Group>
        <div style={{marginTop:10, marginLeft:10}}>
          <WhoToFollowCards />
          <AboutTwitter />
        </div>
      </div>
    );
  }

  listsTwoColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95, marginLeft:2}}>
          <UserAvatarModal
            targetUser={targetUser} 
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WhoToFollowCards />
          <WorldwideTrendsCard />
          <AboutTwitter />
        </div>
        <Segment.Group style={{
          width: 602,
          marginTop:10,
          marginLeft:10,
          borderColor:"transparent",
          marginBottom:40,
        }}>
          <ListsHeader />
        </Segment.Group>
      </div>
    );
  }

  listsThreeColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95,}}>
          <UserAvatarModal
            targetUser={targetUser}
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WorldwideTrendsCard />
        </div>
        <Segment.Group style={{
          width: 602,
          marginTop:10,
          marginLeft:10,
          borderColor:"transparent",
          marginBottom:40,
        }}>
          <ListsHeader />
        </Segment.Group>
        <div style={{marginTop:10, marginLeft:10}}>
          <WhoToFollowCards />
          <AboutTwitter />
        </div>
      </div>
    );
  }

  momentsTwoColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95, marginLeft:2}}>
          <UserAvatarModal
            targetUser={targetUser} 
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WhoToFollowCards />
          <WorldwideTrendsCard />
          <AboutTwitter />
        </div>
        <Segment.Group style={{
          width: 602,
          marginTop:10,
          marginLeft:10,
          borderColor:"transparent",
          marginBottom:40,
        }}>
          <MomentsHeader />
        </Segment.Group>
      </div>
    );
  }

  momentsThreeColumnComponent = () => {
    const { targetUser } = this.props;
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{marginTop:95,}}>
          <UserAvatarModal
            targetUser={targetUser}
          />
          <TransparentProfileCard
            targetUser={targetUser}
          />
          <WorldwideTrendsCard />
        </div>
        <Segment.Group style={{
          width: 602,
          marginTop:10,
          marginLeft:10,
          borderColor:"transparent",
          marginBottom:40,
        }}>
          <MomentsHeader />
        </Segment.Group>
        <div style={{marginTop:10, marginLeft:10}}>
          <WhoToFollowCards />
          <AboutTwitter />
        </div>
      </div>
    );
  }

  getTwoColumnMainComponent = () => {
    var {username, pagename} = this.getUsernameAndPagename();

    if(pagename === null) {
      return this.tweetsTwoColumnComponent();
    } else {
      if(pagename === "tweets") {
        return this.tweetsTwoColumnComponent();
      }
      else if(pagename === "following") {
        return this.followingTwoColumnComponent();
      }
      else if(pagename === "followers") {
        return this.followersTwoColumnComponent();
      }
      else if(pagename === "likes") {
        return this.likesTwoColumnComponent();
      }
      else if(pagename === "lists") {
        return this.listsTwoColumnComponent();
      }
      else if(pagename === "moments") {
        return this.momentsTwoColumnComponent();
      }
      else {
        return this.tweetsTwoColumnComponent();
      }
    }
  }

  getThreeColumnMainComponent = () => {
    var {pagename} = this.getUsernameAndPagename();

    if(pagename === null) {
      return this.tweetsThreeColumnComponent();
    } else {
      if(pagename === "tweets") {
        return this.tweetsThreeColumnComponent();
      }
      else if(pagename === "following") {
        return this.followingThreeColumnComponent();
      }
      else if(pagename === "followers") {
        return this.followersThreeColumnComponent();
      }
      else if(pagename === "likes") {
        return this.likesThreeColumnComponent();
      }
      else if(pagename === "lists") {
        return this.listsThreeColumnComponent();
      }
      else if(pagename === "moments") {
        return this.momentsThreeColumnComponent();
      }
      else {
        return this.tweetsThreeColumnComponent();
      }
    }
  }

  getTwoColumnLayout = () => {
    const { classes } = this.props;

    return(
      <div
        style={{overflowX:"scroll"}}
        className={classes.hideScroll}
      >
        <div style={{
          minWidth:1000,
          overflowX:"hidden",
          backgroundColor:"#F0F8FF",
        }}>
          <div style={{marginTop:49}}>
            <Image
              style={{width:"100%", height:225}}
              src="../static/images/tmppic.png"
            />
            <UserStatsBar />
            {this.getTwoColumnMainComponent()}
          </div>
        </div>
      </div>
    );  
  }

  getThreeColumnLayout = () => {
    const { classes } = this.props;

    return(
      <div>
        <div
          style={{
            overflowX:"hidden",
            backgroundColor:"#F0F8FF",
          }}
          className={classes.hideScroll}
        >
          <div style={{marginTop:49}}>
            <Image
              style={{width:"100%", height:225}}
              src="../static/images/tmppic.png"
            />
            <UserStatsBar />
            {this.getThreeColumnMainComponent()}
          </div>
        </div>
      </div>
    );  
  }
  
  render() {
    const { router } = this.props;

    if(this.isLoading()) {
      return (
        <CircularProgress
          disableShrink
          size={80}
          style={{
            position:"absolute",
            top:"35%",
            left:"46.5%"
          }}
        />
      );
    }

    if(this.state.hasError) {
      router.push("/pagedoesnotexist");
      return null;
    }

    if(this.state.screenWidth < 1250) {
      return this.getTwoColumnLayout();
    } else {
      return this.getThreeColumnLayout();
    }
    
  } 
}


const styles = theme => ({
  hideScroll: {
    '&::-webkit-scrollbar': {
      display:'none'
    },
  },
});

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  targetUser: state.user.targetUser,
  stateChangeTrigger: state.tweet.stateChangeTrigger,
});

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      {
        clearCurrentUser, 
        setCurrentUserById,
        setTargetUser,
        setTargetUserByUsername,
        setTargetUserFollowing,
        setTargetUserFollowers,
      }
    )(Profile)
  )
);