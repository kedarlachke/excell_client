import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { ContractsCRUDOps, contractDetails } from '../Queries/queries';
export default class CustomContract extends Component {
    constructor(props) {
        super(props);
        // this.updateContent = this.updateContent.bind(this);
        this.onChange = this.onChange.bind(this);
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
        this.state = {
            CLIENTID: "",
            SERVICETYPE: "",
            CIDSYS: "",
            contenttext: "",
            tcode: 'CREATE',
            Dispalycomp: true,
            DispalyBackColor: false,
            OnClickButton: ''
        };
    }

  async  componentDidMount() {
        if (this.props.data) {
            this.setState({
                Dispalycomp: !this.state.Dispalycomp
            });
            
           await this.PopulateData();
        }

    };

    // To Populate Data
    async PopulateData() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', contractDetails, this.setSearchParams())
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

               console.log(result.data.contractDetails[0].CUSTOMCON);
              await  this.setState({
                    CLIENTID: result.data.contractDetails[0].CLIENTID,
                    SERVICETYPE: result.data.contractDetails[0].SERVICETYPE,
                    CIDSYS: result.data.contractDetails[0].CIDSYS,
                    contenttext:result.data.contractDetails[0].CUSTOMCON,
                    tcode: 'UPDATE',
                    Dispalycomp: !this.state.Dispalycomp
                });
        }

    };

    setSearchParams() {
        var caseid = ''
        if (this.props.data) {
            caseid = this.props.data
        }
        else if (this.props.Case_Id) {
            caseid = this.props.Case_Id
        }
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CIDSYS": caseid
        }
        return parameters

    };

    // To create contract
    async CreateContract() {
        if (this.props.CLIENTID) {
            await this.setState({
                CIDSYS: this.props.Case_Id,
                CLIENTID: this.props.CLIENTID,
                SERVICETYPE: this.props.SERVICETYP
            });
            var result = '', errorMessage = '', errors = [];
            try {
                result = await execGql('mutation', ContractsCRUDOps, this.setCreateParams())
                // console.log(result);
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
                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Business Details Added Successfully..!!")
                    //this.PopulateData()

                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.gotoCaseType(this.state.CLIENTID, this.state.CIDSYS);
                    // this.setCaseId(result.data.CasesAffected[0])
                }

            }

        }
        else {
            await this.setState({ DispalyBackColor: true });
            this.showMsg("Client Details Must be fill first")
        }

    };

    setCreateParams() {
        var parameters = {
            "transaction": "CREATE",
            "contracts": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CLIENTID": this.state.CLIENTID,
                    "CIDSYS": this.state.CIDSYS,
                    "SERVICETYPE": this.state.SERVICETYPE,
                    "CUSTOMCON": this.state.contenttext
                }
            ]
        }
        return parameters

    };

    // To Update contract
    async UpdateContract() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('mutation', ContractsCRUDOps, this.setUpdateParams())
            // console.log(result);
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

            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Business Details Updated Successfully..!!");
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                this.gotoCaseType(this.state.CLIENTID, this.state.CIDSYS);
            }

        }
    };


    setUpdateParams() {
        var parameters = {
            "transaction": "UPDATE",
            "contracts": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CLIENTID": this.state.CLIENTID,
                    "CIDSYS": this.state.CIDSYS,
                    "SERVICETYPE": this.state.SERVICETYP,
                    "CUSTOMCON": this.state.contenttext
                }
            ]
        }
        return parameters

    };

    onChange(evt) {
        //console.log(evt.editor.getData());
        var newContent = evt.editor.getData();
        this.setState({
            contenttext: newContent
        })
    };

    // Navigate To Case List
    navigateToCaseList() {
        return this.props.history.push('/cases')
    };

     // CRUD Operations
     CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            this.CreateContract()
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateContract()

        }
    };

    //............for show msg..........
    async showMsg(text) {
        await this.setState({ showMsgText: text })
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    };

    render() {
        if(this.state.Dispalycomp)
        {
        return (

            <div className="ui one column grid">
                <div id="leadheader" className="one wide computer one wide tablet one wide mobile row">
                </div>
                <div className="three column row">
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                    <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                        <div className="ui segment" >
                            <div className="ui form">
                                <div className="ui three column stackable grid">

                                    <div className="row" style={{ marginLeft: "0px" }} >
                                        <div className=""  >
                                            <div style={{ width: "94%" }}>
                                                <div className="panel" style={{ padding: "10px" }}>
                                                    <CKEditor
                                                        activeClass="p10"
                                                        content={this.state.contenttext}
                                                        events={{ "change": this.onChange }}
                                                    />
                                                </div>
                                            </div>
                                            <label id="contractError" style={{ color: "red" }}></label>
                                        </div>
                                        <input id="TCode_con" style={{ width: "100%", display: "none" }} />
                                    </div>
                                    {/* -- popup after changing status-- */}
                                    <div id="snackbar" style={{ backgroundColor: this.state.DispalyBackColor ? "#dd212d" : "rgba(33,155,166,0.88)" }}>  <i className="info circle icon"></i>{this.state.showMsgText}</div>
                                    <div className="row" >
                                        <div className="">
                                            <button className="ui primary button" type="submit"  onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save&Continue" }) }} >Submit & Continue</button>
                                            <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                            <button className="ui  button" type="clear" >Clear</button>
                                            <button className="ui  button" type="submit" onClick={() => this.navigateToCaseList()}>Cancel</button>
                                            <button className="ui  button" type="submit" >Skip & Continue</button>
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
    else {
        return (
            <div className="ui icon header">
                <div className="ui active loader"></div>
            </div>
        );
    }
    }
}