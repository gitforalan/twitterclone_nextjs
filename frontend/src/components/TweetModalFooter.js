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

class TweetModalFooter extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      currentUser: this.props.currentUser,
    }
  }

  handleScroll = () => {
    
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    //window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  componentDidUpdate() {
    
  }




  render() {

    /*
    <CircularProgress
      disableShrink
      size={80}
    />
    */

    const { replies } = this.props;
    if(replies.length === 0) {
      return null;
    }

    return(
      
      <Segment style={{
        width:650,
        height:45,
        backgroundColor:"#E4FEFB",
        display:"flex",
        justifyContent:"center",
      }}>
        <Icon
          name='twitter'
          style={{marginTop:-1, color:"#A9A9A9", fontSize:18}} 
        />
      </Segment>
            
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});


export default withRouter(
  connect(mapStateToProps)(TweetModalFooter)
);