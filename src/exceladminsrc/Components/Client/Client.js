import React, { Component } from 'react';
import { ClientCRUDOps, clientDetails, DDLAddCustomer } from '../Queries/queries'
import { execGql } from "../apolloClient/apolloClient";
export default class CustomerEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CLNTID: "",
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
            errorADDRESS: '',
            errorCITY: '',
            errorOFFICENM: '',
            isError: false,
            showLoading: false,
            OnClickButton: '',
            showMsgText: ''
        }
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
        this.showMsg = this.props.showMsg.bind(this);

    }

    async componentDidMount() {
        this.populateDDL()

        // Populate Data When Edit Mode
        if (this.props.data) {
            await this.setState({ showLoading: true });
            this.populateData(this.props.data.data.CLNTID);
        };


        // Populate Data when back to Client tab
        if (this.props.CLIENTID) {
            await this.setState({ showLoading: true });
            this.populateData(this.props.CLIENTID);
        }
    };

    // To Fetch DropDwon Values
    async populateDDL() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', DDLAddCustomer, this.setDropdownParams())
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
    async populateData(clntid) {
        var result = '', errorMessage = '', errors = [];
        try {
            console.log(this.setPopulateDataParams(clntid));
            result = await execGql('query', clientDetails, this.setPopulateDataParams(clntid))
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
            console.log(result);
            if (result.data.clientDetails.length != 0) {

                await this.setState({
                    showLoading: !this.state.showLoading
                });
                this.setState({
                    CLNTID: result.data.clientDetails[0].CLNTID,
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
                    tcode: "UPDATE",
                    showLoading: false
                });
            }
        }

    }

    setPopulateDataParams(clntid) {
        var Client_Id = ''
        if (this.props.CLIENTID || this.props.data) Client_Id = clntid
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "EMAILID": this.state.email,
            "CLNTID": Client_Id
        }
        return parameters

    };

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

            try {
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {

                    this.setState({
                        isError: true,
                        errorFirstname: errorMessage[key].errorFIRSTNM,
                        errorLastname: errorMessage[key].errorLASTNM,
                        errorEmail: errorMessage[key].errorEMAILID,
                        errorPhoneno: errorMessage[key].errorPHONE,
                        errorADDRESS: errorMessage[key].errorADDRESS,
                        errorCITY: errorMessage[key].errorCITY,
                        errorOFFICENM: errorMessage[key].errorOFFICENM,
                    });
                }
            } catch (error) {
                console.log(error);

            }

        }
        else {
            //console.log('result 1');
            //console.log(result);

            await this.setState({ CLNTID: result.data.ClientsAffected[0] })
            //     console.log('result 2');
            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Clients Details Accepted ..!!", false)
                this.setState({
                    errorFirstname: '',
                    errorLastname: '',
                    errorEmail: '',
                    errorPhoneno: '',
                    isError: false,
                });

                await this.setState({ showLoading: true });
                this.populateData(this.state.CLNTID);
                this.gotoCaseType(false, this.state.CLNTID, null, this.state.fName);

            }

            else if (this.state.OnClickButton == 'Save&Continue') {
                this.showMsg("Clients Details Accepted ..!!", false);
                this.setState({
                    errorFirstname: '',
                    errorLastname: '',
                    errorEmail: '',
                    errorPhoneno: '',
                    isError: false,
                });

                this.populateData(this.state.CLNTID);
                this.gotoCaseType(true, this.state.CLNTID, null, this.state.fName);
            }
        }

    };

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
            try {
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {

                    this.setState({
                        isError: true,
                        errorFirstname: errorMessage[key].errorFIRSTNM,
                        errorEmail: errorMessage[key].errorCMAIL,
                        errorPhoneno: errorMessage[key].errorPHNO,
                        errorADDRESS: errorMessage[key].errorADDRESS,
                        errorCITY: errorMessage[key].errorCITY,
                        errorOFFICENM: errorMessage[key].errorOFFICENM,
                    });
                }
            } catch (error) {
                console.log(error);

            }

        }
        else {

            await this.setState({ CLNTID: result.data.ClientsAffected[0] })
            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Clients Details Updated..!!", false)
                this.setState({
                    errorFirstname: '',
                    errorLastname: '',
                    errorEmail: '',
                    errorPhoneno: '',
                    isError: false,
                });
                // this.setClientId(this.state.CLNTID);
                await this.setState({ showLoading: true });
                this.populateData(this.state.CLNTID);
                //this.gotoCaseType(false, this.state.CLNTID, null, this.state.fName);
                this.gotoCaseType(true, this.state.CLNTID, null, this.state.fName, null, null, null, this.state.email);
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                this.showMsg("Clients Details Updated..!!", false)
                this.setState({
                    errorFirstname: '',
                    errorLastname: '',
                    errorEmail: '',
                    errorPhoneno: '',
                    isError: false,
                });
                // this.setClientId(this.state.CLNTID);
                this.populateData(this.state.CLNTID);
                //this.gotoCaseType(true, this.state.CLNTID, null, this.state.fName);
                this.gotoCaseType(true, this.state.CLNTID, null, this.state.fName, null, null, null, this.state.email);
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
                    "CLNTID": this.state.CLNTID,
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

    // //............for show msg..........
    // async showMsg(text) {
    //     console.log('in show text0');
    //     console.log(text);
    //     console.log('in show text1');
    //     await this.setState({ showMsgText: text })
    //     var x = document.getElementById("snackbar");
    //     x.className = "show";
    //     setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    // }

    render() {
        // if (this.state.showLoading) {
        return (
            <div className="ui one column grid">
                <div className="three column row">
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
                                                <label style={{ color: this.state.errorOFFICENM ? 'brown' : null }}>Business Or Law Office</label>
                                                <div className="ui right icon input">
                                                    <i className="suitcase icon"></i>
                                                    <input type="text" name="business_office" placeholder="Business/Office Name"
                                                        value={this.state.officeName}
                                                        style={{ borderColor: this.state.errorOFFICENM ? 'brown' : null, backgroundColor: this.state.errorOFFICENM ? '#f3ece7' : null }}
                                                        onChange={e => this.setState({ officeName: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {this.state.isError ? <span id="errorspan">{this.state.errorOFFICENM}</span> : null}
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
                                                        onChange={e => this.setState({ email: e.target.value })} onBlur={() => { this.state.email ? this.populateData(this.state.CLNTID) : null }} />
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
                                                <label style={{ color: this.state.errorADDRESS ? 'brown' : null }}>Address</label>
                                                <div className="ui right icon input">
                                                    <i className="home icon"></i>
                                                    <input type="text" name="address" placeholder="Address"
                                                        value={this.state.address}
                                                        style={{ borderColor: this.state.errorADDRESS ? 'brown' : null, backgroundColor: this.state.errorADDRESS ? '#f3ece7' : null }}
                                                        onChange={e => this.setState({ address: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {this.state.isError ? <span id="errorspan">{this.state.errorADDRESS}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="three column row">
                                    <div className="four wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorCITY ? 'brown' : null }}>City</label>
                                                <input type="text" name="city" placeholder="City"
                                                    value={this.state.city}
                                                    style={{ borderColor: this.state.errorCITY ? 'brown' : null, backgroundColor: this.state.errorCITY ? '#f3ece7' : null }}
                                                    onChange={e => this.setState({ city: e.target.value })} />
                                            </div>
                                            <div className="field">
                                                {this.state.isError ? <span id="errorspan">{this.state.errorCITY}</span> : null}
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

                    <div className="modal" style={{ display: this.state.showLoading ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                        <div className="modal-content">
                            <div className="ui icon header">
                                <div className="ui active inverted loader"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        // }
        // else {
        //     return (
        //         <div className="ui icon header">
        //             <div className="ui active loader"></div>
        //         </div>
        //     );
        // }
    }
}