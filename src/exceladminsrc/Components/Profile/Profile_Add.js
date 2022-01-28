import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { PopulateStateAndCountryDDLQuery, UsersCRUDOpsQuery, UserDetailsQuery } from '../Queries/queries';
import { connect } from 'react-redux';
import {ActionToDispatch,ActionToRedirect,checkCurrentUsername,handleSignoutUsername} from '../../../actions'
var errorval = false
 class Profile_Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Firstname: "",
            Lasttname: "",
            Gender: "",
            Email: "",
            PhoneMobile: "",
            PhoneOther: "",
            UserId: "",
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
        }
    }
    componentDidMount() {

        
        this.populateDDL()
        this.populateData()
    }


    componentWillMount() 
    {
        var result='',errorMessage='',errors=[];
        !this.props.Userid? checkCurrentUsername((err,result) =>
        {
                if(!err){
                if(!result)
                {
                    this.props.ActionToDispatch({ type: 'UNAUTH_USER' ,payload : [''] });
                   
                }
                else
                {
                   this.props.ActionToDispatch({ type: 'AUTH_USER' ,payload : result});
                }   
                 }
            }
       
       
        ):null
  }
    /*----------------function for populating state and country DDL----------------------*/
    async populateDDL() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', PopulateStateAndCountryDDLQuery, this.setDropdownParams())
            //console.log(result);
        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            console.log(errors);
            console.log(errorMessage);

        }
        else {
            // console.log(result);
            this.setState({ countryDDL: result.data.COUNTRIES, stateDDL: result.data.STATES })

        }

    };

    /*----------------function returns variables for PopulateStateAndCountryDDLQuery----------------------*/
    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters
    };

    /*----------------function populates the form fields when the form loads----------------------*/
    async populateData() {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', UserDetailsQuery, this.setpopulateDataParams())
        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            console.log(errors);
            console.log(errorMessage);
        }
        else {
            console.log('result');
            console.log(result);
            console.log('result');
            if(result.data.userDetails.length!=0)
            {
            this.setState({
                Firstname: result.data.userDetails[0].FNAME,
                Lasttname: result.data.userDetails[0].LNAME,
                Gender: result.data.userDetails[0].USEX,
                Email: result.data.userDetails[0].UMAIL,
                PhoneMobile: result.data.userDetails[0].CELLNO,
                PhoneOther: result.data.userDetails[0].PHNO,
                UserId: result.data.userDetails[0].USRID,
                Address: result.data.userDetails[0].ADDR,
                City: result.data.userDetails[0].CITY,
                State: result.data.userDetails[0].STATECD,
                Country: result.data.userDetails[0].COUNTRY,
                Zipcode: result.data.userDetails[0].PINC,
                Dispalycomp: true
            });
        }
        else{
            this.setState({Dispalycomp: true});
        }
        }
    };

    /*----------------function returns variables for UserDetailsQuery ----------------------*/
    setpopulateDataParams() {

    console.log('this.props.authuser.email');
    console.log(this.props.authuser.username); 
    console.log('this.props.authuser.email');
    
       let userid = this.props.Userid ? this.props.Userid : this.props.authuser.username
    
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "USRID": userid
        }
        return parameters
    };

    /*----------------function updates the user details----------------------*/
    async Updateuser() {
        var result = '', errorMessage = '', errors = [];
        try {
            console.log('update');
            result = await execGql('mutation', UsersCRUDOpsQuery, this.setUpdateParams())

        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            //  console.log(errors);
            //   console.log(errorMessage);
            errorval = true
            errorMessage = JSON.parse(errorMessage);
            for (let key in errorMessage) {

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
            }
        }
        else {
            console.log(result);
            this.clearscreen();
            this.populateData();
            this.showMsg()

        }
    };
    /*----------------function returns variables for UsersCRUDOpsQuery ----------------------*/
    setUpdateParams() {
        var parameters = {
            "transaction": "UPDATE",
            "users": [{
                "CLNT": "1002",
                "LANG": "EN",
                "FNAME": this.state.Firstname,
                "LNAME": this.state.Lasttname,
                "USEX": this.state.Gender,
                "UMAIL": this.state.Email,
                "CELLNO": this.state.PhoneMobile,
                "PHNO": this.state.PhoneOther,
                "USRID": this.state.UserId,
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

    /*----------------function to navigate to dashboard----------------------*/
    navigateToDashBoard() {

        if(this.props.Userid)
        {
            return this.props.history.push('/customerdashboard')
        }
        else{
            return this.props.history.push('/dashboard')
           
        }
       
    };

    /*----------------function to clear the form fields----------------------*/
    clearscreen() {
        this.setState({
            Firstname: "",
            Lasttname: "",
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
        })
    }


    //.........For Show Popup MessageBox after updating user................
    showMsg() {

        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    render() {

        if (this.state.Dispalycomp) {
            return (

                <div className="ui one column grid">

                    <div className=" row">

                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>

                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <h1 id="title_header">PROFILE</h1>
                        </div>

                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>

                    </div>

                    <div className=" row">

                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>

                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">

                            <div className="ui segment" >

                                <div className="ui form">

                                    <div className="ui  stackable grid">
                                        <div className=" row">
                                            <div className="five wide column">
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

                                            <div className=" five wide column">
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

                                            <div className=" five wide column">
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
                                            </div>

                                        </div>

                                        <div className=" row">
                                            <div className="five wide column">
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

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPhoneMobile ? 'brown' : null }}>Phone(Mobile)</label>
                                                    <div className="ui right icon input">
                                                        <i className="mobile icon"></i>
                                                        <input type="text" name="phonemobile" placeholder="Phone(Mobile)" value={this.state.PhoneMobile} onChange={e => this.setState({ PhoneMobile: e.target.value })}
                                                            style={{ borderColor: this.state.errorPhoneMobile ? 'brown' : null, backgroundColor: this.state.errorPhoneMobile ? '#f3ece7' : null }} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPhoneMobile}</span> : null}
                                                </div>
                                            </div>

                                            <div className="five wide column">
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
                                            </div>
                                        </div>


                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label>User Id</label>
                                                    <input type="text" name="userid" placeholder="User Id" value={this.state.UserId} onChange={e => this.setState({ UserId: e.target.value })} disabled />
                                                </div>
                                            </div>

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPassword ? 'brown' : null }}>Password</label>
                                                    <input type="password" name="Password" placeholder="Password" value={this.state.Password} onChange={e => this.setState({ Password: e.target.value })}
                                                        style={{ borderColor: this.state.errorPassword ? 'brown' : null, backgroundColor: this.state.errorPassword ? '#f3ece7' : null }} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPassword}</span> : null}
                                                </div>
                                            </div>

                                            <div className="five wide column">
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




                                        <div className=" row">
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

                                        </div>


                                        <div className=" row">

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

                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => this.Updateuser()}>Save</button>
                                                <button className="ui  button" type="submit" onClick={() => this.clearscreen()}>Clear</button>
                                                <button className="ui  button" type="submit" onClick={() => this.navigateToDashBoard()}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                    </div>
                    {/* -- popup after updating user-- */}
                    <div id="snackbar">  <i className="info circle icon"></i> User updated successfully.</div>
                    <div className="ui message">
                        {/* <pre>
                            {JSON.stringify({
                                "Firstname": this.state.Firstname,
                                "Lasttname": this.state.Lasttname,
                                "Gender": this.state.Gender,
                                "Email": this.state.Email,
                                "PhoneMobile": this.state.PhoneMobile,
                                "PhoneOther": this.state.PhoneOther,
                                "UserId": this.state.UserId,
                                "Password": this.state.Password,
                                "RetryPassword": this.state.RetryPassword,
                                "Address": this.state.Address,
                                "City": this.state.City,
                                "Country": this.state.Country,
                                "State": this.state.State,
                                "Zipcode": this.state.Zipcode,
                            })}
                        </pre> */}
                    </div>
                </div>

            )
        }
        else {
            return (
                <div className="ui icon header" style={{ marginTop: 300 }}>
                    <div className="ui active loader"></div>
                </div>
            );
        }
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