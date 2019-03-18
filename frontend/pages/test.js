import React from "react";


class test extends React.Component {

  static async getInitialProps({query}) {
    // query.slug
    return {}
  }

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

  render() {
    return(
      <div>
        aiueo
      </div>
    );
  } 
}


export default test;
