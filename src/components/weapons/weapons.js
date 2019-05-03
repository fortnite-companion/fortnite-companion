import React, { Component } from "react";

class Weapons extends Component {
  state = {
    weapons: ""
  };

  componentDidMount() {
    this.getServerStatus();
  }

  getServerStatus = async () => {
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

      let weapons = json["weapons"];
      for (let wep in weapons) {
        console.log(weapons[wep]);
      }
    }
  };

  render() {
    return <h1> Weapons </h1>;
  }
}

export default Weapons;
