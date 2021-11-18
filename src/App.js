import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/Search";
import Users from "./components/users/Users";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  // Search Github Users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log("dfakjsdvkjsdfkjbkj", res.data.items);
    this.setState({ users: res.data.items, loading: false });
  };

  // Clear Github Users
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Set alerts
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Routes></Routes>
            <Search
              searchUsers={this.searchUsers}
              clearUsers={this.clearUsers}
              showClear={users.length > 0 ? true : false}
              setAlert={this.setAlert}
            />
            <Users loading={loading} users={users} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
