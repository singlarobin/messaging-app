import React, { Component } from "react";
import styles from "./style";
import Header from "../Header/Header";
import ChatList from "../ChatList/ChatList";
import Conversation from "../ChatBox/Conversation/Conversation";
import ChatTextBox from "../ChatBox/ChatTextBox/ChatTextBox";
import { withStyles, Grid, Paper, Typography } from "@material-ui/core";
const firebase = require("firebase");
class DashBoard extends Component {
  state = {
    userEmail: null,
    url: "",
    chats: [],
    selectedChat: null,
    docKey: null
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.props.history.push("/");
      } else {
        this.setState({ userEmail: user.email });

        firebase
          .firestore()
          .collection("chat")
          .where("users", "array-contains", user.email)
          .onSnapshot(res => {
            let chats = res.docs.map(doc => doc.data());
            const sortedChat = chats.sort((i1, i2) => {
              if (i2.messages.length === 0) {
                return -1;
              }
              if (i1.messages.length === 0) {
                return 1;
              }
              return (
                i2.messages[i2.messages.length - 1].time -
                i1.messages[i1.messages.length - 1].time
              );
            });
            this.setState({
              chats: sortedChat
            });
            const selectedChatKey = this.props.location.selectedChatKey;
            let index;
            if (selectedChatKey) {
              index = sortedChat.findIndex(chat => chat.id === selectedChatKey);
              this.setState({
                selectedChat: index
              });
            }
            // if (this.state.selectedChat !== null) {
            //   this.buildDocKey();
            // }
          });

        firebase
          .storage()
          .ref()
          .child("users/" + user.email)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          })
          .catch(error => {
            this.setState({ url: "http://via.placeholder.com/400X300" });
          });
      }
    });
  };
  buildDocKey = () => {
    const { chats, userEmail, selectedChat } = this.state;
    const friendEmail = chats[selectedChat].users.filter(
      user => user !== userEmail
    )[0];
    const emails = [friendEmail, userEmail];
    const docKey = emails.sort().join(":");
    console.log("key:", docKey);
    //console.log("recieverHasRead:", chats[index].recieverHasRead);
    this.setState({
      docKey: docKey
    });
  };

  handleSelectChat = index => {
    console.log("index:", index);
    this.setState({
      selectedChat: index
    });
    // if (this.state.selectedChat !== null) {
    //   this.buildDocKey();
    // }
  };
  render() {
    const { userEmail, chats, url, selectedChat } = this.state;
    const { classes } = this.props;
    console.log("chats:", chats);
    return (
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12}>
          <Header userEmail={userEmail} url={url} />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.contentGrid}>
          <ChatList
            chats={chats}
            userEmail={userEmail}
            selectedChatIndex={selectedChat}
            handleSelectChat={this.handleSelectChat}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          {selectedChat === null || chats.length === 0 ? (
            <Paper elevation={0} square className={classes.noChatPaper}>
              <Typography
                variant="h4"
                align="center"
                className={classes.content}
              >
                Selected Chat will appear here.
              </Typography>
            </Paper>
          ) : (
            <div>
              <Conversation chat={chats[selectedChat]} userEmail={userEmail} />
              <ChatTextBox
                chat={chats[selectedChat]}
                userEmail={userEmail}
                handleSelectChat={this.handleSelectChat}
              />
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(DashBoard);
