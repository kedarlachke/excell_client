import React from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";




export default class LeadList extends React.Component {



  //..............Date Formate Convertion..........
  formatDate(date) {
    var year = date.slice(0, 4)
    var month = date.slice(4, 6)
    var day = date.slice(6, 8)

    var date_format = month + '/' + day + '/' + year
    return date_format
  }
    render() {
       
       
            return (


                <div>
                    <ReactTable
                        data={this.props.leadlistdata}
                        columns={[
                            {
                                expander: true,
                                Header: () => '',
                               
                                Expander: ({ isExpanded, ...rest }) =>
                                    <div>
                                        {isExpanded
                                            ? <span>&#x2296;</span>
                                            : <span>&#x2295;</span>}
                                    </div>,
                                style: {
                                    cursor: "pointer",
                                    fontSize: 12,
                                    //  padding: "0",
                                    textAlign: "center",
                                    userSelect: "none"
                                }
                            },

                            {
                                Header: "Date",
                                accessor: "CDATE",
                                width: 85,
                                Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                            },
                            {
                                Header: "Client Name",
                                accessor: "FULLNM",
                            },
                            {
                                Header: "Business",
                                accessor: "OFFICENM",
                            },
                            {
                                Header: "Service",
                                accessor: "STDESC",
                            },
                            {
                                Header: "Priority",
                                accessor: "PRIORITY",
                                width: 60,
                            },
                            {
                                Header: 'Action',
                                accessor: 'dataList',
                                width: 50,
                                style: {
                                    cursor: 'pointer',
                                    paddingTop:4,
                                    paddingBottom:4
                                },
                                Cell: row => (
                                    <div>
                                     
                                        {/* ----button Edit---------- */}
                                        <div id="griddeletebutton" className="ui gray button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex' })}>
                                            <i id="gridicon" className="alternate eye icon"></i>
                                        </div>
                    
                                    </div>)
                            },
                        ]}
                        defaultPageSize={5}
                        className="-highlight"
                        
                        SubComponent={row => {
                               const rowData = row.original;
                            return (
                                <div style={{ padding: "10px" }}>
                                   
                                    <div className="ui list">
                                       
                                        <div className="item"style={{marginLeft:5}}>
                                      
                                       <div  style={{float:'left',paddingTop:5}}> <strong >Email :</strong>  <span>{rowData.EMAILID}</span> </div>
                                       <div style={{marginLeft:330,paddingTop:5}}>  <strong >Last Update :</strong>  <span>{this.formatDate(rowData.LSTUPDT)}</span>    </div>
                                       <div style={{paddingTop:5}}> <strong>Phone :</strong>  <span>{rowData.PHONE}</span>  </div>
                                       <div style={{paddingTop:5}}  >   <strong>Best Method of Contact :</strong>  <span>{rowData.MODDESC}</span>   </div>
                                       <div style={{paddingTop:5}}  >   <strong>Best Time To Call :</strong>  <span>{rowData.BESTTMCAL}</span>   </div>
                                        </div>
                                       
                                    </div>

                                </div>
                            );
                        }}
                    />
                </div>

            );
       
    }
}