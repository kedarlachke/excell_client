import React, { Component } from 'react';
import ErrorBoundary from '../commoncomponents/ErrorBoundary';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {displaySubmitError,displayFieldError,runCheck,minLength10,maxLength10,minValue18,emailCheck,alphaNumericCheck,phoneNumberCheck,numberCheck,requiredCheck,maxLength15,maxLength40,maxLength120,maxLength128,minLength4,maxLength4,minLength2,maxLength2,minLength8,maxLength8} from '../commoncomponents/validationlib';

class BaseFormState extends Component {
  constructor(props) {
    super(props);
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


       handleValidate(values,touchedvalues) {

       
    } 
       
       handleProcessSubmit(values) {
        var result='',errorMessage='',errors =new Array();
       console.log('xxxxxxxxxxxxxxxxxxxxxxxxffffffffffffffffffffffffffffxxxxxxxxxxxxxxxxxxxxxxxxxxxx'); 
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

  


  render() {

    console.log('/////////////////////// BASE CLASS ///////////////////////////');
  const fieldErrors = this.handleValidate(this.state.fields,this.state.touched);
  const isFormSubmitEnabled = !Object.keys(fieldErrors).some(x => fieldErrors[x]);

  return (
            <div>
              base class
            </div>
 

    );
  }
}

export default BaseFormState
