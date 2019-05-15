import React, { Component } from "react";
import "./compareusers.css";
import "./compareusers-small.css";
import Loading from "../../loading/loading";
import { PieChart, Pie, Sector, Cell } from "recharts";
import TinyLoading from "../../tiny-loading/tinyloading";

class CompareUsers extends Component {
  state = {
    loading: false,
    compareToUserName: "",
    currentUserStats: {},
    COLORS: ["#ffeaa7", "#ecf0f1"],
    RADIAN: Math.PI / 180,
    data: {}
  };

  componentDidMount() {
    if (this.props.compareToUserData) {
      this.setState({ currentUserStats: this.props.currentUser });
    }
    this.setState({ currentUserStats: this.props.currentUser });
  }

  getUserId = async () => {
    let url =
      "https://fortnite-public-api.theapinetwork.com/prod09/users/id?username=" +
      this.state.compareToUserName;

    let response = await fetch(url).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });

    if (response.ok) {
      const data = await response.text();
      let json = JSON.parse(data);
      let uid = json.uid;
      if (uid != null) {
        this.getStats(uid);
      }
    }
  };

  getStats = async uid => {
    this.setState({ loading: true });
    let url =
      "https://fortnite-public-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=" +
      uid;
    let response = await fetch(url).then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    });

    if (response) {
      const data = await response.text();
      let json = JSON.parse(data);

      this.setState({ compareToUserStats: json });
      this.setChartData();
      this.setState({ loading: false });
    }
  };

  handleUsernameChange = event => {
    this.setState({ compareToUserName: event.target.value });
  };
  handleKeypress = event => {
    if (event.key == "Enter") {
      this.handleSubmit();
    }
  };
  handleSubmit = () => {
    this.getUserId();
  };

  setChartData = () => {
    let currentuserData = this.state.currentUserStats;
    let compareToUserData = this.state.compareToUserStats;
    let newData = {
      kills: [
        {
          name: compareToUserData.epicName,
          value: compareToUserData.overallData.defaultModes.kills
        },
        {
          name: currentuserData.epicName,
          value: currentuserData.overallData.defaultModes.kills
        }
      ],
      wins: [
        {
          name: compareToUserData.epicName,
          value: compareToUserData.overallData.defaultModes.placetop1
        },
        {
          name: currentuserData.epicName,
          value: currentuserData.overallData.defaultModes.placetop1
        }
      ]
    };

    this.setState({ data: newData });
  };

  renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * this.state.RADIAN);
    const y = cy + radius * Math.sin(-midAngle * this.state.RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  calculateKDR = (kills, matchesplayed, wins) => {
    let kdr = kills / (matchesplayed - wins);
    return kdr.toFixed(2);
  };
  calculateWLR = (matchesplayed, wins) => {
    let wlr = (wins / matchesplayed) * 100;
    console.log(matchesplayed, wins);
    return wlr.toFixed(1) + "%";
  };
  render() {
    let currentuserData = this.state.currentUserStats;
    let compareToUserData = this.state.compareToUserStats;
    if (this.state.loading) {
      return (
        <div className="compare-box">
          <h1 className="category">Compare</h1>
          <div className="line-red" />
          <TinyLoading />
        </div>
      );
    } else if (this.state.data.kills) {
      return (
        <div className="compare-box">
          <h1 className="category">Compare</h1>
          <div className="line-red" />
          {currentuserData && (
            <div className="chart-box">
              <div className="username-vs-username">
                <h3 className="currentuser inline">
                  {currentuserData.epicName}
                </h3>
                <h3 className=" vs inline"> vs </h3>
                <h3 className="comparetouser inline">
                  {compareToUserData.epicName}
                </h3>
              </div>
              <div className="charts-container">
                <div className="charts-wrapper">
                  <div className="chart">
                    <h3 className="label">Kills</h3>
                    <PieChart width={200} height={200}>
                      <Pie
                        data={this.state.data.kills}
                        cx={100}
                        cy={100}
                        labelLine={false}
                        label={this.renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {this.state.data.kills.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              this.state.COLORS[
                                index % this.state.COLORS.length
                              ]
                            }
                          />
                        ))}
                      </Pie>
                    </PieChart>
                    <div className="username-vs-username">
                      <h3 className="currentuser inline">
                        {
                          this.state.currentUserStats.overallData.defaultModes
                            .kills
                        }
                      </h3>
                      <h3 className="inline vs"> vs </h3>
                      <h3 className="comparetouser inline">
                        {
                          this.state.compareToUserStats.overallData.defaultModes
                            .kills
                        }
                      </h3>
                    </div>
                  </div>
                  <div className="chart">
                    <h3 className="label">Wins</h3>
                    <PieChart width={200} height={200}>
                      <Pie
                        data={this.state.data.wins}
                        cx={100}
                        cy={100}
                        labelLine={false}
                        label={this.renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {this.state.data.wins.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              this.state.COLORS[
                                index % this.state.COLORS.length
                              ]
                            }
                          />
                        ))}
                      </Pie>
                    </PieChart>
                    <div className="username-vs-username">
                      <h3 className="currentuser inline">
                        {
                          this.state.currentUserStats.overallData.defaultModes
                            .placetop1
                        }
                      </h3>
                      <h3 className="inline vs"> vs </h3>
                      <h3 className="comparetouser inline">
                        {
                          this.state.compareToUserStats.overallData.defaultModes
                            .placetop1
                        }
                      </h3>
                    </div>
                  </div>
                </div>
                <div class="line-red" />

                <div className="charts-data">
                  <div>
                    <h3 className="label">K/D</h3>
                    <div>
                      <h3 className="currentuser inline">
                        {this.calculateKDR(
                          currentuserData.overallData.defaultModes.kills,
                          currentuserData.overallData.defaultModes
                            .matchesplayed,
                          currentuserData.overallData.defaultModes.placetop1
                        )}
                      </h3>
                      <h3 className=" vs inline"> vs </h3>
                      <h3 className="comparetouser inline">
                        {this.calculateKDR(
                          compareToUserData.overallData.defaultModes.kills,
                          compareToUserData.overallData.defaultModes
                            .matchesplayed,
                          compareToUserData.overallData.defaultModes.placetop1
                        )}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <h3 className="label">Win %</h3>
                    <div>
                      <h3 className="currentuser inline">
                        {this.calculateWLR(
                          currentuserData.overallData.defaultModes
                            .matchesplayed,
                          currentuserData.overallData.defaultModes.placetop1
                        )}
                      </h3>
                      <h3 className=" vs inline"> vs </h3>
                      <h3 className="comparetouser inline">
                        {this.calculateWLR(
                          compareToUserData.overallData.defaultModes
                            .matchesplayed,
                          compareToUserData.overallData.defaultModes.placetop1
                        )}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <h3 className="label">Matches</h3>
                    <div>
                      <h3 className="currentuser inline">
                        {currentuserData.overallData.defaultModes.matchesplayed}
                      </h3>
                      <h3 className=" vs inline"> vs </h3>
                      <h3 className="comparetouser inline">
                        {
                          compareToUserData.overallData.defaultModes
                            .matchesplayed
                        }
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="compare-box">
        <h1 className="category">Compare</h1>
        <div className="line-red" />
        <div>
          <h3 className="compareTo">
            Compare {currentuserData.epicName} to:
            <input
              className="compare-input"
              placeholder="Epic username"
              onChange={this.handleUsernameChange}
              onKeyDown={this.handleKeypress}
            />
          </h3>
        </div>
      </div>
    );
  }
}

export default CompareUsers;
