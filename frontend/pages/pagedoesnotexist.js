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
import { withRouter } from 'next/router'


class PageDoesNotExist extends React.Component {

  componentDidMount() {
    const { router } = this.props;
    router.prefetch("/home");
  }

  getHeader = () => {
    const { router } = this.props;

    return (
      <div
        className="ui secondary pointing menu"
        style={{
          height:49, backgroundColor:"white",
          position:"fixed", top: 0, width: "100%",
          zIndex:114514, borderBottom:'1px solid #A8A8A8',
        }}
      >

        <div
          className="item"
          style={{marginBottom:-29, marginLeft:60}}
          onClick={() => router.push("/home")}
        >
          <Icon
            name='twitter'
            size="large"
            color="blue"
            style={{cursor:"pointer"}}
          />
        </div>
      
        <div
          className="item"
          style={{
            marginBottom:-24, marginRight:60,
            flex:1, justifyContent:'flex-end',
          }}
          onClick={() => router.push("/home")}
        >
          <div style={{cursor:"pointer", fontWeight:"bold"}}>
            Home
          </div>
          <Icon
            style={{marginLeft:5, cursor:"pointer",}}
            name='long arrow alternate right'
            size="small" color="black"
          />
        </div>

      </div>
    );
  }

  getSearchPanel = () => {
    return(
      <List horizontal>
        <List.Item>
          <div className="ui search">
            <div className="ui icon input">
              <input
                style={{width:400}}
                className="prompt"
                type="text"
                placeholder="Search for a topic, full name, or @username"
              />
              <i className="search icon"></i>
            </div>
            <div className="results"></div>
          </div>
        </List.Item>
        <List.Item>
          <Button content='Search' />
        </List.Item>
      </List>
    );
  }

  render() {
    return(
      <div style={{
        backgroundColor:"#3843D5", display:"flex",
        justifyContent:"center", height:"100vh"
      }}>
        {this.getHeader()}
        <div style={{marginTop:100, textAlign:"center", color:"white"}}>
          <p style={{fontSize:40}}>
            Sorry, that page doesn’t exist!
          </p>
          <p style={{fontSize:20, marginTop:-40}}>
            You can <strong>search Twitter</strong> using the search box below or <strong>return to the homepage</strong>.
          </p>
          {this.getSearchPanel()}
          <p style={{wordSpacing:10, marginTop:20}}>
            العربية Български език বাংলা Català Čeština Dansk Deutsch Ελληνικά English English UK Español فارسی Suomi
            <br />Filipino Français ગુજરાતી עִבְרִית हिन्दी Hrvatski Magyar Bahasa Indonesia Italiano 日本語 ಕನ್ನಡ 한국어 मराठी
            <br />Bahasa Melayu Nederlands Norsk Polski Português Română Русский Slovenčina Српски Svenska தமிழ் ภาษาไทย
            <br />Türkçe Українська мова Tiếng Việt 简体中文 繁體中文
          </p>
          <p>
            © Twitter 2019 About Help Center Status
          </p>            
        </div>
      </div>
    );
  }
}



export default withRouter(PageDoesNotExist);