import React, { Component } from 'react';
import RateCardAdd from './RateCard_List'
import ServicesAdd from './Service_List'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
export default class TabComponent extends Component {

    render() {
        return (
            <div>
                <div className="ui one column grid">
                    <div className="three column row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                    </div>
                    <div className="three column row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column" style={{ marginTop: 50 }}>

                            <h1 id="title_header">Setting</h1>
                            <Tabs >
                                <TabList>
                                    <Tab >Service List</Tab>
                                    <Tab >Rate card</Tab>
                                </TabList>

                                <TabPanel>
                                    <ServicesAdd />
                                </TabPanel>

                                <TabPanel>
                                    <RateCardAdd />
                                </TabPanel>

                            </Tabs>

                        </div>
                    </div>
                    <div>

                    </div>
                </div>

            </div>
        )
    }
}