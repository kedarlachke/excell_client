import React from 'react'
import { BrowserRouter as Router, Route, Link,Switch} from "react-router-dom";
import Signin from './Signin';
import Signup from './Signup';
import SubClass1 from './SubClass1';
import BaseFormState from './BaseFormState'
import RequireAuthentication from './RequireAuthentication';
import RedirectSignIn from './RedirectSignIn';
import DashboardHomePage from '../../exceladminsrc/Components/DashBoard/DashboardHomePage';


import CustomerHomePage from '../../exceladminsrc/Components/DashBoard/DashboardHomePage';

import Profile_Add from '../../exceladminsrc/Components/Profile/Profile_Add'
import Contact_main from '../../exceladminsrc/Components/Contact/Contact_main'
import Contact_add from '../../exceladminsrc/Components/Contact/Contact_Add'
import Customers_Main from '../../exceladminsrc/Components/Customer/Customers_main'
import Customer_Add from '../../exceladminsrc/Components/Customer/Customer_Add'

import Settings_Main from '../../exceladminsrc/Components/SettingTab/settingTab'
import Services_Add from '../../exceladminsrc/Components/SettingTab/Services_Add'
import RateCard_Add from '../../exceladminsrc/Components/SettingTab/RateCard_Add'


import Task_Main from '../../exceladminsrc/Components/Mask/Tabs/Tabs'
import Task_Add from '../../exceladminsrc/Components/Mask/Task_Add'
//import Invoice_Add from '../../exceladminsrc/Components/Invoice/AddInvoice'
import Leads_Main from '../../exceladminsrc/Components/Leads/Leads_main'
import Lead_Add from '../../exceladminsrc/Components/Leads/Lead_Add'
import Lead_Edit from '../../exceladminsrc/Components/Leads/Lead_Edit'
import Case_main from '../../exceladminsrc/Components/Cases/Case_main'
import Case_Type from '../../exceladminsrc/Components/Cases/Casetabs'
import Case_View from '../../exceladminsrc/Components/Cases/Casetabs_View'
import CaseInvoice from '../../exceladminsrc/Components/Cases/CaseAddInvoice'

import ViewPDF from '../../exceladminsrc/Components/commonfunctions/viewPDF'


import Billing from '../../exceladminsrc/Components/Billing/Billing'
import User_main from '../../exceladminsrc/Components/User/User_main'
import User_add from '../../exceladminsrc/Components/User/User_add'
import User_edit from '../../exceladminsrc/Components/User/User_edit'

import AddInvoice from '../../exceladminsrc/Components/Invoice/AddInvoice'



import Progressreport_main from '../../exceladminsrc/Components/ProgressReport/progressreport_main'
import Progressreport_add from  '../../exceladminsrc/Components/ProgressReport/progressreport_add'

import ExcelDocUpload from '../../exceladminsrc/Components/ExcelDocUpload/excelDocUpload' 


import Customer_Main from '../../exceladminsrc/Components/CustomerLogin/customerMain'
import CustomerDashBoard from '../../exceladminsrc/Components/CustomerLogin/customerDashboard'

     
// renderDashBoard(pMode)
// {
//   if(pMode=="CUSTOMER")
//   {
//      return <div>
// <Route path='/dashboard' component={RequireAuthentication(CustomerHomePage)}/>
// </div>
//   }
//   else
//   {
//     return <div>
//     <Route path='/dashboard' component={RequireAuthentication(DashboardHomePage)}/>
//     </div>
//   }
// }
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
const Main = () =>
{
const  pMode=true
 console.log('main '); 

 console.log('menu visible ');
 console.log('');

 console.log('menu visible end ');




return (
  <main style={{height:1000 }}>
  
  


    <Switch >
      
      {/* <Route exact path='/' component={Signin}/> */}
      <Route exact path='/' component={RequireAuthentication(DashboardHomePage)}/>

      <Route path='/signin' component={Signin}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/dashboard' component={RequireAuthentication(DashboardHomePage)}/> 
           
      {/* <Route path='/dashboard' component={SubClass1}/> */}
      <Route path="/Profile" component={Profile_Add} />
                           


                            <Route path="/leads" component={RequireAuthentication(Leads_Main)} />
                             <Route path="/addlead" component={RequireAuthentication(Lead_Add)} />
                            <Route path="/editlead" component={RequireAuthentication(Lead_Edit)} />

                            <Route path="/customers" component={RequireAuthentication(Customers_Main)} />
                             <Route path="/addcustomer" component={RequireAuthentication(Customer_Add)} />
                            
                            <Route path="/contacts" component={RequireAuthentication(Contact_main)} />
                            <Route path="/addcontact" component={RequireAuthentication(Contact_add)} />

                            <Route path="/tasks" component={RequireAuthentication(Task_Main)} />
                            <Route path="/addtask" component={RequireAuthentication(Task_Add)} />

                            <Route path="/cases" component={RequireAuthentication(Case_main)} />
                            <Route path="/casetype" component={RequireAuthentication(Case_Type)} />
                            <Route path="/viewcase"  component={RequireAuthentication(Case_View)} />



                            <Route path="/billing" component={RequireAuthentication(Billing)} />
                            <Route path="/addinvoice" component={RequireAuthentication(AddInvoice)} />
                            <Route path="/addcaseinvoice" component={RequireAuthentication(CaseInvoice)} />
                            


                            <Route path="/settings" component={RequireAuthentication(Settings_Main)} />
                            <Route path="/addservice" component={RequireAuthentication(Services_Add)} />
                            <Route path="/addratecard" component={RequireAuthentication(RateCard_Add)} />

                          
                            <Route path="/invoices" component={RequireAuthentication(AddInvoice)} />
                            <Route  path="/users" component={RequireAuthentication(User_main)} />
                            <Route path="/adduser" component={RequireAuthentication(User_add)} />
                            <Route path="/edituser" component={RequireAuthentication(User_edit)} />
                            <Route path="/fileupload" component={RequireAuthentication(ExcelDocUpload)} />
                      
                            <Route path="/viewpdf" component={RequireAuthentication(ViewPDF)} />
                            

                            <Route path="/customersignin" component={Customer_Main} />

                            <Route path="/customerdashboard" component={CustomerDashBoard} />

                           

                            {/* <Route path="/addprogressreport" component={RequireAuthentication(Progressreport_add)} />
                            <Route path="/progressreports" component={RequireAuthentication(Progressreport_main)} /> */}
      
    </Switch>

  </main>
        
)
}

export default Main
