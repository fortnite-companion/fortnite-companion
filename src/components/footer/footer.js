import React, { Component } from "react";
import Status from "../status/status";
import "./footer.css";
class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="footer">
        <div>
          <Status />
        </div>
        <div>
          <p className="disclaimer footer-text">
            This is service is not associated with Epic Games and is developed
            without permisson
          </p>
        </div>
        <div>
          <p className="footer-text">
            Created by magnusrambech & thomasrognes @github
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
