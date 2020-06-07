import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/Home";
import DashBoard from "./ChatContainer/DashBoard/DashBoard";
import Profile from "./ChatContainer/Profile/Profile";
import SearchBar from "./ChatContainer/Header/Search/SearchBar";
const routing = (
  <Router>
    <Route exact path="/" component={Home} />
    <Route exact path="/dashboard" component={DashBoard} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/search" component={SearchBar} />
  </Router>
);

class App extends Component {
  render() {
    return <div>{routing}</div>;
  }
}
export default App;
