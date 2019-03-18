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
import Link from "next/link";
import { withRouter } from 'next/router';
import { connect } from "react-redux";
import firebase from "../../lib/firebase";
import { clearUserState, clearTweetState } from "../actions";


class HeaderIconDropDown extends React.Component {

  handleSignout = () => {
    const { router } = this.props;

    this.props.clearUserState();
    this.props.clearTweetState();

    firebase
      .auth()
      .signOut()
      .then(() => router.push("/")); 

  };

  trigger = () => {
    const { currentUser } = this.props;
    return (
      <Image
        avatar
        size="mini"
        src={currentUser.avatar}
      />
    );
  }

  defaultImage = () => {
    return (
      <Image
        avatar
        size="mini"
        src="../../static/images/plain-white-background.jpg"
      />
    );
  }

  render() {
    const { router, currentUser } = this.props;

    if(currentUser === null) {
      return this.defaultImage();
    }

    return (
      <Dropdown
        icon={null}
        pointing='top right'
        trigger={this.trigger()}
        style={{zIndex:500}}
      >
        <Dropdown.Menu style={{width:200, cursor:"pointer"}} >
          <div onClick={() =>
            router.push({
              pathname: '/profile',
              query: {u:currentUser.username}
            })}
          >
            <div style={{
              fontWeight:"bold", fontSize:17,
              marginLeft:18, marginTop:15
            }}>
              {currentUser.name}
            </div>
            <div style={{marginLeft:16, marginTop:3}} >
              @{currentUser.username}
            </div>
          </div>
          <Dropdown.Divider />
          <Dropdown.Item
            icon='user'
            content='Profile'
            onClick={() =>
              router.push({
                pathname: '/profile',
                query: {u:currentUser.username}
              })
            }
          />
          <Dropdown.Item
            icon='list alternate outline'
            content='Lists'
            onClick={() =>
              router.push({
                pathname: '/profile',
                query: {
                  u:currentUser.username,
                  p:"lists",
                }
              })
            }
          />
          <Dropdown.Item
            icon='lightning'
            content='Moments'
            onClick={() =>
              router.push({
                pathname: '/profile',
                query: {
                  u:currentUser.username,
                  p:"moments",
                }
              })
            }
          />
          <Dropdown.Divider />
          <Dropdown.Item icon='react' text='Promote Mode' />
          <Dropdown.Item icon='external square' text='Twitter Ads' />
          <Dropdown.Item icon='chart bar' text='Analytics' />
          <Dropdown.Divider />
          <Dropdown.Item text='Settings and privacy' />
          <Dropdown.Item text='Help Center' />
          <Dropdown.Item text='Keyboard shortcuts' />
          <Dropdown.Item
            text='Log out'
            onClick={() => this.handleSignout()}
          />
          <Dropdown.Divider />
          <Dropdown.Item icon='moon outline' text='Night mode' />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});


export default withRouter(
  connect(
    mapStateToProps,
    {clearUserState, clearTweetState}
  )(HeaderIconDropDown)
);