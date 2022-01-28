import React, { Component } from 'react';
import Task_ListAssigned from '../Task_ListAssigned'
import Task_MyTaskList from '../Task_MyTaskList'
//import 'react-tabs/style/react-tabs.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
export default class TabComponent extends Component {
    render() {
        return (
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

                        {/* <h1 id="title_header">Tasks</h1> */}
                <Tabs defaultIndex={this.props.location.pathname=='/tasks'?0:1} >
                    <TabList>
                        <Tab  >Assigned Task</Tab>
                        <Tab >My Task</Tab>

                    </TabList>

                    <TabPanel >
                        <Task_ListAssigned/>
                    </TabPanel>

                    <TabPanel>
                        < Task_MyTaskList/>
                    </TabPanel>

                </Tabs>
         
                </div>
                    </div>
                    <div>

                    </div>
                </div>

            
        )
    }
}