import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { RatecardsCRUDOps, ratecardDetails } from '../Queries/queries';
var errorval = false
export default class Services extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Service: "",
            Rate: "",
            IsActive: '',
            ITEMID: '',
            CIDSYS: '',
            CLIENTID: '',
            tcode: 'CREATE',
            //ERROR STATE
            errorCLIENTID: '',
            errorCIDSYS: '',
            errorITEMDECS: '',
            errorITEMRATE: '',
            errorISACTIVE: '',
            Dispalycomp: true
        }
    };

    async  componentDidMount() {

        if (this.props.location.state) {
            // console.log(this.props.location.state.data);
            await this.setState({ Dispalycomp: !this.state.Dispalycomp })
            this.populateData();
        }
    };


    // Populate Rate Card Details 
    async populateData() {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', ratecardDetails, this.setSearchParams())
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
            //console.log(this.props.data.data.CID)
            if (result.data.ratecardDetails.length != 0) {
                this.setState({
                    ITEMID: result.data.ratecardDetails[0].ITEMID,
                    CIDSYS: result.data.ratecardDetails[0].CIDSYS,
                    CLIENTID: result.data.ratecardDetails[0].CLIENTID,
                    Service: result.data.ratecardDetails[0].ITEMDECS,
                    Rate: result.data.ratecardDetails[0].ITEMRATE,
                    IsActive: result.data.ratecardDetails[0].ISACTIVE,
                    tcode: 'UPDATE',
                    Dispalycomp: !this.state.Dispalycomp
                });
            }
            else {
                this.setState({
                    tcode: 'CREATE',
                    Dispalycomp: !this.state.Dispalycomp
                })
            }


        }

    };

    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CLIENTID": "",
            "CIDSYS": "",
            "ITEMID": this.props.location.state.data
        }
        return parameters

    };

    // To Craete Service
    async CraeteRateCard() {
        var result = '', errorMessage = '';
        try {
            console.log(this.setCreateParams());
            result = await execGql('mutation', RatecardsCRUDOps, this.setCreateParams())
            // console.log(result);
        }
        catch (err) {
            // errors = err.errorsGql;
            errorMessage = err.errorMessageGql;

        }

        if (!result) {
            errorval = true
            errorval = true
            try {
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    console.log(errorMessage[key]);
                    this.setState({
                        errorITEMDECS: errorMessage[key].errorITEMDECS,
                        errorITEMRATE: errorMessage[key].errorITEMRATE,
                        errorISACTIVE: errorMessage[key].errorISACTIVE
                    });
                }
            } catch (error) {
                console.log(error);

            }

        }
        else {
            console.log(result);
            this.navigateToList()
        }

    };


    setCreateParams() {
        var parameters = {
            "transaction": "CREATE",
            "Ratecards": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CLIENTID": "OPEN",
                    "CIDSYS": "OPEN",
                    "ITEMDECS": this.state.Service,
                    "ITEMRATE": this.state.Rate,
                    "ISACTIVE": this.state.IsActive
                }
            ]
        }
        return parameters

    };


    // To Craete Service
    async UpdateRateCard() {
        var result = '', errorMessage = '';
        try {
            console.log(this.setUpadteParams());
            result = await execGql('mutation', RatecardsCRUDOps, this.setUpadteParams())
            // console.log(result);
        }
        catch (err) {
            // errors = err.errorsGql;
            errorMessage = err.errorMessageGql;

        }

        if (!result) {
            errorval = true
            errorval = true
            try {
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    console.log(errorMessage[key]);
                    this.setState({
                        errorITEMDECS: errorMessage[key].errorITEMDECS,
                        errorITEMRATE: errorMessage[key].errorITEMRATE,
                        errorISACTIVE: errorMessage[key].errorISACTIVE
                    });
                }
            } catch (error) {
                console.log(error);

            }

        }
        else {
            console.log(result);
            this.navigateToList()
        }

    };


    setUpadteParams() {
        var parameters = {
            "transaction": "UPDATE",
            "Ratecards": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "ITEMID": this.state.ITEMID,
                    "CLIENTID": this.state.CLIENTID,
                    "CIDSYS": this.state.CIDSYS,
                    "ITEMDECS": this.state.Service,
                    "ITEMRATE": this.state.Rate,
                    "ISACTIVE": this.state.IsActive
                }
            ]
        }
        return parameters

    };

    // Rate Card CRUD_operation
    CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            this.CraeteRateCard()
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateRateCard()

        }
    };


    // Navigate to List
    navigateToList() {
        return this.props.history.push('/settings')
    };

    onClear() {
        this.setState({
            Service: "",
            Rate: "",
            IsActive: ""
        })
    }

    render() {
        if (this.state.Dispalycomp) {
            return (
                <div className="ui one column grid">
                    <div className=" row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <h1 className="ui left aligned header" id="title_header">RATE CARD - ADD NEW</h1>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                    </div>
                    <div className=" row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">

                            <div className="ui segment" >
                                <div className="ui form">
                                    <div className="ui  stackable grid">
                                        <div className=" row">
                                            <div className="six wide column">
                                                <div className="field">
                                                    <label>Service</label>
                                                    <input type="text" name="workCategory" placeholder="Service" style={{ borderColor: this.state.errorITEMDECS ? 'brown' : null, backgroundColor: this.state.errorITEMDECS ? '#f3ece7' : null }} value={this.state.Service} onChange={e => this.setState({ Service: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorITEMDECS}</span> : null}
                                                </div>
                                            </div>
                                            <div className="four wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorITEMRATE ? 'brown' : null }}>Rate</label>
                                                    <input type="text" name="rate" placeholder="Rate" style={{ borderColor: this.state.errorITEMRATE ? 'brown' : null, backgroundColor: this.state.errorITEMRATE ? '#f3ece7' : null }} value={this.state.Rate} onChange={e => this.setState({ Rate: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorITEMRATE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorISACTIVE ? 'brown' : null }}>Is Active</label>
                                                    <select className="" style={{ borderColor: this.state.errorISACTIVE ? 'brown' : null, backgroundColor: this.state.errorISACTIVE ? '#f3ece7' : null }} value={this.state.IsActive} onChange={e => this.setState({ IsActive: e.target.value })}>
                                                        <option value="">Select</option>
                                                        <option value="Y">Yes</option>
                                                        <option value="N">No</option>
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorISACTIVE}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => this.CRUD_operation()}>Save</button>
                                                <button className="ui  button" type="submit" onClick={() => this.onClear()}>Clear</button>
                                                <button className="ui  button" type="submit" onClick={() => this.navigateToList()}>Cancel</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                    </div>
                    {/* <div className="ui message">
                    <pre>
                        {JSON.stringify({
                            "WorkCategory": this.state.WorkCategory,
                            "Rate": this.state.Rate,

                        })}
                    </pre>
                </div> */}
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