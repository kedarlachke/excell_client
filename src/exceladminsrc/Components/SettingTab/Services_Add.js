import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { execGql } from '../apolloClient/apolloClient';
import { DropdwonQueryLeads, ServicesCRUDOps, serviceDetails } from '../Queries/queries';
var DropdownLeadList = []
var errorval = false
export default class Services extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Sub_ServiceName: "",
            ServiceName: "",
            OrderNo: "",
            IsActive: "",
            DropdownLeadListArr: [],
            tcode: 'CREATE',
            errorCATCODE: "",
            errorISACTIVE: "",
            errorORDERNO: "",
            errorSTDESC: "",
            Dispalycomp: true

        }
    };

    componentDidMount() {
        this.DropdownService();
        if (this.props.location.state) {
            this.setState({ Dispalycomp: !this.state.Dispalycomp })
            this.populateData();
        }
    };

    // Populate service Details Data
    async populateData() {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', serviceDetails, this.setSearchParams())
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
            // console.log(this.props.data.data.CID)
            this.setState({
                Sub_ServiceName: result.data.serviceDetails[0].STDESC,
                ServiceName: result.data.serviceDetails[0].CATCODE,
                OrderNo: result.data.serviceDetails[0].ORDERNO,
                IsActive: result.data.serviceDetails[0].ISACTIVE,
                tcode: 'UPDATE',
                Dispalycomp: !this.state.Dispalycomp
            })


        }

    };

    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CATCODE": this.props.location.state.data.CATCODE,
            "STCODE": this.props.location.state.data.STCODE
        }
        return parameters

    };

    // To Set Dropdown Value
    async DropdownService() {
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

            DropdownLeadList = []
            DropdownLeadList.push({
                "SERVICE_CATEGORY": result.data.SERVICE_CATEGORY
            })

            this.setState({ DropdownLeadListArr: DropdownLeadList })

        }

    };

    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters

    };

    // To Craete Service
    async CraeteService() {
        var result = '', errorMessage = '';
        try {
            result = await execGql('mutation', ServicesCRUDOps, this.setCreateParams())
            // console.log(result);
        }
        catch (err) {
            // errors = err.errorsGql;
            errorMessage = err.errorMessageGql;

        }

        if (!result) {
            errorval = true
            errorMessage = JSON.parse(errorMessage);
            for (let key in errorMessage) {
                console.log(errorMessage[key]);
                this.setState({
                    errorCATCODE: errorMessage[key].errorCATCODE,
                    errorISACTIVE: errorMessage[key].errorISACTIVE,
                    errorORDERNO: errorMessage[key].errorORDERNO,
                    errorSTDESC: errorMessage[key].errorSTDESC
                });
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
            "services": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CATCODE": this.state.ServiceName,
                    "STDESC": this.state.Sub_ServiceName,
                    "ORDERNO": this.state.OrderNo,
                    "ISACTIVE": this.state.IsActive
                }
            ]
        }
        return parameters

    };


    async UpdateService() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('mutation', ServicesCRUDOps, this.setUpdateParams())
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
                this.setState({
                    errorCATCODE: errorMessage[key].errorCATCODE,
                    errorISACTIVE: errorMessage[key].errorISACTIVE,
                    errorORDERNO: errorMessage[key].errorORDERNO,
                    errorSTDESC: errorMessage[key].errorSTDESC
                });
            }
        }
        else {

            console.log(result);
            this.navigateToList()
        }

    };

    setUpdateParams() {
        var parameters = {
            "transaction": "UPDATE",
            "services": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CATCODE": this.state.ServiceName,
                    "STCODE": this.props.location.state.data.STCODE,
                    "STDESC": this.state.Sub_ServiceName,
                    "ORDERNO": this.state.OrderNo,
                    "ISACTIVE": this.state.IsActive
                }
            ]
        }
        return parameters

    };

    // Navigate to List
    navigateToList() {
        return this.props.history.push('/settings')
    };

    // Clear Values
    onClear() {
        this.setState({
            Sub_ServiceName: "",
            ServiceName: "",
            OrderNo: "",
            IsActive: ""
        })
    };


    // Service CRUD_operation
    CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            this.CraeteService()
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateService()

        }
    };


    render() {
        if (this.state.Dispalycomp) {
            return (

                <div className="ui one column grid">

                    <div className=" row">

                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>

                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <h1 className="ui left aligned header" id="title_header">SERVICES - ADD NEW</h1>
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
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCATCODE ? 'brown' : null }}>Service Name</label>
                                                    <select className="" style={{ borderColor: this.state.errorCATCODE ? 'brown' : null, backgroundColor: this.state.errorCATCODE ? '#f3ece7' : null }} value={this.state.ServiceName} onChange={e => this.setState({ ServiceName: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.DropdownLeadListArr.map((data) => data.SERVICE_CATEGORY.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCATCODE}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorSTDESC ? 'brown' : null }}>Sub-Service Name</label>
                                                    <input type="text" style={{ borderColor: this.state.errorSTDESC ? 'brown' : null, backgroundColor: this.state.errorSTDESC ? '#f3ece7' : null }} name="sub-serviceName" placeholder="Sub-Service Name" value={this.state.Sub_ServiceName} onChange={e => this.setState({ Sub_ServiceName: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorSTDESC}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">


                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorORDERNO ? 'brown' : null }}>Order No.</label>
                                                    <input type="text" style={{ borderColor: this.state.errorORDERNO ? 'brown' : null, backgroundColor: this.state.errorORDERNO ? '#f3ece7' : null }} name="orderNo" placeholder="Order No" value={this.state.OrderNo} onChange={e => this.setState({ OrderNo: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorORDERNO}</span> : null}
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
                            "ServiceName": this.state.ServiceName,
                            "Sub-ServiceName": this.state.Sub_ServiceName,
                            "OrderNo": this.state.OrderNo,
                            "IsActive": this.state.IsActive,

                        })}
                    </pre>
                </div> */}
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