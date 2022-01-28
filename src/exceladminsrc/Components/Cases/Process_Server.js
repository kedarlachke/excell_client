import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { CasesCRUDOpsQuery, DropdwonQueryLeads, caseDetails } from '../Queries/queries';
var DropdownCasesList = [];
var errorval = false
export default class ProcessServer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Client_Id: "",
            Case_Id: "",
            Date: "",
            Court: "",
            File: "",
            Last_Date_To_Serve: "",
            Type: "",
            Hearing_Set_For: "",
            AT: "",
            Department: "",
            Miscellaneous_Instructions: "",
            First_Name: "",
            Last_Name: "",
            Sex: "",
            Age: "",
            Race: "",
            Height: "",
            Weight: "",
            Hair_Color: "",
            Residence_Address: "",
            Business_Address: "",
            Best_Time_To_Serve: "",
            Hours_Of_Work: "",
            Please_Make_Attempt_At: "",
            Priority_Status: "",
            Assign_To: "",
            DropdownCasesListArr: [],
            tcode: 'CREATE',
            Dispalycomp: true,
            // error state

            errorCASEDT: "",
            errorCOURTNM: "",
            errorFILENO: "",
            errorLTDTTOSERV: "",
            errorTYPE: "",
            errorAT: "",
            errorDEPT: "",
            errorFRSTNM: "",
            errorLSTNM: "",
            errorSEX: "",
            errorBTTMTOSERV: "",
            errorHOURSOFWK: "",
            errorPLMKATTPAT: "",
            errorPRIORITY: "",
            DispalyBackColor: false,
            OnClickButton: '',


        }
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
    };

    componentDidMount() {

        this.DropdownCases();
      
        // Populate Data When Edit Mode
        if (this.props.data) {
            // this.setState({
            //     Dispalycomp: !this.state.Dispalycomp
            // });
            this.PopulateData(this.props.data);
        };

        // Populate Data when back to Case tab
        if (this.props.Case_Id) {
            // this.setState({
            //     // Dispalycomp: !this.state.Dispalycomp
            // });
            this.PopulateData(this.props.Case_Id);
        };

    };


    // To Populate Data
    async PopulateData(CaseId) {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', caseDetails, this.setSearchParams(CaseId))
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
                Case_Id: result.data.caseDetails[0].CIDSYS,
                Client_Id: result.data.caseDetails[0].CLIENTID,
                Date: this.formatDate1(result.data.caseDetails[0].CASEDT),
                Court: result.data.caseDetails[0].COURTNM,
                File: result.data.caseDetails[0].FILENO,
                Last_Date_To_Serve: this.formatDate1(result.data.caseDetails[0].LTDTTOSERV),
                Type: result.data.caseDetails[0].TYPE,
                Hearing_Set_For: result.data.caseDetails[0].HEARINGSETFOR,
                AT: result.data.caseDetails[0].AT,
                Department: result.data.caseDetails[0].DEPT,
                Miscellaneous_Instructions: result.data.caseDetails[0].MISCELIST,

                First_Name: result.data.caseDetails[0].FRSTNM,
                Last_Name: result.data.caseDetails[0].LSTNM,
                Sex: result.data.caseDetails[0].SEX,
                Age: result.data.caseDetails[0].AGE,
                Race: result.data.caseDetails[0].RACE,
                Height: result.data.caseDetails[0].HEIGHT,
                Weight: result.data.caseDetails[0].WEIGHT,
                Hair_Color: result.data.caseDetails[0].HAIRCOLOR,
                Residence_Address: result.data.caseDetails[0].RESADDRESS,
                Business_Address: result.data.caseDetails[0].BUSADDRESS,

                Best_Time_To_Serve: result.data.caseDetails[0].BTTMTOSERV,
                Hours_Of_Work: result.data.caseDetails[0].HOURSOFWK,
                Please_Make_Attempt_At: result.data.caseDetails[0].PLMKATTPAT,
                Priority_Status: result.data.caseDetails[0].PRIORITY,
                Assign_To: result.data.caseDetails[0].ASSIGNUSER,
                tcode: 'UPDATE',
                //Dispalycomp: !this.state.Dispalycomp
            })
        }

    };

    setSearchParams(CaseId) {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CIDSYS": CaseId
        }
        return parameters

    };


    // To set Dropdwon values
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
                "BEST_TIME_TO_CALL": result.data.BEST_TIME_TO_CALL,
                "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL, "ASSIGN_TO": result.data.ASSIGN_TO

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


    // To create Case
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
                console.log(errors);
                console.log(errorMessage);
                errorval = true
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    console.log(errorMessage[key]);
                    this.setState({
                        errorCASEDT: errorMessage[key].errorCASEDT,
                        errorCOURTNM: errorMessage[key].errorCOURTNM,
                        errorFILENO: errorMessage[key].errorFILENO,
                        errorLTDTTOSERV: errorMessage[key].errorLTDTTOSERV,
                        errorTYPE: errorMessage[key].errorTYPE,
                        errorAT: errorMessage[key].errorAT,
                        errorDEPT: errorMessage[key].errorDEPT,
                        errorFRSTNM: errorMessage[key].errorFRSTNM,
                        errorLSTNM: errorMessage[key].errorLSTNM,
                        errorSEX: errorMessage[key].errorSEX,
                        errorBTTMTOSERV: errorMessage[key].errorBTTMTOSERV,
                        errorHOURSOFWK: errorMessage[key].errorHOURSOFWK,
                        errorPLMKATTPAT: errorMessage[key].errorPLMKATTPAT,
                        errorPRIORITY: errorMessage[key].errorPRIORITY
                    })
                }
            }
            else {
                console.log(result);
                //this.navigateToCaseList()
                //this.gotoCaseType();
                await this.setState({ Case_Id: result.data.CasesAffected[0] });
                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Case Details Accepted ..!!")
                    this.setState({
                        errorCASEDT: "",
                        errorCOURTNM: "",
                        errorFILENO: "",
                        errorLTDTTOSERV: "",
                        errorTYPE: "",
                        errorAT: "",
                        errorDEPT: "",
                        errorFRSTNM: "",
                        errorLSTNM: "",
                        errorSEX: "",
                        errorBTTMTOSERV: "",
                        errorHOURSOFWK: "",
                        errorPLMKATTPAT: "",
                        errorPRIORITY: "",
                    });
                    errorval = false;

                    this.PopulateData(this.state.Case_Id);
                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.gotoCaseType(this.state.Client_Id, this.state.Case_Id);
                }
            }
        }
        else {
            await this.setState({ DispalyBackColor: true })
            this.showMsg("Client Details Must be fill first")
        }

    };


    setCreateParams() {
        var parameters = {
            "typeofCase": "PROCESS_SERVER",
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CLIENTID": this.state.Client_Id,
                    "CASEDT": this.formatDate(this.state.Date),
                    "COURTNM": this.state.Court,
                    "FILENO": this.state.File,
                    "LTDTTOSERV": this.formatDate(this.state.Last_Date_To_Serve),
                    "TYPE": this.state.Type,
                    "HEARINGSETFOR": this.state.Hearing_Set_For,
                    "AT": this.state.AT,
                    "DEPT": this.state.Department,
                    "MISCELIST": this.state.Miscellaneous_Instructions,
                    "FRSTNM": this.state.First_Name,
                    "LSTNM": this.state.Last_Name,
                    "SEX": this.state.Sex,
                    "AGE": this.state.Age,
                    "RACE": this.state.Race,
                    "HEIGHT": this.state.Height,
                    "WEIGHT": this.state.Weight,
                    "HAIRCOLOR": this.state.Hair_Color,
                    "RESADDRESS": this.state.Residence_Address,
                    "BUSADDRESS": this.state.Business_Address,
                    "BTTMTOSERV": this.state.Best_Time_To_Serve,
                    "HOURSOFWK": this.state.Hours_Of_Work,
                    "PLMKATTPAT": this.state.Please_Make_Attempt_At,
                    "PRIORITY": this.state.Priority_Status,
                    "ASSIGNUSER": this.state.Assign_To

                }
            ],
            "transaction": "CREATE"
        }
        return parameters

    };


    // To Update Case
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
                    errorCASEDT: errorMessage[key].errorCASEDT,
                    errorCOURTNM: errorMessage[key].errorCOURTNM,
                    errorFILENO: errorMessage[key].errorFILENO,
                    errorLTDTTOSERV: errorMessage[key].errorLTDTTOSERV,
                    errorTYPE: errorMessage[key].errorTYPE,
                    errorAT: errorMessage[key].errorAT,
                    errorDEPT: errorMessage[key].errorDEPT,
                    errorFRSTNM: errorMessage[key].errorFRSTNM,
                    errorLSTNM: errorMessage[key].errorLSTNM,
                    errorSEX: errorMessage[key].errorSEX,
                    errorBTTMTOSERV: errorMessage[key].errorBTTMTOSERV,
                    errorHOURSOFWK: errorMessage[key].errorHOURSOFWK,
                    errorPLMKATTPAT: errorMessage[key].errorPLMKATTPAT,
                    errorPRIORITY: errorMessage[key].errorPRIORITY
                })
            }

        }
        else {
            console.log(result);
            //this.navigateToCaseList()
            //this.gotoCaseType();
            await this.setState({ Case_Id: result.data.CasesAffected[0] });
            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Case Details Accepted ..!!")
                this.setState({
                    errorCASEDT: "",
                    errorCOURTNM: "",
                    errorFILENO: "",
                    errorLTDTTOSERV: "",
                    errorTYPE: "",
                    errorAT: "",
                    errorDEPT: "",
                    errorFRSTNM: "",
                    errorLSTNM: "",
                    errorSEX: "",
                    errorBTTMTOSERV: "",
                    errorHOURSOFWK: "",
                    errorPLMKATTPAT: "",
                    errorPRIORITY: "",
                });
                errorval = false;
                this.PopulateData(this.state.Case_Id);
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                this.gotoCaseType(this.state.Client_Id, this.state.Case_Id);
            }
        }

    };


    setUpdateParams() {
        var parameters = {
            "typeofCase": "PROCESS_SERVER",
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS": this.state.Case_Id,
                    "CLIENTID": this.state.Client_Id,
                    "CASEDT": this.formatDate(this.state.Date),
                    "COURTNM": this.state.Court,
                    "FILENO": this.state.File,
                    "LTDTTOSERV": this.formatDate(this.state.Last_Date_To_Serve),
                    "TYPE": this.state.Type,
                    "HEARINGSETFOR": this.state.Hearing_Set_For,
                    "AT": this.state.AT,
                    "DEPT": this.state.Department,
                    "MISCELIST": this.state.Miscellaneous_Instructions,
                    "FRSTNM": this.state.First_Name,
                    "LSTNM": this.state.Last_Name,
                    "SEX": this.state.Sex,
                    "AGE": this.state.Age,
                    "RACE": this.state.Race,
                    "HEIGHT": this.state.Height,
                    "WEIGHT": this.state.Weight,
                    "HAIRCOLOR": this.state.Hair_Color,
                    "RESADDRESS": this.state.Residence_Address,
                    "BUSADDRESS": this.state.Business_Address,
                    "BTTMTOSERV": this.state.Best_Time_To_Serve,
                    "HOURSOFWK": this.state.Hours_Of_Work,
                    "PLMKATTPAT": this.state.Please_Make_Attempt_At,
                    "PRIORITY": this.state.Priority_Status,
                    "ASSIGNUSER": this.state.Assign_To

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
        //   console.log(date_format);

    }


    //..............Date Formate Convertion..........
    formatDate1(date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)
        // "2018-06-03"
        var date_format = year + '-' + month + '-' + day
        //  var date_format = month + '/' + day + '/' + year
        return date_format
    };


    // Navigate to Case List
    navigateToCaseList() {
        return this.props.history.push('/cases')
    };


    // CRUD Operation
    CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            this.CreateCases()
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateCases()

        }
    };

    // To Clear Input filed value and error
    onClear() {
        this.setState({
            Date: "",
            Court: "",
            File: "",
            Last_Date_To_Serve: "",
            Type: "",
            Hearing_Set_For: "",
            AT: "",
            Department: "",
            Miscellaneous_Instructions: "",
            First_Name: "",
            Last_Name: "",
            Sex: "",
            Age: "",
            Race: "",
            Height: "",
            Weight: "",
            Hair_Color: "",
            Residence_Address: "",
            Business_Address: "",
            Best_Time_To_Serve: "",
            Hours_Of_Work: "",
            Please_Make_Attempt_At: "",
            Priority_Status: "",
            Assign_To: "",
            // error state
            errorCASEDT: "",
            errorCOURTNM: "",
            errorFILENO: "",
            errorLTDTTOSERV: "",
            errorTYPE: "",
            errorAT: "",
            errorDEPT: "",
            errorFRSTNM: "",
            errorLSTNM: "",
            errorSEX: "",
            errorBTTMTOSERV: "",
            errorHOURSOFWK: "",
            errorPLMKATTPAT: "",
            errorPRIORITY: ""
        });
        errorval = false;
    };

    //............for show msg Popup..........
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
                                        <div className="ui  stackable grid">
                                            <div className=" row" style={{ display: "none" }}>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label >Client Id</label>
                                                        <div className="ui  input">
                                                            <input type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className=" five wide column">
                                                    <div className="field">
                                                        <label>Case Id</label>
                                                        <div className="ui  input">
                                                            <input type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCASEDT ? 'brown' : null }}>Date</label>
                                                        <div className="ui  input">
                                                            <input type="Date" name="Date" style={{ borderColor: this.state.errorCASEDT ? 'brown' : null, backgroundColor: this.state.errorCASEDT ? '#f3ece7' : null }} placeholder="Date" value={this.state.Date} onChange={e => this.setState({ Date: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCASEDT}</span> : null}
                                                    </div>
                                                </div>
                                                <div className=" five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCOURTNM ? 'brown' : null }}>Court</label>
                                                        <div className="ui right icon input">
                                                            <i className="university icon"></i>
                                                            <input type="text" name="Court" style={{ borderColor: this.state.errorCOURTNM ? 'brown' : null, backgroundColor: this.state.errorCOURTNM ? '#f3ece7' : null }} value={this.state.Court} onChange={e => this.setState({ Court: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCOURTNM}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorFILENO ? 'brown' : null }}>File#</label>
                                                        <div className="ui right icon input">
                                                            <i className="file icon"></i>
                                                            <input type="text" name="File" style={{ borderColor: this.state.errorFILENO ? 'brown' : null, backgroundColor: this.state.errorFILENO ? '#f3ece7' : null }} value={this.state.File} onChange={e => this.setState({ File: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorFILENO}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorLTDTTOSERV ? 'brown' : null }} >Last Date To Serve</label>
                                                        <div className="ui  input">
                                                            <input type="Date" style={{ borderColor: this.state.errorLTDTTOSERV ? 'brown' : null, backgroundColor: this.state.errorLTDTTOSERV ? '#f3ece7' : null }} name="Last_Date_To_Serve" value={this.state.Last_Date_To_Serve} onChange={e => this.setState({ Last_Date_To_Serve: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorLTDTTOSERV}</span> : null}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorTYPE ? 'brown' : null }}>Type</label>
                                                        <div className="ui  input">
                                                            <input type="text" name="Type" style={{ borderColor: this.state.errorTYPE ? 'brown' : null, backgroundColor: this.state.errorTYPE ? '#f3ece7' : null }} value={this.state.Type} onChange={e => this.setState({ Type: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorTYPE}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label>Hearing Set For</label>
                                                        <div className="ui  input">
                                                            <input type="text" name="Hearing_Set_For" value={this.state.Hearing_Set_For} onChange={e => this.setState({ Hearing_Set_For: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorAT ? 'brown' : null }}>AT</label>
                                                        <div className="ui  input">
                                                            <input type="text" style={{ borderColor: this.state.errorAT ? 'brown' : null, backgroundColor: this.state.errorAT ? '#f3ece7' : null }} name="AT" value={this.state.AT} onChange={e => this.setState({ AT: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorAT}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorDEPT ? 'brown' : null }}>Department</label>
                                                        <div className="ui right icon input">
                                                            <i className="building icon"></i>
                                                            <input type="text" style={{ borderColor: this.state.errorDEPT ? 'brown' : null, backgroundColor: this.state.errorDEPT ? '#f3ece7' : null }} name="Department" value={this.state.Department} onChange={e => this.setState({ Department: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorDEPT}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label >Miscellaneous Instructions</label>
                                                        <div className="ui right icon  input">
                                                            <i className="comments icon"></i>
                                                            <input type="text" name="Miscellaneous_Instructions" value={this.state.Miscellaneous_Instructions} onChange={e => this.setState({ Miscellaneous_Instructions: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="one wide computer one wide tablet one wide mobile row">
                                            </div>
                                            <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                                <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Subject Information</h1>
                                            </div>
                                            <div className="one wide computer one wide tablet one wide mobile row">
                                            </div>
                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorFRSTNM ? 'brown' : null }}>First Name</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input type="text" name="First_Name" style={{ borderColor: this.state.errorFRSTNM ? 'brown' : null, backgroundColor: this.state.errorFRSTNM ? '#f3ece7' : null }} value={this.state.First_Name} onChange={e => this.setState({ First_Name: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorFRSTNM}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorLSTNM ? 'brown' : null }}>Last Name</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input type="text" style={{ borderColor: this.state.errorLSTNM ? 'brown' : null, backgroundColor: this.state.errorLSTNM ? '#f3ece7' : null }} name="Last_Name" value={this.state.Last_Name} onChange={e => this.setState({ Last_Name: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorLSTNM}</span> : null}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" row" >
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSEX ? 'brown' : null }}>Sex</label>
                                                        <select className="" style={{ borderColor: this.state.errorSEX ? 'brown' : null, backgroundColor: this.state.errorSEX ? '#f3ece7' : null }} value={this.state.Sex} onChange={e => this.setState({ Sex: e.target.value })}>
                                                            <option value="">Select</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSEX}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label>Age</label>
                                                        <input type="text" name="Age" value={this.state.Age} onChange={e => this.setState({ Age: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label>Race</label>
                                                        <input type="text" name="Race" value={this.state.Race} onChange={e => this.setState({ Race: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="five wide column">
                                                    <div className=" field">
                                                        <label>Height</label>
                                                        <input type="text" name="Height" value={this.state.Height} onChange={e => this.setState({ Height: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="five wide column" >
                                                    <div className="field">
                                                        <label>Weight</label>
                                                        <input type="text" name="Weight" value={this.state.Weight} onChange={e => this.setState({ Weight: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className=" field " >
                                                        <label>Hair Color</label>
                                                        <input type="text" name="Hair_Color" value={this.state.Hair_Color} onChange={e => this.setState({ Hair_Color: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field" >
                                                        <label >Residence Address</label>
                                                        <div className="ui  input">
                                                            <input type="text" name="Residence_Address" value={this.state.Residence_Address} onChange={e => this.setState({ Residence_Address: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label >Business Address</label>
                                                        <div className="ui  input">
                                                            <input type="text" name="Business_Address" value={this.state.Business_Address} onChange={e => this.setState({ Business_Address: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="one wide computer one wide tablet one wide mobile row">
                                            </div>
                                            <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                                <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Serve Information</h1>
                                            </div>
                                            <div className="one wide computer one wide tablet one wide mobile row">
                                            </div>
                                            <div className=" row" >
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorBTTMTOSERV ? 'brown' : null }}>Best Time To Serve</label>
                                                        <select className="" style={{ borderColor: this.state.errorBTTMTOSERV ? 'brown' : null, backgroundColor: this.state.errorBTTMTOSERV ? '#f3ece7' : null }} value={this.state.Best_Time_To_Serve} onChange={e => this.setState({ Best_Time_To_Serve: e.target.value })}>
                                                            <option value="Select">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.BEST_TIME_TO_CALL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorBTTMTOSERV}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorHOURSOFWK ? 'brown' : null }}>Hours Of Work</label>
                                                        <div className="ui right icon input">
                                                            <i className="clock icon"></i>
                                                            <input type="text" style={{ borderColor: this.state.errorHOURSOFWK ? 'brown' : null, backgroundColor: this.state.errorHOURSOFWK ? '#f3ece7' : null }} name="Hours_Of_Work" value={this.state.Hours_Of_Work} onChange={e => this.setState({ Hours_Of_Work: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorHOURSOFWK}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row" >

                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorPLMKATTPAT ? 'brown' : null }}>Please Make Attempt At</label>
                                                        <input type="text" style={{ borderColor: this.state.errorPLMKATTPAT ? 'brown' : null, backgroundColor: this.state.errorPLMKATTPAT ? '#f3ece7' : null }} name="Please_Make_Attempt_At" value={this.state.Please_Make_Attempt_At} onChange={e => this.setState({ Please_Make_Attempt_At: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorPLMKATTPAT}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorPRIORITY ? 'brown' : null }}>Priority Status</label>
                                                        <select className="" style={{ borderColor: this.state.errorPRIORITY ? 'brown' : null, backgroundColor: this.state.errorPRIORITY ? '#f3ece7' : null }} value={this.state.Priority_Status} onChange={e => this.setState({ Priority_Status: e.target.value })}>
                                                            <option value="">Select</option>
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
                                                            <option value="">Select</option>
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
                                                    <button className="ui  button" type="submit" onClick={() => this.onClear()}>Clear</button>
                                                    <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            {/* <div className="ui message">
                    <pre>
                        {JSON.stringify({
                            
                            "CASEDT": this.formatDate(this.state.Date),
                            "COURTNM": this.state.Court,
                            "FILENO": this.state.File,
                            "LTDTTOSERV": this.formatDate(this.state.Last_Date_To_Serve),
                            "TYPE": this.state.Type,
                            "HEARINGSETFOR": this.state.Hearing_Set_For,
                            "AT": this.state.AT,
                            "DEPT": this.state.Department,
                            "MISCELIST": this.state.Miscellaneous_Instructions,
                            "FRSTNM": this.state.First_Name,
                            "LSTNM": this.state.Last_Name,
                            "SEX": this.state.Sex,
                            "AGE": this.state.Age,
                            "RACE": this.state.Race,
                            "HEIGHT": this.state.Height,
                            "WEIGHT": this.state.Weight,
                            "HAIRCOLOR": this.state.Hair_Color,
                            "RESADDRESS": this.state.Residence_Address,
                            "BUSADDRESS": this.state.Business_Address,
                            "BTTMTOSERV": this.state.Best_Time_To_Serve,
                            "HOURSOFWK": this.state.Hours_Of_Work,
                            "PLMKATTPAT": this.state.Please_Make_Attempt_At,
                            "PRIORITY": this.state.Priority_Status,
                            "ASSIGNUSER": this.state.Assign_To
                        })}
                    </pre>
                </div> */}
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