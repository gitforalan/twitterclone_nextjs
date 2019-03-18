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



class WorldwideTrendsCard extends React.Component {
  render() {
    return(
      <Segment.Group style={{width:290, flexFlow:"column wrap", overflow:"hidden"}}>
        <Segment>
          <List link>
            <List.Item style={{marginTop:8}}>
              <div style={{display:"inline", color:"black", fontSize:18, fontWeight:"bold"}}>Worldwide trends</div>
              <div style={{display:"inline", color:"black", fontSize:12}}>・</div>
              <div style={{display:"inline", color:"blue", fontSize:12}}>Change</div>
            </List.Item>
            <List.Item style={{marginTop:8, color:"blue", fontWeight:"bold"}}>
              #柳楽さんに教えてあげよう
            </List.Item>
            <List.Item style={{color:"black"}}>
              CMに出演している柳楽さんも知らなかった「プラズマ乳酸菌」ってなに？抽選でiMUSEギフトセットをプレゼント！
            </List.Item>
            <List.Item style={{fontSize:13}}>
              <Icon name='external square' color="grey" />Promoted by キリンビバレッジ♪
            </List.Item>

            <List.Item style={{marginTop:8 ,color:"blue", fontWeight:"bold"}}>
              #السعوديه_لبنان
            </List.Item>
            <List.Item style={{fontSize:12}}>
              145K Tweets
            </List.Item>

            <List.Item style={{marginTop:8 ,color:"blue", fontWeight:"bold"}}>
              #40BinÖğrtAtamasıHaktır
            </List.Item>
            <List.Item style={{fontSize:12}}>
              18.4K Tweets
            </List.Item>

            <List.Item style={{marginTop:8 ,color:"blue", fontWeight:"bold"}}>
              Arsenal
            </List.Item>
            <List.Item style={{fontSize:12}}>
              200K Tweets
            </List.Item>

            <List.Item style={{marginTop:8 ,color:"blue", fontWeight:"bold"}}>
              Momaxصندوق_السبع_#
            </List.Item>
            <List.Item style={{fontSize:12}}>
              53.1K Tweets
            </List.Item>

            <List.Item style={{marginTop:8 ,color:"blue", fontWeight:"bold"}}>
              #CHENEW
            </List.Item>
            <List.Item style={{fontSize:12}}>
              15.8K Tweets
            </List.Item>

            <List.Item style={{marginTop:8 ,color:"blue", fontWeight:"bold"}}>
              David Luiz
            </List.Item>
            <List.Item style={{fontSize:12}}>
              5,478 Tweets
            </List.Item>

            <List.Item style={{marginTop:8 ,color:"blue", fontWeight:"bold"}}>
              #ÇekeVarsaTümBorçlaraHapis
            </List.Item>
            <List.Item style={{fontSize:12}}>
              10.5K Tweets
            </List.Item>

            <List.Item style={{marginTop:8 ,color:"blue", fontWeight:"bold"}}>
              julian castro
            </List.Item>
            <List.Item style={{fontSize:12}}>
              10.2K Tweets
            </List.Item>

            <List.Item style={{marginTop:8 ,color:"blue", fontWeight:"bold"}}>
              West Ham
            </List.Item>
            <List.Item style={{fontSize:12}}>
              62.7K Tweets
            </List.Item>

            <List.Item style={{marginTop:8 ,color:"blue", fontWeight:"bold"}}>
              #السعوديه_لبنان
            </List.Item>
            <List.Item style={{fontSize:12}}>
              145K Tweets
            </List.Item>
            
          </List>
        </Segment>
      </Segment.Group>
    );
  }

}

export default WorldwideTrendsCard;