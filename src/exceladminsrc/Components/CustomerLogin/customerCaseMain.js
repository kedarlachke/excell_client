import React, { Component } from 'react';
import { execGql } from "../apolloClient/apolloClient";
import { Link, } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Lead_Mail from '../Leads/Lead_Mail'
import { searchCasesQuery, CasesCRUDOpsQuery } from '../Queries/queries';
import { exportToExcel } from '../commonfunctions/commonfunctions'
export default class Case_Main extends Component {
    constructor() {
        super();
        this.state = {
            dataList: '',
            fname: '',
            lname: '',
            phone: '',
            email: '',
            showModal: 'none',
            showSearchComp: false,
            popupmsg: 'Mail sent Successfully',
            CIDSYS: "",
            SERVICETYP: "",
            MailFrom: "",
            showMailPopup: 'none',

        };
        this.showMsg = this.showMsg.bind(this);
        this.closeMailPopup = this.closeMailPopup.bind(this)

    }

    componentDidMount() {
        console.log('props in Cust main----Start');
        console.log(this.props);
        console.log('props in Cust main----End');
        this.searchCases()
    };

    /*-----------------------to show msg after mail sending--------------------*/
    showMsg() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    // To Display Values in Grid
    async searchCases() {
        var result = '', errorMessage = '', errors = [];
        try {
            console.log('param');
            console.log(this.setSearchParams());
            console.log('param');
            result = await execGql('query', searchCasesQuery, this.setSearchParams())
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
            "FIRSTNM": "%" + this.state.fname + "%",
            "LASTNM": "%" + this.state.lname + "%",
            "EMAILID": "%" + this.props.email + "%",
            "PHONE": "%" + this.state.phone + "%",
            "isAdmin": true
        }
        return parameters

    }

    // To Delete Case
    async DeleteCases() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('mutation', CasesCRUDOpsQuery, this.setDeleteParams())
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
            this.setState({ showModal: 'none', });
            this.componentDidMount();

        }

    };

    setDeleteParams() {

        var typeofCase = '';
        if (this.state.SERVICETYP === 'Child Custody') {
            typeofCase = "CHILD_CUSTODY";
        }
        else if (this.state.SERVICETYP === 'Process Server') {
            typeofCase = 'PROCESS_SERVER';
        }
        else if (this.state.SERVICETYP === 'Locate People') {
            typeofCase = 'LOCATE_PEOPLE';
        }
        else if (this.state.SERVICETYP === 'Other Cases') {
            typeofCase = 'OTHER_CASE';
        }
        else if (this.state.SERVICETYP === 'Asset Search') {
            typeofCase = 'ASSET_SEARCH';
        }
        else if (this.state.SERVICETYP === 'Infidelity') {
            typeofCase = 'INFIDELITY';
        }
        else if (this.state.SERVICETYP === 'Workers Comp') {
            typeofCase = 'WORKERS_COMP';
        }

        var parameters = {
            "typeofCase": typeofCase,
            "cases": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS": this.state.CIDSYS,
                }
            ],
            "transaction": "LOGICAL_DELETE"
        }
        return parameters

    };

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

    // Clear Search Screen
    async clearscreen() {
        await this.setState({
            fname: '',
            lname: '',
            phone: '',
            email: '',
        })
        this.searchCases()
    };

    // Handle Keypress

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchCases()
        }
    };

    //----------close Mail Popup
    closeMailPopup() {
        this.setState({ showMailPopup: "none" })
    }

    /*-----------------------download lead excel report--------------------*/
    exportCaseExcel() {
        console.log("export ----1");
        let ParamArray = ["1002",
            "EN",
            "%" + this.state.fname + "%",
            "%" + this.state.lname + "%",
            "%" + this.state.email + "%",
            "%" + this.state.phone + "%",
        ]

        var parameters = {
            "ReportType": "ADMIN_CASES",
            "ParamArray": ParamArray,
            "ReportName": "CasesList"
        }
        let uri = exportToExcel(parameters);
        return uri;
    }

    render() {
        const { dataList } = this.state
        if (dataList) {


            console.log('render');
            console.log(dataList.data.searchCases);
            console.log('render end');

            return (
                <div>
                    <div className="ui one column grid">
                        <div className="three column row">
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                <h1 id="title_header"> Cases</h1>
                                <div className="icode1" id="title_header">
                                    <Link to={{ pathname: "/customerdashboard/CustomerCasetabs", state: { isAssignCase: true, CLIENTID: this.props.CLIENTID } }}>
                                        <button className="ui red button" type="submit" style={{ borderRadius: 5, background: "#C75757", color: "white" }}> ASSIGN A CASE</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                        </div>
                        <div className="three column row">
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                <div id="" className="ui segment">
                                    <div className="ui form">
                                        <ReactTable
                                            data={dataList.data.searchCases}
                                            columns={[
                                                {
                                                    Header: "Date",
                                                    accessor: "CASEDT",
                                                    width: 200,
                                                    Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                                },
                                                {
                                                    Header: "Case ID",
                                                    accessor: "CIDSYS",
                                                    width: 200,
                                                },
                                                {
                                                    Header: "Service",
                                                    accessor: "SERVICETYP",
                                                    width: 330,
                                                },

                                                {
                                                    Header: "Status",
                                                    accessor: "STATUS",
                                                    width: 350,
                                                },

                                                {
                                                    Header: 'Action',
                                                    accessor: 'dataList',
                                                    width: 66,
                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: row => (
                                                        <div>
                                                          {/*----button View---------- */}
                                                          {row.original.STATUS === "Submitted" ||
                                                          row.original.STATUS === "Contract Pending" ? (
                                                            <Link
                                                              to={{
                                                                pathname: "/customercaseview",
                                                                state: { data: row.original }
                                                              }}
                                                            >
                                                              <div
                                                                id="griddeletebutton"
                                                                className="ui  button"
                                                                tabIndex="0"
                                                              >
                                                                <i id="gridicon" className="eye  icon" />
                                                              </div>
                                                            </Link>
                                                          ) : null}
                            
                                                          {/*----button Edit---------- */}
                                                          {row.original.STATUS === "Submission Pending" ? (
                                                            <Link
                                                              to={{
                                                                pathname:
                                                                  "/customerdashboard/CustomerCasetabs",
                                                                state: { data: row.original }
                                                              }}
                                                            >
                                                              <div
                                                                id="gridbutton"
                                                                className="ui  button"
                                                                tabIndex="0"
                                                              >
                                                                <i id="gridicon" className="edit icon" />
                                                              </div>
                                                            </Link>
                                                          ) : null}
                                                        </div>
                                                      )
                                                },
                                            ]}
                                            defaultPageSize={10}
                                            className="-highlight"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="one wide computer one wide tablet one wide mobile column">
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
                <div className="ui icon header">
                    <div className="ui active loader"></div>
                </div>
            );
        }
    }
}