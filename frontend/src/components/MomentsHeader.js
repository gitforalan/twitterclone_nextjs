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



class MomentsHeader extends React.Component {

  render() {
    return(
      <Segment style={{width: 600}}>
        <List horizontal style={{marginLeft:7.5}}>
          <List.Item style={{
            color:"black",
            fontSize:20,
            fontWeight:"bold"
          }}>
            Moments
          </List.Item>
        </List>
      </Segment>
    );
  }
}

export default MomentsHeader;