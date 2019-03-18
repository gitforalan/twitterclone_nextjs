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



class AboutTwitter extends React.Component {
  render() {
    return(
      <Segment.Group style={{width:290}}>
        <Segment style={{color:"grey", fontSize:12}}>
          © 2019 Twitter &nbsp; About &nbsp; Help Center &nbsp; Terms &nbsp; Privacy policy &nbsp; Cookies &nbsp; Ads info &nbsp; Brand &nbsp; Blog &nbsp; Status &nbsp; Apps &nbsp; Jobs &nbsp; Marketing &nbsp; Businesses &nbsp; Developers
        </Segment>
        <Segment style={{color:"blue"}}>
          <Icon name='external square' color="blue" />Advertise with Twitter
        </Segment>
      </Segment.Group>
    );
  }
}

export default AboutTwitter;