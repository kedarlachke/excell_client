import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from "react-router-dom";
import CaseGeneric from '../Cases/CaseGeneric';
import ContractGeneric from '../Contract/ContractGeneric';
import ClientDetails from '../Client/Client';
import Task_ListAssigned from '../Mask/Task_ListAssigned'
import CardAuthorization from '../Authorization/CardAuthorization';
import ECheckAuthorization from '../Authorization/eCheckAuthorization';
import OtherAuthorization from '../Authorization/OtherAuthorization';
import Invoice from '../Billing/Invoice';
import Signature from '../Signature/Signature';
import ProgressReport from '../ProgressReport/progressRoutes';
import { execGql } from '../apolloClient/apolloClient';
import Case_Mail from '../Cases/Case_Mail';
import CaseDocument from '../File Upload/file_Upload'
import BillableHoures from './Billable_Houres'
import CaseTask from '../Task/Task_ListAssigned'
import Task_Add from '../Mask/Lead_Task'
import { DropdwonQueryLeads, AuthorizationDetails, contractDetails, caseDetails, Searchratecards, UpdateCaseStatusQuery } from '../Queries/queries';
var OtherServiceListArr = [];
export default class TabComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Status: "",
            SERVICETYP: "",
            Contract_Typ: "",
            Service_Typ: "",
            Service: "",
            ContractType: "",
            Auth_Typ: "",
            Auth_Data: "",
            Case_Typ: "",
            DispalyComp: true,
            DispalyTab: false,
            DispalyTaskTab: false,
            DisplayAuthBtn: 'flex',
            showMailPopup: 'none',
            showTaskPopup: 'none',
            tabIndex: 0,
            CLIENTID: "",
            Client_Name: "",
            CASEDT: "",
            PRIORITY: "",
            ASSIGNUSER: "",
            OnClickAuthbtn: "",
            Case_Id: "",
            ContractSkip: false,
            email: '',
            CaseStatus: "",
            AssignTo: "",
            AssignToDDL: [],
            StatusDDL: [],
            disableDDL: true,
            Rate: '',
            TYPE: "",
            datalist: true
        }
        this.gotoCaseType = this.gotoCaseType.bind(this);
        this.gotoPreviousTab = this.gotoPreviousTab.bind(this);
        this.gotoCustomContract = this.gotoCustomContract.bind(this);
        this.getCaseText = this.getCaseText.bind(this);
        this.showMsg = this.showMsg.bind(this);
        this.closeMailPopup = this.closeMailPopup.bind(this)
        this.closeTaskPopup = this.closeTaskPopup.bind(this)
        
    };

    //----------close Mail Popup
    closeMailPopup() {
        this.setState({ showMailPopup: "none" })
    }
    closeTaskPopup() {
        this.setState({ showTaskPopup: "none" })
    }
    

    async  componentDidMount() {
        //alert('In componentDidMount Case Tab')
        this.populateDDL();
        console.log('1 component did mount')
        console.log('this.props.location.state.data.SERVICETYP')
            if (this.props.location.state) {
            if (this.props.location.state.data.CIDSYS) {
                await this.setState({
                    SERVICETYP: this.props.location.state.data.SERVICETYP,
                    CLIENTID: this.props.location.state.data.CLNTID,
                    Contract_Typ: this.props.location.state.data.SERVICETYP,
                    Case_Id: this.props.location.state.data.CIDSYS,
                    Client_Name: this.props.location.state.data.FRSTNM,
                    CASEDT: this.formatDate(this.props.location.state.data.CASEDT),
                    PRIORITY: this.props.location.state.data.PRIORITY,
                    ASSIGNUSER: this.props.location.state.data.ASSIGNUSER,
                    Status: this.props.location.state.data.STATUS,
                    DispalyComp: !this.state.DispalyComp,
                    DispalyTaskTab: !this.state.DispalyTaskTab,
                    email: this.props.location.state.data.EMAILID,
                    TYPE: this.props.location.state.data.TYPE,
                    AssignTo: this.props.location.state.data.ASSIGNUSER
                });
            }
            console.log('2 component did mount')
            console.log(this.state)

            // To Set Case Type and Contract Type
            if (this.state.SERVICETYP == 'Asset Search') {
                await this.setState({ SERVICETYP: "ASSET_SEARCH" });

            }
            if (this.state.SERVICETYP == 'Child Custody') {
                await this.setState({ SERVICETYP: "CHILD_CUSTODY" });
            }
            if (this.state.SERVICETYP == 'Infidelity') {
                await this.setState({ SERVICETYP: "INFIDELITY" });
            }

            if (this.state.SERVICETYP == 'Other Cases') {
                await this.setState({ SERVICETYP: "OTHER_CASE" });
            }
            console.log('3 component did mount')
            console.log(this.state)
            if (this.state.SERVICETYP == 'Locate People') {
                await this.setState({ SERVICETYP: "LOCATE_PEOPLE" });
            }

            if (this.state.SERVICETYP == 'Workers Comp') {
                await this.setState({ SERVICETYP: "WORKERS_COMP" });
            }

            if (this.state.SERVICETYP == 'Process Server') {
                await this.setState({ SERVICETYP: "PROCESS_SERVER" });
            }

            // To Show Invoice Tab When Status was Submited.
            if (this.state.Status == 'Submission Pending') {
                await this.setState({ DispalyTab: false });
            }
            else {
                await this.setState({ DispalyTab: true });
            }
            console.log('4 component did mount')
            console.log(this.state)
            await this.getCaseText(this.state.SERVICETYP);
            console.log('5 component did mount')
            console.log(this.state)
            await this.populateRateCards()
            console.log('6 component did mount')
            console.log(this.state)
             this.populateData()
            console.log('7 component did mount')
            console.log(this.state)
             this.PopulateAuthData();
            console.log('8 component did mount')
            console.log(this.state)
            await this.PopulateContractData();
            console.log('9 component did mount')
            console.log(this.state)
        }
        //  console.log(this.state.email);
    };

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
            //  console.log(result);
            console.log('items--------------------------------------------2')
            OtherServiceListArr.push(result.data.OTHER_SERVICES);
            console.log(OtherServiceListArr)
            console.log('items--------------------------------------------2')
            await this.setState({
                AssignToDDL: result.data.ASSIGN_TO,
                StatusDDL: result.data.STATUS,
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

    // To Populate Rate Releted To Case
    async populateRateCards() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', Searchratecards, this.setSearchParams())
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
            // console.log(result.data.searchRatecards.length);
            if (result.data.searchRatecards.length !== 0) {
                await this.setState({ Rate: result.data.searchRatecards[0].ITEMRATE })
            }
        }

    };

    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CIDSYS": "%%",
            "CLIENTID": "%%",
            "ITEMID": "%%",
            "ISACTIVE": "%%",
            "ITEMDECS": "%" + this.state.Service + "%",
            "exactMatch": true
        }
        return parameters

    };

    //..............enable or disable Status..........
    enableDDL() {
        this.setState({ disableDDL: false })
    };

    //..............update status and assignto ..........
    async updateStatus() {
        await this.setState({ datalist: false })
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('mutation', UpdateCaseStatusQuery, this.setUpdtCaseStatusParams())
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
            this.setState({ disableDDL: true });
            this.clearscreen();
            await this.populateData()
            this.showMsg('Record Updated Successfully', false)
        }

    }

    setUpdtCaseStatusParams() {

        let parameters = {
            "casestatus": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS": this.state.Case_Id,
                    "STATUS": this.state.CaseStatus,
                    "PRIORITY": this.state.PRIORITY,
                    "ASSIGNUSER": this.state.AssignTo,
                    "CASERATE": this.state.Rate
                }
            ]
        }
        return parameters
    }


    // Populate Case Data 
    async populateData() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', caseDetails, this.setPopulateDataParams())
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
            console.log('result.data');
            console.log(this.state.Status);
            console.log('result.data');

            if (result.data.caseDetails.length !== 0) {
                await this.setState({
                    AssignTo: result.data.caseDetails[0].ASSIGNUSER,
                    CaseStatus: result.data.caseDetails[0].STATUS,
                    // Rate: result.data.caseDetails[0].CASERATE ? result.data.caseDetails[0].CASERATE : this.state.Rate,
                    datalist: true
                });
            }

        }
    }

    setPopulateDataParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CIDSYS": this.state.Case_Id
        }
        return parameters
    }

    /*---------- clears assignto and status DDL fields ---------*/
    clearscreen() {
        this.setState({
            CaseStatus: "",
            AssignTo: "",
        })
    }

    // To Populate Authorization Data and set Auth_Typ

    async PopulateAuthData() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', AuthorizationDetails, this.setParams())
            //console.log(result);
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
            // console.log(result);

            if (result.data.Card.length != 0) {
                await this.setState({ Auth_Typ: 'Card', DisplayAuthBtn: 'none', Auth_Data: result.data.Card });
            }
            else if (result.data.Cash.length != 0) {
                await this.setState({ Auth_Typ: 'Cash', DisplayAuthBtn: 'none', Auth_Data: result.data.Cash });
            }
            else if (result.data.Check.length != 0) {
                await this.setState({ Auth_Typ: 'Check', DisplayAuthBtn: 'none', Auth_Data: result.data.Check });
            }
        }
    };

    setParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CIDSYS": this.state.Case_Id
        }
        return parameters

    };


    // To Populate Contract Data and set Contract_Typ

    async PopulateContractData() {
        //  console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', contractDetails, this.setContractParams())
            console.log('1 PopulateContractData')
             console.log(result);
        }
        catch (err) {
            console.log('2 PopulateContractData')
            console.log(err)
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }
     console.log(result)
     
        if (!result) {
            console.log(errors);
            console.log(errorMessage);
        }
        else {
            // console.log(result);
            if (result.data.contractDetails.length != 0) {
                await this.setState({
                    Contract_Typ: result.data.contractDetails[0].SERVICETYPE
                });
            }
            
            if (this.state.Contract_Typ == 'ASSET_SEARCH' || this.state.Contract_Typ == 'Asset Search') {
                await this.setState({ ContractType: "ASSET" });
            }

            if (this.state.Contract_Typ == 'CHILD_CUSTODY' || this.state.Contract_Typ == 'Child Custody') {
                await this.setState({ ContractType: "INFIDELITY" });
            }

            if (this.state.Contract_Typ == 'INFIDELITY' || this.state.Contract_Typ == 'Infidelity') {
                await this.setState({ ContractType: "INFIDELITY" });
            }

            if (this.state.Contract_Typ == 'OTHER_CASE' || this.state.Contract_Typ == 'Other Cases') {
                await this.setState({ ContractType: "INFIDELITY" });
            }

            if (this.state.Contract_Typ == 'PROCESS_SERVER' || this.state.Contract_Typ == 'Process Server') {
                await this.setState({ ContractType: "PROCESS" });
            }
            if (this.state.Contract_Typ == 'LOCATE_PEOPLE' || this.state.Contract_Typ == 'Locate People') {
                await this.setState({ ContractType: "LOCATE" });
            }
            if (this.state.Contract_Typ == 'WORKERS_COMP' || this.state.Contract_Typ == 'Workers Comp') {
                await this.setState({ ContractType: "INFIDELITY" });
            }

            if (this.state.Contract_Typ == 'CUSTOM') {
                await this.setState({ ContractType: "CUSTOM" });
                // console.log(this.state.ContractType);
            }
        }

    };

    setContractParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CIDSYS": this.state.Case_Id
        }
        return parameters

    };

    // If User not save Client and Case Details,then move to previous tab
    async gotoPreviousTab(isNext) {
        await this.setState({ tabIndex: isNext })
    }

    //............for show msg Popup..........
    async showMsg(text, isColor) {
        //await this.setState({  });
        await this.setState({ showMsgText: text, DispalyBackColor: isColor })
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    };

    // Go To Next Tab and set Client Id & Case Id & Client Name ,Case Type, Last Update
    async  gotoCaseType(isNext, CID, CaseId, ClientName, CaseType, LastUpdated, isContractskip, email) {
        isNext ? await this.setState({ tabIndex: this.state.tabIndex + 1 }) : null;
        CID ? await this.setState({ CLIENTID: CID }) : null;
        CaseId ? await this.setState({ Case_Id: CaseId }) : null;
        ClientName ? await this.setState({ Client_Name: ClientName }) : null;
        CaseType ? await this.getCaseText(CaseType) : null;
        isContractskip ? await this.setState({ ContractSkip: isContractskip }) : null
        email ? await this.setState({ email: email }) : null
    };

    // To Open Custom Contract in Same Tab
    async  gotoCustomContract(casetyp) {
        await this.setState({
            Case_Typ: this.state.Case_Typ ? casetyp : this.state.Case_Typ,
            SERVICETYP: this.state.SERVICETYP ? casetyp : this.state.SERVICETYP,
            ContractType: casetyp
        })

        console.log(this.state.Case_Typ)
    };

    //..............Date Formate Convertion..........
    formatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)

        var date_format = month + '/' + day + '/' + year
        return date_format
    };


    // To Set Case Type
   async getCaseText(caseType) {
        console.log(`in get cASETEXT`);
        var caseText = "";
        var service = "";
        switch (caseType) {
          case "INFIDELITY":
            caseText = "Infidelity";
            service = "Infidelity";
            break;
          case "CHILD_CUSTODY":
            caseText = "Child Custody";
            service = "Child Custody";
            break;
          case "WORKERS_COMP":
            caseText = "Workers Comp";
            service = "Workers Comp";
            break;
          case "LOCATE_PEOPLE":
            caseText = "Locate People";
            service = "Locate People";
            break;
          case "PROCESS_SERVER":
            caseText = "Process Server";
            service = "Process Server";
            break;
          case "OTHER_CASE":
            caseText = "Other";
            // let servicetyp = await OtherServiceListArr[0].filter(data => {
            //   if (data.CODE === this.state.TYPE) {
            //     return data.DESC;
            //   }
            // });
            
            service = ''//servicetyp[0].DESC;
            console.log('4.1 component did mount')
           //console.log(servicetyp[0].DESC);
            break;
          case "ASSET_SEARCH":
            caseText = "Asset Search";
            service = "Asset Search";
            break;
        }
        await this.setState({ Service_Typ: caseText, Service: service });
    }

    render() {
        console.log('in render case tab')
        console.log(this.state)
        if (this.state.datalist) {
            return (
                <div className="ui three column stackable grid">
                    <h1 id="title_header"></h1>
                    <div className="row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        <div className="five wide computer five wide tablet five wide mobile column">
                            <div style={{ fontSize: 16, fontWeight: 600 }}>{"CASE ID : " + this.state.Case_Id + " | " + " CLIENT NAME : " + this.state.Client_Name}</div>
                            <div style={{ fontSize: 12, fontWeight: 600 }} >{"Service type: " + this.state.Service_Typ + " | " + "Last Update On : " + this.state.CASEDT}</div>
                        </div>
                        {this.state.Case_Id ? <div className="three wide column" style={{ textAlign: 'right', paddingRight: 0 }}>
                            {/*----button tasks(opens task_add form)---------- */}
                            {/* <Link to={{ pathname: "/addtask", state: { taskofid: this.state.Case_Id, taskof: "Case", TaskType: "AssignedTask", } }}> */}
                                <button className="ui primary button" type="submit" 
                                onClick={() => this.setState({ showTaskPopup: 'flex'})}
                                >Task</button>
                            {/* </Link> */}
                            <button className="ui primary button" type="submit" onClick={() => this.setState({ showMailPopup: 'flex', popupmsg: 'Mail sent Successfully.' })}>Mail</button>
                        </div> : null}
                        {this.state.Case_Id ? <div className="six wide column">
                            <div className="ui form" style={{ margin: 0 }}>
                                <div className="ui three column stackable grid">
                                    <div className="row" style={{ padding: 0 }}>
                                        <div className="five wide column">
                                            <div className="field">
                                                <label>Assign To</label>
                                                <select className="" value={this.state.AssignTo} onChange={e => this.setState({ AssignTo: e.target.value })}
                                                    disabled={this.state.disableDDL}>
                                                    <option value="">Select</option>
                                                    {this.state.AssignToDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="five wide column">
                                            <div className="field">
                                                <label>Status</label>
                                                <select className="" value={this.state.CaseStatus} onChange={e => this.setState({ CaseStatus: e.target.value })}
                                                    disabled={this.state.disableDDL}>
                                                    <option value="">Select</option>
                                                    {this.state.StatusDDL
                                                        .map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="five wide column">
                                            <div className="field">
                                                <label >Rate</label>
                                                <div className="ui right icon input">
                                                    <input type="text" name="Rate" disabled={this.state.disableDDL} value={this.state.Rate} onChange={e => this.setState({ Rate: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="one wide column" style={{ paddingTop: 15, paddingLeft: 0 }}>
                                            <div id="gridbutton" className="ui  button" tabIndex="0">
                                                {this.state.disableDDL ? <i id="gridicon" className="edit icon" onClick={() => this.enableDDL()}></i>
                                                    : <i id="gridicon" className="save icon" onClick={() => this.updateStatus()} ></i>}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div> : null}

                        <div className="three wide computer three wide tablet three wide mobile column">
                        </div>
                    </div>
                    <div className="row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        {/* -- popup after changing status-- */}
                        <div id="snackbar" style={{ backgroundColor: this.state.DispalyBackColor ? "#dd212d" : "rgba(33,155,166,0.88)" }}>  <i className="info circle icon"></i>{this.state.showMsgText}</div>
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })} >
                                <TabList>
                                    <Tab >Client Details </Tab>
                                    {this.state.DispalyComp ? <Tab >Case Type</Tab> : null}
                                    <Tab >Case Details</Tab>
                                    <Tab >Case Documents</Tab>
                                    <Tab >Contracts & Agreements</Tab>
                                    <Tab >Authorization</Tab>
                                    <Tab >Electronic Signature</Tab>
                                     {this.state.DispalyTab ? <Tab >Progress Report</Tab> : null}
                                    {this.state.DispalyTab ? <Tab >Billable Hours</Tab> : null} 
                                    {this.state.DispalyTab ? <Tab >Invoice</Tab> : null}
                                    {this.state.DispalyTaskTab ? <Tab >Task</Tab> : null}

                                </TabList>

                                {/* Client Details Panel */}

                                <TabPanel>
                                    <ClientDetails CLIENTID={this.state.CLIENTID} showMsg={this.showMsg} gotoCaseType={this.gotoCaseType} data={this.props.location.state} history={this.props.history} />
                                </TabPanel>

                                {/* Case Type Panel */}

                                {
                                    this.state.DispalyComp ? <TabPanel>
                                        <div className=" row" style={{ display: this.state.DispalyComp ? 'flex' : 'none', marginLeft: 10 }}>
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "ASSET_SEARCH", ContractType: "ASSET" })}>Asset Search</button>
                                                <button className="ui primary button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "INFIDELITY", ContractType: "INFIDELITY" })}>Infidelity</button>
                                                <button className="ui primary  button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "CHILD_CUSTODY", ContractType: "INFIDELITY" })}>Child Custody</button>
                                                <button className="ui primary  button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "WORKERS_COMP", ContractType: "INFIDELITY" })}>Workers Comp</button>
                                                <button className="ui primary  button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "LOCATE_PEOPLE", ContractType: "LOCATE" })}>Locate People</button>
                                                <button className="ui primary  button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "PROCESS_SERVER", ContractType: "PROCESS" })}>Process Server</button>
                                                <button className="ui primary  button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "OTHER_CASE", ContractType: "INFIDELITY" })}>Other</button>
                                            </div>
                                        </div>
                                    </TabPanel> : null
                                }

                                {/* Case Details Panel */}

                                <TabPanel>

                                    {
                                        this.state.Case_Typ ? <CaseGeneric showMsg={this.showMsg} Case_Id={this.state.Case_Id} caseType={this.state.Case_Typ} gotoCaseType={this.gotoCaseType} gotoPreviousTab={this.gotoPreviousTab} CLIENTID={this.state.CLIENTID} history={this.props.history} /> : null
                                    }

                                    {
                                        this.state.SERVICETYP ? <CaseGeneric showMsg={this.showMsg} caseType={this.state.SERVICETYP} Case_Id={this.state.Case_Id} gotoCaseType={this.gotoCaseType} gotoPreviousTab={this.gotoPreviousTab} data={this.props.location.state.data.CIDSYS} CLIENTID={this.state.CLIENTID} history={this.props.history} /> : null
                                    }
                                </TabPanel>

                                {/* Case Document Panel */}

                                <TabPanel>
                                    <CaseDocument CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} showMsg={this.showMsg} gotoPreviousTab={this.gotoPreviousTab} gotoCaseType={this.gotoCaseType} history={this.props.history} />

                                </TabPanel>

                                {/* Contract Panel */}

                                <TabPanel>
                                    {
                                        this.state.Case_Typ ? <ContractGeneric showMsg={this.showMsg} Case_Typ={this.state.Case_Typ} contractType={this.state.ContractType} gotoPreviousTab={this.gotoPreviousTab} CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} SERVICETYP={this.state.Case_Typ} gotoCaseType={this.gotoCaseType} gotoCustomContract={this.gotoCustomContract} history={this.props.history} /> : null
                                    }

                                    {
                                        this.state.Contract_Typ ? <ContractGeneric showMsg={this.showMsg} Case_Typ={this.state.SERVICETYP} contractType={this.state.ContractType} gotoPreviousTab={this.gotoPreviousTab} CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} data={this.props.location.state.data.CIDSYS} SERVICETYP={this.state.SERVICETYP} gotoCustomContract={this.gotoCustomContract} gotoCaseType={this.gotoCaseType} history={this.props.history} /> : null
                                    }


                                </TabPanel>

                                {/* Authorization Panel */}

                                <TabPanel>
                                    <div className=" row" style={{ marginLeft: 10, display: this.state.DisplayAuthBtn }}>
                                        <div className="ten wide column">
                                            <button className="ui  button" type="submit" onClick={() => this.setState({ OnClickAuthbtn: "eCheck Authorization" })}>eCheck Authorization</button>
                                            <button className="ui  button" type="submit" onClick={() => this.setState({ OnClickAuthbtn: "Card Authorization" })}>Card Authorization</button>
                                            <button className="ui   button" type="submit" onClick={() => this.setState({ OnClickAuthbtn: "Cash/Other" })}>Cash/Other</button>
                                        </div>
                                    </div>

                                    {
                                        this.state.OnClickAuthbtn == 'eCheck Authorization' ? <ECheckAuthorization Case_Id={this.state.Case_Id} EMAILID={this.state.email} showMsg={this.showMsg} gotoCaseType={this.gotoCaseType} gotoPreviousTab={this.gotoPreviousTab} Client_Name={this.state.Client_Name} CLIENTID={this.state.CLIENTID} ContractSkip={this.state.ContractSkip} history={this.props.history} /> :
                                            this.state.OnClickAuthbtn == 'Card Authorization' ? <CardAuthorization Case_Id={this.state.Case_Id} EMAILID={this.state.email} showMsg={this.showMsg} gotoCaseType={this.gotoCaseType} gotoPreviousTab={this.gotoPreviousTab} Client_Name={this.state.Client_Name} CLIENTID={this.state.CLIENTID} ContractSkip={this.state.ContractSkip} history={this.props.history} /> :
                                                this.state.OnClickAuthbtn == 'Cash/Other' ? <OtherAuthorization Case_Id={this.state.Case_Id} EMAILID={this.state.email} showMsg={this.showMsg} gotoCaseType={this.gotoCaseType} gotoPreviousTab={this.gotoPreviousTab} Client_Name={this.state.Client_Name} CLIENTID={this.state.CLIENTID} ContractSkip={this.state.ContractSkip} history={this.props.history} /> : null
                                    }

                                    {
                                        this.state.Auth_Typ == 'Check' ? <ECheckAuthorization data={this.state.Auth_Data} Case_Id={this.state.Case_Id} showMsg={this.showMsg} gotoCaseType={this.gotoCaseType} gotoPreviousTab={this.gotoPreviousTab} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                            this.state.Auth_Typ == 'Card' ? <CardAuthorization data={this.state.Auth_Data} Case_Id={this.state.Case_Id} showMsg={this.showMsg} gotoCaseType={this.gotoCaseType} gotoPreviousTab={this.gotoPreviousTab} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                                this.state.Auth_Typ == 'Cash' ? <OtherAuthorization data={this.state.Auth_Data} Case_Id={this.state.Case_Id} showMsg={this.showMsg} gotoCaseType={this.gotoCaseType} gotoPreviousTab={this.gotoPreviousTab} CLIENTID={this.state.CLIENTID} history={this.props.history} /> : null
                                    }

                                </TabPanel>

                                {/* Signature Panel */}

                                <TabPanel >
                                    <Signature Case_Id={this.state.Case_Id} CLIENTID={this.state.CLIENTID} Client_Name={this.state.Client_Name} ContractSkip={this.state.ContractSkip} showMsg={this.showMsg} gotoPreviousTab={this.gotoPreviousTab} 
                                    history={this.props.history} status={this.state.Status} />
                                </TabPanel>

                                {/* Progress Report Panel */}

                                 <TabPanel>

                                    <ProgressReport Case_Id={this.state.Case_Id} gotoCaseType={this.gotoCaseType} history={this.props.history} />

                                </TabPanel> 


                                {/* Billable Houres Panel */}

                                <TabPanel>

                                    <BillableHoures Case_Id={this.state.Case_Id} CLIENTID={this.state.CLIENTID} history={this.props.history} showMsg={this.showMsg} gotoCaseType={this.gotoCaseType} />

                                </TabPanel> 

                                {/* Invoice Panel */}

                                <TabPanel>

                                    <Invoice Case_Id={this.state.Case_Id} showMsg={this.showMsg} CLIENTID={this.state.CLIENTID} EMAILID={this.state.email} history={this.props.history} />

                                </TabPanel>


                                {/* Task Panel */}

                                <TabPanel>

                                    {/* <CaseTask lead="CASE" LeadId={this.state.Case_Id} showMsg={this.showMsg} history={this.props.history} /> */}
                           <Task_ListAssigned lead="CASE" LeadId={this.state.Case_Id}/>
                                </TabPanel>

                            </Tabs>

                            {/* -- The Modal(popup) opens onclick of mail btn -- */}
                            <div className="modal" style={{ display: this.state.showMailPopup }} >
                                <div className="modal-content">

                                    <Case_Mail LeadId={this.state.Case_Id} to={this.state.email} iscase={'CASE'}  FULLNM={this.state.Client_Name} closeMailPopup={this.closeMailPopup} showMsg={this.showMsg} />
                                </div>
                            </div>
                            <div className="modal" style={{ display: this.state.showTaskPopup}} >
                                <div className="modal-content">

                                    {this.state.showTaskPopup==='none'?null:<Task_Add taskofid={this.props.location.state.data.CIDSYS} taskof={"Case"}
                                    //FULLNM={this.props.location.state.data.FULLNM} 
                                    //MailFrom={this.props.location.state.data.EMAILID} 
                                closeTaskPopup={this.closeTaskPopup} showMsg={this.showMsg} TaskType={"AssignedTask"}/> }  
                                </div>
                            </div>     

                        </div>
                    </div>
                </div>

            );
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