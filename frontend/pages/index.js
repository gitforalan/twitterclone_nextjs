import CircularProgress from "@material-ui/core/CircularProgress";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutline';
import CommentIcon from '@material-ui/icons/Message';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Link from "next/link";
import React from "react";

import { connect } from "react-redux";
import firebase from "../lib/firebase";
import Router from "next/router";



import {
  Icon,
  Button,
  List,
} from 'semantic-ui-react';



const bottomBar = () => {
  var _marginLeft = 18;
  var linkName = [
    "Help Center",
    "Blog",
    "Status",
    "Jobs",
    "Terms",
    "Privacy Policy",
    "Cookies",
    "Ads info",
    "Brand",
    "Apps",
    "Advertise",
    "Marketing",
    "Businesses",
    "Developers",
    "Directory",
    "Settings",
    "© 2019 Twitter",
  ];
  return (
    <AppBar
      position="fixed" color="default"
      style={{top:'auto', bottom:0, height:48}}
    >
      <Toolbar
        style={{
          display:"flex", justifyContent:"center",
          alignContent:"center", marginTop:-9
        }}
      >
        <div style={{fontSize:12}}>
          <Link prefetch href='/test'>
            <a>About</a>
          </Link>
        </div>
        {linkName.map(value => (
          <div
            key={value}
            style={{
              marginLeft:_marginLeft,
              fontSize:12
            }}
          >
            <Link prefetch href='/test'>
              <a>{value}</a>
            </Link>
          </div>
        ))}
      </Toolbar>
    </AppBar>
  );
}

const leftHalf = () => {
  return (
    <Grid item>
      <Paper
        square={true}
        elevation={0}
        style={{
          height:"100vh", width:"50vw",
          backgroundColor:"#4343F3",
          display:"flex", justifyContent:"center",
          flexDirection: "column", alignItems:"center"
        }}
      >
        <div>
          <div>
            <SearchIcon
              style={{
                display:"inline", height:40, width:40,
                color:"white", marginBottom:-15
              }}
            />
            <Typography style={{
              display:"inline", color:"white",
              fontSize:20, fontWeight:"bold", marginLeft:20
            }}>
              Follow your interests.
            </Typography>
          </div>
          <div style={{marginTop:40}}>
            <PeopleOutlinedIcon style={{
              display:"inline", height:40, width:40,
              color:"white", marginBottom:-15
            }} />
            <Typography style={{
              display:"inline", color:"white", fontSize:20,
              fontWeight:"bold", marginLeft:20
            }} >
              Hear what people are talking about.
            </Typography>
          </div>
          <div style={{marginTop:40}}>
            <CommentIcon style={{
              display:"inline", height:40, width:40,
              color:"white", marginBottom:-15
            }} />
            <Typography style={{
              display:"inline", color:"white",
              fontSize:20, fontWeight:"bold",
              marginLeft:20
            }} >
              Join the conversation.
            </Typography>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

const rightHalf = () => {
  return(
    <Grid item>
      <Paper
        square={true}
        elevation={0}
        style={{
          height:"100vh",
          width:"50vw",
          backgroundColor:"white",
          display:"flex",
          justifyContent:"center",
          flexDirection: "column",
          alignItems:"center"
        }}
      >
        <div>
          <List horizontal>
            <List.Item>
              <Icon
                name='twitter'
                color="blue"
                style={{fontSize:45}}
              />
            </List.Item>
            <List.Item style={{marginLeft:225}}>
              <Button
                style={{borderRadius:20, fontWeight:"bold"}}
                basic color='blue'
                content="Log in"
                onClick = {() => Router.push("/signin")}
              />
            </List.Item>
          </List>
          
          <Typography style={{
            fontSize:27, fontWeight:"bold",
            marginTop:-5, width:350
          }}>
            See what’s happening in the world right now
          </Typography>

          <Typography style={{
            fontSize:18, fontWeight:"bold", marginTop:40
          }}>
            Join Twitter today.
          </Typography>
          
          <List>
            <List.Item>
              <Button
                style={{
                  borderRadius:20,
                  fontWeight:"bold",
                  width:355
                }}
                color='blue'
                content="Sign Up"
                primary
                onClick = {() => Router.push("/signup")}
              />
            </List.Item>
            <List.Item style={{marginTop:10}}>
              <Button
                style={{
                  borderRadius:20,
                  fontWeight:"bold",
                  width:355
                }}
                basic color='blue'
                content="Log in"
                onClick = {() => Router.push("/signin")}
              />
            </List.Item>
          </List>
        </div>
      </Paper>
    </Grid>
  );
}

class Index extends React.Component {

  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        Router.push("/home");
      }
    });

  }

  componentDidMount() {
    
  }

  landingPage = () => {
    return (
      <div>
        <Grid item>
          <Grid
            container
            justify="center"
            spacing={0}
          >
            {leftHalf()}
            {rightHalf()}
          </Grid>
          {bottomBar()}
        </Grid>
      </div>
    );
  }

  render() {
    return this.landingPage();
  }
};




export default connect(null)(Index);

