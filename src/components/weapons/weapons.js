import React, { Component } from "react";
import "./weapons.css";
import Header from "../header/header";

class Weapons extends Component {
  state = {
    weapons: "",
    weaponTest: []
  };

  componentDidMount() {
    this.getWeapons();
  }

  getWeapons = async () => {
    let url =
      "https://fortnite-public-api.theapinetwork.com/prod09/weapons/get";

    let response = await fetch(url).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });

    if (response.ok) {
      const data = await response.text();
      let json = JSON.parse(data);
      this.setState({ weapons: json });

      let activeWeapons = [];
      let weapons = json["weapons"];
      for (let wep in weapons) {
        activeWeapons.push(weapons[wep]);
      }
      console.log(activeWeapons);
      this.setState({ weaponTest: activeWeapons });
    }
  };

  render() {
    return (
      <div className="content">
        <ul>
          {this.state.weaponTest.map(wep => (
            <div>
              <p>{wep.name}</p>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default Weapons;
