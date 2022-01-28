import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { execGql,pCLNT,pLANG } from "../apolloClient/apolloClient";
import { SearchContactQuery } from '../Queries/queries';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { ContactsCRUDOpsQuery } from '../Queries/queries';
import {exportToExcel} from '../commonfunctions/commonfunctions'

export default class Contact_Main extends Component {
    constructor() {
        super();
        this.state = {
            dataList: '',
            name: '',
            businessname: '',
            phone: '',
            email: '',
            showModal: 'none',
            showSearchComp: false
        };
    }

    componentDidMount() {
        this.searchContact()
    };

/*-----------------------search contacts --------------------*/
    async searchContact() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', SearchContactQuery, this.setSearchParams())
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

    /*----------------------- sets variables to SearchContactQuery --------------------*/
    setSearchParams() {
        var parameterValue = {
            "CLNT": "1002",
            "LANG": "EN",
            "DISNAME": "%" + this.state.name + "%",
            "COMPANY": "%" + this.state.businessname + "%",
            "PHONE": "%" + this.state.phone + "%",
            "EMAILID": "%" + this.state.email + "%",
            exactMatch: true
        }
        return parameterValue;
    }

    /*----------------------- clears the search form fields   --------------------*/
    async clearscreen() {
        await this.setState({
            name: '',
            businessname: '',
            phone: '',
            email: ''
        })
        this.searchContact()
    }

/*----------------------- delete contact  --------------------*/
    async deleteContact() {
        var result = '', errorMessage = '', errors = [];
        try {
            //   console.log('result1');
            result = await execGql('mutation', ContactsCRUDOpsQuery, this.setDeleteParams())

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
            this.searchContact()
        }

    }

 /*----------------------- sets variables to delete contact  ContactsCRUDOpsQuery  --------------------*/
    setDeleteParams() {
        var parameters = {
            "contacts": [{
                "CLNT": "1002",
                "LANG": "EN",
                "CONTACTID": this.state.CID,
                "EMAILID": this.state.EMAILID
            }],
            "transaction": "PHYSICAL_DELETE"
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

     /*-----------------------populates the contactlist on enter keypress  --------------------*/
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchContact()
        }
    }

  /*-----------------------download lead excel report--------------------*/
  exportContactExcel() {
    console.log("export ----1");
    let ParamArray= ["1002", "EN", "%" + this.state.name + "%","%" + this.state.businessname + "%","%" + this.state.phone + "%","%" + this.state.email + "%",]

    var parameters = {
        "ReportType": ["CONTACTS"],
        "ParamArray":[ParamArray],
        "ReportName": "ContactsList"
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
                                <h1 id="title_header"> Contacts</h1>

                                <div className="icode" id="title_header">

                                    <Link to={'/addcontact'} style={{ color: '#151515' }}>  <i id="iconbar" className="plus icon"></i></Link>
                                    <a href={this.exportContactExcel()} style={{ color: '#151515' }}>  <i id="iconbar" className="arrow down icon"></i></a>
                                    <i id="iconbar" className="search icon" onClick={() => this.setState({ showSearchComp: !this.state.showSearchComp })}></i>
                                    <i onClick={() => this.searchContact()} id="iconbar" className="sync icon"></i>
                                </div>

                                {this.state.showSearchComp ? <div className="field">
                                    <div className="ui segment">
                                        <i id="closeicon" className="window close outline icon" onClick={() => this.setState({ showSearchComp: !this.state.showSearchComp })}></i>
                                        <div className="ui form">
                                            <div className="ui three column stackable grid">

                                                <div className="row">
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label > Name</label>
                                                            <input type="text" name="name" placeholder=" Name" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
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
                                                    <div className="ten wide column">
                                                        <div className="field">
                                                            <label >Business Name</label>
                                                            <input type="text" name="businessname" placeholder="Business Name" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.businessname} onChange={e => this.setState({ businessname: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="five wide column" style={{ marginTop: 13 }}>
                                                        <button className="ui primary button" type="submit" onClick={() => this.searchContact()}>Search</button>
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
                                            data={this.state.dataList.data.searchContacts}
                                            columns={[

                                                {
                                                    Header: "Sr.No.",
                                                    accessor: "DISNAME",
                                                    width: 50,
                                                    Cell: props => <span>{props.index + 1}</span>
                                                },
                                                {
                                                    Header: "Date",
                                                    accessor: "CDATE",
                                                    width: 85,
                                                    Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                                },
                                                {
                                                    Header: "Name",
                                                    accessor: "DISNAME",
                                                },
                                                {
                                                    Header: "Business Name",
                                                    accessor: "COMPANY",
                                                },
                                                {
                                                    Header: "Email",
                                                    accessor: "EMAILID",
                                                },
                                                {
                                                    Header: "Phone",
                                                    accessor: "PHONE",
                                                },
                                                {
                                                    Header: "Contact Type",
                                                    accessor: "CONTACTTYPE",
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
                                                            <Link to={{ pathname: '/addcontact', state: { data: row.original.CONTACTID } }} >  <div id="gridbutton" className="ui blue button" tabIndex="0" >
                                                                <i id="gridicon" className="edit icon"></i>
                                                            </div>
                                                            </Link>

                                                            {/* ----Delete Edit---------- */}
                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CID: row.original.CONTACTID, 
                                                            EMAILID: row.original.EMAILID })}>
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
                                                    Delete Contact
                                                  </div>
                                                {/* <span className="close" onClick={() => this.setState({ showModal: 'none' })}>&times;</span> */}

                                                <p style={{ color: "white" }}> 	Are you sure you want to delete this Contact ?</p>
                                                <div style={{ textAlign: "right" }}>
                                                    <div className="ui red basic cancel inverted button" onClick={() => this.setState({ showModal: 'none', })} >
                                                        <i className="remove icon"></i>
                                                        No
                                                   </div>
                                                    <div className="ui green ok inverted button" onClick={() => this.deleteContact()} >
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