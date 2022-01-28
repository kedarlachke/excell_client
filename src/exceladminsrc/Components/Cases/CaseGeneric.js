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
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
        this.props.isCust? this.populateRateCards =this.props.populateRateCards.bind(this):null
        this.gotoPreviousTab = this.props.gotoPreviousTab.bind(this)
        this.showMsg = this.props.showMsg.bind(this);
    };

    async componentDidMount() {

        console.log(this.props.CLIENTID);

        // To Show Msg When User Don't save Client details First
        if (!this.props.CLIENTID) {
            this.showMsg(`Client details not save. Please save client details first`, true);
            this.gotoPreviousTab(0)
        }
        // console.log(this.props.CLIENTID);

        this.DropdownCases(this.props.caseType);

        // Populate Data When Edit Mode
        if (this.props.data) {
            await this.setState({
                Dispalycomp: true
            });
            this.PopulateData(this.props.data);
        };

        // Populate Data when back to Case tab
        if (this.props.Case_Id) {
            await this.setState({
                Dispalycomp: true
            });
            this.PopulateData(this.props.Case_Id);
        };

  // Check if It is Customer Login then Display the rate of Services

  if (this.props.isCust) {
    switch (this.props.caseType) {
      case "INFIDELITY":
        this.populateRateCards("Infidelity");
        break;
      case "CHILD_CUSTODY":
        this.populateRateCards("Child Custody");
        break;
      case "WORKERS_COMP":
        this.populateRateCards("Workers Comp");
        break;
      case "LOCATE_PEOPLE":
        this.populateRateCards("Locate People");
        break;
      case "PROCESS_SERVER":
        this.populateRateCards("Process Server");
        break;
      case "ASSET_SEARCH":
        this.populateRateCards("Asset Search");
        break;
    }
  }


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
            console.log(result.data.caseDetails.length);
            if (result.data.caseDetails.length != 0) {
                await this.setState(caseState(this.props.caseType, 'caseGetResultState', result));
            }

            // console.log(this.state.Accounts);
            //console.log(this.state.Accountschk);
            if (this.props.caseType == 'ASSET_SEARCH') {
                console.log(this.state.Accounts);
                console.log(this.state.Carbotvs);
                console.log(this.state.Srcofincm);
                console.log(this.state.Landprpty);
                console.log(this.state.HiddenAsset);
                console.log(this.state.BusOrCrop);
                console.log(this.state.Other);
                if (this.state.Accounts == 'Y') {

                    this.setState({
                        Accountschk: true
                    })
                }

                if (this.state.Carbotvs == 'Y') {

                    this.setState({
                        Carbotvschk: true
                    })
                }

                if (this.state.Srcofincm == 'Y') {

                    this.setState({
                        Srcofincmchk: true
                    })
                }

                if (this.state.Landprpty == 'Y') {

                    this.setState({
                        Landprptychk: true
                    })
                }

                if (this.state.HiddenAsset == 'Y') {

                    this.setState({
                        HiddenAssetchk: true
                    })
                }

                if (this.state.BusOrCrop == 'Y') {

                    this.setState({
                        BusOrCropchk: true
                    })
                }

                if (this.state.Other == 'Y') {

                    this.setState({
                        Otherchk: true
                    })
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
                DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO,
                    "STATES": result.data.STATES,
                    "BUSINESS_TYPES": result.data.BUSINESS_TYPES

                });
                this.setState({ DropdownCasesListArr: DropdownCasesList });
            }

            if (caseType == 'CHILD_CUSTODY') {
                DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO,
                    "STATES": result.data.STATES

                });

                this.setState({ DropdownCasesListArr: DropdownCasesList });
            }

            if (caseType == 'INFIDELITY') {
                DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO

                });

                this.setState({ DropdownCasesListArr: DropdownCasesList });
            }

            if (caseType == 'LOCATE_PEOPLE') {
                DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO,
                    "STATES": result.data.STATES,
                    "BUSINESS_TYPES": result.data.BUSINESS_TYPES

                })

                this.setState({ DropdownCasesListArr: DropdownCasesList })
            }



            if (caseType == 'OTHER_CASE') {

                DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO,
                    "STATES": result.data.STATES,
                   "BUSINESS_TYPES": result.data.BUSINESS_TYPES,
                    "SERVICE_CATEGORY": result.data.OTHER_SERVICES,
                });
                this.setState({ DropdownCasesListArr: DropdownCasesList });
            }


            if (caseType == 'WORKERS_COMP') {
                DropdownCasesList.push({
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO,
                    "STATES": result.data.STATES

                })

                this.setState({ DropdownCasesListArr: DropdownCasesList })

            }


            if (caseType == 'PROCESS_SERVER') {

                DropdownCasesList.push({
                    "BEST_TIME_TO_CALL": result.data.BEST_TIME_TO_CALL,
                    "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                    "ASSIGN_TO": result.data.ASSIGN_TO

                });

                this.setState({ DropdownCasesListArr: DropdownCasesList });
            }
        }
    };


    async handleChange(e) {
        await this.setState({ Service_Type: e.target.value });
       // this.ServicesRequiredDropdownLeads(this.state.Service_Type);
       await this.state.DropdownCasesListArr.map(data=>
        data.SERVICE_CATEGORY.filter((data)=>
      {
        if(data.CODE===this.state.Service_Type)
        {
           this.setState({
            Service_Desc:data.DESC
          })
        }
      }));
       if(this.props.isCust)
       {
         await this.state.DropdownCasesListArr.map(data=>
         data.SERVICE_CATEGORY.filter((data)=>
       {
         
         if(data.CODE===this.state.Service_Type)
         {
            this.setState({
                Service_Desc:data.DESC
              })
           this.populateRateCards(data.DESC);

         }
   
       }));
       }
      }

    // To Create Case
    async CreateCases(typeofCase, inputFieldList) {
        if (this.props.CLIENTID) {
            var result = '', errorMessage = '', errors = [];
            try {
                await this.setState({ Client_Id: this.props.CLIENTID })
                result = await execGql('mutation', CasesCRUDOpsQuery, setCRUDParams('CREATE', typeofCase, this.state))
            }
            catch (err) {
                errors = err.errorsGql;
                errorMessage = err.errorMessageGql;

            }

            if (!result) {
                console.log(errors);
                console.log(errorMessage);
                errorval = true
                try {
                    errorMessage = JSON.parse(errorMessage);
                    for (let key in errorMessage) {
                        console.log(errorMessage[key]);
                        this.setState(caseState(this.props.caseType, 'caseGetErrorState', errorMessage, key));
                    }
                }
                catch (error) {
                    console.log(error);

                }


            }
            else {
                console.log(result);
                await this.setState({ Case_Id: result.data.CasesAffected[0] });
                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Case Details Accepted ..!!", false)
                    this.setState(caseState(this.props.caseType, 'caseGetErrorStateInitial'));
                    errorval = false
                    await this.setState({ Dispalycomp: true })
                    this.PopulateData(this.state.Case_Id);
                    this.gotoCaseType(false, this.state.Client_Id, this.state.Case_Id, null, typeofCase, null);
                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.showMsg("Case Details Accepted ..!!", false)
                    this.setState(caseState(this.props.caseType, 'caseGetErrorStateInitial'));
                    errorval = false
                    await this.PopulateData(this.state.Case_Id);

                    this.gotoCaseType(true, this.state.Client_Id, this.state.Case_Id, null, typeofCase, null);
                }


            }
        }
        else {
            this.showMsg("Client Details Must be fill first", true)
        }

    };



    // setCRUDParams(xnsType,typeofCase,inputFieldList)

    // To Update Case
    async UpdateCases(typeofCase, inputFieldList) {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log(`in Update`);
            // console.log(inputFieldList);
            result = await execGql('mutation', CasesCRUDOpsQuery, setCRUDParams('UPDATE', typeofCase, inputFieldList))
            // console.log(result);
        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;

        }

        if (!result) {
            console.log(errors);
            console.log(errorMessage);
            errorval = true
            try {
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    console.log(errorMessage[key]);
                    this.setState(caseState(this.props.caseType, 'caseGetErrorState', errorMessage, key));
                }
            }
            catch (error) {
                console.log(error);

            }
        }
        else {
            console.log(result);
            //this.navigateToCaseList()
            // this.gotoCaseType();
            await this.setState({ Case_Id: result.data.CasesAffected[0] });
            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Case Details Accepted ..!!", false)
                this.setState(caseState(this.props.caseType, 'caseGetErrorStateInitial'));
                errorval = false
                await this.setState({ Dispalycomp: true })
                this.PopulateData(this.state.Case_Id);
                this.gotoCaseType(false, this.state.Client_Id, this.state.Case_Id, null, typeofCase, null);
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                this.showMsg("Case Details Accepted ..!!", false)
                this.setState(caseState(this.props.caseType, 'caseGetErrorStateInitial'));
                errorval = false
                this.PopulateData(this.state.Case_Id);
                this.gotoCaseType(true, this.state.Client_Id, this.state.Case_Id, null, typeofCase, null);
            }
        }

    };


    // To Check Checkboxes
    async isCheck(type) {
        //console.log('hiiiiiii');
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


    // CRUD Operations
    CRUD_operation(typeofCase) {
        // console.log(this.state);

        if (this.state.tcode == 'CREATE') {
            this.CreateCases(typeofCase, this.state)
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateCases(typeofCase, this.state)

        }
    };

    // To Clear Inputfield & error
    onClear() {
        this.setState(caseState(this.props.caseType, 'caseGetClearState'));
        errorval = false
    };


    render() {
        //  console.log(this.props.caseType);
        return (
            this.renderCase(this.props.caseType)
        );
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

    // render Locate People
    renderLocate_People() {
        return (
            <div>
                <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                    <div className="modal-content">
                        <div className="ui icon header">
                            <div className="ui active inverted loader"></div>
                        </div>
                    </div>
                </div>
                <div className="ui one column grid">
                    <div className=" row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui  stackable grid">
                                        <div className=" row" style={{ display: "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorFRSTNM ? 'brown' : null }}>First Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" name="First_Name" style={{ borderColor: this.state.errorFRSTNM ? 'brown' : null, backgroundColor: this.state.errorFRSTNM ? '#f3ece7' : null }} value={this.state.First_Name} onChange={e => this.setState({ First_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorFRSTNM}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorLSTNM ? 'brown' : null }}>Last Name(Subject)</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorLSTNM ? 'brown' : null, backgroundColor: this.state.errorLSTNM ? '#f3ece7' : null }} name="Last_Name" value={this.state.Last_Name} onChange={e => this.setState({ Last_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLSTNM}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSPOUSE ? 'brown' : null }}>Spouse</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" name="Spouse" style={{ borderColor: this.state.errorSPOUSE ? 'brown' : null, backgroundColor: this.state.errorSPOUSE ? '#f3ece7' : null }} value={this.state.Spouse} onChange={e => this.setState({ Spouse: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSPOUSE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorAKA ? 'brown' : null }}>AKA’s</label>
                                                    <div className="ui right icon input">
                                                        <input style={{ borderColor: this.state.errorAKA ? 'brown' : null, backgroundColor: this.state.errorAKA ? '#f3ece7' : null }} type="text" name="AKAs" value={this.state.AKAs} onChange={e => this.setState({ AKAs: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorAKA}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDOB ? 'brown' : null }}>DOB</label>
                                                    <div className="ui right icon input">
                                                        <input type="Date" style={{ borderColor: this.state.errorDOB ? 'brown' : null, backgroundColor: this.state.errorDOB ? '#f3ece7' : null }} name="DOB" value={this.state.DOB} onChange={e => this.setState({ DOB: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDOB}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUSINESSNM ? 'brown' : null }}>Business Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="briefcase icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorBUSINESSNM ? 'brown' : null, backgroundColor: this.state.errorBUSINESSNM ? '#f3ece7' : null }} name="Business_Name" value={this.state.Business_Name} onChange={e => this.setState({ Business_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUSINESSNM}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUSINESSTYP ? 'brown' : null }}>Type of Business</label>
                                                    <select className="" value={this.state.Type_of_Business} style={{ borderColor: this.state.errorBUSINESSTYP ? 'brown' : null, backgroundColor: this.state.errorBUSINESSTYP ? '#f3ece7' : null }} onChange={e => this.setState({ Type_of_Business: e.target.value })} >
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.BUSINESS_TYPES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUSINESSTYP}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUSINESSTXID ? 'brown' : null }}>Business Tax ID</label>
                                                    <div className="ui right icon input">
                                                        <input type="text" style={{ borderColor: this.state.errorBUSINESSTXID ? 'brown' : null, backgroundColor: this.state.errorBUSINESSTXID ? '#f3ece7' : null }} name="Business_Tax_ID" value={this.state.Business_Tax_ID} onChange={e => this.setState({ Business_Tax_ID: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUSINESSTXID}</span> : null}
                                                </div>
                                            </div>

                                        </div>
                                        {/* <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUSADDRESS ? 'brown' : null }}>Last Known Address</label>
                                                    <div className="ui right icon input">
                                                        <i className="home icon"></i>
                                                        <input type="text" name="Last_Known_Address" style={{ borderColor: this.state.errorBUSADDRESS ? 'brown' : null, backgroundColor: this.state.errorBUSADDRESS ? '#f3ece7' : null }} value={this.state.Last_Known_Address} onChange={e => this.setState({ Last_Known_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUSADDRESS}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPHONE ? 'brown' : null }}>Phone Number</label>
                                                    <div className="ui right icon input">
                                                        <i className="phone icon"></i>
                                                        <input type="text" name="Phone_Number" style={{ borderColor: this.state.errorPHONE ? 'brown' : null, backgroundColor: this.state.errorPHONE ? '#f3ece7' : null }} value={this.state.Phone_Number} onChange={e => this.setState({ Phone_Number: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPHONE}</span> : null}
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCITY ? 'brown' : null }}>City</label>
                                                    <input type="text" style={{ borderColor: this.state.errorCITY ? 'brown' : null, backgroundColor: this.state.errorCITY ? '#f3ece7' : null }} name="City" value={this.state.City} onChange={e => this.setState({ City: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCITY}</span> : null}
                                                </div>
                                            </div>

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSTATE ? 'brown' : null }}>State</label>
                                                    <select className="" style={{ borderColor: this.state.errorSTATE ? 'brown' : null, backgroundColor: this.state.errorSTATE ? '#f3ece7' : null }} value={this.state.State} onChange={e => this.setState({ State: e.target.value })} >
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>

                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSTATE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorZIPCD ? 'brown' : null }}>Zip</label>
                                                    <input style={{ borderColor: this.state.errorZIPCD ? 'brown' : null, backgroundColor: this.state.errorZIPCD ? '#f3ece7' : null }} type="text" name="Zip" value={this.state.Zip} onChange={e => this.setState({ Zip: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorZIPCD}</span> : null}
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorRESADDRESS ? 'brown' : null }}>Last Known Address</label>
                                                    <div className="ui right icon input">
                                                        <i className="home icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorRESADDRESS ? 'brown' : null, backgroundColor: this.state.errorRESADDRESS ? '#f3ece7' : null }} name="Last_Known_Address" value={this.state.Last_Known_Address1} onChange={e => this.setState({ Last_Known_Address1: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorRESADDRESS}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPHONE2 ? 'brown' : null }}>Phone Number</label>
                                                    <div className="ui right icon input">
                                                        <i className="phone icon"></i>
                                                        <input type="text" name="Phone_Number" style={{ borderColor: this.state.errorPHONE2 ? 'brown' : null, backgroundColor: this.state.errorPHONE2 ? '#f3ece7' : null }} value={this.state.Phone_Number1} onChange={e => this.setState({ Phone_Number1: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPHONE2}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCITY2 ? 'brown' : null }}>City</label>
                                                    <input type="text" style={{ borderColor: this.state.errorCITY2 ? 'brown' : null, backgroundColor: this.state.errorCITY2 ? '#f3ece7' : null }} name="City" value={this.state.City1} onChange={e => this.setState({ City1: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCITY2}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSTATE2 ? 'brown' : null }} >State</label>
                                                    <select className="" style={{ borderColor: this.state.errorSTATE2 ? 'brown' : null, backgroundColor: this.state.errorSTATE2 ? '#f3ece7' : null }} value={this.state.State1} onChange={e => this.setState({ State1: e.target.value })} >
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>

                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSTATE2}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorZIPCD2 ? 'brown' : null }}>Zip</label>
                                                    <input style={{ borderColor: this.state.errorZIPCD2 ? 'brown' : null, backgroundColor: this.state.errorZIPCD2 ? '#f3ece7' : null }} type="text" name="Zip" value={this.state.Zip1} onChange={e => this.setState({ Zip1: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorZIPCD2}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMPID ? 'brown' : null }}>Employed By</label>
                                                    <input type="text" style={{ borderColor: this.state.errorEMPID ? 'brown' : null, backgroundColor: this.state.errorEMPID ? '#f3ece7' : null }} name="Employed_By" value={this.state.Employed_By} onChange={e => this.setState({ Employed_By: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMPID}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorADJADDRESS ? 'brown' : null }}>Employer’s Address</label>
                                                    <div className="ui right icon input">
                                                        <i className="home icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorADJADDRESS ? 'brown' : null, backgroundColor: this.state.errorADJADDRESS ? '#f3ece7' : null }} name="Employee_Address" value={this.state.Employee_Address} onChange={e => this.setState({ Employee_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorADJADDRESS}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMPPHONE ? 'brown' : null }}>Phone Number</label>
                                                    <div className="ui right icon input">
                                                        <i className="phone icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorEMPPHONE ? 'brown' : null, backgroundColor: this.state.errorEMPPHONE ? '#f3ece7' : null }} name="Phone_Number" value={this.state.Phone_Number2} onChange={e => this.setState({ Phone_Number2: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMPPHONE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMPCITY ? 'brown' : null }}>City</label>
                                                    <input type="text" style={{ borderColor: this.state.errorEMPCITY ? 'brown' : null, backgroundColor: this.state.errorEMPCITY ? '#f3ece7' : null }} name="City" value={this.state.City2} onChange={e => this.setState({ City2: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMPCITY}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMPSTATE ? 'brown' : null }}>State</label>
                                                    <select className="" style={{ borderColor: this.state.errorEMPSTATE ? 'brown' : null, backgroundColor: this.state.errorEMPSTATE ? '#f3ece7' : null }} value={this.state.State2} onChange={e => this.setState({ State2: e.target.value })} >
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>

                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMPSTATE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMPZIPCD ? 'brown' : null }}>Zip</label>
                                                    <input type="text" style={{ borderColor: this.state.errorEMPZIPCD ? 'brown' : null, backgroundColor: this.state.errorEMPZIPCD ? '#f3ece7' : null }} name="Zip" value={this.state.Zip2} onChange={e => this.setState({ Zip2: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMPZIPCD}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSECURITYSUB ? 'brown' : null }}>Social Security Subject</label>
                                                    <div className="ui right icon input">

                                                        <input type="text" style={{ borderColor: this.state.errorSECURITYSUB ? 'brown' : null, backgroundColor: this.state.errorSECURITYSUB ? '#f3ece7' : null }} name="Social_Security_Subject" value={this.state.Social_Security_Subject} onChange={e => this.setState({ Social_Security_Subject: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSECURITYSUB}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSECURITYSPOS ? 'brown' : null }}>Social Security Spouse</label>
                                                    <div className="ui right icon input">

                                                        <input type="text" style={{ borderColor: this.state.errorSECURITYSPOS ? 'brown' : null, backgroundColor: this.state.errorSECURITYSPOS ? '#f3ece7' : null }} name="Social_Security_Spouse" value={this.state.Social_Security_Spouse} onChange={e => this.setState({ Social_Security_Spouse: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSECURITYSPOS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDRIVERLINCSUB ? 'brown' : null }}>Driver’s License Subject</label>
                                                    <div className="ui right icon input">

                                                        <input type="text" style={{ borderColor: this.state.errorDRIVERLINCSUB ? 'brown' : null, backgroundColor: this.state.errorDRIVERLINCSUB ? '#f3ece7' : null }} name="Driver’s_License_Subject" value={this.state.Drivers_License_Subject} onChange={e => this.setState({ Drivers_License_Subject: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDRIVERLINCSUB}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDRIVERLINCSPOS ? 'brown' : null }}>Driver’s License Spouse</label>
                                                    <div className="ui right icon input">

                                                        <input type="text" style={{ borderColor: this.state.errorDRIVERLINCSPOS ? 'brown' : null, backgroundColor: this.state.errorDRIVERLINCSPOS ? '#f3ece7' : null }} name="Driver’s_License_Spouse" value={this.state.Drivers_License_Spouse} onChange={e => this.setState({ Drivers_License_Spouse: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDRIVERLINCSPOS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label >Who was the last person the subject was last seen with and describe the last events leading up to the missing?</label>
                                                    <div className="ui right icon  input">
                                                        <textarea name='Events_Leading' rows="3" value={this.state.Events_Leading} onChange={e => this.setState({ Events_Leading: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label >What are some of the locations the subject frequents?</label>
                                                    <div className="ui right icon  input">
                                                        <input type="text" name='Subject_Frequents' value={this.state.Subject_Frequents} onChange={e => this.setState({ Subject_Frequents: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label >What are his hobbies, if any ?</label>
                                                    <div className="ui right icon  input">
                                                        <input type="text" name='Hobbies' value={this.state.Hobbies} onChange={e => this.setState({ Hobbies: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label >List Locations of Address where the subject might potentially be ?</label>
                                                    <div className="ui right icon  input">
                                                        <input type="text" name='List_Locations' value={this.state.List_Locations} onChange={e => this.setState({ List_Locations: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPRIORITY ? 'brown' : null }}>Priority Status</label>
                                                    <select className="" style={{ borderColor: this.state.errorPRIORITY ? 'brown' : null, backgroundColor: this.state.errorPRIORITY ? '#f3ece7' : null }} value={this.state.Priority_Status} onChange={e => this.setState({ Priority_Status: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.PRIORITY_LEVEL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPRIORITY}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column" style={{ display: this.props.isCust ? 'none' : 'flex' }}>
                                                <div className="field">
                                                    <label>Assign To</label>
                                                    <select className="" value={this.state.Assign_To} onChange={e => this.setState({ Assign_To: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.ASSIGN_TO.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                                <button className="ui  button" type="submit" onClick={() => this.onClear()}>Clear</button>
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


    // render Other
     // render Other
     renderOther() {
        return (
            <div>
              <div
                className="modal"
                style={{
                  display: this.state.Dispalycomp ? "flex" : "none",
                  backgroundColor: "rgba(0, 0, 0, 0.6)"
                }}
              >
                <div className="modal-content">
                  <div className="ui icon header">
                    <div className="ui active inverted loader" />
                  </div>
                </div>
              </div>
              <div className="ui one column grid">
                <div className=" row">
                  <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                    <div className="ui segment ">
                      <div className="ui form">
                        <div className="ui stackable grid">
                          <div className=" row" style={{ display: "none" }}>
                            <div className="five wide column">
                              <div className="field">
                                <label>Client Id</label>
                                <div className="ui input">
                                  <input
                                    type="text"
                                    name="Date"
                                    value={this.state.Client_Id}
                                    onChange={e =>
                                      this.setState({ Client_Id: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className=" five wide column">
                              <div className="field">
                                <label>Case Id</label>
                                <div className="ui input">
                                  <input
                                    type="text"
                                    name="Case_Id"
                                    value={this.state.Case_Id}
                                    onChange={e =>
                                      this.setState({ Case_Id: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ten wide column">
                      <div className="field">
                        <label
                          style={{
                            color: this.state.errorSERVICETYP ? "brown" : null
                          }}
                        >
                          Service Type
                        </label>
                        <select
                          className=""
                          value={this.state.Service_Type}
                          style={{
                            borderColor: this.state.errorSERVICETYP
                              ? "brown"
                              : null,
                            backgroundColor: this.state.errorSERVICETYP
                              ? "#f3ece7"
                              : null
                          }}
                          onChange={e => this.handleChange(e)}
                        >
                          <option value="">Select</option>
                          {this.state.DropdownCasesListArr.map(data =>
                            data.SERVICE_CATEGORY.map((data, idx) =>
                              data.DESC === "Infidelity" ||
                              data.DESC === "Child Custody" ||
                              data.DESC === "Workmans Comp Surveillance" ||
                              data.DESC === "Asset Searches" ||
                              data.DESC === "Locate People" ||
                              data.DESC === "Investigations" ||
                              data.DESC === "Surveillance" ||
                              data.DESC === "Search And Retrieval" ||
                              data.DESC === "Difficult Process Service" ? (
                                ""
                              ) : (
                                <option key={idx} value={data.CODE}>
                                  {data.DESC}
                                </option>
                              )
                            )
                          )}
                        </select>
                      </div>
                      <div className="field">
                        {errorval ? (
                          <span id="errorspan">
                            {this.state.errorSERVICETYP}
                          </span>
                        ) : null}
                      </div>
                    </div>
                          <div className=" row">
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorFRSTNM ? "brown" : null
                                  }}
                                >
                                  First Name
                                </label>
                                <div className="ui right icon input">
                                  <i className="user icon" />
                                  <input
                                    type="text"
                                    name="First_Name"
                                    style={{
                                      borderColor: this.state.errorFRSTNM
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorFRSTNM
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    value={this.state.First_Name}
                                    onChange={e =>
                                      this.setState({ First_Name: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">{this.state.errorFRSTNM}</span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorLSTNM ? "brown" : null
                                  }}
                                >
                                  Last Name
                                </label>
                                <div className="ui right icon input">
                                  <i className="user icon" />
                                  <input
                                    type="text"
                                    style={{
                                      borderColor: this.state.errorLSTNM
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorLSTNM
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="Last_Name"
                                    value={this.state.Last_Name}
                                    onChange={e =>
                                      this.setState({ Last_Name: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">{this.state.errorLSTNM}</span>
                                ) : null}
                              </div>
                            </div>
                          
                          </div>
                          <div className=" row">
                          <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorSPOUSE ? "brown" : null
                                  }}
                                >
                                  Spouse
                                </label>
                                <div className="ui right icon input">
                                  <i className="user icon" />
                                  <input
                                    type="text"
                                    name="Spouse"
                                    style={{
                                      borderColor: this.state.errorSPOUSE
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorSPOUSE
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    value={this.state.Spouse}
                                    onChange={e =>
                                      this.setState({ Spouse: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">{this.state.errorSPOUSE}</span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorAKA ? "brown" : null
                                  }}
                                >
                                  AKA’s
                                </label>
                                <div className="ui right icon input">
                                  <input
                                    style={{
                                      borderColor: this.state.errorAKA
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorAKA
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    type="text"
                                    name="AKAs"
                                    value={this.state.AKAs}
                                    onChange={e =>
                                      this.setState({ AKAs: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">{this.state.errorAKA}</span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorDOB ? "brown" : null
                                  }}
                                >
                                  DOB
                                </label>
                                <div className="ui right icon input">
                                  <input
                                    type="Date"
                                    style={{
                                      borderColor: this.state.errorDOB
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorDOB
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="DOB"
                                    value={this.state.DOB}
                                    onChange={e =>
                                      this.setState({ DOB: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">{this.state.errorDOB}</span>
                                ) : null}
                              </div>
                            </div>
                         
                          </div>
                          <div className=" row">
                          <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorBUSINESSNM ? "brown" : null
                                  }}
                                >
                                  Business Name
                                </label>
                                <div className="ui right icon input">
                                  <i className="briefcase icon" />
                                  <input
                                    type="text"
                                    style={{
                                      borderColor: this.state.errorBUSINESSNM
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorBUSINESSNM
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="Business_Name"
                                    value={this.state.Business_Name}
                                    onChange={e =>
                                      this.setState({ Business_Name: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorBUSINESSNM}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorBUSINESSTYP
                                      ? "brown"
                                      : null
                                  }}
                                >
                                  Type of Business
                                </label>
                                <select
                                  className=""
                                  value={this.state.Type_of_Business}
                                  style={{
                                    borderColor: this.state.errorBUSINESSTYP
                                      ? "brown"
                                      : null,
                                    backgroundColor: this.state.errorBUSINESSTYP
                                      ? "#f3ece7"
                                      : null
                                  }}
                                  onChange={e =>
                                    this.setState({
                                      Type_of_Business: e.target.value
                                    })
                                  }
                                >
                                  <option value="">Select</option>
                                  {this.state.DropdownCasesListArr.map(data =>
                                    data.BUSINESS_TYPES.map((data, idx) => (
                                      <option key={idx} value={data.CODE}>
                                        {data.DESC}
                                      </option>
                                    ))
                                  )}
                                </select>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorBUSINESSTYP}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorBUSINESSTXID
                                      ? "brown"
                                      : null
                                  }}
                                >
                                  Business Tax ID
                                </label>
                                <div className="ui right icon input">
                                  <input
                                    type="text"
                                    style={{
                                      borderColor: this.state.errorBUSINESSTXID
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorBUSINESSTXID
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="Business_Tax_ID"
                                    value={this.state.Business_Tax_ID}
                                    onChange={e =>
                                      this.setState({
                                        Business_Tax_ID: e.target.value
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorBUSINESSTXID}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                         
                          </div>
                       
                          <div className=" row">
                            <div className="ten wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorRESADDRESS ? "brown" : null
                                  }}
                                >
                                  Last Known Address
                                </label>
                                <div className="ui right icon input">
                                  <i className="home icon" />
                                  <input
                                    type="text"
                                    style={{
                                      borderColor: this.state.errorRESADDRESS
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorRESADDRESS
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="Last_Known_Address"
                                    value={this.state.Last_Known_Address1}
                                    onChange={e =>
                                      this.setState({
                                        Last_Known_Address1: e.target.value
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorRESADDRESS}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorPHONE2 ? "brown" : null
                                  }}
                                >
                                  Phone Number
                                </label>
                                <div className="ui right icon input">
                                  <i className="phone icon" />
                                  <input
                                    type="text"
                                    name="Phone_Number"
                                    style={{
                                      borderColor: this.state.errorPHONE2
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorPHONE2
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    value={this.state.Phone_Number1}
                                    onChange={e =>
                                      this.setState({ Phone_Number1: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">{this.state.errorPHONE2}</span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className=" row">
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorCITY2 ? "brown" : null
                                  }}
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  style={{
                                    borderColor: this.state.errorCITY2
                                      ? "brown"
                                      : null,
                                    backgroundColor: this.state.errorCITY2
                                      ? "#f3ece7"
                                      : null
                                  }}
                                  name="City"
                                  value={this.state.City1}
                                  onChange={e =>
                                    this.setState({ City1: e.target.value })
                                  }
                                />
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">{this.state.errorCITY2}</span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorSTATE2 ? "brown" : null
                                  }}
                                >
                                  State
                                </label>
                                <select
                                  className=""
                                  style={{
                                    borderColor: this.state.errorSTATE2
                                      ? "brown"
                                      : null,
                                    backgroundColor: this.state.errorSTATE2
                                      ? "#f3ece7"
                                      : null
                                  }}
                                  value={this.state.State1}
                                  onChange={e =>
                                    this.setState({ State1: e.target.value })
                                  }
                                >
                                  <option value="">Select</option>
                                  {this.state.DropdownCasesListArr.map(data =>
                                    data.STATES.map((data, idx) => (
                                      <option key={idx} value={data.CODE}>
                                        {data.DESC}
                                      </option>
                                    ))
                                  )}
                                </select>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">{this.state.errorSTATE2}</span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorZIPCD2 ? "brown" : null
                                  }}
                                >
                                  Zip
                                </label>
                                <input
                                  style={{
                                    borderColor: this.state.errorZIPCD2
                                      ? "brown"
                                      : null,
                                    backgroundColor: this.state.errorZIPCD2
                                      ? "#f3ece7"
                                      : null
                                  }}
                                  type="text"
                                  name="Zip"
                                  value={this.state.Zip1}
                                  onChange={e =>
                                    this.setState({ Zip1: e.target.value })
                                  }
                                />
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">{this.state.errorZIPCD2}</span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className=" row">
                            <div className="ten wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorEMPID ? "brown" : null
                                  }}
                                >
                                  Employed By
                                </label>
                                <input
                                  type="text"
                                  style={{
                                    borderColor: this.state.errorEMPID
                                      ? "brown"
                                      : null,
                                    backgroundColor: this.state.errorEMPID
                                      ? "#f3ece7"
                                      : null
                                  }}
                                  name="Employed_By"
                                  value={this.state.Employed_By}
                                  onChange={e =>
                                    this.setState({ Employed_By: e.target.value })
                                  }
                                />
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">{this.state.errorEMPID}</span>
                                ) : null}
                              </div>
                            </div>
                          </div>
      
                          <div className=" row">
                            <div className="ten wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorADJADDRESS ? "brown" : null
                                  }}
                                >
                                  Employer’s Address
                                </label>
                                <div className="ui right icon input">
                                  <i className="home icon" />
                                  <input
                                    type="text"
                                    style={{
                                      borderColor: this.state.errorADJADDRESS
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorADJADDRESS
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="Employee_Address"
                                    value={this.state.Employee_Address}
                                    onChange={e =>
                                      this.setState({
                                        Employee_Address: e.target.value
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorADJADDRESS}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorEMPPHONE ? "brown" : null
                                  }}
                                >
                                  Phone Number
                                </label>
                                <div className="ui right icon input">
                                  <i className="phone icon" />
                                  <input
                                    type="text"
                                    style={{
                                      borderColor: this.state.errorEMPPHONE
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorEMPPHONE
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="Phone_Number"
                                    value={this.state.Phone_Number2}
                                    onChange={e =>
                                      this.setState({ Phone_Number2: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorEMPPHONE}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className=" row">
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorEMPCITY ? "brown" : null
                                  }}
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  style={{
                                    borderColor: this.state.errorEMPCITY
                                      ? "brown"
                                      : null,
                                    backgroundColor: this.state.errorEMPCITY
                                      ? "#f3ece7"
                                      : null
                                  }}
                                  name="City"
                                  value={this.state.City2}
                                  onChange={e =>
                                    this.setState({ City2: e.target.value })
                                  }
                                />
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorEMPCITY}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorEMPSTATE ? "brown" : null
                                  }}
                                >
                                  State
                                </label>
                                <select
                                  className=""
                                  style={{
                                    borderColor: this.state.errorEMPSTATE
                                      ? "brown"
                                      : null,
                                    backgroundColor: this.state.errorEMPSTATE
                                      ? "#f3ece7"
                                      : null
                                  }}
                                  value={this.state.State2}
                                  onChange={e =>
                                    this.setState({ State2: e.target.value })
                                  }
                                >
                                  <option value="">Select</option>
                                  {this.state.DropdownCasesListArr.map(data =>
                                    data.STATES.map((data, idx) => (
                                      <option key={idx} value={data.CODE}>
                                        {data.DESC}
                                      </option>
                                    ))
                                  )}
                                </select>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorEMPSTATE}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorEMPZIPCD ? "brown" : null
                                  }}
                                >
                                  Zip
                                </label>
                                <input
                                  type="text"
                                  style={{
                                    borderColor: this.state.errorEMPZIPCD
                                      ? "brown"
                                      : null,
                                    backgroundColor: this.state.errorEMPZIPCD
                                      ? "#f3ece7"
                                      : null
                                  }}
                                  name="Zip"
                                  value={this.state.Zip2}
                                  onChange={e =>
                                    this.setState({ Zip2: e.target.value })
                                  }
                                />
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorEMPZIPCD}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
      
                          <div className=" row">
                            <div className="ten wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorSECURITYSUB
                                      ? "brown"
                                      : null
                                  }}
                                >
                                  Social Security Subject
                                </label>
                                <div className="ui right icon input">
                                  <input
                                    type="text"
                                    style={{
                                      borderColor: this.state.errorSECURITYSUB
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorSECURITYSUB
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="Social_Security_Subject"
                                    value={this.state.Social_Security_Subject}
                                    onChange={e =>
                                      this.setState({
                                        Social_Security_Subject: e.target.value
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorSECURITYSUB}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorSECURITYSPOS
                                      ? "brown"
                                      : null
                                  }}
                                >
                                  Social Security Spouse
                                </label>
                                <div className="ui right icon input">
                                  <input
                                    type="text"
                                    style={{
                                      borderColor: this.state.errorSECURITYSPOS
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorSECURITYSPOS
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="Social_Security_Spouse"
                                    value={this.state.Social_Security_Spouse}
                                    onChange={e =>
                                      this.setState({
                                        Social_Security_Spouse: e.target.value
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorSECURITYSPOS}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className=" row">
                            <div className="ten wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorDRIVERLINCSUB
                                      ? "brown"
                                      : null
                                  }}
                                >
                                  Driver’s License Subject
                                </label>
                                <div className="ui right icon input">
                                  <input
                                    type="text"
                                    style={{
                                      borderColor: this.state.errorDRIVERLINCSUB
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorDRIVERLINCSUB
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="Driver’s_License_Subject"
                                    value={this.state.Drivers_License_Subject}
                                    onChange={e =>
                                      this.setState({
                                        Drivers_License_Subject: e.target.value
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorDRIVERLINCSUB}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorDRIVERLINCSPOS
                                      ? "brown"
                                      : null
                                  }}
                                >
                                  Driver’s License Spouse
                                </label>
                                <div className="ui right icon input">
                                  <input
                                    type="text"
                                    style={{
                                      borderColor: this.state.errorDRIVERLINCSPOS
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorDRIVERLINCSPOS
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="Driver’s_License_Spouse"
                                    value={this.state.Drivers_License_Spouse}
                                    onChange={e =>
                                      this.setState({
                                        Drivers_License_Spouse: e.target.value
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorDRIVERLINCSPOS}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className=" row">
                            <div className="ten wide column">
                            <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorABOUTBUSINESS
                                      ? "brown"
                                      : null
                                  }}
                                >
                                 Tell us more about the subject/business?
                                </label>
                                <div className="ui right icon input">
                                <textarea id="OTHER" rows="2"  value={this.state.ABOUTBUSINESS} onChange={(e)=>this.setState({ABOUTBUSINESS:e.target.value})} />
                                      
                                </div>
                                </div>
                                <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorABOUTBUSINESS}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            </div>
                            <div className=" row">
                            <div className="ten wide column">
                            <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorSUBJECT_FREQUENTS
                                      ? "brown"
                                      : null
                                  }}
                                >
                                 What are some of the locations the subject frequents?
                                </label>
                                <div className="ui right icon input">
                                <textarea id="OTHER" rows="2"  value={this.state.SUBJECT_FREQUENTS} onChange={(e)=>this.setState({SUBJECT_FREQUENTS:e.target.value})} />
                                      
                                </div>
                                </div>
                                <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorSUBJECT_FREQUENTS}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            </div>
                            <div className=" row">
                            <div className="ten wide column">
                            <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorOVERALL_OBJ
                                      ? "brown"
                                      : null
                                  }}
                                >
                                Please explain in detail what you are seeking to accomplish with this investigation request? What are you overall objectives?
                                </label>
                                <div className="ui right icon input">
                                <textarea id="OTHER" rows="2"  value={this.state.OVERALL_OBJ} onChange={(e)=>this.setState({OVERALL_OBJ:e.target.value})} />
                                      
                                </div>
                                </div>
                                <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorOVERALL_OBJ}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            </div>
                            <div className=" row">
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorHEARABOUTUS ? "brown" : null
                                  }}
                                >
                                  How did you hear about us?
                                </label>
                                <div className="ui right icon input">
                                  {/* <i className="home icon" /> */}
                                  <input
                                    type="text"
                                    style={{
                                      borderColor: this.state.errorHEARABOUTUS
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorHEARABOUTUS
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="Hear_Aboutus"
                                    value={this.state.HEARABOUTUS}
                                    onChange={e =>
                                      this.setState({
                                          HEARABOUTUS: e.target.value
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorHEARABOUTUS}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label
                                  style={{
                                    color: this.state.errorDEADLINE? "brown" : null
                                  }}
                                >
                                   Deadline to complete investigation
                                </label>
                                <div className="ui right icon input">
                                  {/* <i className="phone icon" /> */}
                                  <input
                                    type="Date"
                                    style={{
                                      borderColor: this.state.errorDEADLINE
                                        ? "brown"
                                        : null,
                                      backgroundColor: this.state.errorDEADLINE
                                        ? "#f3ece7"
                                        : null
                                    }}
                                    name="DEADLINE"
                                    value={this.state.DEADLINE}
                                    onChange={e =>
                                      this.setState({ DEADLINE: e.target.value })
                                    }
                                  />
                                </div>
                              </div>
                              <div className="field">
                                {errorval ? (
                                  <span id="errorspan">
                                    {this.state.errorDEADLINE}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className=" row">
                            <div className="ten wide column">
                              <button
                                className="ui primary button"
                                type="submit"
                                onClick={() => {
                                  this.CRUD_operation(this.props.caseType),
                                    this.setState({ OnClickButton: "Save&Continue" });
                                }}
                              >
                                Submit & Continue
                              </button>
                              <button
                                className="ui primary button"
                                type="submit"
                                onClick={() => {
                                  this.CRUD_operation(this.props.caseType),
                                    this.setState({ OnClickButton: "Save" });
                                }}
                              >
                                Save
                              </button>
                              <button
                                className="ui button"
                                type="submit"
                                onClick={() => this.onClear()}
                              >
                                Clear
                              </button>
                              <button
                                className="ui button"
                                type="submit"
                                onClick={() => this.navigateToCaseList()}
                              >
                                Cancel
                              </button>
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
      }
    

    // render Process Server
    renderProcess_Server() {

        return (
            <div>
                <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                    <div className="modal-content">
                        <div className="ui icon header">
                            <div className="ui active inverted loader"></div>
                        </div>
                    </div>
                </div>
                <div className="ui one column grid">
                    <div className=" row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui  stackable grid">
                                        <div className=" row" style={{ display: "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCASEDT ? 'brown' : null }}>Date</label>
                                                    <div className="ui  input">
                                                        <input type="Date" name="Date" style={{ borderColor: this.state.errorCASEDT ? 'brown' : null, backgroundColor: this.state.errorCASEDT ? '#f3ece7' : null }} placeholder="Date" value={this.state.Date} onChange={e => this.setState({ Date: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCASEDT}</span> : null}
                                                </div>
                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCOURTNM ? 'brown' : null }}>Court</label>
                                                    <div className="ui right icon input">
                                                        <i className="university icon"></i>
                                                        <input type="text" name="Court" style={{ borderColor: this.state.errorCOURTNM ? 'brown' : null, backgroundColor: this.state.errorCOURTNM ? '#f3ece7' : null }} value={this.state.Court} onChange={e => this.setState({ Court: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCOURTNM}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorFILENO ? 'brown' : null }}>File#</label>
                                                    <div className="ui right icon input">
                                                        <i className="file icon"></i>
                                                        <input type="text" name="File" style={{ borderColor: this.state.errorFILENO ? 'brown' : null, backgroundColor: this.state.errorFILENO ? '#f3ece7' : null }} value={this.state.File} onChange={e => this.setState({ File: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorFILENO}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorLTDTTOSERV ? 'brown' : null }} >Last Date To Serve</label>
                                                    <div className="ui  input">
                                                        <input type="Date" style={{ borderColor: this.state.errorLTDTTOSERV ? 'brown' : null, backgroundColor: this.state.errorLTDTTOSERV ? '#f3ece7' : null }} name="Last_Date_To_Serve" value={this.state.Last_Date_To_Serve} onChange={e => this.setState({ Last_Date_To_Serve: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLTDTTOSERV}</span> : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorTYPE ? 'brown' : null }}>Type of Document</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Type" style={{ borderColor: this.state.errorTYPE ? 'brown' : null, backgroundColor: this.state.errorTYPE ? '#f3ece7' : null }} value={this.state.Type} onChange={e => this.setState({ Type: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorTYPE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorHEARINGSETFOR ? 'brown' : null }}>Hearing Set For</label>
                                                    <div className="ui  input">
                                                        <input type="date" name="Hearing_Set_For" style={{ borderColor: this.state.errorHEARINGSETFOR ? 'brown' : null, backgroundColor: this.state.errorHEARINGSETFOR ? '#f3ece7' : null }} value={this.state.Hearing_Set_For} onChange={e => this.setState({ Hearing_Set_For: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorHEARINGSETFOR}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorAT ? 'brown' : null }}>Time of Hearing </label>
                                                    <div className="ui  input">
                                                        <input type="time" style={{ borderColor: this.state.errorAT ? 'brown' : null, backgroundColor: this.state.errorAT ? '#f3ece7' : null }} name="AT" value={this.state.AT} onChange={e => this.setState({ AT: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorAT}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDEPT ? 'brown' : null }}>Department</label>
                                                    <div className="ui right icon input">
                                                        <i className="building icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorDEPT ? 'brown' : null, backgroundColor: this.state.errorDEPT ? '#f3ece7' : null }} name="Department" value={this.state.Department} onChange={e => this.setState({ Department: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDEPT}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label >Miscellaneous Instructions</label>
                                                    <div className="ui right icon  input">
                                                        <i className="comments icon"></i>
                                                        <input type="text" name="Miscellaneous_Instructions" value={this.state.Miscellaneous_Instructions} onChange={e => this.setState({ Miscellaneous_Instructions: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Subject Information</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorFRSTNM ? 'brown' : null }}>First Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" name="First_Name" style={{ borderColor: this.state.errorFRSTNM ? 'brown' : null, backgroundColor: this.state.errorFRSTNM ? '#f3ece7' : null }} value={this.state.First_Name} onChange={e => this.setState({ First_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorFRSTNM}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorLSTNM ? 'brown' : null }}>Last Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorLSTNM ? 'brown' : null, backgroundColor: this.state.errorLSTNM ? '#f3ece7' : null }} name="Last_Name" value={this.state.Last_Name} onChange={e => this.setState({ Last_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLSTNM}</span> : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSEX ? 'brown' : null }}>Sex</label>
                                                    <select className="" style={{ borderColor: this.state.errorSEX ? 'brown' : null, backgroundColor: this.state.errorSEX ? '#f3ece7' : null }} value={this.state.Sex} onChange={e => this.setState({ Sex: e.target.value })}>
                                                        <option value="">Select</option>
                                                        <option value="M">Male</option>
                                                        <option value="F">Female</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSEX}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label>Age</label>
                                                    <input type="text" name="Age" value={this.state.Age} onChange={e => this.setState({ Age: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorRACE ? 'brown' : null }}>Race</label>
                                                    <input type="text" name="Race" style={{ borderColor: this.state.errorRACE ? 'brown' : null, backgroundColor: this.state.errorRACE ? '#f3ece7' : null }} value={this.state.Race} onChange={e => this.setState({ Race: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorRACE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className=" field">
                                                    <label style={{ color: this.state.errorHEIGHT ? 'brown' : null }}>Height</label>
                                                    <input type="text" name="Height" style={{ borderColor: this.state.errorHEIGHT ? 'brown' : null, backgroundColor: this.state.errorHEIGHT ? '#f3ece7' : null }} value={this.state.Height} onChange={e => this.setState({ Height: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorHEIGHT}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column" >
                                                <div className="field">
                                                    <label style={{ color: this.state.errorWEIGHT ? 'brown' : null }}>Weight</label>
                                                    <input type="text" name="Weight" style={{ borderColor: this.state.errorWEIGHT ? 'brown' : null, backgroundColor: this.state.errorWEIGHT ? '#f3ece7' : null }} value={this.state.Weight} onChange={e => this.setState({ Weight: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorWEIGHT}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className=" field " >
                                                    <label style={{ color: this.state.errorHAIRCOLOR ? 'brown' : null }}>Hair Color</label>
                                                    <input type="text" name="Hair_Color" style={{ borderColor: this.state.errorHAIRCOLOR ? 'brown' : null, backgroundColor: this.state.errorHAIRCOLOR ? '#f3ece7' : null }} value={this.state.Hair_Color} onChange={e => this.setState({ Hair_Color: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorHAIRCOLOR}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field" >
                                                    <label >Residence Address</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Residence_Address" value={this.state.Residence_Address} onChange={e => this.setState({ Residence_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label >Business Address</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Business_Address" value={this.state.Business_Address} onChange={e => this.setState({ Business_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Serve Information</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBTTMTOSERV ? 'brown' : null }}>Best Time To Serve</label>
                                                    <select className="" style={{ borderColor: this.state.errorBTTMTOSERV ? 'brown' : null, backgroundColor: this.state.errorBTTMTOSERV ? '#f3ece7' : null }} value={this.state.Best_Time_To_Serve} onChange={e => this.setState({ Best_Time_To_Serve: e.target.value })}>
                                                        <option value="Select">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.BEST_TIME_TO_CALL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBTTMTOSERV}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorHOURSOFWK ? 'brown' : null }}>Work Hours</label>
                                                    <div className="ui right icon input">
                                                        <i className="clock icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorHOURSOFWK ? 'brown' : null, backgroundColor: this.state.errorHOURSOFWK ? '#f3ece7' : null }} name="Hours_Of_Work" value={this.state.Hours_Of_Work} onChange={e => this.setState({ Hours_Of_Work: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorHOURSOFWK}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row" >

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPLMKATTPAT ? 'brown' : null }}>Please make attempt at (Home/Work/Other)- Please specify</label>
                                                    <input type="text" style={{ borderColor: this.state.errorPLMKATTPAT ? 'brown' : null, backgroundColor: this.state.errorPLMKATTPAT ? '#f3ece7' : null }} name="Please_Make_Attempt_At" value={this.state.Please_Make_Attempt_At} onChange={e => this.setState({ Please_Make_Attempt_At: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPLMKATTPAT}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPRIORITY ? 'brown' : null }}>Priority Status</label>
                                                    <select className="" style={{ borderColor: this.state.errorPRIORITY ? 'brown' : null, backgroundColor: this.state.errorPRIORITY ? '#f3ece7' : null }} value={this.state.Priority_Status} onChange={e => this.setState({ Priority_Status: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.PRIORITY_LEVEL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPRIORITY}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column" style={{ display: this.props.isCust ? 'none' : 'flex' }}>
                                                <div className="field">
                                                    <label>Assign To</label>
                                                    <select className="" value={this.state.Assign_To} onChange={e => this.setState({ Assign_To: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.ASSIGN_TO.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                                <button className="ui  button" type="submit" onClick={() => this.onClear()}>Clear</button>
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


    // render Workers Comp
    renderWorkers_Comp() {

        return (
            <div>
                <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                    <div className="modal-content">
                        <div className="ui icon header">
                            <div className="ui active inverted loader"></div>
                        </div>
                    </div>
                </div>
                <div className="ui one column grid">
                    <div className=" row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui stackable grid">
                                        <div className=" row" style={{ display: "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui input">
                                                        <input type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui input">
                                                        <input type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSURSTARTDT ? 'brown' : null }}>Surveillance (Start date)</label>
                                                    <div className="ui input">
                                                        <input type="Date" style={{ borderColor: this.state.errorSURSTARTDT ? 'brown' : null, backgroundColor: this.state.errorSURSTARTDT ? '#f3ece7' : null }} name="SurveillanceStartdate" placeholder="Surveillance (Start date)" value={this.state.SurveillanceStartdate} onChange={e => this.setState({ SurveillanceStartdate: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSURSTARTDT}</span> : null}
                                                </div>
                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSURENDDT ? 'brown' : null }}>Surveillance (End date)</label>
                                                    <div className="ui input">
                                                        <input type="Date" style={{ borderColor: this.state.errorSURENDDT ? 'brown' : null, backgroundColor: this.state.errorSURENDDT ? '#f3ece7' : null }} name="SurveillanceEnddate" placeholder="Surveillance (End date)" value={this.state.SurveillanceEnddate} onChange={e => this.setState({ SurveillanceEnddate: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSURENDDT}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISGPSNEEDED ? 'brown' : null }}>GPS Needed (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISGPSNEEDED ? 'brown' : null, backgroundColor: this.state.errorISGPSNEEDED ? '#f3ece7' : null }} value={this.state.GPSNeeded} onChange={e => this.setState({ GPSNeeded: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISGPSNEEDED}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorACTIONDETAILS ? 'brown' : null }}>Please explain in detail what action you are looking for</label>
                                                    <div className="ui input">
                                                        <textarea rows="2" style={{ borderColor: this.state.errorACTIONDETAILS ? 'brown' : null, backgroundColor: this.state.errorACTIONDETAILS ? '#f3ece7' : null }} name="ActionYouAreLookingFor" value={this.state.ActionYouAreLookingFor} onChange={e => this.setState({ ActionYouAreLookingFor: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorACTIONDETAILS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDAYSFORSUR ? 'brown' : null }}>Are there specific days for surveillance to be conducted</label>
                                                    <div className="ui input">
                                                        <input type="text" style={{ borderColor: this.state.errorDAYSFORSUR ? 'brown' : null, backgroundColor: this.state.errorDAYSFORSUR ? '#f3ece7' : null }} name="DaysForSurveillanceToBeConducted" value={this.state.DaysForSurveillanceToBeConducted} onChange={e => this.setState({ DaysForSurveillanceToBeConducted: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDAYSFORSUR}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null }}>If 2 investigators are needed, do we have the permission to move forward (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null, backgroundColor: this.state.errorISIFTWOINVESTIGATORS ? '#f3ece7' : null }} value={this.state.PermissionToMoveForward} onChange={e => this.setState({ PermissionToMoveForward: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISIFTWOINVESTIGATORS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISPREVIOUSSUR ? 'brown' : null }}>Have you previously conducted any surveillance on the subject (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISPREVIOUSSUR ? 'brown' : null, backgroundColor: this.state.errorISPREVIOUSSUR ? '#f3ece7' : null }} value={this.state.ConductedAnySurveillanceOnTheSubject} onChange={e => this.setState({ ConductedAnySurveillanceOnTheSubject: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISPREVIOUSSUR}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISBEYONDTMACTIVE ? 'brown' : null }}>If the subject is active, do we have permission to go beyond the allowed time (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISBEYONDTMACTIVE ? 'brown' : null, backgroundColor: this.state.errorISBEYONDTMACTIVE ? '#f3ece7' : null }} value={this.state.PermissionToGoBeyondTheAllowedTime} onChange={e => this.setState({ PermissionToGoBeyondTheAllowedTime: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISBEYONDTMACTIVE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUDGET ? 'brown' : null }}>Budget for the Investigation</label>
                                                    <div className="ui input">
                                                        <input type="text" style={{ borderColor: this.state.errorBUDGET ? 'brown' : null, backgroundColor: this.state.errorBUDGET ? '#f3ece7' : null }} name="BudgetfortheInvestigation" value={this.state.BudgetfortheInvestigation} onChange={e => this.setState({ BudgetfortheInvestigation: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUDGET}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label>How did you hear about us ?</label>
                                                    <div className="ui input">
                                                        <input type="text" name="HearAboutUs" value={this.state.HearAboutUs} onChange={e => this.setState({ HearAboutUs: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Subject Information</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>

                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorFRSTNM ? 'brown' : null }} >First Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorFRSTNM ? 'brown' : null, backgroundColor: this.state.errorFRSTNM ? '#f3ece7' : null }} name="First_Name" value={this.state.First_Name} onChange={e => this.setState({ First_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorFRSTNM}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorLSTNM ? 'brown' : null }}  >Last Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorLSTNM ? 'brown' : null, backgroundColor: this.state.errorLSTNM ? '#f3ece7' : null }} name="Last_Name" value={this.state.Last_Name} onChange={e => this.setState({ Last_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLSTNM}</span> : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSEX ? 'brown' : null }}>Sex</label>
                                                    <select className="" style={{ borderColor: this.state.errorSEX ? 'brown' : null, backgroundColor: this.state.errorSEX ? '#f3ece7' : null }} value={this.state.Sex} onChange={e => this.setState({ Sex: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="M">M</option>
                                                        <option value="F">F</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSEX}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label>Age</label>
                                                    <input type="text" name="Age" value={this.state.Age} onChange={e => this.setState({ Age: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label>Race</label>
                                                    <input type="text" name="Race" value={this.state.Race} onChange={e => this.setState({ Race: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className=" field">
                                                    <label>Height</label>
                                                    <input type="text" name="Height" value={this.state.Height} onChange={e => this.setState({ Height: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="five wide column" >
                                                <div className="field">
                                                    <label>Weight</label>
                                                    <input type="text" name="Weight" value={this.state.Weight} onChange={e => this.setState({ Weight: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className=" field " >
                                                    <label>Hair Color</label>
                                                    <input type="text" name="Hair_Color" value={this.state.Hair_Color} onChange={e => this.setState({ Hair_Color: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field" >
                                                    <label >Residence Address</label>
                                                    <div className="ui input">
                                                        <input type="text" name="Residence_Address" value={this.state.Residence_Address} onChange={e => this.setState({ Residence_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label >Business Address</label>
                                                    <div className="ui input">
                                                        <input type="text" name="Business_Address" value={this.state.Business_Address} onChange={e => this.setState({ Business_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                                    <input type="text" style={{ borderColor: this.state.errorLICENSEPLATE ? 'brown' : null, backgroundColor: this.state.errorLICENSEPLATE ? '#f3ece7' : null }} name="LicensePlate" value={this.state.LicensePlate} onChange={e => this.setState({ LicensePlate: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLICENSEPLATE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCMAKE ? 'brown' : null }}>Make</label>
                                                    <input type="text" style={{ borderColor: this.state.errorCMAKE ? 'brown' : null, backgroundColor: this.state.errorCMAKE ? '#f3ece7' : null }} name="Make" value={this.state.Make} onChange={e => this.setState({ Make: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCMAKE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCMODEL ? 'brown' : null }}>Model</label>
                                                    <input type="text" style={{ borderColor: this.state.errorCMODEL ? 'brown' : null, backgroundColor: this.state.errorCMODEL ? '#f3ece7' : null }} name="Model" value={this.state.Model} onChange={e => this.setState({ Model: e.target.value })} />
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
                                                    <div className="ui input">
                                                        <input type="text" style={{ borderColor: this.state.errorCDESCRIPTION ? 'brown' : null, backgroundColor: this.state.errorCDESCRIPTION ? '#f3ece7' : null }} name="Description" value={this.state.Description} onChange={e => this.setState({ Description: e.target.value })} />
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
                                                    <select className="" style={{ borderColor: this.state.errorISSUBREPRESENT ? 'brown' : null, backgroundColor: this.state.errorISSUBREPRESENT ? '#f3ece7' : null }} value={this.state.SubjectRepresentedByAttorney} onChange={e => this.setState({ SubjectRepresentedByAttorney: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
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
                                                    <div className="ui input">
                                                        <input type="text" style={{ borderColor: this.state.errorCLAIM ? 'brown' : null, backgroundColor: this.state.errorCLAIM ? '#f3ece7' : null }} name="Claim" value={this.state.Claim} onChange={e => this.setState({ Claim: e.target.value })} />
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
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorADJFIRSTNM ? 'brown' : null, backgroundColor: this.state.errorADJFIRSTNM ? '#f3ece7' : null }} name="FirstName_Adjuster" value={this.state.FirstName_Adjuster} onChange={e => this.setState({ FirstName_Adjuster: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorADJFIRSTNM}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorADJLASTNM ? 'brown' : null }}>Last Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorADJLASTNM ? 'brown' : null, backgroundColor: this.state.errorADJLASTNM ? '#f3ece7' : null }} name="LastName_Adjuster" value={this.state.LastName_Adjuster} onChange={e => this.setState({ LastName_Adjuster: e.target.value })} />
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
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" name="Email" style={{ borderColor: this.state.errorEMAIL ? 'brown' : null, backgroundColor: this.state.errorEMAIL ? '#f3ece7' : null }} value={this.state.Email} onChange={e => this.setState({ Email: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMAIL}</span> : null}
                                                </div>
                                            </div>
                                            <div className="three wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPHONE ? 'brown' : null }}>Phone Number</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorPHONE ? 'brown' : null, backgroundColor: this.state.errorPHONE ? '#f3ece7' : null }} name="PhoneNumber" value={this.state.PhoneNumber} onChange={e => this.setState({ PhoneNumber: e.target.value })} />
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
                                                    <div className="ui input">
                                                        <input type="text" style={{ borderColor: this.state.errorADJADDRESS ? 'brown' : null, backgroundColor: this.state.errorADJADDRESS ? '#f3ece7' : null }} name="Address" value={this.state.Address} onChange={e => this.setState({ Address: e.target.value })} />
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
                                                    <div className="ui input">
                                                        <input type="text" style={{ borderColor: this.state.errorCITY ? 'brown' : null, backgroundColor: this.state.errorCITY ? '#f3ece7' : null }} name="City" value={this.state.City} onChange={e => this.setState({ City: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCITY}</span> : null}
                                                </div>
                                            </div>

                                            <div className="three wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSTATE ? 'brown' : null }} >State</label>
                                                    <select className="" style={{ borderColor: this.state.errorSTATE ? 'brown' : null, backgroundColor: this.state.errorSTATE ? '#f3ece7' : null }} value={this.state.State} onChange={e => this.setState({ State: e.target.value })}>
                                                        <option>Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSTATE}</span> : null}
                                                </div>
                                            </div>

                                            <div className="two wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorZIPCD ? 'brown' : null }} >Zip Code</label>
                                                    <div className="ui input">
                                                        <input type="text" style={{ borderColor: this.state.errorZIPCD ? 'brown' : null, backgroundColor: this.state.errorZIPCD ? '#f3ece7' : null }} name="ZipCode" value={this.state.ZipCode} onChange={e => this.setState({ ZipCode: e.target.value })} />
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
                                                    <div className="ui input">
                                                        <textarea rows="2" style={{ borderColor: this.state.errorSUBINJURYCLAIM ? 'brown' : null, backgroundColor: this.state.errorSUBINJURYCLAIM ? '#f3ece7' : null }} name="ClaimOfInjury" value={this.state.ClaimOfInjury} onChange={e => this.setState({ ClaimOfInjury: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSUBINJURYCLAIM}</span> : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPRIORITY ? 'brown' : null }}>Priority Status</label>
                                                    <select className="" style={{ borderColor: this.state.errorPRIORITY ? 'brown' : null, backgroundColor: this.state.errorPRIORITY ? '#f3ece7' : null }} value={this.state.Priority_Status} onChange={e => this.setState({ Priority_Status: e.target.value })}>
                                                        <option>Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.PRIORITY_LEVEL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPRIORITY}</span> : null}
                                                </div>
                                            </div>

                                            <div className="five wide column" style={{ display: this.props.isCust ? 'none' : 'flex' }}>
                                                <div className="field">
                                                    <label>Assign To</label>
                                                    <select className="" value={this.state.Assign_To} onChange={e => this.setState({ Assign_To: e.target.value })}>
                                                        <option>Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.ASSIGN_TO.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                                <button className="ui button" type="submit" onClick={() => this.onClear()}>Clear</button>
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





    // render Asset Search

    renderAsset_Search() {

        return (
            <div>
                <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                    <div className="modal-content">
                        <div className="ui icon header">
                            <div className="ui active inverted loader"></div>
                        </div>
                    </div>
                </div>
                <div className="ui one column grid">
                    <div className=" row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui stackable grid">
                                        <div className=" row" style={{ display: "none", border: 3 }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorFRSTNM ? 'brown' : null }}>First Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" name="First_Name" style={{ borderColor: this.state.errorFRSTNM ? 'brown' : null, backgroundColor: this.state.errorFRSTNM ? '#f3ece7' : null }} value={this.state.First_Name} onChange={e => this.setState({ First_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorFRSTNM}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorLSTNM ? 'brown' : null }}>Last Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorLSTNM ? 'brown' : null, backgroundColor: this.state.errorLSTNM ? '#f3ece7' : null }} name="Last_Name" value={this.state.Last_Name} onChange={e => this.setState({ Last_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLSTNM}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSPOUSE ? 'brown' : null }}>Spouse</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" name="Spouse" style={{ borderColor: this.state.errorSPOUSE ? 'brown' : null, backgroundColor: this.state.errorSPOUSE ? '#f3ece7' : null }} value={this.state.Spouse} onChange={e => this.setState({ Spouse: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSPOUSE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorAKA ? 'brown' : null }}>AKA’s</label>
                                                    <div className="ui right icon input">
                                                        <input style={{ borderColor: this.state.errorAKA ? 'brown' : null, backgroundColor: this.state.errorAKA ? '#f3ece7' : null }} type="text" name="AKAs" value={this.state.AKAs} onChange={e => this.setState({ AKAs: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorAKA}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDOB ? 'brown' : null }}>DOB</label>
                                                    <div className="ui right icon input">
                                                        <input type="Date" style={{ borderColor: this.state.errorDOB ? 'brown' : null, backgroundColor: this.state.errorDOB ? '#f3ece7' : null }} name="DOB" value={this.state.DOB} onChange={e => this.setState({ DOB: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDOB}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUSINESSNM ? 'brown' : null }}>Business Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="briefcase icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorBUSINESSNM ? 'brown' : null, backgroundColor: this.state.errorBUSINESSNM ? '#f3ece7' : null }} name="Business_Name" value={this.state.Business_Name} onChange={e => this.setState({ Business_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUSINESSNM}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUSINESSTYP ? 'brown' : null }}>Type of Business</label>
                                                    <select className="" value={this.state.Type_of_Business} style={{ borderColor: this.state.errorBUSINESSTYP ? 'brown' : null, backgroundColor: this.state.errorBUSINESSTYP ? '#f3ece7' : null }} onChange={e => this.setState({ Type_of_Business: e.target.value })} >
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.BUSINESS_TYPES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUSINESSTYP}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUSINESSTXID ? 'brown' : null }}>Business Tax ID</label>
                                                    <div className="ui right icon input">
                                                        <input type="text" style={{ borderColor: this.state.errorBUSINESSTXID ? 'brown' : null, backgroundColor: this.state.errorBUSINESSTXID ? '#f3ece7' : null }} name="Business_Tax_ID" value={this.state.Business_Tax_ID} onChange={e => this.setState({ Business_Tax_ID: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUSINESSTXID}</span> : null}
                                                </div>
                                            </div>

                                        </div>
                                        {/* <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUSADDRESS ? 'brown' : null }}>Last Known Address</label>
                                                    <div className="ui right icon input">
                                                        <i className="home icon"></i>
                                                        <input type="text" name="Last_Known_Address" style={{ borderColor: this.state.errorBUSADDRESS ? 'brown' : null, backgroundColor: this.state.errorBUSADDRESS ? '#f3ece7' : null }} value={this.state.Last_Known_Address} onChange={e => this.setState({ Last_Known_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUSADDRESS}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPHONE ? 'brown' : null }}>Phone Number</label>
                                                    <div className="ui right icon input">
                                                        <i className="phone icon"></i>
                                                        <input type="text" name="Phone_Number" style={{ borderColor: this.state.errorPHONE ? 'brown' : null, backgroundColor: this.state.errorPHONE ? '#f3ece7' : null }} value={this.state.Phone_Number} onChange={e => this.setState({ Phone_Number: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPHONE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCITY ? 'brown' : null }}>City</label>
                                                    <input type="text" style={{ borderColor: this.state.errorCITY ? 'brown' : null, backgroundColor: this.state.errorCITY ? '#f3ece7' : null }} name="City" value={this.state.City} onChange={e => this.setState({ City: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCITY}</span> : null}
                                                </div>
                                            </div>

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSTATE ? 'brown' : null }}>State</label>
                                                    <select className="" style={{ borderColor: this.state.errorSTATE ? 'brown' : null, backgroundColor: this.state.errorSTATE ? '#f3ece7' : null }} value={this.state.State} onChange={e => this.setState({ State: e.target.value })} >
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>

                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSTATE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorZIPCD ? 'brown' : null }}>Zip</label>
                                                    <input style={{ borderColor: this.state.errorZIPCD ? 'brown' : null, backgroundColor: this.state.errorZIPCD ? '#f3ece7' : null }} type="text" name="Zip" value={this.state.Zip} onChange={e => this.setState({ Zip: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorZIPCD}</span> : null}
                                                </div>
                                            </div>
                                        </div> */}
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorRESADDRESS ? 'brown' : null }}>Last Known Address</label>
                                                    <div className="ui right icon input">
                                                        <i className="home icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorRESADDRESS ? 'brown' : null, backgroundColor: this.state.errorRESADDRESS ? '#f3ece7' : null }} name="Last_Known_Address" value={this.state.Last_Known_Address1} onChange={e => this.setState({ Last_Known_Address1: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorRESADDRESS}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPHONE2 ? 'brown' : null }}>Phone Number</label>
                                                    <div className="ui right icon input">
                                                        <i className="phone icon"></i>
                                                        <input type="text" name="Phone_Number" style={{ borderColor: this.state.errorPHONE2 ? 'brown' : null, backgroundColor: this.state.errorPHONE2 ? '#f3ece7' : null }} value={this.state.Phone_Number1} onChange={e => this.setState({ Phone_Number1: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPHONE2}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCITY2 ? 'brown' : null }}>City</label>
                                                    <input type="text" style={{ borderColor: this.state.errorCITY2 ? 'brown' : null, backgroundColor: this.state.errorCITY2 ? '#f3ece7' : null }} name="City" value={this.state.City1} onChange={e => this.setState({ City1: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCITY2}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSTATE2 ? 'brown' : null }} >State</label>
                                                    <select className="" style={{ borderColor: this.state.errorSTATE2 ? 'brown' : null, backgroundColor: this.state.errorSTATE2 ? '#f3ece7' : null }} value={this.state.State1} onChange={e => this.setState({ State1: e.target.value })} >
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>

                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSTATE2}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorZIPCD2 ? 'brown' : null }}>Zip</label>
                                                    <input style={{ borderColor: this.state.errorZIPCD2 ? 'brown' : null, backgroundColor: this.state.errorZIPCD2 ? '#f3ece7' : null }} type="text" name="Zip" value={this.state.Zip1} onChange={e => this.setState({ Zip1: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorZIPCD2}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMPID ? 'brown' : null }}>Employed By</label>
                                                    <input type="text" style={{ borderColor: this.state.errorEMPID ? 'brown' : null, backgroundColor: this.state.errorEMPID ? '#f3ece7' : null }} name="Employed_By" value={this.state.Employed_By} onChange={e => this.setState({ Employed_By: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMPID}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorADJADDRESS ? 'brown' : null }}>Employer’s Address</label>
                                                    <div className="ui right icon input">
                                                        <i className="home icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorADJADDRESS ? 'brown' : null, backgroundColor: this.state.errorADJADDRESS ? '#f3ece7' : null }} name="Employee_Address" value={this.state.Employee_Address} onChange={e => this.setState({ Employee_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorADJADDRESS}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMPPHONE ? 'brown' : null }}>Phone Number</label>
                                                    <div className="ui right icon input">
                                                        <i className="phone icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorEMPPHONE ? 'brown' : null, backgroundColor: this.state.errorEMPPHONE ? '#f3ece7' : null }} name="Phone_Number" value={this.state.Phone_Number2} onChange={e => this.setState({ Phone_Number2: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMPPHONE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMPCITY ? 'brown' : null }}>City</label>
                                                    <input type="text" style={{ borderColor: this.state.errorEMPCITY ? 'brown' : null, backgroundColor: this.state.errorEMPCITY ? '#f3ece7' : null }} name="City" value={this.state.City2} onChange={e => this.setState({ City2: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMPCITY}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMPSTATE ? 'brown' : null }}>State</label>
                                                    <select className="" style={{ borderColor: this.state.errorEMPSTATE ? 'brown' : null, backgroundColor: this.state.errorEMPSTATE ? '#f3ece7' : null }} value={this.state.State2} onChange={e => this.setState({ State2: e.target.value })} >
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.STATES.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>

                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMPSTATE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEMPZIPCD ? 'brown' : null }}>Zip</label>
                                                    <input type="text" style={{ borderColor: this.state.errorEMPZIPCD ? 'brown' : null, backgroundColor: this.state.errorEMPZIPCD ? '#f3ece7' : null }} name="Zip" value={this.state.Zip2} onChange={e => this.setState({ Zip2: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEMPZIPCD}</span> : null}
                                                </div>
                                            </div>
                                        </div>


                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSECURITYSUB ? 'brown' : null }}>Social Security Subject</label>
                                                    <div className="ui right icon input">

                                                        <input type="text" style={{ borderColor: this.state.errorSECURITYSUB ? 'brown' : null, backgroundColor: this.state.errorSECURITYSUB ? '#f3ece7' : null }} name="Social_Security_Subject" value={this.state.Social_Security_Subject} onChange={e => this.setState({ Social_Security_Subject: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSECURITYSUB}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSECURITYSPOS ? 'brown' : null }}>Social Security Spouse</label>
                                                    <div className="ui right icon input">

                                                        <input type="text" style={{ borderColor: this.state.errorSECURITYSPOS ? 'brown' : null, backgroundColor: this.state.errorSECURITYSPOS ? '#f3ece7' : null }} name="Social_Security_Spouse" value={this.state.Social_Security_Spouse} onChange={e => this.setState({ Social_Security_Spouse: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSECURITYSPOS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDRIVERLINCSUB ? 'brown' : null }}>Driver’s License Subject</label>
                                                    <div className="ui right icon input">

                                                        <input type="text" style={{ borderColor: this.state.errorDRIVERLINCSUB ? 'brown' : null, backgroundColor: this.state.errorDRIVERLINCSUB ? '#f3ece7' : null }} name="Driver’s_License_Subject" value={this.state.Drivers_License_Subject} onChange={e => this.setState({ Drivers_License_Subject: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDRIVERLINCSUB}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDRIVERLINCSPOS ? 'brown' : null }}>Driver’s License Spouse</label>
                                                    <div className="ui right icon input">

                                                        <input type="text" style={{ borderColor: this.state.errorDRIVERLINCSPOS ? 'brown' : null, backgroundColor: this.state.errorDRIVERLINCSPOS ? '#f3ece7' : null }} name="Driver’s_License_Spouse" value={this.state.Drivers_License_Spouse} onChange={e => this.setState({ Drivers_License_Spouse: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDRIVERLINCSPOS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
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
                                                    <input type="checkbox" name="Accounts" value={this.state.Accounts} checked={this.state.Accountschk} onChange={() => this.isCheck('Accounts')} />
                                                    <label> Banks Accounts / Investment Accounts / Safe Deposits</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input type="checkbox" name="Carbotvs" value={this.state.Carbotvs} checked={this.state.Carbotvschk} onChange={() => this.isCheck('Carbotvs')} />
                                                    <label> Cars / Boats / Vessels or similar</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input type="checkbox" name="Srcofincm" value={this.state.Srcofincm} checked={this.state.Srcofincmchk} onChange={() => this.isCheck('Srcofincm')} />
                                                    <label> Source of Income – Jobs</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input type="checkbox" name="Landprpty" value={this.state.Landprpty} checked={this.state.Landprptychk} onChange={() => this.isCheck('Landprpty')} />
                                                    <label> Land or Property </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input type="checkbox" name="HiddenAsset" value={this.state.HiddenAsset} checked={this.state.HiddenAssetchk} onChange={() => this.isCheck('HiddenAsset')} />
                                                    <label> Hidden Assets</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input type="checkbox" name="BusOrCrop" value={this.state.BusOrCrop} checked={this.state.BusOrCropchk} onChange={() => this.isCheck('BusOrCrop')} />
                                                    <label> Businesses / Corporation </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input type="checkbox" name="Other" value={this.state.Other} checked={this.state.Otherchk} onChange={() => this.isCheck('Other')} />
                                                    <label> Other / Please explain. </label>
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" row" style={{ display: this.state.Otherchk ? 'flex' : 'none' }}>
                                            <div className="six wide column">
                                                <div className="row">
                                                    <input type="text" name="Otherinfo" style={{ borderColor: this.state.errorOTHERINFO ? 'brown' : null, backgroundColor: this.state.errorOTHERINFO ? '#f3ece7' : null }} value={this.state.Otherinfo} onChange={e => this.setState({ Otherinfo: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorOTHERINFO}</span> : null}
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCRTJDGMT ? 'brown' : null }}>Do you have a court Judgement ?</label>
                                                    <select className="" style={{ borderColor: this.state.errorCRTJDGMT ? 'brown' : null, backgroundColor: this.state.errorCRTJDGMT ? '#f3ece7' : null }} value={this.state.Judgement} onChange={e => this.setState({ Judgement: e.target.value })}>
                                                        <option value="">Select</option>
                                                        <option value="Y">Yes</option>
                                                        <option value="N">No</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCRTJDGMT}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorHELPRCVRY ? 'brown' : null }}>If yes, would you need help with post judgement recovery.</label>
                                                    <select className="" style={{ borderColor: this.state.errorHELPRCVRY ? 'brown' : null, backgroundColor: this.state.errorHELPRCVRY ? '#f3ece7' : null }} value={this.state.judgementrecovery} onChange={e => this.setState({ judgementrecovery: e.target.value })}>
                                                        <option value="">Select</option>
                                                        <option value="Y">Yes</option>
                                                        <option value="N">No</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorHELPRCVRY}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPRIORITY ? 'brown' : null }}>Priority Status</label>
                                                    <select className="" style={{ borderColor: this.state.errorPRIORITY ? 'brown' : null, backgroundColor: this.state.errorPRIORITY ? '#f3ece7' : null }} value={this.state.Priority_Status} onChange={e => this.setState({ Priority_Status: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.PRIORITY_LEVEL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPRIORITY}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column" style={{ display: this.props.isCust ? 'none' : 'flex' }}>
                                                <div className="field">
                                                    <label>Assign To</label>
                                                    <select className="" value={this.state.Assign_To} onChange={e => this.setState({ Assign_To: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.ASSIGN_TO.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save&Continue" }) }} >Submit & Continue</button>
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                                <button className="ui  button" type="submit" onClick={() => this.onClear()}>Clear</button>
                                                <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                </div>

            </div>
        );
    }


    // render Child Custody

    renderChild_Custody() {

        return (
            <div>
                <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                    <div className="modal-content">
                        <div className="ui icon header">
                            <div className="ui active inverted loader"></div>
                        </div>
                    </div>
                </div>
                <div className="ui one column grid">

                    <div className=" row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui stackable grid">
                                        <div className=" row" style={{ display: "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui input">
                                                        <input type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui input">
                                                        <input type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorACTIONDETAILS ? 'brown' : null }}>Please explain in detail what action you are looking for</label>
                                                    <div className="ui input">
                                                        <textarea rows="2" style={{ borderColor: this.state.errorACTIONDETAILS ? 'brown' : null, backgroundColor: this.state.errorACTIONDETAILS ? '#f3ece7' : null }} name="ActionYouAreLookingFor" value={this.state.ActionYouAreLookingFor} onChange={e => this.setState({ ActionYouAreLookingFor: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorACTIONDETAILS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSURSTARTDT ? 'brown' : null }}>Surveillance (Start date)</label>
                                                    <div className="ui input">
                                                        <input type="Date" style={{ borderColor: this.state.errorSURSTARTDT ? 'brown' : null, backgroundColor: this.state.errorSURSTARTDT ? '#f3ece7' : null }} name="SurveillanceStartdate" placeholder="Surveillance (Start date)" value={this.state.SurveillanceStartdate} onChange={e => this.setState({ SurveillanceStartdate: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSURSTARTDT}</span> : null}
                                                </div>
                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSURENDDT ? 'brown' : null }}>Surveillance (End date)</label>
                                                    <div className="ui input">
                                                        <input type="Date" style={{ borderColor: this.state.errorSURENDDT ? 'brown' : null, backgroundColor: this.state.errorSURENDDT ? '#f3ece7' : null }} name="SurveillanceEnddate" placeholder="Surveillance (End date)" value={this.state.SurveillanceEnddate} onChange={e => this.setState({ SurveillanceEnddate: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSURENDDT}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row">

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISGPSNEEDED ? 'brown' : null }}>GPS Needed (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISGPSNEEDED ? 'brown' : null, backgroundColor: this.state.errorISGPSNEEDED ? '#f3ece7' : null }} value={this.state.GPSNeeded} onChange={e => this.setState({ GPSNeeded: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISGPSNEEDED}</span> : null}
                                                </div>
                                            </div>

                                        </div>


                                        <div className=" row">

                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDAYSFORSUR ? 'brown' : null }}>Are there specific days for surveillance to be conducted</label>
                                                    <div className="ui input">
                                                        <input type="text" style={{ borderColor: this.state.errorDAYSFORSUR ? 'brown' : null, backgroundColor: this.state.errorDAYSFORSUR ? '#f3ece7' : null }} name="DaysForSurveillanceToBeConducted" value={this.state.DaysForSurveillanceToBeConducted} onChange={e => this.setState({ DaysForSurveillanceToBeConducted: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDAYSFORSUR}</span> : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">

                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null }}>If 2 investigators are needed, do we have the permission to move forward (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null, backgroundColor: this.state.errorISIFTWOINVESTIGATORS ? '#f3ece7' : null }} value={this.state.PermissionToMoveForward} onChange={e => this.setState({ PermissionToMoveForward: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISIFTWOINVESTIGATORS}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row">

                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISPREVIOUSSUR ? 'brown' : null }}>Have you previously conducted any surveillance on the subject (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISPREVIOUSSUR ? 'brown' : null, backgroundColor: this.state.errorISPREVIOUSSUR ? '#f3ece7' : null }} value={this.state.ConductedAnySurveillanceOnTheSubject} onChange={e => this.setState({ ConductedAnySurveillanceOnTheSubject: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISPREVIOUSSUR}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row">

                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISBEYONDTMACTIVE ? 'brown' : null }}>If the subject is active, do we have permission to go beyond the allowed time (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISBEYONDTMACTIVE ? 'brown' : null, backgroundColor: this.state.errorISBEYONDTMACTIVE ? '#f3ece7' : null }} value={this.state.PermissionToGoBeyondTheAllowedTime} onChange={e => this.setState({ PermissionToGoBeyondTheAllowedTime: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISBEYONDTMACTIVE}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row" >
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUDGET ? 'brown' : null }}>Budget for the Investigation</label>
                                                    <div className="ui input">
                                                        <input type="text" style={{ borderColor: this.state.errorBUDGET ? 'brown' : null, backgroundColor: this.state.errorBUDGET ? '#f3ece7' : null }} name="BudgetfortheInvestigation" value={this.state.BudgetfortheInvestigation} onChange={e => this.setState({ BudgetfortheInvestigation: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUDGET}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row" >
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorHEARABOUTUS ? 'brown' : null }}>How did you hear about us ?</label>
                                                    <div className="ui input">
                                                        <input type="text" name="HearAboutUs" value={this.state.HearAboutUs} style={{ borderColor: this.state.errorHEARABOUTUS ? 'brown' : null, backgroundColor: this.state.errorHEARABOUTUS ? '#f3ece7' : null }} onChange={e => this.setState({ HearAboutUs: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorHEARABOUTUS}</span> : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Subject Information</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>

                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorFRSTNM ? 'brown' : null }} >First Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorFRSTNM ? 'brown' : null, backgroundColor: this.state.errorFRSTNM ? '#f3ece7' : null }} name="First_Name" value={this.state.First_Name} onChange={e => this.setState({ First_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorFRSTNM}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorLSTNM ? 'brown' : null }}  >Last Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" style={{ borderColor: this.state.errorLSTNM ? 'brown' : null, backgroundColor: this.state.errorLSTNM ? '#f3ece7' : null }} name="Last_Name" value={this.state.Last_Name} onChange={e => this.setState({ Last_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLSTNM}</span> : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSEX ? 'brown' : null }}>Sex</label>
                                                    <select className="" style={{ borderColor: this.state.errorSEX ? 'brown' : null, backgroundColor: this.state.errorSEX ? '#f3ece7' : null }} value={this.state.Sex} onChange={e => this.setState({ Sex: e.target.value })}>
                                                        <option>Select</option>
                                                        <option value="M">M</option>
                                                        <option value="F">F</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSEX}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label>Age</label>
                                                    <input type="text" name="Age" value={this.state.Age} onChange={e => this.setState({ Age: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorRACE ? 'brown' : null }}>Race</label>
                                                    <input type="text" name="Race" style={{ borderColor: this.state.errorRACE ? 'brown' : null, backgroundColor: this.state.errorRACE ? '#f3ece7' : null }} value={this.state.Race} onChange={e => this.setState({ Race: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorRACE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className=" field">
                                                    <label style={{ color: this.state.errorHEIGHT ? 'brown' : null }}>Height</label>
                                                    <input type="text" name="Height" value={this.state.Height} style={{ borderColor: this.state.errorHEIGHT ? 'brown' : null, backgroundColor: this.state.errorHEIGHT ? '#f3ece7' : null }} onChange={e => this.setState({ Height: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorHEIGHT}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column" >
                                                <div className="field">
                                                    <label style={{ color: this.state.errorWEIGHT ? 'brown' : null }}>Weight</label>
                                                    <input type="text" name="Weight" style={{ borderColor: this.state.errorWEIGHT ? 'brown' : null, backgroundColor: this.state.errorWEIGHT ? '#f3ece7' : null }} value={this.state.Weight} onChange={e => this.setState({ Weight: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorWEIGHT}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className=" field " >
                                                    <label style={{ color: this.state.errorHAIRCOLOR ? 'brown' : null }}>Hair Color</label>
                                                    <input type="text" name="Hair_Color" style={{ borderColor: this.state.errorHAIRCOLOR ? 'brown' : null, backgroundColor: this.state.errorHAIRCOLOR ? '#f3ece7' : null }} value={this.state.Hair_Color} onChange={e => this.setState({ Hair_Color: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorHAIRCOLOR}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field" >
                                                    <label style={{ color: this.state.errorRESADDRESS ? 'brown' : null }}>Residence Address</label>
                                                    <div className="ui input">
                                                        <input type="text" name="Residence_Address" style={{ borderColor: this.state.errorRESADDRESS ? 'brown' : null, backgroundColor: this.state.errorRESADDRESS ? '#f3ece7' : null }} value={this.state.Residence_Address} onChange={e => this.setState({ Residence_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorRESADDRESS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUSADDRESS ? 'brown' : null }}>Business Address</label>
                                                    <div className="ui input">
                                                        <input type="text" name="Business_Address" style={{ borderColor: this.state.errorBUSADDRESS ? 'brown' : null, backgroundColor: this.state.errorBUSADDRESS ? '#f3ece7' : null }} value={this.state.Business_Address} onChange={e => this.setState({ Business_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUSADDRESS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
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
                                                    <input type="text" style={{ borderColor: this.state.errorLICENSEPLATE ? 'brown' : null, backgroundColor: this.state.errorLICENSEPLATE ? '#f3ece7' : null }} name="LicensePlate" value={this.state.LicensePlate} onChange={e => this.setState({ LicensePlate: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLICENSEPLATE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCMAKE ? 'brown' : null }}>Make</label>
                                                    <input type="text" style={{ borderColor: this.state.errorCMAKE ? 'brown' : null, backgroundColor: this.state.errorCMAKE ? '#f3ece7' : null }} name="Make" value={this.state.Make} onChange={e => this.setState({ Make: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCMAKE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCMODEL ? 'brown' : null }}>Model</label>
                                                    <input type="text" style={{ borderColor: this.state.errorCMODEL ? 'brown' : null, backgroundColor: this.state.errorCMODEL ? '#f3ece7' : null }} name="Model" value={this.state.Model} onChange={e => this.setState({ Model: e.target.value })} />
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
                                                    <div className="ui input">
                                                        <input type="text" style={{ borderColor: this.state.errorCDESCRIPTION ? 'brown' : null, backgroundColor: this.state.errorCDESCRIPTION ? '#f3ece7' : null }} name="Description" value={this.state.Description} onChange={e => this.setState({ Description: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCDESCRIPTION}</span> : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEXPCUSTSITUATION ? 'brown' : null }}>With whom is the child living ? Explain the custody situation</label>
                                                    <div className="ui input">
                                                        <textarea style={{ borderColor: this.state.errorEXPCUSTSITUATION ? 'brown' : null, backgroundColor: this.state.errorEXPCUSTSITUATION ? '#f3ece7' : null }} rows="2" name="CustodySituation" value={this.state.CustodySituation} onChange={e => this.setState({ CustodySituation: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEXPCUSTSITUATION}</span> : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorEXPNEGSUBINVOLVE ? 'brown' : null }}>Explain what negative things the subject is involved with?</label>
                                                    <div className="ui input">
                                                        <textarea style={{ borderColor: this.state.errorEXPNEGSUBINVOLVE ? 'brown' : null, backgroundColor: this.state.errorEXPNEGSUBINVOLVE ? '#f3ece7' : null }} rows="2" name="NegativeThingsSubjectInvolved" value={this.state.NegativeThingsSubjectInvolved} onChange={e => this.setState({ NegativeThingsSubjectInvolved: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorEXPNEGSUBINVOLVE}</span> : null}
                                                </div>
                                            </div>
                                        </div>


                                        <div className=" row">

                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPRIORITY ? 'brown' : null }}>Priority Status</label>
                                                    <select className="" style={{ borderColor: this.state.errorPRIORITY ? 'brown' : null, backgroundColor: this.state.errorPRIORITY ? '#f3ece7' : null }} value={this.state.Priority_Status} onChange={e => this.setState({ Priority_Status: e.target.value })}>
                                                        <option>Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.PRIORITY_LEVEL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPRIORITY}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column" style={{ display: this.props.isCust ? 'none' : 'flex' }}>
                                                <div className="field">
                                                    <label>Assign To</label>
                                                    <select className="" value={this.state.Assign_To} onChange={e => this.setState({ Assign_To: e.target.value })}>
                                                        <option>Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.ASSIGN_TO.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                                <button className="ui button" type="submit" onClick={() => this.onClear()}>Clear</button>
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
        );

    };

    // render Infidelity

    renderInfidelity() {
        return (
            <div>
                <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                    <div className="modal-content">
                        <div className="ui icon header">
                            <div className="ui active inverted loader"></div>
                        </div>
                    </div>
                </div>
                <div className="ui one column grid">
                    <div className=" row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui  stackable grid">
                                        <div className=" row" style={{ display: "none" }}>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >Client Id</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Date" value={this.state.Client_Id} onChange={e => this.setState({ Client_Id: e.target.value })} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label>Case Id</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Case_Id" value={this.state.Case_Id} onChange={e => this.setState({ Case_Id: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSURSTARTDT ? 'brown' : null }}>Surveillance (Start date)</label>
                                                    <div className="ui  input">
                                                        <input type="Date" style={{ borderColor: this.state.errorSURSTARTDT ? 'brown' : null, backgroundColor: this.state.errorSURSTARTDT ? '#f3ece7' : null }} name="Surveillance_Start_Date" value={this.state.Surveillance_Start_Date} onChange={e => this.setState({ Surveillance_Start_Date: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSURSTARTDT}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSURENDDT ? 'brown' : null }}>Surveillance (End date)</label>
                                                    <div className="ui  input">
                                                        <input type="Date" style={{ borderColor: this.state.errorSURENDDT ? 'brown' : null, backgroundColor: this.state.errorSURENDDT ? '#f3ece7' : null }} name="Surveillance_End_Date" value={this.state.Surveillance_End_Date} onChange={e => this.setState({ Surveillance_End_Date: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorSURENDDT}</span> : null}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISGPSNEEDED ? 'brown' : null }}>GPS Needed (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISGPSNEEDED ? 'brown' : null, backgroundColor: this.state.errorISGPSNEEDED ? '#f3ece7' : null }} value={this.state.GPS} onChange={e => this.setState({ GPS: e.target.value })}>
                                                        <option value="">Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISGPSNEEDED}</span> : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorACTIONDETAILS ? 'brown' : null }}>Please explain in detail what action you are looking for</label>
                                                    <div className="ui right icon  input">
                                                        <textarea name='Action' style={{ borderColor: this.state.errorACTIONDETAILS ? 'brown' : null, backgroundColor: this.state.errorACTIONDETAILS ? '#f3ece7' : null }} rows="2" value={this.state.Action} onChange={e => this.setState({ Action: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorACTIONDETAILS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDAYSFORSUR ? 'brown' : null }}>Are there specific days for surveillance to be conducted</label>
                                                    <div className="ui right icon  input">
                                                        <textarea name='Surveillance' style={{ borderColor: this.state.errorDAYSFORSUR ? 'brown' : null, backgroundColor: this.state.errorDAYSFORSUR ? '#f3ece7' : null }} rows="1" value={this.state.Surveillance} onChange={e => this.setState({ Surveillance: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDAYSFORSUR}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null }}>If 2 investigators are needed, do we have the permission to move forward (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISIFTWOINVESTIGATORS ? 'brown' : null, backgroundColor: this.state.errorISIFTWOINVESTIGATORS ? '#f3ece7' : null }} value={this.state.Permission_To_Move_Forward} onChange={e => this.setState({ Permission_To_Move_Forward: e.target.value })} >
                                                        <option value="">Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISIFTWOINVESTIGATORS}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISPREVIOUSSUR ? 'brown' : null }}>Have you previously conducted any surveillance on the subject (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISPREVIOUSSUR ? 'brown' : null, backgroundColor: this.state.errorISPREVIOUSSUR ? '#f3ece7' : null }} value={this.state.Surveillance_On_The_Subject} onChange={e => this.setState({ Surveillance_On_The_Subject: e.target.value })}>
                                                        <option value="">Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISPREVIOUSSUR}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISBEYONDTMACTIVE ? 'brown' : null }}>If the subject is active, do we have permission to go beyond the allowed time (Y/N)</label>
                                                    <select className="" style={{ borderColor: this.state.errorISBEYONDTMACTIVE ? 'brown' : null, backgroundColor: this.state.errorISBEYONDTMACTIVE ? '#f3ece7' : null }} value={this.state.Permission_To_Go_Beyond_The_Allowed_Time} onChange={e => this.setState({ Permission_To_Go_Beyond_The_Allowed_Time: e.target.value })} >
                                                        <option value="">Select</option>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISBEYONDTMACTIVE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUDGET ? 'brown' : null }}>Budget for the Investigation</label>
                                                    <div className="ui right icon  input">
                                                        <input name='Budget' style={{ borderColor: this.state.errorBUDGET ? 'brown' : null, backgroundColor: this.state.errorBUDGET ? '#f3ece7' : null }} rows="1" value={this.state.Budget} onChange={e => this.setState({ Budget: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUDGET}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorHEARABOUTUS ? 'brown' : null }}>How did you hear about us ?</label>
                                                    <div className="ui right icon  input">
                                                        <textarea name='Aboutus' rows="1" style={{ borderColor: this.state.errorHEARABOUTUS ? 'brown' : null, backgroundColor: this.state.errorHEARABOUTUS ? '#f3ece7' : null }} value={this.state.Aboutus} onChange={e => this.setState({ Aboutus: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorHEARABOUTUS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Subject Information</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className=" row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorFRSTNM ? 'brown' : null }}>First Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" name="First_Name" style={{ borderColor: this.state.errorFRSTNM ? 'brown' : null, backgroundColor: this.state.errorFRSTNM ? '#f3ece7' : null }} value={this.state.First_Name} onChange={e => this.setState({ First_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorFRSTNM}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorLSTNM ? 'brown' : null }}>Last Name</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input type="text" name="Last_Name" style={{ borderColor: this.state.errorLSTNM ? 'brown' : null, backgroundColor: this.state.errorLSTNM ? '#f3ece7' : null }} value={this.state.Last_Name} onChange={e => this.setState({ Last_Name: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLSTNM}</span> : null}
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSEX ? 'brown' : null }}>Sex</label>
                                                    <select className="" style={{ borderColor: this.state.errorSEX ? 'brown' : null, backgroundColor: this.state.errorSEX ? '#f3ece7' : null }} value={this.state.Sex} onChange={e => this.setState({ Sex: e.target.value })}>
                                                        <option value="">Select</option>
                                                        <option value="M">M</option>
                                                        <option value="F">F</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSEX}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label>Age</label>
                                                    <input type="text" name="Age" value={this.state.Age} onChange={e => this.setState({ Age: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorRACE ? 'brown' : null }}>Race</label>
                                                    <input type="text" name="Race" value={this.state.Race} style={{ borderColor: this.state.errorRACE ? 'brown' : null, backgroundColor: this.state.errorRACE ? '#f3ece7' : null }} onChange={e => this.setState({ Race: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorRACE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className=" field">
                                                    <label style={{ color: this.state.errorHEIGHT ? 'brown' : null }}>Height</label>
                                                    <input type="text" name="Height" value={this.state.Height} style={{ borderColor: this.state.errorHEIGHT ? 'brown' : null, backgroundColor: this.state.errorHEIGHT ? '#f3ece7' : null }} onChange={e => this.setState({ Height: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorHEIGHT}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column" >
                                                <div className="field">
                                                    <label style={{ color: this.state.errorWEIGHT ? 'brown' : null }}>Weight</label>
                                                    <input type="text" name="Weight" value={this.state.Weight} style={{ borderColor: this.state.errorWEIGHT ? 'brown' : null, backgroundColor: this.state.errorWEIGHT ? '#f3ece7' : null }} onChange={e => this.setState({ Weight: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorWEIGHT}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className=" field " >
                                                    <label style={{ color: this.state.errorHAIRCOLOR ? 'brown' : null }}>Hair Color</label>
                                                    <input type="text" name="Hair_Color" value={this.state.Hair_Color} style={{ borderColor: this.state.errorHAIRCOLOR ? 'brown' : null, backgroundColor: this.state.errorHAIRCOLOR ? '#f3ece7' : null }} onChange={e => this.setState({ Hair_Color: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorHAIRCOLOR}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field" >
                                                    <label style={{ color: this.state.errorRESADDRESS ? 'brown' : null }}>Residence Address</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Residence_Address" style={{ borderColor: this.state.errorRESADDRESS ? 'brown' : null, backgroundColor: this.state.errorRESADDRESS ? '#f3ece7' : null }} value={this.state.Residence_Address} onChange={e => this.setState({ Residence_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorRESADDRESS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorBUSADDRESS ? 'brown' : null }}>Business Address</label>
                                                    <div className="ui  input">
                                                        <input type="text" name="Business_Address" style={{ borderColor: this.state.errorBUSADDRESS ? 'brown' : null, backgroundColor: this.state.errorBUSADDRESS ? '#f3ece7' : null }} value={this.state.Business_Address} onChange={e => this.setState({ Business_Address: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorBUSADDRESS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className="row" style={{ backgroundColor: "#2e3138" }}>
                                            <h1 style={{ fontSize: 20, color: "white", paddingLeft: 15, paddingBottom: 10 }}>Vehicle Info</h1>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className=" field">
                                                    <label style={{ color: this.state.errorLICENSEPLATE ? 'brown' : null }}>License Plate #</label>
                                                    <input type="text" name="License_Plate" style={{ borderColor: this.state.errorLICENSEPLATE ? 'brown' : null, backgroundColor: this.state.errorLICENSEPLATE ? '#f3ece7' : null }} value={this.state.License_Plate} onChange={e => this.setState({ License_Plate: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorLICENSEPLATE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column" >
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCMAKE ? 'brown' : null }}>Make</label>
                                                    <input type="text" name="Make" style={{ borderColor: this.state.errorCMAKE ? 'brown' : null, backgroundColor: this.state.errorCMAKE ? '#f3ece7' : null }} value={this.state.Make} onChange={e => this.setState({ Make: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCMAKE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className=" field " >
                                                    <label style={{ color: this.state.errorCMODEL ? 'brown' : null }}>Model</label>
                                                    <input type="text" name="Model" style={{ borderColor: this.state.errorCMODEL ? 'brown' : null, backgroundColor: this.state.errorCMODEL ? '#f3ece7' : null }} value={this.state.Model} onChange={e => this.setState({ Model: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCMODEL}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" >
                                            <div className="fifteen wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCDESCRIPTION ? 'brown' : null }}>Description</label>
                                                    <div className="ui right icon  input">
                                                        <textarea name='aboutus' style={{ borderColor: this.state.errorCDESCRIPTION ? 'brown' : null, backgroundColor: this.state.errorCDESCRIPTION ? '#f3ece7' : null }} rows="1" value={this.state.Description} onChange={e => this.setState({ Description: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCDESCRIPTION}</span> : null}
                                                </div>
                                            </div>

                                        </div>

                                        <div className=" row" >
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorPRIORITY ? 'brown' : null }}>Priority Status</label>
                                                    <select className="" style={{ borderColor: this.state.errorPRIORITY ? 'brown' : null, backgroundColor: this.state.errorPRIORITY ? '#f3ece7' : null }} value={this.state.Priority_Status} onChange={e => this.setState({ Priority_Status: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.PRIORITY_LEVEL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorPRIORITY}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column" style={{ display: this.props.isCust ? 'none' : 'flex' }}>
                                                <div className="field">
                                                    <label>Assign To</label>
                                                    <select className="" value={this.state.Assign_To} onChange={e => this.setState({ Assign_To: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.DropdownCasesListArr.map((data) => data.ASSIGN_TO.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.caseType), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                                <button className="ui  button" type="submit" onClick={() => this.onClear()} >Clear</button>
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
        );
    };

}