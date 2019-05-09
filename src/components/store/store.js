import React, { Component } from "react";
import Header from "../header/header";
import Loading from "../loading/loading";
import { tsNumberKeyword } from "@babel/types";
import ItemCard from "./itemcard/itemcard";
import "./store.css";
class Store extends Component {
  state = { isLoading: true, store: "", itemsArray: [] };

  componentDidMount() {
    this.getCurrentStore();
  }
  getCurrentStore = async () => {
    let url =
      "https://fortnite-public-api.theapinetwork.com/prod09/store/get?language=en";
    let response = await fetch(url).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });
    if (response) {
      const data = await response.text();
      let json = JSON.parse(data);
      this.setState({ store: json });
      this.setState({ loading: false });
      if (json != null) {
        this.createItemArray();
        this.setState({ isLoading: false });
      }
    }
  };

  createItemArray = () => {
    let items = this.state.store.items;
    let newItemsArray = [];
    for (let item in items) {
      newItemsArray.push(items[item]);
    }
    this.setState({ itemsArray: newItemsArray });
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
        <div className="content content-store">
          <h1 className="title title-store">Daily Store</h1>
          <div className="line line-store" />
          <div className="daily-box">
            {this.state.itemsArray.map(item => (
              <ItemCard
                vbucks={this.state.store.vbucks}
                key={item.itemid}
                item={item}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Store;
