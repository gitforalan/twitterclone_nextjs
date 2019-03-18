import React from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'next/router';


import {
  Icon,
  List,
  Dropdown,
} from 'semantic-ui-react';


class SignInTabs extends React.Component {
  state = {
    value: null,
    isMouseOnDropDropdownText: false,
  };

  componentDidMount() {
    const { router } = this.props;
    router.prefetch("/");
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleOnMouseEnter = (value) => {
    this.setState({ value });
  }

  handleOnMouseLeave = () => {
    this.setState({ value: null });
  }

  homeTabLabel = () => {
    return (
      <List
        horizontal
        style={{width:70, marginLeft:-11.5}}
      >
        <List.Item style={{marginTop:5}}>
          <Icon
            name='twitter'
            color="blue"
            style={{fontSize:20}}
          />
        </List.Item>
        <List.Item style={{
          fontSize:14, fontWeight:"bold",
          marginLeft:5, textTransform:'initial',
        }}>
          Home
        </List.Item>
      </List>
    );
  }

  aboutTabLabel = () => {
    return (
      <List
        horizontal
        style={{marginTop:2.5}}
      >
        <List.Item style={{
          fontSize:14,
          fontWeight:"bold",
          textTransform:'initial',
        }}>
          About
        </List.Item>
      </List>
    );
  }

  handleMouseOnDropDropdownText = () => {
    this.setState({
      isMouseOnDropDropdownText: true,
    });
  }

  handleLeaveOnDropDropdownText = () => {
    this.setState({
      isMouseOnDropDropdownText: false,
    });
  }

  languageDropdownText = () => {
    const { isMouseOnDropDropdownText } = this.state;
    return (
      <div
        onMouseEnter={() => this.handleMouseOnDropDropdownText()}
        onMouseLeave={() => this.handleLeaveOnDropDropdownText()}
        style={
          isMouseOnDropDropdownText ?
          {textDecoration:"underline"}:null
        }
      >
        Language: <strong>English</strong>
      </div>
    );
  }
  
  languageDropdown = () => {
    return (
      <Dropdown
        text={this.languageDropdownText()}
        pointing='top right'
        style={{marginTop:13, marginLeft:500, zIndex:500}}
      >
        <Dropdown.Menu style={{zIndex:500}}>
          <Dropdown.Item text='New' />
          <Dropdown.Item text='Open...' description='ctrl + o' />
          <Dropdown.Item text='Save as...' description='ctrl + s' />
          <Dropdown.Item text='Rename' description='ctrl + r' />
          <Dropdown.Item text='Make a copy' />
          <Dropdown.Item icon='folder' text='Move to folder' />
          <Dropdown.Item icon='trash' text='Move to trash' />
          <Dropdown.Divider />
          <Dropdown.Item text='Download As...' />
          <Dropdown.Item text='Publish To Web' />
          <Dropdown.Item text='E-mail Collaborators' />
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  render() {
    const { classes, router } = this.props;
    const { value } = this.state;

    return (
      <div
        square
        className={classes.root}
        //elevation={1}
        style={{borderBottom:'1px solid #A8A8A8'}}
      >
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
        >
          <Tab
            disableRipple
            classes={{
              root: classes.tabRoot,
              selected: classes.tabSelected
            }}
            label={this.homeTabLabel()}
            onClick={() => router.push("/")}
            onMouseEnter={() => this.handleOnMouseEnter(0)}
            onMouseLeave={() => this.handleOnMouseLeave()}
            style={{minWidth:0, width:100}}
          />
          <Tab
            disableRipple
            classes={{
              root: classes.tabRoot,
              selected: classes.tabSelected
            }}
            label={this.aboutTabLabel()}
            onMouseEnter={() => this.handleOnMouseEnter(1)}
            onMouseLeave={() => this.handleOnMouseLeave()}
            style={{minWidth:0, width:100}}
          />
        </Tabs>
        {this.languageDropdown()}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display:"flex",
    justifyContent:"center",
  },
  tabsRoot: {
    //borderBottom: '1px solid #e8e8e8',
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

SignInTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(SignInTabs));