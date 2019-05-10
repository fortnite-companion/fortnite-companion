import React, { Component } from "react";
import Footer from "../footer/footer";
import "./frontpage.css";
import "./frontpage-small.css";
import Header from "../header/header";
class Frontpage extends Component {
  state = { username: "", recentlyTracked: [] };

  componentDidMount() {
    this.loadRecent();
  }

  handleSubmit = event => {
    if (this.state.username.length != "") {
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
        this.addToRecent(username);
        this.props.history.push("profile/" + username + "/" + uid);
      }
    }
  };
  handleChangeUsername = event => {
    this.setState({ username: event.target.value });
  };
  handleKeypress = event => {
    if (event.key == "Enter") {
      this.handleSubmit();
    }
  };
  handleClickRecent = async event => {
    let newName = event.currentTarget.dataset.id;
    await this.setState({ username: newName });
    this.handleSubmit();
  };
  addToRecent = username => {
    let recent = this.state.recentlyTracked;
    if (!recent.includes(username)) {
      if (recent.length >= 5) {
        recent.shift();
      }
      recent.push(username);
      localStorage.setItem("recentlyTracked", JSON.stringify(recent));
    }
  };
  clearRecent = () => {
    let recent = [];
    localStorage.setItem("recentlyTracked", JSON.stringify(recent));
    this.setState({ recentlyTracked: recent });
  };
  loadRecent = () => {
    let recent = localStorage.getItem("recentlyTracked");
    if (recent != null) {
      this.setState({ recentlyTracked: JSON.parse(recent) });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="content">
          <div className="content-frontpage">
            <h1 className="title-main">Fortnite Companion</h1>
            <div className="line" />
            <input
              required={true}
              type="text"
              placeholder="Enter your Epic account"
              onChange={this.handleChangeUsername}
              onKeyDown={this.handleKeypress}
            />
            <div className="recent-container">
              {this.state.recentlyTracked.map(username => (
                <span
                  className="recent"
                  onClick={this.handleClickRecent}
                  data-id={username}
                >
                  {username + ",\t"}
                </span>
              ))}
            </div>
            <button onClick={this.handleSubmit}>Track</button>
            <Footer />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Frontpage;
