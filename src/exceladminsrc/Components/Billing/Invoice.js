import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router-dom";
import { execGql } from "../apolloClient/apolloClient";
import { searchInvoicesQuery, InvoicesCRUDOpsQuery, StatusPayModeDDLQuery, UpdateInvoiceStatusQuery } from "../Queries/queries";
import { cloneDeep } from 'lodash';
import InvoiceReminders from '../InvoiceReminders/invoiceReminders'
import { downloadReport, exportToExcel } from '../commonfunctions/commonfunctions'
import CaseInvoice from '../Cases/CaseAddInvoice'
export default class Invoice extends Component {
    constructor() {
        super();
        this.state = {
            DOCID: '',
            clntid: '',
            dataList: '',
            invno: '',
            Case_Id: "",
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
            isMailButton: false, //.......for check Reminder Or Mail
            showTaskPopup:'none'
        };
        //...bind Changing Parents State from Child Class using props..
        this.closeReminder = this.closeReminder.bind(this);
        this.showMsg = this.showMsg.bind(this);
        this.downloadInvoicePDF = this.downloadInvoicePDF.bind(this);
        this.closeTaskPopup=this.closeTaskPopup.bind(this)

    }

    closeTaskPopup() {
        this.setState({ showTaskPopup: "none" })
    }
    async  componentDidMount() {
       
        if (this.props.Case_Id) {
            await this.setState({ Case_Id: this.props.Case_Id, clntid: this.props.CLIENTID })
        }
        this.searchInvoice()
        this.populateStatusDDL()
    };

    async searchInvoice() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            console.log(this.setSearchParams());

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

