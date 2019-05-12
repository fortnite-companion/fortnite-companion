import React, { Component } from "react";
import "./platformButton.css";
class PlatformButton extends Component {
  state = { convertedDevice: "Unknown" };

  componentDidMount() {
    this.setDevice();
  }
  setDevice = () => {
    let device = this.props.platform;

    if (device === "keyboardmouse") {
      this.setState({ convertedDevice: "PC" });
    } else if (device === "touch") {
      this.setState({ convertedDevice: "Mobile" });
    } else if (device === "gamepad") {
      this.setState({ convertedDevice: "Console" });
    } else {
      this.setState({ convertedDevice: "Unkown" });
    }
  };
  render() {
    return (
      <div>
        <h3 className={" device"} onClick={this.props.handleClick}>
          {this.state.convertedDevice}
        </h3>
      </div>
    );
  }
}

export default PlatformButton;
