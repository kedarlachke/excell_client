import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { PopulateStateAndCountryDDLQuery, UsersCRUDOpsQuery, UserDetailsQuery } from '../Queries/queries';


import { execGql as execGqlAuth } from '../../../gqlclientconfig';
import  createUsername  from '../../../mutations/createUsername';
import  updateUsername  from '../../../mutations/updateUsername';

var errorval = false
export default class User_Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Firstname: '',
      Lasttname: '',
      Gender: '',
      Email: '',
      Phoneno1: '',
      Phoneno2: '',
      UserID: '',
      Password: '',
      RetypePassword: '',
      Address: '',
      City: '',
      State: '',
      Country: '',
      Zip: '',
      errorFirstname: '',
      errorLasttname:'',
      errorGender: '',
      errorEmail: '',
      errorPhoneno1: '',
      errorPhoneno2: '',
      errorUserID: '',
      errorPassword: '',
      errorRetypePassword: '',
      errorAddress:'',
      errorCity:'',
      errorZipcode:'',
      stateDDL: [],
      countryDDL: [],
      Dispalydrp: true,
      Dispalycomp: true,
      tcode: 'createUser',
    }
  };


  componentDidMount() {
    this.DropdownUsers()
    if (this.props.userID) {
      this.setState({ Dispalydrp: !this.state.Dispalydrp, Dispalycomp: !this.state.Dispalycomp })
      this.populateData()
    }
  }

 /*-----------------------populates DDL  --------------------*/
  async DropdownUsers() {
    var result = '', errorMessage = '', errors = [];
    try {
      result = await execGql('query', PopulateStateAndCountryDDLQuery, this.setDropdownParams())
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
      this.setState({ countryDDL: result.data.COUNTRIES, stateDDL: result.data.STATES })
    }
  };

   /*-----------------------set PopulateStateAndCountryDDLQuery variable  --------------------*/
  setDropdownParams() {
    var parameters = {
      "CLNT": "1002",
      "LANG": "EN"
    }
    return parameters
  };

   /*-----------------------populates data on form load  --------------------*/
  async populateData() {
    var result = '', errorMessage = '', errors = [];
    try {
      result = await execGql('query', UserDetailsQuery, this.setpopulateDataParams())
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
      this.setState({
        Firstname: result.data.userDetails[0].FNAME,
        Lasttname: result.data.userDetails[0].LNAME,
        Gender: result.data.userDetails[0].USEX,
        Email: result.data.userDetails[0].UMAIL,
        Phoneno1: result.data.userDetails[0].CELLNO,
        Phoneno2: result.data.userDetails[0].PHNO,
        UserID: result.data.userDetails[0].USRID,
        Address: result.data.userDetails[0].ADDR,
        City: result.data.userDetails[0].CITY,
        State: result.data.userDetails[0].STATECD,
        Country: result.data.userDetails[0].COUNTRY,
        Zip: result.data.userDetails[0].PINC,
        tcode: 'updateUser',
        Dispalycomp: !this.state.Dispalycomp
      })
    }
  };

   /*-----------------------set UserDetailsQuery variable  --------------------*/
  setpopulateDataParams() {
    var parameters = {
      "CLNT": "1002",
      "LANG": "EN",
      "USRID": this.props.userID
    }
    return parameters
  };

  /*-----------------------UsersCRUDOps create and update  --------------------*/
  async UsersCRUDOps(variables) {
    




    


var authuser={
  client: variables.users[0].CLNT,
  lang: variables.users[0].LANG,
  applicationid: "15001500",
  username: variables.users[0].USRID,
  password: variables.users[0].PWDRD,
  email: variables.users[0].UMAIL,
  mobile: variables.users[0].PHNO
}


console.log('mongo call');
    console.log(authuser);
    console.log('mongo call end');
    var result = '',result2 = '', errorMessage = '', errors = [];



    try {
      console.log(1)
if(variables.transaction=='CREATE'){result = await execGqlAuth('mutation', createUsername, authuser)}
if(variables.transaction=='UPDATE'){result = await execGqlAuth('mutation', updateUsername, authuser)}

    }
    catch (err) {
      console.log(err);
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
    }


    if (!result) {
      console.log('Auth error mongo');
      console.log(errors);
      console.log(errorMessage);
      errorval = true
      errorMessage = JSON.parse(errorMessage);
    }


else{
console.log('auth user result')
console.log(result)

    try {
      result2 = await execGql('mutation', UsersCRUDOpsQuery, variables)
      console.log('Create user result')
      
 console.log(result2)
    }
    catch (err) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      //error
      console.log(err)

    }
    if (!result2) {
      console.log(errors);
      console.log(errorMessage);
      errorval = true
      errorMessage = JSON.parse(errorMessage);
      for (let key in errorMessage) {

        this.setState({
          errorFirstname: errorMessage[key].errorFNAME,
          errorLasttname: errorMessage[key].errorLNAME,
          errorGender: errorMessage[key].errorUSEX,
           errorEmail: errorMessage[key].errorUMAIL,
           errorPhoneno1: errorMessage[key].errorCELLNO,
           errorPhoneno2: errorMessage[key].errorPHNO,
          errorUserID: errorMessage[key].errorUSRID,
           errorPassword: errorMessage[key].errorPWDRD,
          errorRetypePassword: errorMessage[key].errorRPPWDRD,
          errorAddress: errorMessage[key].errorADDR,
          errorCity: errorMessage[key].errorCITY,
          errorZipcode: errorMessage[key].errorPINC,
          errorGender:errorMessage[key].errorUSEX
        });
      }
    }
    else {
      console
      console.log(result2);
      this.navigateToUserList()
    }

  }



  };

