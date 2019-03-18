import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import { connect } from "react-redux";

import * as api from "../api";
import { follow, unfollow, userStatsTabClicked } from "../actions";



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



class UserStatsBar extends React.Component {

  constructor(props) {
    super(props);

    const { targetUser } = this.props;
    this.state = {
      tabValue: null,
      targetUser: targetUser,
      onMouseTabNum: null,
      titles: [
        "Tweets",
        "Following",
        "Followers",
        "Likes",
        "Lists",
        "Moments"
      ],
      vals: [0,0,0,0,0,0],
      widths: [70, 85, 85, 65, 65, 80],
      lefts: [2.5, 10, 10, 0, 0, 7],
      screenWidth: null,
      username: null,
      hasError: false,
      isMouseOnFollowButton: false,
      isFollowingThisUser: false,
      updateUserStatsTrigger: this.props.updateUserStatsTrigger,
    };
  }

  updateScreenWidth() {
    this.setState({
      screenWidth: window.innerWidth,
    });
  }

  componentWillUnmount() {
    window.removeEventListener(
      "resize", this.updateScreenWidth.bind(this)
    );
    window.removeEventListener(
      "popstate", this.setTabValue.bind(this)
    );
  }
  
  componentDidMount() {
    this.updateScreenWidth();
    window.addEventListener(
      "resize", this.updateScreenWidth.bind(this)
    );
    window.addEventListener(
      "popstate", this.setTabValue.bind(this)
    );
    
    try {
      this.setTabValue();
      this.setTabStatsValue();
    } catch {
      //this.setState({hasError:true});
    }
    this.handleCheckFollowing();
  }

  componentDidUpdate(prevProps) {
    const { router } = this.props;
    const { updateUserStatsTrigger } = this.props;

    var flag1 = (
      prevProps.updateUserStatsTrigger !==
      updateUserStatsTrigger
    );

    var flag2 = router.asPath !== prevProps.router.asPath;
    
    if(flag1) {
      try {
        this.setTabStatsValue();
      } catch {
        //this.setState({hasError:true});
      }
    }
    if(flag2) {
      try {
        this.setTabValue();
      } catch {
        //this.setState({hasError:true});
      }
    }
  }

  getUsernameAndPagename = () => {
    const {router} = this.props;
    var _query = router.query;
    var username = "u" in _query ? _query.u:null;
    var pagename = "p" in _query ? _query.p:null;
    return {username, pagename};
  }

  setTabStatsValue = async () => {
    const { targetUser } = this.props;

    const _targetUser = await api.getUserById(targetUser.uid)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
        
    const _vals = [
      _targetUser.tweets.length,
      _targetUser.following.length,
      _targetUser.followers.length,
      _targetUser.likes.length,
      _targetUser.lists.length,
      _targetUser.moments.length,
    ];

    this.setState({
      vals: _vals,
      targetUser: _targetUser,
    });
  }

  setTabValue = () => {
    
    var tabValue = null;
    const { username, pagename } = this.getUsernameAndPagename();
   
    if(pagename === null) {
      tabValue = 0;
    } else {
      if(pagename === "tweets") {
        tabValue = 0;
      }
      else if(pagename === "following") {
        tabValue = 1;
      }
      else if(pagename === "followers") {
        tabValue = 2;
      }
      else if(pagename === "likes") {
        tabValue = 3;
      }
      else if(pagename === "lists") {
        tabValue = 4;
      }
      else if(pagename === "moments") {
        tabValue = 5;
      }
      else {
        tabValue = 0;
      }
    }
    this.setState({
      tabValue: tabValue,
      username: username,
    });
  }

  handleChange = (event, tabValue) => {
    this.setState({ tabValue });
  }

  statsTabLabel = (title, val, left) => {
    return (
      <List style={{
        minWidth:65, position:"absolute",
        left:left, bottom:10
      }}>
        <List.Item
          style={{
            marginTop:4, textTransform:'initial',
            color:"grey", fontWeight:"bold", fontSize:12}}
        >
          {title}
        </List.Item>
        <List.Item style={{
          marginTop:-5, fontWeight:"bold", fontSize:19
        }}>
          {val}
        </List.Item>
      </List>
    );
  }

  handleStatsTabClick = (pathname, query) => {
    const { router } = this.props;
    router.push({
      pathname: pathname,
      query: query,
    });
    this.props.userStatsTabClicked();
  }

  getStatsTab = (i, title, val, left, width) => {
    const { classes, router } = this.props;
    const { username } = this.state;
    return (
      <Tab
        key={i}
        label={this.statsTabLabel(title, val, left)}
        classes={{ root: classes.tabRoot }}
        onMouseEnter={() => this.setState({onMouseTabNum: 0})}
        onMouseLeave={() => this.setState({onMouseTabNum: null})}
        style={{minWidth:0, width:width, height:60}}
        onClick={() => this.handleStatsTabClick(
          '/profile',
          {u:username, p:title.toLowerCase()}
        )}
      />
    );
  }

