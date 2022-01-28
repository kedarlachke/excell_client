import React, { Component } from 'react';
import { execGql } from "../apolloClient/apolloClient";
import { Link, } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { searchBillableCaseHoursQuery, generateInvoiceQuery, MarkAsBilledQuery, UpdateProgressAgainstInvoiceQuery } from '../Queries/queries';
import { doCalulations } from '../Invoice/SummaryCalculation';
let progressreports = []
export default class CasesBillableHrs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: '',
            Case_Id: '',
            CLIENTID: '',
            selectedList: [],
            popupmsg: '',
            fromDT: '2017-04-07',
            toDT: this.getformatDate(new Date().toISOString()),
            isBilled: 'N'
        };
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
        this.showMsg = this.props.showMsg.bind(this);

    }
    async componentDidMount() {
        await this.setState({ Case_Id: this.props.Case_Id, CLIENTID: this.props.CLIENTID })
        this.searchBillableCasesHrs()
    }

    //..............Date Formate Convertion..........
    getformatDate(date) {
        var date_format = date.slice(0, 10)
        return date_format
    }

    //..............Date Formate Convertion..........
    setformatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(5, 7)
        var day = date.slice(8, 10)

        var date_format = year + month + day
        return date_format
    }

    async searchBillableCasesHrs() {
        var result = '', errorMessage = '', errors = [];
        try {
            console.log(this.setSearchParams());
            result = await execGql('query', searchBillableCaseHoursQuery, this.setSearchParams())
            // console.log(result);
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
            this.setState({ dataList: result })


        }

    }
    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "FROMDATE": this.setformatDate(this.state.fromDT),
            "TODATE": this.setformatDate(this.state.toDT),
            "CLNTID": this.state.CLIENTID,
            "CIDSYS": this.state.Case_Id,
            "ISBILLED": this.state.isBilled
        }
        return parameters

    }

    //..............Date Formate Convertion..........
    formatDate(date) {
        if (date != null) {
            var year = date.slice(0, 4)
            var month = date.slice(4, 6)
            var day = date.slice(6, 8)

            var date_format = month + '/' + day + '/' + year
            return date_format
        }
    }
    //..............checkbox onchange function..........
    async toggleRow(cellInfo, event) {
        let index = cellInfo.index
        let selectedListArr = [...this.state.selectedList]
        if (event.target.checked) {
            await selectedListArr.push({ [index]: cellInfo.original })
        }
        else {
            selectedListArr = await selectedListArr.filter(data => Object.entries(data)[0][0] !== index.toString())
        }
        await this.setState({ selectedList: selectedListArr })
    }
    //......To Convert System Date to yyyymmdd.....//
    formatSystemDate = () => {
        var date = new Date();
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        month = month.length == 1 ? '0' + month : month;
        var day = date.getDate().toString();
        day=day.length==1?'0'+day:day
        var date_format = year + month + day
        // console.log(date_format);
        return date_format
    }
    //..............set createinvoice params..........
    async setCreateInvoiceParams() {
        const { selectedList } = this.state
        let TOTAL = 0, docDetail = [], clntid = '', clientname = '', invoicedate = this.formatSystemDate(),
            progressreportsIsBilled = [], lineitemno = '';

        for (let i = 0; i < selectedList.length; i++) {
            for (let key in selectedList[i]) {

                console.log(selectedList[i][key]);

                clntid = selectedList[i][key].CLNTID
                clientname = selectedList[i][key].CLIENTNAME
                lineitemno = i.toString()

                let amount = parseInt(selectedList[i][key].WORKHOURS) * parseInt(selectedList[i][key].RATE)

                //.............create docDetailObj..........
                let docDetailObj = {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "PARTNUMBER": selectedList[i][key].WORKCAT,
                    "PARTDESC": selectedList[i][key].SERVICETYP + "-" + selectedList[i][key].CATDESC,
                    "RATE": selectedList[i][key].RATE,
                    "QUANTITY": selectedList[i][key].WORKHOURS,
                    "AMOUNT": amount.toString(),
                    "LINEITEMNO": lineitemno,
                    "SIGN": "+"
                }

                let progressreportsIsBilledObj = {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "PRGRPTID": selectedList[i][key].PRGRPTID,
                    "PRGWORKID": selectedList[i][key].PRGWORKID,
                    "CIDSYS": this.state.Case_Id,
                    "ISBILLED": "Y"

                }
                let progressreportsObj = {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "PRGRPTID": selectedList[i][key].PRGRPTID,
                    "PRGWORKID": selectedList[i][key].PRGWORKID,
                    "DOCID": "",
                    "LINEITEMNO": lineitemno,
                    "CIDSYS": this.state.Case_Id
                }

                docDetail.push(docDetailObj)
                progressreportsIsBilled.push(progressreportsIsBilledObj)
                progressreports.push(progressreportsObj);
                TOTAL = TOTAL + amount
                console.log(TOTAL);
            }
        }

        //.............create DocHeader..........
        var parameters = {
            "transaction": "CREATE",
            "invoices": [
                {
                    "DocHeader": {
                        "CLNT": "1002",
                        "LANG": "EN",
                        "DOCDT": invoicedate,
                        "INVDT": invoicedate,
                        "DOCNO": "BH",
                        "RMKS": "Remark",
                        "CURRENCY": "USD",
                        "DOCHDR": "SERVICE INVOICE",
                        "CUSTCD": clntid,
                        "CUSTOMER": clientname,
                        "DUEDT": invoicedate,
                        "STATUS": "NTST",
                        "DOCTYPE": "INV",
                        "PONO": "",
                        "CMPN": "1050",
                        "CMPNNM": "Excel Investgation",
                        "BAL": TOTAL,
                        "TOT": TOTAL,
                        "CIDSYS": this.state.Case_Id
                    },
                    "DocDetails": docDetail,
                    "TaxAmounts": await doCalulations(docDetail, "1002", "EN")
                }
            ],
            "progressreportsIsBilled": progressreportsIsBilled,

        }
        console.log(parameters);
        return parameters
    }

    //....................create Invoice............................
    async createInvoice() {
        if (this.state.selectedList.length == 0) {
            this.showMsg("Please select at least one record..!", true)
        }
        else {
            var result = '', errors = [], errorMessage = '';
            try {
                let queryVariables = await this.setCreateInvoiceParams();
                result = await execGql('mutation', generateInvoiceQuery, queryVariables);
                //executes 3 mutations InvoicesCRUDOps,UpdateProgressAgainstInvoice,ToggleProgressWorkBilling
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
                console.log(result.data.Invoices[0].DocHeader.DOCID);
                this.updtProgressAgainstInv(result.data.Invoices[0].DocHeader.DOCID)

            }
        }
    };

    //....................Update Progress Against Invoice func............................
    async updtProgressAgainstInv(docid) {
        var result = '', errors = [], errorMessage = '';
        try {
            console.log(docid);
            let parameters = {
                "progressreports": progressreports.map(data => ({ ...data, DOCID: docid }))//update docid in progressreports array
            }
            console.log(parameters);
            result = await execGql('mutation', UpdateProgressAgainstInvoiceQuery, parameters);
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
            this.searchBillableCasesHrs()
            await this.setState({
                selectedList: []
            })
            this.showMsg("Invoice created successfully", false)
            progressreports = []
        }
    };


    //....................mark as billed func............................
    async markAsBilled(rowData) {
        console.log(rowData);

        var result = '', errors = [], errorMessage = '';
        try {
            result = await execGql('mutation', MarkAsBilledQuery, this.setMarkAsBilledParams(rowData));
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
            this.searchBillableCasesHrs()
        }
    };

    setMarkAsBilledParams(rowData) {
        var parameters = {
            "progressreports": [{
                "CLNT": "1002",
                "LANG": "EN",
                "PRGRPTID": rowData.PRGRPTID,
                "PRGWORKID": rowData.PRGWORKID,
                "CIDSYS": rowData.CIDSYS,
                "ISBILLED": "Y"
            }
            ]
        }
        return parameters
    }

    clearscreen() {
        this.setState({
            fromDT: '2017-04-07',
            toDT: this.getformatDate(new Date().toISOString()),
            isBilled: ''
        })
        this.searchBillableCasesHrs()
    }

    /*-----------------------populates the list on enter keypress  --------------------*/
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchBillableCasesHrs()
        }
    }


    // Navigate To Case List
    navigateToCaseList() {
        return this.props.history.push('/cases')
    };

    render() {
        const { dataList } = this.state
        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className="three column row">

                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <h1 id="title_header"> Billable Hours</h1>

                                <div className="icode" id="title_header">

                                    <i id="iconbar" className="search icon" onClick={() => this.setState({ showSearchComp: !this.state.showSearchComp })}></i>
                                </div>
                                {this.state.showSearchComp ? <div className="field">
                                    <div className="ui segment">
                                        <i id="closeicon" className="window close outline icon" onClick={() => this.setState({ showSearchComp: !this.state.showSearchComp })}></i>
                                        <div className="ui form">
                                            <div className="ui three column stackable grid">

                                                <div className="row">
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label >From Date</label>
                                                            <input type="date" name="fromDT" placeholder="Phone Number" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.fromDT} onChange={e => this.setState({ fromDT: e.target.value })} />
                                                        </div>
                                                    </div>

                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label >To Date</label>
                                                            <input type="date" name="toDT" placeholder="Phone Number" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.toDT} onChange={e => this.setState({ toDT: e.target.value })} />
                                                        </div>
                                                    </div>

                                                    <div className=" five wide column">
                                                        <div className="field">
                                                            <label > Is Billed</label>
                                                            <select className="" value={this.state.isBilled} onKeyPress={(e) => this.handleKeyPress(e)}
                                                                onChange={e => this.setState({ isBilled: e.target.value })}>
                                                                <option value="">Select</option>
                                                                <option value="Y">Yes</option>
                                                                <option value="N">No</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="five wide column">
                                                        <button className="ui primary button" type="submit" onClick={() => this.searchBillableCasesHrs()}>Search</button>
                                                        <button className="ui  button" type="submit" onClick={() => this.clearscreen()} >Clear</button>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div> : null}

                            </div>

                        </div>

                        <div className="three column row">

                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                 <button className="ui primary button" type="submit" onClick={() => this.createInvoice()} >Generate Invoice</button> 
                                <button className="ui primary button" type="submit" onClick={() => this.gotoCaseType(true, null, this.state.Case_Id, null, null, null)}>Continue</button>
                                <button className="ui  button" type="submit" onClick={() => this.navigateToCaseList()}> Cancel</button>
                                <div id="cus_segment" className="ui segment">
                                    <div className="ui form">
                                        <ReactTable
                                            data={dataList.data.searchBillableCaseHours}
                                            columns={[
                                                {
                                                    id: "checkbox",
                                                    Header: "Select",
                                                    accessor: "ISBILLED",
                                                    width: 50,
                                                    Cell: props => (
                                                        <div>
                                                            {props.value === "Y" ? "" : <input type="checkbox"
                                                                className="checkbox"
                                                                onChange={(event) => this.toggleRow(props, event)}
                                                                style={{ marginLeft: 12, marginTop: 5 }} />}
                                                        </div>)
                                                },

                                                {
                                                    Header: "Date",
                                                    accessor: "CDATE",
                                                    width: 85,
                                                    Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                                },
                                                {
                                                    Header: "User",
                                                    accessor: "CLIENTNAME",
                                                    width: 300,
                                                },
                                                {
                                                    Header: "Work Category",
                                                    accessor: "CATDESC",
                                                    width: 300,
                                                },
                                                {
                                                    Header: "Hours",
                                                    accessor: "WORKHOURS",
                                                    width: 50,
                                                },
                                                {
                                                    Header: "Rate",
                                                    accessor: "RATE",
                                                    width: 50,
                                                },
                                                {
                                                    Header: "Is Billed",
                                                    accessor: "ISBILLED",
                                                    width: 80,

                                                },
                                                {
                                                    Header: 'Mark As Billed',
                                                    accessor: 'dataList',

                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4,
                                                        width: 30,
                                                    },
                                                    Cell: (row) => (
                                                        <div style={{ textAlign: "center" }}>
                                                            {row.original.ISBILLED === "Y" ? "" : <div id="griddeletebutton" className="ui  button" tabIndex="0"
                                                                onClick={() => this.markAsBilled(row.original)} >
                                                                <i id="gridicon" className="share icon"></i>
                                                            </div>}
                                                        </div>)
                                                },
                                            ]}
                                            defaultPageSize={dataList.data.searchBillableCaseHours.length}
                                            className="-highlight"
                                            showPagination={false}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="one wide computer one wide tablet one wide mobile row">
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

            )
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