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
import { withRouter } from 'next/router';
import { connect } from "react-redux";



class TweetFormModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      parentTweet: this.props.parentTweet,
      currentUser: this.props.currentUser,
      loading: false,
      errors: [],
      isTextAreaClicked: false,
      clickedReplyIcon: false,
      replyIconClickedTrigger: this.props.replyIconClickedTrigger,
    };
  }

  componentWillMount() {
    const { router } = this.props;
    if("reply" in router.query) {
      this.setState({
        clickedReplyIcon: router.query.reply
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { replyIconClickedTrigger } = this.props;
    if(prevProps.replyIconClickedTrigger !== replyIconClickedTrigger) {
      this.replyIconListener();
    }
  }
  
  replyIconListener = () => {
    this.setState({
      clickedReplyIcon: true,
    });
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
          style={{marginLeft:193, marginTop:12.5}}
          circular basic color="blue"
          icon='plus'
        />
        <Button
          disabled={this.props.tweetContent.length===0}
          onClick={() => this.handleClickTweetButton()}
          style={{marginLeft:10, borderRadius:20, marginTop:12.5}}
          content="Tweet"
          primary
        />
      </div>
    );
  }

  handleDoneSendingReply = () => {
    this.setState({
      clickedReplyIcon: false,
      isTextAreaClicked: false,
    });
    this.props.hideTweetModal();
  }

  isLoading = () => {
    return(
      this.state.parentTweet === null ||
      this.state.currentUser === null ||
      !this.state.currentUser.uid
    );
  }

  handleClickTextArea = () => {
    this.setState({ isTextAreaClicked: true });
  }

  handleClickOutsideOfTextArea = () => {
    if(this.props.tweetContent.length === 0) {
      this.setState({
        clickedReplyIcon: false,
        isTextAreaClicked: false,
      });
    }
  }

  getTweetFormFooter = () => {
    const {
      isTextAreaClicked,
      clickedReplyIcon,
    } = this.state;
    if(isTextAreaClicked || clickedReplyIcon) {
      return (
        <div>
          {this.tweetFormFooter()}
        </div>
      );
    }
    return null;
  }

  getTweetTextArea = () => {
    const { parentTweet, currentUser, tweetContent } = this.props;
    const {
      isTextAreaClicked,
      clickedReplyIcon,
    } = this.state;
    var numRows = (
      isTextAreaClicked ||
      clickedReplyIcon ? 4:1
    );
    return (
      <TextareaAutosize
        autoFocus={clickedReplyIcon}
        style={{resize:"none", width:525}}
        rows={numRows}
        placeholder={
          parentTweet.postedBy.uid===currentUser.uid ?
          "Add another Tweet":"Tweet your reply"
        }
        onClick={() => this.handleClickTextArea()}
        name="tweetContent"
        value={tweetContent}
        onChange={this.props.handleChange}
      />
    );
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
    if(this.isLoading()) {
      return null;
    }
    return(
      
      <Segment
        style={{
          width:650,
          paddingLeft:35,
          backgroundColor:"#E6E6FA",
        }}
      >
        <div className="tweet__wrapper">
          <div className="tweet__box tweet__sidebar">
            <Image
              avatar
              size='mini'
              floated='left'
              src="../../static/images/profile-image.jpg"
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
  replyIconClickedTrigger: state.tweet.replyIconClickedTrigger,
});

export default withRouter(
  connect(mapStateToProps)(TweetFormModal)
);