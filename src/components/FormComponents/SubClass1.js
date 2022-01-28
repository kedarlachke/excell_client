
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BaseFormState from './BaseFormState'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {ActionToDispatch,ActionToRedirect,checkCurrentUsername} from '../../actions'
import {displaySubmitError,displayFieldError,runCheck,minLength10,maxLength10,minValue18,emailCheck,alphaNumericCheck,phoneNumberCheck,numberCheck,requiredCheck,maxLength15,maxLength40,maxLength120,maxLength128,minLength4,maxLength4,minLength2,maxLength2,minLength8,maxLength8} from '../commoncomponents/validationlib';


class SubClass1 extends BaseFormState {
    constructor(props) {
        super(props);
        this.state={
            fields:{username:'', password:'',mobile:'',email:'', applicationid : "15001500", client: "1002" ,  lang: "EN" },
            touched: {username:false, password: false,mobile:false,email:false } ,
            formErrors:[],
            formErrorMessage:''
            };
        //    this.handleProcessSubmit=this.handleProcessSubmit.bind(this);
          }

    
           handleProcessSubmit(values) {
            var result='',errorMessage='',errors =new Array();
            
        }






handleValidate(values,touchedvalues) {

    return {
    username: touchedvalues.username?runCheck(values.username,[requiredCheck,minLength2,maxLength128]):'' ,
    password: touchedvalues.password?runCheck(values.password,[requiredCheck,minLength2,maxLength128]):'',
    mobile:touchedvalues.mobile?runCheck(values.mobile,[minLength10,maxLength10,numberCheck]):'',
    email:touchedvalues.email?runCheck(values.email,[emailCheck]):'',
  };

} 
    render() {


        const fieldErrors = this.handleValidate(this.state.fields,this.state.touched);
        const isFormSubmitEnabled = !Object.keys(fieldErrors).some(x => fieldErrors[x]);
        console.log('$$$$$$$$$$$$$$$$$$$SubClass1$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        
        //const fieldErrors = this.handleValidate(this.state.fields,this.state.touched);
        //const isFormSubmitEnabled = !Object.keys(fieldErrors).some(x => fieldErrors[x]);
      
        return (
            <div className="body"> 


      <div className='ui middle aligned center aligned stackable grid'>
 
 <div className="five wide computer row"></div>
       
          <h2 className="ui image teal header">
            <div className="content " >
            New User ? Register Here 
            </div>
          </h2>

 <div className="row">
          <div className="five wide computer four wide tablet one wide mobile column"></div>
          <div className="six wide computer eight wide tablet fourteen wide mobile column">
          <form  className="ui form "  onSubmit={ this.handleSubmit} style={{padding:0 , marginBottom:"5px"  }}>

            <div className="ui stacked secondary  segment ">
            <div className="field">
            <div className="ui left icon input">
              <i className="user icon"></i>
              <input  placeholder="User Name"  name="username"  onBlur={(event) => this.handleBlur(event)} value={this.state.fields.username}  onChange={(event) => this.handleUserInput(event)} / > 
            </div>
           
          </div>
          {  displayFieldError(fieldErrors.username) }
        <div className="field">
            <div className="ui left icon input">
              <i className="lock icon"></i>
              <input type="password" name="password" placeholder="Password" onBlur={(event) => this.handleBlur(event)} value={this.state.fields.password} onChange={(event) => this.handleUserInput(event)} />
            </div>
           
          </div>
          { displayFieldError(fieldErrors.password)  }
          <div className="field">
            <div className="ui left icon input">
              <i className="mail  icon"></i>
              <input  placeholder="E-mail address"  name="email"  onBlur={(event) => this.handleBlur(event)} value={this.state.fields.email}  onChange={(event) => this.handleUserInput(event)} / > 
            </div>
           
          </div>
          { displayFieldError(fieldErrors.email)  }
          <div className="field">
            <div className="ui left icon input">
              <i className="mobile icon"></i>
              <input  placeholder="Mobile No"  name="mobile"  onBlur={(event) => this.handleBlur(event)} value={this.state.fields.mobile}  onChange={(event) => this.handleUserInput(event)} / > 
            </div>
           
          </div>
          { displayFieldError(fieldErrors.mobile)  }
             <input type="submit" value="SignUp" disabled={!isFormSubmitEnabled} className="ui fluid large teal submit button"/>
             { displaySubmitError(this.state.formErrorMessage) }
            </div>
        
          </form>
          </div>
          <div className="five wide computer four wide tablet one wide mobile column"></div>
          </div>
         
          {/* <div className='ui middle aligned center aligned grid'> */}
          <div className="five wide computer five wide tablet five wide mobile column   left aligned"  style={{padding:0  }}>Have a User account?  <Link to='/signin'>Sign In</Link></div>
        
          </div>
          </div>     
          );
        }
}
const mapStateToProps = (state) => { 
  return { authenticated:state.auth.authenticated,authprocess:state.auth.authprocess, authuser:state.auth.authuser };
 };
export default connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect })(SubClass1);