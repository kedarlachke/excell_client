import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router-dom";
import { execGql,pCLNT,pLANG } from "../apolloClient/apolloClient";
import { searchInvoicesQuery } from "../Queries/queries";
export default class Invoice extends Component {
    constructor() {
        super();
        this.state = {
            dataList: '',
            invno: '',
            customer: '',
            company: '',
            fromDT: '2017-04-07',
            toDT: this.getformatDate(new Date().toISOString()),
        };

    }
    componentDidMount() {
        this.searchInvoice()
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
            this.setState({ dataList: result })


        }

    }
    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "DOCTYPE": "INV",
            "DOCFRMDT": this.setformatDate(this.state.fromDT),
            "DOCTODT": this.setformatDate(this.state.toDT),
            "CMPNNM": this.state.company,
            "DOCNO": this.state.invno,
            "CUSTOMER": this.state.customer
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

    async clearscreen() {
        await this.setState({
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
    render() {
        const { dataList } = this.state
        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className="three column row">

                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <h1 id="">INVOICES</h1>

                                <div className="icode" id="">
                                    <i id="iconbar" className="plus icon"></i>
                                    {/* </Link> */}
                                    <i id="iconbar" className="arrow down icon"></i>
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
                                            data={dataList.data.searchInvoices}
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
                                                    Cell: props => <select  >
                                                        <option value="">{props.value}</option></select>

                                                },

                                                {
                                                    Header: 'Action',
                                                    accessor: 'dataList',

                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: row => (
                                                        <div>
                                                            {/*----button Edit---------- */}
                                                            <div id="gridbutton" className="ui blue button" tabIndex="0" >
                                                                <i id="gridicon" className="clock outline icon"></i>
                                                            </div>
                                                            <div id="griddeletebutton" className="ui blue button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CID: row.original.CID })}>
                                                                <i id="gridicon" className="save icon"></i>
                                                            </div>
                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CID: row.original.CID })}>
                                                                <i id="gridicon" className="alternate trash icon"></i>
                                                            </div>
                                                            <div id="griddeletebutton" className="ui blue button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CID: row.original.CID })}>
                                                                <i id="gridicon" className="envelope outline icon"></i>
                                                            </div>
                                                            <div id="griddeletebutton" className="ui  button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CID: row.original.CID })}>
                                                                <i id="gridicon" className="eye icon"></i>
                                                            </div>
                                                            <div id="griddeletebutton" className="ui  button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CID: row.original.CID })}>
                                                                <i id="gridicon" className="download icon"></i>
                                                            </div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
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