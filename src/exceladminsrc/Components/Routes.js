import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from '../Components/DashBoard/dashBoard'
import Signin from '../Components/Login/signin'
export default class Routes extends React.Component {

    render() {
        return (
            <div>
            <Router>
                <div>
                    <Route exact path="/" component={Signin} />
                    <Route path="/Dashboard" component={Dashboard} />
                </div>
            </Router>
            </div>
        )
    }
}