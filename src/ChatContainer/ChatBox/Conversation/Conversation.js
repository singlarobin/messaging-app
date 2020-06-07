import React, { Component } from "react";
import { withStyles, Paper, Typography, IconButton } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import styles from "./style";
const firebase = require("firebase");
class Conversation extends Component {
  componentDidMount = () => {
    const container = document.getElementById("container");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  };
  componentDidUpdate = () => {
    const container = document.getElementById("container");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  };
  render() {
    const { classes, chat, userEmail } = this.props;
    const friendEmail = chat.users.filter(user => user !== userEmail)[0];
    const emails = [userEmail, friendEmail];
    const docKey = emails.sort().join(":");
    if (
      chat.messages.length !== 0 &&
      chat.messages[chat.messages.length - 1].sender !== userEmail &&
      !chat.recieverHasRead
    ) {
      firebase
        .firestore()
        .collection("chat")
        .doc(docKey)
        .update({
          recieverHasRead: true
        })
        .then(() => {
          console.log("Success");
        })
        .catch(error => {
          console.log("Error:", error);
        });
    }
    return (
      <div>
        {chat.messages.length === 0 ? (
          <Paper elevation={0} square className={classes.noConversationPaper}>
            <Typography variant="h4" align="center" className={classes.content}>
              Start the Conversation
            </Typography>
          </Paper>
        ) : (
          <div id="container" className={classes.root}>
            {chat.messages.map((msg, index) => (
              <div key={index}>
                <Paper
                  elevation={0}
                  square
                  className={classes.conversationPaper}
                >
                  <Typography
                    className={
                      msg.sender === userEmail
                        ? classes.rightText
                        : classes.leftText
                    }
                  >
                    {msg.message}
                    <br />
                    <Typography variant="overline">
                      {new Date(msg.time).toLocaleTimeString()}
                    </Typography>
                    {msg.sender === userEmail ? (
                      <IconButton
                        classname={classes.tickIcon}
                        color={chat.recieverHasRead ? "primary" : "inherit"}
                      >
                        <DoneIcon />
                      </IconButton>
                    ) : null}
                  </Typography>
                </Paper>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(Conversation);