  checkFollowing = (currentUser, targetUser) => {
    const following = currentUser.following;
    return following.includes(targetUser.uid);
  }

  handleCheckFollowing = () => {
    const { currentUser, targetUser } = this.props;
    this.setState({
      isFollowingThisUser: this.checkFollowing(currentUser, targetUser),
    });
  }


  handleFollowing = () => {
    const { currentUser, targetUser } = this.props;
    this.setState({
      isFollowingThisUser: true,
    });
    this.props.follow(currentUser.uid, targetUser.uid);
  }

  handleUnfollowing = () => {
    const { currentUser, targetUser } = this.props;
    this.setState({
      isFollowingThisUser: false,
    });
    this.props.unfollow(currentUser.uid, targetUser.uid)
  }

  hoverOnFollowButton = () => {
    this.setState({
      isMouseOnFollowButton: true,
    });
  }

  hoverOffFollowButton = () => {
    this.setState({
      isMouseOnFollowButton: false,
    });
  }

  getEditOrFollowButton = (numCol) => {
    const { currentUser, targetUser} = this.props;

    var btnStyle = {
      borderRadius:20,
      fontWeight:"bold",
      width:100
    }

    if(currentUser.uid === targetUser.uid) {
      return (
        <Button
          style={btnStyle}
          basic color='grey'
        >
          <div style={{marginLeft:-5}}>
            Edit Profile
          </div>
        </Button>
      );
    }
    if(this.state.isFollowingThisUser) {
      let btnFollowing = (
        <Button
          style={btnStyle}
          color='blue'
          onMouseEnter={() => this.hoverOnFollowButton()}
          onMouseLeave={() => this.hoverOffFollowButton()}
          content='Following'
        />
      );
      let btnUnfollow = (
        <Button
          onClick={() => this.handleUnfollowing()}
          style={btnStyle}
          color='red'
          onMouseEnter={() => this.hoverOnFollowButton()}
          onMouseLeave={() => this.hoverOffFollowButton()}
          content='Unfollow'
        />
      );
      return (
        this.state.isMouseOnFollowButton ?
        btnUnfollow:btnFollowing
      );
    }
    return (
      <Button
        basic color="blue"
        onClick={() => this.handleFollowing()}
        style={btnStyle}
        onMouseEnter={() => this.hoverOnFollowButton()}
        onMouseLeave={() => this.hoverOffFollowButton()}
        content='Follow'
      />
    );
  }

  getTwoColumnLayout = () => {
    const { classes } = this.props;
    const { titles, vals, widths, lefts } = this.state;
        
    return (
      <Paper
        square
        elevation={1}
        style={{
          display:"flex",
          justifyContent:"center",
          height:60,
        }}
      >
        <Tabs
          value={this.state.tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
          style={{
            display:"flex", justifyContent:"center",
            height:60, position:"relative", left:153
          }}
        >
          {[...Array(titles.length)].map((x,i) => {
            return this.getStatsTab(
              i, titles[i], vals[i], lefts[i], widths[i]
            );
          })}
          <div style={{marginTop:11.5, marginLeft:50}}>
            {this.getEditOrFollowButton(2)}
          </div>
        </Tabs>
      </Paper>
    );
  }

  getThreeColumnLayout = () => {
    const { classes } = this.props;
    const { titles, vals, widths, lefts } = this.state;
    return (
      <Paper
        square
        elevation={1}
        style={{
          display:"flex",
          justifyContent:"center",
          height:60,
        }}
      >
        <Tabs
          textColor="primary"
          indicatorColor="primary"
          value={this.state.tabValue}
          onChange={this.handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
          style={{
            display:"flex", justifyContent:"center",
            height:60, position:"relative", left:153
          }}
        >
          {[...Array(titles.length)].map((x,i) => {
            return this.getStatsTab(
              i, titles[i], vals[i], lefts[i], widths[i]
            );
          })}
          <div style={{marginTop:11.5, marginLeft:350}}>
            {this.getEditOrFollowButton(3)}
          </div>
        </Tabs>
      </Paper>
    );
  }

  isLoading = () => {
    const { vals } = this.state;
    return (
      vals === null
    );
  }

  render() {
    const { router } = this.props;

    if(this.state.hasError) {
      router.push("/pagedoesnotexist");
    }

    if(this.isLoading()) {
      //return null;
    }

    if(this.state.screenWidth < 1250) {
      return this.getTwoColumnLayout();
    } else {
      return this.getThreeColumnLayout();
    }
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display:"flex",
    justifyContent:"center",
  },
  tabsRoot: {
    //borderBottom: '2px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {
    //width: 100
  },
});

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  targetUser: state.user.targetUser,
  updateUserStatsTrigger: state.tweet.updateUserStatsTrigger,
});

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      {follow, unfollow, userStatsTabClicked}
    )(UserStatsBar)
  )
);