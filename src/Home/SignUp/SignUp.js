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
class SignUp extends Component {
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
        <Button className={classes.signUp} onClick={this.handleToggle}>
          SignUp
        </Button>
        <Dialog open={open} onClose={this.handleToggle}>
          <DialogTitle>SignUp Form</DialogTitle>
          <DialogContent>
            <DialogContentText>Please create your account.</DialogContentText>
          </DialogContent>
          <Form />
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(SignUp);
