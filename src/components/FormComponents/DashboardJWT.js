import React ,{ Component } from 'react';

export default (props) => {
  console.log('in dashboard');
  console.log(props);
  
  console.log('end dashboard');
  return <div>You are logged using JWT.  username { props.authuser.username } </div>
};
