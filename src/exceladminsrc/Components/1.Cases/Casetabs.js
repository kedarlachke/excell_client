import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Asset_Search from '../Cases/Asset_Search';
import Process_Server from '../Cases/Process_Server';
import Locate_People from '../Cases/Locate_People';
import Infidelity from '../Cases/Infidelity';
import Child_Custody from '../Cases/Child_Custody';
import Workers_Comp from '../Cases/Workers_Comp';
import Others from '../Cases/Others';
import ClientDetails from '../Client/Client'
import InfidelityContract from '../Contract/InfidelityContract'
import LocateContract from '../Contract/locateContract'
import ProcessContract from '../Contract/processContract'
import Custom_Contract from '../Contract/CustomContract'
import CardAuthorization from '../Authorization/CardAuthorization'
import ECheckAuthorization from '../Authorization/eCheckAuthorization'
import OtherAuthorization from '../Authorization/OtherAuthorization'
import Invoice from '../Billing/Invoice';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { DropdwonQueryLeads, AuthorizationDetails ,contractDetails} from '../Queries/queries';
var DropdownCasesList = [];
export default class TabComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            SERVICETYP: "",
            Contract_Typ:"",
            Auth_Typ: "",
            Auth_Data:"",
            Case_Typ: "",
            DispalyComp: true,
            DisplayAuthBtn: 'flex',
            tabIndex: 0,
            CLIENTID: "",
            CIDSYS: "",
            Client_Name: "",
            CASEDT: "",
            CLIENTID: "",
            PRIORITY: "",
            ASSIGNUSER: "",
            DropdownCasesListArr: [],
            OnClickAuthbtn: "",
            Case_Id: "",
        }

        this.gotoCaseType = this.gotoCaseType.bind(this);
        this.gotoCustomContract = this.gotoCustomContract.bind(this)
    };

    async  componentDidMount() {
        console.log("componentDidMount in tabs");
        //  console.log(this.props.location.state.data.SERVICETYPE);
         //console.log(this.props.location.state.data.SERVICETYP);
        // console.log(this.props.location.state.data.ASSIGNUSER);
        this.DropdownCases();
        if (this.props.location.state) {
            await this.setState({
                SERVICETYP: this.props.location.state.data.SERVICETYP,
                CIDSYS: this.props.location.state.data.CIDSYS,
                Client_Name: this.props.location.state.data.FRSTNM,
                CASEDT: this.formatDate(this.props.location.state.data.CASEDT),
                PRIORITY: this.props.location.state.data.PRIORITY,
                ASSIGNUSER: this.props.location.state.data.ASSIGNUSER,
                DispalyComp: !this.state.DispalyComp,
            });
            this.PopulateAuthData();
            this.PopulateContractData();
        }
    };

    // To Set Dropdwon Values

    async DropdownCases() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', DropdwonQueryLeads, this.setDropdownParams())
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

            DropdownCasesList = []
            DropdownCasesList.push({
                "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                "ASSIGN_TO": result.data.ASSIGN_TO,
            })
            this.setState({ DropdownCasesListArr: DropdownCasesList })
        }
    };

    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters

    };

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
               
            if (result.data.Card.length != 0) {
               await this.setState({ Auth_Typ: 'Card', DisplayAuthBtn: 'none' ,Auth_Data:result.data.Card});
            }
            else if (result.data.Cash.length != 0) {
               await this.setState({ Auth_Typ: 'Cash', DisplayAuthBtn: 'none',Auth_Data:result.data.Cash });
            }
            else if (result.data.Check.length != 0) {
               await this.setState({ Auth_Typ: 'Check', DisplayAuthBtn: 'none',Auth_Data:result.data.Check });
            }
        }
    };

    setParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CIDSYS": this.state.CIDSYS
        }
        return parameters

    };


       // To Populate Contract Data and set Contract_Typ
       async PopulateContractData() {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', contractDetails, this.setContractParams())
            console.log(result);
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
            if(result.data.contractDetails.length!=0)
            {
            this.setState({
               
                Contract_Typ:result.data.contractDetails[0].SERVICETYPE,
              
            });
        }
        }

    };

     setContractParams() {
        var parameters = {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS":this.state.CIDSYS
        }
        return parameters

    };

    // Go To Next Tab and set Client Id & Case Id
    async  gotoCaseType(CID, CaseId) {
        console.log(`caseid${CaseId}`);
        await this.setState({
            tabIndex: this.state.tabIndex + 1,
            CLIENTID: CID,
            Case_Id: CaseId
        })

        //  console.log(this.state.tabIndex)
    };

    // To Open Custom Contract in Same Tab
    async  gotoCustomContract(casetyp) {
        console.log(`caseid${casetyp}`);
        await this.setState({
            Case_Typ: casetyp
        })

        //  console.log(this.state.tabIndex)
    };

    //..............Date Formate Convertion..........
    formatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)

        var date_format = month + '/' + day + '/' + year
        return date_format
    };

    render() {
        //console.log(this.state.CIDSYS);
        return (
            <div className="ui three column stackable grid">
                <h1 id="title_header"></h1>
                <div className="row">
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                    <div className="five wide computer five wide tablet five wide mobile column">
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{"CASE ID : " + this.state.CIDSYS + " | " + " CLIENT NAME : " + this.state.Client_Name}</div>
                        <div style={{ fontSize: 12, fontWeight: 600 }} >{"Service type: " + this.state.SERVICETYP + " | " + "Last Update On : " + this.state.CASEDT}</div>
                    </div>
                    <div className="three wide computer three wide tablet three wide mobile column">
                    </div>
                    {/* <div className="five wide computer five wide tablet five wide mobile column ">
                        <div className="ui form">
                            <div className="ui three column stackable grid">
                                <div className="row">
                                    <div className=" seven wide column">
                                        <label>Assign To</label>
                                        <select  className="" disabled={true} value={this.state.ASSIGNUSER} onChange={e => this.setState({ ASSIGNUSER: e.target.value })}>
                                            <option value="">Select</option>
                                            {this.state.DropdownCasesListArr.map((data) => data.ASSIGN_TO.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>))}
                                        </select>
                                    </div>
                                    <div className=" seven wide column">
                                        <label>Status</label>
                                        <select className="" disabled value={this.state.PRIORITY} onChange={e => this.setState({ PRIORITY: e.target.value })}>
                                            <option value="">Select</option>
                                            {this.state.DropdownCasesListArr.map((data) => data.PRIORITY_LEVEL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>))}
                                        </select>
                                    </div>
                                    <div className="field two wide column">
                                        <div id="gridbutton" className="ui  button" tabIndex="0" style={{ marginTop: 22 }} >
                                            <i id="gridicon" className="edit icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                <div className="row">
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                    <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })} >
                            <TabList>
                                <Tab >Client Details </Tab>
                                {this.state.DispalyComp ? <Tab >Case Type</Tab> : null}
                                <Tab >Case Details</Tab>
                                <Tab >Contracts & Agreements</Tab>
                                <Tab >Authorization</Tab>
                                <Tab >Invoice</Tab>
                            </TabList>

                            {/* Client Details Panel */}

                            <TabPanel>
                                <ClientDetails gotoCaseType={this.gotoCaseType} data={this.props.location.state} history={this.props.history} />
                            </TabPanel>

                            {/* Case Type Panel */}

                            {
                                this.state.DispalyComp ? <TabPanel>
                                    <div className=" row" style={{ display: this.state.DispalyComp ? 'flex' : 'none', marginLeft: 10 }}>
                                        <div className="ten wide column">

                                            <button className="ui primary button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "Asset Search" })}>Asset Search</button>

                                            <button className="ui primary button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "Infidelity" })}>Infidelity</button>

                                            <button className="ui primary  button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "Process Server" })}>Process Server</button>

                                            <button className="ui primary  button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "Locate People" })}>Locate People</button>

                                            <button className="ui primary button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "Other Cases" })}>Other Cases</button>

                                            <button className="ui primary  button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "Child Custody" })}>Child Custody</button>

                                            <button className="ui primary  button" type="submit" onClick={() => this.setState({ tabIndex: 2, Case_Typ: "Workers Comp" })}>Workers Comp</button>

                                        </div>
                                    </div>
                                </TabPanel> : null
                            }

                            {/* Case Details Panel */}

                            <TabPanel>
                                {
                                    this.state.Case_Typ == 'Asset Search' ? <Asset_Search gotoCaseType={this.gotoCaseType} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                        this.state.Case_Typ == 'Infidelity' ? <Infidelity gotoCaseType={this.gotoCaseType} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                            this.state.Case_Typ == 'Process Server' ? <Process_Server gotoCaseType={this.gotoCaseType} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                                this.state.Case_Typ == 'Locate People' ? <Locate_People gotoCaseType={this.gotoCaseType} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                                    this.state.Case_Typ == 'Other Cases' ? <Others setCaseId={this.setCaseId} gotoCaseType={this.gotoCaseType} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                                        this.state.Case_Typ == 'Child Custody' ? <Child_Custody gotoCaseType={this.gotoCaseType} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                                            this.state.Case_Typ == 'Workers Comp' ? <Workers_Comp gotoCaseType={this.gotoCaseType} CLIENTID={this.state.CLIENTID} history={this.props.history} /> : null
                                }
                                {
                                    this.state.SERVICETYP == 'Asset Search' ? <Asset_Search gotoCaseType={this.gotoCaseType} data={this.props.location.state.data.CIDSYS} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                        this.state.SERVICETYP == 'Infidelity' ? <Infidelity gotoCaseType={this.gotoCaseType} data={this.props.location.state.data.CIDSYS} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                            this.state.SERVICETYP == 'Process Server' ? <Process_Server gotoCaseType={this.gotoCaseType} data={this.props.location.state.data.CIDSYS} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                                this.state.SERVICETYP == 'Locate People' ? <Locate_People gotoCaseType={this.gotoCaseType} data={this.props.location.state.data.CIDSYS} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                                    this.state.SERVICETYP == 'Other Cases' ? <Others gotoCaseType={this.gotoCaseType} data={this.props.location.state.data.CIDSYS} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                                        this.state.SERVICETYP == 'Child Custody' ? <Child_Custody gotoCaseType={this.gotoCaseType} data={this.props.location.state.data.CIDSYS} CLIENTID={this.state.CLIENTID} history={this.props.history} /> :
                                                            this.state.SERVICETYP == 'Workers Comp' ? <Workers_Comp gotoCaseType={this.gotoCaseType} data={this.props.location.state.data.CIDSYS} CLIENTID={this.state.CLIENTID} history={this.props.history} /> : null
                                }
                            </TabPanel>

                            {/* Contract Panel */}

                            <TabPanel>
                                {
                                    this.state.Case_Typ == 'Asset Search' ? <ProcessContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} SERVICETYP={this.state.Case_Typ} gotoCaseType={this.gotoCaseType} gotoCustomContract={this.gotoCustomContract} history={this.props.history} /> :
                                        this.state.Case_Typ == 'Infidelity' ? <InfidelityContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} SERVICETYP={this.state.Case_Typ} gotoCaseType={this.gotoCaseType} gotoCustomContract={this.gotoCustomContract} history={this.props.history} /> :
                                            this.state.Case_Typ == 'Process Server' ? <ProcessContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} SERVICETYP={this.state.Case_Typ} gotoCaseType={this.gotoCaseType} gotoCustomContract={this.gotoCustomContract} history={this.props.history} /> :
                                                this.state.Case_Typ == 'Locate People' ? <LocateContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} SERVICETYP={this.state.Case_Typ} gotoCaseType={this.gotoCaseType} gotoCustomContract={this.gotoCustomContract} history={this.props.history} /> :
                                                    this.state.Case_Typ == 'Other Cases' ? <ProcessContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} SERVICETYP={this.state.Case_Typ} gotoCaseType={this.gotoCaseType} gotoCustomContract={this.gotoCustomContract} history={this.props.history} /> :
                                                        this.state.Case_Typ == 'Child Custody' ? <ProcessContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} SERVICETYP={this.state.Case_Typ} gotoCaseType={this.gotoCaseType} gotoCustomContract={this.gotoCustomContract} history={this.props.history} /> :
                                                            this.state.Case_Typ == 'Workers Comp' ? <ProcessContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} SERVICETYP={this.state.Case_Typ} gotoCaseType={this.gotoCaseType} gotoCustomContract={this.gotoCustomContract} history={this.props.history} /> :
                                                                this.state.Case_Typ == 'Custom' ? <Custom_Contract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id}  SERVICETYP={this.state.Case_Typ}  gotoCaseType={this.gotoCaseType} history={this.props.history}/> : null
                                }

                               {
                                    this.state.Contract_Typ == 'Asset Search' ? <ProcessContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} data={this.props.location.state.data.CIDSYS} SERVICETYP={this.state.SERVICETYP} gotoCustomContract={this.gotoCustomContract} gotoCaseType={this.gotoCaseType} history={this.props.history} /> :
                                        this.state.Contract_Typ == 'Infidelity' ? <InfidelityContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} data={this.props.location.state.data.CIDSYS} SERVICETYP={this.state.SERVICETYP} gotoCustomContract={this.gotoCustomContract} gotoCaseType={this.gotoCaseType} history={this.props.history} /> :
                                            this.state.Contract_Typ == 'Process Server' ? <ProcessContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} data={this.props.location.state.data.CIDSYS} SERVICETYP={this.state.SERVICETYP} gotoCustomContract={this.gotoCustomContract} gotoCaseType={this.gotoCaseType} history={this.props.history} /> :
                                                this.state.Contract_Typ == 'Locate People' ? <LocateContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} data={this.props.location.state.data.CIDSYS} SERVICETYP={this.state.SERVICETYP} gotoCustomContract={this.gotoCustomContract} gotoCaseType={this.gotoCaseType} history={this.props.history} /> :
                                                    this.state.Contract_Typ == 'Other Cases' ? <ProcessContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} data={this.props.location.state.data.CIDSYS} SERVICETYP={this.state.SERVICETYP} gotoCustomContract={this.gotoCustomContract} gotoCaseType={this.gotoCaseType} history={this.props.history} /> :
                                                        this.state.Contract_Typ == 'Child Custody' ? <ProcessContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} data={this.props.location.state.data.CIDSYS} SERVICETYP={this.state.SERVICETYP} gotoCustomContract={this.gotoCustomContract} gotoCaseType={this.gotoCaseType} history={this.props.history} /> :
                                                            this.state.Contract_Typ == 'Workers Comp' ? <ProcessContract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} data={this.props.location.state.data.CIDSYS} SERVICETYP={this.state.SERVICETYP} gotoCustomContract={this.gotoCustomContract} gotoCaseType={this.gotoCaseType} history={this.props.history} /> :
                                                            this.state.Contract_Typ == 'Custom' ? <Custom_Contract CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} data={this.props.location.state.data.CIDSYS} SERVICETYP={this.state.SERVICETYP}  gotoCaseType={this.gotoCaseType} history={this.props.history} /> : null
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
                                    this.state.OnClickAuthbtn == 'eCheck Authorization' ? <ECheckAuthorization CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} history={this.props.history} /> :
                                        this.state.OnClickAuthbtn == 'Card Authorization' ? <CardAuthorization CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} history={this.props.history} /> :
                                            this.state.OnClickAuthbtn == 'Cash/Other' ? <OtherAuthorization CLIENTID={this.state.CLIENTID} Case_Id={this.state.Case_Id} history={this.props.history} /> : null
                                }

                                {
                                    this.state.Auth_Typ == 'Check' ? <ECheckAuthorization CLIENTID={this.state.CLIENTID} data={this.state.Auth_Data} history={this.props.history} /> :
                                        this.state.Auth_Typ == 'Card' ? <CardAuthorization CLIENTID={this.state.CLIENTID} data={this.state.Auth_Data} history={this.props.history} /> :
                                            this.state.Auth_Typ == 'Cash' ? <OtherAuthorization CLIENTID={this.state.CLIENTID} data={this.state.Auth_Data} history={this.props.history} /> : null
                                }

                            </TabPanel>

                            <TabPanel>
                                            <Invoice  />
                                        </TabPanel>




                        </Tabs>
                    </div>
                </div>
            </div>

        );
    }
}