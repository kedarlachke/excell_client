import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Progressreport_main from './progressreport_main'
import Progressreport_add from './progressreport_add'
const Routes = (props) => (
  <Router history='' >
    <div>
      <Route exact to={{ pathname: "/Dashboard/Case_main/Case_Type" }} component={Progressreport_main} gotoCaseType={props.gotoCaseType}/>
      <Route path="/Dashboard/add_progress" component={Progressreport_add} />
    </div>
  </Router>
);



export default Routes;