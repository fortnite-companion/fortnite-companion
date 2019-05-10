import React, { Component } from "react";
import "./timer.css";
class Timer extends Component {
  state = { seconds: 0, time: {} };
  componentDidMount() {
    this.startTimer();
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }
  startTimer = () => {
    this.setState({ seconds: this.props.seconds });
    this.tick();
  };

  tick = () => {
    setInterval(this.countdown, 1000);
  };
  countdown = () => {
    let secondsDecremented = this.state.seconds - 1;
    this.setState({
      seconds: secondsDecremented,
      time: this.secondsToTime(secondsDecremented)
    });
  };

  render() {
    if (this.state.time.h != null) {
      if (this.state.time.h === 0) {
        return (
          <span className="timer">
            {this.props.text}
            {" " + this.state.time.m + "m " + this.state.time.s + "s"}
          </span>
        );
      }
      return (
        <span className="timer">
          {this.props.text}
          {" " +
            this.state.time.h +
            "h " +
            this.state.time.m +
            "m " +
            this.state.time.s +
            "s"}
        </span>
      );
    }
    return <span className="timer">Getting time..</span>;
  }
}

export default Timer;
