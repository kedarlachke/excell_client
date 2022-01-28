import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { execGql } from '../apolloClient/apolloClient';
import { excelDocListQuery, ExcelDocDDLQuery, uploadCompanyDocumentsQuery, deleteCompanyDocumentsQuery } from "../Queries/queries";
import ReactTable from "react-table";
import "react-table/react-table.css";

var fileArr = []
export default class Leads_Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataList: '',
            docTypeDDL: [],
            doctype: '',
            errorDoctype: '',
            errorDocument: '',
            docid: '',
            popupmsg: '',
            showLoading:false,
            isDocExist:false,
            append:true
        }

    };

    componentDidMount() {
        this.populateDocTypeDDL()
        this.searchExcelDocs()
    }

    /*---------- search leads ---------*/
    async populateDocTypeDDL() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', ExcelDocDDLQuery, this.setParams())
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
                docTypeDDL: result.data.populateDDL,
            })
        }
    }


    /*---------- search leads ---------*/
    async searchExcelDocs() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', excelDocListQuery, this.setParams())
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
            this.setState({ dataList: result })
        }
    }

    /*---------- set "searchDocs query" and "ExcelDocDDLQuery" query variables  ---------*/
    setParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
        }
        return parameters
    }

    /*---------- url for downloading file  ---------*/
    getUrl(doctype) {
        if (doctype == "Price List")
            return process.env.API_SERVER + '/download?documentType=PRICELIST'
        else if (doctype == "Company Profile")
            return process.env.API_SERVER +  '/download?documentType=CMPNPROFILE'

    };


    //upload company doc func
    async uploadCompanyDoc() {
    this.setState({showLoading:true})
        try {
            const formData = new FormData();
            const url = process.env.API_SERVER ;
console.log(process.env.API_SERVER)
            formData.append('query', uploadCompanyDocumentsQuery);
            formData.append('variables', JSON.stringify(this.setUpldDocParams() || {}));

            for (let i = 0; i < fileArr.length; i++) {
                formData.append(`file${i}`, fileArr[i])
            }
            console.log(this.setUpldDocParams());
            console.log(fileArr);
            let response = await fetch(url, {
                method: 'POST',
                headers: { Accept: '*/*' },
                body: formData
            }).then(res => res.json()).then((res, err) => {
                console.log(res)
                if (res.errors) {
                    let errorMessage = res.errors[0].message
                    if (errorMessage.includes('already exists')) {
                        this.setState({ popupmsg: res.errors[0].message ,isDocExist:true})
                        this.showMsg()
                        this.clearscreen()
                    }
                    else {
                        errorMessage = JSON.parse(errorMessage)
                        for (let key in errorMessage) {
                            console.log(errorMessage[key]);
                            this.setState({
                                errorDoctype: errorMessage[key].errorDOCTYPE,
                                errorDocument: errorMessage[key].errorDOCUMENT,
                            })
                            console.log(this.state.errorDoctype);
                            console.log(this.state.errorDocument);
                        }
                    }
                }
                else{
                    this.clearscreen()
                    this.searchExcelDocs()
                  
                    this.setState({isDocExist:false,popupmsg:'File uploaded successfilly.'})
                    this.showMsg()
                }
                this.setState({showLoading:false})
            })
           
        }
        catch (err) {
            console.log(err)
        }
    };

    //set upload doc query params
    setUpldDocParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "DOCTYPE": this.state.doctype,
            "APPEND":this.state.append
        }
        return parameters
    }

    //file upld comp onchange method
    handleChange = (e) => {
        const { files } = e.target
        fileArr.push(files[0])

    };


    /*---------- delete company docs func ---------*/
    async deleteCompanyDocs() {
        this.setState({showLoading:true})
        var result = '', errorMessage = '', errors = [];
        try {
            console.log(this.setDeleteParams());

            result = await execGql('mutation', deleteCompanyDocumentsQuery, this.setDeleteParams())
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
            this.setState({ showModal: 'none' })
            this.searchExcelDocs()
            this.setState({showLoading:false})
        }
    }

    /*---------- set delete LeadsCRUDOpsQuery variables  ---------*/
    setDeleteParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "DOCID": this.state.docid,
        }
        return parameters
    }


    clearscreen() {
        this.setState({
            doctype: '',
            errorDoctype: '',
            errorDocument: ''
        })
        ReactDOM.findDOMNode(this.refs.fileuploadcomp).value = "";
        fileArr = []
    }

    /*-----------------------to show msg popup--------------------*/
    showMsg() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    render() {
//alert(this.state.doctype)
        const { dataList } = this.state

        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className="three column row">
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                <h1 id="title_header"> FILE UPLOAD</h1>
                            </div>
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                        </div>

                        <div className="three column row">
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                <div id="cus_segment" className="ui segment">
                                    <div className="ui form">

                                        <div className="ui three column stackable grid">
                                            <div className="row">
                                                < div className="three wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorDoctype ? 'brown' : null }} >Document Type</label>
                                                        <select style={{ borderColor: this.state.errorDoctype ? 'brown' : null, backgroundColor: this.state.errorDoctype ? '#f3ece7' : null }}
                                                            className="" value={this.state.doctype} //onKeyPress={(e) => this.handleKeyPress(e)}
                                                            onChange={e =>{ this.setState({ doctype: e.target.value })  }}>
                                                            <option value="">Select</option>
                                                            {this.state.docTypeDDL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>)}
                                                        </select>
                                                        <div className="field">
                                                            {this.state.errorDoctype ? <span id="errorspan">{this.state.errorDoctype}</span> : null}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorDocument ? 'brown' : null }} >File</label>
                                                        <input style={{ borderColor: this.state.errorDocument ? 'brown' : null, backgroundColor: this.state.errorDocument ? '#f3ece7' : null }}
                                                            type="file" name="file" placeholder="file" ref="fileuploadcomp" onChange={e => this.handleChange(e)} />
                                                        <div className="field">
                                                            {this.state.errorDocument ? <span id="errorspan">{this.state.errorDocument}</span> : null}
                                                        </div>
                                                    </div>

                                                </div>
                                                {this.state.doctype==='EXCEL'?<div className="five wide column">
                                                    <div className="field">
                                                        <label style={{ color: this.state.errorDocument ? 'brown' : null }} >Uppend</label>
                                                        <input type="checkbox" id="vehicle1" name="vehicle1" value={this.state.append} checked={this.state.append} onChange={()=>{this.setState({append:!this.state.append})}}></input>
                                                    </div>

                                                </div>:null}


                                            </div>
                                            <div className="row">
                                                <div className="ten wide column">
                                                    <button className="ui primary button" type="submit" onClick={() => this.uploadCompanyDoc()}>Upload</button>
                                                    <button className="ui  button" type="submit" onClick={() => this.clearscreen()} >Clear</button>
                                                </div>
                                            </div>

                                            <h1 id="title_header">  </h1>


                                        </div>
                                        <ReactTable
                                            data={dataList.data.searchCompanyDocuments}
                                            columns={[


                                                {
                                                    Header: "Document ID",
                                                    accessor: "DOCID",
                                                    width: 95
                                                },
                                                {
                                                    Header: "Document Type",
                                                    accessor: "DOCTYPE",
                                                    width: 200
                                                },
                                                {
                                                    Header: "Document Name",
                                                    accessor: "DOCNM",
                                                },

                                                {
                                                    Header: 'Action',
                                                    accessor: 'dataList',
                                                    width: 85,
                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: row => (
                                                        <div>
                                                            <div id="gridbutton" className="ui  button" tabIndex="0">
                                                                <a href={this.getUrl(row.original.DOCTYPE)} target="_blank" style={{ color: "gray" }}>
                                                                    <i id="gridicon" className="download icon"></i>
                                                                </a>
                                                            </div>
                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', docid: row.original.DOCID })}>
                                                                <i id="gridicon" className="alternate trash icon"></i>
                                                            </div>

                                                        </div>)
                                                },
                                            ]}
                                            defaultPageSize={2}
                                            className="-highlight"
                                            showPagination={false}

                                        />

                                        {/* -- The Modal(popup) opens onclick of delete btn -- */}
                                        <div className="modal" style={{ display: this.state.showModal }} >
                                            <div className="modal-content">

                                                <div className="ui icon header " style={{ color: "white", textAlign: "Center" }}>
                                                    <i className="archive icon"></i>
                                                    Delete Document
                                              </div>
                                                {/* <span className="close" onClick={() => this.setState({ showModal: 'none' })}>&times;</span> */}

                                                <p style={{ color: "white" }}> 	Are you sure you want to delete this Document ?</p>
                                                <div style={{ textAlign: "right" }}>
                                                    <div className="ui red basic cancel inverted button" onClick={() => this.setState({ showModal: 'none', })} >
                                                        <i className="remove icon"></i>
                                                        No
                                                 </div>
                                                    <div className="ui green ok inverted button" onClick={() => this.deleteCompanyDocs()} >
                                                        <i className="checkmark icon"></i>
                                                        Yes
                                                  </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/*msg after mail sending*/}
                                        <div id="snackbar" style={{backgroundColor:this.state.isDocExist?'#dd212d':'rgba(33,155,166,0.88)'}}>  <i className="info circle icon"></i>{this.state.popupmsg}</div>
                                     
                                        {/* -- loading Component- */}
                                        <div className="modal" style={{ display: this.state.showLoading ? 'flex' : 'none' }} >
                                            <div className="modal-content">

                                                <div className="ui icon header">
                                                    <div className="ui active inverted loader"></div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>

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