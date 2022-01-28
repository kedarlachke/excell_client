import React, { Component } from 'react';
//import { Link } from "react-router-dom";
import { ClientCRUDOps, clientDetails, DDLAddCustomer } from '../Queries/queries'
import { execGql,pCLNT,pLANG } from "../apolloClient/apolloClient";

export default class CustomerEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tcode: "CREATE",
            fName: '',
            lName: '',
            officeName: '',
            email: '',
            phoneNo: '',
            faxNo: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            bestMethodOfCntct: '',
            bestTimeToCall: '',
            stateDDL: [],
            bestMethodCntctDDL: [],
            bestTimeCallDDL: [],
            errorFirstname: '',
            errorLastname: '',
            errorEmail: '',
            errorPhoneno: '',
            isError: false,
            showLoading: true,
            OnClickButton: '',
            showMsgText: ''
        }
        this.gotoCaseType = this.props.gotoCaseType.bind(this)
    }

    componentDidMount() {
        this.populateDDL()
        if (this.props.data) {
            this.setState({
                showLoading: !this.state.showLoading
            });
            this.populateData()
        }
    };

    // To Fetch DropDwon Values
    async populateDDL() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log("DropdownLeads");
            // console.log(this.setCreateParams());
            result = await execGql('query', DDLAddCustomer, this.setDropdownParams())
            // console.log(result);
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

            //console.log(result);
            this.setState({
                stateDDL: result.data.STATES,
                bestMethodCntctDDL: result.data.BEST_METHOD_OF_CONTACT,
                bestTimeCallDDL: result.data.BEST_TIME_TO_CALL
            })
        }

    }

    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters

    };

    // Fetch Data When EDIT Mode
    async populateData() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log("DropdownLeads");
            // console.log(this.setCreateParams());
            result = await execGql('query', clientDetails, this.setPopulateDataParams())
            // console.log(result);
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

            //console.log(result);
            this.setState({
                tcode: "UPDATE",
                fName: result.data.clientDetails[0].FIRSTNM,
                lName: result.data.clientDetails[0].LASTNM,
                officeName: result.data.clientDetails[0].OFFICENM,
                email: result.data.clientDetails[0].EMAILID,
                phoneNo: result.data.clientDetails[0].PHONE,
                faxNo: result.data.clientDetails[0].FAX,
                address: result.data.clientDetails[0].ADDRESS,
                city: result.data.clientDetails[0].CITY,
                state: result.data.clientDetails[0].STATE,
                zipCode: result.data.clientDetails[0].ZIPCD,
                bestMethodOfCntct: result.data.clientDetails[0].MODOFCON,
                bestTimeToCall: result.data.clientDetails[0].BESTTMCAL,
                showLoading: !this.state.showLoading
            })
        }

    }

    setPopulateDataParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CLNTID": this.props.data.data.CLNTID
        }
        return parameters

    }

    // To Craete Client
    async createClient() {
        var result = '', errorMessage = '', errors = [];
        try {
            //console.log(this.setCreateCustomerParams());
            result = await execGql('mutation', ClientCRUDOps, this.setCreateClientParams())

        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            console.log(errors);
            console.log(errorMessage);

            errorMessage = JSON.parse(errorMessage);
            for (let key in errorMessage) {

                this.setState({
                    isError: true,
                    errorFirstname: errorMessage[key].errorFIRSTNM,
                    errorLastname: errorMessage[key].errorLASTNM,
                    errorEmail: errorMessage[key].errorEMAILID,
                    errorPhoneno: errorMessage[key].errorPHONE
                });
            }
        }
        else {

            console.log(result.data.ClientsAffected[0]);
            //this.navigateToCustomerList()
            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Clients Details Accepted ..!!")
                this.setState({
                    errorFirstname: '',
                    errorLastname: '',
                    errorEmail: '',
                    errorPhoneno: '',
                    isError: false,
                })
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                // this.showMsg("Clients Details Accepted ..!!")
                this.gotoCaseType(result.data.ClientsAffected[0])
            }
        }

    }

    setCreateClientParams() {
        var parameters = {
            "transaction": "CREATE",
            "clients":
                [
                    {
                        "CLNT": "1002",
                        "LANG": "EN",
                        "FIRSTNM": this.state.fName,
                        "LASTNM": this.state.lName,
                        "OFFICENM": this.state.officeName,
                        "EMAILID": this.state.email,
                        "PHONE": this.state.phoneNo,
                        "FAX": this.state.faxNo,
                        "ADDRESS": this.state.address,
                        "CITY": this.state.city,
                        "STATE": this.state.state,
                        "ZIPCD": this.state.zipCode,
                        "MODOFCON": this.state.bestMethodOfCntct,
                        "BESTTMCAL": this.state.bestTimeToCall
                    }
                ]
        }
        return parameters

    };

    //To Update Client
    async UpdateClient() {
        var result = '', errorMessage = '', errors = [];
        try {
            //console.log(this.setUpdateParams());
            result = await execGql('mutation', ClientCRUDOps, this.setUpdateClientParams())
            // console.log(result);
        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            console.log(errors);
            console.log(errorMessage);
            errorMessage = JSON.parse(errorMessage);
            for (let key in errorMessage) {

                this.setState({
                    isError: true,
                    errorFirstname: errorMessage[key].errorFIRSTNM,
                    errorEmail: errorMessage[key].errorCMAIL,
                    errorPhoneno: errorMessage[key].errorPHNO
                });
            }
        }
        else {
            //  console.log(result.data.ClientsAffected[0]);
            //this.navigateToList()
            //this.gotoCaseType(result.data.ClientsAffected[0])
            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Clients Details Updated..!!")
                this.setState({
                    errorFirstname: '',
                    errorLastname: '',
                    errorEmail: '',
                    errorPhoneno: '',
                    isError: false,
                })
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                this.gotoCaseType(result.data.ClientsAffected[0])
            }
        }

    };

    setUpdateClientParams() {
        var parameters = {
            "transaction": "UPDATE",
            "clients": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CLNTID": this.props.data.data.CLNTID,
                    "FIRSTNM": this.state.fName,
                    "LASTNM": this.state.lName,
                    "OFFICENM": this.state.officeName,
                    "EMAILID": this.state.email,
                    "PHONE": this.state.phoneNo,
                    "FAX": this.state.faxNo,
                    "ADDRESS": this.state.address,
                    "CITY": this.state.city,
                    "STATE": this.state.state,
                    "ZIPCD": this.state.zipCode,
                    "MODOFCON": this.state.bestMethodOfCntct,
                    "BESTTMCAL": this.state.bestTimeToCall
                }
            ]
        }
        return parameters

    };

    //CRUD Operations

    CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            this.createClient()
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateClient()

        }
    };

    // To Clear Screen

    clearscreen() {
        this.setState({
            tcode: "CREATE",
            fName: '',
            lName: '',
            officeName: '',
            email: '',
            phoneNo: '',
            faxNo: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            bestMethodOfCntct: '',
            bestTimeToCall: '',
            errorFirstname: '',
            errorLastname: '',
            errorEmail: '',
            errorPhoneno: '',
            isError: false,
        })
    };

    // Navigate To List
    navigateToList() {
        return this.props.history.push('/cases');
    };

    //............for show msg..........
    async showMsg(text) {
        await this.setState({ showMsgText: text })
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    render() {
        console.log(this.state.OnClickButton);

        if (this.state.showLoading) {
            return (
                
                    <div className="ui one column grid">
                        <div className="three column row">
                            {/* <div className="one wide computer one wide tablet one wide mobile column">
                            </div> */}
                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <div className="ui segment" >
                                    <div className="ui form">
                                        <div className="ui three column stackable grid">
                                            <div className="row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorFirstname ? 'brown' : null }}>First Name</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input type="text" name="firstname" placeholder="First Name"
                                                                style={{ borderColor: this.state.errorFirstname ? 'brown' : null, backgroundColor: this.state.errorFirstname ? '#f3ece7' : null }}
                                                                value={this.state.fName}
                                                                onChange={e => this.setState({ fName: e.target.value })} />
                                                        </div>
                                                        <div className="field">
                                                            {this.state.isError ? <span id="errorspan">{this.state.errorFirstname}</span> : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorLastname ? 'brown' : null }}>Last Name</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input type="text" name="lastname" placeholder="Last Name"
                                                                style={{ borderColor: this.state.errorLastname ? 'brown' : null, backgroundColor: this.state.errorLastname ? '#f3ece7' : null }}
                                                                value={this.state.lName}
                                                                onChange={e => this.setState({ lName: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {this.state.isError ? <span id="errorspan">{this.state.errorLastname}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="three column row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label>Business Or Law Office</label>
                                                        <div className="ui right icon input">
                                                            <i className="suitcase icon"></i>
                                                            <input type="text" name="business_office" placeholder="Business/Office Name"
                                                                value={this.state.officeName}
                                                                onChange={e => this.setState({ officeName: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="three column row">
                                                <div className="four wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorEmail ? 'brown' : null }}>E-mail</label>
                                                        <div className="ui right icon input">
                                                            <i className="mail icon"></i>
                                                            <input type="text" name="email" placeholder="E-mail"
                                                                style={{ borderColor: this.state.errorEmail ? 'brown' : null, backgroundColor: this.state.errorEmail ? '#f3ece7' : null }}
                                                                value={this.state.email}
                                                                onChange={e => this.setState({ email: e.target.value })} />
                                                        </div>
                                                        <div className="field">
                                                            {this.state.isError ? <span id="errorspan">{this.state.errorEmail}</span> : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="three wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorPhoneno ? 'brown' : null }}>Phone Number</label>
                                                        <div className="ui right icon input">
                                                            <i className="call icon"></i>
                                                            <input type="text" name="phoneno" placeholder="Phone Number"
                                                                style={{ borderColor: this.state.errorPhoneno ? 'brown' : null, backgroundColor: this.state.errorPhoneno ? '#f3ece7' : null }}
                                                                value={this.state.phoneNo}
                                                                onChange={e => this.setState({ phoneNo: e.target.value })} />
                                                        </div>
                                                        <div className="field">
                                                            {this.state.isError ? <span id="errorspan">{this.state.errorPhoneno}</span> : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="three wide column">
                                                    <div className="field">
                                                        <label>Fax Number</label>
                                                        <div className="ui right icon input">
                                                            <i className="fax icon"></i>
                                                            <input type="text" name="faxno" placeholder="Fax Number"
                                                                value={this.state.faxNo}
                                                                onChange={e => this.setState({ faxNo: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="three column row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label>Address</label>
                                                        <div className="ui right icon input">
                                                            <i className="home icon"></i>
                                                            <input type="text" name="address" placeholder="Address"
                                                                value={this.state.address}
                                                                onChange={e => this.setState({ address: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="three column row">
                                                <div className="four wide column">
                                                    <div className="field">
                                                        <label>City</label>
                                                        <input type="text" name="city" placeholder="City"
                                                            value={this.state.city}
                                                            onChange={e => this.setState({ city: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="three wide column">
                                                    <div className="field">
                                                        <label>State</label>
                                                        <select className=""
                                                            value={this.state.state}
                                                            onChange={e => this.setState({ state: e.target.value })}>
                                                            <option value="">Select</option>
                                                            {this.state.stateDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="three wide column">
                                                    <div className="field">
                                                        <label>Zip Code</label>
                                                        <input type="text" name="zipcode" placeholder="Zip Code"
                                                            value={this.state.zipCode}
                                                            onChange={e => this.setState({ zipCode: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="three column row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label>Best Method Of Contact</label>
                                                        <select className=""
                                                            value={this.state.bestMethodOfCntct}
                                                            onChange={e => this.setState({ bestMethodOfCntct: e.target.value })}>
                                                            <option value="">Select</option>
                                                            {this.state.bestMethodCntctDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label>Best Time To Call</label>
                                                        <select className=""
                                                            value={this.state.bestTimeToCall}
                                                            onChange={e => this.setState({ bestTimeToCall: e.target.value })}>
                                                            <option value="">Select</option>
                                                            {this.state.bestTimeCallDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* -- popup after changing status-- */}
                                            <div id="snackbar">  <i className="info circle icon"></i>{this.state.showMsgText}</div>
                                            <div className="row">
                                                <div className="ten wide column">
                                                    <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                                    <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                                    <button className="ui  button" type="clear" onClick={() => this.clearscreen()}>Clear</button>
                                                    <button className="ui  button" type="submit" onClick={() => this.navigateToList()}>Cancel</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                        </div>
                    </div>
               
            );
        }
        else {
            return (
                <div className="ui icon header">
                    <div className="ui active loader"></div>
                </div>
            );
        }
    }
}