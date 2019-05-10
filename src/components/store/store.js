import React, { Component } from "react";
import Header from "../header/header";
import Loading from "../loading/loading";
import { tsNumberKeyword } from "@babel/types";
import ItemCard from "./itemcard/itemcard";

import "./store.css";
class Store extends Component {
  state = {
    isLoading: true,
    store: "",
    itemsArray: [],
    featuredItems: [],
    isVisible: "hidden"
  };

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
        this.setState({ isLoading: false, isVisible: "visible" });
      }
    }
  };

  createItemArray = () => {
    let items = this.state.store.items;
    let newItemsArray = [];
    let newFeaturedItems = [];
    for (let item in items) {
      if (items[item].featured === 1) {
        newFeaturedItems.push(items[item]);
      } else {
        newItemsArray.push(items[item]);
      }
    }
    this.setState({
      itemsArray: newItemsArray,
      featuredItems: newFeaturedItems
    });
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
        <div className="content content-store-wrapper">
          <div className={"content-store " + this.state.isVisible}>
            <div className="store-box featured-box">
              <div className="store-category">
                <h1 className="title title-store">Featured</h1>
                <div className="line line-store" />
              </div>

              {this.state.featuredItems.map(item => (
                <ItemCard
                  vbucks={this.state.store.vbucks}
                  key={item.itemid}
                  item={item}
                />
              ))}
            </div>

            <div className="store-box daily-box">
              <div className="store-category">
                <h1 className="title title-store">Daily Store</h1>
                <div className="line line-store" />
              </div>
              {this.state.itemsArray.map(item => (
                <ItemCard
                  vbucks={this.state.store.vbucks}
                  key={item.itemid}
                  item={item}
                />
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Store;
