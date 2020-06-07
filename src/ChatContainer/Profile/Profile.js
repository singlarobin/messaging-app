import React, { Component } from "react";
import {
  withStyles,
  Grid,
  Paper,
  GridList,
  GridListTile,
  GridListTileBar,
  Dialog,
  DialogTitle,
  TextField,
  Button,
  IconButton
} from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import styles from "./style";
import ImageUpload from "./imageUpload";
import { withRouter } from "react-router-dom";

const firebase = require("firebase");

class Profile extends Component {
  state = {
    url: "",
    email: null,
    name: null,
    description: null,
    open: false
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push("/");
      } else {
        firebase
          .firestore()
          .collection("users")
          .doc(user.email)
          .onSnapshot(async res => {
            const user = res.data();
            this.setState({
              email: user.Email,
              name: user.Name.charAt(0).toUpperCase() + user.Name.substr(1),
              description: user.Description
            });
            firebase
              .storage()
              .ref()
              .child("users/" + this.state.email)
              .getDownloadURL()
              .then(url => {
                this.setState({ url });
              });
          });
      }
    });
  };
  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };
  handleURLChange = url => {
    this.setState({
      url: url,
      open: !this.state.open
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    firebase
      .firestore()
      .collection("users")
      .doc(this.state.email)
      .set(
        {
          Name: this.state.name.toLowerCase(),
          Description: this.state.description
        },
        { merge: true }
      )
      .then(() => {
        this.props.history.push("/dashboard");
      });
  };
  handleInputChange = (type, event) => {
    const { value } = event.target;
    switch (type) {
      case "name":
        this.setState({
          name: value
        });
        break;
      case "description":
        this.setState({
          description: value
        });
        break;
      default:
        break;
    }
  };
  render() {
    const { classes } = this.props;
    const { url, email, name, description, open } = this.state;
    console.log(this.state.email, this.state.name);

    return (
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <GridList
            className={classes.gridList}
            cols={{ xs: 1, sm: 2, md: 1.5, lg: 3, xl: 3 }}
          >
            <GridListTile rows={{ xs: 1, sm: 1, md: 1.5, lg: 2, xl: 2 }}>
              <img
                src={url || "http://via.placeholder.com/400X300"}
                alt="Uploaded"
                className={classes.profileImage}
              />
              <GridListTileBar
                actionIcon={
                  <IconButton
                    onClick={this.handleToggle}
                    variant="contained"
                    color="primary"
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          </GridList>
          <Dialog open={open} onClose={this.handleToggle}>
            <DialogTitle>Change Your Profile Pic</DialogTitle>
            <ImageUpload
              handleParentChange={this.handleURLChange}
              email={email}
            />
          </Dialog>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper} square elevation={0}>
            <form onSubmit={e => this.handleSubmit(e)} className={classes.form}>
              <TextField
                autoFocus
                id="name"
                placeholder="Enter User Name"
                type="input"
                fullWidth
                required
                value={name}
                className={classes.text}
                onChange={e => this.handleInputChange("name", e)}
              />
              <TextField
                id="description"
                placeholder="Describe Yourself"
                type="input"
                fullWidth
                value={description}
                className={classes.text}
                multiline
                onChange={e => this.handleInputChange("description", e)}
              />
              <Button
                type="submit"
                className={classes.submit}
                variant="contained"
                fullWidth
                disableElevation
                className={classes.button}
              >
                Save
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(withRouter(Profile));
