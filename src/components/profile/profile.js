import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import "./profile-small.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Loading from "../loading/loading";
import Timer from "../store/timer/timer";
class Profile extends Component {
  state = {
    stats: [],
    username: "",
    user_id: "",
    loading: false,
    profileFetched: false,
    updateTimerSeconds: 120
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.getStats();
    setInterval(this.getStats, this.state.updateTimerSeconds * 1000);
  }
  componentWillUnmount() {}

  fetchparams = async => {
    let params = this.props.match.params;
    let uname = params.username;
    let uid = params.userid;
    this.setState({ username: uname, user_id: uid });
  };
  getStats = async () => {
    this.setState({ loading: true });
    await this.fetchparams();
    let url =
      "https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=" +
      this.state.user_id;
    let response = await fetch(url).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });

    if (response) {
      const data = await response.text();
      let json = JSON.parse(data);
      this.setState({ stats: json });
      this.setState({ loading: false });
      if (json.epicName != null) {
        this.setState({ profileFetched: true });
      }
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <React.Fragment>
          <Header />
          <Loading />
          <Footer />
        </React.Fragment>
      );
    } else if (this.state.profileFetched) {
      return (
        <React.Fragment>
          <Header />
          <div className="content">
            <div className="content-profile">
              <h1 className="title">
                Overall data for
                <span className="username"> {this.state.username}</span>
              </h1>
              <div className="line" />
              <div className="card">
                <div className="stat-container">
                  <span className="label">
                    Kills
                    <p className="stat">
                      {this.state.stats.overallData.defaultModes.kills}
                    </p>
                  </span>

                  <span className="label">
                    Wins
                    <p className="stat">
                      {this.state.stats.overallData.defaultModes.placetop1}
                    </p>
                  </span>

                  <span className="label">
                    Matches
                    <p className="stat">
                      {this.state.stats.overallData.defaultModes.matchesplayed}
                    </p>
                  </span>
                </div>
              </div>
              <Link to="/">back</Link>
              <Timer
                text={"Updating in "}
                seconds={this.state.updateTimerSeconds}
              />
            </div>
          </div>
          <Footer />
        </React.Fragment>
      );
    }
    return (
      <div className="content">
        <h1>{this.state.username}</h1>
        <Link to="/">back</Link>
        <Footer />
      </div>
    );
  }
}

export default Profile;
