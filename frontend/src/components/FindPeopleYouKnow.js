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



class FindPeopleYouKnow extends React.Component {
  
  render() {
    return (
      <List horizontal style={{marginLeft:5, marginTop:3}}>
        <List.Item style={{marginBottom:-5}}>
          <Icon size="big" name='mail' color="red" />
          <div></div>
        </List.Item>
        <List.Item style={{marginLeft:5}}>
          <div style={{color:"black", fontWeight:"bold", fontSize:15}}>
            Find people you know
          </div>
          <div style={{color:"grey", fontSize:13}}>
            Import you contacts from Gmail
          </div>
        </List.Item>
      </List>
    );
  }
}

export default FindPeopleYouKnow;