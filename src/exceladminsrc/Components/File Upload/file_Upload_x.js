import React, { Component } from 'react';
import FileUplaodList from '../File Upload/file_Upload_List';
import { SearchDocUploadQuery, LeadDoctTypQuery, UploadDocQuery, documentDetailsQuery, updateDocQuery } from '../Queries/queries';
import { execGql } from '../apolloClient/apolloClient';
import { NULL } from 'graphql/language/kinds';
var fileArr = [], errorval = false
var DropdownLeadList = []
export default class CustomerEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Notes: "",
            Document_Types: "",
            file: "",
            Doc_Type_Arr: [],
            dataList: '',
            errorNotes: "",
            showModal: 'none',
            showList: false,
            displayComp: false,
            tcode: 'create',
            srno: ''
        }
        this.Onclear = this.Onclear.bind(this);
        this.populateList = this.populateList.bind(this);
        this.populateDocDetails = this.populateDocDetails.bind(this);
        this.showloading = this.showloading.bind(this)
        this.gotoCaseType = this.props.data ? null : this.props.gotoCaseType.bind(this)
        this.gotoPreviousTab = this.props.data ? null : this.props.gotoPreviousTab.bind(this);
        this.showMsg = this.props.data ? null : this.props.showMsg.bind(this);
    }

    async componentDidMount() {
        this.DropdownDocType()
        console.log(this.props);
        
        // When In Lead Edit Populate Data 
        if (this.props.data) {
            console.log('in populate data');
            //  await this.setState({ showList: true, displayComp: false });
            this.populateList();
        }

        // When In Case Edit Populate Data 
        if (this.props.Case_Id) {
            //  await this.setState({ showList: true, displayComp: false });
            console.log('in populate Case_Id');
            await this.populateList();
            this.populateDocDetails(this.setDocDetailsParams(this.state.srno))

        }

        //  To Show Msg When User Don't save Case details First
        if (!this.props.CLIENTID) {
            this.props.data ? null : this.showMsg("Case details not save.\n Please save case details first", true);
            this.props.data ? null : this.gotoPreviousTab(1)
        }

    }
    Onclear() {
        this.setState({
            Notes: "",
            Document_Types: "",
            file: "",
            errorNotes: "",
            tcode: 'create'
        })
    };
    handleChange = (e) => {

        const { files } = e.target
        fileArr.push(files[0])

    };
    setCreateDocParams() {
        var entityid = ''
        var entity = ''
        this.props.data ? entityid = this.props.data.data.CID : entityid = this.props.Case_Id
        this.props.data ? entity = "Lead" : entity = "Case"
        console.log("entityid");
        console.log(entityid);
        console.log("entityid");
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CENTITY": entity,
            "CENTITYID": entityid,
            "CIMGDOC": this.state.Document_Types,
            "NOTE": this.state.Notes
        }
        return parameters

    }
    async createDoc() {
        if (this.state.Notes === "") {
            errorval = true
            this.setState({ errorNotes: "Notes is required" })
        }
        else {
            try {
                this.setState({ showModal: "flex" })
                const formData = new FormData();
                const url = process.env.API_SERVER ;


                console.log('lead save note');

                console.log(url);

                console.log('lead save note end ');
                formData.append('query', UploadDocQuery);
                console.log(this.setCreateDocParams());
                formData.append('variables', JSON.stringify(this.setCreateDocParams() || {}));

                for (let i = 0; i < fileArr.length; i++) {
                    formData.append(`file${i}`, fileArr[i])
                }

                let response = await fetch(url, {
                    method: 'POST',
                    headers: { Accept: '*/*' },
                    body: formData
                }).then(res => res.json()).then(res => console.log(res)).then(err => console.log(err));
                fileArr = []
                await this.populateList()
                //  this.props.Case_Id ? this.gotoCaseType(true, this.props.CLIENTID, this.props.Case_Id) : null
            }
            catch (err) {
                console.log(err)
            }
        }
    };

    async DropdownDocType() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', LeadDoctTypQuery, this.setDropdownParams())
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
            //  console.log(result)
            DropdownLeadList = []
            DropdownLeadList.push({
                "Documenttype": result.data.Documenttype
            })

            this.setState({ Doc_Type_Arr: DropdownLeadList })

        }

    }

    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN"
        }
        return parameters

    };

    async populateList() {
        await this.setState({ showList: true, displayComp: true });
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', SearchDocUploadQuery, this.setSearchParams())
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
            //console.log(result.data.searchUploadedDocuments[0]);
            //console.log(result.data.searchUploadedDocuments[0].SRNO);
            this.setState({ dataList: result })
            if (result.data.searchUploadedDocuments != 0) {
                await this.setState({ srno: result.data.searchUploadedDocuments[0].SRNO })
            }
            this.Onclear();
            await this.setState({ showModal: "none", displayComp: false })
            this.DisplayDocList()
        }

    };


    DisplayDocList() {
        var entityid = ''
        var entity = ''
        this.props.data ? entityid = this.props.data.data.CID : entityid = this.props.Case_Id
        this.props.data ? entity = "Lead" : entity = "Case"
        return <div>
            <FileUplaodList dataList={this.state.dataList} leadId={entityid} Entity={entity}
                populateList={this.populateList} populateDocDetails={this.populateDocDetails}
                showloading={this.showloading} />
        </div>
    }

    setSearchParams() {
        var entityid = ''
        var entity = ''
        this.props.data ? entityid = this.props.data.data.CID : entityid = this.props.Case_Id
        this.props.data ? entity = "Lead" : entity = "Case"
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CENTITY": entity,
            "CENTITYID": entityid
        }
        return parameters

    };


    //..............Date Formate Convertion..........
    formatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)

        var date_format = month + '/' + day + '/' + year
        return date_format
    };

    getUrl(id) {
        console.log('getURL')
        return process.env.API_SERVER + '/download?documentID=' + id + ''
    };

    navigateToLeadList() {
        if (this.props.data) {
            return this.props.history.push('/Dashboard/Leads_Main')
        }
        else {
            return this.props.history.push('/cases')
        }
    };

    /*------------populates form fields when edit btn in clicked--------------------*/
    async populateDocDetails(variables) {
        console.log(variables);
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', documentDetailsQuery, variables)
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
            if (result.data.documentDetails.length != 0) {
                this.setState({
                    Notes: result.data.documentDetails[0].NOTE,
                    srno: result.data.documentDetails[0].SRNO,
                    Document_Types: result.data.documentDetails[0].CIMGDOC,
                    tcode: 'update'
                });
            }

        }
    };

    /*---------set  doc details params ----------*/
    setDocDetailsParams(srno) {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CENTITYID": this.props.Case_Id,
            "CENTITY": "Case",
            "SRNO": srno
        }
        return parameters
    };

    async updateDocs() {
        try {
            console.log(this.state.tcode);
            console.log("updateDocs");
            console.log(this.setUpdateDocParams());

            this.setState({ showModal: "flex" })
            const formData = new FormData();
            const url = process.env.API_SERVER ;

            formData.append('query', updateDocQuery);
            formData.append('variables', JSON.stringify(this.setUpdateDocParams() || {}));

            for (let i = 0; i < fileArr.length; i++) {
                formData.append(`file${i}`, fileArr[i])
            }

            let response = await fetch(url, {
                method: 'POST',
                headers: { Accept: '*/*' },
                body: formData
            }).then(res => res.json()).then(res => console.log(res)).then(err => console.log(err));
            fileArr = []
            this.Onclear()
            await this.populateList()
            // this.props.Case_Id ? this.gotoCaseType(true, this.props.CLIENTID, this.props.Case_Id) : null
        }
        catch (err) {
            console.log(err)
        }
    };

    /*--------set Update Doc Params----------*/
    setUpdateDocParams() {
        var entityid = ''
        var entity = ''
        this.props.data ? entityid = this.props.data.data.CID : entityid = this.props.Case_Id
        this.props.data ? entity = "Lead" : entity = "Case"
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CENTITY": entity,
            "CENTITYID": entityid,
            "NOTE": this.state.Notes,
            "CIMGDOC": this.state.Document_Types,
            "SRNO": this.state.srno
        }
        return parameters
    }

    /*--------Docs create and update operation based on tcode----------*/
    DocCRUD_Ops() {
        if (this.state.tcode == 'create')
            this.createDoc()
        else if (this.state.tcode == 'update')
            this.updateDocs()
    }

    showloading() {
        this.setState({ showModal: "flex" })
    }

    render() {

        const { dataList } = this.state
        // if (this.state.displayComp) {
        return (
            <div>
                <div className="ui one column grid">
                    <div className="modal" style={{ display: this.state.displayComp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                        <div className="modal-content">
                            <div className="ui icon header">
                                <div className="ui active inverted loader"></div>
                            </div>
                        </div>
                    </div>
                    <div className="three column row">
                        <div className={this.props.data ? "one wide computer one wide tablet one wide mobile column" : ""}>
                        </div>
                        <div className={this.props.data ? "fourteen wide computer fourteen wide tablet fourteen wide mobile column" : "sixteen wide computer sixteen wide tablet sixteen wide mobile column"}>

                            <div className="ui segment" >

                                <div className="ui form">
                                    <div className="ui three column stackable grid">

                                        <div className="row">
                                            <div className="ten wide column">
                                                <div className="field">
                                                    <label style={{ color: this.state.errorNotes ? 'brown' : null }}> Notes</label>
                                                    <div className="ui right icon input">
                                                        <textarea style={{ borderColor: this.state.errorNotes ? 'brown' : null, backgroundColor: this.state.errorNotes ? '#f3ece7' : null }}
                                                            name='Notes' placeholder="Notes" rows="5" value={this.state.Notes} onChange={e => this.setState({ Notes: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field">
                                                    {errorval ? <span id="errorspan">{this.state.errorNotes}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label >File</label>
                                                    <input type="file" name="file" placeholder="file" onChange={e => this.handleChange(e)} />
                                                </div>

                                            </div>
                                            <div className="five wide column">
                                                <div className="field">
                                                    <label>Document Types</label>
                                                    <select className="" value={this.state.Document_Types} onChange={e => this.setState({ Document_Types: e.target.value })}>
                                                        {/* <option value="">Select</option> */}
                                                        {this.state.Doc_Type_Arr.map((data) => data.Documenttype.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="three column row">
                                            <div className="ten wide column">
                                                <button className="ui primary button" type="submit" onClick={() => this.DocCRUD_Ops()} >Save</button>
                                                {this.props.data ? null : <button className="ui primary button" type="submit" onClick={() => this.gotoCaseType(true, this.props.CLIENTID, this.props.Case_Id)} >Continue</button>}
                                                <button className="ui primary button" type="submit" onClick={() => this.Onclear()}>Clear</button>
                                                <button className="ui  button" type="submit" onClick={() => this.navigateToLeadList()} >Cancel</button>
                                            </div>
                                        </div>
                                        <div className="one wide computer one wide tablet one wide mobile row">
                                        </div>
                                        <div>
                                            {this.state.showList ? this.DisplayDocList() : null}
                                        </div>
                                        <div className="modal" style={{ display: this.state.showModal, backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
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
                        <div className={this.props.data ? "one wide computer one wide tablet one wide mobile column" : ""}>
                        </div>
                    </div>
                </div>
            </div>
        );
        // }
        // else {
        //     return (
        //         <div className="ui icon header">
        //             <div className="ui active loader"></div>
        //         </div>
        //     );
        // }
    }
}