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

import * as api from "../api";
import { connect } from "react-redux";
import { withRouter } from 'next/router';
import {
  follow,
  unfollow,
  setTargetUser,
} from "../actions";




class ProfileCard2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.key,
      currentUser: this.props.currentUser,
      targetUser: this.props.targetUser,
      isFollowingThisUser: null,
      isMouseOnButton: false,
      isMouseOnName: false,
      isMouseOnUsername: false,
    };
  }

  componentDidMount() {
    const { targetUser } = this.props;
    this.handleCheckFollowing(targetUser);
  }

  /*
  componentDidUpdate(prevProps) {
    const { userStatsTabClickedTrigger } = this.props;

    const flag = (
      prevProps.userStatsTabClickedTrigger !==
      userStatsTabClickedTrigger
    );

    if(flag) {
      this.handleCheckFollowing();
    }
  }*/
  

  hoverOnButton = () => {
    this.setState({
      isMouseOnButton: true,
    });
  }

  hoverOffButton = () => {
    this.setState({
      isMouseOnButton: false,
    });
  }

  dropDown = () => {
    const {targetUser, currentUser} = this.state;
    if(targetUser.uid === currentUser.uid) {
      return null;
    }
    return (
      <Dropdown style={{marginLeft:10}} icon='ellipsis vertical'>
        <Dropdown.Menu style={{zIndex:103}}>
          <Dropdown.Item text='Tweet to @username' />
          <Dropdown.Item text='Send a Direct Message' />
          <Dropdown.Item text='Add or remove from lists...' />
          <Dropdown.Divider />
          <Dropdown.Item text='Mute @username' />
          <Dropdown.Item text='Block @username' />
          <Dropdown.Item text='Report @username' />
          <Dropdown.Divider />
          <Dropdown.Item text='Turn off Retweets' />
          <Dropdown.Item text='Turn on mobile notifications' />
          <Dropdown.Divider />
          <Dropdown.Item text='Embed this Profile' />
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  isLoading = () => {
    return (
      this.state.targetUser === null ||
      this.state.isFollowingThisUser === null
    );
  }

  checkFollowing = (currentUser, targetUser) => {
    const following = currentUser.following;
    return following.includes(targetUser.uid);
  }

  handleCheckFollowing = (targetUser) => {
    const { currentUser } = this.props;
    this.setState({
      isFollowingThisUser: this.checkFollowing(currentUser, targetUser),
    });
  }

  handleFollowing = () => {
    const { targetUser } = this.state;
    const { currentUser } = this.props;
    this.setState({
      isFollowingThisUser: true,
    });
    this.props.follow(currentUser.uid, targetUser.uid);
  }

  handleUnfollowing = () => {
    const { targetUser } = this.state;
    const { currentUser } = this.props;
    this.setState({
      isFollowingThisUser: false,
    });
    this.props.unfollow(currentUser.uid, targetUser.uid);
  }

  getButton = () => {
    const {targetUser, currentUser} = this.state;
    if(targetUser.uid === currentUser.uid) {
      return null;
    }
    if(!this.state.isFollowingThisUser) {
      return (
        <Button
          basic color="blue"
          onClick={() => this.handleFollowing()}
          style={{borderRadius:20, fontWeight:"bold", width:100}}
          onMouseEnter={() => this.hoverOnButton()}
          onMouseLeave={() => this.hoverOffButton()}
          content='Follow'
        />
      );
    }
    if(this.state.isMouseOnButton) {
      return (
        <Button
          content='Unfollow'
          style={{
            width:100, color:"white",
            backgroundColor:"red", borderRadius:20
          }}
          onMouseEnter={() => this.hoverOnButton()}
          onMouseLeave={() => this.hoverOffButton()}
          onClick={() => this.handleUnfollowing()}
        />
      );
    }
    return(
      <Button
        primary
        content='Following'
        style={{width:100, borderRadius:20}}
        onMouseEnter={() => this.hoverOnButton()}
        onMouseLeave={() => this.hoverOffButton()}
      />
    );
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

  handleOnHoverUsername = () => {
    this.setState({
      isMouseOnUsername: true,
    })
  }

  handleOffHoverUsername = () => {
    this.setState({
      isMouseOnUsername: false,
    })
  }

  getNameTextStyle = () => {
    if(this.state.isMouseOnName) {
      return ({
        textDecoration:"underline",
        marginTop:15,
        fontSize:20,
        fontWeight:"bold",
        cursor:"pointer",
      });
    }
    return ({
      marginTop:15,
      fontSize:20,
      fontWeight:"bold",
      cursor:"pointer",
    });
  }

  getUsernameTextStyle = () => {
    if(this.state.isMouseOnUsername) {
      return ({
        textDecoration:"underline",
        marginTop:5,
        cursor:"pointer",
      });
    }
    return ({
      marginTop:5,
      cursor:"pointer",
    });
  }

  handleProfileRouting = () => {
    const { targetUser } = this.state;
    const { router } = this.props;

    this.props.setTargetUser(targetUser);

    router.push({
      pathname: '/profile',
      query: { u:targetUser.username }
    });
  }

  render() {
    const { router } = this.props;

    if(this.isLoading()) {
      return null;
    }
    const {targetUser} = this.state;
    
    return(
      <Card style={{width:294.5, height:294.5, marginTop:10, marginLeft:10}}>
        <Image
          style={{height:100, width:"100%", cursor:"pointer"}}
          src="../../static/images/tmppic.png"
          onClick={() => this.handleProfileRouting()}
        />
        <Card.Content>
          <div className="profilecard__wrapper">
            <div className="profilecard__box profilecard__sidebar">
              <Image
                avatar
                bordered
                src={targetUser.avatar}
                style={{
                  borderColor:"white", borderWidth:2,
                  marginTop:-45, marginLeft:-5,
                  zIndex:100, width:75, height:75,
                  cursor:"pointer",
                }}
                onClick={() => this.handleProfileRouting()}
              />
              <div
                style={this.getNameTextStyle()}
                onMouseEnter={() => this.handleOnHoverName()}
                onMouseLeave={() => this.handleOffHoverName()}
                onClick={() => this.handleProfileRouting()}
              >
                {targetUser.name}
              </div>
              <div
                style={this.getUsernameTextStyle()}
                onMouseEnter={() => this.handleOnHoverUsername()}
                onMouseLeave={() => this.handleOffHoverUsername()}
                onClick={() => this.handleProfileRouting()}
              >
                @{targetUser.username}
              </div>
              
            </div>
            <div
              className="profilecard__box profilecard__header"
              style={{marginLeft:85}}
            >
              {this.getButton()}
              {this.dropDown()}
            </div>
            <div
              className="profilecard__box profilecard__content"
              style={{marginTop:15, height:90, paddingRight:30}}>
              {targetUser.biography}
            </div>
          </div>
        </Card.Content>
      </Card>
    );
    
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  updateUserStatsTrigger: state.tweet.updateUserStatsTrigger,
  followTrigger: state.tweet.followTrigger,
  userStatsTabClickedTrigger: state.tweet.userStatsTabClickedTrigger,
});

export default withRouter(
  connect(
    mapStateToProps,
    {follow, unfollow, setTargetUser}
  )(ProfileCard2)
);