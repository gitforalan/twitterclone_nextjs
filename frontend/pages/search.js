
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

import { connect } from "react-redux";
import firebase from "../lib/firebase";

import CircularProgress from '@material-ui/core/CircularProgress';
import WhoToFollowCards from "../src/components/WhoToFollowCards.js";
import WorldwideTrendsCard from "../src/components/WorldwideTrendsCard.js";
import ProfileCard from "../src/components/ProfileCard.js";
import AboutTwitter from "../src/components/AboutTwitter.js";
import Tweets from "../src/components/Tweets.js";

import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';

import {
  clearCurrentUser,
  setCurrentUserById
} from "../src/actions";


import * as api from "../src/api";



class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      searchResult: [],
    };
  }

  setSearchResult = () => {
    const { router } = this.props;
    const query = router.query;
    api.searchTweet(query.q)
      .then(response => {
        this.setState({
          searchResult: response.data.tweets
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.setSearchResult();
  }

  componentDidUpdate(prevProps) {
    const { router } = this.props;
    if(router.asPath !== prevProps.router.asPath) {
      this.setSearchResult();
    }
  }

  listSearchResult = () => {
    const { searchResult } = this.state;
    return (
      <React.Fragment>
        {searchResult.map(tweet => (
          <div key={tweet.uid} style={{marginTop:40}}>
            {tweet.content} by @{tweet.postedBy.username}
          </div>
        ))}
      </React.Fragment>
    )
  }
  

  render() {
  
    return (
      <div
        style={{
          height:"100%",
          display:"flex",
          justifyContent:"center",
        }}>
        <div style={{
          fontSize:20,
          marginTop:50,
          fontWeight:"bold"
        }}>
          <div style={{fontSize:40, marginTop:50}}>
            Search Result:
          </div>
          {this.listSearchResult()}
        </div>
      </div>
    );
  }
}


const styles = theme => ({
  hideScroll: {
    '&::-webkit-scrollbar': {
      display:'none'
    },
  },
});



const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});


export default withStyles(styles)(
  withRouter(
    connect(mapStateToProps)(SearchPage)
  )
);


