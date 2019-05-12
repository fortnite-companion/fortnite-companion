import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import "./profile-small.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Loading from "../loading/loading";
import Timer from "../store/timer/timer";
import PlatformButton from "./platformButton/platformButton";
class Profile extends Component {
  state = {
    stats: {},
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
    /* setInterval(this.getStats, this.state.updateTimerSeconds * 1000); */
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
          <div className="content content-profile-wrapper">
            <div className="content-profile">
              <h1 className="username"> {this.state.username}</h1>
              <Timer
                text={"Updating in "}
                seconds={this.state.updateTimerSeconds}
              />
              <div className="statbox overall-box">
                <div className="card">
                  <h1 className="category">Overall</h1>
                  <div className="line-small-red" />
                  <div className="stat-container">
                    <h1 className="label">
                      Kills
                      <p className="stat">
                        {this.state.stats.overallData.defaultModes.kills}
                      </p>
                    </h1>

                    <span className="label">
                      Wins
                      <p className="stat">
                        {this.state.stats.overallData.defaultModes.placetop1}
                      </p>
                    </span>

                    <span className="label">
                      Matches
                      <p className="stat">
                        {
                          this.state.stats.overallData.defaultModes
                            .matchesplayed
                        }
                      </p>
                    </span>
                  </div>
                </div>
              </div>
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
                {this.state.currentDevice.defaultsolo && (
                  <React.Fragment>
                    <div className="card">
                      <h1 className="category">Solo</h1>
                      <div className="line-small-red" />
                      <div className="stat-container">
                        <h1 className="label">
                          Kills
                          <p className="stat">
                            {this.state.currentDevice.defaultsolo.default.kills}
                          </p>
                        </h1>

                        <span className="label">
                          Wins
                          <p className="stat">
                            {
                              this.state.currentDevice.defaultsolo.default
                                .placetop1
                            }
                          </p>
                        </span>

                        <span className="label">
                          Matches
                          <p className="stat">
                            {
                              this.state.currentDevice.defaultsolo.default
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
                      <h1 className="category">Duo</h1>
                      <div className="line-small-red" />
                      <div className="stat-container">
                        <h1 className="label">
                          Kills
                          <p className="stat">
                            {this.state.currentDevice.defaultduo.default.kills}
                          </p>
                        </h1>

                        <span className="label">
                          Wins
                          <p className="stat">
                            {
                              this.state.currentDevice.defaultduo.default
                                .placetop1
                            }
                          </p>
                        </span>

                        <span className="label">
                          Matches
                          <p className="stat">
                            {
                              this.state.currentDevice.defaultduo.default
                                .matchesplayed
                            }
                          </p>
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                )}
                {this.state.currentDevice.defaultsquad && (
                  <React.Fragment>
                    <div className="card">
                      <h1 className="category">Squad</h1>
                      <div className="line-small-red" />
                      <div className="stat-container">
                        <h1 className="label">
                          Kills
                          <p className="stat">
                            {
                              this.state.currentDevice.defaultsquad.default
                                .kills
                            }
                          </p>
                        </h1>

                        <span className="label">
                          Wins
                          <p className="stat">
                            {
                              this.state.currentDevice.defaultsquad.default
                                .placetop1
                            }
                          </p>
                        </span>

                        <span className="label">
                          Matches
                          <p className="stat">
                            {
                              this.state.currentDevice.defaultsquad.default
                                .matchesplayed
                            }
                          </p>
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                )}
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
