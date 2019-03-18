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
  Popup,
  Input
} from 'semantic-ui-react';

import { connect } from "react-redux";
import TextareaAutosize from "react-autosize-textarea";
import { addTweet } from "../actions";


class ComposeNewTweetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetContent: "",
      tweetNotSentYet: false,
      currentUser: this.props.currentUser,
      loading: false,
      errors: [],
    };
  }
  
  tweetFormFooter = () => {
    var icon1 = (
      <Icon size="large" color="blue" style={{marginRight:30, marginTop:5}} name='photo' />
    );
    var icon2 = (
      <Icon size="large" color="blue" style={{marginRight:30, marginTop:5}} name='video' />
    );
    var icon3 = (
      <Icon size="large" color="blue" style={{marginRight:30, marginTop:5}} name='chart bar' />
    );
    var icon4 = (
      <Icon size="large" color="blue" style={{marginRight:30, marginTop:5}} name='point' />
    );
    return (
      <div>
        <Popup
          horizontalOffset={6}
          trigger={icon1}
          content='Add photos or video'
          inverted
        />
        <Popup
          horizontalOffset={6}
          trigger={icon2}
          content='Add a GIF'
          inverted
        />
        <Popup
          horizontalOffset={6}
          trigger={icon3}
          content='Add poll'
          inverted
        />
        <Popup
          horizontalOffset={6}
          trigger={icon4}
          content='Location'
          inverted
        />
        <Button
          disabled={this.state.tweetContent.length === 0}
          style={{marginLeft:172, marginTop:15}}
          circular basic color="blue"
          icon='plus'
        />
        <Button
          disabled={this.state.tweetContent.length === 0}
          onClick={() => this.sendTweet()}
          style={{marginLeft:10, marginTop:15, borderRadius:20}}
          content="Tweet"
          primary
        />
      </div>
    );
  }

  sendTweet = () => {
    const { currentUser } = this.props;
    const { tweetContent } = this.state;
    if (tweetContent.length > 0) {
      this.props.addTweet(currentUser.uid, tweetContent);
      this.setState({
        tweetContent: "",
        tweetNotSentYet:false,
      });
    }
  };


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  setTweetModal = () => {
    this.setState({ tweetNotSentYet: true });
  }

  removeTweetModal = () => {
    this.setState({ tweetNotSentYet: false });
  }

  render() {
    const {tweetContent} = this.state;
    return(
      <Modal
        onClose={this.removeTweetModal}
        style={{position:"absolute", top: 100, width:600}}
        open={this.state.tweetNotSentYet}
        trigger={
          <Button
            onClick={() => this.setTweetModal()}
            style={{borderRadius:20}}
            primary
            content="Tweet"
          />
        }
      >
        <Segment.Group>
          <Segment style={{width:600, height:50}}>
            <div style={{color:"black", fontSize:20, fontWeight:"bold", textAlign:"center"}}>
              Compose new Tweet
            </div>
          </Segment>
          <Segment style={{width: 600, backgroundColor:"#E6E6FA"}}>
            <div className="tweet__wrapper">
              <div className="tweet__box tweet__sidebar">
                <Image
                  avatar
                  size='mini'
                  floated='left'
                  src="../../static/images/profile-image.jpg"
                />
              </div>
              <div className="tweet__box tweet__header">
                <Form>
                  <TextareaAutosize
                    autoFocus={true}
                    style={{resize:"none", width:521}}
                    rows={4}
                    placeholder="What's happening?"
                    name="tweetContent"
                    value={tweetContent}
                    onChange={this.handleChange}
                  />
                </Form>
              </div>
      
              <div style={{width:600}} className="tweet__box tweet__footer">
                {this.tweetFormFooter()}
              </div>
            </div>
          </Segment>
        </Segment.Group>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, {addTweet})(ComposeNewTweetModal);