import React, { Component } from "react";
import "./profile.css";
class Profile extends Component {
  state = { params: "" };

  componentDidMount() {
    let params = this.props.match.params;
    this.setState({ params: params });
  }
  render() {
    return (
      <div className="content">
        <h1>{this.state.params.username}</h1>
        <a href="/">back</a>
      </div>
    );
  }
}

export default Profile;
