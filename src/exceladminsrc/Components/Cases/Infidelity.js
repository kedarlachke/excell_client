import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { CasesCRUDOpsQuery, DropdwonQueryLeads, caseDetails } from '../Queries/queries';
var DropdownCasesList = [];
var errorval = false
export default class Infidelity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Client_Id: "",
            Case_Id: "",
            Surveillance_Start_Date: "",
            Surveillance_End_Date: "",
            GPS: "",
            Action: "",
            Surveillance: "",
            Permission_To_Move_Forward: "",
            Surveillance_On_The_Subject: "",
            Permission_To_Go_Beyond_The_Allowed_Time: "",
            Budget: "",
            Aboutus: "",
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
            License_Plate: "",
            Make: "",
            Model: "",
            Description: "",
            Priority_Status: "",
            Assign_To: "",
            CDATE: this.formatSystemDate(),
            DropdownCasesListArr: [],
            tcode: 'CREATE',
            Dispalycomp: true,
       
            //error state
            errorSURSTARTDT: "",
            errorSURENDDT: "",
            errorISGPSNEEDED: "",
            errorACTIONDETAILS: "",
            errorDAYSFORSUR: "",
            errorISIFTWOINVESTIGATORS: "",
            errorISPREVIOUSSUR: "",
            errorISBEYONDTMACTIVE: "",
            errorBUDGET: "",
            errorFRSTNM: "",
            errorLSTNM: "",
            errorSEX: "",
            errorLICENSEPLATE: "",
            errorCMAKE: "",
            errorCMODEL: "",
            errorCDESCRIPTION: "",
            errorPRIORITY: "",
            errorBUSADDRESS: "",
            errorHAIRCOLOR: "",
            errorHEARABOUTUS: "",
            errorHEIGHT: "",
            errorRACE: "",
            errorRESADDRESS: "",
            errorWEIGHT: "",
            DispalyBackColor: false,
            OnClickButton: '',
        }
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
    };

    componentDidMount() {
        this.DropdownCases()

        // Populate Data When Edit Mode
        if (this.props.data) {
            this.setState({
                // Dispalycomp: !this.state.Dispalycomp
            });
            this.PopulateData(this.props.data);
        };

        // Populate Data when back to Case tab
        if (this.props.Case_Id) {
            this.setState({
                // Dispalycomp: !this.state.Dispalycomp
            });
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
                Surveillance_Start_Date: this.formatDate1(result.data.caseDetails[0].SURSTARTDT),
                Surveillance_End_Date: this.formatDate1(result.data.caseDetails[0].SURENDDT),
                GPS: result.data.caseDetails[0].ISGPSNEEDED,
                Action: result.data.caseDetails[0].ACTIONDETAILS,
                Surveillance: result.data.caseDetails[0].DAYSFORSUR,
                Permission_To_Move_Forward: result.data.caseDetails[0].ISIFTWOINVESTIGATORS,
                Surveillance_On_The_Subject: result.data.caseDetails[0].ISPREVIOUSSUR,
                Permission_To_Go_Beyond_The_Allowed_Time: result.data.caseDetails[0].ISBEYONDTMACTIVE,
                Budget: result.data.caseDetails[0].BUDGET,
                Aboutus: result.data.caseDetails[0].HEARABOUTUS,

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



                License_Plate: result.data.caseDetails[0].LICENSEPLATE,
                Make: result.data.caseDetails[0].CMAKE,
                Model: result.data.caseDetails[0].CMODEL,
                Description: result.data.caseDetails[0].CDESCRIPTION,


                Priority_Status: result.data.caseDetails[0].PRIORITY,
                Assign_To: result.data.caseDetails[0].ASSIGNUSER,
                tcode: 'UPDATE',
                // Dispalycomp: !this.state.Dispalycomp
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

    // To Set dropdwon values
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


    // TO craete case
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
                        errorSURSTARTDT: errorMessage[key].errorSURSTARTDT,
                        errorSURENDDT: errorMessage[key].errorSURENDDT,
                        errorISGPSNEEDED: errorMessage[key].errorISGPSNEEDED,
                        errorACTIONDETAILS: errorMessage[key].errorACTIONDETAILS,
                        errorDAYSFORSUR: errorMessage[key].errorDAYSFORSUR,
                        errorISIFTWOINVESTIGATORS: errorMessage[key].errorISIFTWOINVESTIGATORS,
                        errorISPREVIOUSSUR: errorMessage[key].errorISPREVIOUSSUR,
                        errorISBEYONDTMACTIVE: errorMessage[key].errorISBEYONDTMACTIVE,
                        errorBUDGET: errorMessage[key].errorBUDGET,
                        errorFRSTNM: errorMessage[key].errorFRSTNM,
                        errorLSTNM: errorMessage[key].errorLSTNM,
                        errorSEX: errorMessage[key].errorSEX,
                        errorLICENSEPLATE: errorMessage[key].errorLICENSEPLATE,
                        errorCMAKE: errorMessage[key].errorCMAKE,
                        errorCMODEL: errorMessage[key].errorCMODEL,
                        errorCDESCRIPTION: errorMessage[key].errorCDESCRIPTION,
                        errorPRIORITY: errorMessage[key].errorPRIORITY,
                        errorBUSADDRESS: errorMessage[key].errorBUSADDRESS,
                        errorHAIRCOLOR: errorMessage[key].errorHAIRCOLOR,
                        errorHEARABOUTUS: errorMessage[key].errorHEARABOUTUS,
                        errorHEIGHT: errorMessage[key].errorHEIGHT,
                        errorRACE: errorMessage[key].errorRACE,
                        errorRESADDRESS: errorMessage[key].errorRESADDRESS,
                        errorWEIGHT: errorMessage[key].errorWEIGHT,
                    })
                }

            }
            else {
                console.log(result);
                //this.navigateToCaseList();
                //this.gotoCaseType();
                await this.setState({ Case_Id: result.data.CasesAffected[0] });

                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Case Details Accepted ..!!")
                    this.setState({
                        errorSURSTARTDT: "",
                        errorSURENDDT: "",
                        errorISGPSNEEDED: "",
                        errorACTIONDETAILS: "",
                        errorDAYSFORSUR: "",
                        errorISIFTWOINVESTIGATORS: "",
                        errorISPREVIOUSSUR: "",
                        errorISBEYONDTMACTIVE: "",
                        errorBUDGET: "",
                        errorFRSTNM: "",
                        errorLSTNM: "",
                        errorSEX: "",
                        errorLICENSEPLATE: "",
                        errorCMAKE: "",
                        errorCMODEL: "",
                        errorCDESCRIPTION: "",
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
            await this.setState({ DispalyBackColor: true });
            this.showMsg("Client Details Must be fill first")
        }

    };


    setCreateParams() {
        var parameters = {
            "typeofCase": "INFIDELITY",
            "transaction": "CREATE",
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CASEDT": this.state.CDATE,
                    "CLIENTID": this.state.Client_Id,

                    "SURSTARTDT": this.formatDate(this.state.Surveillance_Start_Date),
                    "SURENDDT": this.formatDate(this.state.Surveillance_End_Date),
                    "ISGPSNEEDED": this.state.GPS,
                    "ACTIONDETAILS": this.state.Action,
                    "DAYSFORSUR": this.state.Surveillance,
                    "ISIFTWOINVESTIGATORS": this.state.Permission_To_Move_Forward,
                    "ISPREVIOUSSUR": this.state.Surveillance_On_The_Subject,
                    "ISBEYONDTMACTIVE": this.state.Permission_To_Go_Beyond_The_Allowed_Time,
                    "BUDGET": this.state.Budget,
                    "HEARABOUTUS": this.state.Aboutus,
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
                    "LICENSEPLATE": this.state.License_Plate,
                    "CMAKE": this.state.Make,
                    "CMODEL": this.state.Model,
                    "CDESCRIPTION": this.state.Description,
                    "PRIORITY": this.state.Priority_Status,
                    "ASSIGNUSER": this.state.Assign_To,
                    "LTDTTOSERV": this.state.CDATE

                }
            ]
        }
        return parameters

    };

    // To Update case
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
                    errorSURSTARTDT: errorMessage[key].errorSURSTARTDT,
                    errorSURENDDT: errorMessage[key].errorSURENDDT,
                    errorISGPSNEEDED: errorMessage[key].errorISGPSNEEDED,
                    errorACTIONDETAILS: errorMessage[key].errorACTIONDETAILS,
                    errorDAYSFORSUR: errorMessage[key].errorDAYSFORSUR,
                    errorISIFTWOINVESTIGATORS: errorMessage[key].errorISIFTWOINVESTIGATORS,
                    errorISPREVIOUSSUR: errorMessage[key].errorISPREVIOUSSUR,
                    errorISBEYONDTMACTIVE: errorMessage[key].errorISBEYONDTMACTIVE,
                    errorBUDGET: errorMessage[key].errorBUDGET,
                    errorFRSTNM: errorMessage[key].errorFRSTNM,
                    errorLSTNM: errorMessage[key].errorLSTNM,
                    errorSEX: errorMessage[key].errorSEX,
                    errorLICENSEPLATE: errorMessage[key].errorLICENSEPLATE,
                    errorCMAKE: errorMessage[key].errorCMAKE,
                    errorCMODEL: errorMessage[key].errorCMODEL,
                    errorCDESCRIPTION: errorMessage[key].errorCDESCRIPTION,
                    errorPRIORITY: errorMessage[key].errorPRIORITY,

                    errorBUSADDRESS: errorMessage[key].errorBUSADDRESS,
                    errorHAIRCOLOR: errorMessage[key].errorHAIRCOLOR,
                    errorHEARABOUTUS: errorMessage[key].errorHEARABOUTUS,
                    errorHEIGHT: errorMessage[key].errorHEIGHT,
                    errorRACE: errorMessage[key].errorRACE,
                    errorRESADDRESS: errorMessage[key].errorRESADDRESS,
                    errorWEIGHT: errorMessage[key].errorWEIGHT,
                })
            }

        }
        else {
            console.log(result);
            //this.navigateToCaseList();
            //this.gotoCaseType();
            await this.setState({ Case_Id: result.data.CasesAffected[0] });
            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Case Details Accepted ..!!")
                this.setState({
                    errorSURSTARTDT: "",
                    errorSURENDDT: "",
                    errorISGPSNEEDED: "",
                    errorACTIONDETAILS: "",
                    errorDAYSFORSUR: "",
                    errorISIFTWOINVESTIGATORS: "",
                    errorISPREVIOUSSUR: "",
                    errorISBEYONDTMACTIVE: "",
                    errorBUDGET: "",
                    errorFRSTNM: "",
                    errorLSTNM: "",
                    errorSEX: "",
                    errorLICENSEPLATE: "",
                    errorCMAKE: "",
                    errorCMODEL: "",
                    errorCDESCRIPTION: "",
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
            "typeofCase": "INFIDELITY",
            "transaction": "UPDATE",
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CASEDT": this.state.CDATE,
                    "CLIENTID": this.state.Client_Id,
                    "CIDSYS": this.state.Case_Id,
                    "SURSTARTDT": this.formatDate(this.state.Surveillance_Start_Date),
                    "SURENDDT": this.formatDate(this.state.Surveillance_End_Date),
                    "ISGPSNEEDED": this.state.GPS,
                    "ACTIONDETAILS": this.state.Action,
                    "DAYSFORSUR": this.state.Surveillance,
                    "ISIFTWOINVESTIGATORS": this.state.Permission_To_Move_Forward,
                    "ISPREVIOUSSUR": this.state.Surveillance_On_The_Subject,
                    "ISBEYONDTMACTIVE": this.state.Permission_To_Go_Beyond_The_Allowed_Time,
                    "BUDGET": this.state.Budget,
                    "HEARABOUTUS": this.state.Aboutus,
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
                    "LICENSEPLATE": this.state.License_Plate,
                    "CMAKE": this.state.Make,
                    "CMODEL": this.state.Model,
                    "CDESCRIPTION": this.state.Description,
                    "PRIORITY": this.state.Priority_Status,
                    "ASSIGNUSER": this.state.Assign_To,
                    "LTDTTOSERV": this.state.CDATE

                }
            ]
        }
        return parameters

    };


    // ..............Date Formate Convertion..........
    formatDate(CDate) {
        var year = CDate.slice(0, 4)
        var month = CDate.slice(5, 7)
        var day = CDate.slice(8, 10)
        var date_format = year + month + day
        return date_format
    }


    //......To Convert System Date to yyyymmdd.....//
    formatSystemDate() {
        //  console.log(this.state.CaseDt);
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        month = month.length == 1 ? '0' + month : month;
        var day = date.getDate().toString();
        var date_format = year + month + day
        console.log(date_format);
        return date_format
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



    // Navigate To Case List
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


    // To Clear Inputfield and error
    onClear() {
        this.setState({
            Surveillance_Start_Date: "",
            Surveillance_End_Date: "",
            GPS: "",
            Action: "",
            Surveillance: "",
            Permission_To_Move_Forward: "",
            Surveillance_On_The_Subject: "",
            Permission_To_Go_Beyond_The_Allowed_Time: "",
            Budget: "",
            Aboutus: "",
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
            License_Plate: "",
            Make: "",
            Model: "",
            Description: "",
            Priority_Status: "",
            Assign_To: "",
            //error state
            errorSURSTARTDT: "",
            errorSURENDDT: "",
            errorISGPSNEEDED: "",
            errorACTIONDETAILS: "",
            errorDAYSFORSUR: "",
            errorISIFTWOINVESTIGATORS: "",
            errorISPREVIOUSSUR: "",
            errorISBEYONDTMACTIVE: "",
            errorBUDGET: "",
            errorFRSTNM: "",
            errorLSTNM: "",
            errorSEX: "",
            errorLICENSEPLATE: "",
            errorCMAKE: "",
            errorCMODEL: "",
            errorCDESCRIPTION: "",
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
                                                        <label style={{ color: this.state.errorSURSTARTDT ? 'brown' : null }}>Surveillance (Start date)</label>
                                                        <div className="ui  input">
                                                            <input type="Date" style={{ borderColor: this.state.errorSURSTARTDT ? 'brown' : null, backgroundColor: this.state.errorSURSTARTDT ? '#f3ece7' : null }} name="Surveillance_Start_Date" value={this.state.Surveillance_Start_Date} onChange={e => this.setState({ Surveillance_Start_Date: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSURSTARTDT}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSURENDDT ? 'brown' : null }}>Surveillance (End date)</label>
                                                        <div className="ui  input">
                                                            <input type="Date" style={{ borderColor: this.state.errorSURENDDT ? 'brown' : null, backgroundColor: this.state.errorSURENDDT ? '#f3ece7' : null }} name="Surveillance_End_Date" value={this.state.Surveillance_End_Date} onChange={e => this.setState({ Surveillance_End_Date: e.target.value })} />
                                                        </div>
                                                        <div className="field">
                                                            {errorval ? <span id="errorspan">{this.state.errorSURENDDT}</span> : null}
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className=" five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorISGPSNEEDED ? 'brown' : null }}>GPS Needed (Y/N)</label>
                                                        <select className="" style={{ borderColor: this.state.errorISGPSNEEDED ? 'brown' : null, backgroundColor: this.state.errorISGPSNEEDED ? '#f3ece7' : null }} value={this.state.GPS} onChange={e => this.setState({ GPS: e.target.value })}>
                                                            <option value="">Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorISGPSNEEDED}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorACTIONDETAILS ? 'brown' : null }}>Please explain in detail what action you are looking for</label>
                                                        <div className="ui right icon  input">
                                                            <textarea name='Action' style={{ borderColor: this.state.errorACTIONDETAILS ? 'brown' : null, backgroundColor: this.state.errorACTIONDETAILS ? '#f3ece7' : null }} rows="2" value={this.state.Action} onChange={e => this.setState({ Action: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorACTIONDETAILS}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorDAYSFORSUR ? 'brown' : null }}>Are there specific days for surveillance to be conducted</label>
                                                        <div className="ui right icon  input">
                                                            <textarea name='Surveillance' style={{ borderColor: this.state.errorDAYSFORSUR ? 'brown' : null, backgroundColor: this.state.errorDAYSFORSUR ? '#f3ece7' : null }} rows="1" value={this.state.Surveillance} onChange={e => this.setState({ Surveillance: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorDAYSFORSUR}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null }}>If 2 investigators are needed, do we have the permission to move forward (Y/N)</label>
                                                        <select className="" style={{ borderColor: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null, backgroundColor: this.state.errorISIFTWOINVESTIGATORS ? '#f3ece7' : null }} value={this.state.Permission_To_Move_Forward} onChange={e => this.setState({ Permission_To_Move_Forward: e.target.value })} >
                                                            <option value="">Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorISIFTWOINVESTIGATORS}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorISPREVIOUSSUR ? 'brown' : null }}>Have you previously conducted any surveillance on the subject (Y/N)</label>
                                                        <select className="" style={{ borderColor: this.state.errorISPREVIOUSSUR ? 'brown' : null, backgroundColor: this.state.errorISPREVIOUSSUR ? '#f3ece7' : null }} value={this.state.Surveillance_On_The_Subject} onChange={e => this.setState({ Surveillance_On_The_Subject: e.target.value })}>
                                                            <option value="">Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorISPREVIOUSSUR}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorISBEYONDTMACTIVE ? 'brown' : null }}>If the subject is active, do we have permission to go beyond the allowed time (Y/N)</label>
                                                        <select className="" style={{ borderColor: this.state.errorISBEYONDTMACTIVE ? 'brown' : null, backgroundColor: this.state.errorISBEYONDTMACTIVE ? '#f3ece7' : null }} value={this.state.Permission_To_Go_Beyond_The_Allowed_Time} onChange={e => this.setState({ Permission_To_Go_Beyond_The_Allowed_Time: e.target.value })} >
                                                            <option value="">Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorISBEYONDTMACTIVE}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorBUDGET ? 'brown' : null }}>Budget for the Investigation</label>
                                                        <div className="ui right icon  input">
                                                            <textarea name='Budget' style={{ borderColor: this.state.errorBUDGET ? 'brown' : null, backgroundColor: this.state.errorBUDGET ? '#f3ece7' : null }} rows="1" value={this.state.Budget} onChange={e => this.setState({ Budget: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorBUDGET}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorHEARABOUTUS ? 'brown' : null }}>How did you hear about us ?</label>
                                                        <div className="ui right icon  input">
                                                            <textarea name='Aboutus' rows="1" style={{ borderColor: this.state.errorHEARABOUTUS ? 'brown' : null, backgroundColor: this.state.errorHEARABOUTUS ? '#f3ece7' : null }} value={this.state.Aboutus} onChange={e => this.setState({ Aboutus: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorHEARABOUTUS}</span> : null}
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
                                                            <input type="text" name="Last_Name" style={{ borderColor: this.state.errorLSTNM ? 'brown' : null, backgroundColor: this.state.errorLSTNM ? '#f3ece7' : null }} value={this.state.Last_Name} onChange={e => this.setState({ Last_Name: e.target.value })} />
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
                                                            <option value="M">M</option>
                                                            <option value="F">F</option>
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
                                                        <label style={{ color: this.state.errorRACE ? 'brown' : null }}>Race</label>
                                                        <input type="text" name="Race" value={this.state.Race} style={{ borderColor: this.state.errorRACE ? 'brown' : null, backgroundColor: this.state.errorRACE ? '#f3ece7' : null }} onChange={e => this.setState({ Race: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorRACE}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="five wide column">
                                                    <div className=" field">
                                                        <label style={{ color: this.state.errorHEIGHT ? 'brown' : null }}>Height</label>
                                                        <input type="text" name="Height" value={this.state.Height} style={{ borderColor: this.state.errorHEIGHT ? 'brown' : null, backgroundColor: this.state.errorHEIGHT ? '#f3ece7' : null }} onChange={e => this.setState({ Height: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorHEIGHT}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column" >
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorWEIGHT ? 'brown' : null }}>Weight</label>
                                                        <input type="text" name="Weight" value={this.state.Weight} style={{ borderColor: this.state.errorWEIGHT ? 'brown' : null, backgroundColor: this.state.errorWEIGHT ? '#f3ece7' : null }} onChange={e => this.setState({ Weight: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorWEIGHT}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className=" field " >
                                                        <label style={{ color: this.state.errorHAIRCOLOR ? 'brown' : null }}>Hair Color</label>
                                                        <input type="text" name="Hair_Color" value={this.state.Hair_Color} style={{ borderColor: this.state.errorHAIRCOLOR ? 'brown' : null, backgroundColor: this.state.errorHAIRCOLOR ? '#f3ece7' : null }} onChange={e => this.setState({ Hair_Color: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorHAIRCOLOR}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field" >
                                                        <label style={{ color: this.state.errorRESADDRESS ? 'brown' : null }}>Residence Address</label>
                                                        <div className="ui  input">
                                                            <input type="text" name="Residence_Address" style={{ borderColor: this.state.errorRESADDRESS ? 'brown' : null, backgroundColor: this.state.errorRESADDRESS ? '#f3ece7' : null }} value={this.state.Residence_Address} onChange={e => this.setState({ Residence_Address: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorRESADDRESS}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorBUSADDRESS ? 'brown' : null }}>Business Address</label>
                                                        <div className="ui  input">
                                                            <input type="text" name="Business_Address" style={{ borderColor: this.state.errorBUSADDRESS ? 'brown' : null, backgroundColor: this.state.errorBUSADDRESS ? '#f3ece7' : null }} value={this.state.Business_Address} onChange={e => this.setState({ Business_Address: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorBUSADDRESS}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="one wide computer one wide tablet one wide mobile row">
                                            </div>
                                            <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                                <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Vehicle Info</h1>
                                            </div>
                                            <div className="one wide computer one wide tablet one wide mobile row">
                                            </div>
                                            <div className=" row" >
                                                <div className="five wide column">
                                                    <div className=" field">
                                                        <label style={{ color: this.state.errorLICENSEPLATE ? 'brown' : null }}>License Plate #</label>
                                                        <input type="text" name="License_Plate" style={{ borderColor: this.state.errorLICENSEPLATE ? 'brown' : null, backgroundColor: this.state.errorLICENSEPLATE ? '#f3ece7' : null }} value={this.state.License_Plate} onChange={e => this.setState({ License_Plate: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorLICENSEPLATE}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column" >
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCMAKE ? 'brown' : null }}>Make</label>
                                                        <input type="text" name="Make" style={{ borderColor: this.state.errorCMAKE ? 'brown' : null, backgroundColor: this.state.errorCMAKE ? '#f3ece7' : null }} value={this.state.Make} onChange={e => this.setState({ Make: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCMAKE}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className=" field " >
                                                        <label style={{ color: this.state.errorCMODEL ? 'brown' : null }}>Model</label>
                                                        <input type="text" name="Model" style={{ borderColor: this.state.errorCMODEL ? 'brown' : null, backgroundColor: this.state.errorCMODEL ? '#f3ece7' : null }} value={this.state.Model} onChange={e => this.setState({ Model: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCMODEL}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCDESCRIPTION ? 'brown' : null }}>Description</label>
                                                        <div className="ui right icon  input">
                                                            <textarea name='aboutus' style={{ borderColor: this.state.errorCDESCRIPTION ? 'brown' : null, backgroundColor: this.state.errorCDESCRIPTION ? '#f3ece7' : null }} rows="1" value={this.state.Description} onChange={e => this.setState({ Description: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCDESCRIPTION}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row" >
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
                                                    <button className="ui  button" type="submit" onClick={() => this.onClear()} >Clear</button>
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

                                    "Surveillance_Start_Date": this.state.Surveillance_Start_Date,
                                   " Surveillance_End_Date": this.state.Surveillance_End_Date,
                                    "GPS": this.state.GPS,
                                    "Action": this.state.Action,
                                    "Surveillance": this.state.Surveillance,
                                   "Permission_To_Move_Forward": this.state.Permission_To_Move_Forward,
                                    "Surveillance_On_The_Subject": this.state.Surveillance_On_The_Subject,
                                    "Permission_To_Go_Beyond_The_Allowed_Time":this.state.Permission_To_Go_Beyond_The_Allowed_Time,
                                    "Budget": this.state.Budget,
                                    "Aboutus":this.state.Aboutus,
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
                                   " License_Plate": this.state.License_Plate,
                                    "Make": this.state.Make,
                                    "Model": this.state.Model,
                                    "Description": this.state.Description,
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