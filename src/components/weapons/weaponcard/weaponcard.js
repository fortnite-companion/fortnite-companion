import React, { Component } from "react";
import "./weaponscard.css";

class WeaponCard extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props.weapon);
  }

  render() {
    return (
      <div className={this.props.rarity + " weapon-card"}>
        <h1 className="weapon-name">{this.props.weaponName}</h1>
        <img className="weapon-image" src={this.props.weaponImage} />
      </div>
    );
  }
}

export default WeaponCard;
