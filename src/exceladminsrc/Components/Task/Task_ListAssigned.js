import React from "react";
import { execGql } from "../apolloClient/apolloClient";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { tasksCRUDOperations, searchTask, ddlTask } from '../Queries/queries';
import { exportToExcel } from '../commonfunctions/commonfunctions'

var DropdownTaskList = [];
export default class TaskList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            Subject: '',
            Details: '',
            StartDate: '',
            DueDate: '',
            Priority: '',
            AssignTo: '',
            Status: '',

            FromDueDate: '2001-01-01',
            ToDueDate: "",
            TaskOf: this.props.lead == "LEAD" ? 'Lead' : this.props.lead == "CASE" ? "Case" : '',
            TaskOfID: '',

            dataList: '',
            showModal: 'none',
            TASKID: '',

            loggedInUser: "exuser",
            showLoadingComp: 'none',
            DropdownTaskListArr: [],
            activeClass: {
                CANL: true,
                CMPL: true,
                INPR: true,
                NEW: true,
                PEND: true
            },
            counts: {
                CANL: 0,
                CMPL: 0,
                INPR: 0,
                NEW: 0,
                PEND: 0
            }
        };

    };

    componentDidMount() {
        this.DropdownTask();
        this.populateList()
    };

    async DropdownTask() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', ddlTask, this.setDropdownParams())
            //console.log(result);
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
            DropdownTaskList = []
            DropdownTaskList.push({
                "TASK_PRIORITY": result.data.TASK_PRIORITY, "ASSIGN_TO": result.data.ASSIGN_TO,
                "TASKINV_STATUS": result.data.TASKINV_STATUS, "TASK_OF": result.data.TASK_OF

            })
            //console.log(result);
            this.setState({ DropdownTaskListArr: DropdownTaskList })

        }

    };

    setDropdownParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "STATUS_FOR": "TASK"
        }
        return parameters

    };

    async populateList() {

        const statusbtn = this.state.Status;
        console.log(this.state.activeClass);

        let newJson = {}

        for (const [key, value] of Object.entries(this.state.activeClass)) {
            if (key === statusbtn)
                newJson = { ...newJson, [key]: !value }
            else
                newJson = { ...newJson, [key]: true }
        }

        this.setState({ activeClass: newJson })
        this.setState({ showLoadingComp: 'flex', })
        var result = '', errorMessage = '', errors = [];
        try {
            console.log('result1');
            result = await execGql('query', searchTask, this.setSearchParams())
            let CountList = result.data.searchTasks.reduce((init, next) => {
                init[next.STATUSID] = (init[next.STATUSID] || 0) + 1
                return init
            }, {})
            this.setState({ counts: CountList })
            console.log(CountList);

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

            if (this.state.Status) {
                let result001 = result.data.searchTasks.filter(it => it.STATUSID === this.state.Status)
                let data = { searchTasks: result001 }
                result = { ...result, data }

            }
            this.setState({ dataList: result })

            this.setState({ showLoadingComp: 'none', })
        }

    };
    setSearchParams() {
        let dudate=this.state.ToDueDate?this.formatDate1(this.state.ToDueDate):'99991231'
        var parameters = {

            "CLNT": "1002",
            "LANG": "EN",
            "CUSER": "%%",
            "SUBJECT": "%" + this.state.Subject + "%",
            "TASKFOR": this.state.AssignTo,
            "PRIORITYID": this.state.Priority,
            "FROMDATE": this.formatDate1(this.state.FromDueDate),
            "TODATE": dudate,
            "isAdmin": true,
            "STATUS": "",
            "TASKOF": this.state.TaskOf,
            "TASKOFID": this.props.LeadId ? this.props.LeadId : this.state.TaskOfID,
            // "STATUS": this.state.Status
        }
        return parameters

    };


    async  clearscreen() {
        await this.setState({

            Subject: '',
            Priority: '',
            AssignTo: '',
            Status: '',
            TaskOf: '',
            TaskOfID: '',
            FromDueDate: '2001-01-01',
            ToDueDate: ""
        })
        this.populateList()
    }





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

    //..............Date Formate Convertion(yyyymmdd)..........
    formatDate1(date) {
        var year = date.slice(0, 4)
        var month = date.slice(5, 7)
        var day = date.slice(8, 10)

        var date_format = year + month + day
        return date_format
    };

    //..............Date Formate Convertion(mm/dd/yyyy)..........
    formatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)

        var date_format = month + '/' + day + '/' + year
        return date_format
    };


    //..............Date Formate Convertion(mm-dd-yyyy)..........
    getformatDate(date) {
        var date_format = date.slice(0, 10)
        return date_format
    }


    /*-----------------------download assignedtask excel report--------------------*/
    exportAssignedTaskExcel() {
        let dudate=this.state.ToDueDate?this.formatDate1(this.state.ToDueDate):'99991231'
        let ParamArray = ["1002",
            "EN",
            "%" + this.state.Status + "%",
            "%" + this.state.Subject + "%",
            "%%",//loggedInuser
            "%" + this.state.Priority + "%",
            this.formatDate1(this.state.FromDueDate),
            dudate,
            "%" + this.state.TaskOf + "%",
            "%" + this.state.TaskOfID + "%"
        ]

        var parameters = {
            "ReportType": ["ADMIN_TASKS"],
            "ParamArray": [ParamArray],
            "ReportName": "AssignedTasks"
        }

        let uri = exportToExcel(parameters);
        return uri;
    }

    render() {
        const { dataList } = this.state

        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">
                        <div className="three column row">

                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <h1  >  {this.props.lead == "LEAD" ? 'Lead Task' : this.props.lead == "CASE" ? "Case Task" : 'ASSIGNED TASK(Assigned By Me)'}</h1>

                                <div className="icode" >
                                    {this.props.lead == "LEAD" || "CASE" ? '' : <Link to={{ pathname: '/addtask', state: { TaskType: "AssignedTask", taskof: "General", taskofid: "General" } }} style={{ color: '#151515' }}>  <i id="iconbar" className="plus icon"></i></Link>}
                                    <a href={this.exportAssignedTaskExcel()} style={{ color: '#151515' }}> <i id="iconbar" className="arrow down icon"></i></a>
                                    <i id="iconbar" className="search icon" onClick={() => this.setState({ showSearchForm: !this.state.showSearchForm })}></i>
                                    {/* <i id="iconbar" className="search icon"></i> */}
                                </div>

                                {this.state.showSearchForm ? <div className="field">
                                    <div className="ui segment">
                                        <i id="closeicon" className="window close outline icon" onClick={() => this.setState({ showSearchForm: !this.state.showSearchForm })}></i>
                                        <div className="ui form">
                                            <div className="ui three column stackable grid">

                                                <div className="row">
                                                    <div className="ten wide column">
                                                        <div className="field">
                                                            <label>Subject</label>

                                                            <input type="text" name="subject" placeholder="Subject"
                                                                value={this.state.Subject} onChange={e => this.setState({ Subject: e.target.value })} />

                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="row">
                                                    <div className="ten wide column">
                                                        <div className="field">
                                                            <label>Details</label>
                                                            <textarea type="text" name="details" placeholder="Details"
                                                                value={this.state.Details} onChange={e => this.setState({ Details: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <div className="row">
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label>From Due Date</label>
                                                            <div className="ui " id="">
                                                                <div className="ui input right icon">
                                                                    <i className="calendar icon"></i>
                                                                    <input type="date" name="DueDate" placeholder="Due Date" value={this.state.FromDueDate} onChange={e => this.setState({ FromDueDate: e.target.value })} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label>To Due Date</label>
                                                            <div className="ui " id="">
                                                                <div className="ui input right icon">
                                                                    <i className="calendar icon"></i>
                                                                    <input type="date" name="DueDate" placeholder="Due Date" value={this.state.ToDueDate} onChange={e => this.setState({ ToDueDate: e.target.value })} />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label>Priority</label>

                                                            <select className="" value={this.state.Priority} onChange={e => this.setState({ Priority: e.target.value })}>
                                                                <option value="">Select</option>
                                                                {this.state.DropdownTaskListArr.map((data) => data.TASK_PRIORITY.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}

                                                            </select>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div className=" row">
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label>Status</label>

                                                            <select className="" value={this.state.Status} onChange={e => this.setState({ Status: e.target.value })}>
                                                                <option value="">select</option>
                                                                {this.state.DropdownTaskListArr.map((data) => data.TASKINV_STATUS.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}

                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label>Assign To</label>

                                                            <select className="" value={this.state.AssignTo} onChange={e => this.setState({ AssignTo: e.target.value })}>
                                                                <option value="">select</option>
                                                                {this.state.DropdownTaskListArr.map((data) => data.ASSIGN_TO.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}

                                                            </select>

                                                        </div>
                                                    </div>

                                                </div>

                                                <div className=" row">
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label>Task of</label>
                                                            <select className="" value={this.state.TaskOf} onChange={e => this.setState({ TaskOf: e.target.value })}>
                                                                <option value="">Select</option>
                                                                {this.state.DropdownTaskListArr.map((data) => data.TASK_OF.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="five wide column">
                                                        <div className="field">
                                                            <label>Task of ID</label>
                                                            <input type="text" name="TaskOfID" placeholder="Task Of ID"
                                                                value={this.state.TaskOfID} onChange={e => this.setState({ TaskOfID: e.target.value })} />
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="row">
                                                    <div className="ten wide column">
                                                        <button className="ui primary button" type="submit" onClick={() => this.populateList()}>Search</button>
                                                        <button className="ui  button" type="submit" onClick={() => this.clearscreen()} >Clear</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div> : null}

                            </div>

                        </div>
                        <div className="three column row">

                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">

                                <div className="icode" >
                                    <Link to={'/addtask'} style={{ color: '#151515' }}>  <i id="iconbar" className="plus icon"></i></Link>
                                    <i id="iconbar" className="arrow down icon"></i>
                                    {/* <i id="iconbar" className="search icon"></i> */}
                                </div>

                            </div>

                        </div>
                        <div className="three column row">

                            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                                <div id="cus_segment" className="ui segment">
                                    <div className="ui form">
                                        <div className="row">
                                            <div className="ten wide column">
                                                <button className={this.state.activeClass.NEW ? "ui blue button" : "ui violet button"} ref="NEW" type="submit" onClick={async () => { await this.setState({ Status: "NEW" }); this.populateList() }}>New ({this.state.counts.NEW || 0}) </button>
                                                <button className={this.state.activeClass.INPR ? "ui blue button" : "ui violet button"} ref="INPR" type="submit" onClick={async () => { await this.setState({ Status: "INPR" }); this.populateList() }}>In Progress({this.state.counts.INPR || 0})</button>
                                                <button className={this.state.activeClass.CMPL ? "ui blue button" : "ui violet button"} ref="CMPL" type="submit" onClick={async () => { await this.setState({ Status: "CMPL" }); this.populateList() }}>Completed({this.state.counts.CMPL || 0})</button>
                                                <button className={this.state.activeClass.PEND ? "ui blue button" : "ui violet button"} ref="PEND" type="submit" onClick={async () => { await this.setState({ Status: "PEND" }); this.populateList() }}>Pending({this.state.counts.PEND || 0})</button>
                                                <button className={this.state.activeClass.CANL ? "ui blue button" : "ui violet button"} ref="CANL" type="submit" onClick={async () => { await this.setState({ Status: "CANL" }); this.populateList() }}>Cancelled({this.state.counts.CANL || 0})</button>
                                                {/* <button className="ui primary button" type="submit" onClick={async () => { await this.setState({ Status: "" });this.populateList() }}>All</button> */}
                                            </div>

                                        </div>
                                        <ReactTable
                                            data={dataList.data.searchTasks}
                                            columns={[
                                                {
                                                    Header: "Sr.No.",
                                                    accessor: "DISNAME",
                                                    width: 50,
                                                    Cell: props => <span>{props.index + 1}</span>
                                                },
                                                {
                                                    Header: "Assign Date",
                                                    accessor: "STARTDATE",
                                                    width: 90,
                                                    Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                                },
                                                {
                                                    Header: "Due Date",
                                                    accessor: "DUEDATE",
                                                    width: 90,
                                                    Cell: props => <span className='date'>{this.formatDate(props.value)}</span>
                                                },
                                                {
                                                    Header: "Task of",
                                                    accessor: "TASKOF",
                                                    width: 80,
                                                },
                                                {
                                                    Header: "Lead/Case Id",
                                                    accessor: "TASKOFID",
                                                    width: 100,
                                                },
                                                {
                                                    Header: "Subject",
                                                    accessor: "SUBJECT",
                                                    width: 300,
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
                                                    width: 90,
                                                },

                                                {
                                                    Header: "Status",
                                                    accessor: "STATUS",
                                                    width: 90,
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
                                                            {/*----button Edit---------- */}
                                                            <Link to={{ pathname: '/addtask', state: { data: row.original.TASKID, taskof: "General", taskofid: "General", lead: this.props.lead == "LEAD" ? 'LEAD' : this.props.lead == "CASE" ? "CASE" : '' } }} >
                                                                <div id="gridbutton" className="ui blue button" tabIndex="0" >
                                                                    <i id="gridicon" className="edit icon"></i>
                                                                </div>
                                                            </Link >
                                                            {/* ----delete Edit---------- */}
                                                            <div id="griddeletebutton" className="ui red button" tabIndex="0" onClick={() => this.setState({ showModal: 'flex', TASKID: row.original.TASKID })}>
                                                                <i id="gridicon" className="alternate trash icon"></i>
                                                            </div>

                                                        </div>)
                                                },
                                            ]}
                                            defaultPageSize={10}
                                            className="-highlight"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* -- The loading Modal -- */}
                        <div className="modal" style={{ display: this.state.showLoadingComp }} >
                            <div className="modal-content">
                                <div className="ui icon header">
                                    <div className="ui active inverted loader"> </div>

                                </div>
                            </div>
                        </div>
                        {/* -- The Modal -- */}
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