import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Leads_Main from './Leads_main'
import Leads_Form from './Lead_Add'
import Leads_Tabs from '../Tabs/tabs'
import Task_Add from '../Task/Task_Add'
const Routes = () => (
  <Router history='' >
    <div>
      <Route exact path="/leads" component={Leads_Main} />
      <Route path="/leads/Leads_Form" component={Leads_Form} /> 
      <Route path="/leads/tabs" component={Leads_Tabs} />
      <Route path="/tasks/Task_Form" component={Task_Add} />
    </div>
  </Router>
);



export default Routes;