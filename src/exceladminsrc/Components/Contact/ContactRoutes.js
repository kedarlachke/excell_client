import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Contact_main from './Contact_main'
import Contact_Add from './Contact_Add'
const Routes = () => (
  <Router history='' >
    <div>
      <Route exact path="/Dashboard/Contact_main" component={Contact_main} />
      <Route path="/Dashboard/Contact_main/Contact_Add" component={Contact_Add} /> 
     
    </div>
  </Router>
);



export default Routes;