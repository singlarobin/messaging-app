import React, { Fragment, useState, useEffect } from "react";
import {
  withStyles,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
  Avatar
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styles from "./SearchBarStyle";

const firebase = require("firebase");

function SearchBar(props) {
  const [userEmail, setUserEmail] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const { classes } = props;

  useEffect(props => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        props.history.push("/");
        console.log("user logged out");
      } else {
        setUserEmail(user.email);
      }
    });
  }, []);

  const handleBack = () => {
    console.log("back");
    props.history.push("/dashboard");
  };
  const handleSubmit = () => {
    firebase
      .firestore()
      .collection("users")
      .where("Name", "==", searchValue.toLowerCase())
      .get()
      .then(querySnapshot => {
        // const data = querySnapshot.docs.filter(doc => {
        //   return doc.data().Email !== email ? doc.data() : null;
        // });
        //console.log(data);
        const docObj = querySnapshot.docs.filter(
          doc => doc.data().Email !== userEmail
        );
        const data = docObj.map(doc => doc.data());
        setResult(data);
      })
      .catch(error => {
        console.log(error);
        setError("Error Occured!");
      });
  };

  const handleChange = e => {
    e.keyCode === 13 ? handleSubmit() : setSearchValue(e.target.value);
  };
  const handleAddFriend = (e, friendEmail) => {
    const emails = [userEmail, friendEmail];
    const docKey = emails.sort().join(":");
    firebase
      .firestore()
      .collection("chat")
      .doc(docKey)
      .get()
      .then(doc => {
        if (doc.exists) {
          //console.log("doc:", doc.data());
          props.history.push({
            pathname: "/dashboard",
            selectedChatKey: docKey
          });
        } else {
          firebase
            .firestore()
            .collection("chat")
            .doc(docKey)
            .set({
              id: docKey,
              messages: [],
              recieverHasRead: false,
              users: [userEmail, friendEmail]
            })
            .then(() => {
              props.history.push({
                pathname: "/dashboard",
                selectedChatKey: docKey
              });
            })
            .catch(() => {
              setError("Error Occuered!");
            });
        }
      })
      .catch(() => {
        setError("Error Occurred!");
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          autoFocus
          fullWidth
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          onKeyUp={e => {
            handleChange(e);
          }}
        />
      </div>
      <div>
        <IconButton className={classes.backIcon} onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
      </div>

      <div className={classes.noResult}>
        {result.length === 0 ? (
          <div>
            {error ? (
              <Typography variant="h4" align="center">
                {error}
              </Typography>
            ) : (
              <Typography variant="h4" align="center">
                No Result Found
              </Typography>
            )}
          </div>
        ) : (
          <List className={classes.listRoot}>
            {result.map((data, index) => (
              <div key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp">
                      {data.Name.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={data.Name}
                    secondary={
                      <Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {data.Description}
                        </Typography>
                      </Fragment>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="add-friend"
                      onClick={e => handleAddFriend(e, data.Email)}
                    >
                      <ChatIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        )}
      </div>
    </div>
  );
}
export default withStyles(styles)(SearchBar);
