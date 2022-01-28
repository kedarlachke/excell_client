import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { progressReportDetails, ProgressReportCRUDOps, ProgressReportDDL } from '../Queries/queries';
var DropdownProgressRptList = [];
var fileArr = []
var errorval = false
const PORT = process.env.APIPORT;
export default class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Case_Id: "",
            PRGRPTID: "",
            PRGWORKID: "",
            Details: "",
            DocumentType: "",
            WorkCategory: "",
            WorkHours: "",
            ShareWith: "",
            ShareWithchk: false,
            Dispalycomp: true,
            DropdownProgressRptArr: [],
            tcode: 'CREATE',
            errorRPTTXT: "",
            errorCDOCTYPE: "",
            errorWORKHOURS: "",

        }
        //  this.setDisplayMode = this.props.setDisplayMode.bind(this)
    };


    async componentDidMount() {

        //console.log(this.props.Case_Id);

        this.DropdownProgressRpt();
        //console.log(this.props.location.state.data);
        if (this.props.PRGRPTID) {
            await this.setState({ PRGRPTID: this.props.PRGRPTID });
            this.populateData();
        };

        // console.log(this.props.location.data)
        // if (this.props.location.data) {
        //     this.setState({ Dispalydrp: !this.state.Dispalydrp, Dispalycomp: !this.state.Dispalycomp })
        //     this.populateData();

        // }
    };



    // dispatching an action based on state change
    async componentWillUpdate(nextProps, nextState) {
        let temPrgID = "";

        if (!this.state.PRGRPTID) {
            temPrgID = "9999999999";
        }
        else {
            temPrgID = this.state.PRGRPTID;
        }

        if ((nextProps.PRGRPTID != temPrgID) && nextProps.PRGRPTID) {
            await this.setState({ PRGRPTID: nextProps.PRGRPTID })
            this.populateData();

        }


    }



    // To Fetch Data
    async populateData() {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', progressReportDetails, this.setSearchParams())
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
            await this.setState({
                Case_Id: result.data.progressReportDetails[0].CIDSYS,
                PRGRPTID: result.data.progressReportDetails[0].PRGRPTID,
                PRGWORKID: result.data.progressReportDetails[0].PRGWORKID,
                Details: result.data.progressReportDetails[0].RPTTXT,
                DocumentType: result.data.progressReportDetails[0].CDOCTYPE,
                WorkCategory: result.data.progressReportDetails[0].WORKCAT,
                WorkHours: result.data.progressReportDetails[0].WORKHOURS,
                ShareWith: result.data.progressReportDetails[0].SHAREWITH,
                tcode: 'UPDATE',
                // Dispalycomp: !this.state.Dispalycomp

            });

            if (this.state.ShareWith == 'Y') {
                this.setState({ ShareWithchk: true })
            }
            else if (this.state.ShareWith == 'N') {
                this.setState({ ShareWithchk: false })
            }


        }

    };

    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "PRGRPTID": this.state.PRGRPTID
        }
        console.log('parameters');
        console.log(parameters);

        console.log('parameters end');
        return parameters

    };


    // To Set Dropdown Values
    async DropdownProgressRpt() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', ProgressReportDDL, this.setDropdownParams())
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

            DropdownProgressRptList = []
            DropdownProgressRptList.push({
                "WORK_CATEGORY": result.data.WORK_CATEGORY,
                "DOCTYPES": result.data.DOCTYPES

            })

            this.setState({ DropdownProgressRptArr: DropdownProgressRptList })

        }

    };

    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters

    };

    // Navigate To Progress Report List
    navigateToProgressRptList() {
        return this.props.history.push('/cases');
    };

    // For File 
    handleChange = (e) => {

        const { files } = e.target
        console.log(e.target.files)
        fileArr.push(files[0])
        console.log(`filearr length after change${fileArr.length}`)
        console.log(`filearr   ${fileArr}`)
    };


    // To Create Progress Report
    async ProgressReport_CRUDOps(variables) {
        try {
            console.log("CREATE PARAMS");
            console.log(variables);
            console.log("CREATE PARAMS");
            const formData = new FormData();
            //const url = 'http://81.4.102.11:80/excellinv';
            const url =`${process.env.API_SERVER}`;
            console.log(url)
            formData.append('query', ProgressReportCRUDOps);
            formData.append('variables', JSON.stringify(variables || {}));
            //console.log('formData')
            //console.log(formData)
            for (let i = 0; i < fileArr.length; i++) {
                formData.append(`file${i}`, fileArr[i])
            }

            let response = await fetch(url, {
                method: 'POST',
                headers: { Accept: '*/*' },
                body: formData
            }).then(res => res.json()).
                then(res => {
                    console.log('in response')
                    console.log(res.data)
                    console.log('error ')
                    console.log(res.errors)
                    if (res.errors) {
                        try {
                            var error = JSON.parse(res.errors[0].message);
                            errorval = true
                            this.setState({
                                errorRPTTXT: error[0].errorRPTTXT,
                                errorCDOCTYPE: error[0].errorCDOCTYPE,
                                errorWORKHOURS: error[0].errorWORKHOURS,
                            });
                        } catch (error) {
                            console.log('in error 1')
                            console.log(error);
                        }

                    }
                    if (res.data.ProgressReport.length == 1) {
                        this.setState({ PRGRPTID: '' });
                        this.props.setDisplayMode('DISPLAY')
                    }

                })
                .then(err => {
                    console.log('in error 2')
                    console.log(err)});
            fileArr = []
        }
        catch (err) {
            console.log('in error 3')
            console.log(err);
        }

    };

    async setCreateParams() {
        if (this.props.Case_Id) {
            console.log("this.props.Case_Id");
            console.log(this.props.Case_Id);
            await this.setState({ Case_Id: this.props.Case_Id });
        }
        var parameters = {
            "transaction": "CREATE",
            "progressreport": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS": this.state.Case_Id,
                    "RPTTXT": this.state.Details,
                    "CDOCTYPE": this.state.DocumentType,
                    "WORKCAT": this.state.WorkCategory,
                    "WORKHOURS": this.state.WorkHours,
                    "SHAREWITH": this.state.ShareWith
                }
            ]
        }
        return parameters

    };
    setUpdateParams() {
        var parameters = {
            "transaction": "UPDATE",
            "progressreport": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS": this.state.Case_Id,
                    "RPTTXT": this.state.Details,
                    "CDOCTYPE": this.state.DocumentType,
                    "WORKCAT": this.state.WorkCategory,
                    "WORKHOURS": this.state.WorkHours,
                    "SHAREWITH": this.state.ShareWith,
                    "PRGRPTID": this.state.PRGRPTID,
                    "PRGWORKID": this.state.PRGWORKID

                }
            ]
        }
        return parameters

    };


    // For CRUD Operations
    async  CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            console.log('Progressive report create')
            console.log(this.state)
            this.ProgressReport_CRUDOps(await this.setCreateParams())
        }
        else if (this.state.tcode == 'UPDATE') {
            this.ProgressReport_CRUDOps(this.setUpdateParams())

        }
    };






    // To Check Share With
    async isCheck() {
        await this.setState({ ShareWithchk: !this.state.ShareWithchk });
        if (this.state.ShareWithchk == true) {
            await this.setState({ ShareWith: "Y" });
        }
        else {
            await this.setState({ ShareWith: "N" });
        }

        console.log(this.state.ShareWithchk);
        console.log(this.state.ShareWith);
    };


    render() {
        if (this.state.Dispalycomp) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className=" row">

                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <div className="ui segment ">
                                    <div className="ui form">
                                        <div className="ui  stackable grid">

                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorRPTTXT ? 'brown' : null }}>Details</label>
                                                        <textarea rows={2} style={{ borderColor: this.state.errorRPTTXT ? 'brown' : null, backgroundColor: this.state.errorRPTTXT ? '#f3ece7' : null }} type="text" name="details" placeholder="Details"
                                                            value={this.state.Details} onChange={e => this.setState({ Details: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorRPTTXT}</span> : null}
                                                    </div>
                                                </div>

                                            </div>

                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorCDOCTYPE ? 'brown' : null }}>Document Type</label>
                                                        <select className="" value={this.state.DocumentType} style={{ borderColor: this.state.errorCDOCTYPE ? 'brown' : null, backgroundColor: this.state.errorCDOCTYPE ? '#f3ece7' : null }} onChange={e => this.setState({ DocumentType: e.target.value })}>
                                                            {this.state.DropdownProgressRptArr.map((data) => data.DOCTYPES.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>))}
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorCDOCTYPE}</span> : null}
                                                    </div>
                                                </div>

                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label >File</label>
                                                        <input type="file" name="file" placeholder="file" onChange={e => this.handleChange(e)} />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label>Work Category</label>

                                                        <select className="" value={this.state.WorkCategory} onChange={e => this.setState({ WorkCategory: e.target.value })}>
                                                            <option value="select">select</option>
                                                            {this.state.DropdownProgressRptArr.map((data) => data.WORK_CATEGORY.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="two wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorWORKHOURS ? 'brown' : null }}>Work Hours</label>
                                                        <input style={{ borderColor: this.state.errorWORKHOURS ? 'brown' : null, backgroundColor: this.state.errorWORKHOURS ? '#f3ece7' : null }} type="text" name="workhours" placeholder="Work Hours"
                                                            value={this.state.WorkHours} onChange={e => this.setState({ WorkHours: e.target.value })} />
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorWORKHOURS}</span> : null}
                                                    </div>
                                                </div>

                                                <div className="three wide column">
                                                    <div className="field" style={{ marginTop: 20 }}>
                                                        <input type="checkbox" style={{ float: 'left', marginRight: 5 }} value={this.state.ShareWith} checked={this.state.ShareWithchk} onChange={() => this.isCheck()} />
                                                        <label style={{ color: this.state.errorPHONE ? 'brown' : null }}> Share With Customer</label>
                                                    </div>
                                                    <div className="field">
                                                        {errorval ? <span id="errorspan">{this.state.errorPHONE}</span> : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" row">
                                                <div className="ten wide column">
                                                    <button className="ui primary button" type="submit" onClick={() => this.CRUD_operation()}>Save</button>
                                                    <button className="ui  button" type="submit">Clear</button>
                                                    <button className="ui  button" type="submit" onClick={() => { this.props.setDisplayMode('DISPLAY') }}>Cancel</button>
                                                </div>
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
        else {
            return (
                <div className="ui icon header">
                    <div className="ui active loader"></div>
                </div>
            );
        }
    }
}