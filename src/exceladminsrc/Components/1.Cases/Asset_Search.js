import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { CasesCRUDOpsQuery, DropdwonQueryLeads, caseDetails } from '../Queries/queries';
var DropdownCasesList = [];
var errorval = false
export default class AssetSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Client_Id: "",
            Case_Id: "",
            First_Name: "",
            Last_Name: "",
            Spouse: "",
            AKAs: "",
            DOB: "",
            Business_Name: "",
            Type_of_Business: "",
            Business_Tax_ID: "",
            Last_Known_Address: "",
            Phone_Number: "",
            City: "",
            State: "",
            Zip: "",
            Last_Known_Address1: "",
            Phone_Number1: "",
            City1: "",
            State1: "",
            Zip1: "",
            Employed_By: "",
            Employee_Address: "",
            Phone_Number2: "",
            City2: "",
            State2: "",
            Zip2: "",
            Social_Security_Subject: "",
            Social_Security_Spouse: "",
            Drivers_License_Subject: "",
            Drivers_License_Spouse: "",

            Accounts: "N",
            Accountschk: false,
            Carbotvs: "N",
            Carbotvschk: false,
            Srcofincm: "N",
            Srcofincmchk: false,
            Landprpty: "N",
            Landprptychk: false,
            HiddenAsset: "N",
            HiddenAssetchk: false,
            BusOrCrop: "N",
            BusOrCropchk: false,
            Other: "N",
            Otherchk: false,
            Otherinfo: "",

            Judgement: "",
            judgementrecovery: "",
            Priority_Status: "",
            Assign_To: "",
            DropdownCasesListArr: [],
            CDATE: this.formatSystemDate(),
            tcode: 'CREATE',
            Dispalycomp: true,
            DispalyDiv: 'flex',
            //error state
            errorFRSTNM: "",
            errorLSTNM: "",
            errorSPOUSE: "",
            errorAKA: "",
            errorDOB: "",
            errorBUSINESSNM: "",
            errorBUSINESSTYP: "",
            errorBUSINESSTXID: "",
            errorBUSADDRESS: "",
            errorPHONE: "",
            errorCITY: "",
            errorSTATE: "",
            errorZIPCD: "",
            errorRESADDRESS: "",
            errorPHONE2: "",
            errorCITY2: "",
            errorSTATE2: "",
            errorZIPCD2: "",
            errorEMPID: "",
            errorADJADDRESS: "",
            errorEMPPHONE: "",
            errorEMPCITY: "",
            errorEMPSTATE: "",
            errorEMPZIPCD: "",
            errorSECURITYSUB: "",
            errorSECURITYSPOS: "",
            errorDRIVERLINCSUB: "",
            errorDRIVERLINCSPOS: "",
            errorCRTJDGMT: "",
            errorHELPRCVRY: "",
            errorPRIORITY: "",
            DispalyBackColor: false,
            OnClickButton: ""
        }
        this.gotoCaseType = this.props.gotoCaseType.bind(this)
    };

    componentDidMount() {
        this.DropdownCases()
        //console.log(this.props.location.state.CLIENTID)
        console.log(this.props.data)
        console.log(this.props.CLIENTID)
        console.log(this.props.Case_Id)
        if (this.props.data) {
            this.setState({
                Dispalycomp: !this.state.Dispalycomp,
                DispalyDiv: 'none'
            });
            this.PopulateData();
        }
    };

    // Populate Data When Edit Mode
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
            console.log(result.data.caseDetails.length);
            if(result.data.caseDetails.length!=0)
            {
                await this.setState({
                    Client_Id: result.data.caseDetails[0].CLIENTID,
                    Accounts: result.data.caseDetails[0].ACCOUNTS,
                    Carbotvs: result.data.caseDetails[0].CARBOTVS,
                    Srcofincm: result.data.caseDetails[0].SRCOFINCM,
                    Landprpty: result.data.caseDetails[0].LANDPRPTY,
                    HiddenAsset: result.data.caseDetails[0].HIDDENASST,
                    BusOrCrop: result.data.caseDetails[0].BUSSORCORP,
                    Other: result.data.caseDetails[0].OTHER,
                    Otherinfo: result.data.caseDetails[0].OTHERINFO,
                    First_Name: result.data.caseDetails[0].FRSTNM,
                    Last_Name: result.data.caseDetails[0].LSTNM,
                    Spouse: result.data.caseDetails[0].SPOUSE,
                    AKAs: result.data.caseDetails[0].AKA,
                    DOB: this.formatDate1(result.data.caseDetails[0].DOB),
                    Business_Name: result.data.caseDetails[0].BUSINESSNM,
                    Type_of_Business: result.data.caseDetails[0].BUSINESSTYP,
                    Business_Tax_ID: result.data.caseDetails[0].BUSINESSTXID,
                    Last_Known_Address: result.data.caseDetails[0].BUSADDRESS,
                    Phone_Number: result.data.caseDetails[0].PHONE,
                    City: result.data.caseDetails[0].CITY,
                    State: result.data.caseDetails[0].STATE,
                    Zip: result.data.caseDetails[0].ZIPCD,
                    Last_Known_Address1: result.data.caseDetails[0].RESADDRESS,
                    Phone_Number1: result.data.caseDetails[0].PHONE2,
                    City1: result.data.caseDetails[0].CITY2,
                    State1: result.data.caseDetails[0].STATE2,
                    Zip1: result.data.caseDetails[0].ZIPCD2,
                    Employed_By: result.data.caseDetails[0].EMPID,
                    Employee_Address: result.data.caseDetails[0].ADJADDRESS,
                    Phone_Number2: result.data.caseDetails[0].EMPPHONE,
                    City2: result.data.caseDetails[0].EMPCITY,
                    State2: result.data.caseDetails[0].EMPSTATE,
                    Zip2: result.data.caseDetails[0].EMPZIPCD,
                    Social_Security_Subject: result.data.caseDetails[0].SECURITYSUB,
                    Social_Security_Spouse: result.data.caseDetails[0].SECURITYSPOS,
                    Drivers_License_Subject: result.data.caseDetails[0].DRIVERLINCSUB,
                    Drivers_License_Spouse: result.data.caseDetails[0].DRIVERLINCSPOS,
                    Judgement: result.data.caseDetails[0].CRTJDGMT,
                    judgementrecovery: result.data.caseDetails[0].HELPRCVRY,
                    Priority_Status: result.data.caseDetails[0].PRIORITY,
                    Assign_To: result.data.caseDetails[0].ASSIGNUSER,
                    tcode: 'UPDATE',
                    Dispalycomp: !this.state.Dispalycomp
                });
            }
           

            // console.log(this.state.Accounts);
            //console.log(this.state.Accountschk);
            if (this.state.Accounts == 'Y') {

                this.setState({
                    Accountschk: !this.state.Accountschk
                })
            }

            if (this.state.Carbotvs == 'Y') {

                this.setState({
                    Carbotvschk: !this.state.Carbotvschk
                })
            }

            if (this.state.Srcofincm == 'Y') {

                this.setState({
                    Srcofincmchk: !this.state.Srcofincmchk
                })
            }

            if (this.state.Landprpty == 'Y') {

                this.setState({
                    Landprptychk: !this.state.Landprptychk
                })
            }

            if (this.state.HiddenAsset == 'Y') {

                this.setState({
                    HiddenAssetchk: !this.state.HiddenAssetchk
                })
            }

            if (this.state.BusOrCrop == 'Y') {

                this.setState({
                    BusOrCropchk: !this.state.BusOrCropchk
                })
            }

            if (this.state.Other == 'Y') {

                this.setState({
                    Otherchk: !this.state.Otherchk
                })
            }

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

    // To Set Dropswon Values

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
                "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                "ASSIGN_TO": result.data.ASSIGN_TO,
                "STATES": result.data.STATES,
                "BUSINESS_TYPES": result.data.BUSINESS_TYPES

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
                    console.log(errorMessage[key]);
                    this.setState({
                        errorFRSTNM: errorMessage[key].errorFRSTNM,
                        errorLSTNM: errorMessage[key].errorLSTNM,
                        errorSPOUSE: errorMessage[key].errorSPOUSE,
                        errorAKA: errorMessage[key].errorAKA,
                        errorDOB: errorMessage[key].errorDOB,
                        errorBUSINESSNM: errorMessage[key].errorBUSINESSNM,
                        errorBUSINESSTYP: errorMessage[key].errorBUSINESSTYP,
                        errorBUSINESSTXID: errorMessage[key].errorBUSINESSTXID,
                        errorBUSADDRESS: errorMessage[key].errorBUSADDRESS,
                        errorPHONE: errorMessage[key].errorPHONE,
                        errorCITY: errorMessage[key].errorCITY,
                        errorSTATE: errorMessage[key].errorSTATE,
                        errorZIPCD: errorMessage[key].errorZIPCD,
                        errorRESADDRESS: errorMessage[key].errorRESADDRESS,
                        errorPHONE2: errorMessage[key].errorPHONE2,
                        errorCITY2: errorMessage[key].errorCITY2,
                        errorSTATE2: errorMessage[key].errorSTATE2,
                        errorZIPCD2: errorMessage[key].errorZIPCD2,
                        errorEMPID: errorMessage[key].errorEMPID,
                        errorADJADDRESS: errorMessage[key].errorADJADDRESS,
                        errorEMPPHONE: errorMessage[key].errorEMPPHONE,
                        errorEMPCITY: errorMessage[key].errorEMPCITY,
                        errorEMPSTATE: errorMessage[key].errorEMPSTATE,
                        errorEMPZIPCD: errorMessage[key].errorEMPZIPCD,
                        errorSECURITYSUB: errorMessage[key].errorSECURITYSUB,
                        errorSECURITYSPOS: errorMessage[key].errorSECURITYSPOS,
                        errorDRIVERLINCSUB: errorMessage[key].errorDRIVERLINCSUB,
                        errorDRIVERLINCSPOS: errorMessage[key].errorDRIVERLINCSPOS,
                        errorCRTJDGMT: errorMessage[key].errorCRTJDGMT,
                        errorHELPRCVRY: errorMessage[key].errorHELPRCVRY,
                        errorPRIORITY: errorMessage[key].errorPRIORITY

                    });
                }

            }
            else {
                console.log(result);
                //this.navigateToCaseList()
                //this.gotoCaseType();

                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Case Details Accepted ..!!")
                    this.setState({
                        errorFRSTNM: "",
                        errorLSTNM: "",
                        errorSPOUSE: "",
                        errorAKA: "",
                        errorDOB: "",
                        errorBUSINESSNM: "",
                        errorBUSINESSTYP: "",
                        errorBUSINESSTXID: "",
                        errorBUSADDRESS: "",
                        errorPHONE: "",
                        errorCITY: "",
                        errorSTATE: "",
                        errorZIPCD: "",
                        errorRESADDRESS: "",
                        errorPHONE2: "",
                        errorCITY2: "",
                        errorSTATE2: "",
                        errorZIPCD2: "",
                        errorEMPID: "",
                        errorADJADDRESS: "",
                        errorEMPPHONE: "",
                        errorEMPCITY: "",
                        errorEMPSTATE: "",
                        errorEMPZIPCD: "",
                        errorSECURITYSUB: "",
                        errorSECURITYSPOS: "",
                        errorDRIVERLINCSUB: "",
                        errorDRIVERLINCSPOS: "",
                        errorCRTJDGMT: "",
                        errorHELPRCVRY: "",
                        errorPRIORITY: "",
                    });
                    errorval = false
                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.gotoCaseType(this.state.Client_Id, result.data.CasesAffected[0]);
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
            "typeofCase": "ASSET_SEARCH",
            "transaction": "CREATE",
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CLIENTID": this.state.Client_Id,
                    "CASEDT": this.state.CDATE,
                    "FRSTNM": this.state.First_Name,
                    "LSTNM": this.state.Last_Name,
                    "SPOUSE": this.state.Spouse,
                    "AKA": this.state.AKAs,
                    "DOB": this.formatDate(this.state.DOB),
                    "BUSINESSNM": this.state.Business_Name,
                    "BUSINESSTYP": this.state.Type_of_Business,
                    "BUSINESSTXID": this.state.Business_Tax_ID,
                    "BUSADDRESS": this.state.Last_Known_Address,
                    "PHONE": this.state.Phone_Number,
                    "CITY": this.state.City,
                    "STATE": this.state.State,
                    "ZIPCD": this.state.Zip,
                    "RESADDRESS": this.state.Last_Known_Address1,
                    "PHONE2": this.state.Phone_Number1,
                    "CITY2": this.state.City1,
                    "STATE2": this.state.State1,
                    "ZIPCD2": this.state.Zip1,
                    "EMPID": this.state.Employed_By,
                    "ADJADDRESS": this.state.Employee_Address,
                    "EMPPHONE": this.state.Phone_Number2,
                    "EMPCITY": this.state.City2,
                    "EMPSTATE": this.state.State2,
                    "EMPZIPCD": this.state.Zip2,
                    "SECURITYSUB": this.state.Social_Security_Subject,
                    "SECURITYSPOS": this.state.Social_Security_Spouse,
                    "DRIVERLINCSUB": this.state.Drivers_License_Subject,
                    "DRIVERLINCSPOS": this.state.Drivers_License_Spouse,
                    "ACCOUNTS": this.state.Accounts,
                    "CARBOTVS": this.state.Carbotvs,
                    "SRCOFINCM": this.state.Srcofincm,
                    "LANDPRPTY": this.state.Landprpty,
                    "HIDDENASST": this.state.HiddenAsset,
                    "BUSSORCORP": this.state.BusOrCrop,
                    "OTHER": this.state.Other,
                    "OTHERINFO": this.state.Otherinfo,
                    "CRTJDGMT": this.state.Judgement,
                    "HELPRCVRY": this.state.judgementrecovery,
                    "PRIORITY": this.state.Priority_Status,
                    "ASSIGNUSER": this.state.Assign_To

                }
            ]
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
                    errorFRSTNM: errorMessage[key].errorFRSTNM,
                    errorLSTNM: errorMessage[key].errorLSTNM,
                    errorSPOUSE: errorMessage[key].errorSPOUSE,
                    errorAKA: errorMessage[key].errorAKA,
                    errorDOB: errorMessage[key].errorDOB,
                    errorBUSINESSNM: errorMessage[key].errorBUSINESSNM,
                    errorBUSINESSTYP: errorMessage[key].errorBUSINESSTYP,
                    errorBUSINESSTXID: errorMessage[key].errorBUSINESSTXID,
                    errorBUSADDRESS: errorMessage[key].errorBUSADDRESS,
                    errorPHONE: errorMessage[key].errorPHONE,
                    errorCITY: errorMessage[key].errorCITY,
                    errorSTATE: errorMessage[key].errorSTATE,
                    errorZIPCD: errorMessage[key].errorZIPCD,
                    errorRESADDRESS: errorMessage[key].errorRESADDRESS,
                    errorPHONE2: errorMessage[key].errorPHONE2,
                    errorCITY2: errorMessage[key].errorCITY2,
                    errorSTATE2: errorMessage[key].errorSTATE2,
                    errorZIPCD2: errorMessage[key].errorZIPCD2,
                    errorEMPID: errorMessage[key].errorEMPID,
                    errorADJADDRESS: errorMessage[key].errorADJADDRESS,
                    errorEMPPHONE: errorMessage[key].errorEMPPHONE,
                    errorEMPCITY: errorMessage[key].errorEMPCITY,
                    errorEMPSTATE: errorMessage[key].errorEMPSTATE,
                    errorEMPZIPCD: errorMessage[key].errorEMPZIPCD,
                    errorSECURITYSUB: errorMessage[key].errorSECURITYSUB,
                    errorSECURITYSPOS: errorMessage[key].errorSECURITYSPOS,
                    errorDRIVERLINCSUB: errorMessage[key].errorDRIVERLINCSUB,
                    errorDRIVERLINCSPOS: errorMessage[key].errorDRIVERLINCSPOS,
                    errorCRTJDGMT: errorMessage[key].errorCRTJDGMT,
                    errorHELPRCVRY: errorMessage[key].errorHELPRCVRY,
                    errorPRIORITY: errorMessage[key].errorPRIORITY

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
                    errorFRSTNM: "",
                    errorLSTNM: "",
                    errorSPOUSE: "",
                    errorAKA: "",
                    errorDOB: "",
                    errorBUSINESSNM: "",
                    errorBUSINESSTYP: "",
                    errorBUSINESSTXID: "",
                    errorBUSADDRESS: "",
                    errorPHONE: "",
                    errorCITY: "",
                    errorSTATE: "",
                    errorZIPCD: "",
                    errorRESADDRESS: "",
                    errorPHONE2: "",
                    errorCITY2: "",
                    errorSTATE2: "",
                    errorZIPCD2: "",
                    errorEMPID: "",
                    errorADJADDRESS: "",
                    errorEMPPHONE: "",
                    errorEMPCITY: "",
                    errorEMPSTATE: "",
                    errorEMPZIPCD: "",
                    errorSECURITYSUB: "",
                    errorSECURITYSPOS: "",
                    errorDRIVERLINCSUB: "",
                    errorDRIVERLINCSPOS: "",
                    errorCRTJDGMT: "",
                    errorHELPRCVRY: "",
                    errorPRIORITY: "",
                });
                errorval = false
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                this.gotoCaseType(this.state.Client_Id, result.data.CasesAffected[0]);
            }


        }

    };


    setUpdateParams() {
        var parameters = {
            "typeofCase": "ASSET_SEARCH",
            "transaction": "UPDATE",
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CLIENTID": this.state.Client_Id,
                    "CASEDT": this.state.CDATE,
                    "CIDSYS": this.props.data,
                    "FRSTNM": this.state.First_Name,
                    "LSTNM": this.state.Last_Name,
                    "SPOUSE": this.state.Spouse,
                    "AKA": this.state.AKAs,
                    "DOB": this.formatDate(this.state.DOB),
                    "BUSINESSNM": this.state.Business_Name,
                    "BUSINESSTYP": this.state.Type_of_Business,
                    "BUSINESSTXID": this.state.Business_Tax_ID,
                    "BUSADDRESS": this.state.Last_Known_Address,
                    "PHONE": this.state.Phone_Number,
                    "CITY": this.state.City,
                    "STATE": this.state.State,
                    "ZIPCD": this.state.Zip,
                    "RESADDRESS": this.state.Last_Known_Address1,
                    "PHONE2": this.state.Phone_Number1,
                    "CITY2": this.state.City1,
                    "STATE2": this.state.State1,
                    "ZIPCD2": this.state.Zip1,
                    "EMPID": this.state.Employed_By,
                    "ADJADDRESS": this.state.Employee_Address,
                    "EMPPHONE": this.state.Phone_Number2,
                    "EMPCITY": this.state.City2,
                    "EMPSTATE": this.state.State2,
                    "EMPZIPCD": this.state.Zip2,
                    "SECURITYSUB": this.state.Social_Security_Subject,
                    "SECURITYSPOS": this.state.Social_Security_Spouse,
                    "DRIVERLINCSUB": this.state.Drivers_License_Subject,
                    "DRIVERLINCSPOS": this.state.Drivers_License_Spouse,
                    "ACCOUNTS": this.state.Accounts,
                    "CARBOTVS": this.state.Carbotvs,
                    "SRCOFINCM": this.state.Srcofincm,
                    "LANDPRPTY": this.state.Landprpty,
                    "HIDDENASST": this.state.HiddenAsset,
                    "BUSSORCORP": this.state.BusOrCrop,
                    "OTHER": this.state.Other,
                    "OTHERINFO": this.state.Otherinfo,
                    "CRTJDGMT": this.state.Judgement,
                    "HELPRCVRY": this.state.judgementrecovery,
                    "PRIORITY": this.state.Priority_Status,
                    "ASSIGNUSER": this.state.Assign_To

                }
            ]
        }
        return parameters

    };





    // ..............Date Formate mm/dd/yyyy to yyyymmdd  ..........
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

    //..............Date Formate yyyymmdd to mm/dd/yyyy..........
    formatDate1(date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)
        // "2018-06-03"
        var date_format = year + '-' + month + '-' + day
        //  var date_format = month + '/' + day + '/' + year
        return date_format
    };


    // To Check Checkboxes
    async isCheck(type) {
        //console.log('hiiiiiii');
        console.log(type);

        if (type == 'Accounts') {
            await this.setState({ Accountschk: !this.state.Accountschk });
        }
        if (type == "Carbotvs") {
            await this.setState({ Carbotvschk: !this.state.Carbotvschk });
        }
        if (type == "Srcofincm") {
            await this.setState({ Srcofincmchk: !this.state.Srcofincmchk });
        }
        if (type == "Landprpty") {
            await this.setState({ Landprptychk: !this.state.Landprptychk });
        }
        if (type == "HiddenAsset") {
            await this.setState({ HiddenAssetchk: !this.state.HiddenAssetchk });
        }
        if (type == "BusOrCrop") {
            await this.setState({ BusOrCropchk: !this.state.BusOrCropchk });
        }
        if (type == "Other") {
            await this.setState({ Otherchk: !this.state.Otherchk });
        }



        if (this.state.Accountschk == true) {
            this.setState({ Accounts: "Y" });
        }
        else {
            this.setState({ Accounts: "N" });
        }

        if (this.state.Carbotvschk == true) {
            this.setState({ Carbotvs: "Y" });
        }
        else {
            this.setState({ Carbotvs: "N" });
        }

        if (this.state.Srcofincmchk == true) {
            this.setState({ Srcofincm: "Y" });
        }
        else {
            this.setState({ Srcofincm: "N" });
        }

        if (this.state.Landprptychk == true) {
            this.setState({ Landprpty: "Y" });
        }
        else {
            this.setState({ Landprpty: "N" });
        }

        if (this.state.HiddenAssetchk == true) {
            this.setState({ HiddenAsset: "Y" });
        }
        else {
            this.setState({ HiddenAsset: "N" });
        }

        if (this.state.BusOrCropchk == true) {
            this.setState({ BusOrCrop: "Y" });
        }
        else {
            this.setState({ BusOrCrop: "N" });
        }
        if (this.state.Otherchk == true) {
            this.setState({ Other: "Y" });
        }
        else {
            this.setState({ Other: "N" });
        }
    };


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

    // To Clear Inputfield & error
    onClear() {
        this.setState({
            First_Name: "",
            Last_Name: "",
            Spouse: "",
            AKAs: "",
            DOB: "",
            Business_Name: "",
            Type_of_Business: "",
            Business_Tax_ID: "",
            Last_Known_Address: "",
            Phone_Number: "",
            City: "",
            State: "",
            Zip: "",
            Last_Known_Address1: "",
            Phone_Number1: "",
            City1: "",
            State1: "",
            Zip1: "",
            Employed_By: "",
            Employee_Address: "",
            Phone_Number2: "",
            City2: "",
            State2: "",
            Zip2: "",
            Social_Security_Subject: "",
            Social_Security_Spouse: "",
            Drivers_License_Subject: "",
            Drivers_License_Spouse: "",
            Accounts: "N",
            Carbotvs: "N",
            Srcofincm: "N",
            Landprpty: "N",
            HiddenAsset: "N",
            BusOrCrop: "N",
            Other: "N",
            Otherinfo: "",
            Judgement: "",
            judgementrecovery: "",
            Priority_Status: "",
            Assign_To: "",

            //error state
            errorFRSTNM: "",
            errorLSTNM: "",
            errorSPOUSE: "",
            errorAKA: "",
            errorDOB: "",
            errorBUSINESSNM: "",
            errorBUSINESSTYP: "",
            errorBUSINESSTXID: "",
            errorBUSADDRESS: "",
            errorPHONE: "",
            errorCITY: "",
            errorSTATE: "",
            errorZIPCD: "",
            errorRESADDRESS: "",
            errorPHONE2: "",
            errorCITY2: "",
            errorSTATE2: "",
            errorZIPCD2: "",
            errorEMPID: "",
            errorADJADDRESS: "",
            errorEMPPHONE: "",
            errorEMPCITY: "",
            errorEMPSTATE: "",
            errorEMPZIPCD: "",
            errorSECURITYSUB: "",
            errorSECURITYSPOS: "",
            errorDRIVERLINCSUB: "",
            errorDRIVERLINCSPOS: "",
            errorCRTJDGMT: "",
            errorHELPRCVRY: "",
            errorPRIORITY: "",
        });
        errorval = false
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
                                            <div className=" row" style={{ display: "none", border: 3 }}>
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
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSPOUSE ? 'brown' : null }}>Spouse</label>
                                                        <div className="ui right icon input">
                                                            <i className="user icon"></i>
                                                            <input type="text" name="Spouse" style={{ borderColor: this.state.errorSPOUSE ? 'brown' : null, backgroundColor: this.state.errorSPOUSE ? '#f3ece7' : null }} value={this.state.Spouse} onChange={e => this.setState({ Spouse: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSPOUSE}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorAKA ? 'brown' : null }}>AKA’s</label>
                                                        <div className="ui right icon input">
                                                            <input style={{ borderColor: this.state.errorAKA ? 'brown' : null, backgroundColor: this.state.errorAKA ? '#f3ece7' : null }} type="text" name="AKAs" value={this.state.AKAs} onChange={e => this.setState({ AKAs: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorAKA}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorDOB ? 'brown' : null }}>DOB</label>
                                                        <div className="ui right icon input">
                                                            <input type="Date" style={{ borderColor: this.state.errorDOB ? 'brown' : null, backgroundColor: this.state.errorDOB ? '#f3ece7' : null }} name="DOB" value={this.state.DOB} onChange={e => this.setState({ DOB: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorDOB}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorBUSINESSNM ? 'brown' : null }}>Business Name</label>
                                                        <div className="ui right icon input">
                                                            <i className="briefcase icon"></i>
                                                            <input type="text" style={{ borderColor: this.state.errorBUSINESSNM ? 'brown' : null, backgroundColor: this.state.errorBUSINESSNM ? '#f3ece7' : null }} name="Business_Name" value={this.state.Business_Name} onChange={e => this.setState({ Business_Name: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorBUSINESSNM}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorBUSINESSTYP ? 'brown' : null }}>Type of Business</label>
                                                        <select className="" value={this.state.Type_of_Business} style={{ borderColor: this.state.errorBUSINESSTYP ? 'brown' : null, backgroundColor: this.state.errorBUSINESSTYP ? '#f3ece7' : null }} onChange={e => this.setState({ Type_of_Business: e.target.value })} >
                                                            <option value="">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.BUSINESS_TYPES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorBUSINESSTYP}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorBUSINESSTXID ? 'brown' : null }}>Business Tax ID</label>
                                                        <div className="ui right icon input">
                                                            <input type="text" style={{ borderColor: this.state.errorBUSINESSTXID ? 'brown' : null, backgroundColor: this.state.errorBUSINESSTXID ? '#f3ece7' : null }} name="Business_Tax_ID" value={this.state.Business_Tax_ID} onChange={e => this.setState({ Business_Tax_ID: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorBUSINESSTXID}</span> : null}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorBUSADDRESS ? 'brown' : null }}>Last Known Address</label>
                                                        <div className="ui right icon input">
                                                            <i className="home icon"></i>
                                                            <input type="text" name="Last_Known_Address" style={{ borderColor: this.state.errorBUSADDRESS ? 'brown' : null, backgroundColor: this.state.errorBUSADDRESS ? '#f3ece7' : null }} value={this.state.Last_Known_Address} onChange={e => this.setState({ Last_Known_Address: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorBUSADDRESS}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorPHONE ? 'brown' : null }}>Phone Number</label>
                                                        <div className="ui right icon input">
                                                            <i className="phone icon"></i>
                                                            <input type="text" name="Phone_Number" style={{ borderColor: this.state.errorPHONE ? 'brown' : null, backgroundColor: this.state.errorPHONE ? '#f3ece7' : null }} value={this.state.Phone_Number} onChange={e => this.setState({ Phone_Number: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorPHONE}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCITY ? 'brown' : null }}>City</label>
                                                        <input type="text" style={{ borderColor: this.state.errorCITY ? 'brown' : null, backgroundColor: this.state.errorCITY ? '#f3ece7' : null }} name="City" value={this.state.City} onChange={e => this.setState({ City: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCITY}</span> : null}
                                                    </div>
                                                </div>

                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSTATE ? 'brown' : null }}>State</label>
                                                        <select className="" style={{ borderColor: this.state.errorSTATE ? 'brown' : null, backgroundColor: this.state.errorSTATE ? '#f3ece7' : null }} value={this.state.State} onChange={e => this.setState({ State: e.target.value })} >
                                                            <option value="">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select>

                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSTATE}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorZIPCD ? 'brown' : null }}>Zip</label>
                                                        <input style={{ borderColor: this.state.errorZIPCD ? 'brown' : null, backgroundColor: this.state.errorZIPCD ? '#f3ece7' : null }} type="text" name="Zip" value={this.state.Zip} onChange={e => this.setState({ Zip: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorZIPCD}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorRESADDRESS ? 'brown' : null }}>Last Known Address</label>
                                                        <div className="ui right icon input">
                                                            <i className="home icon"></i>
                                                            <input type="text" style={{ borderColor: this.state.errorRESADDRESS ? 'brown' : null, backgroundColor: this.state.errorRESADDRESS ? '#f3ece7' : null }} name="Last_Known_Address" value={this.state.Last_Known_Address1} onChange={e => this.setState({ Last_Known_Address1: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorRESADDRESS}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorPHONE2 ? 'brown' : null }}>Phone Number</label>
                                                        <div className="ui right icon input">
                                                            <i className="phone icon"></i>
                                                            <input type="text" name="Phone_Number" style={{ borderColor: this.state.errorPHONE2 ? 'brown' : null, backgroundColor: this.state.errorPHONE2 ? '#f3ece7' : null }} value={this.state.Phone_Number1} onChange={e => this.setState({ Phone_Number1: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorPHONE2}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCITY2 ? 'brown' : null }}>City</label>
                                                        <input type="text" style={{ borderColor: this.state.errorCITY2 ? 'brown' : null, backgroundColor: this.state.errorCITY2 ? '#f3ece7' : null }} name="City" value={this.state.City1} onChange={e => this.setState({ City1: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCITY2}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSTATE2 ? 'brown' : null }} >State</label>
                                                        <select className="" style={{ borderColor: this.state.errorSTATE2 ? 'brown' : null, backgroundColor: this.state.errorSTATE2 ? '#f3ece7' : null }} value={this.state.State1} onChange={e => this.setState({ State1: e.target.value })} >
                                                            <option value="">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select>

                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSTATE2}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorZIPCD2 ? 'brown' : null }}>Zip</label>
                                                        <input style={{ borderColor: this.state.errorZIPCD2 ? 'brown' : null, backgroundColor: this.state.errorZIPCD2 ? '#f3ece7' : null }} type="text" name="Zip" value={this.state.Zip1} onChange={e => this.setState({ Zip1: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorZIPCD2}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorEMPID ? 'brown' : null }}>Employed By</label>
                                                        <input type="text" style={{ borderColor: this.state.errorEMPID ? 'brown' : null, backgroundColor: this.state.errorEMPID ? '#f3ece7' : null }} name="Employed_By" value={this.state.Employed_By} onChange={e => this.setState({ Employed_By: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorEMPID}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorADJADDRESS ? 'brown' : null }}>Employer’s Address</label>
                                                        <div className="ui right icon input">
                                                            <i className="home icon"></i>
                                                            <input type="text" style={{ borderColor: this.state.errorADJADDRESS ? 'brown' : null, backgroundColor: this.state.errorADJADDRESS ? '#f3ece7' : null }} name="Employee_Address" value={this.state.Employee_Address} onChange={e => this.setState({ Employee_Address: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorADJADDRESS}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorEMPPHONE ? 'brown' : null }}>Phone Number</label>
                                                        <div className="ui right icon input">
                                                            <i className="phone icon"></i>
                                                            <input type="text" style={{ borderColor: this.state.errorEMPPHONE ? 'brown' : null, backgroundColor: this.state.errorEMPPHONE ? '#f3ece7' : null }} name="Phone_Number" value={this.state.Phone_Number2} onChange={e => this.setState({ Phone_Number2: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorEMPPHONE}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorEMPCITY ? 'brown' : null }}>City</label>
                                                        <input type="text" style={{ borderColor: this.state.errorEMPCITY ? 'brown' : null, backgroundColor: this.state.errorEMPCITY ? '#f3ece7' : null }} name="City" value={this.state.City2} onChange={e => this.setState({ City2: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorEMPCITY}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorEMPSTATE ? 'brown' : null }}>State</label>
                                                        <select className="" style={{ borderColor: this.state.errorEMPSTATE ? 'brown' : null, backgroundColor: this.state.errorEMPSTATE ? '#f3ece7' : null }} value={this.state.State2} onChange={e => this.setState({ State2: e.target.value })} >
                                                            <option value="">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select>

                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorEMPSTATE}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorEMPZIPCD ? 'brown' : null }}>Zip</label>
                                                        <input type="text" style={{ borderColor: this.state.errorEMPZIPCD ? 'brown' : null, backgroundColor: this.state.errorEMPZIPCD ? '#f3ece7' : null }} name="Zip" value={this.state.Zip2} onChange={e => this.setState({ Zip2: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorEMPZIPCD}</span> : null}
                                                    </div>
                                                </div>
                                            </div>


                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSECURITYSUB ? 'brown' : null }}>Social Security Subject</label>
                                                        <div className="ui right icon input">

                                                            <input type="text" style={{ borderColor: this.state.errorSECURITYSUB ? 'brown' : null, backgroundColor: this.state.errorSECURITYSUB ? '#f3ece7' : null }} name="Social_Security_Subject" value={this.state.Social_Security_Subject} onChange={e => this.setState({ Social_Security_Subject: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSECURITYSUB}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorSECURITYSPOS ? 'brown' : null }}>Social Security Spouse</label>
                                                        <div className="ui right icon input">

                                                            <input type="text" style={{ borderColor: this.state.errorSECURITYSPOS ? 'brown' : null, backgroundColor: this.state.errorSECURITYSPOS ? '#f3ece7' : null }} name="Social_Security_Spouse" value={this.state.Social_Security_Spouse} onChange={e => this.setState({ Social_Security_Spouse: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSECURITYSPOS}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorDRIVERLINCSUB ? 'brown' : null }}>Driver’s License Subject</label>
                                                        <div className="ui right icon input">

                                                            <input type="text" style={{ borderColor: this.state.errorDRIVERLINCSUB ? 'brown' : null, backgroundColor: this.state.errorDRIVERLINCSUB ? '#f3ece7' : null }} name="Driver’s_License_Subject" value={this.state.Drivers_License_Subject} onChange={e => this.setState({ Drivers_License_Subject: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorDRIVERLINCSUB}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorDRIVERLINCSPOS ? 'brown' : null }}>Driver’s License Spouse</label>
                                                        <div className="ui right icon input">

                                                            <input type="text" style={{ borderColor: this.state.errorDRIVERLINCSPOS ? 'brown' : null, backgroundColor: this.state.errorDRIVERLINCSPOS ? '#f3ece7' : null }} name="Driver’s_License_Spouse" value={this.state.Drivers_License_Spouse} onChange={e => this.setState({ Drivers_License_Spouse: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorDRIVERLINCSPOS}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="one wide computer one wide tablet one wide mobile row">
                                            </div>

                                            <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                                <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>What assets are you searching for.</h1>
                                            </div>
                                            <div className="one wide computer one wide tablet one wide mobile row">
                                            </div>
                                            <div className=" row" >
                                                <div className="six wide column">
                                                    <div className="row">
                                                        <input type="checkbox" name="Accounts" value={this.state.Accounts} checked={this.state.Accountschk} onChange={() => this.isCheck('Accounts')} />
                                                        <label> Banks Accounts / Investment Accounts / Safe Deposits</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="six wide column">
                                                    <div className="row">
                                                        <input type="checkbox" name="Carbotvs" value={this.state.Carbotvs} checked={this.state.Carbotvschk} onChange={() => this.isCheck('Carbotvs')} />
                                                        <label> Cars / Boats / Vessels or similar</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="six wide column">
                                                    <div className="row">
                                                        <input type="checkbox" name="Srcofincm" value={this.state.Srcofincm} checked={this.state.Srcofincmchk} onChange={() => this.isCheck('Srcofincm')} />
                                                        <label> Source of Income – Jobs</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="six wide column">
                                                    <div className="row">
                                                        <input type="checkbox" name="Landprpty" value={this.state.Landprpty} checked={this.state.Landprptychk} onChange={() => this.isCheck('Landprpty')} />
                                                        <label> Land or Property </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="six wide column">
                                                    <div className="row">
                                                        <input type="checkbox" name="HiddenAsset" value={this.state.HiddenAsset} checked={this.state.HiddenAssetchk} onChange={() => this.isCheck('HiddenAsset')} />
                                                        <label> Hidden Assets</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="six wide column">
                                                    <div className="row">
                                                        <input type="checkbox" name="BusOrCrop" value={this.state.BusOrCrop} checked={this.state.BusOrCropchk} onChange={() => this.isCheck('BusOrCrop')} />
                                                        <label> Businesses / Corporation </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="six wide column">
                                                    <div className="row">
                                                        <input type="checkbox" name="Other" value={this.state.Other} checked={this.state.Otherchk} onChange={() => this.isCheck('Other')} />
                                                        <label> Other / Please explain. </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" style={{ display: this.state.Otherchk ? 'flex' : 'none' }}>
                                                <div className="six wide column">
                                                    <div className="row">
                                                        <input type="text" name="Otherinfo" value={this.state.Otherinfo} onChange={e => this.setState({ Otherinfo: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row" >
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCRTJDGMT ? 'brown' : null }}>Do you have a court Judgement ?</label>
                                                        <select className="" style={{ borderColor: this.state.errorCRTJDGMT ? 'brown' : null, backgroundColor: this.state.errorCRTJDGMT ? '#f3ece7' : null }} value={this.state.Judgement} onChange={e => this.setState({ Judgement: e.target.value })}>
                                                            <option value="">Select</option>
                                                            <option value="Y">Yes</option>
                                                            <option value="N">No</option>
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCRTJDGMT}</span> : null}
                                                    </div>
                                                </div>
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorHELPRCVRY ? 'brown' : null }}>If yes, would you need help with post judgement recovery.</label>
                                                        <select className="" style={{ borderColor: this.state.errorHELPRCVRY ? 'brown' : null, backgroundColor: this.state.errorHELPRCVRY ? '#f3ece7' : null }} value={this.state.judgementrecovery} onChange={e => this.setState({ judgementrecovery: e.target.value })}>
                                                            <option value="">Select</option>
                                                            <option value="Y">Yes</option>
                                                            <option value="N">No</option>
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorHELPRCVRY}</span> : null}
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
                                                    <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save&Continue" }) }} >Submit & Continue</button>
                                                    <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                                    <button className="ui  button" type="submit" onClick={() => this.onClear()}>Clear</button>
                                                    <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
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