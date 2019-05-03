import React, { Component } from "react";

class Status extends Component {
  state = {
    serverStatus: []
  };

  componentDidMount() {
    this.getServerStatus();
  }

  getServerStatus = async () => {
    let url =
      "https://fortnite-public-api.theapinetwork.com/prod09/status/fortnite_server_status";

    let response = await fetch(url).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });

    if (response.ok) {
      const data = await response.text();
      let json = JSON.parse(data);
      this.setState({ serverStatus: json });
    }
  };

  render() {
    if (this.state.serverStatus.status === "UP") {
      return (
        <div className="serverContent">
          <p className="serverText">
            <span className="serverUp" />
            {this.state.serverStatus.message}
          </p>
        </div>
      );
    } else if (this.state.serverStatus.status === "DOWN") {
      return (
        <div className="serverContent">
          <p className="serverText">
            <span className="serverDown" /> {this.state.serverStatus.message}
          </p>
        </div>
      );
    } else {
      return <p>Fething Status..</p>;
    }
  }
}

export default Status;
