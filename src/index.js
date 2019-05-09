import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Weapon from "./components/weapons/weapons";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Frontpage from "./components/frontpage/frontpage";
import Profile from "./components/profile/profile";
import { BrowserRouter, HashRouter, Route } from "react-router-dom";
import Store from "./components/store/store";

const routing = (
  <HashRouter>
    <div style={{ width: 100 + "%", height: 100 + "%" }}>
      <Route exact path="/" component={Frontpage} />
      <Route path="/weapons" component={Weapon} />
      <Route path="/profile/:username/:userid" component={Profile} />
      <Route path="/store" component={Store} />
    </div>
  </HashRouter>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
