import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { execGql } from '../apolloClient/apolloClient';
import { searchServices,ServicesCRUDOps } from '../Queries/queries'
import {exportToExcel} from '../commonfunctions/commonfunctions'

export default class Service_List extends Component {
    constructor() {
        super();
        this.state = {
            dataList: '',
            showModal: 'none',
            CATCODE: "",
            STCODE: "",
            showSearchForm:false,
            servicename:''
        };
    };

    componentDidMount() {
        this.populateList()
    };

    // To Populate Date
    async populateList() {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', searchServices, this.setSearchParams())
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
            this.setState({ dataList: result })
        }

    };

    setSearchParams() {
        var parameters = {
            "clnt": "1002",
            "lang": "EN",
            "doctyp": "%"+this.state.servicename+"%"
        }
        return parameters

    };
   // To Delete Service
   async DeleteService() {
    var result = '', errorMessage = '';
    try {
        result = await execGql('mutation', ServicesCRUDOps, this.setDeleteParams())
        // console.log(result);
    }
    catch (err) {
        // errors = err.errorsGql;
        errorMessage = err.errorMessageGql;

    }

    if (!result) {
        // errorval = true
        errorMessage = JSON.parse(errorMessage);
        console.log(errorMessage)
    }
    else {

        console.log(result);
        this.setState({ showModal: 'none', })
        this.componentDidMount()
        // this.OnClear()

    }

};
setDeleteParams() {
    var parameters = {
        "transaction": "LOGICAL_DELETE",
        "services": [
          {
            "CLNT": "1002",
            "LANG": "EN",
            "CATCODE":this.state.CATCODE,
            "STCODE":this.state.STCODE
          }
        ]
    }
    return parameters

};


   //----------close search form
   closeSearchForm() {
    this.setState({ showSearchForm: !this.state.showSearchForm })
    this.clearscreen()
}

/*---------- clears the search form fields  ---------*/
async  clearscreen() {
    await this.setState({
       servicename:''
    })
    this.populateList()
}

    /*-----------------------populates the list on enter keypress  --------------------*/
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.populateList()
        }
    }

/*-----------------------download services excel report--------------------*/
exportServicesExcel() {
    console.log("export ----1");
    let ParamArray= ["1002",
     "EN",
      "%" + this.state.servicename + "%"
      ]

    var parameters = {
        "ReportType": ["SERVICES"],
        "ParamArray":[ParamArray],
        "ReportName": "ServicesList"
    }
    let uri = exportToExcel(parameters);
    return uri;
}
    render() {

        const { dataList } = this.state;

        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className="three column row">
                           
                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <h1 >Service List</h1>
                                <div className="icode">
                                    <Link to={'/addservice'} style={{ color: '#151515' }}>
                                        <i id="iconbar" className="plus icon"></i>
                                    </Link>
                                    <a href={this.exportServicesExcel()} style={{ color: '#151515' }}> <i id="iconbar" className="arrow down icon"></i></a>
                                    <i id="iconbar" className="search icon" onClick={() => this.setState({ showSearchForm: !this.state.showSearchForm })}></i>
                                </div>

                             {this.state.showSearchForm ? <div className="field">
                                    <div className="ui segment">
                                        <i id="closeicon" className="window close outline icon" onClick={() => this.closeSearchForm()}></i>
                                        <div className="ui form">
                                            <div className="ui three column stackable grid">

                                                <div className="row">
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label >Service Name</label>
                                                            <input type="text" name="servicename" placeholder="Service Name" onKeyPress={(e) => this.handleKeyPress(e)}
                                                                value={this.state.servicename} onChange={e => this.setState({ servicename: e.target.value })} />
                                                        </div>
                                                    </div>

                                                    <div className="five wide column"style={{marginTop:12}}>
                                                        <button className="ui primary button" type="submit" onClick={() => this.populateList()}>Search</button>
                                                        <button className="ui  button" type="submit" onClick={() => this.clearscreen()} >Clear</button>
                                                    </div>
                                                    

                                                </div>

                                               
                                             


                                                <div className="row">
                                                    

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    : null}

                            </div>
                           
                        </div>
                        <div className="three column row">
                           
                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <div id="cus_segment" className="ui segment">
                                    <div className="ui form">

                                        <ReactTable
                                            data={dataList.data.searchServices}
                                            columns={[

                                                {
                                                    Header: "Sr.No.",
                                                    width: 60,
                                                    Cell: props => <span>{props.index + 1}</span>
                                                },

                                                {
                                                    Header: "Service Name",
                                                    accessor: "STDESC",
                                                    // width: 50,
                                                },
                                                {
                                                    Header: "Status",
                                                    accessor: "ISACTIVE",
                                                    width: 100,
                                                },

                                                {
                                                    Header: 'Action',
                                                    accessor: 'dataList',
                                                    width: 90,
                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: row => (
                                                        <div>
                                                            {/*----button Edit---------- */}
                                                            <Link to={{ pathname: '/addservice', state: { data: row.original } }} >
                                                                <div id="gridbutton" className="ui blue button" tabIndex="0" >
                                                                    <i id="gridicon" className="edit icon"></i>
                                                                </div>
                                                            </Link>
                                                            {/* ----Delete button---------- */}
                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', CATCODE: row.original.CATCODE, STCODE: row.original.STCODE })}>
                                                                <i id="gridicon" className="alternate trash icon"></i>
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                            ]}
                                            defaultPageSize={40}
                                            className="-highlight"

                                        />

                                        {/* -- The Modal -- */}
                                        <div className="modal" style={{ display: this.state.showModal }} >
                                            <div className="modal-content">

                                                <div className="ui icon header " style={{ color: "white", textAlign: "Center" }}>
                                                    <i className="archive icon"></i>
                                                    Delete Service
                                                </div>
                                                {/* <span className="close" onClick={() => this.setState({ showModal: 'none' })}>&times;</span> */}

                                                <p style={{ color: "white" }}> 	Are you sure you want to delete this Service ?</p>
                                                <div style={{ textAlign: "right" }}>
                                                    <div className="ui red basic cancel inverted button" onClick={() => this.setState({ showModal: 'none', })} >
                                                        <i className="remove icon"></i>
                                                        No
                                                     </div>
                                                    <div className="ui green ok inverted button" onClick={()=>this.DeleteService()}  >
                                                        <i className="checkmark icon"></i>
                                                        Yes
                                                   </div>
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