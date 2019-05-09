import React, { Component } from "react";
class Loading extends Component {
  state = {};
  render() {
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
  }
}

export default Loading;
