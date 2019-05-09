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
            This service is not associated with Epic Games and is developed
            without their granted permisson
          </p>
        </div>
        <div>
          <p className="footer-text credit">
            Devloped by magnusrambech & thomasrognes
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
