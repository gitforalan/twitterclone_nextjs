


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
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'next/link';
import moment from "moment";
import TweetActivityModal from "./TweetActivityModal";
import NewDirectMessageModal from "./NewDirectMessageModal";
import { withRouter } from 'next/router';
import Replies from "./Replies";
import { connect } from "react-redux";
import {
  likeTweet,
  unlikeTweet,
  deleteTweet,
  replyIconClicked,
  setCurrentUserById,
} from "../actions";
import {
  getTweetById,
  getReplies,
} from "../api";



class TweetFooter extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      currentUser: this.props.currentUser,
      isMouseOnBackToTop: false,
    }
  }



  componentDidMount() {
   
  }

  getBackToTopStyle = () => {
    const { isMouseOnBackToTop } = this.state;
    if(isMouseOnBackToTop){
      return {
        marginTop:3,
        cursor:"pointer",
        textDecoration:"underline",
      }
    }
    return {
      marginTop:3,
      cursor:"pointer",
    }
  }

  getFooterHeight = () => {
    const { isUserFeed, isLikedTweets, isLoading, feedLength } = this.props;

    if(isLoading) {
      return 75;
    }
    if(isLikedTweets && feedLength === 0) {
      return 75;
    }
    if(isUserFeed && feedLength === 0) {
      return 75;
    }
    if(!isUserFeed && feedLength === 0) {
      return 260;
    }

    return 1 <= feedLength && feedLength <= 7 ? 55:75
  }

  getFooter = () => {
    const { isUserFeed, isLikedTweets, isLoading, feedLength } = this.props;

    if(isLoading) {
      return (
        <CircularProgress
          disableShrink
          size={35}
          style={{marginTop:5}}
        />
      );
    }

    if(isLikedTweets && feedLength === 0) {
      return (
        <div>
          <Icon
            name='twitter'
            style={{
              marginTop:3,
              marginLeft:87.5,
              color:"black",
              fontSize:20,
            }} 
          />
          <div
            style={{marginTop:3}}
          >
            You haven't liked any Tweets yet.
          </div>
        </div>
      );
    }

    if(isUserFeed && feedLength === 0) {
      return (
        <div>
          <Icon
            name='twitter'
            style={{
              marginTop:3,
              marginLeft:65,
              color:"black",
              fontSize:20
            }} 
          />
          <div
            style={{marginTop:3}}
          >
            You haven't Tweeted yet.
          </div>
        </div>
      );
    }

    if(!isUserFeed && feedLength === 0) {
      return (
        <div>
          <div style={{
            fontSize:30,
            fontWeight:"bold",
            marginTop:40,
            marginLeft:50
          }}>
            What? No Tweets yet?
          </div>
          <div style={{
            fontSize:15,
            color:"grey",
            marginTop:20,
            marginLeft:50,
            width:500
          }}>
            This empty timeline won’t be around for long. Start following people and you’ll see Tweets show up here.
          </div>
          <Button
            style={{
              marginLeft:50,
              marginTop:20,
              borderRadius:20,
              fontWeight:"bold",
              width:175,
            }}
            color='blue'
            content='Fine people to follow'
          />
        </div>
      );
    }


    if(1 <= feedLength && feedLength <= 7) {
      return (
        <div>
          <Icon
            name='twitter'
            style={{
              marginTop:3,
              color:"black",
              fontSize:20
            }} 
          />
        </div>
      );
    }

    return (
      <div>
        <Icon
          name='twitter'
          style={{
            marginTop:2,
            marginLeft:27.5,
            color:"black",
            fontSize:20
          }} 
        />
        <div
          style={this.getBackToTopStyle()}
          onClick={() => window.scrollTo({ top: 0 })}
          onMouseEnter={() => this.setState({isMouseOnBackToTop:true})}
          onMouseLeave={() => this.setState({isMouseOnBackToTop:false})}
        >
          Back to top &nbsp; ↑
        </div>
      </div>
    );
  }


  render() {

    return(
      <Segment style={{
        width:600,
        height:this.getFooterHeight(),
        backgroundColor:"white",
        display:"flex",
        justifyContent:"center",
      }}>
        {this.getFooter()}
      </Segment>
            
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  isLoading: state.tweet.tweetsLoading,
});


export default withRouter(
  connect(mapStateToProps)(TweetFooter)
);