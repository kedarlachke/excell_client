import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { Authorizationddl, eCheckAuthorizationCRUDOps, eCheckAuthorizationDetails } from '../Queries/queries';
import { updateCaseStatus, createInvoice } from './CaseAuthCommonFun';
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
            Dispalycomp: true,
            DispalyBackColor: false,
            OnClickButton: '',

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

    };

    async  componentDidMount() {

        await this.DropdownAuth();
        if (this.props.data) {
            await this.setState({ Dispalycomp: !this.state.Dispalycomp });
            await this.setState({
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
                // Agree: this.props.data[0].AGREE,
                tcode: 'UPDATE',
                //Dispalycomp: !this.state.Dispalycomp
            });

            if (this.props.data[0].AGREE == 'Y') {
                this.setState({ Agree: "YES" })
            }
            else if (this.props.data[0].AGREE == 'N') {
                this.setState({ Agree: "NO" })
            }
        }

        // Populate Data when back to Case tab
        if (this.props.Case_Id) {
            this.setState({
                // Dispalycomp: !this.state.Dispalycomp
            });
            await this.PopulateData(this.props.Case_Id);
        };
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

            console.log(result);
            if (result.data.CardAuthorizationDetails.length != 0) {
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
                    // Agree: result.data.eCheckAuthorizationDetails[0].AGREE,
                    tcode: 'UPDATE',
                });

                if (result.data.eCheckAuthorizationDetails[0].AGREE == 'Y') {
                    await this.setState({ Agree: "YES" })
                }
                else if (result.data.eCheckAuthorizationDetails[0].AGREE == 'N') {
                    await this.setState({ Agree: "NO" })
                }
            }
        }

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
            await DropdownAuth.push({
                "PAY_FOR": result.data.PAY_FOR
            })

            await this.setState({ DropdownAutharr: DropdownAuth })

        }

    };

    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
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

    //  Array To Map
    arrayToMap = (input, CODE = 'CODE', DESC = 'DESC') => {
        return input.reduce((init, next) => {
            init = init || (new Map())
            init.set(next[CODE], next[DESC])
            return init
        }, new Map())
    }

    render() {
        if (true) {
            return (
                <div className="ui one column grid">
                    <div className="one wide computer one wide tablet one wide mobile row">
                    </div>
                    <div className="three column row">

                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment" >
                                <div className="ui form">
                                    <div className="ui three column stackable grid">

                                        <div className="row" />
                                        <div className="row" />
                                        {/* ..................................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Today's Date</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Todays_Date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Name Of Client</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Name_Of_Client}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ...................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Name of account holder</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Name_of_account_holder}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Bank Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Bank_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ....................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Bank account number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Account_No}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Bank routing number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Bank_routing_number}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ...................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Client address on file w/bank</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Client_address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ............................................................................. */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Amount Authorized</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Amount_Authorized}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Fee(if any)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Fee}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ............................................................................ */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Payment For</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
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

                                        {/* ................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>I agree to the above total amount as per account holder agreement.</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Agree}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ......................................................................................... */}

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