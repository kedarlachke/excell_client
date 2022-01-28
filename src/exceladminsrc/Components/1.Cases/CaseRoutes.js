import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Case_main from './Case_main'
import Case_Type from './Casetabs'
const Routes = () => (
  <Router history='' >
    <div>
      <Route exact path="/cases" component={Case_main} />
      <Route path="/casetype" component={Case_Type} />
    </div>
  </Router>
);



export default Routes;