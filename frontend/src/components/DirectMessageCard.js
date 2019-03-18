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



class DirectMessageCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isMouseOnPanel: false,
    };
  }

  hoverOn = () => {
    this.setState({
      isMouseOnPanel: true,
    });
  }

  hoverOff = () => {
    this.setState({
      isMouseOnPanel: false,
    });
  }

  styles = {
    hoverOnStyle: {
      marginLeft:-20, 
      width:600,
      backgroundColor:"#F0F8FF"
    },
    hoverOffStyle: {
      marginLeft:-20, 
      width:600,
    }
  }

  getDirectMessagePanelStyle = () => {
    return this.state.isMouseOnPanel ? this.styles.hoverOnStyle:this.styles.hoverOffStyle;
  }

  render() {
    return(
      <Segment vertical
        style={this.getDirectMessagePanelStyle()}
        onMouseEnter={() => this.hoverOn()}
        onMouseLeave={() => this.hoverOff()}
      >
        <div
          style={{marginLeft:20}}
          className="tweet__wrapper"
        >
          <div className="tweet__box tweet__sidebar">
            <Image
              avatar
              floated='left'
              src="../../static/images/profile-image.jpg"
              style={{
                marginLeft:-9, marginTop:5,
                height:45, width:45
              }}
            />
          </div>
  
          <div className="tweet__box tweet__header">
            <List horizontal>
              <List.Item>
                <div><strong>Profilename</strong></div>
              </List.Item>
              <List.Item>
                <div style={{opacity:0.5}}>
                  @username・14 Jan 2018
                </div>
              </List.Item>
            </List>
  
            <div>
              abcde abcde abcde abcde abcde
              vwxyz vwxyz vwxyz vwxyz vwxyz
              vwxyz vwxyz vwxyz vwxyz vwxyz
              vwxyz vwxyz vwxyz vwxyz vwxyz
            </div>
          </div>
        </div>
      </Segment>
    );
  }

}

export default DirectMessageCard;