/*-----------------------set create UsersCRUDOpsQuery variables--------------------*/
  setCreateParams() {
    var parameters = {
      "transaction": "CREATE",
      "users": [{
        "CLNT": "1002",
        "LANG": "EN",
        "FNAME": this.state.Firstname,
        "LNAME": this.state.Lasttname,
        "USEX": this.state.Gender,
        "UMAIL": this.state.Email,
        "CELLNO": this.state.Phoneno1,
        "PHNO": this.state.Phoneno2,
        "USRID": this.state.UserID,
        "PWDRD": this.state.Password,
        "RPPWDRD": this.state.RetypePassword,
        "ADDR": this.state.Address,
        "CITY": this.state.City,
        "STATECD": this.state.State,
        "COUNTRY": this.state.Country,
        "PINC": this.state.Zip,
        "USRNM":this.state.Firstname+this.state.Lasttname
      }]
    }
    return parameters
  };
 
/*-----------------------set update UsersCRUDOpsQuery variables--------------------*/
  setUpdateParams() {
    var parameters = {
      "transaction": "UPDATE",
      "users": [{
        "CLNT": "1002",
        "LANG": "EN",
        "FNAME": this.state.Firstname,
        "LNAME": this.state.Lasttname,
        "USEX": this.state.Gender,
        "UMAIL": this.state.Email,
        "CELLNO": this.state.Phoneno1,
        "PHNO": this.state.Phoneno2,
        "USRID": this.state.UserID,
        "PWDRD": this.state.Password,
        "RPPWDRD": this.state.RetypePassword,
        "ADDR": this.state.Address,
        "CITY": this.state.City,
        "STATECD": this.state.State,
        "COUNTRY": this.state.Country,
        "PINC": this.state.Zip,
        "USRNM":this.state.Firstname+this.state.Lasttname
      }]
    }
    return parameters
  };
   validateEmail=(emailField)=>{
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) == false) 
    {
        //alert('Invalid Email Address');
        return false;
    }

    return true;

}
validateNumber=(num)=>{
  var reg = /^\d+$/;

  if (reg.test(num) == false) 
  {
      //alert('Invalid Number');
      return false;
  }

  return true;

}
  validationDetails=()=>{
    
    let errorMessage={}
    if(this.state.UserID===''){
      errorMessage.errorUserID='User id required'
    }
    //alert(!this.state.UserID=='' && this.state.UserID.length>20)
    if(!this.state.UserID=='' && this.state.UserID.length>20 ){
      errorMessage.errorUserID='User Id must be less than 20 characters'
    }
    if(!this.state.UserID=='' && this.state.UserID.length<6){
      errorMessage.errorUserID='User Id must be more than 5 characters'
    }
    //-----------------------password-------------------------------------
    if(this.state.Password===''){
      errorMessage.errorPassword='Password required'
    }
   
    if(!this.state.Password=='' && this.state.Password.length>20 ){
      errorMessage.errorPassword='Password must be less than 20 characters'
    }
    if(!this.state.Password=='' && this.state.Password.length<6){
      errorMessage.errorPassword='Password must be more than 5 characters'
    }
    //-----------------------Retypepassword-------------------------------------
    if(this.state.RetypePassword===''){
      errorMessage.errorRetypePassword='Retype Password required'
    }
   
    if(!this.state.RetypePassword=='' && this.state.RetypePassword.length>20 ){
      errorMessage.errorRetypePassword='Retype Password must be less than 20 characters'
    }
    if(!this.state.RetypePassword=='' && this.state.RetypePassword.length<6){
      errorMessage.errorRetypePassword='Retype Password must be more than 5 characters'
    }

    if(!errorMessage.errorRetypePassword && !errorMessage.errorPassword){
      if(this.state.Password!=this.state.RetypePassword){
      errorMessage.errorRetypePassword=' Password and Retype Password must be same'
      errorMessage.errorPassword=' Password and Retype Password must be same'
    }
    }
    //-----------------------First Name-------------------------------------
    if(this.state.Firstname===''){
      errorMessage.errorFirstname='First Name required'
    }
   
    if(!this.state.Firstname=='' && this.state.Firstname.length>20 ){
      errorMessage.errorFirstname='First Name must be less than 20 characters'
    }

     //-----------------------Phone No-------------------------------------
     if(!this.state.Phoneno1=='' && this.state.Phoneno1.length<=10){
      errorMessage.errorPhoneno1='Phone No should not be less than 10 character'
    }    
    if(!this.state.Phoneno1=='' && !this.validateNumber(this.state.Phoneno1)){
      errorMessage.errorPhoneno1='Only numbers allowed'
    }
    if(!this.state.Phoneno2=='' && this.state.Phoneno2.length<=10 ){
      errorMessage.errorPhoneno2='Phone No should not be less than 10 character'
    }
    //alert(this.validateNumber(this.state.Phoneno2))
    if(!this.state.Phoneno2=='' && !this.validateNumber(this.state.Phoneno2)){
      errorMessage.errorPhoneno2='Only numbers allowed'
    }
    
    if(!this.state.Email=='' && !this.validateEmail(this.state.Email)){
      errorMessage.errorEmail='Invalid Email Id'
    }

    this.setState({
       errorFirstname: errorMessage.errorFirstname,
      // errorLasttname: errorMessage[key].errorLNAME,
      // errorGender: errorMessage[key].errorUSEX,
        errorEmail: errorMessage.errorEmail,
        errorPhoneno1: errorMessage.errorPhoneno1,
        errorPhoneno2: errorMessage.errorPhoneno2,
      errorUserID: errorMessage.errorUserID,
        errorPassword: errorMessage.errorPassword,
       errorRetypePassword: errorMessage.errorRetypePassword,
      // errorAddress: errorMessage[key].errorADDR,
      // errorCity: errorMessage[key].errorCITY,
      // errorZipcode: errorMessage[key].errorPINC,
    });
    return Object.keys(errorMessage).length==0? true:false
  }
  /*-----------------------crud operations--------------------*/
  CRUD_operation() {
    //alert(this.validationDetails())
    if(this.validationDetails()){
    
    if (this.state.tcode == 'createUser') {
      this.UsersCRUDOps(this.setCreateParams())
    }
    else if (this.state.tcode == 'updateUser') {
      this.UsersCRUDOps(this.setUpdateParams())
    }}
  };

  /*-----------------------clear the form fields--------------------*/
  clearscreen() {
    this.setState({
      Firstname: '',
      Lasttname: '',
      Gender: '',
      Email: '',
      Phoneno1: '',
      Phoneno2: '',
      UserID: '',
      Password: '',
      RetypePassword: '',
      Address: '',
      City: '',
      State: '',
      Country: '',
      Zip: '',
      errorFirstname: '',
      errorLasttname:'',
      errorGender: '',
      errorEmail: '',
      errorPhoneno1: '',
      errorPhoneno2: '',
      errorUserID: '',
      errorPassword: '',
      errorRetypePassword: '',
      errorAddress:'',
      errorCity:'',
      errorZipcode:'',
      tcode: 'createUser',
    })
  }

  /*-----------------------navigate to user list--------------------*/
  navigateToUserList() {
    return this.props.history.push('/users')
  };

  render() {
    if (this.state.Dispalycomp) {
      return (
        <div>
          <div className="ui one column grid">
            <div className="three column row" >
              <div className="one wide computer one wide tablet one wide mobile column">
              </div>
              <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                <h1 style={{ display: this.state.Dispalydrp ? "flex" : "none", }} id="title_header" >USER-ADD NEW</h1>
              </div>
              <div className="one wide computer one wide tablet one wide mobile column">
              </div>
            </div>
            <div className="three column row">
              <div className="one wide computer one wide tablet one wide mobile column">
              </div>
              <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                <div className="ui segment">
                  <div className="ui form">
                    <div className="ui three column stackable grid">

                      <div className="row">
                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorFirstname ? 'brown' : null }}>First Name</label>
                            <div className="ui right icon input">
                              <i className="user icon"></i>
                              <input style={{ borderColor: this.state.errorFirstname ? 'brown' : null, backgroundColor: this.state.errorFirstname ? '#f3ece7' : null }}
                               type="text" name="firstname" placeholder="First Name" value={this.state.Firstname} onChange={e => this.setState({ Firstname: e.target.value })} />
                            </div>
                          </div>
                          <div className="field">
                             <span id="errorspan">{this.state.errorFirstname}</span> 
                          </div>
                        </div>

                        <div className=" five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorLasttname ? 'brown' : null }}>Last Name</label>
                            <div className="ui right icon input">
                              <i className="user icon"></i>
                              <input style={{ borderColor: this.state.errorLasttname ? 'brown' : null, backgroundColor: this.state.errorLasttname ? '#f3ece7' : null }} 
                              type="text" name="lastname" placeholder="Last Name" value={this.state.Lasttname} onChange={e => this.setState({ Lasttname: e.target.value })} />
                            </div>
                          </div>
                          <div className="field">
                             <span id="errorspan">{this.state.errorLasttname}</span> 
                          </div>
                        </div>

                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorGender ? 'brown' : null }}>Gender</label>
                            <select className="" value={this.state.Gender} onChange={e => this.setState({ Gender: e.target.value })}
                              style={{ borderColor: this.state.errorGender ? 'brown' : null, backgroundColor: this.state.errorGender ? '#f3ece7' : null }}>
                              <option value="">Select</option>
                              <option value="M">Male</option>
                              <option value="F">Female</option>
                            </select>
                          </div>
                          <div className="field">
                             <span id="errorspan">{this.state.errorGender}</span> 
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorEmail ? 'brown' : null }}>E-mail</label>
                            <div className="ui right icon input">
                              <i className="mail icon"></i>
                              <input style={{ borderColor: this.state.errorEmail ? 'brown' : null, backgroundColor: this.state.errorEmail ? '#f3ece7' : null }} 
                              type="text" name="email" placeholder="E-mail" value={this.state.Email} onChange={e => this.setState({ Email: e.target.value })} />
                            </div>
                          </div>
                          <div className="field">
                             <span id="errorspan">{this.state.errorEmail}</span> 
                          </div>
                        </div>

                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorPhoneno1 ? 'brown' : null }}>Phone(Mobile)</label>
                            <div className="ui right icon input">
                              <i className="mobile icon"></i>
                              <input style={{ borderColor: this.state.errorPhoneno1 ? 'brown' : null, backgroundColor: this.state.errorPhoneno1 ? '#f3ece7' : null }} 
                              type="text" name="phoneno" placeholder="Phone Number" value={this.state.Phoneno1} onChange={e => this.setState({ Phoneno1: e.target.value })} />
                            </div>
                          </div>
                          <div className="field">
                             <span id="errorspan">{this.state.errorPhoneno1}</span> 
                          </div>
                        </div>

                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorPhoneno2 ? 'brown' : null }}>Phone(Other)</label>
                            <div className="ui right icon input">
                              <i className="call icon"></i>
                              <input style={{ borderColor: this.state.errorPhoneno2 ? 'brown' : null, backgroundColor: this.state.errorPhoneno2 ? '#f3ece7' : null }} 
                              type="text" name="phoneno" placeholder="Phone Number" value={this.state.Phoneno2} onChange={e => this.setState({ Phoneno2: e.target.value })} />
                            </div>
                          </div>
                          <div className="field">
                             <span id="errorspan">{this.state.errorPhoneno2}</span> 
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorUserID ? 'brown' : null }}>User ID</label>
                            <input style={{ borderColor: this.state.errorUserID ? 'brown' : null, backgroundColor: this.state.errorUserID ? '#f3ece7' : null }}
                             type="text" name="userid" placeholder="User ID" value={this.state.UserID} onChange={e => this.setState({ UserID: e.target.value })} disabled={this.props.userID ? true : false} />
                          </div>
                          <div className="field">
                             <span id="errorspan">{this.state.errorUserID}</span> 
                          </div>
                        </div>

                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorPassword ? 'brown' : null }}>Password</label>
                            <input style={{ borderColor: this.state.errorPassword ? 'brown' : null, backgroundColor: this.state.errorPassword ? '#f3ece7' : null }} 
                            type="password" name="password" placeholder="Password" value={this.state.Password} onChange={e => this.setState({ Password: e.target.value })} />
                          </div>
                          <div className="field">
                             <span id="errorspan">{this.state.errorPassword}</span> 
                          </div>
                        </div>

                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorRetypePassword ? 'brown' : null }}>Retype Password</label>
                            <input style={{ borderColor: this.state.errorRetypePassword ? 'brown' : null, backgroundColor: this.state.errorRetypePassword ? '#f3ece7' : null }} 
                            type="password" name="retypepassword" placeholder="Retype Password" value={this.state.RetypePassword} onChange={e => this.setState({ RetypePassword: e.target.value })} />
                          </div>
                          <div className="field">
                             <span id="errorspan">{this.state.errorRetypePassword}</span> 
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="ten wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorAddress ? 'brown' : null }}>Address</label>
                            <input style={{ borderColor: this.state.errorAddress ? 'brown' : null, backgroundColor: this.state.errorAddress ? '#f3ece7' : null }}
                            type="text" name="email" placeholder="Address" value={this.state.Address} onChange={e => this.setState({ Address: e.target.value })} />
                          </div>
                          <div className="field">
                             <span id="errorspan">{this.state.errorAddress}</span> 
                          </div>
                        </div>

                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorCity ? 'brown' : null }}>City</label>
                            <input style={{ borderColor: this.state.errorCity ? 'brown' : null, backgroundColor: this.state.errorCity ? '#f3ece7' : null }}
                            type="text" name="city" placeholder="City" value={this.state.City} onChange={e => this.setState({ City: e.target.value })} />
                          </div>
                          <div className="field">
                           <span id="errorspan">{this.state.errorCity}</span> 
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="five wide column">
                          <div className="field">
                            <label>State</label>
                            <select className="" value={this.state.State} onChange={e => this.setState({ State: e.target.value })}>
                              <option value="">Select</option>
                              {this.state.stateDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="five wide column">
                          <div className="field">
                            <label>Country</label>
                            <select className="" value={this.state.Country} onChange={e => this.setState({ Country: e.target.value })}>
                              <option value="">Select</option>
                              {this.state.countryDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorZipcode ? 'brown' : null }}>Zip</label>
                            <input style={{ borderColor: this.state.errorZipcode ? 'brown' : null, backgroundColor: this.state.errorZipcode ? '#f3ece7' : null }}
                            type="text" name="zip" placeholder="Zip" value={this.state.Zip} onChange={e => this.setState({ Zip: e.target.value })} />
                          </div>
                          <div className="field">
                           <span id="errorspan">{this.state.errorZipcode}</span> 
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="ten wide column">
                          <button className="ui primary button" type="submit" onClick={() => this.CRUD_operation()}>Submit</button>
                          <button className="ui  button" type="submit" onClick={() => this.clearscreen()}>Clear</button>
                          <button className="ui  button" type="submit" onClick={() => this.navigateToUserList()} >Cancel</button>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="one wide computer one wide tablet one wide mobile column">
              </div>
            </div>
            {/* <div>
              <pre>
                {JSON.stringify({
                  "Firstname": this.state.Firstname,
                  "Lasttname": this.state.Lasttname,
                  "BusinessOrLowOffice": this.state.BusinessOrLowOffice,
                  "Email": this.state.Email,
                  "Phoneno": this.state.Phoneno,
                  "BestMethodOfContact": this.state.BestMethodOfContact,
                  "BestTimeToCall": this.state.BestTimeToCall,
                  "ServiceRequired": this.state.ServiceRequired,
                  "PriorityLevel": this.state.PriorityLevel,
                  "Message": this.state.Message,
                  "Source": this.state.Source
                })}
              </pre>
            </div> */}
          </div>

        </div>
      )
    }
    else {
      return (
        <div className="ui icon header" style={{ marginTop: 300 }}>
          <div className="ui active loader"></div>
        </div>
      );
    }
  }
}