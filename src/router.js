import React,{ Component } from 'react';
/*import { Router, hashHistory, Route, IndexRoute,Switch } from 'react-router';*/
import { Route,Switch } from 'react-router-dom';
import ErrorBoundary from './components/commoncomponents/ErrorBoundary'
import SignUpForm from './components/FormComponents/Signup';
import SignInForm from './components/FormComponents/Signin';

import LandingPage from './components/FormComponents/landingpage'
import Dashboard from './components/FormComponents/Dashboard';


const AppRouter = () => {

return (
    
    
          <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/landingpage" component={LandingPage} />
  
         </Switch>
        
       
    );
       
  };
  
  export default AppRouter;