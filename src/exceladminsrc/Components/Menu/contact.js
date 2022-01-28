import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class Contact extends Component {

    render() {
        return (
            <div> 
        <div className="ui one column grid">
          <div className="three column row">
            <div className="one wide computer one wide tablet one wide mobile column">
            </div>
            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
              <h1 className="ui left aligned header">Contact Edit</h1>
            </div>
            <div className="one wide computer one wide tablet one wide mobile column">
            </div>
          </div>
          <div className="three column row">
            <div className="one wide computer one wide tablet one wide mobile column">
            </div>
            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
              <div className="ui segment" style={{backgroundColor: '#f5f5f5', padding: '0em 0em'}}>
                <form className="ui form">
                  <div className="ui three column stackable grid">
                    <div className="column">
                      <div className="field">
                        <label>User Id</label>
                        <input type="text" name="user-id" placeholder="User Id" />
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label>Password</label>
                        <input type="text" name="password" placeholder="Password" />
                      </div>
                    </div>
                    <div className="three column row">
                      <div className="ten wide column">
                        <button className="ui primary button" type="submit">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>		
            </div>
            <div className="one wide computer one wide tablet one wide mobile column">
            </div>
          </div>
        </div>

      </div>
        )
    }
}