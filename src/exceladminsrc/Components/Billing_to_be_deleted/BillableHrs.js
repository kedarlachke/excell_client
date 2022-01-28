import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router-dom";
import { execGql,pCLNT,pLANG } from "../apolloClient/apolloClient";
import { searchBillableHoursQuery } from "../Queries/queries";
export default class BillableHrs extends Component {
    constructor() {
        super();
        this.state = {
            dataList: '',
            fname: '',
            lname: '',
            fromDT: '2017-04-07',
            toDT: this.getformatDate(new Date().toISOString()),
            showModal: 'none',
            showSearchComp: false

        };

    }
    componentDidMount() {
        this.searchBillableHrs()
        console.log(new Date().toISOString())
    }
    async searchBillableHrs() {
        var result = '', errorMessage = '', errors = [];
        try {
            console.log(this.setSearchParams());
            result = await execGql('query', searchBillableHoursQuery, this.setSearchParams())
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
            "FIRSTNM": this.state.fname,
            "LASTNM": this.state.lname
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
        //2018-07-05
        //05/07/2018

        // var day = date.slice(0, 2)
        // var month = date.slice(3, 5)
        // var year = date.slice(6, 10)

        // var date_format = year + "-" + month + "-" + day
        var date_format = date.slice(0, 10)
        return date_format
    }
    async clearscreen() {
        await this.setState({
            fname: '',
            lname: '',
            fromDT: '2017-04-07',
            toDT: this.getformatDate(new Date().toLocaleDateString()),
        })
        this.searchBillableHrs()
    }
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchBillableHrs()
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
                                <h1 id=""> BILLABLE HOURS</h1>

                                <div className="icode" id="">
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
                                                        <button className="ui primary button" type="submit" onClick={() => this.searchBillableHrs()}>Search</button>
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
                                            data={dataList.data.searchBillableHours}
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

                                                            {/* ----button Edit---------- */}
                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CID: row.original.CID })}>
                                                                <i id="gridicon" className="alternate trash icon"></i>
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
                                            defaultPageSize={10}
                                            className="-highlight"

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