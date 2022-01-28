import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { execGql } from '../apolloClient/apolloClient';
import { deleteDocumentsQuery } from '../Queries/queries';

export default class FileUploadList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: 'none',
            showsubModal: 'flex',
            leadId: '',
            srno: ''
        };
        this.getUrl = this.getUrl.bind(this);
        this.populateList = this.props.populateList.bind(this);
        this.populateDocDetails = this.props.populateDocDetails.bind(this);
        this.showloading = this.props.showloading.bind(this);
    };

    componentDidMount() {

        console.log("this.props.leadId---------------------");
        console.log(this.props.leadId);
        console.log(this.props.Entity);
        console.log("this.props.leadId----------------");
    }
    //..............Date Formate Convertion..........
    formatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)

        var date_format = month + '/' + day + '/' + year
        return date_format
    };

    getUrl(id) {

        return process.env.API_SERVER + '/download?documentType=LEADDOCS&documentID=' + id + ''

    };

    /*---------delete docs func---------*/
    async  deletedocs() {
        this.setState({ showModal: "none" })
        this.showloading()
        var result = '', errorMessage = '';
        try {
            result = await execGql('mutation', deleteDocumentsQuery, this.setDeleteDocsParams())

        }
        catch (err) {
            // errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            console.log(errorMessage);
        }
        else {
            console.log(result);
            this.populateList()

        }
    }
    /*---------set delete docs params ----------*/
    setDeleteDocsParams() {
        console.log(this.props.leadId);
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CENTITY": this.props.Entity,
            "CENTITYID": this.props.leadId,
            "SRNO": this.state.srno
        }
        return parameters
    };

    /*---------set  doc details params ----------*/
    setDocDetailsParams(srno) {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CENTITYID": this.props.leadId,
            "CENTITY": this.props.Entity,
            "SRNO": srno
        }
        return parameters
    };

    render() {
        console.log(this.state.srno);
        if (this.props.dataList) {
            return (

                <div>
                    <ReactTable
                        data={this.props.dataList.data.searchUploadedDocuments}
                        columns={[
                            {
                                Header: "Date",
                                accessor: "CDATE",
                                width: 85,
                                Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                            },
                            // {
                            //     Header: "User",
                            //     accessor: "USERNM",
                            //     width: 200,
                            // },
                            {
                                Header: "Note",
                                accessor: "NOTE",
                                width: 540,
                                Cell: props => (
                                  <span >
                                    <td dangerouslySetInnerHTML={{__html: props.value}} />
                                  </span>
                                )
                            },
                            {
                                Header: "Document Name",
                                accessor: "CDOCNAME",
                                width: 180,
                            },
                            // {
                            //     Header: "Document Type",
                            //     accessor: "CDOCTYPE",
                            //     width: 120,
                            // },
                            {
                                Header: 'Action',
                                accessor: 'dataList',
                                width: 130,
                                style: {
                                    cursor: 'pointer',
                                    paddingTop: 4,
                                    paddingBottom: 4
                                },
                                Cell: row => (
                                    <div>
                                        {/*----button Edit---------- */}
                                        <div style={row.original.NOTE.includes("<p>")==true?{display:'none'}:{display:'block'}}>
                                        <div id="gridbutton" className="ui blue button" tabIndex="0" >
                                            <i id="gridicon" className="edit icon"  onClick={() => this.populateDocDetails(this.setDocDetailsParams(row.original.SRNO))}></i>
                                        </div>
                                        <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', srno: row.original.SRNO })}>
                                            <i id="gridicon" className="alternate trash icon"></i>
                                        </div>
                                        </div>
                                        <div style={row.original.NOTE.includes("<p>")==true?{display:'block'}:{display:'none'}}>
                                        
                                        <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', srno: row.original.SRNO })}>
                                            <i id="gridicon" className="alternate trash icon"></i>
                                        </div>
                                        </div>
                                        {row.original.CDOCNAME ? <div id="gridbutton" className="ui blue button" tabIndex="0">
                                            <a href={this.getUrl(row.original.SRNO)} target="_blank" style={{ color: 'white' }}>
                                                <i id="gridicon" className="download icon"></i></a>
                                        </div> : null}


                                    </div>
                                )
                            }
                        ]}
                        defaultPageSize={5}
                        className="-highlight"
                    />

                    {/* -- The Modal -- */}
                    <div className="modal" style={{ display: this.state.showModal }} >
                        <div className="modal-content">

                            <div className="ui icon header " style={{ color: "white", textAlign: "Center" }}>
                                <i className="archive icon"></i>
                                Delete Note
                         </div>
                            {/* <span className="close" onClick={() => this.setState({ showModal: 'none' })}>&times;</span> */}

                            <p style={{ color: "white" }}> 	Are you sure you want to delete this Note ?</p>
                            <div style={{ textAlign: "right" }}>
                                <div className="ui red basic cancel inverted button" onClick={() => this.setState({ showModal: 'none', })} >
                                    <i className="remove icon"></i>
                                    No
                               </div>
                                <div className="ui green ok inverted button" onClick={() => this.deletedocs()} >
                                    <i className="checkmark icon" ></i>
                                    Yes
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