import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { PopulateStateAndCountryDDLQuery,SignUpCustomerUsernameQuery, UserDetailsQuery } from '../Queries/queries';


import { connect } from 'react-redux';
import {ActionToDispatch,ActionToRedirect,checkCurrentUsername,handleSignoutUsername} from '../../../actions'

import {displaySubmitError,displayFieldError,runCheck,minLength10,maxLength10,minValue18,emailCheck,alphaNumericCheck,phoneNumberCheck,numberCheck,requiredCheck,maxLength15,maxLength40,maxLength120,maxLength128,minLength4,maxLength4,minLength2,maxLength2,minLength8,maxLength8} from '../../../components/commoncomponents/validationlib';

var errorval = false
class Profile_Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Firstname: "",
            Lasttname: "",
            Gender: "",
            BusinessOrLowOffice: "",
            Email: "",
            PhoneMobile: "",
            PhoneOther: "",
            UserId: "exuser",
            Password: "",
            RetryPassword: "",
            Address: "",
            City: "",
            Country: "",
            State: "",
            Zipcode: "",
            countryDDL: [],
            stateDDL: [],
            Dispalycomp: false,
            errorFirstname: "",
            errorLasttname: "",
            errorGender: "",
            errorEmail: "",
            errorPhoneMobile: "",
            errorPhoneOther: "",
            errorPassword: "",
            errorRetryPassword: "",
            errorAddress: "",
            errorCity: "",
            errorZipcode: "",
            popupmsg: "",
            formErrors:[],
            formErrorMessage:''
        }
    }



    /*----------------function updates the user details----------------------*/
    async Registeruser() {
        var result = '', errorMessage = '', errors = [];
        console.log('s1 *****');
        this.props.ActionToDispatch({ type: 'AUTH_PENDING' ,payload : ['Signing In'] });
        this.setState({formErrorMessage: 'In process'});



        try {
            console.log('s2 *****');
            result = await execGql('mutation', SignUpCustomerUsernameQuery, this.setRegisterParams())

        }
        catch (err) {
            console.log('s3 *****');
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            console.log('s4 *****');
            console.log(errors);
            console.log(errorMessage);
            try {
                errorval = true
                errorMessage = JSON.parse(errorMessage);
                console.log('s5 *****');
                for (let key in errorMessage) {
                    console.log('s5.1 *****');
                    this.setState({
                        errorFirstname: errorMessage[key].errorFNAME,
                        errorLasttname: errorMessage[key].errorLNAME,
                        errorGender: errorMessage[key].errorUSEX,
                        errorEmail: errorMessage[key].errorUMAIL,
                        errorPhoneMobile: errorMessage[key].errorCELLNO,
                        errorPhoneOther: errorMessage[key].errorPHNO,
                        errorPassword: errorMessage[key].errorPWDRD,
                        errorRetryPassword: errorMessage[key].errorRPPWDRD,
                        errorAddress: errorMessage[key].errorADDR,
                        errorCity: errorMessage[key].errorCITY,
                        errorZipcode: errorMessage[key].errorPINC,
                    });
                    console.log('s5.2 *****');
                    this.props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : errorMessage });
                    this.setState({formErrorMessage: errorMessage}); 
                    this.setState({formErrors : errors}) ; 
                    this.props.ActionToRedirect('/customersignin');
                    console.log('s6 *****');
                }
            }
            catch (e) {
                console.log('s7 *****');
                console.log(e);
             await   this.setState({
                    popupmsg: "User already exists"
                })
                this.showMsg()
                this.props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : errorMessage });
                this.setState({formErrorMessage: errorMessage}); 
                this.setState({formErrors : errors}) ; 
                this.props.ActionToRedirect('/customersignin');
                console.log('s6 *****');
                console.log('s8 *****');
            }

        }
        else {
            console.log('s9 *****');
            console.log(result);

            this.clearscreen();
            await   this.setState({
                popupmsg: "Registration done successfully"
            })
         await   this.showMsg()
         console.log('s10 *****');
         console.log('customer signup result');
         console.log(result.data.UsersAffected);
         console.log('customer signup result end');


         this.setState({formErrorMessage: 'Authenticated'});  
         this.props.ActionToDispatch({ type: 'AUTH_USER' ,payload :  result.data.UsersAffected  });
            this.props.ActionToRedirect('/customerdashboard');

        }
    };
    /*----------------function returns variables for UsersCRUDOpsQuery ----------------------*/
    setRegisterParams() {
        var parameters = {
            "transaction": "CREATE",
            "users": [{
                "CLNT": "1002",
                "LANG": "EN",
                "FNAME": this.state.Firstname,
                "LNAME": this.state.Lasttname,
                "USEX": "M",
                "OFFICENM": this.state.BusinessOrLowOffice,
                "UMAIL": this.state.Email,
                "CELLNO": this.state.PhoneMobile,
                "PHNO": this.state.PhoneMobile,
                "USRID": this.state.Email,
                "PWDRD": this.state.Password,
                "RPPWDRD": this.state.RetryPassword,
                "ADDR": this.state.Address,
                "CITY": this.state.City,
                "STATECD": this.state.State,
                "COUNTRY": this.state.Country,
                "PINC": this.state.Zipcode,
                "USRNM": this.state.Firstname + this.state.Lasttname


            }]
        }
        return parameters
    };

    /*----------------function to navigate to login----------------------*/
    navigateToLogin() {
        return this.props.history.push('/customersignin')
    };

    /*----------------function to navigate to dashboard----------------------*/
    navigateToDashboard() {
        return this.props.history.push('/customerdashboard')
    };

    /*----------------function to clear the form fields----------------------*/
    clearscreen() {
        this.setState({
            Firstname: "",
            Lasttname: "",
            BusinessOrLowOffice: "",
            Gender: "",
            Email: "",
            PhoneMobile: "",
            PhoneOther: "",
            Password: "",
            RetryPassword: "",
            Address: "",
            City: "",
            Country: "",
            State: "",
            Zipcode: "",
            errorFirstname: "",
            errorLasttname: "",
            errorGender: "",
            errorEmail: "",
            errorPhoneMobile: "",
            errorPhoneOther: "",
            errorPassword: "",
            errorRetryPassword: "",
            errorAddress: "",
            errorCity: "",
            errorZipcode: "",
            formErrors:[],
            formErrorMessage:''
        })
    }


    //.........For Show Popup MessageBox after updating user................
    showMsg() {
console.log('showMsg ***');
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    render() {



        
  if(this.state.formErrorMessage=='In process')
  return(
  
    <div className="ui icon header">
                      <div className="ui active loader"></div>
                      <div id="snackbar">  <i className="info circle icon"></i> {this.state.popupmsg}</div>
                  </div>
  )
  
  


        return (



            
            <div className="ui one column grid">

                <div className=" row">

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                    <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                        <h1 id="title_header" style={{ color: "#fff" }}>CREATE YOUR ACCOUNT</h1>
                    </div>

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                </div>

                <div className=" row">

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                    <div className="ten wide computer ten wide tablet ten wide mobile column">

                        <div className="ui segment" >

                            <div className="ui form">

                                <div className="ui  stackable grid">
                                    <div className=" row">
                                        <div className="seven wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorFirstname ? 'brown' : null }}>First Name</label>
                                                <div className="ui right icon input">
                                                    <i className="user icon"></i>
                                                    <input type="text" name="firstname" placeholder="First Name" value={this.state.Firstname} onChange={e => this.setState({ Firstname: e.target.value })}
                                                        style={{ borderColor: this.state.errorFirstname ? 'brown' : null, backgroundColor: this.state.errorFirstname ? '#f3ece7' : null }} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorFirstname}</span> : null}
                                            </div>
                                        </div>

                                        <div className=" seven wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorLasttname ? 'brown' : null }}>Last Name</label>
                                                <div className="ui right icon input">
                                                    <i className="user icon"></i>
                                                    <input type="text" name="lastname" placeholder="Last Name" value={this.state.Lasttname} onChange={e => this.setState({ Lasttname: e.target.value })}
                                                        style={{ borderColor: this.state.errorLasttname ? 'brown' : null, backgroundColor: this.state.errorLasttname ? '#f3ece7' : null }} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorLasttname}</span> : null}
                                            </div>
                                        </div>

                                        {/* <div className=" five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorGender ? 'brown' : null }}>Gender</label>
                                                    <select className="" value={this.state.Gender} onChange={e => this.setState({ Gender: e.target.value })}
                                                        style={{ borderColor: this.state.errorGender ? 'brown' : null, backgroundColor: this.state.errorGender ? '#f3ece7' : null }}>
                                                        <option value="">select</option>
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorGender}</span> : null}
                                                </div>
                                            </div> */}

                                    </div>

                                    <div className="row">
                                        <div className="fourteen wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorBusinessOrLowOffice ? 'brown' : null }}>  Business or Law Office </label>
                                                <div className="ui right icon input">
                                                    <i className="suitcase icon"></i>
                                                    <input style={{ borderColor: this.state.errorBusinessOrLowOffice ? 'brown' : null, backgroundColor: this.state.errorBusinessOrLowOffice ? '#f3ece7' : null }}
                                                        type="text" name="business_office" placeholder="Business/Office Name" value={this.state.BusinessOrLowOffice} onChange={e => this.setState({ BusinessOrLowOffice: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorBusinessOrLowOffice}</span> : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" row">
                                        <div className="seven wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorEmail ? 'brown' : null }}>E-mail</label>
                                                <div className="ui right icon input">
                                                    <i className="mail icon"></i>
                                                    <input type="text" name="email" placeholder="E-mail" value={this.state.Email} onChange={e => this.setState({ Email: e.target.value })}
                                                        style={{ borderColor: this.state.errorEmail ? 'brown' : null, backgroundColor: this.state.errorEmail ? '#f3ece7' : null }} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorEmail}</span> : null}
                                            </div>
                                        </div>

                                        <div className="seven wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorPhoneMobile ? 'brown' : null }}>Phone</label>
                                                <div className="ui right icon input">
                                                    <i className="mobile icon"></i>
                                                    <input type="text" name="phonemobile" placeholder="Phone" value={this.state.PhoneMobile} onChange={e => this.setState({ PhoneMobile: e.target.value })}
                                                        style={{ borderColor: this.state.errorPhoneMobile ? 'brown' : null, backgroundColor: this.state.errorPhoneMobile ? '#f3ece7' : null }} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorPhoneMobile}</span> : null}
                                            </div>
                                        </div>

                                        {/* <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPhoneOther ? 'brown' : null }}>Phone(Other)</label>
                                                    <div className="ui right icon input">
                                                        <i className="call icon"></i>
                                                        <input type="text" name="phoneother" placeholder="Phone(Other)" value={this.state.PhoneOther} onChange={e => this.setState({ PhoneOther: e.target.value })}
                                                            style={{ borderColor: this.state.errorPhoneOther ? 'brown' : null, backgroundColor: this.state.errorPhoneOther ? '#f3ece7' : null }} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPhoneOther}</span> : null}
                                                </div>
                                            </div> */}
                                    </div>


                                    <div className=" row">
                                        {/* <div className="five wide column">
                                                <div className="field">
                                                    <label>User Id</label>
                                                    <input type="text" name="userid" placeholder="User Id" value={this.state.UserId} onChange={e => this.setState({ UserId: e.target.value })} disabled />
                                                </div>
                                            </div> */}

                                        <div className="seven wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorPassword ? 'brown' : null }}>Password</label>
                                                <input type="password" name="Password" placeholder="Password" value={this.state.Password} onChange={e => this.setState({ Password: e.target.value })}
                                                    style={{ borderColor: this.state.errorPassword ? 'brown' : null, backgroundColor: this.state.errorPassword ? '#f3ece7' : null }} />
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorPassword}</span> : null}
                                            </div>
                                        </div>

                                        <div className="seven wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorRetryPassword ? 'brown' : null }}>Retry Password</label>
                                                <input type="password" name="faxno" placeholder="Retry Password" value={this.state.RetryPassword} onChange={e => this.setState({ RetryPassword: e.target.value })}
                                                    style={{ borderColor: this.state.errorRetryPassword ? 'brown' : null, backgroundColor: this.state.errorRetryPassword ? '#f3ece7' : null }} />
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorRetryPassword}</span> : null}
                                            </div>
                                        </div>
                                    </div>




                                    {/* <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorAddress ? 'brown' : null }}>Address</label>
                                                    <input type="text" name="address" placeholder="Address" value={this.state.Address} onChange={e => this.setState({ Address: e.target.value })}
                                                        style={{ borderColor: this.state.errorAddress ? 'brown' : null, backgroundColor: this.state.errorAddress ? '#f3ece7' : null }} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorAddress}</span> : null}
                                                </div>
                                            </div>

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCity ? 'brown' : null }}>City</label>
                                                    <input type="text" name="City" placeholder="City" value={this.state.City} onChange={e => this.setState({ City: e.target.value })}
                                                        style={{ borderColor: this.state.errorCity ? 'brown' : null, backgroundColor: this.state.errorCity ? '#f3ece7' : null }} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCity}</span> : null}
                                                </div>
                                            </div>

                                        </div> */}


                                    {/* <div className=" row">

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label>Country</label>
                                                    <select value={this.state.Country} onChange={e => this.setState({ Country: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.countryDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}

                                                    </select>

                                                </div>
                                            </div>

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label>State</label>
                                                    <select value={this.state.State} onChange={e => this.setState({ State: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.stateDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorZipcode ? 'brown' : null }}>Zip Code</label>
                                                    <input type="text" name="zipcode" placeholder="Zip Code" value={this.state.Zipcode} onChange={e => this.setState({ Zipcode: e.target.value })}
                                                        style={{ borderColor: this.state.errorZipcode ? 'brown' : null, backgroundColor: this.state.errorZipcode ? '#f3ece7' : null }} />
                                                </div>
                                                <div className="field">
                                     {errorval ? <span id="errorspan">{this.state.errorZipcode}</span> : null}
                                                </div>
                                            </div>

                                        </div> */}

                                    <div className=" row">
                                        <div className="ten wide column">
                                            <button className="ui primary button" type="submit" onClick={() => this.Registeruser()}>Save</button>
                                            <button className="ui  button" type="submit" onClick={() => this.clearscreen()}>Clear</button>
                                            <button className="ui  button" type="submit" onClick={() => this.navigateToLogin()}>Back To Login</button>
                                        </div>
                                        
                                    </div>
                                    <div className=" row">
                                    { displaySubmitError(this.state.formErrorMessage) }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                </div>
                {/* -- popup after updating user-- */}
                <div id="snackbar">  <i className="info circle icon"></i> {this.state.popupmsg}</div>

            </div>

        )


    }
}




const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated,
      authprocess: state.auth.authprocess,
      authuser: state.auth.authuser,
    };
  };
  
  export default connect(
    mapStateToProps,
    { ActionToDispatch,ActionToRedirect
     }
  )(Profile_Add);
  
  