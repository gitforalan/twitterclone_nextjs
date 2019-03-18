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
import DeleteTweetConfirmationModal from "./DeleteTweetConfirmationModal";

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
import * as api from "../api";





class TweetModal extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      currentUser: this.props.currentUser,
      mouseOnIconNum: null,
      isMouseOnName: false,
      tweet: null,
      replies: null,
      showNewDirectMessageModal: false,
      showTweetActivityModal: false,
      isLiked: false,
      showTweetModal: false,
      hasError: false,
      tweetClickedTrigger: this.props.tweetClickedTrigger,
      deletedTweet: null,
      showDeleteTweetConfirmationModal: false,
    }
  }

  checkLiked = (likes, tweet) => likes.includes(tweet.uid);


  componentDidMount() {
    this.checkTweetModal();

    window.addEventListener(
      "popstate", this.checkTweetModal.bind(this)
    );
  }


  componentWillUnmount() {
    window.removeEventListener(
      "popstate", this.checkTweetModal.bind(this)
    );
  }

  componentDidUpdate(prevProps) {
    const { tweetClickedTrigger } = this.props;
    if(prevProps.tweetClickedTrigger !== tweetClickedTrigger) {
      this.checkTweetModal();
    }
  }

  

  getQueryTweetId = () => {
    // Don't use router.query
    // It won't detect url change.
    var params = window.location.href.split("?");
    if(params.length===1) {
      return null;
    }
    params = params[1].split("&");
    var tweetId = params.find(
      param => param.includes("tid=")
    );
    
    if(!tweetId) {
      return null;
    }

    tweetId = tweetId.split("=")[1];
    return tweetId;
  }

  checkTweetModal = () => {

    const { currentUser } = this.props;

    this.setState({
      tweet: null,
      replies: null,
    });

    const tweetId = this.getQueryTweetId();
    if(tweetId !== null) {
      api.getTweetById(tweetId)
        .then(response => {
          const _tweet = response.data;
          this.setState({
            tweet: _tweet,
            isLiked: this.checkLiked(currentUser.likes, _tweet),
          });
          api.getReplies(_tweet.uid, 0, Date.now())
            .then(response => {
              this.setState({
                replies: response.data.replies,
              });
            })
            .catch(error => {
              console.error(error);
            });
          if(_tweet !== null) {
            this.setState({
              showTweetModal: true,
            });
          }
        })
        .catch(error => {
          console.error(error);
          this.setState({
            hasError: true,
          });
        });
    } else {
      this.setState({
        tweet: null,
        replies: null,
        showTweetModal: false,
      });
    }
  }


  timeFromNow = timestamp => moment(timestamp).fromNow();


  handleToggleLike = (e) => {
    e.stopPropagation();
    const { isLiked, tweet } = this.state;
    const {
      currentUser,
      likeTweet,
      unlikeTweet,
      setCurrentUserById
    } = this.props;

    const sendRequest = isLiked ? unlikeTweet : likeTweet;
    this.setState({ isLiked: !isLiked });
    sendRequest(currentUser.uid, tweet.uid);
    setTimeout(function() {
      setCurrentUserById(currentUser.uid)
    }.bind(this), 100);
  }


  hideNewDirectMessageModal = () => {
    this.setState({
      showNewDirectMessageModal: false
    });
  }

  hideTweetActivityModal = () => {
    this.setState({
      showTweetActivityModal: false
    });
  }

  handleClickDirectMessage = (e) => {
    e.stopPropagation();
    this.setState({
      showNewDirectMessageModal: true,
    });
  }

  handleClickTweetActivity = (e) => {
    e.stopPropagation();
    this.setState({
      showTweetActivityModal: true,
    });
  }

  hoverOnIcon = (iconNum) => {
    this.setState({
      mouseOnIconNum: iconNum,
    });
  }

  hoverOffIcon = () => {
    this.setState({
      mouseOnIconNum: null,
    });
  }

  getIconColor = (iconNum) => {
    const {mouseOnIconNum} = this.state;
    let _hoverOnIconStyle = this.styles.hoverOnIconStyle1;
    let _hoverOffIconStyle = this.styles.hoverOffIconStyle;
    if(mouseOnIconNum===1 || mouseOnIconNum===2) {
      _hoverOnIconStyle = this.styles.hoverOnIconStyle2;
    }
    return mouseOnIconNum===iconNum ? _hoverOnIconStyle:_hoverOffIconStyle;
  }

  handleClickReplyIcon = (e) => {
    e.stopPropagation();

    const { router } = this.props;

    var _query = router.query;

    _query.reply = true;

    router.push({
      pathname: router.pathname,
      query: _query
    });

    setTimeout(function() {
      this.props.replyIconClicked()
    }.bind(this), 10);
  }

  footerIcons = () => {

    var icon0 = (
      <Icon
        style={this.getIconColor(0)}
        name='comment outline'
        onMouseEnter={() => this.hoverOnIcon(0)}
        onMouseLeave={() => this.hoverOffIcon()}
        onClick={this.handleClickReplyIcon}
      />
    );
    var icon1 = (
      <Icon
        style={this.getIconColor(1)}
        name='retweet'
        onMouseEnter={() => this.hoverOnIcon(1)}
        onMouseLeave={() => this.hoverOffIcon()}
      />
    );
    var icon2_nolike = (
      <Icon
        style={this.getIconColor(2)}
        name='heart outline'
        onMouseEnter={() => this.hoverOnIcon(2)}
        onMouseLeave={() => this.hoverOffIcon()}
        onClick={this.handleToggleLike}
      />
    );
    var icon2_liked = (
      <Icon
        style={this.styles.hoverOnIconStyle2}
        name='heart'
        onMouseEnter={() => this.hoverOnIcon(2)}
        onMouseLeave={() => this.hoverOffIcon()}
        onClick={this.handleToggleLike}
      />
    );
    var icon3 = (
      <Icon
        style={this.getIconColor(3)}
        name='mail'
        onMouseEnter={() => this.hoverOnIcon(3)}
        onMouseLeave={() => this.hoverOffIcon()}
        onClick={this.handleClickDirectMessage}
      />
    );
    var icon4 = (
      <Icon
        style={this.getIconColor(4)}
        name='chart bar'
        onMouseEnter={() => this.hoverOnIcon(4)}
        onMouseLeave={() => this.hoverOffIcon()}
        onClick={this.handleClickTweetActivity}
      />
    );

    const { tweet, isLiked } = this.state;
    const { currentUser } = this.props;

    return (
      <div>
        <Popup
          horizontalOffset={10}
          trigger={icon0}
          content='Reply'
          inverted
        />
        <Popup
          horizontalOffset={10}
          trigger={icon1}
          content='Retweet'
          inverted
        />
        <Popup
          horizontalOffset={10}
          trigger={ isLiked ? icon2_liked:icon2_nolike}
          content={ isLiked ? 'Undo like':'Like'}
          inverted
        />
        <Popup
          inverted
          horizontalOffset={10}
          trigger={
            tweet.postedBy.uid===currentUser.uid ? icon4:icon3
          }
          content={
            tweet.postedBy.uid===currentUser.uid ?
            'View Tweet Activity':'Direct message'
          }
        />
      </div>
    );
  }

  tweetDropdown = () => {
    const { tweet } = this.state;
    const{ currentUser } = this.props;
    var menu1 = (
      <Dropdown.Menu>
        <Dropdown.Item text='Share via Direct Message' />
        <Dropdown.Item text='Copy link to Tweet' />
        <Dropdown.Item text='Embed Tweet' />
        <Dropdown.Item text='Pin to your profile page' />
        <Dropdown.Item
          text='Delete Tweet'
          onClick={() => this.handleDeleteTweet(tweet)}
        />
        <Dropdown.Divider />
        <Dropdown.Item text='Add to new Moment' />
      </Dropdown.Menu>
    );
    var menu2 = (
      <Dropdown.Menu>
        <Dropdown.Item text='Copy link to Tweet' />
        <Dropdown.Item text='Embed Tweet' />
        <Dropdown.Item text='Mute @username' />
        <Dropdown.Item text='Block @username' />
        <Dropdown.Item text='Report Tweet' />
        <Dropdown.Item text="I don't like this tweet" />
        <Dropdown.Divider />
        <Dropdown.Item text='Add to other Moment' />
        <Dropdown.Item text='Add to new Moment' />
      </Dropdown.Menu>
    );

    return (
      <div>
        <Dropdown
          pointing='top left'
          style={{
            top:37,
            right:40,
            zIndex:500,
            position:"absolute",
            fontSize:18,
          }}
        >
          {tweet.postedBy.uid===currentUser.uid ? menu1:menu2}
        </Dropdown>
      </div>
    );
  }

  profileRouting = (e) => {
    e.stopPropagation();
    const { tweet } = this.state;
    const { router } = this.props;
    router.push({
      pathname: '/profile',
      query: {u:tweet.postedBy.username}
    });
  }

  handleOnHoverName = () => {
    this.setState({
      isMouseOnName: true,
    })
  }

  handleOffHoverName = () => {
    this.setState({
      isMouseOnName: false,
    })
  }

  styles = {
    hoverOnStyle: {
      width:600,
      backgroundColor:"#F0F8FF",
      cursor:"pointer"
    },
    hoverOffStyle: {
      width:600,
    },
    hoverOnIconStyle1: {
      color:"blue",
      marginRight:50,
      marginTop:15
    },
    hoverOnIconStyle2: {
      color:"red",
      marginRight:50,
      marginTop:15
    },
    hoverOffIconStyle: {
      color:"grey",
      marginRight:50,
      marginTop:15
    }
  }

  getNameTextStyle = () => {
    if(this.state.isMouseOnName) {
      return ({
        textDecoration:"underline",
        fontWeight:"bold",
        display:"inline",
        cursor:"pointer",
      });
    }
    return ({
      fontWeight:"bold",
      display:"inline",
      cursor:"pointer",
    });
  }

  routerTweetModalClose = () => {
    const {router} = this.props;
    var _query = router.query;
    delete _query.tid;
    delete _query.reply;

    router.push({
      pathname: router.pathname,
      query: _query
    });
  }

  hideTweetModal = () => {
    this.routerTweetModalClose();
    this.setState({
      showTweetModal: false
    });
  }

  isLoading = () => {
    const { tweet, replies } = this.state;

    return (
      tweet === null ||
      replies === null
    );
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

    this.routerTweetModalClose();

    this.setState({
      deletedTweet: null,
      showTweetModal: false,
      showDeleteTweetConfirmationModal: false,
    });
  }
  



  render() {
    const { tweet } = this.state;

    const { router } = this.props;

    if(this.state.hasError) {
      router.push("/pagedoesnotexist");
    }

    if(this.isLoading()) {
      const tweetId = this.getQueryTweetId();
      return (
        <Modal
          open={tweetId!==null}
          style={{
            position:"absolute",
            top:"35%",
            left:"46.5%",
            backgroundColor:"transparent",
            width:0
          }}
        >
          <CircularProgress
            disableShrink
            size={80}
          />
        </Modal>
      );
    }

    return(
      <Modal
        closeOnDimmerClick={true}
        onClose={() => this.hideTweetModal()}
        open={this.state.showTweetModal}
        style={{
          width:650,
          zIndex:1500,
        }}
      >
        <Segment.Group >
          <Segment
            style={{width:650,}}
          >
            <div
              style={{padding:20}}
              className="tweetmodal__wrapper"
            >
              <div className="tweetmodal__box tweetmodal__sidebar">
                <Image
                  avatar
                  style={{
                    height:45, width:45,
                    cursor:"pointer"
                  }}
                  floated='left'
                  src={tweet.postedBy.avatar}
                  onClick={this.profileRouting}
                />
              </div>
      
              <div
                className="tweetmodal__box tweetmodal__header"
                style={{marginLeft:10, marginTop:0}}
              >
                <div
                  style={this.getNameTextStyle()}
                  onClick={this.profileRouting}
                  onMouseEnter={() => this.handleOnHoverName()}
                  onMouseLeave={() => this.handleOffHoverName()}
                >
                  {tweet.postedBy.name}
                </div>
                {this.tweetDropdown()}
                <div
                  style={{marginTop:5, cursor:"pointer"}}
                  onClick={this.profileRouting}
                  onMouseEnter={() => this.handleOnHoverName()}
                  onMouseLeave={() => this.handleOffHoverName()}
                >
                  @{tweet.postedBy.username}
                </div>
              </div>

              <div className="tweetmodal__box tweetmodal__content">
                <div style={{
                  fontSize:25,
                  marginTop:15,
                  wordBreak:"break-all",
                }}>
                  {tweet.content.split('\n').map((item, key) => {
                    return (
                      <React.Fragment key={key}>
                        {item}<br/>
                      </React.Fragment>
                    );
                  })}
                </div>
                <div style={{marginTop:20, color:"grey"}}>
                  {this.timeFromNow(tweet.timestamp)}
                </div>
              </div>
      
              <div
                style={{marginTop:10}}
                className="tweetmodal__box tweetmodal__footer"
              >
                {this.footerIcons()}
              </div>
            </div>
            <TweetActivityModal
              hideTweetActivityModal={this.hideTweetActivityModal}
              showTweetActivityModal={this.state.showTweetActivityModal}
            />
            <NewDirectMessageModal
              hideNewDirectMessageModal={this.hideNewDirectMessageModal}
              showNewDirectMessageModal={this.state.showNewDirectMessageModal}
            />
          </Segment>

          <Replies
            parentTweet={tweet}
            replies={this.state.replies}
            hideTweetModal={this.hideTweetModal}
          />

          <DeleteTweetConfirmationModal 
            tweet={this.state.tweet}
            showModal={this.state.showDeleteTweetConfirmationModal}
            hideDeleteConfirmationModal={this.hideDeleteConfirmationModal}
            deleteTweetFinal={this.deleteTweetFinal}
          />

        </Segment.Group>

      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  tweetClickedTrigger: state.tweet.tweetClickedTrigger,
});


export default withRouter(
  connect(
    mapStateToProps,
    {
      likeTweet,
      unlikeTweet,
      deleteTweet,
      replyIconClicked,
      setCurrentUserById,
    })(TweetModal)
);