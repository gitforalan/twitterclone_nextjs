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
import FindPeopleYouKnow from "./FindPeopleYouKnow.js";
import WhoToFollowCard from "./WhoToFollowCard.js";


class WhoToFollowCards extends React.Component {

  render() {
    return(
      <Segment.Group style={{width:290}}>
        <Segment>
          <List>
            <List.Item style={{marginTop:5}}>
              <div style={{display:"inline", color:"black", fontSize:18, fontWeight:"bold"}}>Who to follow</div>
              <div style={{display:"inline", color:"black", fontSize:12}}>・</div>
              <div style={{display:"inline", color:"blue", fontSize:12}}>Refresh</div>
              <div style={{display:"inline", color:"black", fontSize:12}}>・</div>
              <div style={{display:"inline", color:"blue", fontSize:12}}>View all</div>
            </List.Item>

            <List.Item style={{marginTop:5, color:"blue", fontWeight:"bold"}}>
              <WhoToFollowCard />
            </List.Item>
            <Divider />

            <List.Item style={{marginTop:-5, color:"blue", fontWeight:"bold"}}>
              <WhoToFollowCard />
            </List.Item>
            <Divider />

            <List.Item style={{marginTop:-5, color:"blue", fontWeight:"bold"}}>
              <WhoToFollowCard />
            </List.Item>
          </List>
        </Segment>
        <Segment>
          <List>
            <List.Item>
              <FindPeopleYouKnow />
            </List.Item>
            <Divider />
            <List.Item style={{marginTop:-5, color:"blue", fontSize:13}}>
              Connect other address books
            </List.Item>
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}

export default WhoToFollowCards;