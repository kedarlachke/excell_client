import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { searchProgressReports, DeleteProgressReport } from "../Queries/queries";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
export default class Leads_Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            progressreportID: '',
            user: '',
            detail: '',
            Case_Id: "",
            fromDT: '2017-01-01',
            toDT: this.getformatDate(new Date().toISOString()),
            dataList: '',
            showModal: "none",
            PRGRPTID: "",
            PRGWORKID: "",
            showSearchForm: false
        }
    };

    async componentDidMount() {
        // console.log(this.props.history.location.state.data.CIDSYS);
        if (this.props.history.location.state) {
            await this.setState({ Case_Id: this.props.history.location.state.data.CIDSYS })
            this.searchProgressReports()
        }

    };

    //..............search Progress Reports..........
    async searchProgressReports() {
        var result = '', errorMessage = '', errors = [];
        try {
            console.log(this.setSearchParams());
            result = await execGql('query', searchProgressReports, this.setSearchParams())
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
            this.setState({
                dataList: result
            })
        }
    }

    //..............sets searchProgressquery variables..........
    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "FRMDATE": this.setformatDate(this.state.fromDT),
            "TODATE": this.setformatDate(this.state.toDT),
            "CIDSYS": this.state.Case_Id,
            "CUSER": "%" + this.state.user + "%",
            "PRGRPTID": "%" + this.state.progressreportID + "%",
            "RPTTXT": "%" + this.state.detail + "%"
        }
        return parameters
    }


    // To Delete Progress Report


    async deleteProgressRept() {

        var result = '', errorMessage = '', errors = [];
        try {
            console.log(this.setDeleteParams());
            result = await execGql('mutation', DeleteProgressReport, this.setDeleteParams())

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
            this.searchProgressReports();
        }

    }


    setDeleteParams() {
        var parameters = {
            "transaction": "LOGICAL_DELETE",
            "progressreport": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS": this.state.Case_Id,
                    "PRGRPTID": this.state.PRGRPTID,
                    "PRGWORKID": this.state.PRGWORKID

                }
            ]
        }
        return parameters

    }

    //..............clears the form fields..........
    async  clearscreen() {
        await this.setState({
            progressreportID: '',
            user: '',
            detail: ''
        });

        this.searchProgressReports();
    }

    //..............Date Formate Convertion to show date in progress list..........
    formatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)

        var date_format = month + '/' + day + '/' + year
        return date_format
    }

    setformatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(5, 7)
        var day = date.slice(8, 10)

        var date_format = year + month + day
        return date_format
    }

    //..............Date Formate Convertion to set date in TODate input field ..........
    getformatDate(date) {
        var date_format = date.slice(0, 10)
        return date_format
    }

    //..............to perform search when enter key is pressed in input field..........
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchProgressReports()
        }
    }

    // To Dwonload Single File 
    getUrl(id) {

        return process.env.API_SERVER + '/download?documentType=PRGRPTDOCS&documentID=' + id + ''

    };

    // To Download Zip File
    downloadMedia(Case_Id) {
        console.log(Case_Id);

        return process.env.API_SERVER + '/download?documentType=PRGRPTZIP&documentID=' + Case_Id + ''
    }



    // To View Progress Report
    async ViewProgressReport() {
        try {
            console.log(this.ViewReportvariables() || {});
            const url = process.env.GENERATE_PDF;
            let response = await fetch(url, {
                method: 'POST',
                headers: { Accept: '*/*', 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
                body: JSON.stringify(this.ViewReportvariables() || {})
            }).then(res => res.json());

            console.log(response);

        }
        catch (err) {
            console.log(err);
        }

    };

    ViewReportvariables() {
        var parameters = {
            "name": "ProgressReportNewExcellInv",
            "connection": "mytestdatabase",
            "parameters": {
                "CIDSYS": this.state.Case_Id,
                "CLNT": "1002",
                "LANG": "EN"
            }
        }
        return parameters
    }

    render() {
        const { dataList } = this.state
        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className="three column row">
                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <div className=" row">
                                    <div className="ten wide column">
                                        <a href={this.downloadMedia(this.state.Case_Id)}> <button className="ui primary button" type="submit" >Download Documents/Media</button></a>
                                        <button className="ui primary button" type="submit" onClick={() => this.ViewProgressReport()}>View Progress Report</button>
                                        <button className="ui primary button" type="submit">Continue</button>
                                        <button className="ui button" type="submit"  >Cancel</button>
                                    </div>
                                </div>
                                {this.state.showSearchForm ? <div className="field">
                                    <div className="ui segment">
                                        <i id="closeicon" className="window close outline icon" onClick={() => this.setState({ showSearchForm: !this.state.showSearchForm })}></i>
                                        <div className="ui form">
                                            <div className="ui three column stackable grid">

                                                <div className="row">
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label > Progress Report ID</label>
                                                            <input type="text" name="progressreportID" placeholder=" Progress Report ID" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.progressreportID} onChange={e => this.setState({ progressreportID: e.target.value })} />
                                                        </div>

                                                    </div>
                                                    <div className=" five wide column">
                                                        <div className="field">
                                                            <label>User</label>
                                                            <input type="text" name="user" placeholder="User" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.user} onChange={e => this.setState({ user: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label >Detail</label>
                                                            <input type="text" name="detail" placeholder="Detail" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.detail} onChange={e => this.setState({ detail: e.target.value })} />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label >From Date</label>
                                                            <input type="date" name="fromDT" placeholder="From Date" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.fromDT} onChange={e => this.setState({ fromDT: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label >To Date</label>
                                                            <input type="date" name="toDT" placeholder="To Date" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.toDT} onChange={e => this.setState({ toDT: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="ten wide column">
                                                        <button className="ui primary button" type="submit" onClick={() => this.searchProgressReports()}>Search</button>
                                                        <button className="ui  button" type="submit" onClick={() => { this.setState({ showSearchForm: !this.state.showSearchForm }), this.clearscreen() }}>Clear</button>
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
                                            data={dataList.data.searchProgressReports}
                                            columns={[
                                                {
                                                    Header: "Date",
                                                    accessor: "CDATE",
                                                    width: 85,
                                                    Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                                },
                                                {
                                                    Header: "Document Detail",
                                                    accessor: "RPTTXT",
                                                },

                                            ]}
                                            defaultPageSize={10}
                                            className="-highlight"

                                        />

                                        {/* --------- ----- The Modal -popup on delete button ------------ */}
                                        <div className="modal" style={{ display: this.state.showModal }} >
                                            <div className="modal-content">

                                                <div className="ui icon header " style={{ color: "white", textAlign: "Center" }}>
                                                    <i className="archive icon"></i>
                                                    Delete Progress Repoprt
                                               </div>
                                                {/* <span className="close" onClick={() => this.setState({ showModal: 'none' })}>&times;</span> */}

                                                <p style={{ color: "white" }}> 	Are you sure you want to delete this Progress Repoprt?</p>
                                                <div style={{ textAlign: "right" }}>
                                                    <div className="ui red basic cancel inverted button" onClick={() => this.setState({ showModal: 'none', })} >
                                                        <i className="remove icon"></i>
                                                        No
                                                 </div>
                                                    <div className="ui green ok inverted button" onClick={() => this.deleteProgressRept()} >
                                                        <i className="checkmark icon"></i>
                                                        Yes
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile row">
                        </div>
                    </div>

                </div>

            )
        }
        else {
            return (
                <div className="ui icon header" style={{ marginTop: 400 }}>
                    <div className="ui active loader"></div>
                </div>
            );
        }
    }
}