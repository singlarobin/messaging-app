import React, { Component } from "react";
import { Button, withStyles } from "@material-ui/core";
import styles from "./imageUploadStyle";
const firebase = require("firebase");

class ImageUpload extends Component {
  state = {
    image: null,
    progress: 0
  };
  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({ image });
    }
  };
  handleUpload = e => {
    e.preventDefault();
    const { email } = this.props;
    const { image } = this.state;
    console.log("upload fxn");
    const storageRef = firebase.storage().ref();
    const uploadtask = storageRef.child("users/" + email).put(image);
    uploadtask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      () => {
        storageRef
          .child("users/" + email)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            this.props.handleParentChange(url);
          });
      }
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <progress value={this.state.progress} max="100" />
        <br />
        <input type="file" onChange={this.handleChange} />
        <Button
          variant="contained"
          color="primary"
          className={classes.upload}
          onClick={e => this.handleUpload(e)}
        >
          Upload
        </Button>
      </div>
    );
  }
}
export default withStyles(styles)(ImageUpload);
