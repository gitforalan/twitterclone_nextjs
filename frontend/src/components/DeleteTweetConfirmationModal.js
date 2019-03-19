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
import { withStyles } from '@material-ui/core/styles';




import {

} from "../actions";

import * as api from "../api";





class DeleteTweetConfirmationModal extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      showModal: this.props.showModal,
      isMouseOnName: false,
    }
  }


  componentDidMount() {
    
  }


  componentWillUnmount() {
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showModal !== this.props.showModal) {
      this.setState({
        showModal: this.props.showModal,
      });
    }
  }

  timeFromNow = timestamp => moment(timestamp).fromNow();


  profileRouting = (e) => {
    e.stopPropagation();
    const { tweet, router } = this.props;
    router.push({
      pathname: '/profile',
      query: {u:tweet.postedBy.username}
    });
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


  getDeletedTweetCard = () => {
    const { tweet } = this.props;

    return (
      <div className="tweet__wrapper" style={{marginLeft:5}}>
        <div className="tweet__box tweet__sidebar">  
          <Image
            avatar
            style={{height:50, width:50, cursor:"pointer"}}
            //floated='left'
            src={tweet.postedBy.avatar}
            onClick={this.profileRouting}
            onMouseEnter={() => this.setState({isMouseOnName:true})}
            onMouseLeave={() => this.setState({isMouseOnName:false})}
          />
        </div>
        <div
          style={{marginLeft:15, marginTop:0}}
          className="tweet__box tweet__header"
        >
          <div
            style={this.getNameTextStyle()}
            onMouseEnter={() => this.setState({isMouseOnName:true})}
            onMouseLeave={() => this.setState({isMouseOnName:false})}
            onClick={this.profileRouting}
          >
            {tweet.postedBy.name}
          </div>
          <div
            onMouseEnter={() => this.setState({isMouseOnName:true})}
            onMouseLeave={() => this.setState({isMouseOnName:false})}
            style={{
              display:"inline",
              marginLeft:5,
              color:"grey",
              cursor:"pointer"
            }}
            onClick={this.profileRouting}
          >
            @{tweet.postedBy.username}・{this.timeFromNow(tweet.timestamp)}
          </div>
          
          <div style={{
            wordBreak:"break-all",
            marginTop:3,
            fontSize:16,
            width:425,
          }}>
            {tweet.content.split('\n').map((item, key) => {
              return (
                <React.Fragment key={key}>
                  {item}<br/>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    )
  }

  getTitle = () => {
    return (
      <div style={{
        marginTop:-5
      }}>
        Are you sure you want to delete this tweet?
      </div>
    );
  }

  getButtons = () => {
    const { tweet } = this.props;
    return (
      <div>
        <Button
          style={{
            borderRadius:20,
            fontWeight:"bold",
            width:100,
            marginTop:-7,
            height:35,
          }}
          color='white'
          content='Cancel'
          onClick={() => this.handleCloseModal()}
        />
        <Button
          style={{
            borderRadius:20,
            fontWeight:"bold",
            width:100,
            marginTop:-7,
            height:35,
            marginLeft:10,
          }}
          color='red'
          content='Delete'
          onClick={() => this.props.deleteTweetFinal(tweet)}
        />
      </div>
    );
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    });
    this.props.hideDeleteConfirmationModal();
  }


  render() {

    const { tweet, classes } = this.props;

    if(tweet === null) {
      return null;
    }
  
    return(
      <Modal
        closeOnDimmerClick={true}
        onClose={() => this.handleCloseModal()}
        open={this.state.showModal}
        style={{width:525, top:"25%"}}
      >
        <Segment.Group >
          <Segment style={{
            width:525,
            height:50,
            display:"flex",
            justifyContent:"center",
            fontSize:20,
            fontWeight:"bold",
          }}>
            {this.getTitle()}
          </Segment>
          <Segment
            style={{width:525, height:90, overflow:"scroll",}}
            className={classes.hideScroll}
          >
            {this.getDeletedTweetCard()}
          </Segment>
          <Segment style={{
            width:525,
            height:50,
            display:"flex",
            justifyContent:"flex-end"
          }}>
            {this.getButtons()}
          </Segment>
        </Segment.Group>

      </Modal>
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
    connect(
      mapStateToProps,
    )(DeleteTweetConfirmationModal)
  )
);