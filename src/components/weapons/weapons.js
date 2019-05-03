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


      let weaponImages = [];
      for (let i = 0; i < json.weapons.length; i++) {
        const element = json.weapons[i].images.image;
        weaponImages.push(element);
      }
      console.log(weaponImages);

      this.setState({ weapons: json });

      let weapons = json["weapons"];
      for (let wep in weapons) {
        console.log(weapons[wep]);
      }
>>>>>>> c7b7f4c56f8b04e2005bb3144276a7c47c5fe175:src/components/weapons/weapons.js
    }
  };

  render() {
    return <h1>hei</h1>;
  }
}

export default Weapons;
