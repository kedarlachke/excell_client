import React, { Component } from 'react';
import { BrowserRouter as Router, Route ,Link ,withRouter} from 'react-router-dom';

import ErrorBoundary from '../commoncomponents/ErrorBoundary'
import SignUpForm from './signup'
import SignInForm from './signin'

const homePage = () => (
    <div>
        
    </div>
)

const logoutPage = () => (
    <div className="div-logoText">
       <h5 className="h4-homePage">You have successfully logout.</h5> 
    </div>
)

class LandingPage extends Component {
    render() {
        return (
<ErrorBoundary>
            <form >
                <Router>
                    <div>
                        <div className="ui secondary  menu div-menu">
                            <div className="left menu div-logoText">
                                <Link to="/"> 
                                    Test App 
                                 </Link>
                             </div>


                            <div className="right menu">
                               <Link to="/signup" > 
                                    Signup
                                </Link>
                              
                                <Link to="/signin">  
                                    Signin
                                 </Link>

                                 <Link to="/Logout">  
                                    Signout
                                </Link>
                            </div>
                        </div>
                        <hr ></hr>
                    </div>
                </Router>
            </form>

            </ErrorBoundary>
        );
    }
}

export default LandingPage;

