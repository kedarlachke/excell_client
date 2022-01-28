import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { CasesCRUDOpsQuery, DropdwonQueryLeads, caseDetails } from '../Queries/queries';
var DropdownCasesList = [];
var errorval = false;
export default class ChildCustody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Client_Id: "",
            Case_Id: "",
            CaseDt: this.formatSystemDate(),
            SurveillanceStartdate: "",
            SurveillanceEnddate: "",
            GPSNeeded: "",
            ActionYouAreLookingFor: "",
            DaysForSurveillanceToBeConducted: "",
            PermissionToMoveForward: "",
            ConductedAnySurveillanceOnTheSubject: "",
            PermissionToGoBeyondTheAllowedTime: "",
            BudgetfortheInvestigation: "",
            HearAboutUs: "",

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

            LicensePlate: "",
            Make: "",
            Model: "",
            Description: "",
            CustodySituation: "",
            NegativeThingsSubjectInvolved: "",
            Priority_Status: "",
            Assign_To: "",
            tcode: "CREATE",
            Dispalycomp: true,
            DropdownCasesListArr: [],

            //errorspan
            errorSURSTARTDT: "",
            errorSURENDDT: "",
            errorISGPSNEEDED: "",
            errorACTIONDETAILS: "",

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
            errorEXPCUSTSITUATION: "",
            errorEXPNEGSUBINVOLVE: "",
            errorPRIORITY: "",

            errorBUSADDRESS: "",
            errorRESADDRESS: "",
            errorHEARABOUTUS: "",
            errorHEIGHT: "",
            errorWEIGHT: "",
            errorRACE: "",
            errorHAIRCOLOR: "",

            DispalyBackColor: false,
            OnClickButton: ''

        }
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
    };

    componentDidMount() {
        this.DropdownCases()
        console.log(this.props.data)

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

    //  To Popualte data
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
           await this.setState({
                Case_Id: result.data.caseDetails[0].CIDSYS,
                Client_Id: result.data.caseDetails[0].CLIENTID,
                SurveillanceStartdate: this.formatDate1(result.data.caseDetails[0].SURSTARTDT),
                SurveillanceEnddate: this.formatDate1(result.data.caseDetails[0].SURENDDT),
                GPSNeeded: result.data.caseDetails[0].ISGPSNEEDED,
                ActionYouAreLookingFor: result.data.caseDetails[0].ACTIONDETAILS,
                DaysForSurveillanceToBeConducted: result.data.caseDetails[0].DAYSFORSUR,
                PermissionToMoveForward: result.data.caseDetails[0].ISIFTWOINVESTIGATORS,
                ConductedAnySurveillanceOnTheSubject: result.data.caseDetails[0].ISPREVIOUSSUR,
                PermissionToGoBeyondTheAllowedTime: result.data.caseDetails[0].ISBEYONDTMACTIVE,
                BudgetfortheInvestigation: result.data.caseDetails[0].BUDGET,
                HearAboutUs: result.data.caseDetails[0].HEARABOUTUS,

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

                LicensePlate: result.data.caseDetails[0].LICENSEPLATE,
                Make: result.data.caseDetails[0].CMAKE,
                Model: result.data.caseDetails[0].CMODEL,
                Description: result.data.caseDetails[0].CDESCRIPTION,
                CustodySituation: result.data.caseDetails[0].EXPCUSTSITUATION,
                NegativeThingsSubjectInvolved: result.data.caseDetails[0].EXPNEGSUBINVOLVE,

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

    // To set dropdwon values
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


    // To Create case
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

                    this.setState({

                        errorSURSTARTDT: errorMessage[key].errorSURSTARTDT,
                        errorSURENDDT: errorMessage[key].errorSURENDDT,
                        errorISGPSNEEDED: errorMessage[key].errorISGPSNEEDED,
                        errorACTIONDETAILS: errorMessage[key].errorACTIONDETAILS,

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

                        errorEXPCUSTSITUATION: errorMessage[key].errorEXPCUSTSITUATION,
                        errorEXPNEGSUBINVOLVE: errorMessage[key].errorEXPNEGSUBINVOLVE,
                        errorPRIORITY: errorMessage[key].errorPRIORITY,

                        errorBUSADDRESS: errorMessage[key].errorBUSADDRESS,
                        errorRESADDRESS: errorMessage[key].errorRESADDRESS,
                        errorHEARABOUTUS: errorMessage[key].errorHEARABOUTUS,
                        errorHEIGHT: errorMessage[key].errorHEIGHT,
                        errorWEIGHT: errorMessage[key].errorWEIGHT,
                        errorRACE: errorMessage[key].errorRACE,
                        errorHAIRCOLOR: errorMessage[key].errorHAIRCOLOR
                    });
                }

            }
            else {
                console.log(result);
                // this.navigateToCaseList();
                //this.gotoCaseType();
                await this.setState({Case_Id:result.data.CasesAffected[0]})
                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Case Details Accepted ..!!")
                    this.setState({
                        errorSURSTARTDT: "",
                        errorSURENDDT: "",
                        errorISGPSNEEDED: "",
                        errorACTIONDETAILS: "",

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
                        errorEXPCUSTSITUATION: "",
                        errorEXPNEGSUBINVOLVE: "",
                        errorPRIORITY: "",
                    });
                    errorval = false;
                    this.PopulateData(this.state.Case_Id)
                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.gotoCaseType(this.state.Client_Id,this.state.Case_Id );
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
            "typeofCase": "CHILD_CUSTODY",
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",

                    "CASEDT": this.state.CaseDt,
                    "CLIENTID": this.state.Client_Id,

                    "SURSTARTDT": this.formatDate(this.state.SurveillanceStartdate),
                    "SURENDDT": this.formatDate(this.state.SurveillanceEnddate),
                    "ISGPSNEEDED": this.state.GPSNeeded,

                    "ACTIONDETAILS": this.state.ActionYouAreLookingFor,
                    "DAYSFORSUR": this.state.DaysForSurveillanceToBeConducted,
                    "ISIFTWOINVESTIGATORS": this.state.PermissionToMoveForward,
                    "ISPREVIOUSSUR": this.state.ConductedAnySurveillanceOnTheSubject,
                    "ISBEYONDTMACTIVE": this.state.PermissionToGoBeyondTheAllowedTime,
                    "BUDGET": this.state.BudgetfortheInvestigation,
                    "HEARABOUTUS": this.state.HearAboutUs,

                    //Subject Information
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

                    //Vehicle Info
                    "LICENSEPLATE": this.state.LicensePlate,
                    "CMAKE": this.state.Make,
                    "CMODEL": this.state.Model,
                    "CDESCRIPTION": this.state.Description,

                    "EXPCUSTSITUATION": this.state.CustodySituation,
                    "EXPNEGSUBINVOLVE": this.state.NegativeThingsSubjectInvolved,

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


    // To Upadate Case
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

                this.setState({

                    errorSURSTARTDT: errorMessage[key].errorSURSTARTDT,
                    errorSURENDDT: errorMessage[key].errorSURENDDT,
                    errorISGPSNEEDED: errorMessage[key].errorISGPSNEEDED,
                    errorACTIONDETAILS: errorMessage[key].errorACTIONDETAILS,

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

                    errorEXPCUSTSITUATION: errorMessage[key].errorEXPCUSTSITUATION,
                    errorEXPNEGSUBINVOLVE: errorMessage[key].errorEXPNEGSUBINVOLVE,
                    errorPRIORITY: errorMessage[key].errorPRIORITY,

                    errorBUSADDRESS: errorMessage[key].errorBUSADDRESS,
                    errorRESADDRESS: errorMessage[key].errorRESADDRESS,
                    errorHEARABOUTUS: errorMessage[key].errorHEARABOUTUS,
                    errorHEIGHT: errorMessage[key].errorHEIGHT,
                    errorWEIGHT: errorMessage[key].errorWEIGHT,
                    errorRACE: errorMessage[key].errorRACE,
                    errorHAIRCOLOR: errorMessage[key].errorHAIRCOLOR
                });
            }

        }
        else {
            console.log(result);
            //this.navigateToCaseList();
            //this.gotoCaseType();
            await this.setState({Case_Id:result.data.CasesAffected[0]})
            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Case Details Accepted ..!!")
                this.setState({
                    errorSURSTARTDT: "",
                    errorSURENDDT: "",
                    errorISGPSNEEDED: "",
                    errorACTIONDETAILS: "",

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
                    errorEXPCUSTSITUATION: "",
                    errorEXPNEGSUBINVOLVE: "",
                    errorPRIORITY: "",
                });
                errorval = false;
                this.PopulateData(this.state.Case_Id)
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                this.gotoCaseType(this.state.Client_Id, this.state.Case_Id);
            }
        }

    };


    setUpdateParams() {
        var parameters = {
            "typeofCase": "CHILD_CUSTODY",
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",

                    "CASEDT": this.state.CaseDt,
                    "CIDSYS": this.state.Case_Id,
                    "CLIENTID": this.state.Client_Id,

                    "SURSTARTDT": this.formatDate(this.state.SurveillanceStartdate),
                    "SURENDDT": this.formatDate(this.state.SurveillanceEnddate),
                    "ISGPSNEEDED": this.state.GPSNeeded,

                    "ACTIONDETAILS": this.state.ActionYouAreLookingFor,
                    "DAYSFORSUR": this.state.DaysForSurveillanceToBeConducted,
                    "ISIFTWOINVESTIGATORS": this.state.PermissionToMoveForward,
                    "ISPREVIOUSSUR": this.state.ConductedAnySurveillanceOnTheSubject,
                    "ISBEYONDTMACTIVE": this.state.PermissionToGoBeyondTheAllowedTime,
                    "BUDGET": this.state.BudgetfortheInvestigation,
                    "HEARABOUTUS": this.state.HearAboutUs,

                    //Subject Information
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

                    //Vehicle Info
                    "LICENSEPLATE": this.state.LicensePlate,
                    "CMAKE": this.state.Make,
                    "CMODEL": this.state.Model,
                    "CDESCRIPTION": this.state.Description,

                    "EXPCUSTSITUATION": this.state.CustodySituation,
                    "EXPNEGSUBINVOLVE": this.state.NegativeThingsSubjectInvolved,

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
        console.log();

        var year = date.slice(0, 4)
        var month = date.slice(5, 7)
        var day = date.slice(8, 10)

        var date_format = year + month + day
        return date_format
        // console.log(date_format);

    }


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

    // To clear inputfield and error
    onClear() {
        this.setState({
            SurveillanceStartdate: "",
            SurveillanceEnddate: "",
            GPSNeeded: "",
            ActionYouAreLookingFor: "",
            DaysForSurveillanceToBeConducted: "",
            PermissionToMoveForward: "",
            ConductedAnySurveillanceOnTheSubject: "",
            PermissionToGoBeyondTheAllowedTime: "",
            BudgetfortheInvestigation: "",
            HearAboutUs: "",

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

            LicensePlate: "",
            Make: "",
            Model: "",
            Description: "",
            CustodySituation: "",
            NegativeThingsSubjectInvolved: "",
            Priority_Status: "",
            Assign_To: "",

            errorSURSTARTDT: "",
            errorSURENDDT: "",
            errorISGPSNEEDED: "",
            errorACTIONDETAILS: "",

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
            errorEXPCUSTSITUATION: "",
            errorEXPNEGSUBINVOLVE: "",
            errorPRIORITY: "",
        })
        errorval = false
    };



    //............for show msg..........
    async showMsg(text) {
        await this.setState({ showMsgText: text })
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    };


    render() {

        //console.log(this.state.CaseDt);
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

                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSURSTARTDT ? 'brown' : null }}>Surveillance (Start date)</label>
                                                        <div className="ui input">
                                                            <input type="Date" style={{ borderColor: this.state.errorSURSTARTDT ? 'brown' : null, backgroundColor: this.state.errorSURSTARTDT ? '#f3ece7' : null }} name="SurveillanceStartdate" placeholder="Surveillance (Start date)" value={this.state.SurveillanceStartdate} onChange={e => this.setState({ SurveillanceStartdate: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSURSTARTDT}</span> : null}
                                                    </div>
                                                </div>
                                                <div className=" five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSURENDDT ? 'brown' : null }}>Surveillance (End date)</label>
                                                        <div className="ui input">
                                                            <input type="Date" style={{ borderColor: this.state.errorSURENDDT ? 'brown' : null, backgroundColor: this.state.errorSURENDDT ? '#f3ece7' : null }} name="SurveillanceEnddate" placeholder="Surveillance (End date)" value={this.state.SurveillanceEnddate} onChange={e => this.setState({ SurveillanceEnddate: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSURENDDT}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row">

                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorISGPSNEEDED ? 'brown' : null }}>GPS Needed (Y/N)</label>
                                                        <select className="" style={{ borderColor: this.state.errorISGPSNEEDED ? 'brown' : null, backgroundColor: this.state.errorISGPSNEEDED ? '#f3ece7' : null }} value={this.state.GPSNeeded} onChange={e => this.setState({ GPSNeeded: e.target.value })}>
                                                            <option>Select</option>
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
                                                        <div className="ui input">
                                                            <textarea rows="2" style={{ borderColor: this.state.errorACTIONDETAILS ? 'brown' : null, backgroundColor: this.state.errorACTIONDETAILS ? '#f3ece7' : null }} name="ActionYouAreLookingFor" value={this.state.ActionYouAreLookingFor} onChange={e => this.setState({ ActionYouAreLookingFor: e.target.value })} />
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
                                                        <div className="ui input">
                                                            <input type="text" style={{ borderColor: this.state.errorDAYSFORSUR ? 'brown' : null, backgroundColor: this.state.errorDAYSFORSUR ? '#f3ece7' : null }} name="DaysForSurveillanceToBeConducted" value={this.state.DaysForSurveillanceToBeConducted} onChange={e => this.setState({ DaysForSurveillanceToBeConducted: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorDAYSFORSUR}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" row">

                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null }}>If 2 investigators are needed, do we have the permission to move forward (Y/N)</label>
                                                        <select className="" style={{ borderColor: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null, backgroundColor: this.state.errorISIFTWOINVESTIGATORS ? '#f3ece7' : null }} value={this.state.PermissionToMoveForward} onChange={e => this.setState({ PermissionToMoveForward: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorISIFTWOINVESTIGATORS}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row">

                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorISPREVIOUSSUR ? 'brown' : null }}>Have you previously conducted any surveillance on the subject (Y/N)</label>
                                                        <select className="" style={{ borderColor: this.state.errorISPREVIOUSSUR ? 'brown' : null, backgroundColor: this.state.errorISPREVIOUSSUR ? '#f3ece7' : null }} value={this.state.ConductedAnySurveillanceOnTheSubject} onChange={e => this.setState({ ConductedAnySurveillanceOnTheSubject: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorISPREVIOUSSUR}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row">

                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorISBEYONDTMACTIVE ? 'brown' : null }}>If the subject is active, do we have permission to go beyond the allowed time (Y/N)</label>
                                                        <select className="" style={{ borderColor: this.state.errorISBEYONDTMACTIVE ? 'brown' : null, backgroundColor: this.state.errorISBEYONDTMACTIVE ? '#f3ece7' : null }} value={this.state.PermissionToGoBeyondTheAllowedTime} onChange={e => this.setState({ PermissionToGoBeyondTheAllowedTime: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorISBEYONDTMACTIVE}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row" >
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorBUDGET ? 'brown' : null }}>Budget for the Investigation</label>
                                                        <div className="ui input">
                                                            <input type="text" style={{ borderColor: this.state.errorBUDGET ? 'brown' : null, backgroundColor: this.state.errorBUDGET ? '#f3ece7' : null }} name="BudgetfortheInvestigation" value={this.state.BudgetfortheInvestigation} onChange={e => this.setState({ BudgetfortheInvestigation: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorBUDGET}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row" >
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorHEARABOUTUS ? 'brown' : null }}>How did you hear about us ?</label>
                                                        <div className="ui input">
                                                            <input type="text" name="HearAboutUs" value={this.state.HearAboutUs} style={{ borderColor: this.state.errorHEARABOUTUS ? 'brown' : null, backgroundColor: this.state.errorHEARABOUTUS ? '#f3ece7' : null }} onChange={e => this.setState({ HearAboutUs: e.target.value })} />
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
                                                        <label style={{ color: this.state.errorFRSTNM ? 'brown' : null }} >First Name</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input type="text" style={{ borderColor: this.state.errorFRSTNM ? 'brown' : null, backgroundColor: this.state.errorFRSTNM ? '#f3ece7' : null }} name="First_Name" value={this.state.First_Name} onChange={e => this.setState({ First_Name: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorFRSTNM}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorLSTNM ? 'brown' : null }}  >Last Name</label>
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
                                                            <option>Select</option>
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
                                                        <input type="text" name="Race" style={{ borderColor: this.state.errorRACE ? 'brown' : null, backgroundColor: this.state.errorRACE ? '#f3ece7' : null }} value={this.state.Race} onChange={e => this.setState({ Race: e.target.value })} />
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
                                                        <input type="text" name="Weight" style={{ borderColor: this.state.errorWEIGHT ? 'brown' : null, backgroundColor: this.state.errorWEIGHT ? '#f3ece7' : null }} value={this.state.Weight} onChange={e => this.setState({ Weight: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorWEIGHT}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className=" field " >
                                                        <label style={{ color: this.state.errorHAIRCOLOR ? 'brown' : null }}>Hair Color</label>
                                                        <input type="text" name="Hair_Color" style={{ borderColor: this.state.errorHAIRCOLOR ? 'brown' : null, backgroundColor: this.state.errorHAIRCOLOR ? '#f3ece7' : null }} value={this.state.Hair_Color} onChange={e => this.setState({ Hair_Color: e.target.value })} />
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
                                                        <div className="ui input">
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
                                                        <div className="ui input">
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
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorLICENSEPLATE ? 'brown' : null }}>License Plate #</label>
                                                        <input type="text" style={{ borderColor: this.state.errorLICENSEPLATE ? 'brown' : null, backgroundColor: this.state.errorLICENSEPLATE ? '#f3ece7' : null }} name="LicensePlate" value={this.state.LicensePlate} onChange={e => this.setState({ LicensePlate: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorLICENSEPLATE}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCMAKE ? 'brown' : null }}>Make</label>
                                                        <input type="text" style={{ borderColor: this.state.errorCMAKE ? 'brown' : null, backgroundColor: this.state.errorCMAKE ? '#f3ece7' : null }} name="Make" value={this.state.Make} onChange={e => this.setState({ Make: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCMAKE}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCMODEL ? 'brown' : null }}>Model</label>
                                                        <input type="text" style={{ borderColor: this.state.errorCMODEL ? 'brown' : null, backgroundColor: this.state.errorCMODEL ? '#f3ece7' : null }} name="Model" value={this.state.Model} onChange={e => this.setState({ Model: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCMODEL}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCDESCRIPTION ? 'brown' : null }} >Description</label>
                                                        <div className="ui input">
                                                            <input type="text" style={{ borderColor: this.state.errorCDESCRIPTION ? 'brown' : null, backgroundColor: this.state.errorCDESCRIPTION ? '#f3ece7' : null }} name="Description" value={this.state.Description} onChange={e => this.setState({ Description: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCDESCRIPTION}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorEXPCUSTSITUATION ? 'brown' : null }}>With whom is the child living ? Explain the custody situation</label>
                                                        <div className="ui input">
                                                            <textarea style={{ borderColor: this.state.errorEXPCUSTSITUATION ? 'brown' : null, backgroundColor: this.state.errorEXPCUSTSITUATION ? '#f3ece7' : null }} rows="2" name="CustodySituation" value={this.state.CustodySituation} onChange={e => this.setState({ CustodySituation: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorEXPCUSTSITUATION}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorEXPNEGSUBINVOLVE ? 'brown' : null }}>Explain what negative things the subject is involved with?</label>
                                                        <div className="ui input">
                                                            <textarea style={{ borderColor: this.state.errorEXPNEGSUBINVOLVE ? 'brown' : null, backgroundColor: this.state.errorEXPNEGSUBINVOLVE ? '#f3ece7' : null }} rows="2" name="NegativeThingsSubjectInvolved" value={this.state.NegativeThingsSubjectInvolved} onChange={e => this.setState({ NegativeThingsSubjectInvolved: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorEXPNEGSUBINVOLVE}</span> : null}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className=" row">

                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorPRIORITY ? 'brown' : null }}>Priority Status</label>
                                                        <select className="" style={{ borderColor: this.state.errorPRIORITY ? 'brown' : null, backgroundColor: this.state.errorPRIORITY ? '#f3ece7' : null }} value={this.state.Priority_Status} onChange={e => this.setState({ Priority_Status: e.target.value })}>
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

                                    "SurveillanceStartdate": this.formatDate(this.state.SurveillanceStartdate),
                                    "SurveillanceEnddate": this.formatDate(this.state.SurveillanceEnddate),
                                    "GPSNeeded": this.state.GPSNeeded,
                                    "ActionYouAreLookingFor": this.state.ActionYouAreLookingFor,
                                    "DaysForSurveillanceToBeConducted": this.state.DaysForSurveillanceToBeConducted,
                                    "PermissionToMoveForward": this.state.PermissionToMoveForward,
                                    "ConductedAnySurveillanceOnTheSubject": this.state.ConductedAnySurveillanceOnTheSubject,
                                    "PermissionToGoBeyondTheAllowedTime": this.state.PermissionToGoBeyondTheAllowedTime,
                                    "BudgetfortheInvestigation": this.state.BudgetfortheInvestigation,
                                    "HearAboutUs": this.state.HearAboutUs,

                                    "First_Name": this.state.First_Name,
                                    "Last_Name": this.state.Last_Name,
                                    "Sex": this.state.Sex,
                                    "Age": this.state.Age,
                                    "Race": this.state.Race,
                                    "Height": this.state.Height,
                                    "Weight": this.state.Weight,
                                    "Hair_Color": this.state.Hair_Color,
                                    "Residence_Address": this.state.Residence_Address,
                                    "Business_Address": this.state.Business_Address,

                                    "LicensePlate": this.state.Best_Time_To_Serve,
                                    "Make": this.state.Hours_Of_Work,
                                    "Model": this.state.Please_Make_Attempt_At,
                                    "Description": this.state.Priority_Status,
                                    "CustodySituation": this.state.Best_Time_To_Serve,
                                    "NegativeThingsSubjectInvolved": this.state.Best_Time_To_Serve,
                                    "Priority_Status": this.state.Best_Time_To_Serve,
                                    "Assign_To": this.state.Best_Time_To_Serve

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