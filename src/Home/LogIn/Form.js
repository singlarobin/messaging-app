import React, { Component } from "react";
import styles from "./formStyle";
import { withStyles, TextField, Button, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
const firebase = require("firebase");

class Form extends Component {
  state = {
    userEmail: null,
    password: null,
    logInError: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.userEmail, this.state.password)
      .then(
        () => {
          this.props.history.push("/dashboard");
        },
        Error => {
          this.setState({ logInError: "Error occured while logging in!" });
        }
      );
  };
  handleChange = (type, event) => {
    const { value } = event.target;
    switch (type) {
      case "userEmail":
        this.setState({ userEmail: value });
        break;
      case "password":
        this.setState({ password: value });
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
          id="userEmail"
          label="Enter Email Address"
          fullWidth
          required
          onChange={e => this.handleChange("userEmail", e)}
        />
        <TextField
          id="password"
          label="Enter Your Password"
          type="password"
          fullWidth
          required
          onChange={e => this.handleChange("password", e)}
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
        {this.state.logInError ? (
          <Typography variant="h6" color="error" align="center">
            {this.state.logInError}
          </Typography>
        ) : null}
      </form>
    );
  }
}
export default withStyles(styles)(withRouter(Form));
