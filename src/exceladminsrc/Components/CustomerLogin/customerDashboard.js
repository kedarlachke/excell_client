import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Profile_Add from '../Profile/Profile_Add'
import CustomerCase_main from './customerCaseMain'
import CustomerCasetabs from './customerCasetabs'
import Billing from '../Billing/Billing'
import { execGql } from '../apolloClient/apolloClient';
import { clientDetails } from '../Queries/queries';


  

import { connect } from 'react-redux';
import {ActionToDispatch,ActionToRedirect,checkCurrentUsername,handleSignoutUsername} from '../../../actions'

import CustCaseView from './custCaseTabView'

 class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state={
            // email: "sohanpatil44@gmail.com",
            // lang: "EN",
            // client: "1002",
            // username: "exuser",
            CLIENTID: '',
            formErrors:[],
            formErrorMessage:'' 
        };

        
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.handleProcessLogout = this.handleProcessLogout.bind(this);
    }


    componentWillMount() 
    {
        var result='',errorMessage='',errors=[];
        checkCurrentUsername((err,result) =>
        {
                if(!err){
                if(!result)
                {
                    this.props.ActionToDispatch({ type: 'UNAUTH_USER' ,payload : [''] });
                   
                }
                else
                {
                   this.props.ActionToDispatch({ type: 'AUTH_USER' ,payload : result});
                }   
                 }
            }
       
       
        );
  }
 

    async  componentDidMount() {
        await this.populateData()
    }


    changeTabColor(id) {
        var tabs = document.getElementsByClassName('item')
        for (var i = 0; i < tabs.length; ++i) {
            var item = tabs[i];
            item.style.backgroundColor = (item.id == id) ? "rgb(214, 198, 179)" : "#C4B19B";
        }
    }

    // To Set Client id on the basis of Customer emailid 
    async populateData() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log(this.setPopulateDataParams());
            result = await execGql('query', clientDetails, this.setPopulateDataParams())
        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            console.log(errors);
            console.log(errorMessage);

        }
        else {
            console.log(result);

            console.log('***result**');
            console.log(result);

            

            if (result.data.clientDetails.length != 0) {
                await this.setState({
                    CLIENTID: result.data.clientDetails[0].CLNTID,
                    // EMAILID: result.data.clientDetails[0].EMAILID
                });
            }
        }

    }

    setPopulateDataParams() {
        // var Client_Id = ''
        // if (this.props.CLIENTID || this.props.data) Client_Id = clntid


        //console.log('***setPopulateDataParams**');
        //console.log(this.props.authuser);

        var parameters = {
            "CLNT": '1002',
            "LANG": this.props.authuser.lang,
            "EMAILID": this.props.authuser.email,
            "CLNTID": ''
        }
        return parameters

    };


  
async handleProcessLogout() 
{
     
     handleSignoutUsername(async (err,result) =>
{
     if(!err){
     if(!result)
    { 

        console.log('ww1');
        this.props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : err });
        console.log('ww2');
        this.props.ActionToRedirect('/customersignin');
    }
    else{
              
        checkCurrentUsername((err,result)=>
        { 
            console.log('ww3');
           if(!result)
            {
                console.log('ww4');
                this.props.ActionToDispatch({ type: 'UNAUTH_USER' ,payload : [''] });
                this.props.ActionToRedirect('/customersignin');
            } 
            else
            {
                console.log('ww5');
                this.props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : err });
             
            }
        }
    );

    }


}

  }  );

}



    onLogoutClick(event) 
    {

        console.log('onLogoutClick')
         try{ this.handleProcessLogout();   }
         catch(err)  {  this.state.formErrorMessage=err;} 
         event.preventDefault();
          }

    render() {

        console.log('customer dashboard');
        console.log(this.props);
        console.log('customer dashboard end');
        return (
            <Router>
                <div>
                    <div className="ui fixed borderless menu" style={{ backgroundColor: "#C4B19B" }}>
                        <div className="ui container grid">
                            <div className=" row">
                                <Link to={'/'}> <div style={{ marginLeft: 0, color: 'white' }} className="cust_dashboard_navLinks item"> EXCELL INVESTIGATION</div></Link >
                                <Link to='#' ><div className="item" style={{ color: 'white' }}> CUSTOMER CONTROL PANEL</div></Link >
                                <div className="right menu">
                                    {/* <Link to='#' > <div className="item" style={{ color: 'white' }}>  Hi,{this.state.username}</div></Link > */}
                                    <Link to='/customerdashboard/Customer_Case'>  <div className=" item" id="tab1" onClick={() => this.changeTabColor("tab1")} style={{ color: 'white', borderRight: "1px solid #e2e2e2", borderLeft: "1px solid #e2e2e2" }}> CASES </div></Link>
                                    {/* <Link to='#'>  <div className=" item" id="tab2" onClick={() => this.changeTabColor("tab2")} style={{ color: 'white', borderRight: "1px solid #e2e2e2" }}> BILLING </div></Link> */}
                                    <Link to='/customerdashboard/Profile'>  <div className=" item" id="tab3" onClick={() => this.changeTabColor("tab3")} style={{ color: 'white', borderRight: "1px solid #e2e2e2" }}> PROFILE </div></Link>

                                    <Link to="#"><div className=" item" style={{ color: 'white' }} onClick={this.onLogoutClick}>SIGN OUT</div> </Link>
                                </div>
                            </div>
                            <div className="tablet mobile only row">
                            </div>
                        </div>
                    </div>
                    <div className="row" id="custDashboardFooter">
                        <center>  Excelinvestigations.com © 2018 - All Rights Reserved.  </center>
                    </div>
                    <div>
                        <Route exact path="/customerdashboard" component={(props) => <CustomerCase_main {...props} email={this.props.authuser.email} CLIENTID={this.state.CLIENTID} />} />
                        <Route path="/customerdashboard/Profile" component={(props) => <Profile_Add {...props} Userid={this.props.authuser.username}/>} />
                        <Route path="/customerdashboard/Customer_Case" component={(props) => <CustomerCase_main {...props}  email={this.props.authuser.email} CLIENTID={this.state.CLIENTID} />} />
                        <Route path="/customerdashboard/CustomerCasetabs" component={CustomerCasetabs} />
                        <Route path="/customerdashboard/Billing" component={Billing} />
                        <Route path="/customercaseview" component={CustCaseView} />

                    </div>
                </div>
            </Router>
        );
    }

}






const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated,
      authprocess: state.auth.authprocess,
      authuser: state.auth.authuser,
    };
  };
  
  export default connect(
    mapStateToProps,
    { ActionToDispatch,ActionToRedirect
     }
  )(DashBoard);
  
  