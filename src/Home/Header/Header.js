import React, { Component } from "react";
import styles from "./HeaderStyle";
import SimpleMenu from "./SimpleMenu";
import LogIn from "../LogIn/LogIn";
import SignUp from "../SignUp/SignUp";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  withStyles
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";

class Header extends Component {
  handleClick = () => {
    console.log("button clicked");
  };
  handleClose = () => {
    console.log("close");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
            >
              <ChatIcon />
            </IconButton>
            <SimpleMenu />
            <Typography className={classes.title} />
            <SignUp />
            <LogIn />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles)(Header);
