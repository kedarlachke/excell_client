import React,{ Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signupUsername,setUser } from "../../actions";
import mutation from '../../mutations/Signup';
import query from '../../queries/CurrentUser';
import ErrorBoundary from '../commoncomponents/ErrorBoundary'
import {email,renderSelect,required,renderField,maxLength15,alphaNumeric,
  maxLength40,maxLength120,maxLength128,
  number,minLength4,maxLength4,minLength2,maxLength2,phoneNumber,minLength8,maxLength8,isValidDate} from "../commoncomponents/validationlib";

  const  validate= values => {
    let bday=values.year+values.month+values.day;
    const errors = {}
    
  if(bday)
  {
     if(! isValidDate(bday) )
    {
      errors.day= 'Must be valid date'+bday
    }
    else
    {
      var vbirthday = new Date(bday.substring(0,4), bday.substring(4,6)-1, bday.substring(6,8));
      if(vbirthday> (new Date())) 
      {
        errors.year= 'Date must be less than today'
      }

    }
  }
    return errors
  }






class SignUp1 extends Component {
  


  


 
  render()
  {
    const { handleSubmit, pristine, reset, submitting } = this.props;
  
  console.log('44433344443333');

     return (
      <ErrorBoundary>
         console.log(this);
    <form >
   
      
      
   <div><button type="button"  > Load User</button> </div>

   <Field
name="applicationid"
component={renderField}
validate={[required,number,minLength8,maxLength8]}  
type="text"
label="Application Id"
/>



<Field
name="lang"
component={renderField}
validate={[required,minLength2,maxLength2]}  
type="text"
label="language"
/>

   <Field
name="client"
component={renderField}
validate={[required,number,minLength8,maxLength8]}  
type="text"
/>  

<Field
name="username"
component={renderField}
validate={[required,minLength2,maxLength128]}  
type="text"
label="User Name"
/>

<Field
name="email"
component={renderField}
validate={[email]}  
type="email"
label="Email"
/>

<Field
name="password"
component={renderField}
validate={required}  
type="password"
label="Password"
/>

  <Field
name="confirmpassword"
component={renderField}
validate={required}  
type="password"
label="Confirm Password"
/>    
    
<Field
name="mobile"
component={renderField}
validate={[phoneNumber]}  
type="text"
label="Mobile"
/>  







          <Field
            name="firstname"
            component={renderField}
            validate={[minLength2,maxLength40]}  
            warn={alphaNumeric}
            type="hidden"
            label="First Name"
          />
          
          <Field
                name="lastname"
                component={renderField}
                validate={[minLength2,maxLength40]}  
                warn={alphaNumeric}
                type="text"
                label="Last Name"
              />

          <Field
          name="businessname"
          component={renderField}
          validate={[minLength2,maxLength120]}  
          warn={alphaNumeric}
          type="text"
          label="Business Name"
          />



    


<Field
name="gender"
component={renderSelect}
validate={[]}  
type="select"
label="Gender">
      <option />
            <option value="Male">Male</option>
            <option value="Female">Female</option>
</Field>  
          





      <Field
name="day"
component={renderField}
validate={[number,minLength2,maxLength2,isValidDate]}  
type="text"
label="Day"
/>  


<Field
name="month"
component={renderSelect}
validate={[]}  
type="select"
label="Month">
     <option />
     <option value="01">Jan</option>
     <option value="02">Feb</option>
     <option value="03">Mar</option>
     <option value="04">Apr</option>
     <option value="05">May</option>
     <option value="06">Jun</option>
     <option value="07">Jul</option>
     <option value="08">Aug</option>
     <option value="09">Sep</option>
     <option value="10">Oct</option>
     <option value="11">Nov</option>
     <option value="12">Dec</option>
</Field>  

      <Field
name="year"
component={renderField}
validate={[number,minLength4,maxLength4]}  
type="text"
label="Year"
/>  


<Field
            name="tcode"
            component={renderField}
            validate={[required,minLength2,maxLength128]}  
            type="text"
            label="TCode"
          />

      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
    </ErrorBoundary>
  );

 
}


}



function mapStateToProps(state) {
//return { initialValues:  state.users.data  }
return { initialValues:  {"applicationid" : "10000001",
                          "lang":"EN",
                          "client":"45004500",
                          "username":"rvp100000",
                          "password":"123",
                        "confirmpassword":"123",
                        "email":"rvp10000001@rvp.com",
                        "day":"01",
                        "month":"01",
                        "year":"2001",
                       "tcode":"signupuser"
                              } 
                            
                            
                            }

};

SignUp1 =reduxForm({
  form: 'SignupForm1' ,
 validate
})(SignUp1);


SignUp1 =connect(mapStateToProps
,{ signupUsername })(SignUp1);

export default SignUp1;

