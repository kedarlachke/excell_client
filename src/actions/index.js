import { browserHistory } from 'react-router-dom';
import { push } from 'react-router-redux';
import gql from "graphql-tag";
import SignOutUsername  from '../mutations/signOutUsername';
import SignInUsername from '../mutations/signInUsername';
import SignInUsernameJWT from '../mutations/signInUsernameJWT';

import SignUpUsername from '../mutations/signUpUsername';
import SignUpUsernameJWT from '../mutations/signUpUsernameJWT';



import CurrentUser from '../queries/CurrentUser';
import CurrentUserJWT from '../queries/CurrentUserJWT';


import {execGql,execGql_xx} from '../gqlclientconfig';
const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const AUTH_ERROR = 'AUTH_ERROR';
const AUTH_PENDING ='AUTH_PENDING';
const FORM_ERROR = 'FORM_ERROR';
const CLEAR_FORM_ERROR = 'CLEAR_FORM_ERROR';
const SIGNUP_USERNAME='SIGNUP_USERNAME';
  const  values1 =
    {"applicationid": "15001500",
"client": "12341234",
"lang": "EN",
"username": "sachin@sachin.com.com",
"email": "sachin@kedar.com.com",
"password": "123",
"mobile" : "123445667"};

export function ActionToDispatch(action_to_dispatch)
{
return function(dispatch){
  console.log('dispatching ' );
  console.log(action_to_dispatch);
  dispatch(action_to_dispatch);

}

}


export function ActionToRedirect(url_path)
{
return function(dispatch){

  console.log(url_path);
  dispatch(push(url_path));

}

}


export async function handleSignIn(values,callback) {
 var result='',errorMessage='',errors =new Array();
try
{
  console.log('values************');
  console.log(values);
  console.log('values**** end********');
  result= await execGql('mutation',SignInUsername,values)
 }
catch(err)
{  
   errors = err.errorsGql;
   errorMessage = err.errorMessageGql;
  return callback({"errors":errors,"errorMessage":errorMessage},'' );
}
if(!result)
{

  console.log('values blank **** end********');
  console.log('No errors and results from GQL');

  return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
}
else
{
  console.log('values result.data.signInUsername');
  console.log(result.data.signInUsername);

return callback('',result.data.signInUsername);
}
}




export async function handleSignInJWT(values,callback) {
  var result='',errorMessage='',errors =new Array();
 try
 {
   result= await execGql('mutation',SignInUsernameJWT,values)
  }
 catch(err)
 {  
    errors = err.errorsGql;
    errorMessage = err.errorMessageGql;
   return callback({"errors":errors,"errorMessage":errorMessage},'' );
 }
 if(!result)
 {
   return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
 }
 else
 {
 return callback('',result.data.signInUsernameJWT);
 }
 }






export async function handleSignUpJWT(values,callback) 
 {
  var result='',errorMessage='',errors =new Array();
  try
  {   
     result= await execGql('mutation',SignUpUsernameJWT,values)
     console.log('resultJWT');
     console.log(result);
     console.log('resultJWT--end');
  }
  catch(err)
   {  
    console.log('errJWT');
    console.log(err);
    console.log('errJWT--end');
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;    
      return callback({"errors":errors,"errorMessage":errorMessage},'' );
   }
 if(!result)
 {

   return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
 }
 else
 {
    return callback('',result.data.signUpUsernameJWT);
 }
 }





 
 export async function handleSignUp(values,callback) 
 {
  var result='',errorMessage='',errors =new Array();
  try
  {   
     result= await execGql('mutation',SignUpUsername,values)
   
  }
  catch(err)
   {  
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;    
      return callback({"errors":errors,"errorMessage":errorMessage},'' );
   }
 if(!result)
 {

   return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
 }
 else
 {
    return callback('',result.data.signUpUsername);
 }
 }






export async function  checkCurrentUsername(callback) {
  var result='',errorMessage='',errors=[];
  try
  {
      result= await execGql('query',CurrentUser)
  }
  catch(err)
   {  
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;   
       return callback({errors,errorMessage});
    }
   if(!result.data.currentUsername)
      {
            callback();
      }
      else
      {
           callback('',result.data.currentUsername);
       }   
} 




export async function  checkCurrentUsernameJWT(callback) {
  var result='',errorMessage='',errors=[];
  try
  {
      result= await execGql('query',CurrentUserJWT)
      console.log('gql result');
      console.log(result);
  }
  catch(err)
   {  
    console.log('gql err');
    console.log(err);
    errors = err.errorsGql;
      errorMessage = err.errorMessageGql;   
       return callback({errors,errorMessage});
    }
   if(!result.data.currentUsernameJWT)
      {
            callback();
      }
      else
      {
           callback('',result.data.currentUsernameJWT);
       }   
} 




export async function  handleSignoutUsername(callback) {


  var result='',errorMessage='',errors=[];
  try
  {
  
    result= await execGql('mutation',SignOutUsername)
  
  }
  catch(err)
   {  
       errors = err.errorsGql;
      errorMessage = err.errorMessageGql;    
     return callback({"errors":errors,"errorMessage":errorMessage} );
  } 

  if(!result.data.signOutUsername)
  {
   
    callback();
  }
  else
  {
    
    callback('',result.data.signOutUsername);
   } 
  

} 


export async function  handleSignoutUsernameJWT(callback) {

console.log('sessionStorage remove');
 // sessionStorage.removeItem('jwtToken');
  console.log('sessionStorage remove ends');


  var result='',errorMessage='',errors=[];

    sessionStorage.removeItem('jwtToken');
    callback();

} 
