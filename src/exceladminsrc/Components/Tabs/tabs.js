import React, { Component } from 'react';
import Lead from '../Leads/Lead_Add'
import FileUpload from '../File Upload/file_Upload'
//import 'react-tabs/style/react-tabs.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { DropdwonQueryLeads, LeadDetails, UpdateLeadStatusQuery } from '../Queries/queries';
import { Link, } from "react-router-dom";
import Lead_Mail from '../Leads/Lead_Mail'
import Task_ListAssigned from "../Task/Task_ListAssigned";
import Mail_List from "../Leads/Mail_List";
export default class TabComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            DropdownLeadListArr: [],
            Status: "01",
            AssignTo: "",
            AssignToDDL: [],
            StatusDDL: [],
            disableDDL: true,
            datalist: '',
            popupmsg: 'Record Updated Successfully',
            showMailPopup: 'none',
        }
        this.populateData = this.populateData.bind(this)
        this.closeMailPopup = this.closeMailPopup.bind(this)
        this.showMsg = this.showMsg.bind(this)
    };

    componentDidMount() {
        this.populateDDL()
        this.populateData()
    }

    /*---------- populates DDL  ---------*/
    async populateDDL() {
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
            await this.setState({
                AssignToDDL: result.data.ASSIGN_TO,
                StatusDDL: result.data.STATUS
            })

        }
    };

    /*---------- set DropdwonQueryLeads variables  ---------*/
    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters
    };

    /*-----------------------populates data on form load  --------------------*/
    async populateData() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', LeadDetails, this.setSearchParams())
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
            await this.setState({
                AssignTo: result.data.leadDetails[0].ASSIGNTO,
                Status: result.data.leadDetails[0].STATUS,
                datalist: result
            })
        }
    };

    /*---------- set LeadDetails query variables  ---------*/
    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CID": this.props.location.state.data.CID  //CID from leadlist
        }
        return parameters
    };

    //..............Date Formate Convertion..........
    formatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)

        var date_format = month + '/' + day + '/' + year
        return date_format
    };

    //..............Date Formate Convertion..........
    enableDDL() {
        this.setState({ disableDDL: false })
    }

    //..............update status and assignto ..........
    async updateStatus() {
        this.setState({ datalist: '' })
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('mutation', UpdateLeadStatusQuery, this.setUpdtLeadStatusParams())
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
            this.setState({ disableDDL: true })
            await this.clearscreen()
            await this.populateData()
            this.showMsg()
            this.setState({popupmsg: 'Record Updated Successfully'})
        }
    }

    /*---------- set LeadDetails query variables  ---------*/
    setUpdtLeadStatusParams() {
        var parameters = {
            "leadstatus": [{
                "CLNT": "1002",
                "LANG": "EN",
                "CID": this.props.location.state.data.CID,  //CID from leadlist
                "STATUS": this.state.Status,
                "ASSIGNTO": this.state.AssignTo == null ? "" : this.state.AssignTo
            }]
        }
        return parameters
    };

    /*---------- clears assignto and status DDL fields ---------*/
    clearscreen() {
        this.setState({
            Status: "",
            AssignTo: "",
        })
    }


    /*-----------------------to show msg after create and update--------------------*/
    showMsg() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
       
    }

    /*-----------------------change status DDL value on Approve Btn--------------------*/
    changeStatusDDLVal(btn) {
        if (btn == "approve")
            this.setState({ Status: "07" })
        else if (btn == "discard")
            this.setState({ Status: "08" })
    }

    /*-----------------------filter status DDL when Discarded btn is pressed --------------------*/
    filterStatusDDL(data) {
        if (data.CODE != "01")//"new value removed from DDL"
        {
            if (this.state.Status == "08") //if discard btn is clicked only aprrove and discard option is shown
                return data.CODE == "07" || data.CODE == "08"
            else
                return data
        }
    }

    //----------close Mail Popup
    closeMailPopup() {
        this.setState({ showMailPopup: "none" })
    }

    render() {
        console.log(this.state.popupmsg);

        if (this.state.datalist) {
            return (
                <div>
                    <h1 id="title_header"></h1>
                    <Tabs >
                        {/* -- popup to show msg-- */}
                        <div id="snackbar">  <i className="info circle icon"></i> {this.state.popupmsg}</div>

                        <div className="ui one column grid">

                            <div className="row">

                                <div className="one wide computer one wide tablet one wide mobile column">
                                </div>

                                <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                    <div className="ui two column stackable grid">


                                        <div className=" row" style={{ paddingBottom: 10, marginTop: 10 }}>

                                            <div className="seven wide column">

                                                <div style={{ fontSize: 16, fontWeight: 600 }}>{this.props.location.state ? "LEAD ID : " + this.props.location.state.data.CID + " | " + "NAME : " + this.props.location.state.data.FULLNM : null}</div>
                                                <div style={{ fontSize: 12, fontWeight: 600 }} >{this.props.location.state ? "Service(s) Required : " + this.props.location.state.data.STDESC + " | " + "Last Update On : " + this.formatDate(this.props.location.state.data.LSTUPDT) : null}</div>
                                            </div>

                                            <div className={this.state.Status == "01" ? "six wide column" : "three wide column"} style={{ textAlign: 'right', paddingRight: 0 }}>
                                                {/*----button tasks(opens task_add form)---------- */}
                                                <Link to={{ pathname: "/addtask", state: { taskofid: this.props.location.state.data.CID, taskof: "Lead", TaskType: "AssignedTask", } }}>
                                                    <button className="ui primary button" type="submit" >Task</button>
                                                </Link>
                                                <button className="ui primary button" type="submit" onClick={() => this.setState({ showMailPopup: 'flex', popupmsg: 'Mail sent Successfully.' })}>Mail</button>
                                            </div>

                                            {this.state.Status == "01" ? <div className="three wide column" style={{ paddingLeft: 0 }}>
                                                <button className="ui primary button" type="submit" onClick={() => this.changeStatusDDLVal("approve")}>Approve</button>
                                                <button className="ui red button" type="submit" onClick={() => this.changeStatusDDLVal("discard")}>Discard</button>
                                            </div> :

                                                <div className="six wide column">
                                                    <div className="ui form" style={{ margin: 0 }}>
                                                        <div className="ui three column stackable grid">

                                                            <div className="row" style={{ padding: 0 }}>
                                                                <div className="seven wide column">
                                                                    <div className="field">
                                                                        <label>Assign To</label>
                                                                        <select className="" value={this.state.AssignTo} onChange={e => this.setState({ AssignTo: e.target.value })}
                                                                            disabled={this.state.disableDDL || this.state.Status == "08"}>
                                                                            <option value="">Select</option>
                                                                            {this.state.AssignToDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="seven wide column">
                                                                    <div className="field">
                                                                        <label>Status</label>
                                                                        <select className="" value={this.state.Status} onChange={e => this.setState({ Status: e.target.value })}
                                                                            disabled={this.state.disableDDL}>
                                                                            <option value="">Select</option>
                                                                            {this.state.StatusDDL
                                                                                .filter((data) => this.filterStatusDDL(data))
                                                                                .map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="two wide column" style={{ paddingTop: 15, paddingLeft: 0 }}>
                                                                    <div id="gridbutton" className="ui  button" tabIndex="0">
                                                                        {this.state.disableDDL ? <i id="gridicon" className="edit icon" onClick={() => this.enableDDL()}></i>
                                                                            : <i id="gridicon" className="save icon" onClick={() => this.updateStatus()}></i>}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>}
                                        </div>
                                    </div>
                                    <TabList>
                                        <Tab >Leads</Tab>
                                        <Tab >Notes/Documents/Media</Tab>
                                        <Tab>Tasks</Tab>
                                        <Tab>Mail List</Tab>
                                    </TabList>
                                </div>
                                <div className="one wide computer one wide tablet one wide mobile column">
                                </div>

                            </div>
                        </div>
                        <TabPanel>
                            <Lead data={this.props.location.state} history={this.props.history} />
                        </TabPanel>

                        <TabPanel>
                            <FileUpload data={this.props.location.state} history={this.props.history} />
                        </TabPanel>

                          <TabPanel>
                               <div className="ui one column grid">
                                <div className="row">
                                <div className="one wide computer one wide tablet one wide mobile column" />
                                <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                 <Task_ListAssigned lead="LEAD" LeadId={this.props.location.state.data.CID}  />
                                </div>
                                <div className="one wide computer one wide tablet one wide mobile column" />
                                </div>
                                </div>
                          </TabPanel>

                         <TabPanel>
                             <div className="ui one column grid">
                             <div className="row">
                             <div className="one wide computer one wide tablet one wide mobile column" />
                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <Mail_List   lead="Lead"   LeadId={this.props.location.state.data.CID}    />
                           </div>
                           <div className="one wide computer one wide tablet one wide mobile column" />
                           </div>
                           </div>
                       </TabPanel>

                    </Tabs>


                    {/* -- The Modal(popup) opens onclick of delete btn -- */}
                    <div className="modal" style={{ display: this.state.showMailPopup }} >
                        <div className="modal-content">
                            <Lead_Mail LeadId={this.props.location.state.data.CID}   FULLNM={this.props.location.state.data.FULLNM} closeMailPopup={this.closeMailPopup} showMsg={this.showMsg} />
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