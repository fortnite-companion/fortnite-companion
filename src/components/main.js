import React from "react";
import { Switch, Route } from "react-router-dom";

import ResultPage from "./landingpage";

const Main = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/results" component={ResultPage} />
  </Switch>
);

export default Main;
