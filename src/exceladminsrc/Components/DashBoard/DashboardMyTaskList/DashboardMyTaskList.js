import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router-dom";


export default class DashboardMyTasklist extends React.Component {

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

  submitClick(value) {
    alert("Edit-----------------" + value.email);
    //write the further functionality
  }

  deleteClick(value) {
    alert("Delete-----------------" + value.email);
    //write the further functionality
  }


  render() {
 return (
        <div>
          <ReactTable
            data={this.props.mytasklistdata}
            columns={[

              {
                Header: "Date",
                accessor: "DUEDATE",
                Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
              },

              {
                Header: "Subject",
                accessor: "SUBJECT",
              },

              {
                Header: "Assign By",
                accessor: "TASKOWNER",
              },

              {
                Header: "Priority",
                accessor: "PRIORITY",
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
                    
                      <Link to={{ pathname: '/addtask', state: { data: row.original.TASKID } }}>
                          <div id="gridbutton" className="ui blue button" tabIndex="0" >
                              <i id="gridicon" className="edit icon"></i>
                          </div>
                      </Link >
                     

                  </div>)
              },
            ]}
            defaultPageSize={5}
            className="-highlight"
          />
        </div>

      );
  }
}


