import React from "react";
import firebase from "../lib/firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { connect } from "react-redux";
import Router from "next/router";
import { setCurrentUserById } from "../src/actions";
import Link from "next/link";


class Signin extends React.Component {
  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        Router.push("/home");
      }
    });

    this.state = {
      email: "",
      password: "",
      errors: [],
      loading: false,
    };
  }

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(signedInUser => {
          var userId = signedInUser.user.uid;
          this.props.setCurrentUserById(userId);
          Router.push("/home");
        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{height:"100vh"}}
      >
        <Grid.Column style={{ maxWidth:450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="twitter" color="violet" />
            Login to Twitter
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="violet"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            <div>Don't have an account?</div>
            <Link prefetch href='/signup'>
              <a style={{
                color:"blue",
                fontWeight:"bold"
              }}>
                Register
              </a>
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(null, { setCurrentUserById })(Signin);
