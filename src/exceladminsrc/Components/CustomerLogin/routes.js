import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CustomerMain from './customerMain'
import CustomerDashboard from './customerDashboard'
const Routes = () => (
  <Router history='' >
    <div>
      <Route exact path="/" component={CustomerMain} />
      <Route path="/customerdashboard" component={CustomerDashboard} />
    </div>
  </Router>
);

export default Routes;