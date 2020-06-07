import React, { Component } from "react";
import styles from "./style";
import Form from "./Form";
import {
  withStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@material-ui/core";
class LogIn extends Component {
  state = {
    open: false
  };
  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Button className={classes.logIn} onClick={this.handleToggle}>
          LogIn
        </Button>
        <Dialog open={open} onClose={this.handleToggle}>
          <DialogTitle>LogIn Form</DialogTitle>
          <DialogContent>
            <DialogContentText>Please LogIn to your account.</DialogContentText>
          </DialogContent>
          <Form />
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(LogIn);
