import React, { Component } from 'react';
import {ActionToDispatch,ActionToRedirect,handleSignIn, checkCurrentUsername} from '../../actions'
import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {displaySubmitError,displayFieldError,runCheck,minLength10,maxLength10,minValue18,emailCheck,alphaNumericCheck,phoneNumberCheck,numberCheck,requiredCheck,maxLength15,maxLength40,maxLength120,maxLength128,minLength4,maxLength4,minLength2,maxLength2,minLength8,maxLength8} from '../commoncomponents/validationlib';
class Signin extends React.Component
{
      constructor(props) {
        super(props)
        this.state={
        fields:{username:'', password:'', applicationid : "15001500", client: "1002" ,  lang: "EN" },
        touched: {username:false, password: false } ,
        formErrors:[],
        formErrorMessage:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidate=this.handleValidate.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleClearErrors = this.handleClearErrors.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleProcessSubmitSignIn=this.handleProcessSubmitSignIn.bind(this);
      }
      handleClear()
      {
      }

      handleClearErrors()
      {
        this.setState({formErrorMessage: ''});
        this.setState({formErrors: []});
      }

      async handleProcessSubmitSignIn(values) {
           var result='',errorMessage='',errors =new Array();
           this.props.ActionToDispatch({ type: 'AUTH_PENDING' ,payload : ['Signing In'] });
           this.setState({formErrorMessage: 'In process'});

           console.log('x1');
           handleSignIn(values,async (err,result)=>{
        

 
            
            if(!err)
              {
           
                if(!result)
                {
                  console.log('x1');
                  this.props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : errors });
                  this.setState({formErrorMessage: errorMessage}); 
                  this.setState({formErrors : errors}) ; 
                }
                else
                {
                
                  checkCurrentUsername(async (err,result)=>
                  {

                    console.log('err');
                    console.log(err);
                    console.log('err end');
         
         
                    console.log('result');
                    console.log(result);
                    console.log('result end');
                    
                   if(!err)
                    {
                   
                              if(!result)
                              {
                                this.props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : errors });
                                this.setState({formErrorMessage: errorMessage}); 
                                this.setState({formErrors : errors}) ; 
                              }
                              else
                              {
                              this.setState({formErrorMessage: 'Authenticated'});  
                              this.props.ActionToDispatch({ type: 'AUTH_USER' ,payload :  result  });
                              this.props.ActionToRedirect('/dashboard');
                              }

                    }
                  }
                  )
                }
             }
              else
              {
                this.props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : err.errors });
                this.setState({formErrorMessage: err.errorMessage}); 
                this.setState({formErrors : err.errors}) ; 
              }
           })
          }
     
      handleSubmit(event) 
      {
         this.handleClearErrors();
         try{ this.handleProcessSubmitSignIn(this.state.fields);   }
         catch(err)  {  this.state.formErrorMessage=err;} 
         event.preventDefault();
      } 

   handleBlur (e) 
    {
      const name = e.target.name;
      this.setState({touched: { ...this.state.touched, [name]: true }, });
    }

    handleUserInput (e) {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({fields: { ...this.state.fields, [name]: value },})
    }

    handleValidate(values,touchedvalues) 
    {
        return {
        username: touchedvalues.username?runCheck(values.username,[requiredCheck,minLength2,maxLength128]):'' ,
        password: touchedvalues.password?runCheck(values.password,[requiredCheck,minLength2,maxLength128]):'',
      };

    } 
render()
{

if(this.state.formErrorMessage=='In process' || this.props.authprocess=='pending')
return(

  <div className="ui icon header">
                    <div className="ui active loader"></div>
                </div>
)




  const fieldErrors = this.handleValidate(this.state.fields,this.state.touched);
  const isFormSubmitEnabled = !Object.keys(fieldErrors).some(x => fieldErrors[x]);

   return(
    <div className='ui middle aligned center aligned stackable grid'>
 
 <div className="five wide computer five wide tablet one wide mobile columnrow"></div>
       
          <h2 className="ui image teal header">
            <div className="content " >
              Log-in to your account
            </div>
          </h2>




 <div className="row">
          <div className="five wide computer four wide tablet one wide mobile column"></div>
          <div className="six wide computer eight wide tablet fourteen wide mobile column">
          <form  className="ui form "  onSubmit={ this.handleSubmit} style={{padding:0 , marginBottom:"5px"  }}>

            <div className="ui stacked secondary  segment ">
              <div className="field " >
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input  placeholder="User Name"   name="username"  onBlur={(event) => this.handleBlur(event)} value={this.state.fields.username}  onChange={(event) => this.handleUserInput(event)} / > 
                 </div>
               
           
              </div>
                      {  displayFieldError(fieldErrors.username) }
           
              <div className="field " >
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input type="password" name="password" placeholder="Password" onBlur={(event) => this.handleBlur(event)} value={this.state.fields.password} onChange={(event) => this.handleUserInput(event)} />
                </div>
              </div>
                 { displayFieldError(fieldErrors.password) }
             <input type="submit" value="SignIn" disabled={!isFormSubmitEnabled} className="ui fluid large teal submit button"/>
             { displaySubmitError(this.state.formErrorMessage) }
            </div>
        
          </form>
          </div>
          <div className="five wide computer four wide tablet one wide mobile column"></div>
          </div>
         
    
          <div className="five wide computer five wide tablet five wide mobile column   left aligned"  style={{padding:0  }}>New User account?  <Link to='/signup'>Sign Up</Link></div>
        
          </div>

    

    )
}
}
const mapStateToProps = (state) => { 
  return { authenticated:state.auth.authenticated,authprocess:state.auth.authprocess,authuser:state.auth.authuser };
 };
 
 export default connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect})(Signin)