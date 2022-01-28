import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { Authorizationddl, CashAuthorizationCRUDOps, InvoicesCRUDOpsQuery,SearchCustomerQuery } from '../Queries/queries';
import { doCalulations } from '../Invoice/SummaryCalculation';
var DropdownAuth = [];
var errorval = false
export default class OtherAuthorization extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Case_Id: "",
            Client_Name: "",
            CUSTCD: "",
            Payment: "",
            Payment_Mode: "",
            Amount: "",
            Fee: 0,
            DropdownAutharr: [],
            tcode: 'CREATE',
            Dispalycomp: false,
            DispalyBackColor: false,
            invoicedate: this.getformatDate(new Date().toISOString()),
            CustCode: '',
            //error state
            errorPAYMENTFOR: "",
            errorPAYMENTMODE: "",
            errorAMOUNT: "",
            errorFEE: ""
        };

        this.gotoPreviousTab = this.props.gotoPreviousTab.bind(this);
        this.showMsg = this.props.showMsg.bind(this);
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
    }

    async  componentDidMount() {
        this.DropdownAuth();
        // console.log(this.props.ContractSkip);
        // To Show Msg When User Don't save Case details First

        
        if (this.props.EMAILID) {
            this.searchCustomer(this.props.EMAILID)
        }

        if (!this.props.CLIENTID) {
            this.showMsg("Client details not save.\n Please save Client details first", true);
            this.gotoPreviousTab(0)
        }
        else if (!this.props.Case_Id) {
            console.log(this.props.Case_Id);
            this.showMsg("Case details not save.\n Please save case details first", true);
            this.gotoPreviousTab(1)
        }

        if (this.props.data) {
            await this.setState({ Dispalycomp: true });
            this.setState({
                Case_Id: this.props.data[0].CIDSYS,
                Payment: this.props.data[0].PAYMENTFOR,
                Payment_Mode: this.props.data[0].PAYMENTMODE,
                Amount: this.props.data[0].AMOUNT,
                Fee: this.props.data[0].FEE,
                tcode: 'UPDATE',
                Dispalycomp: false,
                CUSTCD: this.props.CLIENTID
            });
            console.log('this.props.data0000000000');
            console.log(this.state.Dispalycomp);
            console.log('this.props.data1111111111');
        }

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
                "PAY_MODE": result.data.PAY_MODE,
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

    // To create Cash Authorization
    async CreateCashAuth() {
        if (this.props.Case_Id) {
            var result = '', errorMessage = '', errors = [];
            try {
                await this.setState({ Case_Id: this.props.Case_Id, CUSTCD: this.props.CLIENTID, Client_Name: this.props.Client_Name })
                result = await execGql('mutation', CashAuthorizationCRUDOps, this.setCreateParams())
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
                            errorPAYMENTFOR: errorMessage[key].errorPAYMENTFOR,
                            errorPAYMENTMODE: errorMessage[key].errorPAYMENTMODE,
                            errorAMOUNT: errorMessage[key].errorAMOUNT,
                            errorFEE: errorMessage[key].errorFEE
                        });
                    }
                } catch (error) {
                    console.log(error);

                }


            }
            else {
                console.log(result);
                this.showMsg("Cash/Other Added Successfully", false);
                await this.genrateInv();
                this.gotoCaseType(true, this.state.CUSTCD, this.state.Case_Id, null, null, null);
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
                    "PAYMENTFOR": this.state.Payment,
                    "PAYMENTMODE": this.state.Payment_Mode,
                    "AMOUNT": this.state.Amount,
                    "FEE": this.state.Fee
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

    // To Update Cash Authorization
    async UpdateCashAuth() {

        var result = '', errorMessage = '', errors = [];
        try {

            result = await execGql('mutation', CashAuthorizationCRUDOps, this.setUpdateParams())
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
                        errorPAYMENTFOR: errorMessage[key].errorPAYMENTFOR,
                        errorPAYMENTMODE: errorMessage[key].errorPAYMENTMODE,
                        errorAMOUNT: errorMessage[key].errorAMOUNT,
                        errorFEE: errorMessage[key].errorFEE
                    });
                }
            } catch (error) {
                console.log(error);

            }


        }
        else {
            console.log(result);
            await this.showMsg("Cash/Other Updated Successfully", false);
            this.gotoCaseType(true, this.state.CUSTCD, this.state.Case_Id, null, null, null);
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
                    "PAYMENTFOR": this.state.Payment,
                    "PAYMENTMODE": this.state.Payment_Mode,
                    "AMOUNT": this.state.Amount,
                    "FEE": this.state.Fee
                }
            ]
        }
        return parameters

    };

    // To Clear Input Field
    onClear() {
        this.setState({
            Payment: "",
            Payment_Mode: "",
            Amount: "",
            Fee: "",

            //error state
            errorPAYMENTFOR: "",
            errorPAYMENTMODE: "",
            errorAMOUNT: ""
        });
        errorval = false

    };

    // CRUD Operations
    CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            this.CreateCashAuth()
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateCashAuth()

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
        //  var invoicedate = this.formatSystemDate()
        //lineitem with fee
        var docdetailswithfee = [{
            "CLNT": "1002",
            "LANG": "EN",
            "PARTNUMBER": "900001",
            "PARTDESC": "ADVANCE",
            "RATE": this.state.Amount,
            "QUANTITY": "1",
            "AMOUNT": this.state.Amount
        }, {
            "CLNT": "1002",
            "LANG": "EN",
            "PARTNUMBER": "900002",
            "PARTDESC": "FEE",
            "RATE": this.state.Fee,
            "QUANTITY": "1",
            "AMOUNT": this.state.Fee
        }]

        let taxamounts = await doCalulations(docdetailswithfee, "1002", "EN");
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
                                                <label style={{ color: this.state.errorPAYMENTFOR ? 'brown' : null }}>Payment For</label>
                                                <select className="" value={this.state.Payment} style={{ borderColor: this.state.errorPAYMENTFOR ? 'brown' : null, backgroundColor: this.state.errorPAYMENTFOR ? '#f3ece7' : null }} onChange={e => this.setState({ Payment: e.target.value })}>
                                                    {this.state.DropdownAutharr.map((data) => data.PAY_FOR.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                </select>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorPAYMENTFOR}</span> : null}
                                            </div>
                                        </div>
                                        <div className=" five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorPAYMENTMODE ? 'brown' : null }}>Payment Mode</label>
                                                <select className="" value={this.state.Payment_Mode} style={{ borderColor: this.state.errorPAYMENTMODE ? 'brown' : null, backgroundColor: this.state.errorPAYMENTMODE ? '#f3ece7' : null }} onChange={e => this.setState({ Payment_Mode: e.target.value })}>
                                                    {this.state.DropdownAutharr.map((data) => data.PAY_MODE.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                </select>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorPAYMENTMODE}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorAMOUNT ? 'brown' : null }}>Amount</label>
                                                <div className="ui input">
                                                    <input type="text" name="Amount" value={this.state.Amount} style={{ borderColor: this.state.errorAMOUNT ? 'brown' : null, backgroundColor: this.state.errorAMOUNT ? '#f3ece7' : null }} onChange={e => this.setState({ Amount: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorAMOUNT}</span> : null}
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
                                    <div className="row">
                                        <div className="ten wide column">
                                            <button className="ui primary button" type="submit" onClick={() => this.CRUD_operation()}>Save & Continue</button>
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