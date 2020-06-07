import React, { Component } from "react";
import { withStyles, Paper, IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import styles from "./style";
const firebase = require("firebase");

class ChatTextBox extends Component {
  state = {
    message: null
  };
  handleSubmitMessage = () => {
    document.getElementById("messageText").value = "";
    const { chat, userEmail } = this.props;
    const friendEmail = chat.users.filter(user => user !== userEmail)[0];
    const emails = [userEmail, friendEmail];
    const docKey = emails.sort().join(":");
    firebase
      .firestore()
      .collection("chat")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          message: this.state.message,
          sender: userEmail,
          time: new Date().getTime()
        }),
        recieverHasRead: false
      })
      .then(() => {
        this.props.handleSelectChat(0);
      });
  };
  handleUserTyping = e => {
    e.preventDefault();
    e.keyCode === 13
      ? this.handleSubmitMessage()
      : this.setState({ message: e.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <Paper elevation={0} square className={classes.paper}>
        <TextField
          id="messageText"
          multiline
          rows={1}
          placeholder="Type Your Message"
          onKeyUp={e => this.handleUserTyping(e)}
          className={classes.text}
        />
        <IconButton
          className={classes.sendButton}
          onClick={() => this.handleSubmitMessage()}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    );
  }
}
export default withStyles(styles)(ChatTextBox);
