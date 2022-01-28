import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from './signup'
import Signin from './signin'





const homePage = () => (
    <div>
        
    </div>
)

const logoutPage = () => (
    <div className="div-logoText">
       <h5 className="h4-homePage">You have successfully logout.</h5> 
    </div>
)

class LoginHome extends Component {
    render() {
        return (

            <form >
                <Router>
                    <div>
                        <div className="ui secondary  menu div-menu">
                            <div className="left menu div-logoText">
                                <Link to="/"> 
                                     <h4 className="h4-homePage">Test App </h4>
                                 </Link>
                             </div>


                            <div className="right menu">
                                <Link to="/Signup"> 
                                     <a className="ui primary button">Signup</a>
                                </Link>
                                <Link to="/Signin">  
                                    <a className="ui primary button">Signin</a>
                                 </Link>

                                 <Link to="/Logout">  
                                    <a className="ui primary button">Signout</a>
                                </Link>
                            </div>
                        </div>
                        <hr ></hr>
                         <Route exact path="/" component={homePage} />
                        <Route path="/Signup" component={Signup} />
                        <Route path="/Signin" component={Signin} />
                        <Route path="/Logout" component={logoutPage} />
                    </div>
                </Router>
            </form>


        );
    }
}

export default LoginHome;

