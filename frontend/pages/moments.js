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



class Moments extends React.Component {
  render() {
    return(
      <div
        style={{
          height:"90vh",
          display:"flex",
          justifyContent:"center",
        }}>
        <div style={{
          fontSize:50,
          marginTop:150,
          fontWeight:"bold"
        }}>
          Moments
        </div>
      </div>
    );
  }
}


export default Moments;
