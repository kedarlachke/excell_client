import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { execGql } from "../apolloClient/apolloClient";
import { searchBilledHoursHeaderQuery, searchBilledHoursDetailsQuery } from "../Queries/queries";
import { exportToExcel } from '../commonfunctions/commonfunctions'

export default class BilledHrs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            selectedList: [],
            billedHrDetails: '',
            clntids:''
        };
    }

    componentDidMount() {
        this.populateList()
    }

    /*-----------------------search billedhrs  --------------------*/
    async populateList() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', searchBilledHoursHeaderQuery, this.setSearchParams())
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
            let data = await result.data.searchBilledHoursHeader.map(val => ({ ...val, isSelect: false }))
            this.setState({ dataList: data })
        }
    }

    /*-----------------------to set searchBilledHoursHeaderQuery variables  --------------------*/
    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
        }
        return parameters
    }

    /*----------------------- search billable details hrs --------------------*/
    async searchBilledHoursDetails(clntid) {
        var result = '', errorMessage = '', errors = [];
        try {
            console.log(this.setSearchDetailsParams(clntid));

            result = await execGql('query', searchBilledHoursDetailsQuery, this.setSearchDetailsParams(clntid))
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
            if (result.data.searchBilledHoursDetails !== null)
                this.setState({ billedHrDetails: result })
        }
    }

    /*----------------------- set searchBillableHoursDetails Query variables --------------------*/
    setSearchDetailsParams(clntid) {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CLNTIDS": clntid
        }
        return parameters
    }

    /*-----------------------download billedHr excel report--------------------*/
    exportBilledHrExcel() {
        let ParamArray = [
            "1002",
            "EN",
            this.state.clntids,
            this.state.clntids,
            this.state.clntids,    
        ]

        var parameters = {
            "ReportType": ["BILLEDHRS_HDR", "BILLEDHRS_DTL"],
            "ParamArray": [ParamArray,ParamArray],
            "ReportName": "BilledHours"
        }
        let uri = exportToExcel(parameters);
        return uri;
    }


//..............checkbox onchange function..........
async toggleRow(cellInfo, event) {
    let index = cellInfo.index
    let selectedListArr = [...this.state.selectedList]
    const dataList = [...this.state.dataList];

    dataList[index].isSelect = !dataList[index].isSelect;
    if (event.target.checked) {
        await selectedListArr.push({ [index]: cellInfo.original })
    }
    else {
        selectedListArr = await selectedListArr.filter(data => Object.entries(data)[0][0] !== index.toString())
    }
    let clntidArr = await selectedListArr.map(data => Object.entries(data)[0][1].CLNTID)
    let clntids = clntidArr.join(',')

    this.searchBilledHoursDetails(clntids)

    await this.setState({ selectedList: selectedListArr, dataList,clntids:clntids })
    console.log(this.state.selectedList);
}

//.............. toggle select all checkboxes..........
async  toggleAllRow(event) {
    let checkedArr, selectedListArr = [...this.state.selectedList];
    if (event.target.checked) {
        checkedArr = await this.state.dataList.map((data) => ({ ...data, isSelect: true }))
        await this.state.dataList.map((value, index) => { selectedListArr.push({ [index]: value }) })
    } else {
        checkedArr = await this.state.dataList.map((data, index) => ({ ...data, isSelect: false }))
        selectedListArr = []
    }
    let clntidArr = await selectedListArr.map(data => Object.entries(data)[0][1].CLNTID)
    let clntids = clntidArr.join(',')
     this.searchBilledHoursDetails( clntids)
    await this.setState({ dataList: checkedArr, selectedList: selectedListArr,clntids:clntids })

}

//..............Date Formate Convertion..........
formatDate(date) {
    if (date != null) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)
        var date_format = month + '/' + day + '/' + year
        return date_format
    }
}


render() {
    const { dataList, billedHrDetails } = this.state
    if (dataList.length != 0) {
        return (
            <div>
                <div className="ui one column grid">
                    <div className="three column row">

                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <h1 id="">BILLED HOURS</h1>

                            <div className="icode" id="">
                                <a href={this.exportBilledHrExcel()} style={{ color: '#151515' }}> <i id="iconbar" className="arrow down icon"></i></a>
                            </div>

                        </div>

                    </div>
                    <div className="three column row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                            <div id="cus_segment" className="ui segment">
                                <div className="ui form">
                                    <ReactTable
                                        data={dataList}
                                        columns={[
                                            {
                                                Header: <div><input type="checkbox" onClick={(e) => this.toggleAllRow(e)} /><label>Select All</label></div>,
                                                accessor: 'isSelect',
                                                width: 100,
                                                sortable: false,
                                                style: {
                                                    cursor: 'pointer',
                                                    paddingTop: 4,
                                                    paddingBottom: 4
                                                },
                                                Cell: row => (
                                                    <div >
                                                        <input type="checkbox" onClick={(event) => this.toggleRow(row, event)}
                                                            checked={row.value}
                                                        />
                                                    </div>)

                                            },

                                            {
                                                Header: "Client ID",
                                                accessor: "CLNTID",
                                                width: 100,

                                            },
                                            {
                                                Header: "Client Name",
                                                accessor: "CLIENTNAME",
                                            },
                                            {
                                                Header: "Billable Hours",
                                                accessor: "CLNTBILLABLEHW",
                                                width: 100,
                                            },
                                            {
                                                Header: "Billed Hours",
                                                accessor: "CLNTHW",
                                                width: 100,
                                            }
                                        ]}
                                        defaultPageSize={10}
                                        className="-highlight"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {billedHrDetails ? <div className="three column row">
                        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">

                            <div id="cus_segment" className="ui segment">
                                <div className="ui form">
                                    <ReactTable
                                        data={billedHrDetails.data.searchBilledHoursDetails}
                                        columns={[
                                            {
                                                Header: "Invoice No",
                                                accessor: "DOCNO",
                                                width: 80,
                                            },
                                            {
                                                Header: "Invoice Date",
                                                accessor: "DOCDT",
                                                width: 90,
                                                Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                            },
                                            {
                                                Header: "Work Id",
                                                accessor: "PRGWORKID",
                                                width: 80,
                                            },
                                            {
                                                Header: "Client Name",
                                                accessor: "CLIENTNAME",


                                            },
                                            {
                                                Header: "Service Type",
                                                accessor: "SERVICETYP",
                                                width: 92,

                                            },
                                            {
                                                Header: "Progress Date",
                                                accessor: "RPTDATE",
                                                width: 105,
                                                Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                            },
                                            {
                                                Header: "Work Category",
                                                accessor: "WORKCAT",
                                                width: 105,
                                            },
                                            {
                                                Header: "Work Date",
                                                accessor: "CDATE",
                                                width: 90,
                                                Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                            },
                                            {
                                                Header: "Billable Hours",
                                                accessor: "CLNTBILLABLEHW",
                                                width: 100,
                                            },
                                            {
                                                Header: "Billed Hours",
                                                accessor: "WORKHOURS",
                                                width: 90,
                                            },
                                            {
                                                Header: "Progress Details",
                                                accessor: "RPTTXT",

                                            },


                                        ]}
                                        defaultPageSize={10}
                                        className="-highlight"
                                    />
                                </div>
                            </div>
                        </div>
                    </div> : null}

                    <div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="ui icon header" style={{ marginTop: 300 }}>
                <div className="ui active loader"></div>
            </div>
        );
    }
}
}