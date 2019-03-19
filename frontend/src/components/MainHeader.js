import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import SearchPanel from "./SearchPanel.js";
import HeaderIconDropDown from "./HeaderIconDropDown.js";
import ComposeNewTweetModal from "./ComposeNewTweetModal.js";
import { withRouter } from 'next/router'
import DirectMessageModal from "./DirectMessageModal.js";

import { connect } from "react-redux";




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
  Popup,
} from 'semantic-ui-react';



class MainHeader extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tabValue: null,
      onMouseTabNum: null,
      currentPath: null,
      showDirectMessageModal: false,
      screenWidth: null,
    }
  }


  componentWillUnmount() {
    window.removeEventListener(
      "resize", this.updateScreenWidth.bind(this)
    );
  }

  updateScreenWidth() {
    this.setState({
      screenWidth: window.innerWidth,
    });
  }


  componentDidMount() {
    const { router } = this.props;

    router.prefetch('/home');
    router.prefetch('/moments');
    router.prefetch('/notifications');

    var currentPath = window.location.pathname;
    var tabValue = this.getTabValue(currentPath);
    this.setState({
      tabValue: tabValue,
      currentPath: currentPath,
    });
    this.updateScreenWidth();
    window.addEventListener(
      "resize", this.updateScreenWidth.bind(this)
    );
  }

  componentDidUpdate(prevState) {
    if(window.location.pathname !== this.state.currentPath) {
      var currentPath = window.location.pathname;
      var tabValue = this.getTabValue(currentPath);
      this.setState({
        tabValue: tabValue,
        currentPath: currentPath,
      });
    }
  }

  getTabValue = (currentPath) => {
    var tabValue = null;
    if(currentPath==="/home") {
      tabValue = 0;
    } else if(currentPath==="/moments") {
      tabValue = 1;
    } else if(currentPath==="/notifications") {
      tabValue = 2;
    } else if(currentPath==="/messages") {
      tabValue = 3;
    }
    return tabValue;
  }

  closeDirectMessageModal = () => {
    const { currentPath } = this.state;
    this.setState(prevState => ({
      showDirectMessageModal: false,
      tabValue: this.getTabValue(currentPath),
    }));
  }

  handleChange = (event, tabValue) => {
    this.setState({ tabValue });
  }

  homeTabLabelSmall = () => {
    const {tabValue, onMouseTabNum} = this.state;
    return (
      <Icon
        name='home'
        color={onMouseTabNum===0 || tabValue===0 ? "blue":"grey"}
        style={{
          bottom:20,
          left:21.5,
          fontSize:15,
          position:"absolute",
        }}
      />
    );
  }

  momentsTabLabelSmall = () => {
    const {tabValue, onMouseTabNum} = this.state;
    return (
      <Icon
        name='lightning'
        color={onMouseTabNum===1 || tabValue===1 ? "blue":"grey"}
        style={{
          bottom:20,
          left:21.5,
          fontSize:15,
          position:"absolute",
        }}
      />
    );
  }

  notificationsTabLabelSmall = () => {
    const {tabValue, onMouseTabNum} = this.state;
    return (
      <Icon
        name='bell outline'
        color={onMouseTabNum===2 || tabValue===2 ? "blue":"grey"}
        style={{
          bottom:20,
          left:21.5,
          fontSize:15,
          position:"absolute",
        }}
      />
    );
  }

  messagesTabLabelSmall = () => {
    const {tabValue, onMouseTabNum} = this.state;
    return (
      <Icon
        name='mail'
        color={onMouseTabNum===3 || tabValue===3 ? "blue":"grey"}
        style={{
          bottom:20,
          left:21.5,
          fontSize:15,
          position:"absolute",
        }}
      />
    );
  }

  homeTabLabel = () => {
    const {tabValue, onMouseTabNum} = this.state;
    return (
      <List horizontal style={{minWidth:65, marginLeft:-12}}>
        <List.Item style={{marginTop:0}}>
          <Icon
            name='home'
            color={onMouseTabNum===0 || tabValue===0 ? "blue":"grey"}
            style={{fontSize:15}}
          />
        </List.Item>
        <List.Item style={{
          fontSize:13,
          marginLeft:5,
          fontWeight:"bold",
          textTransform:'initial',
        }}>
          Home
        </List.Item>
      </List>
    );
  }

  momentsTabLabel = () => {
    const {tabValue, onMouseTabNum} = this.state;
    return (
      <List horizontal style={{minWidth:80, marginLeft:-15}}>
        <List.Item style={{marginTop:0}}>
          <Icon
            name='lightning'
            color={onMouseTabNum===1 || tabValue===1 ? "blue":"grey"}
            style={{fontSize:15}}
          />
        </List.Item>
        <List.Item style={{
          fontSize:13,
          marginLeft:2,
          fontWeight:"bold",
          textTransform:'initial',
        }}>
          Moments
        </List.Item>
      </List>
    );
  }

  notificationsTabLabel = () => {
    const {tabValue, onMouseTabNum} = this.state;
    return (
      <List horizontal style={{minWidth:110, marginLeft:-14}}>
        <List.Item style={{marginTop:0}}>
          <Icon
            name='bell outline'
            color={onMouseTabNum===2 || tabValue===2 ? "blue":"grey"}
            style={{fontSize:15}}
          />
        </List.Item>
        <List.Item style={{
          fontSize:13,
          marginLeft:5,
          fontWeight:"bold",
          textTransform:'initial',
        }}>
          Notifications
        </List.Item>
      </List>
    );
  }

  messagesTabLabel = () => {
    const {tabValue, onMouseTabNum} = this.state;
    return (
      <List horizontal style={{width:90, marginLeft:-13}}>
        <List.Item style={{marginTop:0}}>
          <Icon
            name='mail'
            color={onMouseTabNum===3 || tabValue===3 ? "blue":"grey"}
            style={{fontSize:15}}
          />
        </List.Item>
        <List.Item style={{
          fontSize:13,
          marginLeft:5,
          fontWeight:"bold",
          textTransform:'initial',
        }}>
          Messages
        </List.Item>
      </List>
    );
  }

  doNotShowMainHeaderNow = () => {
    const { currentPath } = this.state;
    return (
      currentPath===null || currentPath==="/" ||
      currentPath==="/signup" || currentPath==="/signin" ||
      currentPath==="/pagedoesnotexist" || currentPath==="/test"
    );
  }
  
  calcMarginLeft1 = () => {
    const { screenWidth } = this.state;
    var minValue = 105;
    var value = (1000-screenWidth)*0.35;
    return Math.min(minValue, value);
  }

  calcMarginLeft2 = () => {
    const { screenWidth } = this.state;
    var minValue = 75;
    var value = (1000-screenWidth)*0.25;
    return Math.min(minValue, value);
  }

  getSmallWindowLayout = () => {
    const { classes, router } = this.props;

    return (
      <Paper
        square
        elevation={0}
        style={{
          display:"flex", justifyContent:"flex-start",
          minWidth:660, borderBottom:'1px solid #A8A8A8',
          position: "fixed", zIndex:1000, width:"100vw"
        }}
      >
        <Tabs
          value={this.state.tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
          style={{
            display:"flex",
            borderColor:"black",
            justifyContent:"flex-start",
          }}
        >
          <Tab
            label={this.homeTabLabelSmall()}
            classes={{ root: classes.tabRoot }}
            onClick={() => router.push("/home")}
            onMouseEnter={() => this.setState({onMouseTabNum: 0})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:60, width:60, left:47.5}}
          />
          <Tab
            label={this.momentsTabLabelSmall()}
            classes={{ root: classes.tabRoot }}
            onClick={() => router.push("/moments")}
            onMouseEnter={() => this.setState({onMouseTabNum: 1})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:60, width:60, left:47.5}}
          />
          <Tab
            label={this.notificationsTabLabelSmall()}
            classes={{ root: classes.tabRoot }}
            onClick={() => router.push("/notifications")}
            onMouseEnter={() => this.setState({onMouseTabNum: 2})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:60, width:60, left:47.5}}
          />
          <Tab
            label={this.messagesTabLabelSmall()}
            classes={{ root: classes.tabRoot }}
            onClick={() => this.setState({showDirectMessageModal:true})}
            onMouseEnter={() => this.setState({onMouseTabNum: 3})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:60, width:60, left:47.5}}
          />
          <Icon
            name='twitter'
            color="blue"
            size="large"
            style={{
              marginTop:15,
              marginLeft:215-this.calcMarginLeft1()
            }}
          />
        
          <div style={{
            marginTop:5,
            marginLeft:160-this.calcMarginLeft2()
          }}>
            <SearchPanel />
          </div>
        </Tabs>
        <div style={{marginTop:7, marginLeft:17.5}}>
          <HeaderIconDropDown />
        </div>
        <div style={{marginTop:6, marginLeft:15.5}}>
          <Button
            onClick={() => null}
            style={{borderRadius:20}}
            primary
            content="Tweet"
          />
        </div>
        <DirectMessageModal
          showDirectMessageModal={this.state.showDirectMessageModal}
          closeDirectMessageModal={this.closeDirectMessageModal}
        />
      </Paper>
    );
  }

  getTwoColumnLayout = () => {
    const { classes, router } = this.props;

    return (
      <Paper
        square
        elevation={0}
        style={{
          display:"flex", justifyContent:"center",
          minWidth:1000, borderBottom:'1px solid #A8A8A8',
          position: "fixed", zIndex:1000, width:"100vw"
        }}
      >
        <Tabs
          value={this.state.tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
          style={{
            display:"flex",
            justifyContent:"center",
            marginLeft:5
          }}
        >
          <Tab
            label={this.homeTabLabel()}
            classes={{ root: classes.tabRoot }}
            onClick={() => router.push("/home")}
            onMouseEnter={() => this.setState({onMouseTabNum: 0})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:0, width:90}}
          />
          <Tab
            label={this.momentsTabLabel()}
            classes={{ root: classes.tabRoot }}
            onClick={() => router.push("/moments")}
            onMouseEnter={() => this.setState({onMouseTabNum: 1})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:0, width:100}}
          />
          <Tab
            label={this.notificationsTabLabel()}
            classes={{ root: classes.tabRoot }}
            onClick={() => router.push("/notifications")}
            onMouseEnter={() => this.setState({onMouseTabNum: 2})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:0, width:130}}
          />
          <Tab
            label={this.messagesTabLabel()}
            classes={{ root: classes.tabRoot }}
            onClick={() => this.setState({showDirectMessageModal:true})}
            onMouseEnter={() => this.setState({onMouseTabNum: 3})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:0, width:110}}
          />
          <Icon
            name='twitter'
            color="blue"
            size="large"
            style={{marginTop:15, marginLeft:20}}
          />
          <div className="item" style={{marginTop:5, marginLeft:40}}>
            <SearchPanel />
          </div>
        </Tabs>
        <div style={{marginTop:7, marginLeft:17.5}}>
          <HeaderIconDropDown />
        </div>
        <div style={{marginTop:6, marginLeft:15.5}}>
          <ComposeNewTweetModal />
        </div>
        <DirectMessageModal
          showDirectMessageModal={this.state.showDirectMessageModal}
          closeDirectMessageModal={this.closeDirectMessageModal}
        />
      </Paper>
    );
  }

  getThreeColumnLayout = () => {
    const { classes, router } = this.props;

    return (
      <Paper
        square
        elevation={0}
        style={{
          display:"flex", justifyContent:"center",
          borderBottom:'1px solid #A8A8A8',
          position: "fixed", zIndex:1000, width:"100vw"
        }}
      >
        <Tabs
          value={this.state.tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
          style={{
            display:"flex",
            justifyContent:"center",
            marginLeft:5
          }}
        >
          <Tab
            label={this.homeTabLabel()}
            classes={{ root: classes.tabRoot }}
            onClick={() => router.push("/home")}
            onMouseEnter={() => this.setState({onMouseTabNum: 0})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:0, width:90}}
          />
          <Tab
            label={this.momentsTabLabel()}
            classes={{ root: classes.tabRoot }}
            onClick={() => router.push("/moments")}
            onMouseEnter={() => this.setState({onMouseTabNum: 1})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:0, width:100}}
          />
          <Tab
            label={this.notificationsTabLabel()}
            classes={{ root: classes.tabRoot }}
            onClick={() => router.push("/notifications")}
            onMouseEnter={() => this.setState({onMouseTabNum: 2})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:0, width:130}}
          />
          <Tab
            label={this.messagesTabLabel()}
            classes={{ root: classes.tabRoot }}
            onClick={() => this.setState({showDirectMessageModal:true})}
            onMouseEnter={() => this.setState({onMouseTabNum: 3})}
            onMouseLeave={() => this.setState({onMouseTabNum: null})}
            style={{minWidth:0, width:110}}
          />
          <Icon
            name='twitter'
            color="blue"
            size="large"
            style={{marginTop:15, marginLeft:160}}
          />
          <div className="item" style={{marginTop:5, marginLeft:200}}>
            <SearchPanel />
          </div>
        </Tabs>
        <div style={{marginTop:7, marginLeft:17.5}}>
          <HeaderIconDropDown />
        </div>
        <div style={{marginTop:6, marginLeft:15.5}}>
          <ComposeNewTweetModal />
        </div>
        <DirectMessageModal
          showDirectMessageModal={this.state.showDirectMessageModal}
          closeDirectMessageModal={this.closeDirectMessageModal}
        />
      </Paper>
    );
  }

  render() {
    const {screenWidth} = this.state;
    
    if(this.doNotShowMainHeaderNow()) {
      return null;
    }

    if(screenWidth < 1000) {
      return this.getSmallWindowLayout();
    } else if(screenWidth < 1250) {
      return this.getTwoColumnLayout();
    } else {
      return this.getThreeColumnLayout();
    }
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display:"flex",
    justifyContent:"center",
  },
  hideScroll: {
    '&::-webkit-scrollbar': {
      display:'none'
    },
  },
  tabsRoot: {
    //borderBottom: '2px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: '#1890ff',
  },
  tabRoot: {
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabSelected: {
    //width: 100
  },
});


const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default withStyles(styles)(
  withRouter(
    connect(mapStateToProps)(MainHeader)
  )
);
