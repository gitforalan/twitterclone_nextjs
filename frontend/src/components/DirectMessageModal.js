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
import DirectMessageCard from "./DirectMessageCard.js"


class DirectMessageModal extends React.Component {

  triggerButton = (
    <Button style={{marginLeft:225, marginTop:15}} circular basic color="blue" icon='check' />
  );

  render() {
    return(
      <Modal
        style={{width:600,}}
        open={this.props.showDirectMessageModal}
        closeOnDimmerClick={true}
        onClose={() => this.props.closeDirectMessageModal()}
      >
        <Modal.Header>
          Direct Messages
          <Popup
            inverted
            content='Mark all as read'
            trigger={this.triggerButton}
          />
          <Button
            primary
            style={{
              marginTop:15,
              marginLeft:10,
              borderRadius:20
            }}
          >
            New Message
          </Button>
        </Modal.Header>
        <Modal.Content>
          <div style={{marginTop:-20}}>
            <DirectMessageCard />
            <DirectMessageCard />
            <DirectMessageCard />
            <DirectMessageCard />
            <DirectMessageCard />
            <DirectMessageCard />
            <DirectMessageCard />
            <DirectMessageCard />
            <DirectMessageCard />
            <DirectMessageCard />
          </div>
        </Modal.Content>
      </Modal>
    );
  }

}

export default DirectMessageModal;