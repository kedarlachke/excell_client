import React from "react";
import { execGql,pCLNT,pLANG } from "../../apolloClient/apolloClient";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Link } from "react-router-dom";
import { tasksCRUDOperations, searchTask } from '../../Queries/queries';










export default class DashboardAssignedTaskList extends React.Component {


  constructor() {
    super();
    this.state = {
        dataList: '',
        showModal: 'none',
        TASKID: '',
    };

};


  async deleteTasks() {
    var result = '', errorMessage = '', errors = [];
    try {
        //   console.log('result1');
        result = await execGql('mutation', tasksCRUDOperations, this.setDeleteParams())

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
        this.setState({ showModal: 'none', })
        this.componentDidMount()
    }

};

setDeleteParams() {
    var parameters = {
        "transaction": "LOGICAL_DELETE",
        "tasks": [
            {
                "CLNT": "1002",
                "LANG": "EN",
                "TASKID": this.state.TASKID
            }
        ]
    }
    return parameters

};


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
            data={this.props.assignedtasklistData}
            columns={[

              {
                Header: "Date",
                accessor: "DUEDATE",
                width: 85,
                Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
              },

              {
                Header: "Subject",
                accessor: "SUBJECT",
              },
              {
                Header: "Assign To",
                accessor: "TASKFOR",
              },
              {
                Header: "Assign By",
                accessor: "TASKOWNER",
              },

              {
                Header: "Priority",
                accessor: "PRIORITY",
                width: 60,
              },
              {
                Header: 'Action',
                accessor: 'dataList',
                width: 90,
                style: {
                  cursor: 'pointer',
                  paddingTop:4,
                  paddingBottom:4
                },
                Cell: row => (
                  <div >
                    {/*----button Edit---------- */}
                    {/* <div id="griddeletebutton" className="ui blue button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex' })}>
                      <i id="gridicon" className="alternate edit icon"></i>
                    </div> */}


                    <Link to={{ pathname: '/addtask', state: { data: row.original.TASKID } }}>
                          <div id="gridbutton" className="ui blue button" tabIndex="0" >
                              <i id="gridicon" className="edit icon"></i>
                          </div>
                      </Link >



                    <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex',TASKID :row.original.TASKID })}>
                      <i id="gridicon" className="alternate trash icon"></i>
                    </div>




















                  </div>)
              },
            ]}
            defaultPageSize={5}
            className="-highlight"
          />


<div className="modal" style={{ display: this.state.showModal }}>
                            <div className="modal-content">

                                <div className="ui icon header " style={{ color: "white", textAlign: "Center" }}>
                                    <i className="archive icon"></i>
                                    Delete Task
               </div>


                                <p style={{ color: "white" }}> 	Are you sure you want to delete this Task ?</p>
                                <div style={{ textAlign: "right" }}>
                                    <div className="ui red basic cancel inverted button" onClick={() => this.setState({ showModal: 'none', })} >
                                        <i className="remove icon"></i>
                                        No
            </div>
                                    <div className="ui green ok inverted button" onClick={() => this.deleteTasks()} >
                                        <i className="checkmark icon"></i>
                                        Yes
              </div>
                                </div>
                            </div>
                        </div>








        </div>

      );
 
  }
}


