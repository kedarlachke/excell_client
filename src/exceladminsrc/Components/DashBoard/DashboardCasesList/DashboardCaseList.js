import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";



export default class CaseList extends React.Component {


  //..............Date Formate Convertion..........
  formatDate(date) {
    if (date != null) {
      var year = date.slice(0, 4)
      var month = date.slice(4, 6)
      var day = date.slice(6, 8)

      var date_format = month + '/' + day + '/' + year
      return date_format
    } else {
      return null
    }

  }
  render() {
 
      return (
        <div>
          <ReactTable
            data={this.props.caselistdata}
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
                accessor: "CASEDT",
                width: 85,
                Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
              },
              {
                Header: "Client Name",
                accessor: "FRSTNM",
              },
              {
                Header: "Service Type",
                accessor: "SERVICETYP",
              },

              {
                Header: "Status",
                accessor: "STATUS",
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
                    {/*----button Edit---------- */}
                    <div id="griddeletebutton" className="ui gray button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex' })}>
                      <i id="gridicon" className="alternate eye icon"></i>
                    </div>
                  </div>)
              },
            ]}
            defaultPageSize={5}
            className="-highlight"
            // SubComponent={() => <div style={{padding: '10px'}}>Hello</div>}

            SubComponent={row => {
              const rowData = row.original;
              return (
                <div style={{ padding: "10px" }}>

                  <div className="ui list">

                    <div className="item" style={{ marginLeft: 5 }}>

                      <div style={{ float: 'left', paddingTop: 5 }}> <strong >Best time to call :</strong>  <span>{rowData.TDESC}</span> </div>
                      <div style={{ marginLeft: 330, paddingTop: 5 }}>  <strong >Last Update :</strong>  <span>{this.formatDate(rowData.CASEDT)}</span>    </div>
                      <div style={{ paddingTop: 5 }}> <strong>Contact Mode:</strong>  <span>{rowData.MODDESC}</span>  </div>
                      <div style={{ paddingTop: 5 }}  >   <strong>Address:</strong>  <span>{rowData.ADDRESS}</span>   </div>
                      <div style={{ paddingTop: 5 }}  >   <strong>City:</strong>  <span>{rowData.CITY}</span>   </div>
                      <div style={{ paddingTop: 5 }}  >   <strong>State:</strong>  <span>{rowData.STDESC}</span>   </div>
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


