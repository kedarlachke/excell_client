import React, { Component } from 'react';
import { ClientCRUDOps, clientDetails, DDLAddCustomer } from '../Queries/queries'
import { execGql } from "../apolloClient/apolloClient";
export default class CustomerEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CLNTID: "",
            tcode: "CREATE",
            fName: '',
            lName: '',
            officeName: '',
            email: '',
            phoneNo: '',
            faxNo: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            bestMethodOfCntct: '',
            bestTimeToCall: '',
            stateDDL: [],
            bestMethodCntctDDL: [],
            bestTimeCallDDL: [],
            errorFirstname: '',
            errorLastname: '',
            errorEmail: '',
            errorPhoneno: '',
            errorADDRESS: '',
            errorCITY: '',
            errorOFFICENM: '',
            isError: false,
            showLoading: true,
            OnClickButton: '',
            showMsgText: ''
        }
    }

    async componentDidMount() {
        await this.populateDDL()

        // Populate Data When Edit Mode
        if (this.props.data) {
            await this.populateData(this.props.data.data.CLNTID);
        };

        // Populate Data when back to Client tab
        if (this.props.CLIENTID) {
            await this.populateData(this.props.CLIENTID);
        }
    };

    // To Fetch DropDwon Values
    async populateDDL() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', DDLAddCustomer, this.setDropdownParams())
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
            //console.log(result);
            await this.setState({
                stateDDL: result.data.STATES,
                bestMethodCntctDDL: result.data.BEST_METHOD_OF_CONTACT,
                bestTimeCallDDL: result.data.BEST_TIME_TO_CALL
            })
        }
    }
    
    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters

    };

    // Fetch Data When EDIT Mode
    async populateData(clntid) {
        var result = '', errorMessage = '', errors = [];
        try {
            console.log(this.setPopulateDataParams(clntid));
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
               // to get State from CODE
                let stateDDL =await this.arrayToMap(this.state.stateDDL).get(result.data.clientDetails[0].STATE);
                // to get best method Of Contact from CODE
                let bestMethodCntctDDL = await this.arrayToMap(this.state.bestMethodCntctDDL).get(result.data.clientDetails[0].MODOFCON)

                // to get Best Time To Call from CODE
                let bestTimeCallDDL = await this.arrayToMap(this.state.bestTimeCallDDL).get(result.data.clientDetails[0].BESTTMCAL)

                let state = stateDDL!=undefined ? stateDDL : '';
                let bestMethodOfCntct = bestMethodCntctDDL!=undefined ? bestMethodCntctDDL : '';
                let bestTimeToCall = bestTimeCallDDL!=undefined ? bestTimeCallDDL: '';

                await this.setState({
                    CLNTID: result.data.clientDetails[0].CLNTID,
                    fName: result.data.clientDetails[0].FIRSTNM,
                    lName: result.data.clientDetails[0].LASTNM,
                    officeName: result.data.clientDetails[0].OFFICENM,
                    email: result.data.clientDetails[0].EMAILID,
                    phoneNo: result.data.clientDetails[0].PHONE,
                    faxNo: result.data.clientDetails[0].FAX,
                    address: result.data.clientDetails[0].ADDRESS,
                    city: result.data.clientDetails[0].CITY,
                    // state: result.data.clientDetails[0].STATE,
                    state: state,
                    zipCode: result.data.clientDetails[0].ZIPCD,
                    // bestMethodOfCntct: result.data.clientDetails[0].MODOFCON,
                    bestMethodOfCntct: bestMethodOfCntct,
                    // bestTimeToCall: result.data.clientDetails[0].BESTTMCAL,
                    bestTimeToCall: bestTimeToCall,
                    tcode: "UPDATE",
                    showLoading: !this.state.showLoading
                });
            }
        }

    }

    setPopulateDataParams(clntid) {
        var Client_Id = ''
        if (this.props.CLIENTID || this.props.data) Client_Id = clntid
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "EMAILID": this.state.email,
            "CLNTID": Client_Id
        }
        return parameters

    };

    arrayToMap =  (input, CODE='CODE', DESC='DESC') => {
        
        return input.reduce((init, next) => {
            init = init || (new Map())
            init.set(next[CODE], next[DESC])
            return init
        }, new Map())
    }


    // Navigate To List
    navigateToList() {
        return this.props.history.push('/cases');
    };



    render() {
        if (this.state.showLoading) {
            return (

                <div className="ui one column grid">
                    <div className="three column row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div className="ui segment" >
                                <div className="ui form">
                                    <div className="ui stackable grid">

                                        <div className="row" />
                                        <div className="row" />
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
                                                        {this.state.fName}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Last Name</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.lName}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                        {/* ..................................................................................... */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Business Or Law Office</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.officeName}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>E-mail</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Phone Number</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.phoneNo}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="three wide computer three wide tablet three wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Fax Number</label>
                                                </div>
                                            </div>
                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.faxNo}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*............................................  */}

                                        <div className="twelve wide computer twelve wide tablet twelve wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Address</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.address}
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
                                                        {this.state.city}
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
                                                        {this.state.state}
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
                                                        {this.state.zipCode}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*............................................  */}

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label>Best Method Of Contact</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.bestMethodOfCntct}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="six wide computer six wide tablet six wide mobile column" style={{ padding: '0px' }}>
                                            <div className="row" style={{ backgroundColor: "#ECEDEE", padding: '14px' }}>
                                                <div className="field">
                                                    <label >Best Time To Call</label>
                                                </div>
                                            </div>

                                            <div className="row" style={{ padding: '14px' }} >
                                                <div className="field">
                                                    <div className="ui right icon input">
                                                        {this.state.bestTimeToCall}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        {/*............................................  */}
                                        <div className="row">
                                            <div className="ten wide column">
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