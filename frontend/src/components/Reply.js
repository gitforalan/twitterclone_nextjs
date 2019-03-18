
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
import { Link } from 'next/link';
import moment from "moment";
import TweetActivityModal from "./TweetActivityModal";
import NewDirectMessageModal from "./NewDirectMessageModal";
import {
  likeTweet,
  unlikeTweet,
  tweetClicked,
  setCurrentUserById,
} from "../actions";
import { withRouter } from 'next/router';
import { connect } from "react-redux";
import Router from "next/router";



class Reply extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      parentTweet: this.props.parentTweet,
      tweet: this.props.tweet,
      currentUser: this.props.currentUser,
      isMouseOnPanel: false,
      // 0:Reply, 1:Retweet, 2:Like, 3:Direct Message
      mouseOnIconNum: null,
      isMouseOnName: false,
      userIdList: this.props.userIdList,
      isLiked: null,
      showNewDirectMessageModal: false,
      showTweetActivityModal: false,
      tweetClickedTrigger: this.props.tweetClickedTrigger
    };
  }

  checkLiked = likes => likes.includes(this.props.tweet.uid);

  componentDidMount() {
    const { currentUser } = this.props;
    this.setState({
      isLiked: this.checkLiked(currentUser.likes),
    });
  }



  componentDidUpdate(prevProps) {
    const { currentUser } = this.props;
    if (prevProps.currentUser.likes.length !== currentUser.likes.length) {
      this.setState({
        isLiked: this.checkLiked(currentUser.likes),
      });
    }
  }


  hoverOn = () => {
    this.setState({
      isMouseOnPanel: true,
    });
  }

  hoverOff = () => {
    this.setState({
      isMouseOnPanel: false,
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

  tweetLikeListener = (myBool) => {
    this.setState({
      isLiked: myBool,
    });
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

  handleToggleLike = (e) => {
    e.stopPropagation();
    const { isLiked } = this.state;
    const {
      currentUser,
      tweet,
      likeTweet,
      unlikeTweet,
      setCurrentUserById,
    } = this.props;

    const sendRequest = isLiked ? unlikeTweet : likeTweet;
    this.setState({ isLiked: !isLiked });
    sendRequest(currentUser.uid, tweet.uid);
    setTimeout(function() {
      setCurrentUserById(currentUser.uid)
    }.bind(this), 100);
  }

  tweetDropdown = () => {
    const {tweet, currentUser} = this.state;
    var menu1 = (
      <Dropdown.Menu style={{zIndex:500}}>
        <Dropdown.Item text='Share via Direct Message' />
        <Dropdown.Item text='Copy link to Tweet' />
        <Dropdown.Item text='Embed Tweet' />
        <Dropdown.Item text='Pin to your profile page' />
        <Dropdown.Item
          text='Delete Tweet'
          onClick={() => this.props.handleDeleteTweet(tweet)}
        />
        <Dropdown.Divider />
        <Dropdown.Item text='Add to new Moment' />
      </Dropdown.Menu>
    );
    var menu2 = (
      <Dropdown.Menu style={{zIndex:500}}>
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
            top:15,
            right:40,
            position:"absolute",
            fontSize:18,
          }}
        >
          {tweet.postedBy.uid===currentUser.uid ? menu1:menu2}
        </Dropdown>
      </div>
    );
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

    const {tweet, currentUser, isLiked} = this.state;

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
          horizontalOffset={10}
          trigger={ tweet.postedBy.uid===currentUser.uid ? icon4:icon3 }
          content={
            tweet.postedBy.uid===currentUser.uid ?
            'View Tweet Activity':'Direct message'
          }
          inverted
        />
      </div>
    );
  }

  styles = {
    hoverOnStyle: {
      width:650,
      backgroundColor:"#F0F8FF",
      cursor:"pointer"
    },
    hoverOffStyle: {
      width:650,
      cursor:"pointer",
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

  getTweetPanelStyle = () => {
    return (
      this.state.isMouseOnPanel ?
        this.styles.hoverOnStyle:this.styles.hoverOffStyle
    );
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

  timeFromNow = timestamp => moment(timestamp).fromNow();

  handleClickReplyIcon = (e) => {
    e.stopPropagation();

    const { router, tweet } = this.props;

    var _query = router.query;
    const tweetId = this.getQueryTweetId();
    
    if(tweetId === tweet.uid) {
      return null;
    }

    _query.tid = tweet.uid;
    _query.reply = true;

    router.push({
      pathname: router.pathname,
      query: _query
    });

    setTimeout(function() {
      this.props.tweetClicked() //After 1 second, func called.
    }.bind(this), 10);
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

  routerTweetModalOpen = (tweet) => {
    const {router} = this.props;
    var _query = router.query;
    const tweetId = this.getQueryTweetId();

    
    if(tweetId === tweet.uid) {
      return null;
    }

    _query.tid = tweet.uid;
    delete _query.reply;

    router.push({
      pathname: router.pathname,
      query: _query
    });
  }

  routerTweetModalClose = () => {
    const {router} = this.props;
    var _query = router.query;
    delete _query.tid;

    router.push({
      pathname: router.pathname,
      query: _query
    });
  }

  handleClickTweet = () => {
    const { tweet } = this.props;

    this.routerTweetModalOpen(tweet);

    setTimeout(function() {
      this.props.tweetClicked() //After 1 second, func called.
    }.bind(this), 10);
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

  getNameTextStyle = () => {
    if(this.state.isMouseOnName) {
      return ({
        textDecoration:"underline",
        fontWeight:"bold",
        display:"inline",
      });
    }
    return ({
      fontWeight:"bold",
      display:"inline",
    });
  }

  profileRouting = (e) => {
    e.stopPropagation();
    const { router, tweet } = this.props;
    router.push({
      pathname: '/profile',
      query: {u:tweet.postedBy.username}
    });
  }

  render() {
    const { tweet } = this.props;

    return(
      <Segment
        style={this.getTweetPanelStyle()}
        onMouseEnter={() => this.hoverOn()}
        onMouseLeave={() => this.hoverOff()}
        onClick={() => this.handleClickTweet(false)}
      >
        <div className="tweet__wrapper">
          <div className="tweet__box tweet__sidebar">
            <Image
              avatar
              style={{height:45, width:45}}
              floated='left'
              src={tweet.postedBy.avatar}
              onClick={this.profileRouting}
            />
          </div>
          <div
            style={{marginLeft:10, marginTop:-5}}
            className="tweet__box tweet__header"
          >
            <div
              style={this.getNameTextStyle()}
              onMouseEnter={() => this.handleOnHoverName()}
              onMouseLeave={() => this.handleOffHoverName()}
              onClick={this.profileRouting}
            >
              {tweet.postedBy.name}
            </div> 
            <div
              onMouseEnter={() => this.handleOnHoverName()}
              onMouseLeave={() => this.handleOffHoverName()}
              style={{display:"inline", marginLeft:5, color:"grey"}}
              onClick={this.profileRouting}
            >
              @{tweet.postedBy.username}・{this.timeFromNow(tweet.timestamp)}
            </div>
            {this.tweetDropdown()}
            <div style={{wordBreak:"break-all", marginTop:5}}>
              {tweet.content.split('\n').map((item, key) => {
                return <React.Fragment key={key}>{item}<br/></React.Fragment>
              })}
            </div>
          </div>
          <div style={{marginLeft:10}} className="tweet__box tweet__footer">
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
      tweetClicked,
      setCurrentUserById
    }
  )(Reply)
);