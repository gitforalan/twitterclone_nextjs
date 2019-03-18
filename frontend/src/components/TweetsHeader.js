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



class TweetsHeader extends React.Component {

  render() {
    return(
      <Segment style={{width: 600}}>
        <List horizontal style={{marginLeft:7.5}}>
          <List.Item style={{color:"black", fontSize:20, fontWeight:"bold"}}>
            Tweets
          </List.Item>
          <List.Item style={{
            color:"blue",
            fontSize:20,
            marginLeft:30,
            fontWeight:"bold"
          }}>
            {"Tweets & replies"}
          </List.Item>
          <List.Item style={{
            fontSize:20,
            marginLeft:30,
            color:"blue",
            fontWeight:"bold",
          }}>
            Media
          </List.Item>
        </List>
      </Segment>
    );
  }
}

export default TweetsHeader;