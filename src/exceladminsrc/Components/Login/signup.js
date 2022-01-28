import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var error= false
export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: "",
      password: "",
      email: "",
      mobile: "",
      usernameerror: "",
      passworderror: "",
      emailerror: "",
      mobileerror: "",
  
    }
  }
  onSubmit() {
    // this.validation()
    error=false
    if (this.state.username.length === 0 || this.state.username.length < 4) {
      error= true
      this.setState({
        usernameerror: "User name Must be at least 4 character",
      })
    }
    else if (this.state.password.length === 0 || this.state.password.length < 4) {
      error= true
      this.setState({
        passworderror: "password Must be at least 4 character",
      })
    }
   else if (!(this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))) {
      error = true;
      this.setState({
        emailerror: "Requires valid email",
      })
     
    }
   else if (this.state.mobile.length === 0) {
      error= true
      this.setState({
        mobileerror: "mobile no is Must",
      })
    }
   else
   {
     error=false
     this.setState({
      usernameerror:"",
      passworderror:"",
      emailerror:"",
      mobileerror:""

     })
   }
   
  }

  render() {

    return (
      <div className="body">
        <div className="ui middle aligned center aligned grid">
          <div className="column customcolumn">
            <h2 className="ui image teal header">
              <div className="content">
                New User ? Register Here
            </div>
            </h2>
            <form className="ui form">
              <div className="ui stacked secondary segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="username" placeholder="User Name" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
                  </div>
                </div>
                <div className="field">
                {error?<span style={{color:'red'}}>{this.state.usernameerror}</span>:null}
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
                  </div>
                </div>
                <div className="field">
                {error?<span style={{color:'red'}}>{this.state.passworderror}</span>:null}
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mail  icon"></i>
                    <input type="text" name="email" placeholder="E-mail address" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                  </div> 
                </div>
                <div className="field">
                {error?<span style={{color:'red'}}>{this.state.emailerror}</span>:null}
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="mobile icon"></i>
                    <input type="text" name="mobile" placeholder="Mobile No" value={this.state.mobile} onChange={e => this.setState({ mobile: e.target.value })} />
                  </div>       
                </div>
                <div className="field">
                {error?<span style={{color:'red'}}>{this.state.mobileerror}</span>:null}
                </div>
                <div className="ui fluid large teal submit button" onClick={this.onSubmit}>Signup</div>
              </div>

            </form>
            {/* <div className="ui error message"></div> */}
            <div>
              <pre>
                {JSON.stringify({
                  "Username": this.state.username,
                  "Password": this.state.password,
                  "email": this.state.email,
                  "mobile": this.state.mobile
                })}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


