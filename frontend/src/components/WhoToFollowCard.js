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


class WhoToFollowCard extends React.Component {

  render() {
    return(
      <div style={{flexFlow:"column wrap", overflow:"hidden"}}>
        <div className="whotofollow__box whotofollow__sidebar">
          <Image
            avatar
            floated='left'
            src="../../static/images/profile-image.jpg"
            style={{marginTop:5, height:45, width:45}}
          />
        </div>
        <div className="whotofollow__box whotofollow__header">
          <List horizontal>
            <List.Item style={{color:"black", fontWeight:"bold"}}>
              Profilename
            </List.Item>
            <List.Item style={{color:"grey", fontWeight:"normal"}}>
              @username
            </List.Item>
            <List.Item>
              <Icon name='close' color="grey" style={{opacity:0.5}} />
            </List.Item>
          </List>
        </div>
        <div className="whotofollow__box whotofollow_content">
          <Button
            compact
            basic color='blue'
            style={{borderRadius:20, marginTop:-2.5}}
          >
            Follow
          </Button>
        </div>
      </div>
    );
  }
}

export default WhoToFollowCard;