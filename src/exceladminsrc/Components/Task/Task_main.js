import React, { Component } from 'react';
import TaskList from './Task_ListAssigned'
import { Link } from "react-router-dom";
export default class Task_Main extends Component {
    render() {
        return (
            <div>
                <div className="ui one column grid">
                    <div className="three column row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <h1 id="title_header"> Task List</h1>

                            <div className="icode"id="title_header">
                                <Link to={'/addtask'} style={{ color: '#151515' }}>  <i id="iconbar"  className="plus icon"></i></Link>
                                <i id="iconbar"  className="arrow down icon"></i>
                                <i id="iconbar" className="search icon"></i>
                            </div>

                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                    </div>
                    <div className="three column row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <div id="cus_segment" className="ui segment">
                                <div className="ui form">
                                    <TaskList  />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

            </div>

        );
    }
}