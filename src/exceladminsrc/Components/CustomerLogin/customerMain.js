import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import logoimg from '../../images/Excel_LOGO_REG.png'
import CustomerRegistration from './customerRegistration'
import CustomerLogin from '../../../components/FormComponents/customerLogin'
import SendMail from './sendMail'
import CustomerDashboard from './customerDashboard'
export default class Customer_Main extends Component {

    render() {

        return (
            <Router>
                <div id="fcmain" class="ui one column grid">

                    <div class="three column row" id="fcheader" >
                        <div class="one wide computer one wide tablet one wide mobile column">

                        </div>
                        <div class="fourteen wide computer fourteen wide tablet fourteen wide mobile column">

                            <div class="ui four column grid">
                                <div class="four column row">
                                    <div class="two wide computer two wide tablet three wide mobile column" id="logodiv">
                                        <a href="https://www.excellinvestigations.net/">
                                        <img src={logoimg} id="logoimg" />
                                        </a>
                                    </div>

                                    <div class="five wide computer three wide tablet three wide mobile column">
                                        <h2 id="fclogotext">EXCELL INVESTIGATION</h2>
                                        <button id="fcwebsitebtn"><a href="https://www.excellinvestigations.net/" >VISIT OUR WEBSITE</a></button>
                                    </div>


                                    <div class="four wide computer four wide tablet four wide mobile column">

                                    </div>

                                    <div class="five wide computer three wide tablet three wide mobile column" style={{ textAlign: 'right' }}>
                                        <h2 id="fclogotext">NEED ASSISTANCE !</h2>
                                        <h2 id="fclogotext" >1.888.666.0089</h2>
                                    </div>

                                </div>
                            </div>


                        </div>
                        <div class="one wide computer one wide tablet one wide mobile column">
                        </div>
                    </div>

                    <div class="three column row" id="fcbody">
                        <div class="sixteen wide computer sixteen wide tablet sixteen wide mobile column" >

                            <Route exact path="/customersignin" component={CustomerLogin} />
                            <Route path="/registration" component={CustomerRegistration} />
                            <Route path="/forgotpassword" component={SendMail} />
                            <div>

                            </div>
                        </div>
                    </div>

                    <div id="fcfooter">
                        ExcellInvestigations.net © {new Date().getFullYear()} - All Rights Reserved.
                      </div>

                </div>
            </Router>
        )
    }
}