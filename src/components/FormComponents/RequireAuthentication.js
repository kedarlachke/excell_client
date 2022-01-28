import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {ActionToDispatch,ActionToRedirect} from '../../actions'
import {execGql} from '../../gqlclientconfig';
import CurrentUser from '../../queries/CurrentUser';
import ErrorBoundary from '../commoncomponents/ErrorBoundary';
import Signin from './Signin'
export default (CheckedComponent) => {
    class RequireAuthentication extends Component {
  
        componentWillUpdate(nextProps) {

         
              if(!nextProps.authenticated)
              nextProps.ActionToRedirect('/signin');
     
              }
     
        componentWillMount() {
                
        }

      render() {
   
        console.log(this.props.authuser);
        if(this.props.authenticated)
        {
        return <CheckedComponent {...this.props} />;
        }
        else
        {
        return <Signin {...this.props} />
        }
      }
    }
  
    const mapStateToProps = (state) => { 
    
        return { authenticated:state.auth.authenticated,authuser:state.auth.authuser };
       };
        





    return connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect})(RequireAuthentication);
  };




