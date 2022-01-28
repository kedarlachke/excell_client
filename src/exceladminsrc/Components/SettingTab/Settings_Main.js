import React, { Component } from 'react';
import RateCardAdd from './RateCard_Add'
import ServicesAdd from './Services_Add'
//import 'react-tabs/style/react-tabs.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
export default class Settings_Main extends Component {

    render() {
        return (
            <div>
              
                <Tabs >

                    <div className="ui one column grid">

                        <div className=" row">

                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>

                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <h1 id="title_header">Setting</h1>
                                <TabList>
                                    <Tab >Service List</Tab>
                                    <Tab >Rate Card</Tab>
                                </TabList>
                            </div>
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>

                        </div>
                    </div>
                    <TabPanel>
                        <ServicesAdd />
                    </TabPanel>

                    <TabPanel>
                        <RateCardAdd />
                    </TabPanel>

                </Tabs>
            </div>
        )
    }
}