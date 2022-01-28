import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Case_main from './Case_main'
import Case_Type from './Casetabs'
import Invoice from './CaseAddInvoice'
import ViewPDF from '../commonfunctions/viewPDF'
import Task_Form from '../Task/Task_Add'
const Routes = () => (
  <Router history='' >
    <div>
      <Route exact path="/Dashboard/Case_main" component={Case_main} />
      <Route path="/Dashboard/Case_main/Case_Type" component={Case_Type} />
      <Route path="/Dashboard/AddCaseInvoice" component={Invoice} />
      <Route path="/Dashboard/ViewPDF" component={ViewPDF} />
      <Route path="/addtask" component={Task_Form} />
     
    </div>
  </Router>
);



export default Routes;