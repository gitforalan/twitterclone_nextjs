import React from "react";
import firebase from "../lib/firebase";
import md5 from "md5";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import Router from "next/router";
import * as api from "../src/api";
import { setCurrentUser } from "../src/actions";

import { connect } from "react-redux";
import Link from "next/link";



class Signup extends React.Component {
  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged(user => {
      if(user && user.uid) {
        Router.push("/home");
      }
    });

    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
      loading: false,
    };
  }



  usernameAlreadyExists = async () => {
    const { username } = this.state;
    return await api.checkIfUsernameExists(username)
      .then(response => {
        return response.data.res;
      })
      .catch(error => {
        return false;
      });
  }

  isFormValid = async () => {
    let errors = [];
    let error;

    const _usernameAlreadyExists = await this.usernameAlreadyExists();

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if(_usernameAlreadyExists) {
      error = { message: "Username already exists" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ name, username, email, password, passwordConfirmation }) => {
    return (
      !name.length ||
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (await this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
            })
            .then(() => {
              this.saveUser(createdUser);
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
            });
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

  saveUser = (createdUser) => {
    var user = {
      uid: createdUser.user.uid,
      name: this.state.name,
      username: createdUser.user.displayName,
    }
    api.registerUser(user)
      .then(response => {
        this.props.setCurrentUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const {
      name,
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;

    return (
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{height:"100vh"}}
      >
        <Grid.Column style={{ maxWidth:450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="twitter" color="orange" />
            Register for Twitter
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="name"
                icon="user outline"
                iconPosition="left"
                placeholder="Name"
                onChange={this.handleChange}
                value={name}
                type="text"
              />
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                type="text"
              />

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

              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
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
            <Link prefetch href='/signin'>
              <a style={{
                color:"blue",
                fontWeight:"bold"
              }}>
                Already a user?
              </a>
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { setCurrentUser })(Signup);
