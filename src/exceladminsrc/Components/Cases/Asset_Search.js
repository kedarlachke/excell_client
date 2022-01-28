import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { CasesCRUDOpsQuery, DropdwonQueryLeads, caseDetails } from '../Queries/queries';
import {
    caseState,
    setSearchParams,
    setDropdownParams,
    formatDate,
    formatSystemDate,
    formatDate1,
    setCRUDParams,

    Asset_SearchGetInitialState,
    Asset_SearchGetResultState,
    Asset_SearchGetErrorState,
    Asset_SearchGetErrorStateInitial,
    Asset_SearchGetClearState,
    Asset_SearchGetInputFields


} from './caseExport';
var DropdownCasesList = [];
var errorval = false
export default class CaseGeneric extends Component {
    constructor(props) {
        super(props)
        this.state = caseState(this.props.caseType,'caseGetInitialState');
        this.gotoCaseType = this.props.gotoCaseType.bind(this)
    };

    componentDidMount() {

        this.DropdownCases(this.props.caseType);

        // Populate Data When Edit Mode
        if (this.props.data) {
            this.setState({
                // Dispalycomp: !this.state.Dispalycomp
            });
            this.PopulateData(this.props.data);
        };

        // Populate Data when back to Case tab
        if (this.props.Case_Id) {
            this.setState({
                // Dispalycomp: !this.state.Dispalycomp
            });
            this.PopulateData(this.props.Case_Id);
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
            console.log(result.data.caseDetails.length);
            if (result.data.caseDetails.length != 0) {
                await this.setState(caseState(this.props.caseType,'caseGetResultState',result));
            }


            // console.log(this.state.Accounts);
            //console.log(this.state.Accountschk);
if(this.props.caseType=='ASSET_SEARCH')
{

            if (this.state.Accounts == 'Y') {

                this.setState({
                    Accountschk: !this.state.Accountschk
                })
            }

            if (this.state.Carbotvs == 'Y') {

                this.setState({
                    Carbotvschk: !this.state.Carbotvschk
                })
            }

            if (this.state.Srcofincm == 'Y') {

                this.setState({
                    Srcofincmchk: !this.state.Srcofincmchk
                })
            }

            if (this.state.Landprpty == 'Y') {

                this.setState({
                    Landprptychk: !this.state.Landprptychk
                })
            }

            if (this.state.HiddenAsset == 'Y') {

                this.setState({
                    HiddenAssetchk: !this.state.HiddenAssetchk
                })
            }

            if (this.state.BusOrCrop == 'Y') {

                this.setState({
                    BusOrCropchk: !this.state.BusOrCropchk
                })
            }

            if (this.state.Other == 'Y') {

                this.setState({
                    Otherchk: !this.state.Otherchk
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
          if(caseType=='ASSET_SEARCH')
          {
            DropdownCasesList.push({
                "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL,
                "ASSIGN_TO": result.data.ASSIGN_TO,
                "STATES": result.data.STATES,
                "BUSINESS_TYPES": result.data.BUSINESS_TYPES

            })
        }

            this.setState({ DropdownCasesListArr: DropdownCasesList });

        }

    };


    // To Create Case
    async CreateCases(typeofCase,inputFieldList) {
        if (this.props.CLIENTID) {


            var result = '', errorMessage = '', errors = [];
            try {
                await this.setState({ Client_Id: this.props.CLIENTID })
                result = await execGql('mutation', CasesCRUDOpsQuery, setCRUDParams('CREATE', typeofCase ,inputFieldList))
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
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    console.log(errorMessage[key]);
                    this.setState(caseState(this.props.caseType,'caseGetErrorState',errorMessage,key));
                }

            }
            else {
                console.log(result);
                //this.navigateToCaseList()
                //this.gotoCaseType();
                await this.setState({ Case_Id: result.data.CasesAffected[0] });
                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Case Details Accepted ..!!")
                    this.setState(caseState(this.props.caseType,'caseGetErrorStateInitial'));
                    errorval = false
                    this.PopulateData(this.state.Case_Id);

                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.gotoCaseType(this.state.Client_Id, this.state.Case_Id);
                }


            }
        }
        else {
            await this.setState({ DispalyBackColor: true });
            this.showMsg("Client Details Must be fill first")
        }

    };



// setCRUDParams(xnsType,typeofCase,inputFieldList)
    // To Update Case
    async UpdateCases(typeofCase,inputFieldList) {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('mutation', CasesCRUDOpsQuery, setCRUDParams('UPDATE', typeofCase ,inputFieldList))
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
            errorMessage = JSON.parse(errorMessage);
            for (let key in errorMessage) {
                console.log(errorMessage[key]);
                this.setState(caseState(this.props.caseType,'caseGetErrorState',errorMessage,key));
            }

        }
        else {
            console.log(result);
            //this.navigateToCaseList()
            // this.gotoCaseType();
            await this.setState({ Case_Id: result.data.CasesAffected[0] });
            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Case Details Accepted ..!!")
                this.setState(caseState(this.props.caseType,'caseGetErrorStateInitial'));
                errorval = false
                this.PopulateData(this.state.Case_Id);
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                this.gotoCaseType(this.state.Client_Id, this.state.Case_Id);
            }
        }

    };






