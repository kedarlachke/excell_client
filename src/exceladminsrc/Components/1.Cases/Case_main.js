import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from "../apolloClient/apolloClient";
import { Link, } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { searchCasesQuery, CasesCRUDOpsQuery } from '../Queries/queries';
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
            CIDSYS: "",
            SERVICETYP: ""

        };

    }

    componentDidMount() {
        this.searchCases()
    };


    // To Display Values in Grid
    async searchCases() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
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
            "EMAILID": "%" + this.state.email + "%",
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
    
    render() {

        const { dataList } = this.state


        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className="three column row">
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                <h1 id="title_header"> Cases</h1>

                                <div className="icode" id="title_header">
                                    <Link to={'/casetype'} style={{ color: '#151515' }}>
                                        <i id="iconbar" className="plus icon"></i>
                                    </Link>
                                    <i id="iconbar" className="arrow down icon"></i>
                                    <i id="iconbar" className="search icon" onClick={() => this.setState({ showSearchComp: !this.state.showSearchComp })}></i>
                                </div>
                                {this.state.showSearchComp ? <div className="field">
                                    <div className="ui segment">
                                        <i id="closeicon" className="window close outline icon" onClick={() => {this.clearscreen(),this.searchCases(),this.setState({ showSearchComp: !this.state.showSearchComp })}}></i>
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
                                                    <div className=" five wide column">
                                                        <div className="field">
                                                            <label > Email</label>
                                                            <input type="text" name="email" placeholder="Email" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label >Phone Number</label>
                                                            <input type="text" name="phno" placeholder="Phone Number" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="five wide column" style={{ marginTop: 13 }}>
                                                        <button className="ui primary button" type="submit" onClick={() => this.searchCases()}>Search</button>
                                                        <button className="ui  button" type="submit" onClick={() => this.clearscreen()} >Clear</button>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div> : null}

                            </div>
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                        </div>
                        <div className="three column row">
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                <div id="cus_segment" className="ui segment">
                                    <div className="ui form">
                                        <ReactTable
                                            data={dataList.data.searchCases}
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
                                                    Header: "Date",
                                                    accessor: "CASEDT",
                                                    width: 85,
                                                    Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                                },
                                                {
                                                    Header: "Client Name",
                                                    accessor: "FRSTNM",
                                                },
                                                {
                                                    Header: "Business Name",
                                                    accessor: "OFFICENM",
                                                },
                                                {
                                                    Header: "Case ID",
                                                    accessor: "CIDSYS",
                                                    width: 80,
                                                },
                                                {
                                                    Header: "Service",
                                                    accessor: "SERVICETYP",
                                                    width: 110,
                                                },
                                                {
                                                    Header: "Email",
                                                    accessor: "EMAILID",

                                                },
                                                {
                                                    Header: "Phone",
                                                    accessor: "PHONE",
                                                    width: 95,
                                                },
                                                {
                                                    Header: "Status",
                                                    accessor: "STATUS",
                                                    width: 140,
                                                },

                                                {
                                                    Header: 'Action',
                                                    accessor: 'dataList',
                                                    width: 125,
                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: row => (
                                                        <div>
                                                            <div id="griddeletebutton" className="ui  button" tabIndex="0" >
                                                                <i id="gridicon" className="eye  icon"></i>
                                                            </div>
                                                            {/*----button Edit---------- */}
                                                            <Link to={{ pathname: '/casetype', state: { data: row.original } }}>
                                                                <div id="gridbutton" className="ui  button" tabIndex="0" >
                                                                    <i id="gridicon" className="edit icon"></i>
                                                                </div>
                                                            </Link >
                                                            {/* ----button Delete---------- */}
                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CIDSYS: row.original.CIDSYS, SERVICETYP: row.original.SERVICETYP })}>
                                                                <i id="gridicon" className="alternate trash icon"></i>
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
                                                                <div style={{ float: 'left', paddingTop: 5 }}> <strong >Best Time To Call :</strong>  <span>{rowData.TDESC}</span> </div>
                                                                <div style={{ marginLeft: 330, paddingTop: 5 }}>  <strong >Last Update :</strong>  <span>{this.formatDate(rowData.UDATE)}</span>    </div>
                                                                <div style={{ paddingTop: 5 }}> <strong>Contact Mode :</strong>  <span>{rowData.MODDESC}</span>  </div>
                                                                <div style={{ paddingTop: 5 }}  >   <strong>Address :</strong>  <span>{rowData.ADDRESS}</span>   </div>
                                                                <div style={{ paddingTop: 5 }}  >   <strong>City :</strong>  <span>{rowData.CITY}</span>   </div>
                                                                <div style={{ paddingTop: 5 }}  >   <strong>State :</strong>  <span>{rowData.STDESC}</span>   </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                );
                                            }}
                                        />

                                        {/* -- The Modal -- */}
                                        <div className="modal" style={{ display: this.state.showModal }} >
                                            <div className="modal-content">
                                                <div className="ui icon header " style={{ color: "white", textAlign: "Center" }}>
                                                    <i className="archive icon"></i>
                                                    Delete Case
                                                </div>
                                                {/* <span className="close" onClick={() => this.setState({ showModal: 'none' })}>&times;</span> */}

                                                <p style={{ color: "white" }}> 	Are you sure you want to delete this Lead ?</p>
                                                <div style={{ textAlign: "right" }}>
                                                    <div className="ui red basic cancel inverted button" onClick={() => this.setState({ showModal: 'none', })} >
                                                        <i className="remove icon"></i>
                                                        No
                                                    </div>
                                                    <div className="ui green ok inverted button" onClick={() => this.DeleteCases()} >
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