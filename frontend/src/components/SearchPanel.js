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

import { withRouter } from 'next/router';


class SearchPanel extends React.Component {
  state = {
    screenWidth: null,
    searchQuery: "",
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
    this.updateScreenWidth();
    window.addEventListener(
      "resize", this.updateScreenWidth.bind(this)
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  enterPressed = (event) => {
    const code = event.keyCode || event.which;
    if(code !== 13) return null;

    const { router } = this.props;
    const { searchQuery } = this.state;
    router.push({
      pathname: "/search",
      query: {q:searchQuery}
    });
  }

  handleClickSearchIcon = () => {
    const { router } = this.props;
    const { searchQuery } = this.state;
    router.push({
      pathname: "/search",
      query: {q:searchQuery}
    });
  }

  render() {
    const { screenWidth, searchQuery } = this.state;
    var _width = 235;
    if(screenWidth < 1000) {
      _width = 160;
    }
    if(screenWidth < 765) {
      _width = 100;
    }
    return(
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            className="prompt"
            placeholder="Search Twitter"
            style={{width:_width}}
            name="searchQuery"
            value={searchQuery}
            onChange={this.handleChange}
            onKeyPress={this.enterPressed.bind(this)}
          />
          <Icon
            name='search'
            onClick={() => this.handleClickSearchIcon()}
          />
        </div>
        <div className="results"></div>
      </div>
    );
  }
}

export default withRouter(SearchPanel);