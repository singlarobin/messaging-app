import React, { Component } from "react";
import styles from "./HomeStyle";
import Header from "./Header/Header";
import { Provider } from "./context";
import { Grid, Paper, withStyles, Typography } from "@material-ui/core";

class Home extends Component {
  state = {
    buttonValue: "home"
  };
  componentDidUpdate = () => {
    const { buttonValue } = this.state;
    const homeContainer = document.getElementById("home");
    const aboutContainer = document.getElementById("about");
    const contactContainer = document.getElementById("contact");
    switch (buttonValue) {
      case "home":
        homeContainer.scrollTo(0, homeContainer.scrollHeight);
        break;
      case "about":
        aboutContainer.scrollTo(0, aboutContainer.scrollHeight);
        break;
      case "contactUs":
        contactContainer.scrollTo(0, contactContainer.scrollHeight);
        break;
      default:
        break;
    }
  };

  handleButton = value => {
    this.setState({
      buttonValue: value
    });
  };

  getContext = () => ({
    handleButtonFunction: this.handleButton
  });
  render() {
    const { classes } = this.props;
    console.log(this.state.buttonValue);
    return (
      <Provider value={this.getContext()}>
        <div className={classes.root}>
          <Header />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.homeContent} variant="outlined" square>
                <Typography
                  id="home"
                  variant="h3"
                  className={classes.welcome}
                  gutterBottom
                >
                  Web Chat App
                </Typography>
                <Typography className={classes.content} variant="h6">
                  Talk to your loved ones.
                </Typography>
              </Paper>
              <Paper className={classes.aboutContent} variant="outlined" square>
                <Typography id="about">About</Typography>
              </Paper>
              <Paper
                className={classes.contactContent}
                variant="outlined"
                square
              >
                <Typography id="contact">Contact Us</Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Provider>
    );
  }
}
export default withStyles(styles)(Home);
