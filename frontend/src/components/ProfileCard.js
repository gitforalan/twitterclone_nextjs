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

import Link from 'next/link';
import { connect } from "react-redux";
import * as api from "../api";




class ProfileCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      isMouseOnTweetsSection: false,
      isMouseOnFollowingSection: false,
      isMouseOnFollowersSection: false,
      numTweet:0,
      numFollowing:0,
      numFollowers:0,
      isMouseOnName: false,
      isMouseOnUsername: false,
      updateUserStatsTrigger: this.props.updateUserStatsTrigger,
    };
  }

  componentDidMount = () => {
    this.setStateListener();
  }

  componentDidUpdate(prevProps) {
    const { updateUserStatsTrigger } = this.props;
    var flag = (
      prevProps.updateUserStatsTrigger !==
      updateUserStatsTrigger
    );
    if(flag) {
      try {
        this.setStateListener();
      } catch {
        this.setState({hasError:true});
      }
    }
  }

  setStateListener = async () => {
    
    var { currentUser } = this.props;

    var _currentUser = await api.getUserById(currentUser.uid)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error(error);
        return null;
      });
    
    this.setState({
      currentUser: _currentUser,
      
      numTweet: _currentUser.tweets.length,
      numFollowing: _currentUser.following.length,
      numFollowers: _currentUser.followers.length,
    });
  }

  hoverOnTweetsSection = () => {
    this.setState({
      isMouseOnTweetsSection: true,
    });
  }

  hoverOffTweetsSection = () => {
    this.setState({
      isMouseOnTweetsSection: false,
    });
  }

  hoverOnFollowingSection = () => {
    this.setState({
      isMouseOnFollowingSection: true,
    });
  }

  hoverOffFollowingSection = () => {
    this.setState({
      isMouseOnFollowingSection: false,
    });
  }

  hoverOnFollowersSection = () => {
    this.setState({
      isMouseOnFollowersSection: true,
    });
  }

  hoverOffFollowersSection = () => {
    this.setState({
      isMouseOnFollowersSection: false,
    });
  }

  getFontStyle = (isMouseOnTheSection) => {
    if(isMouseOnTheSection) {
      return this.styles.hoverOnStyle;
    }
    return this.styles.hoverOffStyle;
  }

  styles = {
    hoverOnStyle: {
      fontSize:13,
      color:"#1E90FF",
      fontWeight:"bold",
      cursor:"pointer"
    },
    hoverOffStyle: {
      fontSize:13,
      color:"grey",
      fontWeight:"bold",
      cursor:"pointer"
    }
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
        color:"black",
        fontSize:20,
        fontWeight:"bold",
        marginLeft:30,
        marginTop:-5,
      });
    }
    return ({
      color:"black",
      fontSize:20,
      fontWeight:"bold",
      marginLeft:30,
      marginTop:-5,
    });
  }

  getUsernameTextStyle = () => {
    if(this.state.isMouseOnUsername) {
      return ({
        textDecoration:"underline",
        marginLeft:30,
        marginTop:3,
        color:"#606060",
      });
    }
    return ({
      marginLeft:30,
      marginTop:3,
      color:"#606060",
    });
  }

  render() {
    const {currentUser} = this.props;

    if(currentUser === null) {
      return null;
    }

    return(
      <Card style={{
        flexFlow:"column wrap",
        overflow:"hidden"
      }}>
        <Link
          prefetch
          href={{
            pathname: '/profile',
            query: { u:currentUser.username }
          }}
        >
          <Image
            src="../../static/images/tmppic.png"
            style={{cursor:"pointer",}}
          />
        </Link>
        <Card.Content>
        <div className="profilecard__wrapper">
          <div className="profilecard__box profilecard__sidebar">
            <Link
              prefetch
              href={{
                pathname: '/profile',
                query: { u:currentUser.username }
              }}
            >
              <Image
                avatar bordered
                style={{
                  cursor:"pointer", borderColor:"white",
                  borderWidth:2, marginTop:-45,
                  marginLeft:-5, zIndex:100,
                  width:75, height:75
                }}
                src={
                  currentUser!==null ?
                    currentUser.avatar : 
                    "../../static/images/plain-white-background.jpg"
                }
              />
            </Link>
          </div>
          <div style={{marginTop:-5}}>
            <div>
              <Link
                prefetch
                href={{
                  pathname: '/profile',
                  query: { u:currentUser.username }
                }}
              >
                <a
                  style={this.getNameTextStyle()}
                  onMouseEnter={() => this.handleOnHoverName()}
                  onMouseLeave={() => this.handleOffHoverName()}
                >
                  {currentUser.name}
                </a>
              
              </Link>
            </div>
            <div>
              <Link
                prefetch
                href={{
                  pathname: '/profile',
                  query: { u:currentUser.username }
                }}
              >
                <a
                  style={this.getUsernameTextStyle()}
                  onMouseEnter={() => this.handleOnHoverUsername()}
                  onMouseLeave={() => this.handleOffHoverUsername()}
                >
                  @{currentUser.username}
                </a>
              </Link>
            </div>
          </div>
          <div
            className="profilecard__box profilecard__content"
            style={{marginTop:15}}
          >
            <List horizontal>
              <List.Item
                style={{marginLeft:0}}
                onMouseEnter={() => this.hoverOnTweetsSection()}
                onMouseLeave={() => this.hoverOffTweetsSection()}
              >
                <div style={{marginBottom:5}}>
                  <Link
                    prefetch
                    href={{
                      pathname: '/profile',
                      query: { u:currentUser.username }
                    }}
                  >
                    <a style={
                      this.getFontStyle(
                        this.state.isMouseOnTweetsSection
                      )
                    }>
                      Tweets
                    </a>
                  </Link>
                </div>
                <div>
                  <Link
                    prefetch
                    href={{
                      pathname: '/profile',
                      query: { u:currentUser.username }
                    }}
                  >
                    <a style={{
                      marginTop:5, fontSize:19, color:"#1E90FF",
                      fontWeight:"bold",
                    }}>
                      {this.state.numTweet}
                    </a>
                  </Link>
                </div>
              </List.Item>
              <List.Item
                style={{marginLeft:30}}
                onMouseEnter={() => this.hoverOnFollowingSection()}
                onMouseLeave={() => this.hoverOffFollowingSection()}
              >
                <div style={{marginBottom:5}}>
                  <Link
                    prefetch
                    href={{
                      pathname: '/profile',
                      query: { u:currentUser.username, p:"following" }
                    }}
                  >
                    <a style={
                      this.getFontStyle(
                        this.state.isMouseOnFollowingSection
                      )
                    }>
                      Following
                    </a>
                  </Link>
                </div>
                <div>
                  <Link
                    prefetch
                    href={{
                      pathname: '/profile',
                      query: { u:currentUser.username, p:"following" }
                    }}
                  >
                    <a style={{
                      marginTop:5, fontSize:19, color:"#1E90FF",
                      fontWeight:"bold",
                    }}>
                      {this.state.numFollowing}
                    </a>
                  </Link>
                </div>
              </List.Item>
              <List.Item
                style={{marginLeft:30}}
                onMouseEnter={() => this.hoverOnFollowersSection()}
                onMouseLeave={() => this.hoverOffFollowersSection()}
              >
                <div style={{marginBottom:5}}>
                  <Link
                    prefetch
                    href={{
                      pathname: '/profile',
                      query: { 
                        u:currentUser.username,
                        p:"followers"
                      }
                    }}
                  >
                    <a style={
                      this.getFontStyle(
                        this.state.isMouseOnFollowersSection
                      )
                    }>
                      Followers
                    </a>
                  </Link>
                </div>
                <div>
                  <Link
                    prefetch
                    href={{
                      pathname: '/profile',
                      query: { 
                        u:currentUser.username,
                        p:"followers"
                      }
                    }}
                  >
                    <a style={{
                      marginTop:5,
                      fontSize:19,
                      color:"#1E90FF",
                      fontWeight:"bold",
                    }}>
                      {this.state.numFollowers}
                    </a>
                  </Link>
                </div>
              </List.Item>
            </List>
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
});


export default connect(mapStateToProps)(ProfileCard);