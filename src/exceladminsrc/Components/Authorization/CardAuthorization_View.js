import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { Authorizationddl, CardAuthorizationCRUDOps, CardAuthorizationDetails } from '../Queries/queries';
import { updateCaseStatus, createInvoice } from './CaseAuthCommonFun';
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
            Dispalycomp: true,
            DispalyBackColor: false,
            OnClickButton: '',

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
    };


    async componentDidMount() {
        await this.DropdownAuth();
        console.log(this.props.Case_Id);

        // To Show Msg When User Don't save Case details First
        if (!this.props.Case_Id) {
            this.showMsg("Case details not save.\n Please save case details first", true);
            this.gotoPreviousTab(1)
        }

        // Populate Data When Edit Mode
        if (this.props.data) {
            //await this.setState({ Dispalycomp: !this.state.Dispalycomp });
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
                tcode: 'UPDATE',
                //Dispalycomp: !this.state.Dispalycomp
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
            this.setState({
                // Dispalycomp: !this.state.Dispalycomp
            });
            this.PopulateData(this.props.Case_Id);
        };


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
                    tcode: 'UPDATE',
                    //Dispalycomp: !this.state.Dispalycomp
                });
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

    //  Array To Map
    arrayToMap = (input, CODE = 'CODE', DESC = 'DESC') => {
        return input.reduce((init, next) => {
            init = init || (new Map())
            init.set(next[CODE], next[DESC])
            return init
        }, new Map())
    }

    render() {
        console.log(new Date());

        if (this.state.Dispalycomp) {
            return (
                <div className="ui one column grid">
                    <div className="one wide computer one wide tablet one wide mobile row">
                    </div>
                    <div className="three column row">

                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment" >
                                <div className="ui form">
                                    <div className="ui stackable grid">

                                        <div className="row" />
                                        <div className="row" />
                                        {/*............................................................. */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Today's Date</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Todays_Date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ...................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Name Of Customer</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Name_Of_Customer}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Name Of Cardholder</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Name_Of_Cardholder}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* .............................................................. */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Card Type</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {/* <select className="" value={this.state.Card_Type} style={{ borderColor: this.state.errorCARDTYP ? 'brown' : null, backgroundColor: this.state.errorCARDTYP ? '#f3ece7' : null }} onChange={e => this.setState({ Card_Type: e.target.value })}>
                                                            <option value="">Select</option>
                                                            {this.state.DropdownAutharr.map((data) => data.CARD_TYPE.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select> */}
                                                        {
                                                            this.state.DropdownAutharr.length > 0 ? this.arrayToMap(this.state.DropdownAutharr[0].CARD_TYPE).get(this.state.Card_Type) : ""
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Card Number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Card_Number}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Expiration Date</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Expiration_Date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Security Code</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Security_Code}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ...................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Billing Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Billing_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ....................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Amount</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Amount}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Payment For</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {/* <select className="" value={this.state.Payment} style={{ borderColor: this.state.errorPAYFOR ? 'brown' : null, backgroundColor: this.state.errorPAYFOR ? '#f3ece7' : null }} onChange={e => this.setState({ Payment: e.target.value })}>
                                                            {this.state.DropdownAutharr.map((data) => data.PAY_FOR.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select> */}

                                                        {
                                                            this.state.DropdownAutharr.length > 0 ? this.arrayToMap(this.state.DropdownAutharr[0].PAY_FOR).get(this.state.Payment) : ""
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ............................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>I agree to the above total amount as per card issuer agreement.</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.AgreeChk}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ................................................................ */}

                                        <div className="row">
                                            <div className="ten wide column">
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