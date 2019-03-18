import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import Reply from "./Reply.js";
import TweetFormModal from "./TweetFormModal";
import { connect } from "react-redux";
import {
  addReply,
  clearReplies,
  deleteReply,
  updateUserStats,
} from "../actions";

import * as api from '../api';
import BottomScrollListener from 'react-bottom-scroll-listener';
import TweetModalFooter from "./TweetModalFooter";
import DeleteTweetConfirmationModal from "./DeleteTweetConfirmationModal";




class Replies extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      replies: this.props.replies,
      parentTweet: this.props.parentTweet,
      tweetsLoading: true,
      currentUser: this.props.currentUser,
      searchTerm: "",
      searchLoading: false,
      searchResults: [],
      tweetContent: "",
      tweetClickedTrigger: this.props.tweetClickedTrigger,
      bottomCount: 0,
      timestamp: Date.now(),
      deletedTweet: null,
      showDeleteTweetConfirmationModal: false,

    }
  }




  

  sendTweet = () => {
    const { currentUser, parentTweet } = this.props;
    const { tweetContent } = this.state;
    if (tweetContent.length > 0) {
      api.addReply2(
        currentUser.uid,
        parentTweet.uid,
        tweetContent
      ).then(response => {
        const updatedReplies = [
          response.data,
          ...this.state.replies
        ];
        this.setState({
          replies: updatedReplies,
          tweetContent: "",
        });
        this.props.updateUserStats();
      }).catch(error => {
        console.error(error);
      });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  loadReplies = () => {
    const { parentTweet, bottomCount, timestamp } = this.state;

    api.getReplies(parentTweet.uid, bottomCount, timestamp)
      .then(response => {
        this.setState({
          replies: [
            ...this.state.replies,
            ...response.data.replies
          ],
        });
      })
      .catch(error => {
        console.error(error);
      });

  }

  handleScrollToBottom = () => {
    const { bottomCount } = this.state;

    this.setState({
      bottomCount: bottomCount + 1,
    });

    this.loadReplies();
  }

  handleDeleteTweet = (deletedTweet) => {
    this.setState({
      deletedTweet: deletedTweet,
      showDeleteTweetConfirmationModal: true,
    });
  }

  hideDeleteConfirmationModal = () => {
    this.setState({
      deletedTweet: null,
      showDeleteTweetConfirmationModal: false,
    });
  }

  deleteTweetFinal = (deletedTweet) => {
    const { currentUser } = this.props;

    api.deleteReply(currentUser.uid, deletedTweet.uid)
      .then(response => {
        const deletedReply = response.data;
        const replies = this.state.replies;
        const postIndex = replies.findIndex(
          reply => reply.uid === deletedReply.uid
        );
        const updatedReplies = [
          ...replies.slice(0, postIndex),
          ...replies.slice(postIndex + 1)
        ];
        this.setState({
          replies: updatedReplies,
        });
        this.props.updateUserStats();
      })
      .catch(error => {
        console.error(error);
      });
    
    this.setState({
      deletedTweet: null,
      showDeleteTweetConfirmationModal: false,
    });
  }


  render() {
    const { replies, tweetContent } = this.state;

    return (
      <React.Fragment >
        <TweetFormModal
          parentTweet={this.props.parentTweet}
          currentUser={this.props.currentUser}
          hideTweetModal={this.props.hideTweetModal}
          sendTweet={this.sendTweet}
          handleChange={this.handleChange}
          tweetContent={tweetContent}
        />
        {replies.map(tweet => (
          <Reply
            key={tweet.uid}
            tweet={tweet}
            currentUser={this.props.currentUser}
            handleDeleteTweet={this.handleDeleteTweet}
            handleScrollToBottom={this.handleScrollToBottom}
          />
        ))}
        <TweetModalFooter
          replies={replies}
        />
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
  updateUserStatsTrigger: state.tweet.updateUserStatsTrigger,
  tweetClickedTrigger: state.tweet.tweetClickedTrigger,
});

export default connect(
  mapStateToProps,
  {
    addReply,
    deleteReply,
    clearReplies,
    updateUserStats,
  }
)(Replies);
