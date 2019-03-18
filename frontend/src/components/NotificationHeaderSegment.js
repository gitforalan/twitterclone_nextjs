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



class NotificationHeaderSegment extends React.Component {

  render() {
    return(
      <Segment style={{width: 600}}>
        <List horizontal style={{marginLeft:7.5}}>
          <List.Item style={{
            fontSize:20,
            fontWeight:"bold",
            color:"black"
          }}>
            All
          </List.Item>
          <List.Item style={{
            marginLeft:40, fontSize:20,
            fontWeight:"bold", color:"blue"
          }}>
            Mention
          </List.Item>
          <List.Item style={{
            marginLeft:375, fontSize:12,
            fontWeight:"normal", color:"blue"
          }}>
            Settings
          </List.Item>
        </List>
      </Segment>
    );
  }
}

export default NotificationHeaderSegment;