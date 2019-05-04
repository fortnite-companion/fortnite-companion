/**
 *
 *
 * PLAYGROUND CODE FOR TEST, NO LONGER BEING USED
 *
 *
 */

import React, { Component } from "react";
import "./App.css";
import Footer from "./components/footer/footer";
import { Redirect } from "react-router";
class App extends Component {
  state = {
    stats: [],
    username: "",
    user_id: "",
    loading: false,
    profileFetched: false
  };

  componentDidMount() {}

  getUserId = async () => {
    this.setState({ loading: true, profileFetched: false });
    let url =
      "https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=" +
      this.state.username;

    let response = await fetch(url).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });

    if (response.ok) {
      const data = await response.text();
      let json = JSON.parse(data);
      this.setState({ user_id: json.uid });
      this.getStats();
    }
  };
  getUserIdNew = async () => {
    let url =
      "https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=" +
      this.state.username;

    let response = await fetch(url).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });

    if (response.ok) {
      const data = await response.text();
      let json = JSON.parse(data);
      let uid = json.uid;
      let username = this.state.username;
      if (uid != null) {
        this.props.history.push("profile/" + username + "/" + uid);
      }
    }
  };
  getStats = async () => {
    let url =
      "https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=" +
      this.state.user_id;
    let response = await fetch(url).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });

    if (response) {
      const data = await response.text();
      let json = JSON.parse(data);
      this.setState({ stats: json });
      this.setState({ loading: false });
      if (json.epicName != null) {
        this.setState({ profileFetched: true });
      }
    }
  };

  handleChangeUsername = event => {
    this.setState({ username: event.target.value });
  };
  handleSubmit = event => {
    if (this.state.username.length > 0) {
      this.getUserId();
    }
  };
  handleSubmitNew = event => {
    if (this.state.username.length > 0) {
      this.getUserIdNew();
    }
  };

  render() {
    let content = (
      <React.Fragment>
        <h1 className="title-main">Fortnite Companion</h1>
        <div className="line" />
        <input
          required={true}
          type="text"
          placeholder="Enter your Epic account"
          onChange={this.handleChangeUsername}
        />
        <button onClick={this.handleSubmit}>Track</button>
        <button onClick={this.handleSubmitNew}>track new</button>
        <Footer />
      </React.Fragment>
    );

    if (this.state.loading) {
      return (
        <div className="content">
          <div className="loading">
            <div className="obj" />
            <div className="obj" />
            <div className="obj" />
            <div className="obj" />
            <div className="obj" />
            <div className="obj" />
            <div className="obj" />
            <div className="obj" />
            <div className="obj" />
          </div>
        </div>
      );
    } else if (this.state.profileFetched) {
      return (
        <div className="content">
          <h1 className="title">
            Overall data for
            <span className="username"> {this.state.username}</span>
          </h1>
          <div className="line" />
          <div className="card">
            <div className="stat-container">
              <span className="label">
                Kills
                <p className="stat">
                  {this.state.stats.overallData.defaultModes.kills}
                </p>
              </span>

              <span className="label">
                Wins
                <p className="stat">
                  {this.state.stats.overallData.defaultModes.placetop1}
                </p>
              </span>

              <span className="label">
                Matches
                <p className="stat">
                  {this.state.stats.overallData.defaultModes.matchesplayed}
                </p>
              </span>
            </div>
          </div>
          <a href="/">back</a>
        </div>
      );
    } else {
      return <div className="content">{content}</div>;
    }
  }
}

export default App;
