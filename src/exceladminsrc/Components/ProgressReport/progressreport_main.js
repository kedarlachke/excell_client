import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { searchProgressReports, DeleteProgressReport, DownloadReport } from "../Queries/queries";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { downloadReport, exportToExcel } from '../commonfunctions/commonfunctions'
import Progressreport_add from './progressreport_add'
const PORT = process.env.APIPORT;
export default class ProgressReport_Main extends Component {
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
            showSearchForm: false,
            dispMode: "DISPLAY"
        }

        this.renderAddComponent = this.renderAddComponent.bind(this);
        this.setDisplayMode = this.setDisplayMode.bind(this);
    };

    async componentDidMount() {
        console.log("this.props");
        console.log(this.props);
        console.log("this.props");
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
            console.log(result.data.searchProgressReports.length != 0);
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
        let url =`${process.env.API_SERVER}`;
        url=url+'/download?documentType=PRGRPTDOCS&documentID=' + id + ''
        return url;
        //return 'http://81.4.102.11:80/excellinv/download?documentType=PRGRPTDOCS&documentID=' + id + ''

    };

    // To Download Zip File
    downloadMedia(Case_Id) {
        console.log(Case_Id);
        let url =`${process.env.API_SERVER}`;
        url=url+'/download?documentType=PRGRPTZIP&documentID=' + Case_Id + ''
        return url;
        //return 'http://81.4.102.11:80/excellinv/download?documentType=PRGRPTZIP&documentID=' + Case_Id + ''
    }

    downloadProgressReport() {
        let paramobj = {
            "CLNT": "1002",
            "LANG": "EN",
            "CIDSYS": this.state.Case_Id
        };

        var parameters = {
            "ReportType": "PROGRESS_REPORT",
            "ParamObj": JSON.stringify(paramobj),
            "ReportName": "ProgressReport"
        }

        let uri = downloadReport(parameters);
        //console.log(uri);

        return uri;
    }

    setDisplayMode(pMode) {
        this.searchProgressReports();
        this.setState({ dispMode: pMode })
        if (pMode == 'DISPLAY') {
            this.setState({ PRGRPTID: '' })
        }

    }

    renderAddComponent() {

        if (this.state.dispMode == "ADD") {
            console.log('in add');
            return <div>
                <Progressreport_add Case_Id={this.state.Case_Id} setDisplayMode={this.setDisplayMode} PRGRPTID={this.state.PRGRPTID} />
            </div>
        }
        else {
            return <div>
            </div>
        }

    };


    /*-----------------------download ProgressReport report--------------------*/
    exportProgressReportExcel() {
        let ParamArray = ["1002",
            "EN",
            "%" + this.state.progressreportID + "%",
            "%" + this.state.user + "%",
            "%" + this.state.detail + "%",
            this.setformatDate(this.state.fromDT),
            this.setformatDate(this.state.toDT),
            this.state.Case_Id
        ]

        var parameters = {
            "ReportType": ["PROGRESS_REPORT"],
            "ParamArray": [ParamArray],
            "ReportName": "ProgressDetails"
        }
        let uri = exportToExcel(parameters);
        return uri;
    }

    // Navigate To Progress Report List
    navigateToProgressRptList() {
        return this.props.history.push('/cases');
    };
    render() {

        const { dataList } = this.state
        if (dataList) {
            return (
                <div>

                    {this.renderAddComponent()}
                    <div className="ui one column grid">
                        <div className="three column row">
                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <h1 id="title_header"></h1>
                                <div className="icode" id="title_header" >
                                    {/* <Link to={{ pathname: '/addprogressreport', state: { Case_Id: this.state.Case_Id } }} style={{ color: '#151515' }}>  <i id="iconbar" className="plus icon"></i></Link> */}
                                    <i id="iconbar" onClick={() => this.setDisplayMode('ADD')} className="plus icon"></i>
                                    <a href={this.exportProgressReportExcel()} style={{ color: '#151515' }}>   <i id="iconbar" className="arrow down icon"></i></a>
                                    <i id="iconbar" className="search icon" onClick={() => this.setState({ showSearchForm: !this.state.showSearchForm })}></i>
                                </div>
                                <div className=" row">
                                    <div className="ten wide column">
                                        <a href={this.downloadMedia(this.state.Case_Id)}> <button className="ui primary button" type="submit" >Download Documents/Media</button></a>
                                        <a href={this.downloadProgressReport()}> <button className="ui primary button" type="submit" >View Progress Report</button></a>
                                        <button className="ui primary button" type="submit" >Continue</button>
                                        <button className="ui button" type="submit" onClick={() => this.navigateToProgressRptList()} >Cancel</button>
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

                                                {
                                                    Header: 'Action',
                                                    accessor: 'dataList',
                                                    width: 130,
                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: row => (
                                                        <div>
                                                            {/*----button Edit---------- */}

                                                            <div id="gridbutton" className="ui blue button" tabIndex="0" >
                                                                <i id="gridicon" className="edit icon" onClick={() => { this.setDisplayMode('ADD'); this.setState({ PRGRPTID: row.original.PRGRPTID }) }}  ></i>
                                                            </div>

                                                            {/* ----Delete button---------- */}
                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', PRGRPTID: row.original.PRGRPTID, PRGWORKID: row.original.PRGWORKID, Case_Id: row.original.CIDSYS })}>
                                                                <i id="gridicon" className="alternate trash icon"></i>
                                                            </div>
                                                            {/* ----Download button---------- */}
                                                            <div id="gridbutton" className="ui blue button" tabIndex="0">
                                                                <a href={this.getUrl(row.original.PRGWORKID)} target="_blank" style={{ color: 'white' }}>
                                                                    <i id="gridicon" className="download icon"></i>
                                                                </a>
                                                            </div>
                                                        </div>)
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