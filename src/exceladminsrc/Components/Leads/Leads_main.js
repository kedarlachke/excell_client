import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { DropdwonQueryLeads, searchLeads, LeadsCRUDOpsQuery, ServicesRequiredDropdwonQuery } from "../Queries/queries";
import { Link, } from "react-router-dom";
import Lead_Mail from './Lead_Mail'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {exportToExcel} from '../commonfunctions/commonfunctions'

export default class Leads_Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryDDL: [],
            typeDDL: [],
            statusDDL: [],
            name: '',
            email: '',
            phone: '',
            FULLNM:'',
            businessname: '',
            category: '',
            type: '',
            status: '',
            dataList: '',
            showSearchForm: false,
            showMailPopup: 'none',
            popupmsg: 'Mail sent Successfully',
            LeadId: '',
            MailFrom:''
        }
        this.closeMailPopup = this.closeMailPopup.bind(this)
        this.showMsg = this.showMsg.bind(this)
    };

    componentDidMount() {
        this.poplateCategoryAndStatusDDL()
        this.searchLeads()
    }

    /*---------- populates serviceCategory and status DDl on form load ---------*/
    async poplateCategoryAndStatusDDL() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', DropdwonQueryLeads, this.setDropdownParams())
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
                categoryDDL: result.data.SERVICE_CATEGORY,
                statusDDL: result.data.STATUS
            })
        }

    }

    /*---------- set DropdwonQueryLeads variables  ---------*/
    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters
    };

    /*---------- populates service type onchange of serviceCategory DDL ---------*/
    async  poplateServiceReqDDL(serviceCat) {
        this.setState({ category: serviceCat })

        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', ServicesRequiredDropdwonQuery, this.setServiceReqDDLParams(serviceCat))
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
                typeDDL: result.data.SERVICES_REQUIRED,
                type: result.data.SERVICES_REQUIRED.length == 1 ? result.data.SERVICES_REQUIRED[0].CODE : ""
            })
        }
    }

    /*---------- set ServicesRequiredDropdwonQuery variables  ---------*/
    setServiceReqDDLParams(catcode) {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CATCODE": catcode
        }
        return parameters

    };

    /*---------- search leads ---------*/
    async searchLeads() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', searchLeads, this.setSearchParams())
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

    /*---------- set searchLeads query variables  ---------*/
    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "FULLNM": "%" + this.state.name + "%",
            "OFFICENM": "%" + this.state.businessname + "%",
            "TYPSERV": "%" + this.state.type + "%",
            "PHONE": "%" + this.state.phone + "%",
            "EMAILID": "%" + this.state.email + "%",
            "STATUS": "%" + this.state.status + "%",
            "CATCODE": "%" + this.state.category + "%",
            "isAdmin": true
        }
        return parameters
    }

    /*---------- clears the search form fields  ---------*/
    async  clearscreen() {
        await this.setState({
            name: '',
            email: '',
            phone: '',
            businessname: '',
            category: '',
            type: '',
            status: ''
        })
        this.searchLeads()
    }

    /*---------- delete leads ---------*/
    async deleteLeads() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('mutation', LeadsCRUDOpsQuery, this.setDeleteParams())
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

    /*---------- set delete LeadsCRUDOpsQuery variables  ---------*/
    setDeleteParams() {
        var parameters = {
            "transaction": "PHYSICAL_DELETE",
            "leads": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CID": this.state.CID,
                    "ISDEL": "y"
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

    /*-----------------------populates the list on enter keypress  --------------------*/
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.searchLeads()
        }
    }
    //----------close search form
    closeSearchForm() {
        this.setState({ showSearchForm: !this.state.showSearchForm })
        this.clearscreen()
    }

    //----------close Mail Popup
    closeMailPopup() {
        this.setState({ showMailPopup: "none" })
    }


    /*-----------------------to show msg after mail sending--------------------*/
    showMsg() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

 /*-----------------------download lead excel report--------------------*/
 exportLeadExcel() {
    console.log("export ----1");
    let ParamArray= ["1002",
     "EN",
      "%" + this.state.name + "%",
      "%" + this.state.businessname + "%",
      "%" + this.state.phone + "%",
      "%" + this.state.email + "%",
      "%" + this.state.type + "%",
      "%" + this.state.status + "%",
      "%" + this.state.category + "%"]

    var parameters = {
        "ReportType":[ "ADMIN_LEADS"],
        "ParamArray":[ParamArray],
        "ReportName": "Leads"
    }
    let uri = exportToExcel(parameters);
    return uri;
}


    render() {
        console.log(this.state.MailFrom);
        
        const { dataList } = this.state

        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className="three column row">
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                <h1 id="title_header"> Leads</h1>

                                <div className="icode" id="title_header">
                                    <Link to={'/addlead'} style={{ color: '#151515' }}>  <i id="iconbar" className="plus icon"></i></Link>
                                   <a href={this.exportLeadExcel()} style={{ color: '#151515' }}> <i id="iconbar" className="arrow down icon"></i></a>
                                    <i id="iconbar" className="search icon" onClick={() => this.setState({ showSearchForm: !this.state.showSearchForm })}></i>
                                    <i onClick={() => this.searchLeads()} id="iconbar" className="sync icon"></i>
                                </div>

                                {this.state.showSearchForm ? <div className="field">
                                    <div className="ui segment">
                                        <i id="closeicon" className="window close outline icon" onClick={() => this.closeSearchForm()}></i>
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
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label >Business Name</label>
                                                            <input type="text" name="businessname" placeholder="Business Name" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.businessname} onChange={e => this.setState({ businessname: e.target.value })} />
                                                        </div>
                                                    </div>

                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label >Service Category</label>
                                                            <select className="" value={this.state.category} onKeyPress={(e) => this.handleKeyPress(e)}
                                                                onChange={e => this.poplateServiceReqDDL(e.target.value)}>
                                                                <option value="">Select</option>
                                                                {this.state.categoryDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label >Service(s) Required</label>
                                                            <select className="" value={this.state.type} onKeyPress={(e) => this.handleKeyPress(e)}
                                                                onChange={e => this.setState({ type: e.target.value })}
                                                                disabled={this.state.typeDDL.length == 0}>
                                                                <option value="">Select</option>
                                                                {this.state.typeDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="row">
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label >Status</label>
                                                            <select className="" value={this.state.status} onKeyPress={(e) => this.handleKeyPress(e)}
                                                                onChange={e => this.setState({ status: e.target.value })}>
                                                                <option value="">Select</option>
                                                                {this.state.statusDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="row">
                                                    <div className="ten wide column">
                                                        <button className="ui primary button" type="submit" onClick={() => this.searchLeads()}>Search</button>
                                                        <button className="ui  button" type="submit" onClick={() => this.clearscreen()} >Clear</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    : null}

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
                                            data={dataList.data.searchLeads}
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
                                                    accessor: "CDATE",
                                                    width: 85,
                                                    Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                                },
                                                {
                                                    Header: "Client Name",
                                                    accessor: "FULLNM",
                                                },
                                                {
                                                    Header: "Business",
                                                    accessor: "OFFICENM",
                                                },
                                                {
                                                    Header: "Service",
                                                    accessor: "STDESC",
                                                },
                                                {
                                                    Header: "Priority",
                                                    accessor: "PRIORITY",
                                                    width: 65,
                                                },
                                                {
                                                    Header: "Source",
                                                    accessor: "MODEOFSRC",
                                                },
                                                {
                                                    Header: "Status",
                                                    accessor: "STATUS",
                                                    width: 85,
                                                },
                                                {
                                                    Header: "Last Updated",
                                                    accessor: "LSTUPDT",
                                                    width: 95,
                                                    Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                                },
                                                {
                                                    Header: "Mail Count",
                                                    accessor: "MAILCOUNT",
                                                    width: 85,
                                                },
                                                {
                                                    Header: "Task Count",
                                                    accessor: "TASKCOUNT",
                                                    width: 85,
                                                },
                                                {
                                                    Header: "Notes Count",
                                                    accessor: "LEADNOTECOUNT",
                                                    width: 85,
                                                },
                                                {
                                                    Header: 'Action',
                                                    accessor: 'dataList',
                                                    width: 165,
                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: row => (
                                                        <div>
                                                            {/*----button tasks(opens task_add form)---------- */}
                                                            <Link to={{ pathname: "/addtask", state: { taskofid: row.original.CID, taskof: "Lead", TaskType: "AssignedTask", } }}>
                                                                <div id="griddeletebutton" className="ui blue button" tabIndex="0">
                                                                    <i id="gridicon" className="tasks icon"></i>

                                                                </div>
                                                            </Link >
                                                            {/*----button Mail---------- */}
                                                            <div id="griddeletebutton" className="ui blue button" tabIndex="0" onClick={() => this.setState({ showMailPopup: 'flex', LeadId: row.original.CID,MailFrom :row.original.EMAILID , FULLNM:row.original.FULLNM})}>
                                                                <i id="gridicon" className="envelope outline icon"></i>
                                                            </div>
                                                            {/*----button Edit---------- */}
                                                            <Link to={{ pathname: '/editlead', state: { data: row.original } }}>
                                                                <div id="gridbutton" className="ui blue button" tabIndex="0" >
                                                                    <i id="gridicon" className="edit icon"></i>
                                                                </div>
                                                            </Link >
                                                            {/* ----button Delete---------- */}
                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CID: row.original.CID })}>
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
                                                                <div style={{ float: 'left', paddingTop: 5 }}> <strong >Email :</strong>  <span>{rowData.EMAILID}</span> </div>
                                                                <div style={{ marginLeft: 330, paddingTop: 5 }}>  <strong >Last Update :</strong>  <span>{this.formatDate(rowData.LSTUPDT)}</span>    </div>
                                                                <div style={{ paddingTop: 5 ,float: 'left'}}> <strong>Phone :</strong>  <span>{rowData.PHONE}</span>  </div>
                                                                <div style={{ marginLeft: 330, paddingTop: 5 }}>  <strong >Note:</strong>  {rowData.ADDCOMMETS.includes("<p>")==true?<span>{"Mail Sent"}</span>:<span>{rowData.ADDCOMMETS}</span>}</div>
                                                                <div style={{ paddingTop: 5 }}  >   <strong>Best Method Of Contact :</strong>  <span>{rowData.MODDESC}</span>   </div>
                                                                <div style={{ paddingTop: 5 }}  >   <strong>Best Time To Call :</strong>  <span>{rowData.BESTTMCAL}</span>   </div>
                                                                
                                                            </div>
                                                        </div>

                                                    </div>
                                                );
                                            }}
                                        />

                                        {/* -- The Modal(popup) opens onclick of delete btn -- */}
                                        <div className="modal" style={{ display: this.state.showModal }} >
                                            <div className="modal-content">

                                                <div className="ui icon header " style={{ color: "white", textAlign: "Center" }}>
                                                    <i className="archive icon"></i>
                                                    Delete Lead
                                              </div>
                                                {/* <span className="close" onClick={() => this.setState({ showModal: 'none' })}>&times;</span> */}

                                                <p style={{ color: "white" }}> 	Are you sure you want to delete this Lead ?</p>
                                                <div style={{ textAlign: "right" }}>
                                                    <div className="ui red basic cancel inverted button" onClick={() => this.setState({ showModal: 'none', })} >
                                                        <i className="remove icon"></i>
                                                        No
                                                 </div>
                                                    <div className="ui green ok inverted button" onClick={() => this.deleteLeads()} >
                                                        <i className="checkmark icon"></i>
                                                        Yes
                                                  </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*msg after mail sending*/}
                                        <div id="snackbar">  <i className="info circle icon"></i>{this.state.popupmsg}</div>

                                        {/* -- The Modal(popup) opens onclick of delete btn -- */}
                                        <div className="modal" style={{ display: this.state.showMailPopup }} >
                                            <div className="modal-content">

                                                <Lead_Mail LeadId={this.state.LeadId} MailFrom={this.state.MailFrom} closeMailPopup={this.closeMailPopup} showMsg={this.showMsg}   FULLNM={this.state.FULLNM} />
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