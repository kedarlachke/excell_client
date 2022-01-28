import React, { Component } from 'react';

import User_add from './User_add'
import User_Authorization from './User_Authorization'
//import 'react-tabs/style/react-tabs.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class UserEdit extends Component {

    render() {
        return (
            <div>
                <h1 style={{ marginTop: 50 }}></h1>
                <Tabs >
                    <div className="ui one column grid">
                        <div className=" row">

                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>

                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">

                                <div style={{ fontWeight: "600", fontSize: 16 }}>
                                    <span>First Name : {this.props.location.state.data.FNAME}</span><br />
                                    <span>Last Name : {this.props.location.state.data.LNAME}</span>
                                </div>
                                <TabList>
                                    <Tab >Details</Tab>
                                    <Tab >Authorizations</Tab>
                                </TabList>
                            </div>
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>

                        </div>
                    </div>
                    <TabPanel>
                        <User_add history={this.props.history} userID={this.props.location.state.data.USRID} />
                    </TabPanel>

                    <TabPanel>
                        <User_Authorization history={this.props.history} userID={this.props.location.state.data.USRID}/>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}