    async clearscreen() {
        await this.setState({
            InvStatus: '',
            invno: '',
            customer: '',
            company: '',
            fromDT: '2017-04-07',
            toDT: this.getformatDate(new Date().toLocaleDateString()),
        })
        this.searchInvoice()
    }
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchInvoice()
        }
    }

    //-------------------function for deleting invoice-------------------
    async deleteInvoice() {
        var result = '', errorMessage = '', errors = [];
        try {
            //   console.log('result1');
            result = await execGql('mutation', InvoicesCRUDOpsQuery, this.setDeleteParams())

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
            this.setState({ showModal: 'none', })
            this.searchInvoice()
        }

    }
    setDeleteParams() {
        var parameters = {
            "transaction": "LOGICAL_DELETE",
            "invoices": [
                {
                    "DocHeader": {
                        "CLNT": "1002",
                        "LANG": "EN",
                        "DOCID": this.state.DOCID
                    },

                }
            ]
        }
        return parameters
    }

    async  handleStatusChange(e, cellInfo) {
        try {
            const dataList = cloneDeep([...this.state.dataList]);
            dataList[cellInfo.index][cellInfo.column.id] = e.target.value;
            await this.setState({ dataList });
        } catch (error) {
            console.log(error);

        }

    }

    onUpdateSatus(row) {
        if (row.STATUS == "CMPL")
            this.setState({ showUpdatePayByComp: 'flex', rowData: row });
        else
            this.updateInvoiceStatus(row.DOCID, row.STATUS, row.PAYMENTBY)

    }

    async  updateInvoiceStatus(DOCID, STATUS, PAYMENTBY) {
        var result = '', errorMessage = '', errors = [];
        if (this.state.popupPayByValue == "" && STATUS == "CMPL") {
            this.setState({ errorPopupPayByValue: 'Please select at least one option' });
        }
        else {
            try {
                this.setState({ dataList: '' });
                result = await execGql('mutation', UpdateInvoiceStatusQuery, this.setUpdateStatusParams(DOCID, STATUS, PAYMENTBY))
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
                this.setState({ showUpdatePayByComp: 'none', popupPayByValue: '', errorPopupPayByValue: '', rowData: '' });

                await this.searchInvoice()
                this.props.Case_Id ? this.props.showMsg("Status Updated successfully..", false) : this.showMsg("Status Updated successfully..");

            }
        }

    }

    setUpdateStatusParams(docid, status, paymentby) {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "DOCID": docid,
            "STATUS": status,
            "PAYMENTBY": paymentby
        }
        return parameters
    }

    //............for show save successfully msg..........
    async showMsg(text) {
        await this.setState({ showMsgText: text })
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }


    //............close Reminder popup..........
    //...Changing Parents State from Child Class using props..
    async closeReminder() {
        await this.setState({ showReminder: "none", disableReminderComp: false })

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


    /*-----------------------download invoice excel report--------------------*/
    exportInvoiceExcel() {
        var CaseId = this.props.Case_Id ? this.props.Case_Id : ""
        let ParamArray = ["1002",
            "EN",
            "INV",//doctype
            "%" + this.state.invno + "%",
            "%" + this.state.customer + "%",
            "%" + this.state.company + "%",
            "%" + CaseId + "%",//for caseID
            this.setformatDate(this.state.fromDT),
            this.setformatDate(this.state.toDT)
        ]

        var parameters = {
            "ReportType": ["INVOICES"],
            "ParamArray": [ParamArray],
            "ReportName": "InvoiceList"
        }
        let uri = exportToExcel(parameters);
        return uri;
    }



    render() {
        const { dataList } = this.state
        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className="three column row">

                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <h1 id="leadheader1"></h1>
                                <div className="icode" id="">
                                    {/* <Link to={{ pathname: this.props.Case_Id ? '/addcaseinvoice' : '/addinvoice', state: this.props.Case_Id ? { Case_Id: this.state.Case_Id, Client_Id: this.state.clntid } : null }} style={{ color: '#151515' }}> */}
                                        <i id="iconbar" className="plus icon" onClick={() => this.setState({ showTaskPopup: 'flex',DocId: ""})}></i>
                                    {/* </Link> */}
                                    <a href={this.exportInvoiceExcel()} style={{ color: '#151515' }}> <i id="iconbar" className="arrow down icon"></i></a>
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
                                                            <label >Invoice No</label>
                                                            <input type="text" name="invno" placeholder="Invoice No" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.invno} onChange={e => this.setState({ invno: e.target.value })} />
                                                        </div>

                                                    </div>
                                                    <div className=" five wide column">
                                                        <div className="field">
                                                            <label > Customer</label>
                                                            <input type="text" name="customer" placeholder="Customer" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.customer} onChange={e => this.setState({ customer: e.target.value })} />
                                                        </div>
                                                    </div>

                                                    <div className=" five wide column">
                                                        <div className="field">
                                                            <label > Company</label>
                                                            <input type="text" name="company" placeholder="Company" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.company} onChange={e => this.setState({ company: e.target.value })} />
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
                                                        <button className="ui primary button" type="submit" onClick={() => this.searchInvoice()}>Search</button>
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
                                                    width: 190,
                                                },
                                                {
                                                    Header: "Amount Due",
                                                    accessor: "BAL",
                                                    width: 90,
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
                                                    Cell: props => <select value={props.value} onChange={(e) => this.handleStatusChange(e, props)} >
                                                        {this.state.statusDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                    </select>

                                                },

                                                {
                                                    Header: 'Action',
                                                    accessor: 'dataList',
                                                    width: 300,
                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: row => (
                                                        <div>

                                                            <div id="gridbutton" className="ui blue button" tabIndex="0" onClick={() => this.setState({ DOCID: row.original.DOCID, showReminder: 'flex', disableReminderComp: true, isMailButton: false })}>
                                                                <i id="gridicon" className="clock outline icon"></i>
                                                            </div>

                                                            <div id="griddeletebutton" className="ui blue button" tabIndex="0">
                                                                <i id="gridicon" className="save icon" onClick={() => this.onUpdateSatus(row.original)}></i>
                                                            </div>

                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', DOCID: row.original.DOCID })}>
                                                                <i id="gridicon" className="alternate trash icon"></i>
                                                            </div>

                                                            <div id="griddeletebutton" className="ui blue button" tabIndex="0" onClick={() => this.setState({ DOCID: row.original.DOCID, showReminder: 'none', disableReminderComp: true, isMailButton: true })}>
                                                                <i id="gridicon" className="envelope outline icon"></i>
                                                            </div>

                                                            <Link to={{ pathname: '/viewpdf', state: { data: row.original.DOCID } }}>
                                                                <div id="griddeletebutton" className="ui  button" tabIndex="0">
                                                                    <i id="gridicon" className="eye icon"></i>
                                                                </div>
                                                            </Link>
                                                            {/*----button Download---------- */}
                                                            <a href={this.downloadInvoicePDF(row.original.DOCID)}>
                                                                <div id="griddeletebutton" className="ui  button" tabIndex="0" >
                                                                    <i id="gridicon" className="download icon"></i>
                                                                </div></a>
                                                            {/*----button Edit---------- */}
                                                            {/* <Link to={{ pathname: this.props.Case_Id ? '/addcaseinvoice' : '/addinvoice', state: this.props.Case_Id ? { DocId: row.original.DOCID, Case_Id: this.state.Case_Id } : { data: row.original.DOCID } }}> */}
                                                                <div id="gridbutton" className="ui blue button" tabIndex="0" 
                                                                onClick={() => this.setState({ showTaskPopup: 'flex',DocId: row.original.DOCID})}>
                                                                    <i id="gridicon" className="edit icon"></i>
                                                                </div>
                                                            {/* </Link > */}
                                                        </div>)
                                                },
                                            ]}
                                            defaultPageSize={10}
                                            className="-highlight"
                                            SubComponent={row => {

                                                const rowData = row.original;

                                                return (
                                                    <div style={{ padding: "10px" }}>
                                                        <div className="ui list">
                                                            <div className="item" style={{ marginLeft: 5 }}>
                                                                <div style={{ paddingTop: 5 }}> <strong >Company:</strong>  <span>{rowData.CMPNNM}</span> </div>
                                                                <div style={{ paddingTop: 5 }}> <strong>Header :</strong>  <span>{rowData.DOCHDR}</span>  </div>
                                                                <div style={{ paddingTop: 5 }}  >   <strong>Remarks :</strong>  <span>{rowData.RMKS}</span>   </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                );
                                            }}
                                        />
                                        {/* -- The Delete Modal -- */}
                                        <div className="modal" style={{ display: this.state.showModal }} >
                                            <div className="modal-content">

                                                <div className="ui icon header " style={{ color: "white", textAlign: "Center" }}>
                                                    <i className="archive icon"></i>
                                                    Delete Invoice
                                                 </div>
                                                {/* <span className="close" onClick={() => this.setState({ showModal: 'none' })}>&times;</span> */}

                                                <p style={{ color: "white" }}> 	Are you sure you want to delete this Invoice ?</p>
                                                <div style={{ textAlign: "right" }}>
                                                    <div className="ui red basic cancel inverted button" onClick={() => this.setState({ showModal: 'none', })} >
                                                        <i className="remove icon"></i>
                                                        No
                                                  </div>
                                                    <div className="ui green ok inverted button" onClick={() => this.deleteInvoice()} >
                                                        <i className="checkmark icon"></i>
                                                        Yes
                                                </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* -- The Payment method Modal -- */}
                                        <div className="modal" style={{ display: this.state.showUpdatePayByComp }} >
                                            <div className="modal-content">
                                                <div className="ui segment">
                                                    <div className="ui form">
                                                        <div className="ui two column stackable grid">

                                                            <div className="row">
                                                                <div className="five wide column">
                                                                    <div className="field">
                                                                        <label style={{ color: this.state.errorPopupPayByValue ? 'brown' : null, textAlign: 'left' }} >Payment By</label>
                                                                        <select value={this.state.popupPayByValue} onChange={(e) => this.setState({ popupPayByValue: e.target.value })}
                                                                            style={{ borderColor: this.state.errorPopupPayByValue ? 'brown' : null, backgroundColor: this.state.errorPopupPayByValue ? '#f3ece7' : null }} >
                                                                            <option value="">Select</option>
                                                                            {this.state.payModeDDL.map((data, index) => <option key={index} value={data.DESC}>{data.DESC}</option>)}
                                                                        </select>
                                                                    </div>
                                                                    <div className="field" style={{ textAlign: 'left' }}>
                                                                        <span id="errorspan">{this.state.errorPopupPayByValue}</span>
                                                                    </div>
                                                                </div>

                                                                <div className="five wide column" style={{ marginTop: 13 }}>
                                                                    <button className="ui primary button" type="submit" onClick={() => this.updateInvoiceStatus(this.state.rowData.DOCID, this.state.rowData.STATUS, this.state.popupPayByValue)}>Save</button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* -- popup after changing status-- */}
                                        {this.props.Case_Id ? null : <div id="snackbar">  <i className="info circle icon"></i>{this.state.showMsgText}</div>}
                                        {/* -- The Send Mail Modal -- */}
                                        <div className="modal" style={{ display: this.state.showReminder }} >
                                            <div className="modal-content">
                                                {this.state.disableReminderComp ? <InvoiceReminders docid={this.state.DOCID} 
                                                isMailButton={this.state.isMailButton} 
                                                closeReminder={this.closeReminder} 
                                                showMsg={this.props.Case_Id ? this.props.showMsg : this.showMsg} 
                                                caseid={this.props.Case_Id} /> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal" style={{ display: this.state.showTaskPopup}} >
                                <div className="modal-content">
                            {this.state.showTaskPopup==='none'?null:<CaseInvoice Case_Id={this.state.Case_Id} Client_Id={this.state.clntid} closeTaskPopup={this.closeTaskPopup} DocId={this.state.DocId}/>}
                                    {/* {this.state.showTaskPopup==='none'?null:<Task_Add taskofid={this.props.location.state.data.CIDSYS} taskof={"Case"}
                                    //FULLNM={this.props.location.state.data.FULLNM} 
                                    //MailFrom={this.props.location.state.data.EMAILID} 
                                closeTaskPopup={this.closeTaskPopup} showMsg={this.showMsg} TaskType={"AssignedTask"}/> }   */}
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