import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { Authorizationddl, eCheckAuthorizationCRUDOps, eCheckAuthorizationDetails, InvoicesCRUDOpsQuery,SearchCustomerQuery } from '../Queries/queries';
import { doCalulations } from '../Invoice/SummaryCalculation';
var DropdownAuth = [];
var errorval = false
export default class EcheckAuthorization extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Case_Id: "",
            Client_Name: "",
            CUSTCD: "",
            Todays_Date: "",
            Name_Of_Client: "",
            Name_of_account_holder: "",
            Bank_Name: "",
            Account_No: "",
            Bank_routing_number: "",
            Client_address: "",
            Amount_Authorized: "",
            Fee: 0,
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
            //error state
            errorTODAYDATE: "",
            errorCLNTNAME: "",
            errorACCHLDRNAME: "",
            errorBANKNAME: "",
            errorBANKACCNO: "",
            errorBANKROUTNO: "",
            errorCLNTADDRFLBANK: "",
            errorAMTAUTHRZD: "",
            errorPAYFOR: "",
            errorFEE: ""
        }
        this.gotoPreviousTab = this.props.gotoPreviousTab.bind(this);
        this.showMsg = this.props.showMsg.bind(this);
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
    };



    async  componentDidMount() {

        
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

        this.DropdownAuth();
        if (this.props.data) {
            await this.setState({ Dispalycomp: true });
            this.setState({
                Case_Id: this.props.data[0].CIDSYS,
                Todays_Date: this.formatDate1(this.props.data[0].TODAYDATE),
                Name_Of_Client: this.props.data[0].CLNTNAME,
                Name_of_account_holder: this.props.data[0].ACCHLDRNAME,
                Bank_Name: this.props.data[0].BANKNAME,
                Account_No: this.props.data[0].BANKACCNO,
                Bank_routing_number: this.props.data[0].BANKROUTNO,
                Client_address: this.props.data[0].CLNTADDRFLBANK,
                Amount_Authorized: this.props.data[0].AMTAUTHRZD,
                Fee: this.props.data[0].FEE,
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

        }

        // Populate Data when back to Case tab
        if (this.props.Case_Id) {
            await this.setState({
                Dispalycomp: true
            });
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



    // To Populate Data
    async PopulateData(CaseId) {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', eCheckAuthorizationDetails, this.setSearchParams(CaseId))
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

            if (result.data.eCheckAuthorizationDetails.length != 0) {
                await this.setState({
                    Case_Id: result.data.eCheckAuthorizationDetails[0].CIDSYS,
                    Todays_Date: this.formatDate1(result.data.eCheckAuthorizationDetails[0].TODAYDATE),
                    Name_Of_Client: result.data.eCheckAuthorizationDetails[0].CLNTNAME,
                    Name_of_account_holder: result.data.eCheckAuthorizationDetails[0].ACCHLDRNAME,
                    Bank_Name: result.data.eCheckAuthorizationDetails[0].BANKNAME,
                    Account_No: result.data.eCheckAuthorizationDetails[0].BANKACCNO,
                    Bank_routing_number: result.data.eCheckAuthorizationDetails[0].BANKROUTNO,
                    Client_address: result.data.eCheckAuthorizationDetails[0].CLNTADDRFLBANK,
                    Amount_Authorized: result.data.eCheckAuthorizationDetails[0].AMTAUTHRZD,
                    Fee: result.data.eCheckAuthorizationDetails[0].FEE,
                    Payment: result.data.eCheckAuthorizationDetails[0].PAYFOR,
                    Agree: result.data.eCheckAuthorizationDetails[0].AGREE,
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


            }
            else {
                this.setState({ Dispalycomp: false })
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

    // To create eCheck Authorization
    async CreateEcheckAuth() {
        if (this.props.Case_Id) {
            var result = '', errorMessage = '', errors = [];
            try {
                await this.setState({ Case_Id: this.props.Case_Id, CUSTCD: this.props.CLIENTID, Client_Name: this.props.Client_Name })
                result = await execGql('mutation', eCheckAuthorizationCRUDOps, this.setCreateParams())
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
                            errorBANKNAME: errorMessage[key].errorBANKNAME,
                            errorBANKACCNO: errorMessage[key].errorBANKACCNO,
                            errorBANKROUTNO: errorMessage[key].errorBANKROUTNO,
                            errorCLNTADDRFLBANK: errorMessage[key].errorCLNTADDRFLBANK,
                            errorAMTAUTHRZD: errorMessage[key].errorAMTAUTHRZD,
                            errorPAYFOR: errorMessage[key].errorPAYFOR,
                            errorFEE: errorMessage[key].errorFEE
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
                    this.showMsg("eChech Authorization Completed ..!!", false);
                    this.setState({
                        errorTODAYDATE: "",
                        errorCLNTNAME: "",
                        errorACCHLDRNAME: "",
                        errorBANKNAME: "",
                        errorBANKACCNO: "",
                        errorBANKROUTNO: "",
                        errorCLNTADDRFLBANK: "",
                        errorAMTAUTHRZD: "",
                        errorPAYFOR: "",
                        errorFEE: ""
                    });
                    errorval = false
                    await this.setState({
                        Dispalycomp: true
                    });
                    this.PopulateData(this.state.Case_Id);
                    this.gotoCaseType(false, this.state.CUSTCD, this.state.Case_Id, null, null, null);
                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.showMsg(" Authorization Details Accepted ..!!", false);
                    await this.genrateInv()
                    this.gotoCaseType(true, this.state.CUSTCD, this.state.Case_Id, null, null, null);
                    // this.navigateToCaseList();
                }
            }

        }
        else {
            this.showMsg("Please enter case details first", true)
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
                    "CLNTNAME": this.state.Name_Of_Client,
                    "ACCHLDRNAME": this.state.Name_of_account_holder,
                    "BANKNAME": this.state.Bank_Name,
                    "BANKACCNO": this.state.Account_No,
                    "BANKROUTNO": this.state.Bank_routing_number,
                    "CLNTADDRFLBANK": this.state.Client_address,
                    "AMTAUTHRZD": this.state.Amount_Authorized,
                    "FEE": this.state.Fee,
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
        console.log(date_format);
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
    // To Update eCheck Authorization
    async UpdateEcheckAuth() {

        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('mutation', eCheckAuthorizationCRUDOps, this.setUpdateParams())
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
                        errorBANKNAME: errorMessage[key].errorBANKNAME,
                        errorBANKACCNO: errorMessage[key].errorBANKACCNO,
                        errorBANKROUTNO: errorMessage[key].errorBANKROUTNO,
                        errorCLNTADDRFLBANK: errorMessage[key].errorCLNTADDRFLBANK,
                        errorAMTAUTHRZD: errorMessage[key].errorAMTAUTHRZD,
                        errorPAYFOR: errorMessage[key].errorPAYFOR,
                        errorFEE: errorMessage[key].errorFEE
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
                this.showMsg("eChech Authorization Updated ..!!", false);
                this.setState({
                    errorTODAYDATE: "",
                    errorCLNTNAME: "",
                    errorACCHLDRNAME: "",
                    errorBANKNAME: "",
                    errorBANKACCNO: "",
                    errorBANKROUTNO: "",
                    errorCLNTADDRFLBANK: "",
                    errorAMTAUTHRZD: "",
                    errorPAYFOR: "",
                    errorFEE: ""
                });
                errorval = false;
                await this.setState({
                    Dispalycomp: true
                });
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
                    "CLNTNAME": this.state.Name_Of_Client,
                    "ACCHLDRNAME": this.state.Name_of_account_holder,
                    "BANKNAME": this.state.Bank_Name,
                    "BANKACCNO": this.state.Account_No,
                    "BANKROUTNO": this.state.Bank_routing_number,
                    "CLNTADDRFLBANK": this.state.Client_address,
                    "AMTAUTHRZD": this.state.Amount_Authorized,
                    "FEE": this.state.Fee,
                    "PAYFOR": this.state.Payment,
                    "AGREE": this.state.Agree
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



    // CRUD Operations
    CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            this.CreateEcheckAuth()
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateEcheckAuth()

        }
    };

 // Navigate To Case List
 navigateToCaseList() {
    if (this.props.isCust) {
        return this.props.history.push('/customerdashboard')
    }
    else {
        return this.props.history.push('/cases')
    
    }

};

    // To Clear Input Field
    onClear() {
        this.setState({
            Todays_Date: "",
            Name_Of_Client: "",
            Name_of_account_holder: "",
            Bank_Name: "",
            Account_No: "",
            Bank_routing_number: "",
            Client_address: "",
            Amount_Authorized: "",
            Fee: "",
            Payment: "",
            Agree: "",
            AgreeChk: false,

            //error state
            errorTODAYDATE: "",
            errorCLNTNAME: "",
            errorACCHLDRNAME: "",
            errorBANKNAME: "",
            errorBANKACCNO: "",
            errorBANKROUTNO: "",
            errorCLNTADDRFLBANK: "",
            errorAMTAUTHRZD: "",
            errorPAYFOR: "",
            errorFEE: ""
        });
        errorval = false
    }


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

        //var invoicedate = this.formatSystemDate()

        //lineitem with fee
        var docdetailswithfee = [{
            "CLNT": "1002",
            "LANG": "EN",
            "PARTNUMBER": "900001",
            "PARTDESC": "ADVANCE",
            "RATE": this.state.Amount_Authorized,
            "QUANTITY": "1",
            "AMOUNT": this.state.Amount_Authorized
        }, {
            "CLNT": "1002",
            "LANG": "EN",
            "PARTNUMBER": "900002",
            "PARTDESC": "FEE",
            "RATE": this.state.Fee,
            "QUANTITY": "1",
            "AMOUNT": this.state.Fee
        }]

        let taxamounts = await doCalulations(docdetailswithfee, "1002", "EN")
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
                        "BAL": this.state.Amount_Authorized,
                        "TOT": this.state.Amount_Authorized,
                        "CIDSYS": this.state.Case_Id
                    },
                    "DocDetails": docdetailswithfee,
                    "TaxAmounts": taxamounts
                }
            ]
        }
        return parameters
    }

    //onFocus of Fee

    handleFocus = (e) => {
        const { value } = e.target
        if (value == 0) this.setState({ Fee: "" })

    }

    //onBlur of Fee

    handleBlur = (e) => {
        const { value } = e.target
        console.log(value);

        if (value == "") this.setState({ Fee: 0 })
    }
    render() {

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
                                        <div className=" five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorCLNTNAME ? 'brown' : null }}>Name Of Client</label>
                                                <div className="ui input">
                                                    <input type="text" name="Name_Of_Client" style={{ borderColor: this.state.errorCLNTNAME ? 'brown' : null, backgroundColor: this.state.errorCLNTNAME ? '#f3ece7' : null }} value={this.state.Name_Of_Client} onChange={e => this.setState({ Name_Of_Client: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorCLNTNAME}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorACCHLDRNAME ? 'brown' : null }}>Name of account holder</label>
                                                <div className="ui input">
                                                    <input type="text" name="Name_of_account_holder" style={{ borderColor: this.state.errorACCHLDRNAME ? 'brown' : null, backgroundColor: this.state.errorACCHLDRNAME ? '#f3ece7' : null }} value={this.state.Name_of_account_holder} onChange={e => this.setState({ Name_of_account_holder: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorACCHLDRNAME}</span> : null}
                                            </div>
                                        </div>
                                        <div className=" five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorBANKNAME ? 'brown' : null }}>Bank Name</label>
                                                <div className="ui input">
                                                    <input type="text" name="Bank_Name" style={{ borderColor: this.state.errorBANKNAME ? 'brown' : null, backgroundColor: this.state.errorBANKNAME ? '#f3ece7' : null }} value={this.state.Bank_Name} onChange={e => this.setState({ Bank_Name: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorBANKNAME}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorBANKACCNO ? 'brown' : null }}>Bank account number</label>
                                                <div className="ui input">
                                                    <input type="text" style={{ borderColor: this.state.errorBANKACCNO ? 'brown' : null, backgroundColor: this.state.errorBANKACCNO ? '#f3ece7' : null }} name="account_no" value={this.state.Account_No} onChange={e => this.setState({ Account_No: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorBANKACCNO}</span> : null}
                                            </div>
                                        </div>
                                        <div className=" five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorBANKROUTNO ? 'brown' : null }}>Bank routing number</label>
                                                <div className="ui input">
                                                    <input type="text" style={{ borderColor: this.state.errorBANKROUTNO ? 'brown' : null, backgroundColor: this.state.errorBANKROUTNO ? '#f3ece7' : null }} name="Bank_routing_number" value={this.state.Bank_routing_number} onChange={e => this.setState({ Bank_routing_number: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorBANKROUTNO}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="three column row">
                                        <div className="ten wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorCLNTADDRFLBANK ? 'brown' : null }}>Client address on file w/bank</label>
                                                <div className="ui input">
                                                    <textarea rows="2" type="text" style={{ borderColor: this.state.errorCLNTADDRFLBANK ? 'brown' : null, backgroundColor: this.state.errorCLNTADDRFLBANK ? '#f3ece7' : null }} name="Client_address" value={this.state.Client_address} onChange={e => this.setState({ Client_address: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorCLNTADDRFLBANK}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorAMTAUTHRZD ? 'brown' : null }}>Amount Authorized</label>
                                                <div className="ui input">
                                                    <input type="text" name="Amount_Authorized" style={{ borderColor: this.state.errorAMTAUTHRZD ? 'brown' : null, backgroundColor: this.state.errorAMTAUTHRZD ? '#f3ece7' : null }} value={this.state.Amount_Authorized} onChange={e => this.setState({ Amount_Authorized: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorAMTAUTHRZD}</span> : null}
                                            </div>
                                        </div>
                                        <div className=" five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorFEE ? 'brown' : null }}>Fee(if any)</label>
                                                <div className="ui input">
                                                    <input type="text" name="Fee" style={{ borderColor: this.state.errorFEE ? 'brown' : null, backgroundColor: this.state.errorFEE ? '#f3ece7' : null }} value={this.state.Fee} onFocus={(e) => this.handleFocus(e)} onBlur={(e) => this.handleBlur(e)} onChange={e => this.setState({ Fee: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorFEE}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="three column row">
                                        <div className="five wide column">
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
                                                <label>I agree to the above total amount as per account holder agreement.</label>
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