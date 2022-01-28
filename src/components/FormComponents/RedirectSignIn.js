import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {ActionToDispatch,ActionToRedirect} from '../../actions'
import {execGql} from '../../gqlclientconfig';
import CurrentUser from '../../queries/CurrentUser';
import ErrorBoundary from '../commoncomponents/ErrorBoundary';
import Signin from './Signin'
import Dashboard from './Dashboard'


  

export default (CheckedComponent) => {
    class RedirectSignIn extends Component {

   
        componentWillUpdate(nextProps) {
              console.log(nextProps);
              
      console.log('redirect sign in componentWillUpdate');


              if(!nextProps.authenticated)
              {
            //  nextProps.ActionToRedirect('/signin');
              } 
            else
              nextProps.ActionToRedirect('/dashboard');
     
            }
     
        componentWillMount() {

         
      console.log('redirect sign in componentWillMount');
           
            if(!this.props.authenticated)
           {
            //this.props.ActionToRedirect('/signin');
           }
            else
            this.props.ActionToRedirect('/dashboard');
   
                
        }

      render() {
   
        if(this.props.authenticated)
        {
          console.log('redirect sign in componentWillUpdate');
          return <Dashboard {...this.props} />
          
        }
        else
        {
     //   return <div>dddddddddddddddddddddd</div>
     return <CheckedComponent {...this.props} />;
        }
      }
    }
  
    const mapStateToProps = (state) => { 
    
        return { authenticated:state.auth.authenticated,authuser:state.auth.authuser };
       };
        





    return connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect})(RedirectSignIn);
  };
