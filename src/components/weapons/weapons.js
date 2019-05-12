import React, { Component } from "react";
import "./weapons.css";
import WeaponCard from "./weaponcard/weaponcard";
import Header from "../header/header";
import Loading from "../loading/loading";

class Weapons extends Component {
  state = {
    weapons: "",
    weaponToShow: [],
    isLoading: true
  };

  componentDidMount() {
    this.getWeapons();
  }

  getWeapons = async () => {
    let url =
      "https://fortnite-public-api.theapinetwork.com/prod09/weapons/get";

    let response = await fetch(url).catch(function(response) {
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
      this.setState({ weaponToShow: activeWeapons });

      if (json != null) {
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <React.Fragment>
          <Header />
          <Loading />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Header />
        <div className="content content-weapons-wrapper">
          <div className="content-weapons">
            <div className="weapon-box">
              <h1 className="title title-weapon">Weapons</h1>
              <div className="line line-weapon" />
              <div className="weapons">
                {this.state.weaponToShow.map(wep => (
                  <WeaponCard
                    weaponName={wep.name}
                    weaponImage={wep.images.image}
                    rarity={wep.rarity}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Weapons;
