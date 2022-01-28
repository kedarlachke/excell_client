import React, { Component, } from 'react';
import { execGql } from '../apolloClient/apolloClient'
import { SignatureCrudOps, SearchSignature, UpdateCaseStatusQuery } from '../Queries/queries'
var CLNT = "1002";
var LANG = "EN"
var errorval = false;
var transaction = "CREATE";
export default class Signature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Case_Id: '',
            CLIENTID: '',
            Sign: '',
            errorSign: '',
            errorCase_Id: ''
        }
        this.showMsg = this.props.showMsg.bind(this);
        this.gotoPreviousTab = this.props.gotoPreviousTab.bind(this);
    };

    async  componentDidMount() {

        if (!this.props.CLIENTID) {
            this.showMsg("Client details not save.\n Please save Client details first", true);
            this.gotoPreviousTab(0)
        }
        else if (!this.props.Case_Id) {
            this.showMsg("Case details not save.\n Please save case details first", true);
            this.gotoPreviousTab(1)
        }

        await this.setState({ Case_Id: this.props.Case_Id, CLIENTID: this.props.CLIENTID })
        this.SearchSignature();
    }

    // TO Create Signature and Update
    async submitSignature() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('mutation', SignatureCrudOps, this.setsubmitSignatureParams())
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
            this.setState({
                SignatureId: result.data.ESignatureCRUDOps[0]
            });
            this.showMsg('Case Submitted', false);
            await this.SearchSignature();
            this.updateStatus()
            this.navigateToCaseList()

        }

    }

    // To Populate Data
    async SearchSignature() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', SearchSignature, this.setSearchSignatureParams())
            // console.log(result);
        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }
        console.log(result.data);

        if (!result) {
            console.log(errors);
            console.log(errorMessage);
        }
        else {
            if (result.data.searchESignatures.length != 0) {
                console.log(result);
                this.setState({
                    Sign: result.data.searchESignatures[0].SIGNATURE,
                    SignatureId: result.data.searchESignatures[0].SIGNATUREID

                }
                )
                if (result.data.searchESignatures[0].SIGNATUREID == '') {
                    transaction = "CREATE";
                } else {
                    transaction = "UPDATE";
                }
            } else {
                transaction = "CREATE";
            }

        }
    }


    // To Clear Error Span
    clearErrorspanScreenFields() {
        this.setState({ errorSign: '' });
    }

    // To Clear Input field
    clearScreenFields() {
        this.setState({ Sign: "" });
    }


    // To Clear Screen
    clearScreen() {
        this.clearScreenFields();
        this.clearErrorspanScreenFields();
    }

    // To Set Serach Parameters
    setSearchSignatureParams() {
        let parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "SIGNATUREID": this.state.SignatureId,
            "CID": this.state.CLIENTID,
            "CIDSYS": this.state.Case_Id
        }
        return parameters;
    }

    // To set create parameters
    setsubmitSignatureParams() {
        let parameters = {
            "ESignatures": [{
                "CLNT": "1002",
                "LANG": "EN",
                "SIGNATUREID": this.state.SignatureId,
                "CID": this.state.CLIENTID,
                "CIDSYS": this.state.Case_Id,
                "FONTTYPE": "RageItalic",
                "TAGOPEN": "<p>",
                "SIGNATURE": this.state.Sign,
                "TAGCLOSE": "</p>"

            }],
            "transaction": transaction
        }
        return parameters
    }

    // to Update Case Status
    async updateStatus() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('mutation', UpdateCaseStatusQuery, this.setUpdateCaseParams())
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
        }

    }

    // To set Upadatecase Parameters
    setUpdateCaseParams() {
        let Status = ''
        this.props.ContractSkip ? Status = '07' : Status = '09'
        let parameters = {

            "casestatus": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS": this.state.Case_Id,
                    "STATUS": Status
                }
            ]
        }
        return parameters
    }

    // Navigate To Case List
    navigateToCaseList() {

        if (this.props.isCust) {
            return this.props.history.push('/customerdashboard')
        }
        else {
            return this.props.history.push('/Dashboard/Case_main')
        }

    };

    // To Render UI
    render() {
        return (
            <div className="ui one column grid">
                <div className=" row">
                    <div className="sixteen wide computer fourteen wide tablet fourteen wide mobile column">
                        <div className="ui segment" >
                            <div className="ui form">
                                <div className="ui  stackable grid">
                                    <div className="row" />
                                    <div className="row" />
                                    <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                        <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                            <div className="field">
                                                <label >Signature</label>
                                            </div>
                                        </div>
                                        <div className="row" style={{ padding: '14px' }} >
                                            <div className="field">
                                                <input readOnly style={{ fontFamily: 'RageItalic', fontSize: '-webkit-xxx-large' }} value={this.state.Sign} />
                                            </div>
                                        </div>
                                    </div>
                                    {/*............................................  */}
                                    <div className="row">
                                        <div className="ten wide column">
                                            <button className="ui  button" type="submit" onClick={() => this.navigateToCaseList()}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}