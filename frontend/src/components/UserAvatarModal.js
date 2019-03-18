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


class UserAvatarModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }
  
  render() {
    const { targetUser } = this.props;

    return(
      <Modal
        trigger={
          <Image
            avatar bordered
            src={targetUser.avatar}
            style={{
              width:210,
              height:210,
              zIndex:100,
              borderWidth:5,
              marginLeft:40,
              marginTop:-380,
              cursor:"pointer",
              borderColor:"white",              
            }}
          />
        }
        basic
      >
        <Modal.Content>
          <Image
            avatar bordered 
            src={targetUser.avatar}
            style={{
              position:"absolute",
              top:-150, left:300,
              width:300, height:300
            }}
          />
        </Modal.Content>
      </Modal>
    );
  } 
}

export default UserAvatarModal;
