import React, { Component } from "react";
import styles from "./formStyle";
import { withStyles, TextField, Button, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
const firebase = require("firebase");

class Form extends Component {
  state = {
    userName: null,
    userEmail: null,
    password: null,
    passwordConfirm: null,
    signUpError: ""
  };
  isValid = () => this.state.password === this.state.passwordConfirm;

  handleSubmit = e => {
    e.preventDefault();
    !this.isValid
      ? this.setState({ signUpError: "Check Your Password" })
      : firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.userEmail,
            this.state.password
          )
          .then(
            authRes => {
              const userObj = {
                Email: this.state.userEmail,
                Name: this.state.userName.toLowerCase(),
                Description: ""
              };
              firebase
                .firestore()
                .collection("users")
                .doc(this.state.userEmail)
                .set(userObj)
                .then(
                  () => {
                    this.props.history.push("/dashboard");
                  },
                  dbError => {
                    this.setState({ signUpError: "Failed to add user" });
                  }
                );
            },
            authError => {
              this.setState({ signUpError: "Failed to add user" });
            }
          );
  };
  handleChange = (type, event) => {
    const { value } = event.target;
    switch (type) {
      case "userName":
        this.setState({ userName: value });
        break;
      case "userEmail":
        this.setState({ userEmail: value });
        break;
      case "password":
        this.setState({ password: value });
        break;
      case "passwordConfirm":
        this.setState({ passWordConfirm: value });
        break;
      default:
        break;
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <TextField
          autoFocus
          id="userName"
          label="Enter User Name"
          type="input"
          fullWidth
          required
          onChange={e => this.handleChange("userName", e)}
        />
        <TextField
          id="userEmail"
          label="Enter Email Address"
          fullWidth
          required
          onChange={e => this.handleChange("userEmail", e)}
        />
        <TextField
          id="password"
          label="Create Your Password"
          type="password"
          fullWidth
          required
          onChange={e => this.handleChange("password", e)}
        />
        <TextField
          id="passwordConfirm"
          label="Confirm Your Password"
          type="password"
          fullWidth
          required
          onChange={e => this.handleChange("passwordConfirm", e)}
        />
        <Button
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
        {this.state.signUpError ? (
          <Typography variant="h6" color="error" align="center">
            {this.state.signUpError}
          </Typography>
        ) : null}
      </form>
    );
  }
}
export default withStyles(styles)(withRouter(Form));
