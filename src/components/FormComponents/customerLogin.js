import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';

import {ActionToDispatch,ActionToRedirect,handleSignIn, checkCurrentUsername} from '../../actions'

import {displaySubmitError,displayFieldError,runCheck,minLength10,maxLength10,minValue18,emailCheck,alphaNumericCheck,phoneNumberCheck,numberCheck,requiredCheck,maxLength15,maxLength40,maxLength120,maxLength128,minLength4,maxLength4,minLength2,maxLength2,minLength8,maxLength8} from '../commoncomponents/validationlib';

var errorval = false
class CustomerLogin extends Component {
  

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

         
           handleSignIn(values,async (err,result)=>{
        

 
            
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
                                  console.log('123456789');
                              this.setState({formErrorMessage: 'Authenticated'});  
                              this.props.ActionToDispatch({ type: 'AUTH_USER' ,payload :  result  });
                              this.props.ActionToRedirect('/customerdashboard');
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
         console.log('asdasdad'); 
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



















   /*----------------function to navigate to dashboard----------------------*/
   navigateToDashboard() {
    return this.props.history.push('/customerdashboard')
};

    render() {



        if(this.state.formErrorMessage=='In process' || this.props.authprocess=='pending')
return(

  <div className="ui icon header">
                    <div className="ui active loader"></div>
                </div>
)

        const fieldErrors = this.handleValidate(this.state.fields,this.state.touched);
        const isFormSubmitEnabled = !Object.keys(fieldErrors).some(x => fieldErrors[x]);
        return (

            <div className="ui one column grid">

                <div className=" row">

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                    <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                        <h1 id="title_header" style={{ color: "#fff" }}>CUSTOMER LOGIN</h1>
                    </div>

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                </div>

                <div className=" row">

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                    <div className="ten wide computer ten wide tablet ten wide mobile column">

                        <div className="ui segment" >

                            <div className="ui form" >

                                <div className="ui  stackable grid"> 

                                    <div className=" row">
                                        <div className="seven wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorEmail ? 'brown' : null }}>E-mail</label>
                                                <div className="ui right icon input">
                                                    <i className="mail icon"></i>
                                                    <input  placeholder="User Name"   name="username"  onBlur={(event) => this.handleBlur(event)} value={this.state.fields.username}  onChange={(event) => this.handleUserInput(event)} / > 
                                                </div>
                                            </div>
                                            {  displayFieldError(fieldErrors.username) }
                                          
                                        </div>

                                        <div className="seven wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorPassword ? 'brown' : null }}>Password</label>
                                                <input type="password" name="password" placeholder="Password" onBlur={(event) => this.handleBlur(event)} value={this.state.fields.password} onChange={(event) => this.handleUserInput(event)} />
                                            </div>
                                            { displayFieldError(fieldErrors.password) }
                                        </div>
                                       

   











                                    </div>


                                    <div className=" row">
                                        <div className="ten wide column">

      
             <input type="submit" value="SignIn" className="ui primary button" onClick={ this.handleSubmit } />
             { displaySubmitError(this.state.formErrorMessage) }

                                         
                                         <Link to={'/forgotpassword'}>  Forgot Password? </Link >  
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                </div>

                <div className=" row">

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                    <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                        <h1 id="title_header" style={{ color: "#fff" }}>NEW CUSTOMER</h1>
                    </div>

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                </div>

                <div className=" row">

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                    <div className="ten wide computer ten wide tablet ten wide mobile column">

                        <div className="ui segment" >

                            <div className="ui form">

                                <div className="ui  stackable grid">
                                <div className=" row">
                                        <div className="fourteen wide column" style={{fontWeight:600,color:'#666666'}}>
                                        If you are a new customer, and would like to ASSIGN A CASE, please click below to get started. Your Information is 100% secure and kept confidential.
                                        </div>
                                    </div>
                                    <div className=" row">
                                        <div className="ten wide column">
                                        <Link to={'/registration'}>   <button className="ui primary button" type="submit">CREATE YOUR ACCOUNT</button></Link>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => { 
    return { authenticated:state.auth.authenticated,authprocess:state.auth.authprocess,authuser:state.auth.authuser };
   };
   
   export default connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect})(CustomerLogin)