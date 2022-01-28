import React, { Component, } from 'react';
import { execGql } from '../apolloClient/apolloClient'
import { SignatureCrudOps, SearchSignature, UpdateCaseStatusQuery, clientDetails, SendMailLeadQuery } from '../Queries/queries'
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
            errorCase_Id: '',
            fName: '',
            lName: '',
            officeName: '',
            email: '',
            formid: 'support@excellinvestigation.com',
            Subject: 'Excell Investigation Case Register',
            Message: ''
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
        this.populateData(this.state.CLIENTID)
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
            this.sendMail()
            
            if(this.props.status==='Submitted'){  this.gotoPreviousTab(6)}else{ this.navigateToCaseList()}
            

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
            return this.props.history.push('/cases')
        }

    };

    /*---------send mail---------*/
    async sendMail() {
        var result = '', errorMessage = '';
        try {

            result = await execGql('mutation', SendMailLeadQuery, this.setMailSendingParams())
        }
        catch (err) {
            // errors = err.errorsGql;
            errorMessage = err.errorMessageGql;

        }

        if (!result) {
            try {
                errorval = true
                console.log(errorMessage);
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    this.setState({
                        errorFrom: errorMessage[key].errorFROMID,
                        errorTo: errorMessage[key].errorTOID,
                        errorSubject: errorMessage[key].errorMAILSUB,
                        errorMessage: errorMessage[key].errorMSGBODY,
                        errorCc: errorMessage[key].errorMAILCC,
                        errorBcc: errorMessage[key].errorMAILBCC,
                    });
                }
            } catch (error) {
                console.log(error);

            }

        }
        else {
            console.log(result);
        }
    }

    /*---------set mail sending params---------*/
    setMailSendingParams() {
        var parameters = {
            "emails": [{
                "CLNT": "1002",
                "LANG": "EN",
                "FROMID": this.state.formid,
                "TOID": this.state.email,
                "MAILFOR": "Case",
                "MAILFORID": this.state.Case_Id,
                "MAILSUB": this.state.Subject,
                "MAILCC": '',
                "MAILBCC": '',
                "MSGBODY": `<div>To,<br>${this.state.fName} ${this.state.lName},<br>${this.state.officeName}
                <br><br>Excel Investigation takes this opportunity to welcome you as a new customer. We are thirilled to have you with us.
                <br>We pride our self on offering our customers responsive, competent and excellent service. Our customers are the most important part of our business, and we work tirelessly to ensure your complete satisfaction,now and for as long as you are a customer.
                <br>Login URL :- http://81.4.102.11/customersignin</div>`,
            }]
        }

        return parameters
    }

    async populateData(clntid) {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', clientDetails, this.setPopulateDataParams(clntid))
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
            if (result.data.clientDetails.length != 0) {

                await this.setState({
                    showLoading: !this.state.showLoading
                });
                this.setState({
                    fName: result.data.clientDetails[0].FIRSTNM,
                    lName: result.data.clientDetails[0].LASTNM,
                    officeName: result.data.clientDetails[0].OFFICENM,
                    email: result.data.clientDetails[0].EMAILID,

                });
            }
        }

    }

    setPopulateDataParams(clntid) {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "EMAILID": "",
            "CLNTID": clntid
        }
        return parameters

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

                                    <div className="one row" style={{ display: 'none' }}>
                                        <div className="six wide column">
                                            <div className="field">

                                                <input style={{ fontSize: 'x-large', borderColor: this.state.errorSignatureId ? 'brown' : null, backgroundColor: this.state.errorSignatureId ? '#f3ece7' : null }} type="text" name="SignatureId" placeholder="SignatureId"
                                                    value={this.state.SignatureId} onChange={e => this.setState({ SignatureId: e.target.value })} />
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorSignatureId}</span> : null}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="one row">
                                        <div className="six wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorSign ? 'brown' : null }}>Name/Initials</label>
                                                <input style={{ fontSize: 'x-large', borderColor: this.state.errorSign ? 'brown' : null, backgroundColor: this.state.errorSign ? '#f3ece7' : null }} type="text" name="Sign" placeholder="Sign"
                                                    value={this.state.Sign} onChange={e => this.setState({ Sign: e.target.value })} />
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorSign}</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="one row">
                                        <div className="six wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorSign ? 'brown' : null }}>Signature</label>
                                                <input readOnly style={{ fontFamily: 'RageItalic', fontSize: '-webkit-xxx-large' }} value={this.state.Sign} onChange={e => this.setState({ Sign: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="ten wide column">
                                        {this.props.status==='Submitted'?<button className="ui primary button" type="submit" onClick={() => this.gotoPreviousTab(6)}>Continue</button>:
                                            <button className="ui primary button" type="submit" onClick={() => this.submitSignature()}>Submit</button>}
                                            {this.props.status==='Submitted'?<button className="ui primary button" type="submit" onClick={() => this.submitSignature()}>Submit & Continue</button>:null}
                                            {/* <button className="ui primary button" type="submit" >Save</button> */}
                                            <button className="ui  button" type="clear" onClick={() => this.clearScreen()}>Clear</button>
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