import React, { Component } from 'react';
import { Link, } from "react-router-dom";
import { execGql,pCLNT,pLANG } from "../apolloClient/apolloClient";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { CustomerCRUDopsQuery, SearchCustomerQuery } from '../Queries/queries';
import {exportToExcel} from '../commonfunctions/commonfunctions'

export default class Customer_Main extends Component {
    constructor() {
        super();
        this.state = {
            dataList: '',
            fname: '',
            lname: '',
            phone: '',
            email: '',
            showModal: 'none',
            showSearchComp: false
        };
    }

    componentDidMount() {
        this.searchCustomer()
    }

    /*----------------------- search customers--------------------*/
    async searchCustomer() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', SearchCustomerQuery, this.setSearchParams())
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

    /*----------------------- sets variables to SearchCustomerQuery --------------------*/
    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "FIRSTNM": "%" + this.state.fname + "%",
            "LASTNM": "%" + this.state.lname + "%",
            "CMAIL": "%" + this.state.email + "%",
            "CELLNO": "%" + this.state.phone + "%",
            "exactMatch": true
        }
        return parameters

    }

    /*----------------------- delete customer --------------------*/
    async DeleteCustomer() {
        var result = '', errorMessage = '', errors = [];
        try {
            //   console.log('result1');
            result = await execGql('mutation', CustomerCRUDopsQuery, this.setDeleteParams())

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
            this.componentDidMount()
        }

    }

    /*-----------------------set variables to delete customer CustomerCRUDopsQuery --------------------*/
    setDeleteParams() {
        var parameters = {
            "transaction": "LOGICAL_DELETE",
            "customers":
                [
                    {
                        "CLNT": "1002",
                        "LANG": "EN",
                        "CCODE": this.state.CCODE
                    }
                ]
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

    /*-----------------------clears the form fields --------------------*/
    async clearscreen() {
        await this.setState({
            fname: '',
            lname: '',
            phone: '',
            email: '',
        })
        this.searchCustomer()
    }

    /*-----------------------populates the customerlist on enter keypress  --------------------*/
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchCustomer()
        }
    }

    /*-----------------------download Customer excel report--------------------*/
    exportCustomerExcel() {
        console.log("export ----1");
        let ParamArray= ["1002",
         "EN",
          "%" + this.state.fname + "%",
          "%" + this.state.lname + "%",
          "%" + this.state.email + "%",
          "%" + this.state.phone + "%",
          ]

        var parameters = {
            "ReportType": "CUSTOMERS",
            "ParamArray":ParamArray,
            "ReportName": "CustomersList"
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
                                <h1 id="title_header"> Customers</h1>

                                <div className="icode" id="title_header">
                                    <Link to={"/addcustomer"} style={{ color: '#151515' }}>  <i id="iconbar" className="plus icon"></i></Link>
                                    <a href={this.exportCustomerExcel()} style={{ color: '#151515' }}>    <i id="iconbar" className="arrow down icon"></i></a>
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
                                                        <button className="ui primary button" type="submit" onClick={() => this.searchCustomer()}>Search</button>
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
                                            data={dataList.data.searchCustomers}
                                            columns={[
                                                {
                                                    Header: "Sr.No.",
                                                    accessor: "DISNAME",
                                                    width: 50,
                                                    Cell: props => <span>{props.index + 1}</span>
                                                },

                                                {
                                                    Header: "First Name",
                                                    accessor: "FIRSTNM",

                                                },
                                                {
                                                    Header: "Last Name",
                                                    accessor: "LASTNM",
                                                },
                                                {
                                                    Header: "Business Name",
                                                    accessor: "OFFICENM",
                                                },
                                                {
                                                    Header: "Email",
                                                    accessor: "CMAIL",
                                                },
                                                {
                                                    Header: "Phone",
                                                    accessor: "PHNO",

                                                },
                                                {
                                                    Header: "City",
                                                    accessor: "CITY",
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
                                                            <Link to={{ pathname: '/addcustomer', state: { data: row.original.CCODE } }}>
                                                                <div id="gridbutton" className="ui blue button" tabIndex="0" >
                                                                    <i id="gridicon" className="edit icon"></i>
                                                                </div>
                                                            </Link >
                                                            {/* ----button Delete---------- */}
                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CCODE: row.original.CCODE })}>
                                                                <i id="gridicon" className="alternate trash icon"></i>
                                                            </div>
                                                        </div>)
                                                },
                                            ]}
                                            defaultPageSize={10}
                                            className="-highlight"

                                        />

                                        {/* -- The Modal(popup) opens onclick of delete btn -- */}
                                        <div className="modal" style={{ display: this.state.showModal }} >
                                            <div className="modal-content">

                                                <div className="ui icon header " style={{ color: "white", textAlign: "Center" }}>
                                                    <i className="archive icon"></i>
                                                    Delete Customer
                                              </div>
                                                {/* <span className="close" onClick={() => this.setState({ showModal: 'none' })}>&times;</span> */}

                                                <p style={{ color: "white" }}> 	Are you sure you want to delete this Customer ?</p>
                                                <div style={{ textAlign: "right" }}>
                                                    <div className="ui red basic cancel inverted button" onClick={() => this.setState({ showModal: 'none', })} >
                                                        <i className="remove icon"></i>
                                                        No
                                                  </div>
                                                    <div className="ui green ok inverted button" onClick={() => this.DeleteCustomer()} >
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