
import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import Tweet from "./Tweet.js";
import TweetForm from "./TweetForm.js";
import TweetModal from "./TweetModal";
import BottomScrollListener from 'react-bottom-scroll-listener';
import TweetsFooter from "./TweetsFooter";
import DeleteTweetConfirmationModal from "./DeleteTweetConfirmationModal";
import { withRouter } from 'next/router';
import { connect } from "react-redux";



import {
  addTweet,
  deleteTweet,
  setPostFeed,
  setUserFeed,
} from "../actions";




class Tweets extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tweetContent: "",
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
      isUserFeed,
      setUserFeed,
      setPostFeed,
    } = this.props;

    const setFeed = isUserFeed ? setUserFeed:setPostFeed;
    setFeed(targetUser.uid, bottomCount, timestamp, true);
  }
  
  loadTweets = () => {
    const { bottomCount, timestamp } = this.state;
    const {
      targetUser,
      isUserFeed,
      setUserFeed,
      setPostFeed,
    } = this.props;

    if(isUserFeed) {
      setUserFeed(targetUser.uid, bottomCount, timestamp, false);
      return null;
    }
    setPostFeed(targetUser.uid, bottomCount, timestamp, false);
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

    this.props.deleteTweet(
      currentUser.uid,
      deletedTweet.uid
    );

    this.setState({
      deletedTweet: null,
      showDeleteTweetConfirmationModal: false,
    });
  }

  sendTweet = () => {
    const { currentUser } = this.props;
    const { tweetContent } = this.state;
    if (tweetContent.length > 0) {
      this.props.addTweet(currentUser.uid, tweetContent);
      this.setState({
        tweetContent: "",
      });
    }
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
    const {
      isUserFeed,
      postFeed,
      userFeed,
    } = this.props;
    const { tweetContent } = this.state;

    const myFeed = isUserFeed ? userFeed:postFeed;


    return (
      <React.Fragment>
        {!isUserFeed &&
          <TweetForm
            sendTweet={this.sendTweet}
            handleChange={this.handleChange}
            tweetContent={tweetContent}
          />
        }
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
          isUserFeed={isUserFeed}
          isLikedTweets={false}
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
  postFeed: state.tweet.postFeed,
  userFeed: state.tweet.userFeed,
  userStatsTabClickedTrigger: state.tweet.userStatsTabClickedTrigger,
});



export default withRouter(
  connect(
    mapStateToProps,
    {
      addTweet,
      deleteTweet,
      setPostFeed,
      setUserFeed,
    }
  )(Tweets)
);
