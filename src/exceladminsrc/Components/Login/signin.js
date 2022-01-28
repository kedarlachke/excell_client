import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from '../DashBoard/dashBoard'
export default class Signin extends React.Component {
	constructor(props) {
		super(props)
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			username: "",
			password: "",
			check: false,

		}
	}

	handleInputChange() {
		this.setState({
			check: !this.state.check
		})
	}
	render() {
		return (
		
				<div className="ui one column grid">
					<div className="three column row">
						<div className="one wide computer one wide tablet one wide mobile column">

						</div>
						<div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
							<h1 className="ui center aligned header">User Sign In</h1>
						</div>
						<div className="one wide computer one wide tablet one wide mobile column">

						</div>
					</div>


					<div className="three column row">
						<div className="four wide computer three wide tablet one wide mobile column">


						</div>
						<div className="eight wide computer ten wide tablet fourteen wide mobile column">
							<div className="ui segment" style={{ backgroundColor: '#f5f5f5', padding: '0em 0em', }}>
								<form className="ui form">
									<div className="ui one column stackable grid">
										<div className="column">
											<div className="field">
												<label>User Name</label>
												<div className="ui left icon input">
													<i className="mail icon"></i>
													<input type="text" name="UserName" placeholder="User Name" value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
												</div>
											</div>
										</div>
										<div className="column">
											<div className="field">
												<label>Password</label>
												<div className="ui left icon input">
													<i className="lock icon"></i>
													<input type="text" name="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />
												</div>
											</div>
										</div>
										<div className="three column row">
											<div className="ten wide column">
												<div className="field">
													<div className="ui checkbox">
														<input type="checkbox"
															checked={this.state.check} onChange={this.handleInputChange} />
														<label style={{ fontSize: 13 }}>I agree to the Terms and Conditions</label>
													</div>
												</div>
											</div>

											<div className="six wide right aligned column">
												<a href="#">Forgot password?</a>
											</div>
										</div>
										<div className="three column row">
											<div className="three wide column">

											</div>
											<div className="ten wide column">
												<Link to={'/Dashboard'}>	<button className="ui primary fluid button" type="submit">Submit</button></Link>
											</div>
											<div className="three wide column">

											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="four wide computer three wide tablet one wide mobile column">

						</div>
						
						<div className=" ui message">

							{JSON.stringify({
								"Username": this.state.username,
								"Password": this.state.password,
								"Checked":this.state.check
							})}

						</div>
					</div>
					
				</div>
		
		)
	}
}