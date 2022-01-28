import React, { Component } from 'react';
//import 'react-tabs/style/react-tabs.css'
import BillableHrs from './BillableHrs';
import BilledHrs from './BilledHrs';
import Invoice from './Invoice';
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
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column"style={{ marginTop: 50 }}>
   
                                    <Tabs >
                                        <TabList>
                                            <Tab >Billable Hours</Tab>
                                            <Tab >Invoice</Tab>
                                            <Tab >Billed Hours</Tab>
                                        </TabList>

                                        <TabPanel>
                                            <BillableHrs />
                                        </TabPanel>

                                        <TabPanel>
                                            <Invoice />
                                        </TabPanel>

                                        <TabPanel>
                                            <BilledHrs />
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