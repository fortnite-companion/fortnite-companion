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
    this.setState({ seconds: this.secondsUntilMidnight() });
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
  secondsUntilMidnight = () => {
    var midnight = new Date();
    midnight.setHours(24);
    midnight.setMinutes(0);
    midnight.setSeconds(0);
    midnight.setMilliseconds(0);
    return (midnight.getTime() - new Date().getTime()) / 1000;
  };
  render() {
    if (this.state.time.h != null) {
      return (
        <span className="timer">
          New deals in
          {" " +
            this.state.time.h +
            ":" +
            this.state.time.m +
            ":" +
            this.state.time.s}
        </span>
      );
    }
    return <span className="timer">Getting time..</span>;
  }
}

export default Timer;
