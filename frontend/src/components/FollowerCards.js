
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
  setTargetUserFollowers,
} from "../actions";


import ProfileCard2 from "./ProfileCard2";
import BottomScrollListener from 'react-bottom-scroll-listener';




class FollowerCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomCount: 0,
      currentUser: null,
    };
  }


  componentDidMount() {
    const { currentUser } = this.props;
    api.getUserById(currentUser.uid)
      .then(response => {
        this.setState({
          currentUser: response.data,
        });
      })
      .catch(error => {
        console.error(error);
      });
    this.initFollowers();
  }


  initFollowers = () => {
    const { targetUser, numCol } = this.props;
    const { bottomCount } = this.state;
    this.props.setTargetUserFollowers(
      targetUser.uid,
      numCol,
      bottomCount,
      true, //isInit
    );
  }

  getProfileCards = () => {
    const { currentUser } = this.state;
    const { numCol, followersList } = this.props;

    var res = [];
    const myList = followersList;
    for(var i = 0; i < myList.length; i+=numCol) {
      var oneRow = [];
      oneRow.push(myList.slice(i, i+numCol).map(user => (
        <div key={user.uid} style={{display:'inline-block'}}>
          <ProfileCard2
            key={user.uid}
            currentUser={currentUser}
            targetUser={user}
          />
        </div>
      )));
      res.push(oneRow);
    }
    return res;
  }

  loadFollowers = () => {
    const { targetUser, numCol } = this.props;
    const { bottomCount } = this.state;
    this.props.setTargetUserFollowers(
      targetUser.uid,
      numCol,
      bottomCount,
      false,
    );
  }

  handleScrollToBottom = () => {
    const { bottomCount } = this.state;

    this.setState({
      bottomCount: bottomCount + 1,
    });

    this.loadFollowers();
  }


  render() {
    const { currentUser } = this.state;
    if(currentUser === null) {
      return null;
    }
    
    return (
      
        <BottomScrollListener
          onBottom={() => this.handleScrollToBottom()}
        >
          {this.getProfileCards()}
        </BottomScrollListener>
      
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  targetUser: state.user.targetUser,
  followersList: state.user.targetUserFollowers,
  userStatsTabClickedTrigger: state.tweet.userStatsTabClickedTrigger,
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      setTargetUserFollowers,
    }
  )(FollowerCards)
);