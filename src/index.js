import React from "react";
import ReactDom from "react-dom";
import App from "./App";
const firebase = require("firebase");

var firebaseConfig = {
 //XXXXXXXXXXX //
};

firebase.initializeApp(firebaseConfig);


ReactDom.render(<App />, document.getElementById("root"));
