import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { Authorizationddl, CardAuthorizationCRUDOps, CardAuthorizationDetails, InvoicesCRUDOpsQuery,SearchCustomerQuery } from '../Queries/queries';
import { doCalulations } from '../Invoice/SummaryCalculation';
var DropdownAuth = [];
var errorval = false
export default class CardAuthorization extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Case_Id: "",
            Client_Name: "",
            CUSTCD: "",
            Todays_Date: "",
            Name_Of_Customer: "",
            Name_Of_Cardholder: "",
            Card_Type: "",
            Card_Number: "",
            Expiration_Date: "",
            Security_Code: "",
            Billing_Address: "",
            Amount: "",
            Payment: "",
            Agree: "",
            AgreeChk: false,
            DropdownAutharr: [],
            tcode: 'CREATE',
            Dispalycomp: false,
            DispalyBackColor: false,
            OnClickButton: '',
            invoicedate: this.getformatDate(new Date().toISOString()),
            CustCode: '',
            // error state
            errorTODAYDATE: "",
            errorCLNTNAME: "",
            errorACCHLDRNAME: "",
            errorCARDTYP: "",
            errorCARDNO: "",
            errorEXPDATE: "",
            errorSECURITYCD: "",
            errorBILLINGADDR: "",
            errorAMOUNT: "",
            errorPAYFOR: ""
        }

        this.gotoPreviousTab = this.props.gotoPreviousTab.bind(this);
        this.showMsg = this.props.showMsg.bind(this);
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
    };


    async componentDidMount() {
        this.DropdownAuth();
        console.log(this.props.ContractSkip);

        if (this.props.EMAILID) {
            this.searchCustomer(this.props.EMAILID)
        }
        // To Show Msg When User Don't save Case details First
        if (!this.props.CLIENTID) {
            this.showMsg("Client details not save.\n Please save Client details first", true);
            this.gotoPreviousTab(0)
        }
        else if (!this.props.Case_Id) {
            console.log(this.props.Case_Id);
            this.showMsg("Case details not save.\n Please save case details first", true);
            this.gotoPreviousTab(1)
        }
        // Populate Data When Edit Mode
        if (this.props.data) {
            await this.setState({ Dispalycomp: true });
            this.setState({
                Case_Id: this.props.data[0].CIDSYS,
                Todays_Date: this.formatDate1(this.props.data[0].TODAYDATE),
                Name_Of_Customer: this.props.data[0].CLNTNAME,
                Name_Of_Cardholder: this.props.data[0].ACCHLDRNAME,
                Card_Type: this.props.data[0].CARDTYP,
                Card_Number: this.props.data[0].CARDNO,
                Expiration_Date: this.formatDate1(this.props.data[0].EXPDATE),
                Security_Code: this.props.data[0].SECURITYCD,
                Billing_Address: this.props.data[0].BILLINGADDR,
                Amount: this.props.data[0].AMOUNT,
                Payment: this.props.data[0].PAYFOR,
                Agree: this.props.data[0].AGREE,
                CUSTCD: this.props.CLIENTID,
                tcode: 'UPDATE',
                Dispalycomp: false
            });

            if (this.state.Agree == 'Y') {
                this.setState({ AgreeChk: true })
            }
            else if (this.state.Agree == 'N') {
                this.setState({ AgreeChk: false })
            }
        };

        // Populate Data when back to Case tab
        if (this.props.Case_Id) {
            await this.setState({ Dispalycomp: true });
            this.PopulateData(this.props.Case_Id);
        };


    }

      /*----------------------- search customers--------------------*/
      async searchCustomer(email) {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', SearchCustomerQuery, this.setCustSearchParams(email))
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
            console.log("result---> in Card Authorization");
            console.log(result.data.searchCustomers[0].CCODE);
            console.log("result---> in Card Authorization");
            if (result.data.searchCustomers !== 0) {
                await this.setState({ CustCode: result.data.searchCustomers[0].CCODE })
            }

        }
    }

    /*----------------------- sets variables to SearchCustomerQuery --------------------*/
    setCustSearchParams(email) {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "FIRSTNM": "",
            "LASTNM": "",
            "CMAIL": email,
            "CELLNO": "",
            "exactMatch": true
        }
        return parameters

    }

    
    // To Set Dropswon Values
    async DropdownAuth() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', Authorizationddl, this.setDropdownParams())
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
            console.log(result);

            DropdownAuth = []
            DropdownAuth.push({
                "CARD_TYPE": result.data.CARD_TYPE,
                "PAY_FOR": result.data.PAY_FOR
            })

            this.setState({ DropdownAutharr: DropdownAuth })

        }

    };

    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters

    };

    // To Populate Data
    async PopulateData(CaseId) {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', CardAuthorizationDetails, this.setSearchParams(CaseId))
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
            if (result.data.CardAuthorizationDetails.length != 0) {
                this.setState({
                    Case_Id: result.data.CardAuthorizationDetails[0].CIDSYS,
                    Todays_Date: this.formatDate1(result.data.CardAuthorizationDetails[0].TODAYDATE),
                    Name_Of_Customer: result.data.CardAuthorizationDetails[0].CLNTNAME,
                    Name_Of_Cardholder: result.data.CardAuthorizationDetails[0].ACCHLDRNAME,
                    Card_Type: result.data.CardAuthorizationDetails[0].CARDTYP,
                    Card_Number: result.data.CardAuthorizationDetails[0].CARDNO,
                    Expiration_Date: this.formatDate1(result.data.CardAuthorizationDetails[0].EXPDATE),
                    Security_Code: result.data.CardAuthorizationDetails[0].SECURITYCD,
                    Billing_Address: result.data.CardAuthorizationDetails[0].BILLINGADDR,
                    Amount: result.data.CardAuthorizationDetails[0].AMOUNT,
                    Payment: result.data.CardAuthorizationDetails[0].PAYFOR,
                    Agree: result.data.CardAuthorizationDetails[0].AGREE,
                    CUSTCD: this.props.CLIENTID,
                    tcode: 'UPDATE',
                    Dispalycomp: false
                });
            }
            else {
                await this.setState({ Dispalycomp: false })
            }
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


    // To create Card Authorization
    async CreateCardAuth() {
        if (this.props.Case_Id) {
            var result = '', errorMessage = '', errors = [];
            try {
                await this.setState({ Case_Id: this.props.Case_Id, CUSTCD: this.props.CLIENTID, Client_Name: this.props.Client_Name })
                result = await execGql('mutation', CardAuthorizationCRUDOps, this.setCreateParams())
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
                try {
                    errorMessage = JSON.parse(errorMessage);
                    for (let key in errorMessage) {
                        console.log(errorMessage[key]);
                        this.setState({
                            errorTODAYDATE: errorMessage[key].errorTODAYDATE,
                            errorCLNTNAME: errorMessage[key].errorCLNTNAME,
                            errorACCHLDRNAME: errorMessage[key].errorACCHLDRNAME,
                            errorCARDTYP: errorMessage[key].errorCARDTYP,
                            errorCARDNO: errorMessage[key].errorCARDNO,
                            errorEXPDATE: errorMessage[key].errorEXPDATE,
                            errorSECURITYCD: errorMessage[key].errorSECURITYCD,
                            errorBILLINGADDR: errorMessage[key].errorBILLINGADDR,
                            errorAMOUNT: errorMessage[key].errorAMOUNT,
                            errorPAYFOR: errorMessage[key].errorPAYFOR
                        });
                    }
                }
                catch (error) {
                    console.log(error);

                }


            }
            else {
                console.log(result);
                //this.navigateToCaseList();

                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Card Authorization Completed ..!!", false);
                    this.setState({
                        errorTODAYDATE: "",
                        errorCLNTNAME: "",
                        errorACCHLDRNAME: "",
                        errorCARDTYP: "",
                        errorCARDNO: "",
                        errorEXPDATE: "",
                        errorSECURITYCD: "",
                        errorBILLINGADDR: "",
                        errorAMOUNT: "",
                        errorPAYFOR: ""
                    });
                    errorval = false;
                    await this.setState({ Dispalycomp: true });
                    this.PopulateData(this.state.Case_Id);
                    this.gotoCaseType(false, this.state.CUSTCD, this.state.Case_Id, null, null, null);
                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.showMsg(" Authorization Details Accepted ..!!", false);
                    await this.genrateInv();
                    this.gotoCaseType(true, this.state.CUSTCD, this.state.Case_Id, null, null, null);
                    // this.navigateToCaseList();
                }
            }
        }
        else {

            this.showMsg("Please enter case details first.", true)
        }

    };


    setCreateParams() {
        var parameters = {
            "transaction": "CREATE",
            "authorizations": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS": this.state.Case_Id,
                    "TODAYDATE": this.formatDate(this.state.Todays_Date),
                    "CLNTNAME": this.state.Name_Of_Customer,
                    "ACCHLDRNAME": this.state.Name_Of_Cardholder,
                    "CARDTYP": this.state.Card_Type,
                    "CARDNO": this.state.Card_Number,
                    "EXPDATE": this.formatDate(this.state.Expiration_Date),
                    "SECURITYCD": this.state.Security_Code,
                    "BILLINGADDR": this.state.Billing_Address,
                    "AMOUNT": this.state.Amount,
                    "PAYFOR": this.state.Payment,
                    "AGREE": this.state.Agree
                }
            ]
        }
        return parameters

    };

    //......To Convert System Date to yyyymmdd.....//
    formatSystemDate = () => {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        month = month.length == 1 ? '0' + month : month;
        var day = date.getDate().toString();
        var date_format = year + month + day
        console.log("date_format");
        console.log(date_format);
        console.log("date_format");
        return date_format
    }

    //..............Date Formate Convertion..........
    getformatDate(date) {
        // var day = date.slice(0, 2)
        // var month = date.slice(3, 5)
        // var year = date.slice(6, 10)

        // var date_format = year + "-" + day + "-" + month
        var date_format = date.slice(0, 10)
        return date_format
    }


    //..............Date Formate Convertion..........
    setformatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(5, 7)
        var day = date.slice(8, 10)
        var date_format = year + month + day
        console.log(date_format);
        return date_format
    }

    // To Update Card Authorization
    async UpdateCardAuth() {

        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('mutation', CardAuthorizationCRUDOps, this.setUpdateParams())
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
            try {
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    console.log(errorMessage[key]);
                    this.setState({
                        errorTODAYDATE: errorMessage[key].errorTODAYDATE,
                        errorCLNTNAME: errorMessage[key].errorCLNTNAME,
                        errorACCHLDRNAME: errorMessage[key].errorACCHLDRNAME,
                        errorCARDTYP: errorMessage[key].errorCARDTYP,
                        errorCARDNO: errorMessage[key].errorCARDNO,
                        errorEXPDATE: errorMessage[key].errorEXPDATE,
                        errorSECURITYCD: errorMessage[key].errorSECURITYCD,
                        errorBILLINGADDR: errorMessage[key].errorBILLINGADDR,
                        errorAMOUNT: errorMessage[key].errorAMOUNT,
                        errorPAYFOR: errorMessage[key].errorPAYFOR
                    });
                }
            } catch (error) {
                console.log(error);

            }


        }
        else {
            console.log(result);
            // this.navigateToCaseList();

            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Card Authorization Updated ..!!", false);
                this.setState({
                    errorTODAYDATE: "",
                    errorCLNTNAME: "",
                    errorACCHLDRNAME: "",
                    errorCARDTYP: "",
                    errorCARDNO: "",
                    errorEXPDATE: "",
                    errorSECURITYCD: "",
                    errorBILLINGADDR: "",
                    errorAMOUNT: "",
                    errorPAYFOR: ""
                });
                errorval = false;
                await this.setState({ Dispalycomp: true });
                this.PopulateData(this.state.Case_Id);
                this.gotoCaseType(false, this.state.CUSTCD, this.state.Case_Id, null, null, null);
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                await this.showMsg(" Authorization Details Accepted ..!!", false);
                this.gotoCaseType(true, this.state.CUSTCD, this.state.Case_Id, null, null, null);
            }
        }


    };


    setUpdateParams() {
        var parameters = {
            "transaction": "UPDATE",
            "authorizations": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS": this.state.Case_Id,
                    "TODAYDATE": this.formatDate(this.state.Todays_Date),
                    "CLNTNAME": this.state.Name_Of_Customer,
                    "ACCHLDRNAME": this.state.Name_Of_Cardholder,
                    "CARDTYP": this.state.Card_Type,
                    "CARDNO": this.state.Card_Number,
                    "EXPDATE": this.formatDate(this.state.Expiration_Date),
                    "SECURITYCD": this.state.Security_Code,
                    "BILLINGADDR": this.state.Billing_Address,
                    "AMOUNT": this.state.Amount,
                    "PAYFOR": this.state.Payment,
                    "AGREE": this.state.Agree
                }
            ]
        }
        return parameters

    };


    // CRUD Operations
    CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            this.CreateCardAuth()
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateCardAuth()

        }
    };

    // ..............Date Formate mm/dd/yyyy to yyyymmdd  ..........
    formatDate(CDate) {
        var year = CDate.slice(0, 4)
        var month = CDate.slice(5, 7)
        var day = CDate.slice(8, 10)
        var date_format = year + month + day
        return date_format
    };

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

    // To Check Agreement
    async isCheck() {
        await this.setState({ AgreeChk: !this.state.AgreeChk });
        if (this.state.AgreeChk == true) {
            await this.setState({ Agree: "Y" });
        }
        else {
            await this.setState({ Agree: "N" });
        }

        console.log(this.state.AgreeChk);
        console.log(this.state.Agree);
    };


    // To Clear Input Field
    onClear() {
        this.setState({
            Todays_Date: "",
            Name_Of_Customer: "",
            Name_Of_Cardholder: "",
            Card_Type: "",
            Card_Number: "",
            Expiration_Date: "",
            Security_Code: "",
            Billing_Address: "",
            Amount: "",
            Payment: "",
            Agree: "",
            AgreeChk: false,

            // error state
            errorTODAYDATE: "",
            errorCLNTNAME: "",
            errorACCHLDRNAME: "",
            errorCARDTYP: "",
            errorCARDNO: "",
            errorEXPDATE: "",
            errorSECURITYCD: "",
            errorBILLINGADDR: "",
            errorAMOUNT: "",
            errorPAYFOR: ""

        });
        errorval = false
    }
    // Navigate To Case List
 navigateToCaseList() {
    if (this.props.isCust) {
        return this.props.history.push('/customerdashboard')
    }
    else {
        return this.props.history.push('/cases')
    
    }

};


    // Update Case Status and Genrate Invoice
    async  genrateInv() {
        var result = '', errors = [], errorMessage = '';
        try {
            console.log(this.setParams());
            result = await execGql('mutation', InvoicesCRUDOpsQuery, await this.setParams());
        }
        catch (err) {
            console.log(err);
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            console.log(errors);
            console.log(errorMessage);
        }
        else {
            console.log(result);
        }
    }

    async setParams() {

        //   var invoicedate = this.formatSystemDate()

        //lineitem without fee
        var docdetails = [{
            "CLNT": "1002",
            "LANG": "EN",
            "PARTNUMBER": "900001",
            "PARTDESC": "ADVANCE",
            "RATE": this.state.Amount,
            "QUANTITY": "1",
            "AMOUNT": this.state.Amount
        }]

        let taxamounts = await doCalulations(docdetails, "1002", "EN");

        var parameters = {
            "transaction": "CREATE",
            "invoices": [
                {
                    "DocHeader": {
                        "CLNT": "1002",
                        "LANG": "EN",
                        "DOCDT": this.setformatDate(this.state.invoicedate),
                        "INVDT": this.setformatDate(this.state.invoicedate),
                        "DOCNO": this.state.Case_Id,
                        "RMKS": "Remark",
                        "CURRENCY": "USD",
                        "DOCHDR": "ADVANCE-" + this.state.Case_Id + "-Title",
                        "CUSTCD": this.state.CustCode,
                        "CUSTOMER": this.state.Client_Name,
                        "DUEDT": this.setformatDate(this.state.invoicedate),
                        "STATUS": "NTST",
                        "DOCTYPE": "INV",
                        "PONO": "",
                        "CMPN": "1050",
                        "CMPNNM": "Excel Investgation",
                        "BAL": this.state.Amount,
                        "TOT": this.state.Amount,
                        "CIDSYS": this.state.Case_Id
                    },
                    "DocDetails": docdetails,
                    "TaxAmounts": taxamounts
                }
            ]
        }
        console.log(parameters);

        return parameters
    }

    render() {
        console.log(new Date());

        // if (this.state.Dispalycomp) {
        return (
            <div className="ui one column grid">
                <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                    <div className="modal-content">
                        <div className="ui icon header">
                            <div className="ui active inverted loader"></div>
                        </div>
                    </div>
                </div>
                <div className="one wide computer one wide tablet one wide mobile row">
                </div>
                <div className="three column row">

                    <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                        <div className="ui segment" >
                            <div className="ui form">
                                <div className="ui three column stackable grid">
                                    <div className="row">
                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorTODAYDATE ? 'brown' : null }}>Today's Date</label>
                                                <div className="ui input">
                                                    <input type="Date" name="Todays_Date" style={{ borderColor: this.state.errorTODAYDATE ? 'brown' : null, backgroundColor: this.state.errorTODAYDATE ? '#f3ece7' : null }} value={this.state.Todays_Date} onChange={e => this.setState({ Todays_Date: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorTODAYDATE}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorCLNTNAME ? 'brown' : null }}>Name Of Customer</label>
                                                <div className="ui input">
                                                    <input type="text" name="Name_Of_Customer" style={{ borderColor: this.state.errorCLNTNAME ? 'brown' : null, backgroundColor: this.state.errorCLNTNAME ? '#f3ece7' : null }} value={this.state.Name_Of_Customer} onChange={e => this.setState({ Name_Of_Customer: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorCLNTNAME}</span> : null}
                                            </div>
                                        </div>
                                        <div className=" five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorACCHLDRNAME ? 'brown' : null }}>Name Of Cardholder</label>
                                                <div className="ui input">
                                                    <input type="text" name="Name_Of_Cardholder" style={{ borderColor: this.state.errorACCHLDRNAME ? 'brown' : null, backgroundColor: this.state.errorACCHLDRNAME ? '#f3ece7' : null }} value={this.state.Name_Of_Cardholder} onChange={e => this.setState({ Name_Of_Cardholder: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorACCHLDRNAME}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorCARDTYP ? 'brown' : null }}>Card Type</label>
                                                <select className="" value={this.state.Card_Type} style={{ borderColor: this.state.errorCARDTYP ? 'brown' : null, backgroundColor: this.state.errorCARDTYP ? '#f3ece7' : null }} onChange={e => this.setState({ Card_Type: e.target.value })}>
                                                    <option value="">Select</option>
                                                    {this.state.DropdownAutharr.map((data) => data.CARD_TYPE.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                </select>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorCARDTYP}</span> : null}
                                            </div>
                                        </div>
                                        <div className=" five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorCARDNO ? 'brown' : null }}>Card Number</label>
                                                <div className="ui input">
                                                    <input type="text" name="Card_Number" style={{ borderColor: this.state.errorCARDNO ? 'brown' : null, backgroundColor: this.state.errorCARDNO ? '#f3ece7' : null }} value={this.state.Card_Number} onChange={e => this.setState({ Card_Number: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorCARDNO}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorEXPDATE ? 'brown' : null }}>Expiration Date</label>
                                                <div className="ui input">
                                                    <input type="Date" name="Expiration_Date" style={{ borderColor: this.state.errorEXPDATE ? 'brown' : null, backgroundColor: this.state.errorEXPDATE ? '#f3ece7' : null }} value={this.state.Expiration_Date} onChange={e => this.setState({ Expiration_Date: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorEXPDATE}</span> : null}
                                            </div>
                                        </div>
                                        <div className=" five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorSECURITYCD ? 'brown' : null }}>Security Code</label>
                                                <div className="ui input">
                                                    <input type="text" name="Security_Code" style={{ borderColor: this.state.errorSECURITYCD ? 'brown' : null, backgroundColor: this.state.errorSECURITYCD ? '#f3ece7' : null }} value={this.state.Security_Code} onChange={e => this.setState({ Security_Code: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorSECURITYCD}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="three column row">
                                        <div className="ten wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorBILLINGADDR ? 'brown' : null }}>Billing Address</label>
                                                <div className="ui input">
                                                    <textarea rows="2" type="text" name="Billing_Address" style={{ borderColor: this.state.errorBILLINGADDR ? 'brown' : null, backgroundColor: this.state.errorBILLINGADDR ? '#f3ece7' : null }} value={this.state.Billing_Address} onChange={e => this.setState({ Billing_Address: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorBILLINGADDR}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorAMOUNT ? 'brown' : null }}>Amount</label>
                                                <div className="ui input">
                                                    <input type="text" name="Amount" style={{ borderColor: this.state.errorAMOUNT ? 'brown' : null, backgroundColor: this.state.errorAMOUNT ? '#f3ece7' : null }} value={this.state.Amount} onChange={e => this.setState({ Amount: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorAMOUNT}</span> : null}
                                            </div>
                                        </div>
                                        <div className=" five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorPAYFOR ? 'brown' : null }}>Payment For</label>
                                                <select className="" value={this.state.Payment} style={{ borderColor: this.state.errorPAYFOR ? 'brown' : null, backgroundColor: this.state.errorPAYFOR ? '#f3ece7' : null }} onChange={e => this.setState({ Payment: e.target.value })}>
                                                    {this.state.DropdownAutharr.map((data) => data.PAY_FOR.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                </select>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorPAYFOR}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" row" >
                                        <div className="seven wide column">
                                            <div className="row">
                                                <input type="checkbox" name="Other" value={this.state.Agree} checked={this.state.AgreeChk} onChange={() => this.isCheck()} />
                                                <label>I agree to the above total amount as per card issuer agreement.</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="ten wide column">
                                            <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                            <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                            <button className="ui  button" type="clear" onClick={() => this.onClear()}>Clear</button>
                                            <button className="ui  button" type="submit" onClick={() => this.navigateToCaseList()}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
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