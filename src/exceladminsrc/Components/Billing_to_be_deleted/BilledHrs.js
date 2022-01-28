import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router-dom";
import { execGql,pCLNT,pLANG } from "../apolloClient/apolloClient";
import { searchBilledHoursHeaderQuery } from "../Queries/queries";
export default class BillableHrs extends Component {
    constructor() {
        super();
        this.state = {
            dataList: '',

        };

    }
    componentDidMount() {
        this.populateList()
    }
    async populateList() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', searchBilledHoursHeaderQuery, this.setSearchParams())
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
                                <h1 id="">BILLED HOURS</h1>

                                <div className="icode" id="">
                                    <i id="iconbar" className="arrow down icon"></i>
                                </div>

                            </div>

                        </div>
                        <div className="three column row">
                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <div id="cus_segment" className="ui segment">
                                    <div className="ui form">
                                        <ReactTable
                                            data={dataList.data.searchBilledHoursHeader}
                                            columns={[
                                                {
                                                    Header: <div><input type="checkbox" /><label>Select All</label></div>,
                                                    accessor: 'dataList',
                                                    width: 85,
                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: row => (
                                                        <div>
                                                            <input type="checkbox" />
                                                            {/* ----button Edit---------- */}
                                                            {/* <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CID: row.original.CID })}>
                                            <i id="gridicon" className="alternate trash icon"></i>
                                        </div> */}
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
                                                    Header: "Billable Hours",
                                                    accessor: "CLNTBILLABLEHW",
                                                    width: 100,
                                                },
                                                {
                                                    Header: "Billed Hours",
                                                    accessor: "CLNTHW",
                                                    width: 100,
                                                }


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