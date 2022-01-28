import React, { Component, } from 'react';
import { InvoicesCRUDOpsQuery, InvoiceDDLQuery, invoiceDetails } from '../Queries/queries';
import { execGql } from '../apolloClient/apolloClient';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { doCalulations } from '../Invoice/SummaryCalculation';
import Select from 'react-select';
var CLNT = "1002";
var LANG = "EN"
var errorval = false;
export default class AddInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [{
                CLNT: "",
                LANG: "",
                LINEITEMNO: "",
                PARTNUMBER: "MIS",
                PARTDESC: "",
                RATE: "0",
                QUANTITY: "0",
                TAX: "",
                TAXArr: [],
                AMOUNT: "0",
                SIGN: "+",
                DOCID: ""
            }],
            DOCID: "",
            invoiceno: "",
            customer: "",
            customerDDL: [],
            invoicedate: "",
            duedate: "",
            header: "",
            remark: "",

            cmpn: "-",
            cmpnnm: "-",
            companyDDL: [],

            TaxTypeDDL: [],
            PartsDDL: [],
            SummarylistArr: [],
            selectedTax: [],
            rowsError: [{
                isErrorService: false,
                isErrorAmount: false
            }],
            isError: false,
            transaction: "CREATE",
            errorDOCHDR: "",
            errorCUSTCD: "",
            errorDUEDT: "",
            errorRMKS: "",
            errorDOCDT: "",
            errorDOCNO: "",
            DisplayComp: true,
            DisplayCust:false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this)
    };

    async componentDidMount() {

        console.log("this.props");
        console.log(this.props);
        console.log("this.props");
        await this.populateDropdown();
        await this.setCompany();
        console.log(this.props.DocId);
        if (this.props.DocId) {
            await this.setState({ DisplayComp: false,DisplayCust:true })
            this.populateInvoiceQuery()
        }
    }
    setDropdownParams() {
        var parameters = {
            "CLNT": CLNT,
            "LANG": LANG
        }
        return parameters
    };

    //......populate all Dropdown..... 
    async populateDropdown() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', InvoiceDDLQuery, this.setDropdownParams());
        } catch (err) {

            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
            // console.log(error.errorsGql);
            // console.log(error.errorMessageGql);
        }
        if (!result) {
            console.log(errorMessage);
        }
        else {
            console.log(result);

            await this.setState({
                TaxTypeDDL: result.data.TAX_TYPES,
                customerDDL: result.data.CUSTOMERS,
                companyDDL: result.data.COMPANY,
                PartsDDL: result.data.PARTS
            });
        }
    }

    //....for set Company...................
    async setCompany() {
        if (this.state.companyDDL.length != 0) {
            for (let index = 0; index < this.state.companyDDL.length; index++) {
                await this.setState({ cmpn: this.state.companyDDL[index].CODE, cmpnnm: this.state.companyDDL[index].DESC });
            }
        }
        console.log(this.state.cmpn + "  " + this.state.cmpnnm);

    }

    clear() {
        this.setState({
            rows: [{
                CLNT: "",
                LANG: "",
                LINEITEMNO: "",
                PARTNUMBER: "MIS",
                PARTDESC: "",
                RATE: "0",
                QUANTITY: "0",
                TAX: "",
                TAXArr: [],
                AMOUNT: "0",
                SIGN: "+",
                DOCID: ""
            }],
            rowsError: [{
                isErrorService: false,
                isErrorAmount: false
            }],
            DOCID: "",
            invoiceno: "",
            customer: "",
            invoicedate: "",
            duedate: "",
            header: "",
            remark: "",
            cmpn: "",
            cmpnnm: "",
            SummarylistArr: [],
            isError: false,
            errorDOCHDR: "",
            errorCUSTCD: "",
            errorDUEDT: "",
            errorRMKS: "",
            errorDOCDT: "",
            errorDOCNO: "",
        })
    }

    clearError() {
        const rowsError = [...this.state.rowsError];
        for (let key in this.state.rowsError) {
            rowsError[key] = {
                isErrorService: false,
                isErrorAmount: false
            };
        }
        this.setState({
            rowsError: rowsError,
            isError: false,
            errorDOCHDR: "",
            errorCUSTCD: "",
            errorDUEDT: "",
            errorRMKS: "",
            errorDOCDT: "",
            errorDOCNO: "",
        })
    }

    //.................Handle onChange Select box...................
    async handleSelectChange(idx, TAXArrValue) {
        let taxValue = ""
        if (Array.isArray(TAXArrValue)) {
            taxValue = TAXArrValue.reduce((init, next) => {
                init.push(next.value)
                return init
            }, []).join(',')
        }

        const rows = [...this.state.rows];
        var serviceValue = this.state.rows[idx].PARTDESC;
        var rateValue = this.state.rows[idx].RATE;
        var quantityValue = this.state.rows[idx].QUANTITY;
        var amountValue = this.state.rows[idx].AMOUNT;
        var partNumber = this.state.rows[idx].PARTNUMBER;

        await this.setLineItemSates(rows, idx, partNumber, serviceValue, rateValue, quantityValue, amountValue, taxValue, TAXArrValue);

        try {
            await this.setState({ SummarylistArr: await doCalulations(this.state.rows, CLNT, LANG) });
        } catch (error) {
            console.log(error);
        }
        // console.log(this.state.rows)
    }

    //.................Handle onBlur line itme Text box...................
    handleBlur = idx => async e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        var cname = "";
        cname = name;
        var serviceValue = this.state.rows[idx].PARTDESC;
        var rateValue = this.state.rows[idx].RATE;
        var quantityValue = this.state.rows[idx].QUANTITY;
        var taxValue = this.state.rows[idx].TAX;
        var TAXArrValue = this.state.rows[idx].TAXArr;
        var amountValue = this.state.rows[idx].AMOUNT;
        var partNumber = this.state.rows[idx].PARTNUMBER;
        // this.validation(amountValue);

        if (cname == "service") {
            serviceValue = value;
        }
        else if (cname == "tax") {
            taxValue = value;
        }
        else if (cname == "amount") {
            if (value == "")
                amountValue = 0
        } else if (cname == "partNumber") {
            partNumber = value;
        } else if (cname == "rate") {
            if (value == "")
                rateValue = 0;
            else
                amountValue = parseFloat(rateValue) * parseFloat(quantityValue);
        }
        else if (cname == "quantity") {
            if (value == "")
                quantityValue = 0;
            else
                amountValue = parseFloat(rateValue) * parseFloat(quantityValue);
        }
        await this.setLineItemSates(rows, idx, partNumber, serviceValue, rateValue, quantityValue, amountValue, taxValue, TAXArrValue);


        try {
            await this.setState({ SummarylistArr: await doCalulations(this.state.rows, CLNT, LANG) });
        } catch (error) {
            console.log(error);
        }
        //console.log(this.state.rows)
    };

    //.................Handle onFocus line itme Text box...................
    handleFocus = idx => async e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        var cname = "";
        cname = name;
        var serviceValue = this.state.rows[idx].PARTDESC;
        var rateValue = this.state.rows[idx].RATE;
        var quantityValue = this.state.rows[idx].QUANTITY;
        var taxValue = this.state.rows[idx].TAX;
        var TAXArrValue = this.state.rows[idx].TAXArr;
        var amountValue = this.state.rows[idx].AMOUNT;
        var partNumber = this.state.rows[idx].PARTNUMBER;
        // this.validation(amountValue);

        if (cname == "service") {
            serviceValue = value;
        }
        else if (cname == "tax") {
            taxValue = value;
        }
        else if (cname == "amount") {
            if (value == "0")
                amountValue = ""
        } else if (cname == "partNumber") {
            partNumber = value;
        } else if (cname == "rate") {
            if (value == "0")
                rateValue = "";
        }
        else if (cname == "quantity") {
            if (value == "0")
                quantityValue = "";
        }
        await this.setLineItemSates(rows, idx, partNumber, serviceValue, rateValue, quantityValue, amountValue, taxValue, TAXArrValue);

    };

    //.................Handle onChange line itme Text box...................
    handleChange = idx => async e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        var cname = "";
        cname = name;
        var serviceValue = this.state.rows[idx].PARTDESC;
        var rateValue = this.state.rows[idx].RATE;
        var quantityValue = this.state.rows[idx].QUANTITY;
        var taxValue = this.state.rows[idx].TAX;
        var TAXArrValue = this.state.rows[idx].TAXArr;
        var amountValue = this.state.rows[idx].AMOUNT;
        var partNumber = this.state.rows[idx].PARTNUMBER;

        if (cname == "service") {
            serviceValue = value;
        }
        else if (cname == "tax") {
            taxValue = value;
        }
        else if (cname == "amount") {
            amountValue = value;
        } else if (cname == "partNumber") {
            partNumber = value;
        }
        else if (cname == "rate") {
            rateValue = value;
        }
        else if (cname == "quantity") {
            quantityValue = value;
        }

        await this.setLineItemSates(rows, idx, partNumber, serviceValue, rateValue, quantityValue, amountValue, taxValue, TAXArrValue);

    };

    async  setLineItemSates(rows, idx, partNumber, serviceValue, rateValue, quantityValue, amountValue, taxValue, selectedTaxArr) {
        rows[idx] = {
            CLNT: CLNT,
            LANG: LANG,
            LINEITEMNO: idx,
            PARTNUMBER: partNumber,
            PARTDESC: serviceValue,
            RATE: rateValue,
            QUANTITY: quantityValue,
            TAX: taxValue,
            TAXArr: selectedTaxArr,
            AMOUNT: amountValue,
            SIGN: "+",
            DOCID: ""

        };
        await this.setState({ rows });
    }

    //................Add Line Itme..................
    handleAddRow = async () => {
        try {
            await this.setState({
                rowsError: [...this.state.rowsError, {
                    isErrorService: false,
                    isErrorAmount: false
                }]
            });
            await this.setState({
                rows: [...this.state.rows, {
                    CLNT: "",
                    LANG: "",
                    LINEITEMNO: "",
                    PARTNUMBER: "MIS",
                    PARTDESC: "",
                    RATE: "0",
                    QUANTITY: "0",
                    TAX: "",
                    TAXArr: [],
                    AMOUNT: "0",
                    SIGN: "+",
                    DOCID: ""
                }]
            });
            // console.log(this.state.rows);
        } catch (error) {
            console.log(error);
        }
    };

    //............Remove Line Item.....................
    handleRemoveRow = async (idx) => {
        try {
            await this.setState({ rows: this.state.rows.filter((s, sidx) => idx !== sidx), rowsError: this.state.rowsError.filter((s, sidx) => idx !== sidx) });
            await this.setState({ SummarylistArr: await doCalulations(this.state.rows, CLNT, LANG) });

        } catch (error) {
            console.log(error);
        }
    };

    //.....................onSubmit Button...................
    async onSubmit() {
        try {
            // await this.validation();
            if (!this.state.isError) {
                //...Calculate Summary doCalulations().........
                await this.setState({ SummarylistArr: await doCalulations(this.state.rows, CLNT, LANG) });
                //...Save Invoice...........
                this.saveInvoice();
            }

        } catch (error) {
            console.log(error);
        }
    };

    //....................Save Invoice............................
    async saveInvoice() {
        var result = '', errorMessage = '';
        try {
            let queryVariables = await this.setCreateParams();
            console.log(queryVariables);
            result = await execGql('mutation', InvoicesCRUDOpsQuery, queryVariables);
        }
        catch (err) {
            console.log(err);
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            errorval = true
            try {
                errorMessage = JSON.parse(errorMessage);
                //.........Clear Error.......
                this.clearError();

                for (let key in errorMessage) {
                    var DocHeaderError = JSON.parse(errorMessage[key].DocHeader);
                    if (Object.keys(DocHeaderError).length == 0)
                        console.log("No errors in header...");
                    else
                        for (let key2 in DocHeaderError) {
                            this.setState({
                                errorDOCHDR: DocHeaderError[key2].errorDOCHDR,
                                errorCUSTCD: DocHeaderError[key2].errorCUSTCD,
                                errorDUEDT: DocHeaderError[key2].errorDUEDT,
                                errorRMKS: DocHeaderError[key2].errorRMKS,
                                errorDOCDT: DocHeaderError[key2].errorDOCDT,
                                errorDOCNO: DocHeaderError[key2].errorDOCNO,
                            })
                        }
                    var DocDetailsError = JSON.parse(errorMessage[key].DocDetails);

                    if (Object.keys(DocDetailsError).length == 0) {
                        console.log("No errors in Line Itme...");
                    }
                    else {
                        const rowsError = [...this.state.rowsError];
                        for (let key3 in DocDetailsError) {
                            rowsError[key3] = {
                                isErrorService: DocDetailsError[key3].errorPARTDESC,
                                isErrorAmount: DocDetailsError[key3].errorAMOUNT
                            };
                        }
                        this.setState({ rowsError });
                    }
                }
            } catch (error) {
                console.log(error);

            }

        }
        else {
            //this.navigateToLeadList()
            this.clear()
            console.log("......................invoice " + this.state.transaction + "------------");
            this.showMsg();
            this.populateData(result)
        }
    };

    async setCreateParams() {
        var STOTAL = await (this.state.SummarylistArr.filter(function (v, n) { return v.TAXTYPE == "STOTAL"; }))[0];
        var TOTAL = await (this.state.SummarylistArr.filter(function (v, n) { return v.TAXTYPE == "TOTAL"; }))[0];;
        var invoicedate = this.state.invoicedate;
        var duedate = this.state.duedate;
        if (!invoicedate == "") {
            invoicedate = await this.formatDate(invoicedate)
        }
        if (!duedate == "") {
            duedate = await this.formatDate(duedate)
        }

        if (!this.state.customer == "") {
            var customerName = await (this.state.customerDDL.filter((v, n) => { return v.CODE == this.state.customer }))[0].DESC
            customerName = customerName.split("-")[0];
        }
        var parameters = {
            "transaction": this.state.transaction,
            "invoices": [
                {
                    "DocHeader": {
                        "CLNT": CLNT,
                        "LANG": LANG,
                        "DOCDT": invoicedate,
                        "INVDT": invoicedate,
                        "DOCNO": this.state.invoiceno,
                        "DOCID": this.state.DOCID,
                        "RMKS": this.state.remark,
                        "CURRENCY": "USD",
                        "DOCHDR": this.state.header,
                        "CUSTCD": this.state.customer,
                        "CUSTOMER": customerName,
                        "DUEDT": duedate,
                        "STATUS": "NTST",
                        "DOCTYPE": "INV",
                        "PONO": "",
                        "CMPN": this.state.cmpn,
                        "CMPNNM": this.state.cmpnnm,
                        "BAL": STOTAL.TAXAMOUNT,
                        "TOT": TOTAL.TAXAMOUNT,
                        "CIDSYS": this.props.Case_Id
                    },
                    "DocDetails": this.state.rows.map(doc => {
                        delete doc.TAXArr
                        return doc
                    }),
                    "TaxAmounts": this.state.SummarylistArr
                }
            ]
        }
        return parameters
    };


    //....................Populate Data Query function............................
    async populateInvoiceQuery() {
        var result = '', errorMessage = '';
        try {
            let queryVariables = await this.setPopulateQueryParams();
            // console.log(queryVariables);
            result = await execGql('query', invoiceDetails, queryVariables);
        }
        catch (err) {
            console.log(err);
            errorMessage = err.errorMessageGql;
        }
        if (!result) {
            console.log(errorMessage);
        }
        else {
            console.log("result");
            console.log(result);
            console.log("result");
            this.populateData(result)
        }
    };
    setPopulateQueryParams() {
        var parameters =
        {
            "CLNT": CLNT,
            "LANG": LANG,
            "DOCID": this.props.DocId,
        }
        return parameters
    };
    //.....................Populate Invoice Data.................
    async populateData(result) {
        try {
            const rows = [...this.state.rows];
            const rowsError = [...this.state.rowsError];

            var TAX_TYPES = []
            this.state.TaxTypeDDL.map((data, idx) => TAX_TYPES.push({ label: data.CODE, value: data.CODE }))

            for (let key in result.data.Invoices[0].DocDetails) {
                let taxStringArr = result.data.Invoices[0].DocDetails[key].TAX ? result.data.Invoices[0].DocDetails[key].TAX.split(",") : '';
                let TAXArr = TAX_TYPES.filter(taxs => taxStringArr.indexOf(taxs.value) >= 0)

                rows[key] = {
                    CLNT: result.data.Invoices[0].DocDetails[key].CLNT,
                    LANG: result.data.Invoices[0].DocDetails[key].LANG,
                    LINEITEMNO: result.data.Invoices[0].DocDetails[key].LINEITEMNO,
                    PARTNUMBER: result.data.Invoices[0].DocDetails[key].PARTNUMBER,
                    PARTDESC: result.data.Invoices[0].DocDetails[key].PARTDESC,
                    RATE: result.data.Invoices[0].DocDetails[key].RATE,
                    QUANTITY: result.data.Invoices[0].DocDetails[key].QUANTITY,
                    TAX: result.data.Invoices[0].DocDetails[key].TAX,
                    TAXArr: TAXArr,
                    AMOUNT: result.data.Invoices[0].DocDetails[key].AMOUNT,
                    SIGN: result.data.Invoices[0].DocDetails[key].SIGN,
                    DOCID: result.data.Invoices[0].DocDetails[key].DOCID,
                };
                rowsError[key] = {
                    isErrorService: false,
                    isErrorAmount: false
                };

            }
            await this.setState({
                DOCID: result.data.Invoices[0].DocHeader.DOCID,
                invoiceno: result.data.Invoices[0].DocHeader.DOCNO,
                customer: result.data.Invoices[0].DocHeader.CUSTCD,
                invoicedate: this.setFormatDate(result.data.Invoices[0].DocHeader.DOCDT),
                duedate: this.setFormatDate(result.data.Invoices[0].DocHeader.DUEDT),
                header: result.data.Invoices[0].DocHeader.DOCHDR,
                remark: result.data.Invoices[0].DocHeader.RMKS,
                cmpn: result.data.Invoices[0].DocHeader.CMPN,
                cmpnnm: result.data.Invoices[0].DocHeader.CMPNNM,
                rows: rows,
                rowsError: rowsError,
                SummarylistArr: result.data.Invoices[0].TaxAmounts,
                transaction: "UPDATE",
                DisplayComp: true
            });
        } catch (error) {
            console.log(error);
        }
    }


    //..............Date Formate Convertion..........
    formatDate(iDate) {
        var year = iDate.slice(0, 4)
        var month = iDate.slice(5, 7)
        var day = iDate.slice(8, 10)
        var date_format = year + month + day
        return date_format
    }

    setFormatDate(idate) {
        var year = idate.slice(0, 4)
        var month = idate.slice(4, 6)
        var day = idate.slice(6, 8)
        // "2018-06-03"
        var date_format = year + '-' + month + '-' + day
        //  var date_format = month + '/' + day + '/' + year
        return date_format
    };

    navigateToInvoiceList() {
        return this.props.history.push('/cases')
    };

    //.........For Show Popup MessageBox................
    showMsg() {

        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }



    render() {
        var FLAVOURS = [{}]
        this.state.TaxTypeDDL.map((data, idx) => FLAVOURS.push({ label: data.CODE, value: data.CODE }))
        const options = FLAVOURS;
        if (this.state.DisplayComp) {
            return (
                <div className="">
                    {/* <div className=" row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <h1 id="title_header">INVOICE-ADD NEW</h1>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                    </div> */}
                    <div className=" row">
                        
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <div className="ui segment" >
                                <div className="ui form">
                                    <div className="ui  stackable grid">

                                        <div className="one row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDOCNO ? 'brown' : null }}>Invoice No</label>
                                                    <input disabled={this.state.DisplayCust?true:false} style={{ borderColor: this.state.errorDOCNO ? 'brown' : null, backgroundColor: this.state.errorDOCNO ? '#f3ece7' : null }} type="text" name="invoiceno" placeholder="Invoice No" value={this.state.invoiceno} onChange={e => this.setState({ invoiceno: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDOCNO}</span> : null}
                                                </div>
                                            </div>
                                            <div className=" five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorCUSTCD ? 'brown' : null }}>Customer</label>
                                                    <select style={{ borderColor: this.state.errorCUSTCD ? 'brown' : null, backgroundColor: this.state.errorCUSTCD ? '#f3ece7' : null }} disabled={this.state.DisplayCust?true:false} name="customer" value={this.state.customer} onChange={e => this.setState({ customer: e.target.value })}>
                                                        <option value="">Select</option>
                                                        {this.state.customerDDL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>)}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorCUSTCD}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="one row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDOCDT ? 'brown' : null }}>Invoice Date</label>
                                                    <div className="ui calendar" >
                                                        <div className="ui input right icon">
                                                            <i className="calendar icon"></i>
                                                            <input style={{ borderColor: this.state.errorDOCDT ? 'brown' : null, backgroundColor: this.state.errorDOCDT ? '#f3ece7' : null }} type="Date" placeholder="Invoice Date" value={this.state.invoicedate} onChange={e => this.setState({ invoicedate: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDOCDT}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDUEDT ? 'brown' : null }}>Due Date</label>
                                                    <div className="ui calendar" >
                                                        <div className="ui input right icon">
                                                            <i className="calendar icon"></i>
                                                            <input style={{ borderColor: this.state.errorDUEDT ? 'brown' : null, backgroundColor: this.state.errorDUEDT ? '#f3ece7' : null }} type="Date" placeholder="Due Date" value={this.state.duedate} onChange={e => this.setState({ duedate: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDUEDT}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="two row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorDOCHDR ? 'brown' : null }}>Header</label>
                                                    <input style={{ borderColor: this.state.errorDOCHDR ? 'brown' : null, backgroundColor: this.state.errorDOCHDR ? '#f3ece7' : null }} type="text" name="header" placeholder="Header" value={this.state.header} onChange={e => this.setState({ header: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorDOCHDR}</span> : null}
                                                </div>
                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorRMKS ? 'brown' : null }}>Remark</label>
                                                    <input style={{ borderColor: this.state.errorRMKS ? 'brown' : null, backgroundColor: this.state.errorRMKS ? '#f3ece7' : null }} type="text" name="remark" placeholder="Remark" value={this.state.remark} onChange={e => this.setState({ remark: e.target.value })} />
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorRMKS}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="three row">
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => this.onSubmit()}>Save</button>
                                                <button className="ui  button" type="submit" onClick={() => this.clear()}>Clear</button>
                                                <button className="ui  button" type="submit" onClick={() => this.props.closeTaskPopup()}>Cancel</button>
                                            </div>
                                        </div>

                                        <div className="five row" style={{ textAlign: "center" }}>
                                            <div className="one wide column">
                                                <div className="field">
                                                    <h4 style={{ borderRadius: 2 }}>Action</h4>
                                                </div>
                                            </div>
                                            <div className="three wide column" >
                                                <div className="field">
                                                    <h4 >Service</h4>
                                                </div>
                                            </div>
                                            <div className="three wide column"  >
                                                <div className="field">
                                                    <h4 >Text</h4>
                                                </div>
                                            </div>
                                            <div className="two wide column" >
                                                <div className="field">
                                                    <h4 >Rate</h4>
                                                </div>
                                            </div>
                                            <div className="two wide column" >
                                                <div className="field">
                                                    <h4 >Quantity</h4>
                                                </div>
                                            </div>
                                            <div className="three wide column" >
                                                <div className="field">
                                                    <h4 >Tax</h4>
                                                </div>
                                            </div>
                                            <div className="two wide column" >
                                                <div className="field">
                                                    <h4 >Amount</h4>
                                                </div>
                                            </div>
                                        </div>
                                        {this.state.rows.map((item, idx) => (
                                            <div className="five row" id="addr0" key={idx} style={{ padding: '2px' }}>
                                                {/* delete Button */}
                                                <div className="one wide column" >
                                                    <div className="field">
                                                        <div className="ui icon" style={{ backgroundColor: "#f76060", color: "white", height: 35, width: 40, textAlign: "center", borderRadius: 2 }} onClick={() => this.handleRemoveRow(idx)}>
                                                            <i className="trash alternate icon" style={{ marginTop: 8 }}></i>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Service DDL/Part Number*/}
                                                <div className="three wide column" style={{ paddingLeft: '2px', paddingRight: '5px' }}>
                                                    <div className="field">
                                                        <select name="partNumber" value={this.state.rows[idx].PARTNUMBER} onChange={this.handleChange(idx)}>
                                                            <option value="">Select</option>
                                                            {this.state.PartsDDL.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        {this.state.rowsError[idx].isErrorService ? <span id="errorspan">Service is required</span> : null}
                                                    </div>
                                                </div>
                                                {/* Text/ */}
                                                <div className="three wide column" style={{ paddingLeft: '2px', paddingRight: '5px' }}>
                                                    <div className="field">
                                                        <input type="text" name="service" placeholder="Text" value={this.state.rows[idx].PARTDESC} onChange={this.handleChange(idx)} />
                                                    </div>
                                                    <div className="field">
                                                        {this.state.rowsError[idx].isErrorService ? <span id="errorspan">Text is required</span> : null}
                                                    </div>
                                                </div>
                                                {/* Rate */}
                                                <div className="two wide column" style={{ paddingLeft: '2px', paddingRight: '5px' }}>
                                                    <div className="field">
                                                        <input type="number" name="rate" placeholder="Rate" value={this.state.rows[idx].RATE}
                                                            onBlur={this.handleBlur(idx)} onChange={this.handleChange(idx)} onFocus={this.handleFocus(idx)} />
                                                    </div>
                                                </div>
                                                {/* Quantity */}
                                                <div className="two wide column" style={{ paddingLeft: '2px', paddingRight: '5px' }}>
                                                    <div className="field">
                                                        <input type="number" name="quantity" placeholder="Quantity" value={this.state.rows[idx].QUANTITY}
                                                            onBlur={this.handleBlur(idx)} onChange={this.handleChange(idx)} onFocus={this.handleFocus(idx)} />
                                                    </div>
                                                </div>

                                                <div className="three wide column" style={{ paddingLeft: '2px', paddingRight: '5px' }}>
                                                    <div className="field">
                                                        <Select
                                                            isMulti
                                                            //name={`${idx}`}
                                                            // onChange={this.handleSelectChange}
                                                            value={this.state.rows[idx].TAXArr}
                                                            onChange={this.handleSelectChange.bind(this, idx)}
                                                            options={options}
                                                            placeholder="Select Tax"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="two wide column" style={{ paddingLeft: '2px', paddingRight: '5px' }}>
                                                    <div className="field">
                                                        <input type="number" name="amount" placeholder="amount" value={this.state.rows[idx].AMOUNT}
                                                            onBlur={this.handleBlur(idx)} onChange={this.handleChange(idx)} onFocus={this.handleFocus(idx)} />
                                                    </div>
                                                    <div className="field">
                                                        {this.state.rowsError[idx].isErrorAmount ? <span id="errorspan">Amount is required</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                        ))}
                                        <div className="six row">
                                            <div className="two wide column">
                                                <div className="field">
                                                    <div className="ui icon" style={{ backgroundColor: "#c4d3d3", height: 35, width: 55, textAlign: "center", borderRadius: 2 }} onClick={this.handleAddRow}>
                                                        <i className="plus icon" style={{ marginTop: 8 }}></i>
                                                        <label>Add</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="five row">
                                            <div className="thirteen wide column" />
                                            <div className="three wide column">
                                                <div className="field">
                                                    {this.state.SummarylistArr ?
                                                        <ReactTable
                                                            onFetchData={(p) => {
                                                                window.document.getElementsByClassName('rt-thead')[0].style.display = 'none'

                                                            }}
                                                            data={this.state.SummarylistArr}

                                                            columns={[
                                                                {
                                                                    headerStyle: { display: 'none' },
                                                                    accessor: "TAXTEXT",
                                                                },
                                                                {
                                                                    headerStyle: { display: 'none' },
                                                                    accessor: "TAXAMOUNT",
                                                                },
                                                            ]}
                                                            defaultPageSize={4}
                                                            showPagination={false}
                                                            defaultSorting={true}
                                                            className="-highlight .rt-tr"
                                                            noDataText=""


                                                        /> : null
                                                    }
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    {/* -- popup after changing status-- */}
                    <div id="snackbar">  <i className="info circle icon"></i> Invoice saved successfully.</div>
                </div>
            );
        } else {
            return (
                <div className="ui icon header">
                    <div className="ui active loader"></div>
                </div>
            );
        }
    }
}