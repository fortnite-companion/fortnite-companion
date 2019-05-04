import React, { Component } from "react";
import Footer from "../footer/footer";
import "./frontpage.css";
class Frontpage extends Component {
  state = {};

  handleSubmit = event => {
    if (this.state.username.length > 0) {
      this.getUserId();
    }
  };

  getUserId = async () => {
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
  handleChangeUsername = event => {
    this.setState({ username: event.target.value });
  };

  render() {
    return (
      <div className="content">
        <h1 className="title-main">Fortnite Companion</h1>
        <div className="line" />
        <input
          required={true}
          type="text"
          placeholder="Enter your Epic account"
          onChange={this.handleChangeUsername}
        />
        <button onClick={this.handleSubmit}>Track</button>
        <Footer />
      </div>
    );
  }
}

export default Frontpage;
