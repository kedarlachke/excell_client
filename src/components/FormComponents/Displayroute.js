import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Signin from './Signin'
import Signup from './Signup'
//import Dashboard from './Dashboard'
import RequireAuthentication from './RequireAuthentication';
import RedirectSignIn from './RedirectSignIn';
import Profile_Add from '../../exceladminsrc/Components/Profile/Profile_Add'
import ContactRoutes from '../../exceladminsrc/Components/Contact/ContactRoutes'
import Customer_main from '../../exceladminsrc/Components/Customer/CustomerRoutes'
import SettingTab from '../../exceladminsrc/Components/SettingTab/settingTab'
import Task_Main from '../../exceladminsrc/Components/Task/TaskRoutes'
import Invoice_Add from '../../exceladminsrc/Components/Invoice/AddInvoice'
import Leads_Main from '../../exceladminsrc/Components/Leads/LeadRoutes'
import Case_main from '../../exceladminsrc/Components/Cases/CaseRoutes'
import Billing from '../../exceladminsrc/Components/Billing/Billing'
import User_main from '../../exceladminsrc/Components/User/UserRoutes'
import DashboardHomePage from '../../exceladminsrc/Components/DashBoard/DashboardHomePage'

const Displayroute = () => 
{
    console.log('Displayroute'); 
return (
  <main>
    <Switch>
      <Route exact path='/' component={Signup}/>
      <Route path='/signin' component={Signin}/>
      <Route path='/signup' component={Signup}/>
       <Route path="/Profile" component={Profile_Add} />
                            <Route path="/Customer_main" component={Customer_main} />
                            <Route path="/dashboard" component={DashboardHomePage} />
                            <Route path="/Leads_Main" component={Leads_Main} />
                            <Route path="/Contact_main" component={ContactRoutes} />
                            <Route path="/Setting" component={SettingTab} />
                            <Route path="/Task_main" component={Task_Main} />
                            <Route path="/Invoice" component={Invoice_Add} />
                            <Route path="/Case_main" component={Case_main} />
                            <Route path="/Billing" component={Billing} />
                            <Route exact path="/User_main" component={User_main} />
      
    </Switch>
  </main>
)
}
export default Displayroute