    // ..............Date Formate mm/dd/yyyy to yyyymmdd  ..........


    // To Check Checkboxes
    async isCheck(type) {
        //console.log('hiiiiiii');
        console.log(type);

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
        return this.props.history.push('/cases')
    };

    // CRUD Operations
    CRUD_operation(typeofCase) {
        if (this.state.tcode == 'CREATE') {
            this.CreateCases(typeofCase,this.state)
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateCases(typeofCase,this.state)

        }
    };

    // To Clear Inputfield & error
    onClear() {
        this.setState(caseState(this.props.caseType,'caseGetClearState'));
        errorval = false
    };


    //............for show msg Popup..........
    async showMsg(text) {
        await this.setState({ showMsgText: text })
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    };


    render() {

        if (this.state.Dispalycomp) {

            renderCase(this.props.caseType)
   
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
renderCase(caseType)
{
    if(caseType="ASSET_SEARCH")  renderAsset_Search();
}

renderAsset_Search()
{

    return (
        <div>
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
                                    <div className=" row">
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
                                    </div>
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
                                        <div className="five wide column">
                                            <div className="field">
                                                <label>Assign To</label>
                                                <select className="" value={this.state.Assign_To} onChange={e => this.setState({ Assign_To: e.target.value })}>
                                                    <option value="">Select</option>
                                                    {this.state.DropdownCasesListArr.map((data) => data.ASSIGN_TO.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* -- popup after changing status-- */}
                                    <div id="snackbar" style={{ backgroundColor: this.state.DispalyBackColor ? "#dd212d" : "rgba(33,155,166,0.88)" }}>  <i className="info circle icon"></i>{this.state.showMsgText}</div>
                                    <div className=" row">
                                        <div className="ten wide column">
                                            <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save&Continue" }) }} >Submit & Continue</button>
                                            <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                            <button className="ui  button" type="submit" onClick={() => this.onClear()}>Clear</button>
                                            <button className="ui button" type="submit" onClick={() => this.navigateToCaseList()} >Cancel</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="ui message">
                        <pre>
                            {JSON.stringify({

                                    "Surveillance_Start_Date": this.state.Surveillance_Start_Date,
                                   " Surveillance_End_Date": this.state.Surveillance_End_Date,
                                    "GPS": this.state.GPS,
                                    "Action": this.state.Action,
                                    "Surveillance": this.state.Surveillance,
                                   "Permission_To_Move_Forward": this.state.Permission_To_Move_Forward,
                                    "Surveillance_On_The_Subject": this.state.Surveillance_On_The_Subject,
                                    "Permission_To_Go_Beyond_The_Allowed_Time":this.state.Permission_To_Go_Beyond_The_Allowed_Time,
                                    "Budget": this.state.Budget,
                                    "Aboutus":this.state.Aboutus,
                                    "FRSTNM": this.state.First_Name,
                                    "LSTNM": this.state.Last_Name,
                                    "SEX": this.state.Sex,
                                    "AGE": this.state.Age,
                                    "RACE": this.state.Race,
                                    "HEIGHT": this.state.Height,
                                    "WEIGHT": this.state.Weight,
                                    "HAIRCOLOR": this.state.Hair_Color,
                                    "RESADDRESS": this.state.Residence_Address,
                                    "BUSADDRESS": this.state.Business_Address,
                                   " License_Plate": this.state.License_Plate,
                                    "Make": this.state.Make,
                                    "Model": this.state.Model,
                                    "Description": this.state.Description,
                                "PRIORITY": this.state.Priority_Status,
                                "ASSIGNUSER": this.state.Assign_To
                            })}
                        </pre>
                    </div> */}
                </div>
                <div className="one wide computer one wide tablet one wide mobile column">
                </div>
            </div>

        </div>
    );
}


































}