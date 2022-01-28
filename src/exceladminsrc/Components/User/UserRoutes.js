import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import User_main from './User_main'
import User_add from './User_add'
import User_Edit from './User_Edit'
const Routes = () => (
  <Router history='' >
    <div>
      <Route exact path="/users" component={User_main} />
      <Route path="/adduser" component={User_add} /> 
      <Route path="/edituser" component={User_Edit} /> 
    </div>
  </Router>
);

export default Routes;