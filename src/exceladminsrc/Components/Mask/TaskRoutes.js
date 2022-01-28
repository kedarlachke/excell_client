import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Task_main from './Tabs/Tabs'
import Task_Form from './Task_Add'
import Leads_main from '../Leads/Leads_main'
const Routes = () => (
  <Router history='' >
    <div>
      <Route exact path="/tasks" component={Task_main} />
      <Route  path="/tasks1" component={Task_main} />
      <Route path="/tasks/Task_Form" component={Task_Form} />
      <Route path="/leads" component={Leads_main} />
    </div>
  </Router>
);

export default Routes; 