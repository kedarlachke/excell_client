import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { Authorizationddl, CashAuthorizationCRUDOps } from '../Queries/queries';
import { updateCaseStatus, createInvoice } from './CaseAuthCommonFun';
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
            Dispalycomp: true,
            DispalyBackColor: false,

            //error state
            errorPAYMENTFOR: "",
            errorPAYMENTMODE: "",
            errorAMOUNT: "",
            errorFEE: ""
        };

        this.gotoPreviousTab = this.props.gotoPreviousTab.bind(this);
        this.showMsg = this.props.showMsg.bind(this);
    }

    async  componentDidMount() {
        this.DropdownAuth();


        // To Show Msg When User Don't save Case details First
        if (!this.props.Case_Id) {
            console.log(this.props.Case_Id);
            this.showMsg("Case details not save.\n Please save case details first", true);
            this.gotoPreviousTab(1)
        }

        if (this.props.data) {
            await this.setState({ Dispalycomp: !this.state.Dispalycomp });
            this.setState({
                Case_Id: this.props.data[0].CIDSYS,
                Payment: this.props.data[0].PAYMENTFOR,
                Payment_Mode: this.props.data[0].PAYMENTMODE,
                Amount: this.props.data[0].AMOUNT,
                Fee: this.props.data[0].FEE,
                tcode: 'UPDATE',
                Dispalycomp: !this.state.Dispalycomp
            });
        }

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



    // Navigate To Case List
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
                                        {/* ................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Payment For</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {/* <select className="" value={this.state.Payment} style={{ borderColor: this.state.errorPAYMENTFOR ? 'brown' : null, backgroundColor: this.state.errorPAYMENTFOR ? '#f3ece7' : null }} onChange={e => this.setState({ Payment: e.target.value })}>
                                                            {this.state.DropdownAutharr.map((data) => data.PAY_FOR.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select> */}
                                                        {
                                                            this.state.DropdownAutharr.length > 0 ? this.arrayToMap(this.state.DropdownAutharr[0].PAY_FOR).get(this.state.Payment) : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Payment Mode</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {/* <select className="" value={this.state.Payment_Mode} style={{ borderColor: this.state.errorPAYMENTMODE ? 'brown' : null, backgroundColor: this.state.errorPAYMENTMODE ? '#f3ece7' : null }} onChange={e => this.setState({ Payment_Mode: e.target.value })}>
                                                            {this.state.DropdownAutharr.map((data) => data.PAY_MODE.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select> */}
                                                        {
                                                            this.state.DropdownAutharr.length > 0 ? this.arrayToMap(this.state.DropdownAutharr[0].PAY_MODE).get(this.state.Payment_Mode) : ""
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* ................................................................................ */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Amount</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
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