import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { ContactDetails, ContactsCRUDOpsQuery, DropDownQueryContact } from '../Queries/queries';

var DropdownContactList = [];
var errorval = false
export default class Contact_Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cntctId: '',
            Firstname: "",
            Lasttname: "",
            BusinessOrLowOffice: "",
            Email: "",
            Phoneno: "",
            Fax: "",
            Address: "",
            City: "",
            State: "",
            Zipcode: "",
            BestMethodOfContact: "",
            BestTimeToCall: "",
            ContactsType: "Personal",
            DropdownContactListArr: [],
            showLoading: false,
            Dispalydrp: false,
            tcode: 'create',
            errorEMAILID: "",
            errorFRSTNM: "",
            errorPHONE: "",
            errorCOMPANY: "",
            errorLSTNM: "",
            popupmsg: "",
        }
        this.DropdownContacts = this.DropdownContacts.bind(this)
    };


    componentDidMount() {

        this.DropdownContacts()

        if (this.props.location.state) {
          
            this.populateData();

        }
    };

    /*----------------------- populates data when form loads --------------------*/
    async populateData() {
        this.setState({  showLoading: true })
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', ContactDetails, this.setSearchParams())
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
            if( result.data.contactDetails.length==0)
            {
                this.setState({ 
                    tcode: 'create',
                    showLoading: false,
                    Dispalydrp: false
                 })
            }
            else{
            this.setState({
                Firstname: result.data.contactDetails[0].FRSTNM,
                Lasttname: result.data.contactDetails[0].LSTNM,
                BusinessOrLowOffice: result.data.contactDetails[0].COMPANY,
                Email: result.data.contactDetails[0].EMAILID,
                Phoneno: result.data.contactDetails[0].PHONE,
                Fax: result.data.contactDetails[0].FAXNO,
                Address: result.data.contactDetails[0].ADDR,
                City: result.data.contactDetails[0].CITY,
                State: result.data.contactDetails[0].STATE,
                Zipcode: result.data.contactDetails[0].PINC,
                BestMethodOfContact: result.data.contactDetails[0].MODOFCON,
                BestTimeToCall: result.data.contactDetails[0].BESTTMCAL,
                ContactsType: result.data.contactDetails[0].CONTACTTYPE,
                cntctId:result.data.contactDetails[0].CONTACTID,
                tcode: 'update',
                showLoading:false,
                Dispalydrp: true
            })
        }
        }
    };

    /*----------------------- sets variable to ContactDetails query  --------------------*/
    setSearchParams() {
        let contactId = this.props.location.state ? this.props.location.state.data : this.state.cntctId
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CONTACTID": contactId,
            "EMAILID":this.state.Email
        }
        return parameters

    };

    /*----------------------- populates DDL  --------------------*/
    async DropdownContacts() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', DropDownQueryContact, this.setDropdownParams())
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
            DropdownContactList = []
            DropdownContactList.push({
                "BEST_METHOD_OF_CONTACT": result.data.BEST_METHOD_OF_CONTACT, "BEST_TIME_TO_CALL": result.data.BEST_TIME_TO_CALL,
                "STATES": result.data.STATES, "CONTACT_TYPES": result.data.CONTACT_TYPES

            })
            this.setState({ DropdownContactListArr: DropdownContactList })
        }
    };

    /*----------------------- sets variable to DropDownQueryContact query  --------------------*/
    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters
    };

    /*----------------------- navigates to contactlist  --------------------*/
    navigateToContactList() {
        return this.props.history.push('/contacts')
    };

    /*----------------------- new contact is created  --------------------*/
    async ContactsCRUDOps(variables) {
        var result = '', errorMessage = '';
        try {
            result = await execGql('mutation', ContactsCRUDOpsQuery, variables)
        }
        catch (err) {
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            errorval = true
            errorMessage = JSON.parse(errorMessage);
            for (let key in errorMessage) {
                console.log(errorMessage[key]);
                this.setState({
                    errorEMAILID: errorMessage[key].errorEMAILID,
                    errorFRSTNM: errorMessage[key].errorFRSTNM,
                    errorPHONE: errorMessage[key].errorPHONE,
                    errorCOMPANY: errorMessage[key].errorCOMPANY,
                    errorLSTNM: errorMessage[key].errorLSTNM
                });
            }

        }
        else {
            console.log(result);
            this.clearscreen()
            this.setState({
                popupmsg: this.state.tcode === "create" ? "Record saved successfully" : "Record updated successfully",
                cntctId: result.data.ContactsAffected[0],
                showLoading: !this.state.showLoading
            })
            await this.populateData()
            this.showMsg()
        }
    };

    /*----------------------- sets variables to create contact  ContactsCRUDOpsQuery  --------------------*/
    setCreateParams() {
        var parameters = {
            "transaction": "CREATE",
            "contacts": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "FRSTNM": this.state.Firstname,
                    "LSTNM": this.state.Lasttname,
                    "COMPANY": this.state.BusinessOrLowOffice,
                    "EMAILID": this.state.Email,
                    "PHONE": this.state.Phoneno,
                    "FAXNO": this.state.Fax,
                    "ADDR": this.state.Address,
                    "CITY": this.state.City,
                    "STATE": this.state.State,
                    "PINC": this.state.Zipcode,
                    "MODOFCON": this.state.BestMethodOfContact,
                    "BESTTMCAL": this.state.BestTimeToCall,
                    "CONTACTTYPE": this.state.ContactsType
                }
            ]
        }
        return parameters
    };

    /*----------------------- sets variables to update contact  ContactsCRUDOpsQuery  --------------------*/
    setUpdateParams() {
        let contactId = this.props.location.state ? this.props.location.state.data : this.state.cntctId
        var parameters = {
            "transaction": "UPDATE",
            "contacts": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CONTACTID": contactId,
                    "FRSTNM": this.state.Firstname,
                    "LSTNM": this.state.Lasttname,
                    "COMPANY": this.state.BusinessOrLowOffice,
                    "EMAILID": this.state.Email,
                    "PHONE": this.state.Phoneno,
                    "FAXNO": this.state.Fax,
                    "ADDR": this.state.Address,
                    "CITY": this.state.City,
                    "STATE": this.state.State,
                    "PINC": this.state.Zipcode,
                    "MODOFCON": this.state.BestMethodOfContact,
                    "BESTTMCAL": this.state.BestTimeToCall,
                    "CONTACTTYPE": this.state.ContactsType
                }
            ]
        }
        return parameters
    };

    /*----------------------- crud operation for contact --------------------*/
    CRUD_operation() {
        if (this.state.tcode == 'create') {
            this.ContactsCRUDOps(this.setCreateParams())
        }
        else if (this.state.tcode == 'update') {
            this.ContactsCRUDOps(this.setUpdateParams())
        }
    };

    /*----------------------- clears the form field  --------------------*/
    clearscreen() {
        this.setState({
            Firstname: "",
            Lasttname: "",
            BusinessOrLowOffice: "",
            Phoneno: "",
            Fax: "",
            Address: "",
            City: "",
            State: "",
            Zipcode: "",
            BestMethodOfContact: "",
            BestTimeToCall: "",
            errorEMAILID: "",
            errorFRSTNM: "",
            errorPHONE: "",
            errorCOMPANY: "",
            errorLSTNM: "",
        })
        if (!this.props.location.state) {
            this.setState({ Email: '' })
        }
    }

    /*-----------------------clear btn fun--------------------*/
    // clearBtn()
    // {
    //     this.clearscreen()
    //     this.setState({ tcode: 'create'})
    // }

    /*-----------------------to show msg after create and update--------------------*/
    showMsg() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    render() {
        return (
            <div>
                <div className="ui one column grid">
                    <div className=" row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <h1 id="title_header">CONTACT-{this.props.location.state ? "EDIT" : "ADD NEW"}</h1>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                    </div>
                    <div className=" row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui  stackable grid">

                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorFRSTNM ? 'brown' : null }}>First Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input style={{ borderColor: this.state.errorFRSTNM ? 'brown' : null, backgroundColor: this.state.errorFRSTNM ? '#f3ece7' : null }} type="text" name="firstname" placeholder="First Name" value={this.state.Firstname} onChange={e => this.setState({ Firstname: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorFRSTNM}</span> : null}
                                                </div>
                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorLSTNM ? 'brown' : null }}>Last Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" name="lastname" placeholder="Last Name" value={this.state.Lasttname} onChange={e => this.setState({ Lasttname: e.target.value })}
                                                            style={{ borderColor: this.state.errorLSTNM ? 'brown' : null, backgroundColor: this.state.errorLSTNM ? '#f3ece7' : null }} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLSTNM}</span> : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCOMPANY ? 'brown' : null }}>Business Or Law Office</label>
                                                    <div className="ui right icon input">
                                                        <i className="suitcase icon"></i>
                                                        <input type="text" name="business_office" placeholder="Business/Office Name" value={this.state.BusinessOrLowOffice} onChange={e => this.setState({ BusinessOrLowOffice: e.target.value })}
                                                            style={{ borderColor: this.state.errorCOMPANY ? 'brown' : null, backgroundColor: this.state.errorCOMPANY ? '#f3ece7' : null }} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCOMPANY}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMAILID ? 'brown' : null }}>E-mail</label>
                                                    <div className="ui right icon input">
                                                        <i className="mail icon"></i>
                                                        <input style={{ borderColor: this.state.errorEMAILID ? 'brown' : null, backgroundColor: this.state.errorEMAILID ? '#f3ece7' : null }}
                                                            type="text" name="email" placeholder="E-mail" value={this.state.Email} onChange={e => this.setState({ Email: e.target.value })}
                                                            disabled={this.props.location.state ? true : false} onBlur={()=>this.populateData()} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMAILID}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPHONE ? 'brown' : null }}>Phone Number</label>
                                                    <div className="ui right icon input">
                                                        <i className="call icon"></i>
                                                        <input style={{ borderColor: this.state.errorPHONE ? 'brown' : null, backgroundColor: this.state.errorPHONE ? '#f3ece7' : null }} type="text" name="phoneno" placeholder="Phone Number" value={this.state.Phoneno} onChange={e => this.setState({ Phoneno: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPHONE}</span> : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" row" style={{ display: this.state.Dispalydrp ? "flex" : "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label>Fax Number</label>
                                                    <div className="ui right icon input">
                                                        <i className="fax icon"></i>
                                                        <input type="text" name="faxno" placeholder="Fax Number" value={this.state.Fax} onChange={e => this.setState({ Fax: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row" style={{ display: this.state.Dispalydrp ? "flex" : "none" }}>
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label>Address</label>
                                                    <div className="ui right icon input">
                                                        <i className="home icon"></i>
                                                        <input type="text" name="address" placeholder="Address" value={this.state.Address} onChange={e => this.setState({ Address: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row" style={{ display: this.state.Dispalydrp ? "flex" : "none" }}>
                                            <div className="four wide column">
                                                <div className="field">
                                                    <label>City</label>
                                                    <input type="text" name="city" placeholder="City" value={this.state.City} onChange={e => this.setState({ City: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="three wide column">
                                                <div className="field">
                                                    <label>State</label>
                                                    <select className="" value={this.state.State} onChange={e => this.setState({ State: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.DropdownContactListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="three wide column">
                                                <div className="field">
                                                    <label>Zip Code</label>
                                                    <input type="text" name="zipcode" placeholder="Zip Code" value={this.state.Zipcode} onChange={e => this.setState({ Zipcode: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" style={{ display: this.state.Dispalydrp ? "flex" : "none" }}>
                                            <div className="four wide column">
                                                <div className="field">
                                                    <label>Best Method Of Contact</label>
                                                    <select className="" value={this.state.BestMethodOfContact} onChange={e => this.setState({ BestMethodOfContact: e.target.value })}>
                                                        <option value="select">select</option>
                                                        {this.state.DropdownContactListArr.map((data) => data.BEST_METHOD_OF_CONTACT.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="three wide column" >
                                                <div className="field">
                                                <label>Best Time To Call</label>
                                                    <select className="" value={this.state.BestTimeToCall} onChange={e => this.setState({ BestTimeToCall: e.target.value })}>
                                                        <option value="select">select</option>
                                                        {this.state.DropdownContactListArr.map((data) => data.BEST_TIME_TO_CALL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="three wide column">
                                                <div className="field">
                                                    {/* <label>Contacts Type</label> */}
                                                    <select className="" value={this.state.ContactsType} onChange={e => this.setState({ ContactsType: e.target.value })} style={{display:'none'}}>
                                                        {this.state.DropdownContactListArr.map((data) => data.CONTACT_TYPES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => this.CRUD_operation()}>Save</button>
                                                <button className="ui  button" type="submit" onClick={() => this.clearscreen()}>Clear</button>
                                                <button className="ui  button" type="submit" onClick={() => this.navigateToContactList()}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                    </div>
                    <div className="ui container">
                        {/* -- popup to show msg-- */}
                        <div id="snackbar">  <i className="info circle icon"></i> {this.state.popupmsg}</div>

                        {/* -- loading Component- */}
                        <div className="modal" style={{ display: this.state.showLoading ? 'flex' : 'none' }} >
                            <div className="modal-content">

                                <div className="ui icon header">
                                    <div className="ui active inverted loader"></div>
                                </div>
                            </div>
                        </div>
                        {/* <pre>
                            {JSON.stringify({
                                "Firstname": this.state.Firstname,
                                "Lasttname": this.state.Lasttname,
                                "BusinessOrLowOffice": this.state.BusinessOrLowOffice,
                                "Email": this.state.Email,
                                "Phoneno": this.state.Phoneno,
                                "Fax": this.state.Fax,
                                "Address": this.state.Address,
                                "City": this.state.City,
                                "State": this.state.State,
                                "Zipcode": this.state.Zipcode,
                                "BestMethodOfContact": this.state.BestMethodOfContact,
                                "BestTimeToCall": this.state.BestTimeToCall,
                                "ContactsType": this.state.ContactsType,
                            })}
                        </pre> */}
                    </div>
                </div>

            </div>
        );
    }
}