import React, { Component } from "react";
import Loading from "../../loading/loading";
import "./itemcard.css";
import "./itemcard-small.css";
class ItemCard extends Component {
  state = {};

  componentDidMount() {}
  render() {
    if (this.state.item != null) {
      return <Loading />;
    }
    return (
      <div className="item-card">
        <img
          className="store-image"
          src={this.props.item.item.images.background}
        />
        <h1 className="item-name item">{this.props.item.item.name}</h1>
        {/*  <p className="item-desc item">{this.props.item.item.description}</p> */}
        <p className="item-price item">
          {this.props.item.cost}

          <img className="vbucks-item-card" src={this.props.vbucks} />
        </p>
      </div>
    );
  }
}

export default ItemCard;
