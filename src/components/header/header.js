import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import "./header-small.css";
class Header extends Component {
  state = {};
  render() {
    return (
      <div className="header">
        <div>
          <Link to="/" className="link-text">
            Home
          </Link>
        </div>
        <div>
          <Link to="/store" className="link-text">
            Daily Store
          </Link>
        </div>
        <div className="locked">
          <Link to="/weapons" className="link-text locked">
            Weapons (Coming Soon!)
          </Link>
        </div>
        <div className="locked">
          <Link to="/challenges" className="link-text locked">
            Challenges (Coming Soon!)
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;
