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
import OutsideClickHandler from 'react-outside-click-handler';
import TextareaAutosize from "react-autosize-textarea";
import { connect } from "react-redux";



class TweetForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: this.props.currentUser,
      loading: false,
      errors: [],
      isTextAreaClicked: false,
    };
  }

  handleClickTweetButton = () => {
    this.setState({
      isTextAreaClicked: false,
    });
    this.props.sendTweet();
  }

  
  tweetFormFooter = () => {
    const footerIconStyle = {
      marginRight:30, marginTop:20, cursor:"pointer"
    };
    var icon1 = (
      <Icon
        name='photo'
        size="large"
        color="blue"
        style={footerIconStyle}
      />
    );
    var icon2 = (
      <Icon
        name='video'
        size="large"
        color="blue"
        style={footerIconStyle}
      />
    );
    var icon3 = (
      <Icon
        name='chart bar'
        size="large"
        color="blue"
        style={footerIconStyle}
      />
    );
    var icon4 = (
      <Icon
        name='point'
        size="large"
        color="blue"
        style={footerIconStyle}
      />
    );
    return (
      <div style={{display:"flex", justifyContent:"left"}}>
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
          disabled={this.props.tweetContent.length===0}
          style={{marginLeft:189, marginTop:12.5}}
          circular basic color="blue"
          icon='plus'
        />
        <Button
          disabled={this.props.tweetContent.length===0}
          onClick={() => this.handleClickTweetButton()}
          style={{
            marginLeft:10,
            borderRadius:20,
            marginTop:12.5
          }}
          content="Tweet"
          primary
        />
      </div>
    );
  }


  handleClickTextArea = () => {
    this.setState({ isTextAreaClicked: true });
  }

  handleClickOutsideOfTextArea = () => {
    if(this.props.tweetContent.length === 0) {
      this.setState({ isTextAreaClicked: false });
    }
  }

  getTweetTextArea = () => {
    const { tweetContent } = this.props;
    const { isTextAreaClicked } = this.state;
    var numRows = isTextAreaClicked ? 4:1;
    return (
      <TextareaAutosize
        style={{resize:"none", width:520}}
        rows={numRows}
        placeholder="What's happening?"
        onClick={() => this.handleClickTextArea()}
        name="tweetContent"
        value={tweetContent}
        onChange={this.props.handleChange}
      />
    );
  }

  getTweetFormFooter = () => {
    if(this.state.isTextAreaClicked) {
      return (
        <div>
          {this.tweetFormFooter()}
        </div>
      );
    }
    return null;
  }

  getTweetForm = () => {
    return (
      <div>
        <div className="tweet__box tweet__header">
          <Form>
            <OutsideClickHandler
              onOutsideClick={
                () => this.handleClickOutsideOfTextArea()
              }
            >
              {this.getTweetTextArea()}
            </OutsideClickHandler>
          </Form>
        </div>
        {this.getTweetFormFooter()}
      </div>
    );
  }

  render() {
    const { currentUser } = this.props;

    if(currentUser === null) {
      return null;
    }
    
    return(
      <Segment style={{width:600, backgroundColor:"#E6E6FA"}}>
        <div className="tweet__wrapper">
          <div className="tweet__box tweet__sidebar">
            <Image
              avatar
              size='mini'
              floated='left'
              src={currentUser.avatar}
            />
          </div>
          {this.getTweetForm()}
        </div>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(TweetForm);