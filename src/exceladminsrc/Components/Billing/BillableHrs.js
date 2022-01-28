import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { execGql } from "../apolloClient/apolloClient";
import {
    searchBillableHoursHeaderQuery, searchBillableHoursDetailsQuery,
    generateInvoiceQuery, UpdateProgressAgainstInvoiceQuery
} from "../Queries/queries";
import { exportToExcel } from '../commonfunctions/commonfunctions'
import { doCalulations } from '../Invoice/SummaryCalculation';


let progressreports = []
export default class BillableHrs extends Component {
    constructor() {
        super();
        this.state = {
            dataList: '',
            billableHrDetailsList: '',
            fname: '',
            lname: '',
            clntID: '',
            fromDT: '2017-04-07',
            toDT: this.getformatDate(new Date().toISOString()),
            showModal: 'none',
            showSearchComp: false,
            selectedList: [],
        };
    }

    componentDidMount() {
        this.searchBillableHrsHeader()
    }

    /*----------------------- search billable header hrs --------------------*/
    async searchBillableHrsHeader() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', searchBillableHoursHeaderQuery, this.setSearchHeaderParams())
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
            console.log('console 1');
            console.log(result);
            console.log('console 2');
            if(result.data.searchBillableHoursHeader)
            {
            this.setState({ dataList: result })
            }    
        }
    }

    
    /*----------------------- set searchBillableHoursHeader Query variables --------------------*/
    setSearchHeaderParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "FROMDATE": this.setformatDate(this.state.fromDT),
            "TODATE": this.setformatDate(this.state.toDT),
            "FIRSTNM": "%" + this.state.fname + "%",
            "LASTNM": "%" + this.state.lname + "%"
        }
        return parameters
    }


    /*----------------------- search billable details hrs --------------------*/
    async searchBillableHrsDetails(clntid) {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', searchBillableHoursDetailsQuery, this.setSearchDetailsParams(clntid))
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
            if (result.data.searchBillableHoursDetails !== null)
                this.setState({ billableHrDetailsList: result })
        }
    }

    /*----------------------- set searchBillableHoursDetails Query variables --------------------*/
    setSearchDetailsParams(clntid) {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "FROMDATE": this.setformatDate(this.state.fromDT),
            "TODATE": this.setformatDate(this.state.toDT),
            "CLNTID": clntid
        }
        return parameters
    }

    //..............Date Formate Convertion..........
    setformatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(5, 7)
        var day = date.slice(8, 10)

        var date_format = year + month + day
        return date_format
    }

    //..............Date Formate Convertion..........
    getformatDate(date) {
        var date_format = date.slice(0, 10)
        return date_format
    }

    /*----------------------- clear search form fields --------------------*/
    async clearscreen() {
        await this.setState({
            fname: '',
            lname: '',
            fromDT: '2017-04-07',
            toDT: this.getformatDate(new Date().toISOString()),
        })
        this.searchBillableHrsHeader()
    }

    /*-----------------------populates the list on enter keypress  --------------------*/
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchBillableHrsHeader()
        }
    }

    async selectBillableHrHeader(clntid) {
        await this.setState({ billableHrDetailsList: '', selectedList: [], })
        this.setState({ clntID: clntid })
        this.searchBillableHrsDetails(clntid)
    }

    /*-----------------------download BillableHr excel report--------------------*/
    exportBillableHrExcel() {
        let ParamArray = ["1002",
            "EN",
            this.state.clntID,
            this.setformatDate(this.state.fromDT),
            this.setformatDate(this.state.toDT)
        ]


        var parameters = {
            "ReportType": ["BILLABLEHRS_HDR", "BILLABLEHRS_DTL"],
            "ParamArray": [ParamArray, ParamArray],
            "ReportName": "BillableHours"
        }
        let uri = exportToExcel(parameters);
        return uri;
    }

    //....................create Invoice............................
    async createInvoice() {
        if (this.state.selectedList.length == 0) {
            this.setState({
                popupmsg: "Please select at least one record."
            })
            this.showMsg()
        }
        else {
            var result = '', errors = [], errorMessage = '';
            try {
                let queryVariables = await this.setCreateInvoiceParams();
                console.log(queryVariables);

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
                   this.updtProgressAgainstInv(result.data.Invoices[0].DocHeader.DOCID)

            }
        }
    };


    //..............set createinvoice params..........
    async setCreateInvoiceParams() {
        const { selectedList } = this.state
        console.log(selectedList);

        let TOTAL = 0, docDetail = [], clntid = '', clientname = '', invoicedate = this.formatSystemDate(),
            progressreportsIsBilled = [], lineitemno = '', caseid = ''

        let isDuplicate = selectedList.every((value, index, array) => Object.entries(value)[0][1]["CIDSYS"] === Object.entries(array[0])[0][1]["CIDSYS"])
        console.log(isDuplicate);
        if (isDuplicate) {

            for (let i = 0; i < selectedList.length; i++) {
                for (let key in selectedList[i]) {

                    console.log(selectedList[i][key]);

                    clntid = selectedList[i][key].CLNTID
                    clientname = selectedList[i][key].CLIENTNAME
                    lineitemno = i.toString()
                    caseid = selectedList[i][key].CIDSYS

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
                        "CIDSYS": caseid,
                        "ISBILLED": "Y"

                    }
                    let progressreportsObj = {
                        "CLNT": "1002",
                        "LANG": "EN",
                        "PRGRPTID": selectedList[i][key].PRGRPTID,
                        "PRGWORKID": selectedList[i][key].PRGWORKID,
                        "DOCID": "",
                        "LINEITEMNO": lineitemno,
                        "CIDSYS": caseid
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
                            "BAL": TOTAL.toString(),
                            "TOT": TOTAL.toString(),
                            "CIDSYS": caseid
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
        else {
            this.setState({
                popupmsg: 'Multiple Cases Selected!'
            })
            this.showMsg()
        }
    }

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
            this.searchBillableHrsHeader()
            this.selectBillableHrHeader(this.state.clntID)
            await this.setState({
                popupmsg: "Invoice created successfully", selectedList: []
            })
            this.showMsg()
        }
    };

    /*-----------------------to show msg popup--------------------*/
    showMsg() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
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
        day = day.length == 1 ? '0' + day : day
        var date_format = year + month + day

        return date_format
    }

    render() {
        const { dataList, billableHrDetailsList } = this.state
        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className="three column row">

                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <h1 id=""> BILLABLE HOURS</h1>

                                <div className="icode" id="">
                                    <a href={this.exportBillableHrExcel()} style={{ color: '#151515' }}> <i id="iconbar" className="arrow down icon"></i></a>
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
                                                            <label >First Name</label>
                                                            <input type="text" name="fname" placeholder="First Name" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.fname} onChange={e => this.setState({ fname: e.target.value })} />
                                                        </div>

                                                    </div>
                                                    <div className=" five wide column">
                                                        <div className="field">
                                                            <label > Last Name</label>
                                                            <input type="text" name="lname" placeholder="Last Name" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.lname} onChange={e => this.setState({ lname: e.target.value })} />
                                                        </div>
                                                    </div>

                                                </div>

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
                                                    <div className="five wide column" style={{ marginTop: 13 }}>
                                                        <button className="ui primary button" type="submit" onClick={() => this.searchBillableHrsHeader()}>Search</button>
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
                                <div id="cus_segment" className="ui segment">
                                    <div className="ui form">
                                        <ReactTable
                                            data={dataList.data.searchBillableHoursHeader}
                                            columns={[
                                                {
                                                    Header: 'Action',
                                                    accessor: 'dataList',
                                                    width: 85,
                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: row => (
                                                        <div>
                                                            {/* ----button Delete---------- */}
                                                            <div id="griddeletebutton" ref={`btn${row.index}`} className="ui primary button" tabIndex="0"
                                                             onClick={() => this.selectBillableHrHeader(row.original.CLNTID)} style={{backgroundColor:this.state.backgroundColor}}>
                                                                Select
                                                            </div>
                                                        </div>)
                                                },
                                                {
                                                    Header: "Client ID",
                                                    accessor: "CLNTID",
                                                    width: 100,

                                                },
                                                {
                                                    Header: "Client Name",
                                                    accessor: "CLIENTNAME",
                                                },
                                                {
                                                    Header: "Hours",
                                                    accessor: "CLNTHW",
                                                    width: 80,
                                                },


                                            ]}
                                            defaultPageSize={5}
                                            className="-highlight"

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {billableHrDetailsList ? <div className="three column row">
                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <button className="ui primary button" type="submit" onClick={() => this.createInvoice()} >Generate Invoice</button>
                                <div id="cus_segment" className="ui segment">
                                    <div className="ui form">
                                        <ReactTable
                                            data={billableHrDetailsList.data.searchBillableHoursDetails}
                                            columns={[
                                                {
                                                    id: "checkbox",
                                                    Header: "Select",
                                                    accessor: "",
                                                    width: 50,
                                                    Cell: props => (
                                                        <div>
                                                            <input type="checkbox"
                                                                className="checkbox"
                                                                onChange={(event) => this.toggleRow(props, event)}
                                                                style={{ marginLeft: 12, marginTop: 5 }} />
                                                        </div>)
                                                },

                                                {
                                                    Header: "Case ID",
                                                    accessor: "CIDSYS",
                                                    width: 75,

                                                },
                                                {
                                                    Header: "Work ID",
                                                    accessor: "PRGWORKID",
                                                    width: 75,
                                                },
                                                {
                                                    Header: "Client Name",
                                                    accessor: "CLIENTNAME",
                                                    width: 190,

                                                },
                                                {
                                                    Header: "Service Type",
                                                    accessor: "SERVICETYP",
                                                    width: 180,

                                                },
                                                {
                                                    Header: "Progress Date",
                                                    accessor: "RPTDATE",
                                                    width: 100,

                                                },
                                                {
                                                    Header: "Progress Details",
                                                    accessor: "RPTTXT",

                                                },
                                                {
                                                    Header: "Work Category",
                                                    accessor: "CATDESC",
                                                    width: 190,

                                                },
                                                {
                                                    Header: "Work Date",
                                                    accessor: "CDATE",
                                                    width: 80,

                                                },
                                                {
                                                    Header: "Hours",
                                                    accessor: "WORKHOURS",
                                                    width: 50,

                                                },
                                                {
                                                    Header: "Rate",
                                                    accessor: "RATE",
                                                    width: 40,

                                                },


                                            ]}
                                            defaultPageSize={billableHrDetailsList.data.searchBillableHoursDetails.length}
                                            className="-highlight"
                                            showPagination={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> : null}

                        {/*msg after mail sending*/}
                        <div id="snackbar">  <i className="info circle icon"></i>{this.state.popupmsg}</div>

                        <div>

                        </div>
                    </div>

                </div>

            )

        }

        else {
            return (
                <div className="ui icon header" style={{ marginTop: 300 }}>
                    <div className="ui active loader"></div>
                </div>
            );
        }
    }
}