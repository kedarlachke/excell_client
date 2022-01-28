import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { execGql } from "../apolloClient/apolloClient";
import { SearchUserQuery, UsersCRUDOpsQuery } from '../Queries/queries';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {exportToExcel} from '../commonfunctions/commonfunctions'

export default class User_Main extends Component {
    constructor() {
        super();
        this.state = {
            dataList: '',
            userID: '',
            phone: '',
            email: '',
            rowUserID: '',
            showModal: 'none',
            showSearchComp: false
        };
    }

    componentDidMount() {
        this.searchUser()
    };

    /*-----------------------search users --------------------*/
    async searchUser() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', SearchUserQuery, this.setSearchParams())
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

    /*-----------------------to set SearchUserQuery variables --------------------*/
    setSearchParams() {
        var parameterValue = {
            "CLNT": "1002",
            "LANG": "EN",
            "USRID": "%" + this.state.userID + "%",
            "UMAIL": "%" + this.state.email + "%",
            "CELLNO": "%" + this.state.phone + "%",
            "exactMatch": true
        }
        return parameterValue;
    }

    /*-----------------------clear search form fields --------------------*/
    async clearscreen() {
        await this.setState({
            userID: '',
            phone: '',
            email: '',
        })
        this.searchUser()
    }

    /*----------------------delete user--------------------*/
    async deleteUser() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('mutation', UsersCRUDOpsQuery, this.setDeleteParams())
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
            this.searchUser()
        }
    }

    /*----------------------set delete UsersCRUDOpsQuery variables--------------------*/
    setDeleteParams() {
        var parameters = {
            "transaction": "LOGICAL_DELETE",
            "users": [{
                "CLNT": "1002",
                "LANG": "EN",
                "USRID": this.state.rowUserID
            }]
        }
        return parameters
    }

    //..............Date Formate Convertion..........
    formatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)

        var date_format = month + '/' + day + '/' + year
        return date_format
    }

    /*-----------------------populates the list on enter keypress  --------------------*/
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchUser()
        }
    }

/*-----------------------download user excel report--------------------*/
exportUserExcel() {
    let ParamArray= ["1002",
     "EN",
      "%" + this.state.userID + "%",
      "%%",//username
      "%" + this.state.email + "%",
      "%" + this.state.phone + "%",
    ]

    var parameters = {
        "ReportType": ["USERS"],
        "ParamArray":[ParamArray],
        "ReportName": "UserList"
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
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                <h1 id="title_header"> Users</h1>

                                <div className="icode" id="title_header">

                                    <Link to={"/adduser"} style={{ color: '#151515' }}>  <i id="iconbar" className="plus icon"></i></Link>
                                    <a href={this.exportUserExcel()} style={{ color: '#151515' }}> <i id="iconbar" className="arrow down icon"></i></a>
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
                                                            <label > User Id </label>
                                                            <input type="text" name="uID" placeholder="User Id" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.userID} onChange={e => this.setState({ userID: e.target.value })} />
                                                        </div>

                                                    </div>
                                                    <div className=" five wide column">
                                                        <div className="field">
                                                            <label > Email</label>
                                                            <input type="text" name="email" placeholder="Email" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className=" five wide column">
                                                        <div className="field">
                                                            <label > Phone</label>
                                                            <input type="text" name="phone" placeholder="Phone" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="five wide column">
                                                        <button className="ui primary button" type="submit" onClick={() => this.searchUser()}>Search</button>
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
                                        {/* <ContactList data={this.state.dataList} function={this.searchContact()}/> */}
                                        <ReactTable
                                            data={this.state.dataList.data.searchUsers}
                                            columns={[

                                                {
                                                    Header: "Sr.No.",
                                                    // accessor: "DISNAME",
                                                    width: 50,
                                                    Cell: props => <span>{props.index + 1}</span>
                                                },
                                                {
                                                    Header: "First Name",
                                                    accessor: "FNAME",


                                                },
                                                {
                                                    Header: "Last Name",
                                                    accessor: "LNAME",
                                                },
                                                {
                                                    Header: "User Id",
                                                    accessor: "USRID",
                                                },
                                                {
                                                    Header: "Email",
                                                    accessor: "UMAIL",
                                                },
                                                {
                                                    Header: "Mobile",
                                                    accessor: "CELLNO",
                                                },

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
                                                            {/*----button Edit---------- */}

                                                            <Link to={{ pathname: "/edituser", state: { data: row.original } }} >  <div id="gridbutton" className="ui blue button" tabIndex="0" >
                                                                <i id="gridicon" className="edit icon"></i>
                                                            </div>
                                                            </Link>
                                                            {/* ----Delete Edit---------- */}
                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', rowUserID: row.original.USRID })}>
                                                                <i id="gridicon" className="alternate trash icon"></i>
                                                            </div>
                                                        </div>)
                                                },
                                            ]}
                                            defaultPageSize={10}
                                            className="-highlight"

                                        />

                                        {/* -- The Modal(popup) on delete btn -- */}
                                        <div className="modal" style={{ display: this.state.showModal }} >
                                            <div className="modal-content">

                                                <div className="ui icon header " style={{ color: "white", textAlign: "Center" }}>
                                                    <i className="archive icon"></i>
                                                    Delete User
                                               </div>
                                                {/* <span className="close" onClick={() => this.setState({ showModal: 'none' })}>&times;</span> */}

                                                <p style={{ color: "white" }}> 	Are you sure you want to delete this User ?</p>
                                                <div style={{ textAlign: "right" }}>
                                                    <div className="ui red basic cancel inverted button" onClick={() => this.setState({ showModal: 'none', })} >
                                                        <i className="remove icon"></i>
                                                        No
                                                   </div>
                                                    <div className="ui green ok inverted button" onClick={() => this.deleteUser()} >
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
            )
        }
    }
}