import React from "react";
import ReactDom from "react-dom";
import App from "./App";
const firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyA3IXsbt28d6yZD4kOtZ_ug4Cb389FsZtU",
  authDomain: "friendlychat-dd774.firebaseapp.com",
  databaseURL: "https://friendlychat-dd774.firebaseio.com",
  projectId: "friendlychat-dd774",
  storageBucket: "friendlychat-dd774.appspot.com",
  messagingSenderId: "372956814120",
  appId: "1:372firebaseConfig683e02db0e1d"
};

firebase.initializeApp(firebaseConfig);


ReactDom.render(<App />, document.getElementById("root"));
