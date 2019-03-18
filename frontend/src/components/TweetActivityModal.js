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



class TweetActivityModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      
    };
  }

  render() {
    return(
      <Modal
        closeOnDimmerClick={true}
        onClose={() => this.props.hideTweetActivityModal()}
        open={this.props.showTweetActivityModal}
        style={{position:"absolute", top:70, width:800}}
      >
        <Segment.Group>
          <Segment>
            <div style={{color:"black", fontSize:20}}>
              Tweet Activity
            </div>
          </Segment>
          <Segment
            style={{display:"block", overflow:"auto", height:300}}
          >
            Not implemented yet.
          </Segment>
        </Segment.Group>
      </Modal>
    );
  }
}


export default TweetActivityModal;