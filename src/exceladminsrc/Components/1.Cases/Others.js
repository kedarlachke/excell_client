import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
//import { casesCRUDOperations, DropdwonQueryLeads } from '../Queries/gqlQueries';
import { CasesCRUDOpsQuery, DropdwonQueryLeads, caseDetails } from '../Queries/queries';
var DropdownCasesList = [];
var errorval = false
export default class Others extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Client_Id: "",
            Case_Id: "",
            CaseDt: this.formatSystemDate(),
            Subject: "",
            Description: "",
            Priority_Status: "",
            Assign_To: "",
            tcode: 'CREATE',
            Dispalycomp: true,
            DispalyDiv: 'flex',
            DropdownCasesListArr: [],
            errorPRIORITY: "",
            errorDESCRIPTION: "",
            errorSUBJECT: "",
            DispalyBackColor: false,
            OnClickButton: '',

        }
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
    };

    componentDidMount() {
        this.DropdownCases()
        // console.log(this.props.CLIENTID)
        if (this.props.data) {
            this.setState({
                Dispalycomp: !this.state.Dispalycomp,
                DispalyDiv: 'none'
            })
            this.PopulateData();
        }
    };

    // To Populate Data
    async PopulateData() {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', caseDetails, this.setSearchParams())
            console.log(result);
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
            this.setState({
                Client_Id: result.data.caseDetails[0].CLIENTID,
                Subject: result.data.caseDetails[0].SUBJECT,
                Description: result.data.caseDetails[0].DESCRIPTION,
                Priority_Status: result.data.caseDetails[0].PRIORITY,
                Assign_To: result.data.caseDetails[0].ASSIGNUSER,
                tcode: 'UPDATE',
                Dispalycomp: !this.state.Dispalycomp
            })
        }

    };

    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CIDSYS": this.props.data
        }
        return parameters

    };

    // To set Dropdwon Values
    async DropdownCases() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', DropdwonQueryLeads, this.setDropdownParams())
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
            DropdownCasesList = []
            DropdownCasesList.push({
                "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL, "ASSIGN_TO": result.data.ASSIGN_TO, "STATES": result.data.STATES
            })
            this.setState({ DropdownCasesListArr: DropdownCasesList })
        }

    };

    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters

    };


    // To create case
    async CreateCases() {
        if (this.props.CLIENTID) {
            var result = '', errorMessage = '', errors = [];
            try {
                await this.setState({ Client_Id: this.props.CLIENTID })
                result = await execGql('mutation', CasesCRUDOpsQuery, this.setCreateParams())
                // console.log(result);
            }
            catch (err) {
                errors = err.errorsGql;
                errorMessage = err.errorMessageGql;

            }

            if (!result) {
                // console.log(errors);
                // console.log(errorMessage);
                errorval = true
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    console.log(errorMessage[key]);
                    this.setState({
                        errorPRIORITY: errorMessage[key].errorPRIORITY,
                        errorDESCRIPTION: errorMessage[key].errorDESCRIPTION,
                        errorSUBJECT: errorMessage[key].errorSUBJECT
                    });
                }

            }
            else {
                // console.log(result.data.CasesAffected[0]);
                // this.navigateToCaseList();
                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Case Details Accepted ..!!");
                    this.setState({
                        errorPRIORITY: "",
                        errorDESCRIPTION: "",
                        errorSUBJECT: "",
                    });
                    errorval = false
                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.gotoCaseType(this.state.Client_Id,result.data.CasesAffected[0]);
                   // this.setCaseId(result.data.CasesAffected[0])
                }

            }
        }
        else {
            await this.setState({ DispalyBackColor: true });
            this.showMsg("Client Details Must be fill first")
        }

    };


    setCreateParams() {
        var parameters = {
            "typeofCase": "OTHER_CASE",
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CASEDT": this.state.CaseDt,
                    "CLIENTID": this.state.Client_Id,
                    "DESCRIPTION": this.state.Description,
                    "SUBJECT": this.state.Subject,
                    "PRIORITY": this.state.Priority_Status,
                    "ASSIGNUSER": this.state.Assign_To,
                    //extra
                    "LTDTTOSERV": this.state.CaseDt
                }
            ],
            "transaction": "CREATE"
        }
        return parameters

    };

    // To upadate Case
    async UpdateCases() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('mutation', CasesCRUDOpsQuery, this.setUpdateParams())
            // console.log(result);
        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;

        }

        if (!result) {
            console.log(errors);
            console.log(errorMessage);
            errorval = true
            errorMessage = JSON.parse(errorMessage);
            for (let key in errorMessage) {
                console.log(errorMessage[key]);
                this.setState({
                    errorPRIORITY: errorMessage[key].errorPRIORITY,
                    errorDESCRIPTION: errorMessage[key].errorDESCRIPTION,
                    errorSUBJECT: errorMessage[key].errorSUBJECT
                });
            }

        }
        else {
            // console.log(result.data.CasesAffected[0]);
            // this.navigateToCaseList();
            //  this.gotoCaseType();
            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Case Details Accepted ..!!");
                this.setState({
                    errorPRIORITY: "",
                    errorDESCRIPTION: "",
                    errorSUBJECT: "",
                });
                errorval = false
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                 this.gotoCaseType(this.state.Client_Id,result.data.CasesAffected[0]);
                // this.setCaseId(result.data.CasesAffected[0])
            }

        }

    };


    setUpdateParams() {
        var parameters = {
            "typeofCase": "OTHER_CASE",
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS": this.props.data,
                    "CASEDT": this.state.CaseDt,
                    "CLIENTID": this.state.Client_Id,
                    "DESCRIPTION": this.state.Description,
                    "SUBJECT": this.state.Subject,
                    "PRIORITY": this.state.Priority_Status,
                    "ASSIGNUSER": this.state.Assign_To,
                    //extra
                    "LTDTTOSERV": this.state.CaseDt
                }
            ],
            "transaction": "UPDATE"
        }
        return parameters

    };


    //..............Date Formate Convertion..........
    formatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(5, 7)
        var day = date.slice(8, 10)

        var date_format = year + month + day
        return date_format
        // console.log(date_format);

    };

    //......To Convert System Date to yyyymmdd.....//
    formatSystemDate() {
        // console.log(this.state.CaseDt);
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        month = month.length == 1 ? '0' + month : month;
        var day = date.getDate().toString();
        var date_format = year + month + day
        console.log(date_format);
        return date_format
    }

    // Navigate To Case List

    navigateToCaseList() {
        return this.props.history.push('/cases')
    };


    // CRUD Operations
    CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            this.CreateCases()
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateCases()

        }
    };


    // To clear field and error
    onClear() {
        this.setState({
            Subject: "",
            Description: "",
            Priority_Status: "",
            Assign_To: "",
            errorPRIORITY: "",
            errorDESCRIPTION: "",
            errorSUBJECT: ""
        });
        errorval = false;

    };

    //............for show msg..........
    async showMsg(text) {
        await this.setState({ showMsgText: text })
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    };

    render() {
        if (this.state.Dispalycomp) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className=" row">

                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <div className="ui segment ">
                                    <div className="ui form">
                                        <div className="ui stackable grid">
                                            <div className=" row" style={{ display: "none" }}>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label >Client Id</label>
                                                        <div className="ui input">
                                                            <input type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className=" five wide column">
                                                    <div className="field">
                                                        <label>Case Id</label>
                                                        <div className="ui input">
                                                            <input type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className=" row">

                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSUBJECT ? 'brown' : null }} >Subject</label>
                                                        <div className="ui input">
                                                            <input type="text" name="Subject" style={{ borderColor: this.state.errorSUBJECT ? 'brown' : null, backgroundColor: this.state.errorSUBJECT ? '#f3ece7' : null }} value={this.state.Subject} onChange={e => this.setState({ Subject: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSUBJECT}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorDESCRIPTION ? 'brown' : null }} >Description</label>
                                                        <div className="ui input">
                                                            <textarea rows="3" style={{ borderColor: this.state.errorDESCRIPTION ? 'brown' : null, backgroundColor: this.state.errorDESCRIPTION ? '#f3ece7' : null }} name="Description" value={this.state.Description} onChange={e => this.setState({ Description: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorDESCRIPTION}</span> : null}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className=" row">

                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorPRIORITY ? 'brown' : null }}>Priority Status</label>

                                                        <select className="" value={this.state.Priority_Status} style={{ borderColor: this.state.errorPRIORITY ? 'brown' : null, backgroundColor: this.state.errorPRIORITY ? '#f3ece7' : null }} onChange={e => this.setState({ Priority_Status: e.target.value })}>
                                                            <option>Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.PRIORITY_LEVEL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorPRIORITY}</span> : null}
                                                    </div>
                                                </div>

                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label>Assign To</label>
                                                        <select className="" value={this.state.Assign_To} onChange={e => this.setState({ Assign_To: e.target.value })}>
                                                            <option>Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.ASSIGN_TO.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* -- popup after changing status-- */}
                                            <div id="snackbar" style={{ backgroundColor: this.state.DispalyBackColor ? "#dd212d" : "rgba(33,155,166,0.88)" }}>  <i className="info circle icon"></i>{this.state.showMsgText}</div>

                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                                    <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                                    <button className="ui button" type="submit" onClick={() => this.onClear()}>Clear</button>
                                                    <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            {/* {<div className="ui message">
                                <pre>
                                    {JSON.stringify({

                                        "Client_Id": this.state.Client_Id,
                                        "Case_Id": this.state.Case_Id,

                                        "Subject": this.state.Subject,
                                        "Description": this.state.Description,
                                        "Priority_Status": this.state.Priority_Status,
                                        "Assign_To": this.state.Assign_To

                                    })}
                                </pre>
                            </div>} */}
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