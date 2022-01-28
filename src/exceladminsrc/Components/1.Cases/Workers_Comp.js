import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
//import { casesCRUDOperations, DropdwonQueryLeads } from '../Queries/gqlQueries';
import { CasesCRUDOpsQuery, DropdwonQueryLeads, caseDetails } from '../Queries/queries';
var DropdownCasesList = [];
var errorval = false;
export default class WorkersComp extends Component {
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

            SubjectRepresentedByAttorney: "",
            Claim: "",
            FirstName_Adjuster: "",
            LastName_Adjuster: "",
            Email: "",
            PhoneNumber: "",
            Address: "",
            City: "",
            State: "",
            ZipCode: "",
            ClaimOfInjury: "",
            Priority_Status: "",
            Assign_To: "",
            tcode: 'CREATE',
            Dispalycomp: true,
            DispalyDiv: 'flex',
            DropdownCasesListArr: [],
            //ERROR STATE
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
            errorDAYSFORSUR: "",
            errorLICENSEPLATE: "",
            errorCMAKE: "",
            errorCMODEL: "",
            errorCDESCRIPTION: "",
            errorPRIORITY: "",
            errorADJFIRSTNM: "",
            errorADJLASTNM: "",
            errorPHONE: "",
            errorEMAIL: "",
            errorADJADDRESS: "",
            errorCITY: "",
            errorZIPCD: "",
            errorCLAIM: "",
            errorSUBINJURYCLAIM: "",
            errorSTATE: "",
            errorISSUBREPRESENT: "",
            DispalyBackColor: false,
            OnClickButton: '',

        }
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
    };

    componentDidMount() {
        this.DropdownCases()
        console.log(this.props.data)
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
                SubjectRepresentedByAttorney: result.data.caseDetails[0].ISSUBREPRESENT,
                Claim: result.data.caseDetails[0].CLAIM,
                FirstName_Adjuster: result.data.caseDetails[0].ADJFIRSTNM,
                LastName_Adjuster: result.data.caseDetails[0].ADJLASTNM,
                Email: result.data.caseDetails[0].EMAIL,
                PhoneNumber: result.data.caseDetails[0].PHONE,
                Address: result.data.caseDetails[0].ADJADDRESS,
                City: result.data.caseDetails[0].CITY,
                State: result.data.caseDetails[0].STATE,
                ZipCode: result.data.caseDetails[0].ZIPCD,
                ClaimOfInjury: result.data.caseDetails[0].SUBINJURYCLAIM,

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



    // To Set Dropdwon Values
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


    // To Create Case
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
                        // errorDAYSFORSUR:"",
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
                        errorDAYSFORSUR: errorMessage[key].errorDAYSFORSUR,
                        errorPRIORITY: errorMessage[key].errorPRIORITY,
                        //adjr's 
                        errorADJFIRSTNM: errorMessage[key].errorADJFIRSTNM,
                        errorADJLASTNM: errorMessage[key].errorADJLASTNM,
                        errorPHONE: errorMessage[key].errorPHONE,
                        errorEMAIL: errorMessage[key].errorEMAIL,
                        errorADJADDRESS: errorMessage[key].errorADJADDRESS,
                        errorCITY: errorMessage[key].errorCITY,
                        errorZIPCD: errorMessage[key].errorZIPCD,
                        errorCLAIM: errorMessage[key].errorCLAIM,
                        errorSUBINJURYCLAIM: errorMessage[key].errorSUBINJURYCLAIM,
                        errorSTATE: errorMessage[key].errorSTATE,
                        errorISSUBREPRESENT: errorMessage[key].errorISSUBREPRESENT,
                    });
                }

            }
            else {
                console.log(result);
                //this.navigateToCaseList()
                // this.gotoCaseType();

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
                        errorDAYSFORSUR: "",
                        errorLICENSEPLATE: "",
                        errorCMAKE: "",
                        errorCMODEL: "",
                        errorCDESCRIPTION: "",
                        errorPRIORITY: "",
                        errorADJFIRSTNM: "",
                        errorADJLASTNM: "",
                        errorPHONE: "",
                        errorEMAIL: "",
                        errorADJADDRESS: "",
                        errorCITY: "",
                        errorZIPCD: "",
                        errorCLAIM: "",
                        errorSUBINJURYCLAIM: "",
                        errorSTATE: "",
                        errorISSUBREPRESENT: "",
                    });
                    errorval = false
                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.gotoCaseType(this.state.Client_Id,result.data.CasesAffected[0]);
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
            "typeofCase": "WORKERS_COMP",
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

                    //Adjuster’s Info
                    "ISSUBREPRESENT": this.state.SubjectRepresentedByAttorney,
                    "CLAIM": this.state.Claim,
                    "ADJFIRSTNM": this.state.FirstName_Adjuster,
                    "ADJLASTNM": this.state.LastName_Adjuster,
                    "EMAIL": this.state.Email,
                    "PHONE": this.state.PhoneNumber,
                    "ADJADDRESS": this.state.Address,
                    "CITY": this.state.City,
                    "STATE": this.state.State,
                    "ZIPCD": this.state.ZipCode,
                    "SUBINJURYCLAIM": this.state.ClaimOfInjury,
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

                this.setState({
                    // errorDAYSFORSUR:"",
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
                    errorDAYSFORSUR: errorMessage[key].errorDAYSFORSUR,
                    errorPRIORITY: errorMessage[key].errorPRIORITY,
                    //adjr's 
                    errorADJFIRSTNM: errorMessage[key].errorADJFIRSTNM,
                    errorADJLASTNM: errorMessage[key].errorADJLASTNM,
                    errorPHONE: errorMessage[key].errorPHONE,
                    errorEMAIL: errorMessage[key].errorEMAIL,
                    errorADJADDRESS: errorMessage[key].errorADJADDRESS,
                    errorCITY: errorMessage[key].errorCITY,
                    errorZIPCD: errorMessage[key].errorZIPCD,
                    errorCLAIM: errorMessage[key].errorCLAIM,
                    errorSUBINJURYCLAIM: errorMessage[key].errorSUBINJURYCLAIM,
                    errorSTATE: errorMessage[key].errorSTATE,
                    errorISSUBREPRESENT: errorMessage[key].errorISSUBREPRESENT,
                });
            }

        }
        else {
            console.log(result);
            //this.navigateToCaseList()
            // this.gotoCaseType();

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
                    errorDAYSFORSUR: "",
                    errorLICENSEPLATE: "",
                    errorCMAKE: "",
                    errorCMODEL: "",
                    errorCDESCRIPTION: "",
                    errorPRIORITY: "",
                    errorADJFIRSTNM: "",
                    errorADJLASTNM: "",
                    errorPHONE: "",
                    errorEMAIL: "",
                    errorADJADDRESS: "",
                    errorCITY: "",
                    errorZIPCD: "",
                    errorCLAIM: "",
                    errorSUBINJURYCLAIM: "",
                    errorSTATE: "",
                    errorISSUBREPRESENT: "",
                });
                errorval = false
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                this.gotoCaseType(this.state.Client_Id,result.data.CasesAffected[0]);
            }
        }

    };


    setUpdateParams() {
        var parameters = {
            "typeofCase": "WORKERS_COMP",
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CASEDT": this.state.CaseDt,
                    "CLIENTID": this.state.Client_Id,

                    "CIDSYS": this.props.data,

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

                    //Adjuster’s Info
                    "ISSUBREPRESENT": this.state.SubjectRepresentedByAttorney,
                    "CLAIM": this.state.Claim,
                    "ADJFIRSTNM": this.state.FirstName_Adjuster,
                    "ADJLASTNM": this.state.LastName_Adjuster,
                    "EMAIL": this.state.Email,
                    "PHONE": this.state.PhoneNumber,
                    "ADJADDRESS": this.state.Address,
                    "CITY": this.state.City,
                    "STATE": this.state.State,
                    "ZIPCD": this.state.ZipCode,
                    "SUBINJURYCLAIM": this.state.ClaimOfInjury,
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
    };

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


    // CRUD Opertaion
    CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            this.CreateCases()
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateCases()

        }
    };

    // To Clear Input field values and error
    Onclear() {
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
            SubjectRepresentedByAttorney: "",
            Claim: "",
            FirstName_Adjuster: "",
            LastName_Adjuster: "",
            Email: "",
            PhoneNumber: "",
            Address: "",
            City: "",
            State: "",
            ZipCode: "",
            ClaimOfInjury: "",
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
            errorDAYSFORSUR: "",
            errorLICENSEPLATE: "",
            errorCMAKE: "",
            errorCMODEL: "",
            errorCDESCRIPTION: "",
            errorPRIORITY: "",
            errorADJFIRSTNM: "",
            errorADJLASTNM: "",
            errorPHONE: "",
            errorEMAIL: "",
            errorADJADDRESS: "",
            errorCITY: "",
            errorZIPCD: "",
            errorCLAIM: "",
            errorSUBINJURYCLAIM: "",
            errorSTATE: "",
            errorISSUBREPRESENT: "",
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
                                                        <label>How did you hear about us ?</label>
                                                        <div className="ui input">
                                                            <input type="text" name="HearAboutUs" value={this.state.HearAboutUs} onChange={e => this.setState({ HearAboutUs: e.target.value })} />
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
                                                        <div className="ui input">
                                                            <input type="text" name="Residence_Address" value={this.state.Residence_Address} onChange={e => this.setState({ Residence_Address: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="fifteen wide column">
                                                    <div className="field">
                                                        <label >Business Address</label>
                                                        <div className="ui input">
                                                            <input type="text" name="Business_Address" value={this.state.Business_Address} onChange={e => this.setState({ Business_Address: e.target.value })} />
                                                        </div>
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



                                            <div className="one wide computer one wide tablet one wide mobile row">
                                            </div>
                                            <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                                <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Adjuster’s Info</h1>
                                            </div>
                                            <div className="one wide computer one wide tablet one wide mobile row">
                                            </div>


                                            <div className=" row" >
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorISSUBREPRESENT ? 'brown' : null }}>Is the subject represented by an attorney</label>
                                                        <select className="" style={{ borderColor: this.state.errorISSUBREPRESENT ? 'brown' : null, backgroundColor: this.state.errorISSUBREPRESENT ? '#f3ece7' : null }} value={this.state.SubjectRepresentedByAttorney} onChange={e => this.setState({ SubjectRepresentedByAttorney: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorISSUBREPRESENT}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCLAIM ? 'brown' : null }}>Claim #</label>
                                                        <div className="ui input">
                                                            <input type="text" style={{ borderColor: this.state.errorCLAIM ? 'brown' : null, backgroundColor: this.state.errorCLAIM ? '#f3ece7' : null }} name="Claim" value={this.state.Claim} onChange={e => this.setState({ Claim: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCLAIM}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorADJFIRSTNM ? 'brown' : null }}>First Name</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input type="text" style={{ borderColor: this.state.errorADJFIRSTNM ? 'brown' : null, backgroundColor: this.state.errorADJFIRSTNM ? '#f3ece7' : null }} name="FirstName_Adjuster" value={this.state.FirstName_Adjuster} onChange={e => this.setState({ FirstName_Adjuster: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorADJFIRSTNM}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorADJLASTNM ? 'brown' : null }}>Last Name</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input type="text" style={{ borderColor: this.state.errorADJLASTNM ? 'brown' : null, backgroundColor: this.state.errorADJLASTNM ? '#f3ece7' : null }} name="LastName_Adjuster" value={this.state.LastName_Adjuster} onChange={e => this.setState({ LastName_Adjuster: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorADJLASTNM}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorEMAIL ? 'brown' : null }}>Email</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input type="text" name="Email" style={{ borderColor: this.state.errorEMAIL ? 'brown' : null, backgroundColor: this.state.errorEMAIL ? '#f3ece7' : null }} value={this.state.Email} onChange={e => this.setState({ Email: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorEMAIL}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="three wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorPHONE ? 'brown' : null }}>Phone Number</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input type="text" style={{ borderColor: this.state.errorPHONE ? 'brown' : null, backgroundColor: this.state.errorPHONE ? '#f3ece7' : null }} name="PhoneNumber" value={this.state.PhoneNumber} onChange={e => this.setState({ PhoneNumber: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorPHONE}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorADJADDRESS ? 'brown' : null }}>Address</label>
                                                        <div className="ui input">
                                                            <input type="text" style={{ borderColor: this.state.errorADJADDRESS ? 'brown' : null, backgroundColor: this.state.errorADJADDRESS ? '#f3ece7' : null }} name="Address" value={this.state.Address} onChange={e => this.setState({ Address: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorADJADDRESS}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className=" row">

                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCITY ? 'brown' : null }} >City</label>
                                                        <div className="ui input">
                                                            <input type="text" style={{ borderColor: this.state.errorCITY ? 'brown' : null, backgroundColor: this.state.errorCITY ? '#f3ece7' : null }} name="City" value={this.state.City} onChange={e => this.setState({ City: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCITY}</span> : null}
                                                    </div>
                                                </div>

                                                <div className="three wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSTATE ? 'brown' : null }} >State</label>
                                                        <select className="" style={{ borderColor: this.state.errorSTATE ? 'brown' : null, backgroundColor: this.state.errorSTATE ? '#f3ece7' : null }} value={this.state.State} onChange={e => this.setState({ State: e.target.value })}>
                                                            <option>Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSTATE}</span> : null}
                                                    </div>
                                                </div>

                                                <div className="two wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorZIPCD ? 'brown' : null }} >Zip Code</label>
                                                        <div className="ui input">
                                                            <input type="text" style={{ borderColor: this.state.errorZIPCD ? 'brown' : null, backgroundColor: this.state.errorZIPCD ? '#f3ece7' : null }} name="ZipCode" value={this.state.ZipCode} onChange={e => this.setState({ ZipCode: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorZIPCD}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSUBINJURYCLAIM ? 'brown' : null }}>Explain Claim of injury or subject’s conditions</label>
                                                        <div className="ui input">
                                                            <textarea rows="2" style={{ borderColor: this.state.errorSUBINJURYCLAIM ? 'brown' : null, backgroundColor: this.state.errorSUBINJURYCLAIM ? '#f3ece7' : null }} name="ClaimOfInjury" value={this.state.ClaimOfInjury} onChange={e => this.setState({ ClaimOfInjury: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSUBINJURYCLAIM}</span> : null}
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
                                                    <button className="ui button" type="submit" onClick={() => this.Onclear()}>Clear</button>
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


                                        "SubjectRepresentedByAttorney": this.state.SubjectRepresentedByAttorney,
                                        "Claim": this.state.Claim,
                                        "FirstName_Adjuster": this.state.FirstName_Adjuster,
                                        "LastName_Adjuster": this.state.LastName_Adjuster,
                                        "Email": this.state.Email,
                                        "PhoneNumber": this.state.PhoneNumber,
                                        "Address": this.state.Address,
                                        "City": this.state.City,
                                        "State": this.state.State,
                                        "ZipCode": this.state.ZipCode,
                                        "ClaimOfInjury": this.state.ClaimOfInjury,
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
