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




class TransparentProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      isMouseOnName: false,
      isMouseOnUsername: false,
    };
  }

  handleOnHoverName = () => {
    this.setState({
      isMouseOnName: true,
    })
  }

  handleOffHoverName = () => {
    this.setState({
      isMouseOnName: false,
    })
  }

  handleOnHoverUsername = () => {
    this.setState({
      isMouseOnUsername: true,
    })
  }

  handleOffHoverUsername = () => {
    this.setState({
      isMouseOnUsername: false,
    })
  }

  getNameTextStyle = () => {
    if(this.state.isMouseOnName) {
      return ({
        textDecoration:"underline",
        fontSize:22,
        fontWeight:"bold"
      });
    }
    return ({
      fontSize:22,
      fontWeight:"bold"
    });
  }

  getUsernameTextStyle = () => {
    if(this.state.isMouseOnUsername) {
      return ({
        textDecoration:"underline",
        color:"grey",
      });
    }
    return ({
      color:"grey",
    });
  }

  monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  convertDate = (createdAt) => {
    var res = new Date(createdAt);
    var month = this.monthNames[res.getMonth()];
    var year = res.getFullYear();
    return month + " " + year;
  }

  render() {
    const { targetUser } = this.props;

    return(
      <div style={{marginTop:-82}}>
        <List style={{marginLeft:15}}>
          <List.Item
            style={this.getNameTextStyle()}
            onMouseEnter={() => this.handleOnHoverName()}
            onMouseLeave={() => this.handleOffHoverName()}
          >
            { targetUser.name }
          </List.Item>
          <List.Item
            style={this.getUsernameTextStyle()}
            onMouseEnter={() => this.handleOnHoverUsername()}
            onMouseLeave={() => this.handleOffHoverUsername()}
          >
            @{ targetUser.username }
          </List.Item>
          <List.Item
            style={{
              marginRight:10, marginTop:10, maxWidth:260,
              marginBottom:10, fontSize:16, wordWrap:"break-word"
            }}
          >
            { targetUser.biography }
          </List.Item>
          <List.Item>
            <Icon name='map pin' color="grey" /> { targetUser.location } 
          </List.Item>
          <List.Item>
            <Icon name='linkify' color="grey" /> { targetUser.website }
          </List.Item>
          <List.Item>
            <Icon
              name='calendar alternate outline'
              color="grey"
            /> Joined { this.convertDate(targetUser.createdAt) }
          </List.Item>
          <List.Item>
            <Icon
              name='birthday cake'
              color="grey"
            /> { targetUser.birthday }
          </List.Item>
        </List>
      </div>
    );
  }
}

export default TransparentProfileCard;