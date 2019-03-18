
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

import CircularProgress from '@material-ui/core/CircularProgress';
import WhoToFollowCards from "../src/components/WhoToFollowCards.js";
import WorldwideTrendsCard from "../src/components/WorldwideTrendsCard.js";
import ProfileCard from "../src/components/ProfileCard.js";
import AboutTwitter from "../src/components/AboutTwitter.js";
import Tweets from "../src/components/Tweets.js";

import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';

import {
  clearCurrentUser,
  setCurrentUserById
} from "../src/actions";





class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      screenWidth: null,
      stateChangeTrigger: this.props.stateChangeTrigger,
    };
  }

  
  componentDidUpdate(prevProps) {
    const { stateChangeTrigger } = this.props;
    
    var flag = prevProps.stateChangeTrigger !== stateChangeTrigger;
    if(flag) {
      try {
        this.updateCurrentUser();
      } catch {
        this.setState({hasError:true});
      }
    }
  }
  

  updateCurrentUser = () => {
    const { currentUser } = this.state;
    this.props.setCurrentUserById(currentUser.uid);
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
    const { router } = this.props;

    firebase.auth().onAuthStateChanged(user => {
      if(user && user.uid) {
        this.props.setCurrentUserById(user.uid);
      } else {
        router.push("/");
        this.props.clearCurrentUser();
      }
    });
  }

  componentDidMount() {
    const { currentUser, router } = this.props;

    if(currentUser===null) {
      this.setCurrentUser();
    }

    this.updateScreenWidth();
    window.addEventListener(
      "resize", this.updateScreenWidth.bind(this)
    );
    router.prefetch("/");
  }

  getTwoColumnLayout = () => {
    const { classes, currentUser } = this.props;
    return(
      <div
        style={{overflowX:"scroll"}}
        className={classes.hideScroll}
      >
        <div style={{
          backgroundColor:"#F0F8FF", display:"flex",
          justifyContent:"center", minWidth:1000,
          overflowX:"hidden",
        }}>
          <div style={{marginTop:62}}>
            <ProfileCard />
            <WhoToFollowCards />
            <WorldwideTrendsCard />
            <AboutTwitter />
          </div>
          <Segment.Group style={{
            borderColor:"transparent",
            marginTop:60, marginLeft:13,
            marginBottom:40,
          }}>
            <Tweets
              targetUser={currentUser}
              isUserFeed={false}
            />
          </Segment.Group>
        </div>
      </div>
    );
  }

  getThreeColumnLayout = () => {
    const { currentUser } = this.props;
    return(
      <div>
        <div style={{
          backgroundColor:"#F0F8FF", display:"flex",
          justifyContent:"center", overflowX:"hidden"
        }}>
          <div style={{marginTop:62}}>
            <ProfileCard />
            <WorldwideTrendsCard />
          </div>
          <Segment.Group style={{
            borderColor:"transparent",
            marginTop:60, marginLeft:13,
            marginBottom:40,
          }}>
            <Tweets
              targetUser={currentUser}
              isUserFeed={false}
            />
          </Segment.Group>
          <div style={{marginTop:61, marginLeft:13}}>
            <WhoToFollowCards />
            <AboutTwitter />
          </div>
        </div>
      </div>
    );
  }

  isLoading() {
    return (
      this.state.screenWidth === null ||
      this.props.currentUser === null ||
      !this.props.currentUser.uid
    );
  }

  render() {
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
  stateChangeTrigger: state.tweet.stateChangeTrigger,
});


export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      {clearCurrentUser, setCurrentUserById}
    )(Home)
  )
);


