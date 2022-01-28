import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Customer_main from './Customer_main'
import Customer_Add from './customerTabs'
const Routes = () => (
  <Router history='' >
    <div>
      <Route exact path="/customers" component={Customer_main} />
      <Route path="/addcustomer" component={Customer_Add} /> 
    </div>
  </Router>
);



export default Routes;