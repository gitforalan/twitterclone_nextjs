
import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import Tweet from "./Tweet.js";
import TweetModal from "./TweetModal";
import BottomScrollListener from 'react-bottom-scroll-listener';
import DeleteTweetConfirmationModal from "./DeleteTweetConfirmationModal";

import TweetsFooter from "./TweetsFooter";
import { withRouter } from 'next/router';
import { connect } from "react-redux";



import {
  addTweet,
  deleteLikedTweet,
  setLikedTweets,
} from "../actions";






class LikedTweets extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bottomCount: 0,
      timestamp: Date.now(),

      deletedTweet: null,
      showDeleteTweetConfirmationModal: false,
    };
  }


  componentDidMount() {
    this.initTweets();
  }


  componentDidUpdate(prevProps) {
    const { userStatsTabClickedTrigger } = this.props;

    const flag = (
      prevProps.userStatsTabClickedTrigger !==
      userStatsTabClickedTrigger
    );

    if(flag) {
      this.initTweets();
    }
  }


  initTweets = () => {
    const { bottomCount, timestamp } = this.state;
    const {
      targetUser,
      setLikedTweets,
    } = this.props;

    setLikedTweets(targetUser.uid, bottomCount, timestamp, true);
  }
  

  loadTweets = () => {
    const { bottomCount, timestamp } = this.state;
    const {
      targetUser,
      setLikedTweets,
    } = this.props;

    setLikedTweets(targetUser.uid, bottomCount, timestamp, false);
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }


  handleScrollToBottom = () => {
    const { bottomCount } = this.state;

    this.setState({
      bottomCount: bottomCount + 1,
    });

    this.loadTweets();
  }


  
  hideDeleteConfirmationModal = () => {
    this.setState({
      deletedTweet: null,
      showDeleteTweetConfirmationModal: false,
    });
  }

  handleDeleteTweet = (deletedTweet) => {
    this.setState({
      deletedTweet: deletedTweet,
      showDeleteTweetConfirmationModal: true,
    });
  }

  deleteTweetFinal = (deletedTweet) => {
    const { currentUser } = this.props;

    this.props.deleteLikedTweet(
      currentUser.uid,
      deletedTweet.uid
    );

    this.setState({
      deletedTweet: null,
      showDeleteTweetConfirmationModal: false,
    });
  }



  render() {
    const { likedTweets } = this.props;

    const myFeed = likedTweets;

    return (
      <React.Fragment>
        <BottomScrollListener
          onBottom={() => this.handleScrollToBottom()}
        >
          {myFeed.map(tweet => (
            <Tweet
              key={tweet.uid}
              tweet={tweet}
              handleDeleteTweet={this.handleDeleteTweet}
            />
          ))}
        </BottomScrollListener>
        <TweetsFooter
          isUserFeed={false}
          isLikedTweets={true}
          feedLength={myFeed.length}
        />
        <TweetModal />
        <DeleteTweetConfirmationModal 
          tweet={this.state.deletedTweet}
          showModal={this.state.showDeleteTweetConfirmationModal}
          hideDeleteConfirmationModal={this.hideDeleteConfirmationModal}
          deleteTweetFinal={this.deleteTweetFinal}
        />
      </React.Fragment>
    );
    
  }
}



const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  likedTweets: state.tweet.likedTweets,
  userStatsTabClickedTrigger: state.tweet.userStatsTabClickedTrigger,
});



export default withRouter(
  connect(
    mapStateToProps,
    {
      addTweet,
      deleteLikedTweet,
      setLikedTweets,
    }
  )(LikedTweets)
);
