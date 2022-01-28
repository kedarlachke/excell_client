import React from 'react'

export const requiredCheck = value => (value ? undefined : 'Required');
export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : ''
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : ''

export const maxLength15 = maxLength(15)
export const maxLength40 = maxLength(40)
export const maxLength120= maxLength(120)
export const maxLength128= maxLength(128)
export const minLength4= minLength(4)
export const maxLength4= maxLength(4)
export const minLength2= minLength(2)
export const maxLength2= maxLength(2)

export const minLength8= minLength(8)
export const maxLength8= maxLength(8)

export const minLength10= minLength(10)
export const maxLength10= maxLength(10)

export const  isValidDate=s => {
  var d = new Date(s.substring(0,4), s.substring(4,6)-1, s.substring(6,8));
  //console.log(s);
  console.log(s.substring(0,4));
  console.log(s.substring(4,6));
  console.log(s.substring(6,8));
  console.log(d);
  //console.log(d.getMonth());
  console.log(d.getMonth()); 
  return d && d.getMonth()+1 == s.substring(4,6);
  
}

export const numberCheck = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : ''
export const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : ''
export const minValue18 = minValue(18)
export const emailCheck = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : ''


export const alphaNumericCheck = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : ''
export const phoneNumberCheck = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : ''

    export const   runCheck = function(checkValue,validationArray)
    {

      //console.log('checking value ' + checkValue + validationArray[0](checkValue)) ;
     


  
      var eMessage=""
        for (var index = 0; index < validationArray.length; index++) {
          if(validationArray[index](checkValue))
         eMessage = eMessage + validationArray[index](checkValue);
  

      }

      return eMessage;

    }
    export const   displayFieldError = function(errorMessage)
    {
     

      if(errorMessage)
      {
      
      return(

                  <div className="ui large red message "  style={{padding:0 ,textAlign:"left", marginTop:"0" , border: 0,backgroundColor:"transparent",boxShadow:"0 0 0 0px #db2828 inset, 0 0 0 0 transparent" }}>{ errorMessage }</div>
        )
      }
      else{
        return(
            <div></div>
             )
      }

    }



    export const   displaySubmitError = function(errorMessage)
    {
      

      if(errorMessage.length>0)
      {
       
      return(
                
                  
                  <div className="ui large red message "  style={{padding:0 ,textAlign:"left", marginTop:"0" , border: 0,backgroundColor:"transparent",boxShadow:"0 0 0 0px #db2828 inset, 0 0 0 0 transparent" }}>{ errorMessage }</div>
  
        )
      }
      else{
        return(
            <div>

            </div>
             )
      }

    }
    


export const json=()=>{
return {displaySubmitError ,displayFieldError }

}