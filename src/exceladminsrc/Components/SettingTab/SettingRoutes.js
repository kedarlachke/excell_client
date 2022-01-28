import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Setting from './settingTab'
import Service_Add from './Services_Add'
import RateCard_Add from './RateCard_Add'
const Routes = () => (
  <Router history='' >
    <div>
      <Route exact path="/Dashboard/Setting" component={Setting} />
      <Route path="/Dashboard/Setting/Service_Add" component={Service_Add} /> 
      <Route path="/Dashboard/Setting/RateCard_Add" component={RateCard_Add} /> 
     
    </div>
  </Router>
);



export default Routes;