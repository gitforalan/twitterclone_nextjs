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
} from 'semantic-ui-react';

import WorldwideTrendsCard from "../src/components/WorldwideTrendsCard.js";
import AboutTwitter from "../src/components/AboutTwitter.js";
import WhoToFollowCards from "../src/components/WhoToFollowCards.js";
import NotificationHeaderSegment from "../src/components/NotificationHeaderSegment.js";
import { withStyles } from '@material-ui/core/styles';



class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenWidth: null,
    };
  }

  updateScreenWidth() {
    this.setState({
      screenWidth: window.innerWidth,
    });
  }

  componentWillUnmount() {
    window.removeEventListener(
      "resize", this.updateScreenWidth.bind(this)
    );
  }

  componentDidMount() {
    this.updateScreenWidth();
    window.addEventListener(
      "resize", this.updateScreenWidth.bind(this)
    );
  }

  getTwoColumnLayout = () => {
    const { classes } = this.props;
    return(
      <div
        style={{overflowX:"scroll"}}
        className={classes.hideScroll}
      >
        <div style={{
          backgroundColor:"#F0F8FF",
          display:"flex", justifyContent:"center",
          minWidth:1000, overflowX:"hidden"
        }}>
          <div style={{marginTop:62}}>
            <WhoToFollowCards />
            <WorldwideTrendsCard />
            <AboutTwitter />
          </div>
          <Segment.Group style={{
            width:600,
            marginTop:60,
            marginLeft:13,
            borderColor:"transparent",
          }}>
            <NotificationHeaderSegment />
            
          </Segment.Group>
        </div>
      </div>
    );
  }

  getThreeColumnLayout = () => {
    return(
      <div>
        <div style={{
          backgroundColor:"#F0F8FF", display:"flex",
          justifyContent:"center", overflowX:"hidden",
        }}>
          <div style={{marginTop:62}}>
            <WorldwideTrendsCard />
          </div>
          <Segment.Group style={{
            width:600,
            marginTop:62,
            marginLeft:13,
            borderColor:"transparent",
          }}>
            <NotificationHeaderSegment />
            
          </Segment.Group>
          <div style={{marginTop:62, marginLeft:13}}>
            <WhoToFollowCards />
            <AboutTwitter />
          </div>
        </div>
      </div>
    );
  }
  
  render() {
    if(this.state.screenWidth < 1250) {
      return this.getTwoColumnLayout();
    } else {
      return this.getThreeColumnLayout();
    }
  } 
}

const styles = theme => ({
  hideScroll: {
    '&::-webkit-scrollbar': {
      display:'none'
    },
  },
});




export default withStyles(styles)(Notifications);