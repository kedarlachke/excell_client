import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router-dom";
import { execGql } from "../apolloClient/apolloClient";
import { searchInvoicesQuery, StatusPayModeDDLQuery } from "../Queries/queries";
// import { cloneDeep } from '../../../node_modules/apollo-utilities';

import { downloadReport } from '../commonfunctions/commonfunctions'
export default class Invoice extends Component {
    constructor() {
        super();
        this.state = {
            DOCID: '',
            dataList: '',
            invno: '',
            customer: '',
            company: '',
            showModal: 'none',
            showUpdatePayByComp: 'none',
            showReminder: 'none',
            fromDT: '2017-04-07',
            toDT: this.getformatDate(new Date().toISOString()),
            statusDDL: [],
            payModeDDL: [],
            popupPayByValue: '',
            rowData: '',
            errorPopupPayByValue: '',
            disableReminderComp: false,
            showMsgText: "",
            isMailButton: false //.......for check Reminder Or Mail
        };

    }
    componentDidMount() {
        this.searchInvoice()
        this.populateStatusDDL()
    }
    async searchInvoice() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', searchInvoicesQuery, this.setSearchParams())
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
            this.setState({ dataList: result.data.searchInvoices })
        }

    }
    setSearchParams() {
        var CaseId = this.props.Case_Id ? CaseId = this.props.Case_Id : CaseId = ""
        console.log("CaseId");
        console.log(CaseId);
        console.log("CaseId");
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "DOCTYPE": "INV",
            "CIDSYS": CaseId,
            "DOCFRMDT": this.setformatDate(this.state.fromDT),
            "DOCTODT": this.setformatDate(this.state.toDT),
            "CMPNNM": this.state.company,
            "DOCNO": this.state.invno,
            "CUSTOMER": this.state.customer
        }
        return parameters

    }

    //...populate Status DDL....................
    async populateStatusDDL() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', StatusPayModeDDLQuery, this.setStatusDDLParams())
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
            this.setState({ statusDDL: result.data.TASKINV_STATUS, payModeDDL: result.data.PAYMENT_MODE })
        }
    }
    setStatusDDLParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "DOCTYPE": "INVOICE",
        }
        return parameters
    }

    formatDate(date) {
        if (date != null) {
            var year = date.slice(0, 4)
            var month = date.slice(4, 6)
            var day = date.slice(6, 8)
            var date_format = month + '/' + day + '/' + year
            return date_format
        }
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
        // var day = date.slice(0, 2)
        // var month = date.slice(3, 5)
        // var year = date.slice(6, 10)

        // var date_format = year + "-" + day + "-" + month
        var date_format = date.slice(0, 10)
        return date_format
    }

    //..................Download PDF......................
    downloadInvoicePDF(docid) {
        let paramobj = {
            "CLNT": "1002",
            "LANG": "EN",
            "DOCID": docid
        };
        var parameters = {
            "ReportType": "INVOICE",
            "ParamObj": JSON.stringify(paramobj),
            "ReportName": "Invoice"
        }
        let uri = downloadReport(parameters);

        //console.log(uri);
        return uri;
    };


    render() {
        const { dataList } = this.state
        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">

                        <div className="three column row">

                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <div id="cus_segment" className="ui segment">
                                    <div className="ui form">
                                        <ReactTable
                                            data={dataList}
                                            columns={[
                                                {
                                                    expander: true,
                                                    Header: () => '',


                                                    Expander: ({ isExpanded, ...rest }) =>
                                                        <div>
                                                            {isExpanded
                                                                ? <span>&#x2296;</span>
                                                                : <span>&#x2295;</span>}
                                                        </div>,
                                                    style: {
                                                        cursor: "pointer",
                                                        fontSize: 12,
                                                        //  padding: "0",
                                                        textAlign: "center",
                                                        userSelect: "none"
                                                    }
                                                },

                                                {
                                                    Header: "Invoice No.",
                                                    accessor: "DOCNO",
                                                    width: 85

                                                },

                                                {
                                                    Header: "Invoice Date",
                                                    accessor: "INVDT",
                                                    width: 90,
                                                    Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                                },
                                                {
                                                    Header: "Due Date",
                                                    accessor: "DUEDT",
                                                    width: 85,
                                                    Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                                },
                                                {
                                                    Header: "Customer",
                                                    accessor: "CUSTOMER",

                                                },
                                                {
                                                    Header: "Amount Due",
                                                    accessor: "BAL",
                                                    width: 100,
                                                },
                                                {
                                                    Header: "Total Amount",
                                                    accessor: "TOT",
                                                    width: 95,

                                                },
                                                {
                                                    Header: "Payment By",
                                                    accessor: "PAYMENTBY",
                                                    width: 95,
                                                },
                                                {
                                                    Header: "Status",
                                                    accessor: "STATUS",
                                                    width: 120,
                                                },

                                                {
                                                    Header: 'Action',
                                                    accessor: 'dataList',
                                                    width: 100,
                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: row => (
                                                        <div>
                                                            <Link to={{ pathname: '/viewpdf', state: { data: row.original.DOCID } }}>
                                                                <div id="griddeletebutton" className="ui  button" tabIndex="0">
                                                                    <i id="gridicon" className="eye icon"></i>
                                                                </div>
                                                            </Link>
                                                            <a href={this.downloadInvoicePDF(row.original.DOCID)}>
                                                                <div id="griddeletebutton" className="ui  button" tabIndex="0" >
                                                                    <i id="gridicon" className="download icon"></i>
                                                                </div>
                                                            </a>
                                                        </div>)
                                                },
                                            ]}
                                            defaultPageSize={10}
                                            className="-highlight"
                                        // SubComponent={row => {

                                        //     const rowData = row.original;

                                        //     return (
                                        //         <div style={{ padding: "10px" }}>
                                        //             <div className="ui list">
                                        //                 <div className="item" style={{ marginLeft: 5 }}>
                                        //                     <div style={{ paddingTop: 5 }}> <strong >Company:</strong>  <span>{rowData.CMPNNM}</span> </div>
                                        //                     <div style={{ paddingTop: 5 }}> <strong>Header :</strong>  <span>{rowData.DOCHDR}</span>  </div>
                                        //                     <div style={{ paddingTop: 5 }}  >   <strong>Remarks :</strong>  <span>{rowData.RMKS}</span>   </div>

                                        //                 </div>
                                        //             </div>

                                        //         </div>
                                        //     );
                                        // }}
                                        />

                                    </div>
                                </div>
                            </div>
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