import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import "./profile-small.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Loading from "../loading/loading";
import Timer from "../store/timer/timer";
import PlatformButton from "./platformButton/platformButton";
import CompareUsers from "./compareusers/compareusers";

class Profile extends Component {
  state = {
    stats: {},
    calculatedStats: {
      kdr: 0.0,
      wlr: 0.0
    },
    username: "",
    user_id: "",
    loading: false,
    profileFetched: false,
    updateTimerSeconds: 120,
    currentDevice: "",
    devices: []
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.getStats();
    this.setState({ currentDevice: this.setInitalCurrentDevice() });
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
        this.setState({
          profileFetched: true,
          devices: this.getDevices(),
          currentDevice: this.setInitalCurrentDevice()
        });
      }
    }
  };

  getDevices = () => {
    let devices = this.state.stats.devices;
    let newDevices = [];
    for (let device in devices) {
      newDevices.push(devices[device]);
    }
    return newDevices;
  };

  setInitalCurrentDevice = () => {
    let firstDevice = this.getDevices()[0];
    let devices = this.state.stats.data;
    for (let device in devices) {
      if (device === firstDevice) {
        return devices[device];
      }
    }
  };
  setCurrentDevice = newDevice => {
    let devices = this.state.stats.data;
    for (let device in devices) {
      if (device === newDevice) {
        this.setState({ currentDevice: devices[device] });
      }
    }
  };

  calculateKDR = (kills, matchesplayed, wins) => {
    let kdr = kills / (matchesplayed - wins);
    return kdr.toFixed(2);
  };
  calculateWLR = (matchesplayed, wins) => {
    let wlr = (wins / matchesplayed) * 100;
    return wlr.toFixed(1) + "%";
  };

  render() {
    let overallData = this.state.stats.overallData;
    let currentDevice = this.state.currentDevice;
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
          <div className="content content-profile-wrapper">
            <div className="content-profile">
              <div className="top">
                <h1 className="username">{this.state.username}</h1>
                <div className="line-red" />
                <Timer
                  text={"Updating in "}
                  seconds={this.state.updateTimerSeconds}
                />
                <div className="statbox overall-box">
                  <div className="card">
                    <h1 className="overall category">Overall Stats</h1>
                    <div className="line-small-red overall-line" />
                    <div className="stat-container">
                      <span className="label">
                        Kills
                        <p className="stat">{overallData.defaultModes.kills}</p>
                      </span>
                      <span className="label">
                        K/D
                        <p className="stat">
                          {this.calculateKDR(
                            overallData.defaultModes.kills,
                            overallData.defaultModes.matchesplayed,
                            overallData.defaultModes.placetop1
                          )}
                        </p>
                      </span>

                      <span className="label">
                        Wins
                        <p className="stat">
                          {overallData.defaultModes.placetop1}
                        </p>
                      </span>
                      <span className="label">
                        Win %
                        <p className="stat">
                          {this.calculateWLR(
                            overallData.defaultModes.matchesplayed,
                            overallData.defaultModes.placetop1
                          )}
                        </p>
                      </span>

                      <span className="label">
                        Matches
                        <p className="stat">
                          {overallData.defaultModes.matchesplayed}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sides-container">
                <div className="leftSide">
                  <h1 className="category">Modes</h1>
                  <div className="line-red" />
                  <div className="statbox platform-box">
                    <div className="platform-selector">
                      {this.state.devices.map(device => (
                        <PlatformButton
                          key={device}
                          platform={device}
                          handleClick={() => this.setCurrentDevice(device)}
                        />
                      ))}
                    </div>
                    {currentDevice.defaultsolo && (
                      <React.Fragment>
                        <div className="card">
                          <h1 className="stat">Solo</h1>
                          <div className="line-small-red" />
                          <div className="stat-container">
                            <h1 className="label">
                              Kills
                              <p className="stat">
                                {currentDevice.defaultsolo.default.kills}
                              </p>
                            </h1>
                            <span className="label">
                              K/D
                              <p className="stat">
                                {this.calculateKDR(
                                  currentDevice.defaultsolo.default.kills,
                                  currentDevice.defaultsolo.default
                                    .matchesplayed,
                                  currentDevice.defaultsolo.default.placetop1
                                )}
                              </p>
                            </span>

                            <span className="label">
                              Wins
                              <p className="stat">
                                {currentDevice.defaultsolo.default.placetop1}
                              </p>
                            </span>
                            <span className="label">
                              Win %
                              <p className="stat">
                                {this.calculateWLR(
                                  currentDevice.defaultsolo.default
                                    .matchesplayed,
                                  currentDevice.defaultsolo.default.placetop1
                                )}
                              </p>
                            </span>

                            <span className="label">
                              Matches
                              <p className="stat">
                                {
                                  currentDevice.defaultsolo.default
                                    .matchesplayed
                                }
                              </p>
                            </span>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {this.state.currentDevice.defaultduo && (
                      <React.Fragment>
                        <div className="card">
                          <h1 className="stat">Duo</h1>
                          <div className="line-small-red" />
                          <div className="stat-container">
                            <h1 className="label">
                              Kills
                              <p className="stat">
                                {currentDevice.defaultduo.default.kills}
                              </p>
                            </h1>
                            <span className="label">
                              K/D
                              <p className="stat">
                                {this.calculateKDR(
                                  currentDevice.defaultduo.default.kills,
                                  currentDevice.defaultduo.default
                                    .matchesplayed,
                                  currentDevice.defaultduo.default.placetop1
                                )}
                              </p>
                            </span>

                            <span className="label">
                              Wins
                              <p className="stat">
                                {currentDevice.defaultduo.default.placetop1}
                              </p>
                            </span>
                            <span className="label">
                              Win %
                              <p className="stat">
                                {this.calculateWLR(
                                  currentDevice.defaultduo.default
                                    .matchesplayed,
                                  currentDevice.defaultduo.default.placetop1
                                )}
                              </p>
                            </span>

                            <span className="label">
                              Matches
                              <p className="stat">
                                {currentDevice.defaultduo.default.matchesplayed}
                              </p>
                            </span>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                    {currentDevice.defaultsquad && (
                      <React.Fragment>
                        <div className="card">
                          <h1 className="stat">Squad</h1>
                          <div className="line-small-red" />
                          <div className="stat-container">
                            <h1 className="label">
                              Kills
                              <p className="stat">
                                {currentDevice.defaultsquad.default.kills}
                              </p>
                            </h1>
                            <span className="label">
                              K/D
                              <p className="stat">
                                {this.calculateKDR(
                                  currentDevice.defaultsquad.default.kills,
                                  currentDevice.defaultsquad.default
                                    .matchesplayed,
                                  currentDevice.defaultsquad.default.placetop1
                                )}
                              </p>
                            </span>

                            <span className="label">
                              Wins
                              <p className="stat">
                                {currentDevice.defaultsquad.default.placetop1}
                              </p>
                            </span>
                            <span className="label">
                              Win %
                              <p className="stat">
                                {this.calculateWLR(
                                  currentDevice.defaultsquad.default
                                    .matchesplayed,
                                  currentDevice.defaultsquad.default.placetop1
                                )}
                              </p>
                            </span>

                            <span className="label">
                              Matches
                              <p className="stat">
                                {
                                  currentDevice.defaultsquad.default
                                    .matchesplayed
                                }
                              </p>
                            </span>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
                <div className="rightSide">
                  <CompareUsers currentUser={this.state.stats} />
                </div>
              </div>
              <Link style={{ margin: 0, paddingBottom: 10 + "px" }} to="/">
                back
              </Link>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      );
    }
    return (
      <div className="content">
        <h1>{this.state.username}</h1>
        <Link style={{ margin: 0, paddingBottom: 10 + "px" }} to="/">
          back
        </Link>
        <Footer />
      </div>
    );
  }
}

export default Profile;
