
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

import { getUserById } from "../api";
import { connect } from "react-redux";
import { withRouter } from 'next/router';
import {
  setTargetUserFollowing,
} from "../actions";


import ProfileCard2 from "./ProfileCard2";
import BottomScrollListener from 'react-bottom-scroll-listener';




class FollowingCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottomCount: 0,
    };
  }


  componentDidMount() {
    this.initFollowing();
  }


  componentDidUpdate(prevProps) {
    const { userStatsTabClickedTrigger } = this.props;

    const flag = (
      prevProps.userStatsTabClickedTrigger !==
      userStatsTabClickedTrigger
    );

    if(flag) {
      this.initFollowing();
    }
  }


  initFollowing = () => {
    const { targetUser, numCol } = this.props;
    const { bottomCount } = this.state;
    this.props.setTargetUserFollowing(
      targetUser.uid,
      numCol,
      bottomCount,
      true,
    );
  }

  getProfileCards = () => {
    const { numCol, followingList } = this.props;
    var res = [];
    const myList = followingList;
    for(var i = 0; i < myList.length; i+=numCol) {
      var oneRow = [];
      oneRow.push(myList.slice(i, i+numCol).map(user => (
        <div key={user.uid} style={{display:'inline-block'}}>
          <ProfileCard2
            key={user.uid}
            targetUser={user}
          />
        </div>
      )));
      res.push(oneRow);

      /*
      res.push(oneRow.map((item,k) => {
        return <div key={k}>{item}</div>
      }));
      */
    }
    return res;
  }

  loadFollowing = () => {
    const { targetUser, numCol } = this.props;
    const { bottomCount } = this.state;
    this.props.setTargetUserFollowing(
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

    this.loadFollowing();
  }


  render() {
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
  followingList: state.user.targetUserFollowing,
  userStatsTabClickedTrigger: state.tweet.userStatsTabClickedTrigger,
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      setTargetUserFollowing,
    }
  )(FollowingCards)
);