import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { CasesCRUDOpsQuery, DropdwonQueryLeads, caseDetails } from '../Queries/queries';
import { caseState, setSearchParams, setDropdownParams, setCRUDParams } from './caseExport';
var DropdownCasesList = [];
var errorval = false
export default class CaseGeneric extends Component {
    constructor(props) {
        super(props)
        this.state = caseState(this.props.caseType, 'caseGetInitialState');
    };

    async componentDidMount() {

        console.log(this.props.CLIENTID);

        // To Show Msg When User Don't save Client details First
        if (!this.props.CLIENTID) {
            this.showMsg(`Client details not save. Please save client details first`, true);
            this.gotoPreviousTab(0)
        }
        // console.log(this.props.CLIENTID);

        await this.DropdownCases(this.props.caseType);

        // Populate Data When Edit Mode
        if (this.props.data) {
            this.setState({
                // Dispalycomp: !this.state.Dispalycomp
            });
            await this.PopulateData(this.props.data);
        };

        // Populate Data when back to Case tab
        if (this.props.Case_Id) {
            this.setState({
                // Dispalycomp: !this.state.Dispalycomp
            });
            await this.PopulateData(this.props.Case_Id);
        };




    };

    // Populate Data 
    async PopulateData(CaseId) {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', caseDetails, setSearchParams(CaseId))
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
            // console.log(result.data.caseDetails.length);
            if (result.data.caseDetails.length != 0) {
                await this.setState({
                    Dispalycomp: !this.state.Dispalycomp
                })
                // console.log('props type0');
                // console.log(this.props.caseType);
                // console.log('props type1');
                await this.setState(caseState(this.props.caseType, 'caseGetResultState', result));
                this.setState({ Dispalycomp: !this.state.Dispalycomp });
            }


            // console.log(this.state.Accounts);
            //console.log(this.state.Accountschk);
            if (this.props.caseType == 'ASSET_SEARCH') {

                if (this.state.Accounts == 'Y') {
                    this.setState({ Accountschk: true })
                }

                if (this.state.Carbotvs == 'Y') {
                    this.setState({ Carbotvschk: true })
                }

                if (this.state.Srcofincm == 'Y') {
                    this.setState({ Srcofincmchk: true })
                }

                if (this.state.Landprpty == 'Y') {
                    this.setState({ Landprptychk: true })
                }

                if (this.state.HiddenAsset == 'Y') {
                    this.setState({ HiddenAssetchk: true })
                }

                if (this.state.BusOrCrop == 'Y') {
                    this.setState({ BusOrCropchk: true })
                }

                if (this.state.Other == 'Y') {
                    this.setState({ Otherchk: true })
                }

            }
        }

    };



    // To Set Dropswon Values

    async DropdownCases(caseType) {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', DropdwonQueryLeads, setDropdownParams())
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

            if (caseType == 'ASSET_SEARCH') {
                await DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO,
                    "STATES": result.data.STATES,
                    "BUSINESS_TYPES": result.data.BUSINESS_TYPES

                });
                await this.setState({ DropdownCasesListArr: DropdownCasesList });
            }

            if (caseType == 'CHILD_CUSTODY') {
                await DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO,
                    "STATES": result.data.STATES
                });
                await this.setState({ DropdownCasesListArr: DropdownCasesList });
            }

            if (caseType == 'INFIDELITY') {
                await DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO
                });
                await this.setState({ DropdownCasesListArr: DropdownCasesList });
            }

            if (caseType == 'LOCATE_PEOPLE') {
                await DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO,
                    "STATES": result.data.STATES,
                    "BUSINESS_TYPES": result.data.BUSINESS_TYPES
                })
                await this.setState({ DropdownCasesListArr: DropdownCasesList })
            }

            if (caseType == 'OTHER_CASE') {
                await DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO,
                    "STATES": result.data.STATES,
                    "BUSINESS_TYPES": result.data.BUSINESS_TYPES,
                    "SERVICE_CATEGORY": result.data.OTHER_SERVICES,
                });
                await this.setState({ DropdownCasesListArr: DropdownCasesList });
            }

            if (caseType == 'WORKERS_COMP') {
                await DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO,
                    "STATES": result.data.STATES
                })
                await this.setState({ DropdownCasesListArr: DropdownCasesList })

            }

            if (caseType == 'PROCESS_SERVER') {
                await DropdownCasesList.push({
                    "BEST_TIME_TO_CALL": result.data.BEST_TIME_TO_CALL,
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO
                });
                await this.setState({ DropdownCasesListArr: DropdownCasesList });
            }



        }
    };


    // To Check Checkboxes
    async isCheck(type) {
        // console.log(type);
        if (type == 'Accounts') {
            await this.setState({ Accountschk: !this.state.Accountschk });
        }
        if (type == "Carbotvs") {
            await this.setState({ Carbotvschk: !this.state.Carbotvschk });
        }
        if (type == "Srcofincm") {
            await this.setState({ Srcofincmchk: !this.state.Srcofincmchk });
        }
        if (type == "Landprpty") {
            await this.setState({ Landprptychk: !this.state.Landprptychk });
        }
        if (type == "HiddenAsset") {
            await this.setState({ HiddenAssetchk: !this.state.HiddenAssetchk });
        }
        if (type == "BusOrCrop") {
            await this.setState({ BusOrCropchk: !this.state.BusOrCropchk });
        }
        if (type == "Other") {
            await this.setState({ Otherchk: !this.state.Otherchk });
        }

        if (this.state.Accountschk == true) {
            this.setState({ Accounts: "Y" });
        }
        else {
            this.setState({ Accounts: "N" });
        }

        if (this.state.Carbotvschk == true) {
            this.setState({ Carbotvs: "Y" });
        }
        else {
            this.setState({ Carbotvs: "N" });
        }

        if (this.state.Srcofincmchk == true) {
            this.setState({ Srcofincm: "Y" });
        }
        else {
            this.setState({ Srcofincm: "N" });
        }

        if (this.state.Landprptychk == true) {
            this.setState({ Landprpty: "Y" });
        }
        else {
            this.setState({ Landprpty: "N" });
        }

        if (this.state.HiddenAssetchk == true) {
            this.setState({ HiddenAsset: "Y" });
        }
        else {
            this.setState({ HiddenAsset: "N" });
        }

        if (this.state.BusOrCropchk == true) {
            this.setState({ BusOrCrop: "Y" });
        }
        else {
            this.setState({ BusOrCrop: "N" });
        }
        if (this.state.Otherchk == true) {
            this.setState({ Other: "Y" });
        }
        else {
            this.setState({ Other: "N" });
        }
    };




     // Navigate To Case List
 navigateToCaseList() {
    if (this.props.isCust) {
        return this.props.history.push('/customerdashboard')
    }
    else {
        return this.props.history.push('/cases')
    
    }

};

    render() {
        console.log(this.props.caseType);
        if (this.state.Dispalycomp) {
            return (this.renderCase(this.props.caseType));
        }
        else {
            return (
                <div className="ui icon header">
                    <div className="ui active loader"></div>
                </div>
            );
        }
    }


    // render Asset Search
    renderCase(caseType) {

        if (caseType == "ASSET_SEARCH") return this.renderAsset_Search();

        if (caseType == "CHILD_CUSTODY") return this.renderChild_Custody();

        if (caseType == "INFIDELITY") return this.renderInfidelity();

        if (caseType == "LOCATE_PEOPLE") return this.renderLocate_People();

        if (caseType == "OTHER_CASE") return this.renderOther();

        if (caseType == "PROCESS_SERVER") return this.renderProcess_Server();

        if (caseType == "WORKERS_COMP") return this.renderWorkers_Comp();
    }

    //  Array To Map
    arrayToMap = (input, CODE = 'CODE', DESC = 'DESC') => {
        return input.reduce((init, next) => {
            init = init || (new Map())
            init.set(next[CODE], next[DESC])
            return init
        }, new Map())
    }

    // render Locate People
    renderLocate_People() {
        console.log("render **** locate people");
        return (
            <div>
                <div className="ui one column grid">
                    <div className=" row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui stackable grid">
                                        <div className="row" />
                                        <div className="row" />

                                        {/* ..................................................................................... */}
                                        <div className=" row" style={{ display: "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui  input disabled">
                                                        <input disabled type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui  input disabled">
                                                        <input disabled type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>First Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.First_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Name</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Spouse</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Spouse}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>AKA’s</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.AKAs}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>DOB</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.DOB}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Business Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Business_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ........................................................ */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Type of Business</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {/* <select disabled className="" value={this.state.Type_of_Business} style={{ borderColor: this.state.errorBUSINESSTYP ? 'brown' : null, backgroundColor: this.state.errorBUSINESSTYP ? '#f3ece7' : null }} onChange={e => this.setState({ Type_of_Business: e.target.value })} >
                                                            <option value="">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.BUSINESS_TYPES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select> */}
                                                        {
                                                            this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].BUSINESS_TYPES).get(this.state.Type_of_Business) : ""
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Business Tax ID</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Business_Tax_ID}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ......................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Known Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Known_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Phone_Number}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ................................................................. */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>City</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.City}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>State</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorSTATE ? 'brown' : null, backgroundColor: this.state.errorSTATE ? '#f3ece7' : null }} value={this.state.State} onChange={e => this.setState({ State: e.target.value })} >
                                                            <option value="">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select> */}

                                                        {
                                                            this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].STATES).get(this.state.State) : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Zip</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Zip}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Known Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Known_Address1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Phone_Number1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ............................................................................ */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>City</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.City1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>State</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorSTATE2 ? 'brown' : null, backgroundColor: this.state.errorSTATE2 ? '#f3ece7' : null }} value={this.state.State1} onChange={e => this.setState({ State1: e.target.value })} >
                                                            <option value="">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select> */}
                                                        {
                                                            this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].STATES).get(this.state.State1) : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Zip</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Zip1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*.................................................................................  */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Employed By</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Employed_By}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*.................................................................................  */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Employer’s Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Employee_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Phone_Number2}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ........................................................................ */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>City</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.City2}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>State</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorEMPSTATE ? 'brown' : null, backgroundColor: this.state.errorEMPSTATE ? '#f3ece7' : null }} value={this.state.State2} onChange={e => this.setState({ State2: e.target.value })} >
                                                            <option value="">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select > */}
                                                        {
                                                            this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].STATES).get(this.state.State2) : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Zip</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Zip2}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ......................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Social Security Subject</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Social_Security_Subject}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Social Security Spouse</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Social_Security_Spouse}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ......................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Driver’s License Subject</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Drivers_License_Subject}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Driver’s License Spouse</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Drivers_License_Spouse}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* .............................................................. */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Who was the last person the subject was last seen with and describe the last events leading up to the missing?</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Events_Leading}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ........................................................................ */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>What are some of the locations the subject frequents?</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Subject_Frequents}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ........................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>What are his hobbies, if any ?</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Hobbies}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>List Locations of Address where the subject might potentially be ?</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.List_Locations}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ....................................................................... */}
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column" />
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column" />
                </div>

            </div>
        )
    }




    // render Other
    // render Other
    renderOther() {
        return (
            <div>
                <div className="ui one column grid">
                    <div className=" row">

                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui grid">

                                        <div className="row" />
                                        <div className="row" />

                                        {/* ..................................................................................... */}
                                        <div className=" row" style={{ display: "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui input disabled">
                                                        <input disabled type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui input disabled">
                                                        <input disabled type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                       <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                            <div className="field">
                                                    <label>Service Type</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {
                                                            this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].SERVICE_CATEGORY).get(this.state.Service_Type) : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                {/*............................................  */}
                                <div className="six wide computer three wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>First Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.First_Name}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Spouse</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Spouse}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* ..................................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>AKA’s</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.AKAs}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >DOB</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.DOB}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Business Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Business_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ..................................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Type of Business</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {
                                                            this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].BUSINESS_TYPES).get(this.state.Type_of_Business) : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Business Tax ID</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Business_Tax_ID}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
 {/* ..................................................................................... */}

                                 
                                     
 {/* ..................................................................................... */}
                                      
                                
                                        {/* ..................................................................................... */}
                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Known Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Known_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Phone_Number}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*............................................  */}

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>City</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.City}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>State</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {
                                                            this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].STATES).get(this.state.State) : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Zip Code</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Zip}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Known Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Known_Address1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Phone_Number1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*............................................  */}

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>City</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.City1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>State</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {
                                                            this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].STATES).get(this.state.State1) : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Zip Code</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Zip1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Employed By</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Employed_By}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Employer’s Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Employee_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Phone_Number2}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>City</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.City2}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>State</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="ui right icon input">
                                                    {
                                                        this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].STATES).get(this.state.State2) : ""
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Zip Code</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Zip2}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Social Security Subject</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Social_Security_Subject}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Social Security Spouse</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Social_Security_Spouse}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Driver’s License Subject</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Drivers_License_Subject}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Driver’s License Spouse</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Drivers_License_Spouse}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                         {/* ..................................................................................... */}
                                        
                                         <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label > Tell us more about the subject/business?</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.ABOUTBUSINESS}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*.................................................................................. */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label > What are some of the locations the subject frequents?</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.SUBJECT_FREQUENTS}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*.................................................................................. */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >   Please explain in detail what you are seeking to accomplish with this investigation request? What are you overall objectives?</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.OVERALL_OBJ}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*.................................................................................. */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >   How did you hear about us?</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.HEARABOUTUS}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*.................................................................................. */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >   Deadline to complete investigation</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.DEADLINE}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>{/*.................................................................................. */}
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                </div>

            </div>

        )
    }



    // render Process Server
    renderProcess_Server() {

        return (
            <div>
                <div className="ui one column grid">
                    <div className=" row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui  stackable grid">

                                        <div className="row" />
                                        <div className="row" />
                                        {/* ................................................................................. */}

                                        <div className=" row" style={{ display: "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui  input disabled">
                                                        <input disabled type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui  input disabled">
                                                        <input disabled type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*...............................................................................................  */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Date</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Court</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Court}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ....................................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>File#</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.File}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Date To Serve</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Date_To_Serve}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ............................................................................. */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Type</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Type}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ............................................................................. */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Hearing Set For</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Hearing_Set_For}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>AT</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.AT}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Department</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Department}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ............................................................................ */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Miscellaneous Instructions</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Miscellaneous_Instructions}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ........................................................................................ */}
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Subject Information</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        {/* ........................................................................................ */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>First Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.First_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* .................................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Gender</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Sex}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorSEX ? 'brown' : null, backgroundColor: this.state.errorSEX ? '#f3ece7' : null }} value={this.state.Sex} onChange={e => this.setState({ Sex: e.target.value })}>
                                                            <option value="">Select</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Age</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Age}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Race</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Race}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ................................................................................ */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Height</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Height}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Weight</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Weight}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Hair Color</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Hair_Color}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ............................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Residence Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Residence_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ............................................................. */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Business Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Business_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ............................................................................. */}
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Serve Information</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        {/* ................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Best Time To Serve</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        <select disabled className="" style={{ borderColor: this.state.errorBTTMTOSERV ? 'brown' : null, backgroundColor: this.state.errorBTTMTOSERV ? '#f3ece7' : null }} value={this.state.Best_Time_To_Serve} onChange={e => this.setState({ Best_Time_To_Serve: e.target.value })}>
                                                            <option value="Select">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.BEST_TIME_TO_CALL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Hours Of Work</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Hours_Of_Work}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* .................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Please Make Attempt At</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Please_Make_Attempt_At}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* .............................................................................. */}
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column" />
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column" />
                </div>
            </div>

        )
    }


    // render Workers Comp
    renderWorkers_Comp() {

        return (
            <div>
                <div className="ui one column grid">
                    <div className=" row">

                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui stackable grid">
                                        <div className="row" />
                                        <div className="row" />
                                        {/* ..................................................................................... */}
                                        <div className=" row" style={{ display: "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui input disabled">
                                                        <input disabled type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui input disabled">
                                                        <input disabled type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Surveillance (Start date)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.SurveillanceStartdate}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Surveillance (End date)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.SurveillanceEnddate}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ....................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>GPS Needed (Y/N)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.GPSNeeded}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorISGPSNEEDED ? 'brown' : null, backgroundColor: this.state.errorISGPSNEEDED ? '#f3ece7' : null }} value={this.state.GPSNeeded} onChange={e => this.setState({ GPSNeeded: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Please explain in detail what action you are looking for</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.ActionYouAreLookingFor}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ...................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Are there specific days for surveillance to be conducted</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.DaysForSurveillanceToBeConducted}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ............................................................................ */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>If 2 investigators are needed, do we have the permission to move forward (Y/N)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.PermissionToMoveForward}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null, backgroundColor: this.state.errorISIFTWOINVESTIGATORS ? '#f3ece7' : null }} value={this.state.PermissionToMoveForward} onChange={e => this.setState({ PermissionToMoveForward: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select > */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Have you previously conducted any surveillance on the subject (Y/N)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.ConductedAnySurveillanceOnTheSubject}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorISPREVIOUSSUR ? 'brown' : null, backgroundColor: this.state.errorISPREVIOUSSUR ? '#f3ece7' : null }} value={this.state.ConductedAnySurveillanceOnTheSubject} onChange={e => this.setState({ ConductedAnySurveillanceOnTheSubject: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ......................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Budget for the Investigation</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.BudgetfortheInvestigation}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>How did you hear about us ?</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.HearAboutUs}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ..................................................................................................................... */}
                                        <div className="one wide computer one wide tablet one wide mobile row" />

                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Subject Information</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        {/* ........................................................................................................................ */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>First Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.First_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ....................................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Gender</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Sex}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorSEX ? 'brown' : null, backgroundColor: this.state.errorSEX ? '#f3ece7' : null }} value={this.state.Sex} onChange={e => this.setState({ Sex: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="M">M</option>
                                                            <option value="F">F</option>
                                                        </select > */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Age</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Age}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Race</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Race}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Height</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Height}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Weight</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Weight}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Hair Color</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Hair_Color}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ........................................................................ */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Residence Address</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Residence_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ................................................................. */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Business Address</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Business_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ................................................................................... */}


                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Vehicle Info</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>



                                        <div className=" row" >

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorLICENSEPLATE ? 'brown' : null }}>License Plate #</label>
                                                    <input disabled type="text" style={{ borderColor: this.state.errorLICENSEPLATE ? 'brown' : null, backgroundColor: this.state.errorLICENSEPLATE ? '#f3ece7' : null }} name="LicensePlate" value={this.state.LicensePlate} onChange={e => this.setState({ LicensePlate: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLICENSEPLATE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCMAKE ? 'brown' : null }}>Make</label>
                                                    <input disabled type="text" style={{ borderColor: this.state.errorCMAKE ? 'brown' : null, backgroundColor: this.state.errorCMAKE ? '#f3ece7' : null }} name="Make" value={this.state.Make} onChange={e => this.setState({ Make: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCMAKE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCMODEL ? 'brown' : null }}>Model</label>
                                                    <input disabled type="text" style={{ borderColor: this.state.errorCMODEL ? 'brown' : null, backgroundColor: this.state.errorCMODEL ? '#f3ece7' : null }} name="Model" value={this.state.Model} onChange={e => this.setState({ Model: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCMODEL}</span> : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCDESCRIPTION ? 'brown' : null }} >Description</label>
                                                    <div className="ui input disabled">
                                                        <input disabled type="text" style={{ borderColor: this.state.errorCDESCRIPTION ? 'brown' : null, backgroundColor: this.state.errorCDESCRIPTION ? '#f3ece7' : null }} name="Description" value={this.state.Description} onChange={e => this.setState({ Description: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCDESCRIPTION}</span> : null}
                                                </div>
                                            </div>
                                        </div>



                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Adjuster’s Info</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>


                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISSUBREPRESENT ? 'brown' : null }}>Is the subject represented by an attorney</label>
                                                    {this.state.SubjectRepresentedByAttorney}
                                                    {/* <select disabled className="" style={{ borderColor: this.state.errorISSUBREPRESENT ? 'brown' : null, backgroundColor: this.state.errorISSUBREPRESENT ? '#f3ece7' : null }} value={this.state.SubjectRepresentedByAttorney} onChange={e => this.setState({ SubjectRepresentedByAttorney: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select> */}

                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISSUBREPRESENT}</span> : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCLAIM ? 'brown' : null }}>Claim #</label>
                                                    <div className="ui input disabled">
                                                        <input disabled type="text" style={{ borderColor: this.state.errorCLAIM ? 'brown' : null, backgroundColor: this.state.errorCLAIM ? '#f3ece7' : null }} name="Claim" value={this.state.Claim} onChange={e => this.setState({ Claim: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCLAIM}</span> : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorADJFIRSTNM ? 'brown' : null }}>First Name</label>
                                                    <div className="ui right icon input disabled">
                                                        <i className="user icon"></i>
                                                        <input disabled type="text" style={{ borderColor: this.state.errorADJFIRSTNM ? 'brown' : null, backgroundColor: this.state.errorADJFIRSTNM ? '#f3ece7' : null }} name="FirstName_Adjuster" value={this.state.FirstName_Adjuster} onChange={e => this.setState({ FirstName_Adjuster: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorADJFIRSTNM}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorADJLASTNM ? 'brown' : null }}>Last Name</label>
                                                    <div className="ui right icon input disabled">
                                                        <i className="user icon"></i>
                                                        <input disabled type="text" style={{ borderColor: this.state.errorADJLASTNM ? 'brown' : null, backgroundColor: this.state.errorADJLASTNM ? '#f3ece7' : null }} name="LastName_Adjuster" value={this.state.LastName_Adjuster} onChange={e => this.setState({ LastName_Adjuster: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorADJLASTNM}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMAIL ? 'brown' : null }}>Email</label>
                                                    <div className="ui right icon input disabled">
                                                        <i className="user icon"></i>
                                                        <input disabled type="text" name="Email" style={{ borderColor: this.state.errorEMAIL ? 'brown' : null, backgroundColor: this.state.errorEMAIL ? '#f3ece7' : null }} value={this.state.Email} onChange={e => this.setState({ Email: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMAIL}</span> : null}
                                                </div>
                                            </div>
                                            <div className="three wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPHONE ? 'brown' : null }}>Phone Number</label>
                                                    <div className="ui right icon input disabled">
                                                        <i className="user icon"></i>
                                                        <input disabled type="text" style={{ borderColor: this.state.errorPHONE ? 'brown' : null, backgroundColor: this.state.errorPHONE ? '#f3ece7' : null }} name="PhoneNumber" value={this.state.PhoneNumber} onChange={e => this.setState({ PhoneNumber: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPHONE}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorADJADDRESS ? 'brown' : null }}>Address</label>
                                                    <div className="ui input disabled">
                                                        <input disabled type="text" style={{ borderColor: this.state.errorADJADDRESS ? 'brown' : null, backgroundColor: this.state.errorADJADDRESS ? '#f3ece7' : null }} name="Address" value={this.state.Address} onChange={e => this.setState({ Address: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorADJADDRESS}</span> : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCITY ? 'brown' : null }} >City</label>
                                                    <div className="ui input disabled">
                                                        <input disabled type="text" style={{ borderColor: this.state.errorCITY ? 'brown' : null, backgroundColor: this.state.errorCITY ? '#f3ece7' : null }} name="City" value={this.state.City} onChange={e => this.setState({ City: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCITY}</span> : null}
                                                </div>
                                            </div>

                                            <div className="three wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSTATE ? 'brown' : null }} >State</label>
                                                    {/* <select disabled className="" style={{ borderColor: this.state.errorSTATE ? 'brown' : null, backgroundColor: this.state.errorSTATE ? '#f3ece7' : null }} value={this.state.State} onChange={e => this.setState({ State: e.target.value })}>
                                                        <option>Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select > */}
                                                    {
                                                        this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].STATES).get(this.state.State) : ""
                                                    }
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSTATE}</span> : null}
                                                </div>
                                            </div>

                                            <div className="two wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorZIPCD ? 'brown' : null }} >Zip Code</label>
                                                    <div className="ui input disabled">
                                                        <input disabled type="text" style={{ borderColor: this.state.errorZIPCD ? 'brown' : null, backgroundColor: this.state.errorZIPCD ? '#f3ece7' : null }} name="ZipCode" value={this.state.ZipCode} onChange={e => this.setState({ ZipCode: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorZIPCD}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSUBINJURYCLAIM ? 'brown' : null }}>Explain Claim of injury or subject’s conditions</label>
                                                    <div className="ui input disabled">
                                                        <textarea rows="2" style={{ borderColor: this.state.errorSUBINJURYCLAIM ? 'brown' : null, backgroundColor: this.state.errorSUBINJURYCLAIM ? '#f3ece7' : null }} name="ClaimOfInjury" value={this.state.ClaimOfInjury} onChange={e => this.setState({ ClaimOfInjury: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSUBINJURYCLAIM}</span> : null}
                                                </div>
                                            </div>
                                        </div>


                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column" />
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column" />
                </div>

            </div>
        )
    }


    // render Asset Search
    renderAsset_Search() {
        return (
            <div>
                <div className="ui one column grid">
                    <div className=" row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui stackable grid">

                                        <div className="row" />
                                        <div className="row" />

                                        {/*............................................  */}
                                        <div className=" row" style={{ display: "none", border: 3 }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui  input disabled">
                                                        <input disabled type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui  input disabled">
                                                        <input disabled type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*............................................  */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>First Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.First_Name}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Spouse</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Spouse}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/* ..................................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>AKA’s</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.AKAs}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >DOB</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.DOB}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Business Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Business_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ..................................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Type of Business</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {/* <select className="" value={this.state.Type_of_Business}   >
                                                            <option value="">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.BUSINESS_TYPES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select> */}

                                                        {
                                                            this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].BUSINESS_TYPES).get(this.state.Type_of_Business) : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Business Tax ID</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Business_Tax_ID}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ..................................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Known Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Known_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Phone_Number}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>City</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.City}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>State</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorSTATE ? 'brown' : null, backgroundColor: this.state.errorSTATE ? '#f3ece7' : null }} value={this.state.State} onChange={e => this.setState({ State: e.target.value })} >
                                                            <option value="">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select> */}

                                                        {
                                                            this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].STATES).get(this.state.State) : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Zip Code</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Zip}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Known Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Known_Address1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Phone_Number1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>City</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.City1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>State</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorSTATE2 ? 'brown' : null, backgroundColor: this.state.errorSTATE2 ? '#f3ece7' : null }} value={this.state.State1} onChange={e => this.setState({ State1: e.target.value })} >
                                                            <option value="">Select</option>
                                                            {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                        </select> */}
                                                        {
                                                            this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].STATES).get(this.state.State1) : ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Zip Code</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Zip1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*............................................  */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Employed By</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Employed_By}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Employer’s Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Employee_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Phone Number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Phone_Number2}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>City</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.City2}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>State</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="ui right icon input">
                                                    {/* <select disabled className="" style={{ borderColor: this.state.errorEMPSTATE ? 'brown' : null, backgroundColor: this.state.errorEMPSTATE ? '#f3ece7' : null }} value={this.state.State2} onChange={e => this.setState({ State2: e.target.value })} >
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select> */}
                                                    {
                                                        this.state.DropdownCasesListArr.length > 0 ? this.arrayToMap(this.state.DropdownCasesListArr[0].STATES).get(this.state.State2) : ""
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Zip Code</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Zip2}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Social Security Subject</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Social_Security_Subject}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Social Security Spouse</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Social_Security_Spouse}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Driver’s License Subject</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Drivers_License_Subject}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Driver’s License Spouse</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Drivers_License_Spouse}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*............................................  */}

                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>

                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>What assets are you searching for.</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input disabled type="checkbox" name="Accounts" value={this.state.Accounts} checked={this.state.Accountschk} onChange={() => this.isCheck('Accounts')} />
                                                    <label> Banks Accounts / Investment Accounts / Safe Deposits</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input disabled type="checkbox" name="Carbotvs" value={this.state.Carbotvs} checked={this.state.Carbotvschk} onChange={() => this.isCheck('Carbotvs')} />
                                                    <label> Cars / Boats / Vessels or similar</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input disabled type="checkbox" name="Srcofincm" value={this.state.Srcofincm} checked={this.state.Srcofincmchk} onChange={() => this.isCheck('Srcofincm')} />
                                                    <label> Source of Income – Jobs</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input disabled type="checkbox" name="Landprpty" value={this.state.Landprpty} checked={this.state.Landprptychk} onChange={() => this.isCheck('Landprpty')} />
                                                    <label> Land or Property </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input disabled type="checkbox" name="HiddenAsset" value={this.state.HiddenAsset} checked={this.state.HiddenAssetchk} onChange={() => this.isCheck('HiddenAsset')} />
                                                    <label> Hidden Assets</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input disabled type="checkbox" name="BusOrCrop" value={this.state.BusOrCrop} checked={this.state.BusOrCropchk} onChange={() => this.isCheck('BusOrCrop')} />
                                                    <label> Businesses / Corporation </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input disabled type="checkbox" name="Other" value={this.state.Other} checked={this.state.Otherchk} onChange={() => this.isCheck('Other')} />
                                                    <label> Other / Please explain. </label>
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" row" style={{ display: this.state.Otherchk ? 'flex' : 'none' }}>
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input disabled type="text" name="Otherinfo" style={{ borderColor: this.state.errorOTHERINFO ? 'brown' : null, backgroundColor: this.state.errorOTHERINFO ? '#f3ece7' : null }} value={this.state.Otherinfo} onChange={e => this.setState({ Otherinfo: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorOTHERINFO}</span> : null}
                                            </div>
                                        </div>

                                        {/*............................................  */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Do you have a court Judgement ?</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Judgement != "" ? this.state.Judgement == "Y" ? "YES" : "NO" : ""}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorCRTJDGMT ? 'brown' : null, backgroundColor: this.state.errorCRTJDGMT ? '#f3ece7' : null }} value={this.state.Judgement} onChange={e => this.setState({ Judgement: e.target.value })}>
                                                            <option value="">Select</option>
                                                            <option value="Y">Yes</option>
                                                            <option value="N">No</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*............................................  */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>If yes, would you need help with post judgement recovery.</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.judgementrecovery != "" ? this.state.judgementrecovery == "Y" ? "YES" : "NO" : ""}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorHELPRCVRY ? 'brown' : null, backgroundColor: this.state.errorHELPRCVRY ? '#f3ece7' : null }} value={this.state.judgementrecovery} onChange={e => this.setState({ judgementrecovery: e.target.value })}>
                                                            <option value="">Select</option>
                                                            <option value="Y">Yes</option>
                                                            <option value="N">No</option>
                                                        </select> */}


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*............................................  */}

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column" />
                </div>
            </div>
        );
    }


    // render Child Custody

    renderChild_Custody() {

        return (
            <div>
                <div className="ui one column grid">

                    <div className=" row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui stackable grid">

                                        <div className="row" />
                                        <div className="row" />
                                        {/* ..................................................................................... */}
                                        <div className=" row" style={{ display: "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui input disabled">
                                                        <input disabled type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui input disabled">
                                                        <input disabled type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Surveillance (Start date)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.SurveillanceStartdate}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Surveillance (End date)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.SurveillanceEnddate}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>GPS Needed (Y/N)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.GPSNeeded}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorISGPSNEEDED ? 'brown' : null, backgroundColor: this.state.errorISGPSNEEDED ? '#f3ece7' : null }} value={this.state.GPSNeeded} onChange={e => this.setState({ GPSNeeded: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Please explain in detail what action you are looking for</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.ActionYouAreLookingFor}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Are there specific days for surveillance to be conducted</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.DaysForSurveillanceToBeConducted}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>If 2 investigators are needed, do we have the permission to move forward (Y/N)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.PermissionToMoveForward}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null, backgroundColor: this.state.errorISIFTWOINVESTIGATORS ? '#f3ece7' : null }} value={this.state.PermissionToMoveForward} onChange={e => this.setState({ PermissionToMoveForward: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Have you previously conducted any surveillance on the subject (Y/N)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.ConductedAnySurveillanceOnTheSubject}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorISPREVIOUSSUR ? 'brown' : null, backgroundColor: this.state.errorISPREVIOUSSUR ? '#f3ece7' : null }} value={this.state.ConductedAnySurveillanceOnTheSubject} onChange={e => this.setState({ ConductedAnySurveillanceOnTheSubject: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>If the subject is active, do we have permission to go beyond the allowed time (Y/N)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.PermissionToGoBeyondTheAllowedTime}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorISBEYONDTMACTIVE ? 'brown' : null, backgroundColor: this.state.errorISBEYONDTMACTIVE ? '#f3ece7' : null }} value={this.state.PermissionToGoBeyondTheAllowedTime} onChange={e => this.setState({ PermissionToGoBeyondTheAllowedTime: e.target.value })}>
                                                            <option>Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select > */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Budget for the Investigation</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.BudgetfortheInvestigation}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>How did you hear about us ?</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.HearAboutUs}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Subject Information</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        {/* ..................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>First Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.First_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Gender</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Sex}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorSEX ? 'brown' : null, backgroundColor: this.state.errorSEX ? '#f3ece7' : null }} value={this.state.Sex} onChange={e => this.setState({ Sex: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="M">M</option>
                                                        <option value="F">F</option>
                                                    </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Age</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Age}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Race</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Race}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ..................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Height</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Height}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Weight</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Weight}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Hair Color</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Hair_Color}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Residence Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Residence_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Business Address</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Business_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Vehicle Info</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        {/* ..................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>License Plate #</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.LicensePlate}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Make</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Make}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Model</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Model}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Description</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>With whom is the child living ? Explain the custody situation</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.CustodySituation}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Explain what negative things the subject is involved with?</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.NegativeThingsSubjectInvolved}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column" />
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column" />
                </div>
            </div>
        );

    };

    // render Infidelity

    renderInfidelity() {
        return (
            <div>
                <div className="ui one column grid">
                    <div className=" row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui stackable grid">

                                        <div className="row" />
                                        <div className="row" />


                                        {/* ..................................................................................... */}
                                        <div className=" row" style={{ display: "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui  input disabled">
                                                        <input disabled type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui  input disabled">
                                                        <input disabled type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Surveillance (Start date)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Surveillance_Start_Date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Surveillance (End date)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Surveillance_End_Date}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>GPS Needed (Y/N)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.GPS}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorISGPSNEEDED ? 'brown' : null, backgroundColor: this.state.errorISGPSNEEDED ? '#f3ece7' : null }} value={this.state.GPS} onChange={e => this.setState({ GPS: e.target.value })}>
                                                        <option value="">Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                       </select > */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Please explain in detail what action you are looking for</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Action}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Are there specific days for surveillance to be conducted</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Surveillance}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}


                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>If 2 investigators are needed, do we have the permission to move forward (Y/N)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Permission_To_Move_Forward}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null, backgroundColor: this.state.errorISIFTWOINVESTIGATORS ? '#f3ece7' : null }} value={this.state.Permission_To_Move_Forward} onChange={e => this.setState({ Permission_To_Move_Forward: e.target.value })} >
                                                        <option value="">Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ..................................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Have you previously conducted any surveillance on the subject (Y/N)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Surveillance_On_The_Subject}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorISPREVIOUSSUR ? 'brown' : null, backgroundColor: this.state.errorISPREVIOUSSUR ? '#f3ece7' : null }} value={this.state.Surveillance_On_The_Subject} onChange={e => this.setState({ Surveillance_On_The_Subject: e.target.value })}>
                                                            <option value="">Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>If the subject is active, do we have permission to go beyond the allowed time (Y/N)</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Permission_To_Go_Beyond_The_Allowed_Time}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorISBEYONDTMACTIVE ? 'brown' : null, backgroundColor: this.state.errorISBEYONDTMACTIVE ? '#f3ece7' : null }} value={this.state.Permission_To_Go_Beyond_The_Allowed_Time} onChange={e => this.setState({ Permission_To_Go_Beyond_The_Allowed_Time: e.target.value })} >
                                                            <option value="">Select</option>
                                                            <option value="Y">Y</option>
                                                            <option value="N">N</option>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Budget for the Investigation</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Budget}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>How did you hear about us ?</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }}>
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Aboutus}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Subject Information</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        {/* ..................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>First Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.First_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Last Name</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Last_Name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Gender</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Sex}
                                                        {/* <select disabled className="" style={{ borderColor: this.state.errorSEX ? 'brown' : null, backgroundColor: this.state.errorSEX ? '#f3ece7' : null }} value={this.state.Sex} onChange={e => this.setState({ Sex: e.target.value })}>
                                                            <option value="">Select</option>
                                                            <option value="M">M</option>
                                                            <option value="F">F</option>
                                                        </select > */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Age</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Age}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Race</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Race}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Height</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Height}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Weight</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Weight}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Hair Color</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Hair_Color}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Residence Address</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Residence_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Business Address</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Business_Address}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ..................................................................................... */}
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Vehicle Info</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row" />
                                        {/* ..................................................................................... */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>License Plate #</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.License_Plate}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Make</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Make}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Model</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Model}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}
                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Description</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.Description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ..................................................................................... */}


                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column" />
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column" />
                </div>
            </div>
        );
    };

}