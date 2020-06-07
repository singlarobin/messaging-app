import React, { Component, Fragment } from "react";
import {
  withStyles,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  IconButton
} from "@material-ui/core";
import MarkunreadIcon from "@material-ui/icons/Markunread";
import styles from "./style";

const firebase = require("firebase");

class ChatList extends Component {
  state = {
    url: [],
    name: []
  };

  componentDidMount = () => {
    const { chats, userEmail } = this.props;
    if (chats.length !== 0) {
      chats.map((chat, index) => {
        firebase
          .firestore()
          .collection("users")
          .doc(chat.users.filter(user => user !== userEmail)[0])
          .onSnapshot(snapshot => {
            const user = snapshot.data();
            console.log("user:", user);
            if (user) {
              this.setState({
                name: [...this.state.name, user.Name]
              });
            }
          });
        firebase
          .storage()
          .ref()
          .child("users/" + chat.users.filter(user => user !== userEmail)[0])
          .getDownloadURL()
          .then(url => {
            //console.log("url:",url)
            this.setState({
              url: [...this.state.url, url]
            });
          })
          .catch(error => {
            this.setState({
              url: [...this.state.url, "http://via.placeholder.com/400X300"]
            });
          });
      });
    }
  };
  handleChatClick = index => {
    this.props.handleSelectChat(index);
  };
  render() {
    const { classes, chats, userEmail, selectedChatIndex } = this.props;
    const { url, name } = this.state;
    return (
      <div>
        {chats.length === 0 ? (
          <Paper elevation={0} square className={classes.chatPaper}>
            <Typography variant="h5" align="center" className={classes.content}>
              Start the Conversation by Searching your Friends.
            </Typography>
          </Paper>
        ) : (
          <Paper elevation={0} square className={classes.chatPaper}>
            <List className={classes.list}>
              {chats.map((chat, index) => (
                <div key={index}>
                  <ListItem
                    alignItems="flex-start"
                    onClick={() => this.handleChatClick(index)}
                    selected={selectedChatIndex === index}
                  >
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={url[index]} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        name[index]
                          ? name[index]
                          : chat.users.filter(user => user !== userEmail)[0]
                      }
                      secondary={
                        <Typography color="textPrimary" component="span">
                          {chat.messages.length === 0
                            ? "..."
                            : chat.messages[
                                chat.messages.length - 1
                              ].message.substring(0, 30) + " ..."}
                        </Typography>
                      }
                    />

                    <ListItemText
                      primary={
                        <Typography
                          color="textPrimary"
                          align="right"
                          variant="body2"
                        >
                          {chat.messages.length === 0
                            ? ""
                            : new Date(
                                chat.messages[chat.messages.length - 1].time
                              ).toLocaleTimeString()}
                        </Typography>
                      }
                      secondary={
                        <Fragment>
                          {!chat.recieverHasRead &&
                          chat.messages.length !== 0 &&
                          chat.messages[chat.messages.length - 1].sender !==
                            userEmail ? (
                            <IconButton
                              color="primary"
                              size="small"
                              className={classes.messageIcon}
                            >
                              <MarkunreadIcon />
                            </IconButton>
                          ) : null}
                        </Fragment>
                      }
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Paper>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(ChatList);
