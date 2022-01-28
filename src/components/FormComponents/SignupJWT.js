import React, { Component } from 'react';
import {ActionToDispatch,ActionToRedirect,handleSignUpJWT,checkCurrentUsernameJWT} from '../../actions'
import { connect } from 'react-redux';
import ErrorBoundary from '../commoncomponents/ErrorBoundary';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {displaySubmitError,displayFieldError,runCheck,minLength10,maxLength10,minValue18,emailCheck,alphaNumericCheck,phoneNumberCheck,numberCheck,requiredCheck,maxLength15,maxLength40,maxLength120,maxLength128,minLength4,maxLength4,minLength2,maxLength2,minLength8,maxLength8} from '../commoncomponents/validationlib';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state={
        fields:{username:'', password:'',mobile:'',email:'', applicationid : "15001500", client: "1002" ,  lang: "EN" },
        touched: {username:false, password: false,mobile:false,email:false } ,
        formErrors:[],
        formErrorMessage:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidate=this.handleValidate.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleClearErrors = this.handleClearErrors.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleProcessSubmit=this.handleProcessSubmit.bind(this);
      }

       handleClear()
       {
       }
 
       handleClearErrors()
       {
         this.setState({formErrorMessage: ''});
         this.setState({formErrors: []});
       }


       async handleProcessSubmit(values) {
        var result='',errorMessage='',errors =new Array();
        this.props.ActionToDispatch({ type: 'AUTH_PENDING' ,payload : ['Signing In'] });
        this.setState({formErrorMessage: 'In process'});
        
        handleSignUpJWT(values,async (err,result)=>
      {
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
            
            console.log('result.signUpUsernameJWT.token');
            console.log(result.token);
            console.log('result.signUpUsernameJWT.token--end');
            sessionStorage.setItem('jwtToken', result.token);
            console.log('token added');
            checkCurrentUsernameJWT(async (err,result)=>
            {
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
            })
         }
        }
        else
        {
          this.props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : err.errors });
          this.setState({formErrorMessage: err.errorMessage}); 
          this.setState({formErrors : err.errors}) ; 
         }
         }
     
      )
    }
       

  
    handleSubmit(event) 
    {
       this.handleClearErrors();
       try{ this.handleProcessSubmit(this.state.fields);   }
       catch(err)  {  this.state.formErrorMessage=err;} 
       event.preventDefault();
    } 


 
handleBlur (e) {
const name = e.target.name;
this.setState({touched: { ...this.state.touched, [name]: true }, });
}

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({fields: { ...this.state.fields, [name]: value },})
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
   
   
   
    if(this.state.formErrorMessage=='In process')
  return(
   
    <div className="ui icon header">
                      <div className="ui active loader"></div>
                  </div>
  )
   
   
   
   
   
   
    return (
        //   <div className="body">
        //   <div className="ui middle aligned center aligned grid">
        //   <div className="column">
        //     <h2 className="ui image teal header">
        //       <div className="content">
        //         New User ? Register Here 
        //       </div>
        //     </h2>
        //     <form className="ui large form"  onSubmit={this.handleSubmit}>
        //       <div className="ui stacked secondary segment">
        //       <div className="field">
        //           <div className="ui left icon input">
        //             <i className="user icon"></i>
        //             <input  placeholder="User Name"  name="username"  onBlur={(event) => this.handleBlur(event)} value={this.state.fields.username}  onChange={(event) => this.handleUserInput(event)} / > 
        //           </div>
        //           {  displayFieldError(fieldErrors.username) }
        //         </div>
        //       <div className="field">
        //           <div className="ui left icon input">
        //             <i className="lock icon"></i>
        //             <input type="password" name="password" placeholder="Password" onBlur={(event) => this.handleBlur(event)} value={this.state.fields.password} onChange={(event) => this.handleUserInput(event)} />
        //           </div>
        //           { displayFieldError(fieldErrors.password)  }
        //         </div>
        //         <div className="field">
        //           <div className="ui left icon input">
        //             <i className="mail  icon"></i>
        //             <input  placeholder="E-mail address"  name="email"  onBlur={(event) => this.handleBlur(event)} value={this.state.fields.email}  onChange={(event) => this.handleUserInput(event)} / > 
        //           </div>
        //           { displayFieldError(fieldErrors.email)  }
        //         </div>
        //         <div className="field">
        //           <div className="ui left icon input">
        //             <i className="mobile icon"></i>
        //             <input  placeholder="Mobile No"  name="mobile"  onBlur={(event) => this.handleBlur(event)} value={this.state.fields.mobile}  onChange={(event) => this.handleUserInput(event)} / > 
        //           </div>
        //           { displayFieldError(fieldErrors.mobile)  }
        //         </div>
        //         <input type="submit" value="submit" disabled={!isFormSubmitEnabled} className="ui fluid large teal submit button"/>
        //       </div>
        //       {displaySubmitError(this.state.formErrorMessage) }
        //     </form>
   
        //     <div  className="h4-homePage" >
        //     <pre>
        //     {JSON.stringify(this.state.fields)}
        //    </pre>
        //     </div>
        //   </div>
        // </div>
        // <div>
                  
        //           <Link to='/signin'>Sign In</Link>
               
        //    </div>
        // </div>
     
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
 
 export default connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect })(Signup)
