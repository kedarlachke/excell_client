import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Signup extends Component {
  constructor(props) {
    super(props)
  
  }
  
  render() {

    return (
        <div className="body">
        <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h2 className="ui image teal header">
            <div className="content">
              New User ? Register Here 
            </div>
          </h2>
          <form className="ui large form">
            <div className="ui stacked secondary segment">
            <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input type="text" name="username" placeholder="User Name"/>
                </div>
              </div>
            <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input type="password" name="password" placeholder="Password"/>
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="mail  icon"></i>
                  <input type="text" name="email" placeholder="E-mail address"/>
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="mobile icon"></i>
                  <input type="text" name="mobile" placeholder="Mobile No"/>
                </div>
              </div>
              <div className="ui fluid large teal submit button">Signup</div>
            </div>
          </form>

          
        </div>
      </div>
      </div>
    );
  }
}

export default Signup
