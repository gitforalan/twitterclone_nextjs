
import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import Tweet from "./Tweet.js";
import TweetModal from "./TweetModal";
import BottomScrollListener from 'react-bottom-scroll-listener';
import TweetsFooter from "./TweetsFooter";
import { withRouter } from 'next/router';
import { connect } from "react-redux";



import {
  addTweet,
  deleteTweet,
  setLikedTweets,
} from "../actions";






class LikedTweets extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bottomCount: 0,
      timestamp: Date.now(),
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


  handleDeleteTweet = (deletedTweet) => {
    const { currentUser } = this.props;
    this.props.deleteTweet(
      currentUser.uid,
      deletedTweet.uid
    );
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
      deleteTweet,
      setLikedTweets,
    }
  )(LikedTweets)
);
