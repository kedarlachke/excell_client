import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { RemindersCRUDOps, InvoiceDetailsForReminder } from '../Queries/queries';

var CLNT = '1002'
var LANG = 'EN'

var errorval = false
export default class InvoiceRemainder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            DOCID: "",
            DOCNO: "",

            FROM: "support@excellinvestigation.com",
            CFROMNAME: "Excell Billing",

            CUSTOMER: "",
            CUSTMAIL: "",

            SUBJECT: "",
            MESSAGE: "",
            DUEAMT: "",

            DOCDT: "",
            DUEDT: "",

            CMPNNM: "",
            COMPMAIL: "",

            tcode: 'CREATE',
            errorCOMPMAIL: "",
            errorCUSTMAIL: "",
            errorSUBJECT: "",
            errorMESSAGE: "",
            Dispalycomp: true
        }
        //Changing Parents State from Child Class using props 
        this.closeReminder = this.props.closeReminder.bind(this);
        this.showMsg = this.props.showMsg.bind(this);
    };


    async componentDidMount() {
        await this.setState({ DOCID: this.props.docid })
        await this.populateData();
        if (this.props.isMailButton) {
            await this.setState({ SUBJECT: "Invoice Payment", MESSAGE: "Please Pay at the earliest.Thanks for business" })
            this.CRUD_operation();
        }

    }

    // ...........CRUD operation..............
    async CRUD_operation() {
        var result = '', errorMessage = '';
        try {
            result = await execGql('mutation', RemindersCRUDOps, this.setCreateParams())
        } catch (err) {
            // errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }
        if (!result) {
            errorval = true
            errorMessage = JSON.parse(errorMessage);
            console.log(errorMessage);
            for (let key in errorMessage) {
                this.setState({
                    errorMESSAGE: errorMessage[key].errorCMESSAGE,
                    errorSUBJECT: errorMessage[key].errorCSUBJECT,
                    errorCUSTMAIL: errorMessage[key].errorCTO,
                    errorCOMPMAIL: errorMessage[key].errorCFORM,
                });
            }
        } else {
            console.log(result);
            this.closeReminder();
            this.showMsg("Mail Sent successfully..");
        }

    };
    setCreateParams() {
        alert(this.props.caseid)
        var parameters = {
            "transaction": this.state.tcode,
            "reminders": [
                {
                    CLNT: CLNT,
                    LANG: LANG,
                    DOCID: this.state.DOCID,
                    CFORM: this.state.FROM,
                    CFROMNAME: this.state.CFROMNAME,
                    CTO: this.state.CUSTMAIL,
                    CSUBJECT: this.state.SUBJECT,
                    CMESSAGE: this.state.MESSAGE,
                    DUEAMT: this.state.DUEAMT,
                    DOCNO: this.state.DOCNO,
                    CUSTOMER: this.state.CUSTOMER,
                    DOCDT: this.state.DOCDT,
                    CMPNNM: this.state.CMPNNM,
                    COMPMAIL: this.state.COMPMAIL,
                    DUEDT: this.state.DUEDT,
                    CUSTMAIL: this.state.CUSTMAIL,
                    CIDSYS:this.props.caseid
                }
            ]
        }
        return parameters
    };

    // ...........populate Data..............
    async populateData() {
        console.log(this.state.DOCID);
        var result = '', errorMessage = '';
        try {
            result = await execGql('query', InvoiceDetailsForReminder, this.setDetailsParams())
        } catch (err) {
            errorMessage = err.errorMessageGql;
        }
        if (!result) {
            console.log(errorMessage);
        } else {
            console.log(result);
            for (let key in result.data.invoiceDetailsForReminder) {
                this.setState({
                    DOCNO: result.data.invoiceDetailsForReminder[key].DOCNO,

                    CUSTMAIL: result.data.invoiceDetailsForReminder[key].CUSTMAIL,
                    CUSTOMER: result.data.invoiceDetailsForReminder[key].CUSTOMER,

                    DOCDT: result.data.invoiceDetailsForReminder[key].DOCDT,
                    DUEDT: result.data.invoiceDetailsForReminder[key].DUEDT,

                    CMPNNM: result.data.invoiceDetailsForReminder[key].CMPNNM,
                    COMPMAIL: result.data.invoiceDetailsForReminder[key].COMPMAIL,

                    DUEAMT: result.data.invoiceDetailsForReminder[key].TOT,
                    SUBJECT: "Invoice #"+result.data.invoiceDetailsForReminder[key].DOCNO+" from "+result.data.invoiceDetailsForReminder[key].CMPNNM
                    
                });
            }
        }
    };
    setDetailsParams() {
        var parameters = {
            "CLNT": CLNT,
            "LANG": LANG,
            "DOCID": this.state.DOCID,
        }
        return parameters
    };

    render() {
        if (this.state.Dispalycomp) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className=" row">
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                <h1 id="title_header">Send this Invoices</h1>
                            </div>
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                        </div>
                        <div className=" row">
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            <div className="ten wide computer fourteen wide tablet fourteen wide mobile column">
                                <div className="ui segment ">
                                    <div className="ui form">
                                        <div className="ui  stackable grid">

                                            <div className=" row">
                                                <div className="fifty  wide column">
                                                    <div className="field" style={{ textAlign: "left" }}>
                                                        <label style={{ color: this.state.errorCOMPMAIL ? 'brown' : null }}>From</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input style={{ borderColor: this.state.errorCOMPMAIL ? 'brown' : null, backgroundColor: this.state.errorCOMPMAIL ? '#f3ece7' : null }} type="text" name="firstname" placeholder="First Name" value={this.state.COMPMAIL} onChange={e => this.setState({ COMPMAIL: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field" style={{ textAlign: "left" }}>
                                                        {errorval ? <span id="errorspan">{this.state.errorCOMPMAIL}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" row">
                                                <div className="fifty  wide column">
                                                    <div className="field" style={{ textAlign: "left" }}>
                                                        <label style={{ color: this.state.errorCUSTMAIL ? 'brown' : null }}>TO</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input style={{ borderColor: this.state.errorCUSTMAIL ? 'brown' : null, backgroundColor: this.state.errorCUSTMAIL ? '#f3ece7' : null }} type="text" name="TO" placeholder="To" value={this.state.CUSTMAIL} onChange={e => this.setState({ CUSTMAIL: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field" style={{ textAlign: "left" }}>
                                                        {errorval ? <span id="errorspan">{this.state.errorCUSTMAIL}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="fifty  wide column">
                                                    <div className="field" style={{ textAlign: "left" }}>
                                                        <label style={{ color: this.state.errorSUBJECT ? 'brown' : null }}>Subject</label>
                                                        <div className="ui right icon input">
                                                            <input style={{ borderColor: this.state.errorSUBJECT ? 'brown' : null, backgroundColor: this.state.errorSUBJECT ? '#f3ece7' : null }} type="text" name="SUBJECT" placeholder="Subject" value={this.state.SUBJECT} onChange={e => this.setState({ SUBJECT: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field" style={{ textAlign: "left" }}>
                                                        {errorval ? <span id="errorspan">{this.state.errorSUBJECT}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" style={{ display: this.state.Dispalydrp ? "none" : "flex" }}>
                                                <div className="fifty  wide column">
                                                    <div className="field" style={{ textAlign: "left" }}>
                                                        <label style={{ color: this.state.errorMESSAGE ? 'brown' : null }}>Message</label>
                                                        <div className="ui right icon input">
                                                            <textarea style={{ borderColor: this.state.errorMESSAGE ? 'brown' : null, backgroundColor: this.state.errorMESSAGE ? '#f3ece7' : null }} name="faxno" value={this.state.MESSAGE} onChange={e => this.setState({ MESSAGE: e.target.value })} />
                                                        </div>
                                                        <div className="field" style={{ textAlign: "left" }}>
                                                            {errorval ? <span id="errorspan">{this.state.errorMESSAGE}</span> : null}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row" style={{ textAlign: "right" }}>
                                                <div className="fifty  wide column">
                                                    <button className="ui primary button" type="submit" onClick={() => this.CRUD_operation()}>Send</button>
                                                    <button className="ui  button" type="submit" onClick={() => this.closeReminder()}>Cancel</button>
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