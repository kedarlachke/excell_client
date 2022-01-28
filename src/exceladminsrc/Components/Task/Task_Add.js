import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { execGql } from '../apolloClient/apolloClient';
import { ddlTask, tasksCRUDOperations, searchTaskDetails, } from '../Queries/queries';
//import FeatchLeadsQuery from '../Queries/LeadDetails';

var loggedInUser = "exuser";

var errorval = false
var DropdownTaskList = []
export default class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Subject: "",
            Details: "",
            StartDate: this.getformatDate(new Date().toISOString()),
            DueDate: this.getformatDate(new Date().toISOString()),
            Priority: "NORM",
            Status: "NEW",
            AssignTo: "",

            TaskOf: "",
            TaskOfId: "",

            tcode: 'createProject',
            errorSubject: "",
            errorDetails: "",
            errorStartDate: "",
            errorDueDate: "",
            errorPriority: "",
            errorStatus: "",
            errorAssignTo: "",
            DropdownTaskListArr: []


        }
    };
    async componentDidMount() {
        this.DropdownTask()
        console.log(this.props.location.state.taskof);
        console.log(this.props.location.state.taskofid);
        await this.setState({
            TaskOf: this.props.location.state.taskof,
            TaskOfId: this.props.location.state.taskofid

        })
        if (this.props.location.state) {
            if (this.props.location.state.TaskType == "MyTask") {
                await this.setState({
                    AssignTo: loggedInUser,
                    TaskOf: this.props.location.state.taskof,
                    TaskOfId: this.props.location.state.taskofid

                })
            }
            else if (this.props.location.state.TaskType == "AssignedTask") {
                await this.setState({
                    TaskOf: this.props.location.state.taskof,
                    TaskOfId: this.props.location.state.taskofid

                })
            }
            else {
                this.populateData()
            }
        }

        console.log(this.state.TaskOf);
        console.log(this.state.TaskOfId);
    };


    async populateData() {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            console.log(this.props.location.state.data);
            result = await execGql('query', searchTaskDetails, this.setSearchParams())
            console.log(result);
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
            console.log(new Date(this.formatDate(result.data.taskDetails[0].DUEDATE)).toLocaleDateString())
            this.setState({

                Subject: result.data.taskDetails[0].SUBJECT,
                Details: result.data.taskDetails[0].TASKDETAILS,
                StartDate: this.formatDate(result.data.taskDetails[0].STARTDATE),
                DueDate: this.formatDate(result.data.taskDetails[0].DUEDATE),
                //   DueDate:new Date(this.formatDate(result.data.taskDetails[0].DUEDATE)).toLocaleDateString(),
                Priority: result.data.taskDetails[0].PRIORITYID,
                Status: result.data.taskDetails[0].STATUSID,
                AssignTo: result.data.taskDetails[0].TASKFOR,
                TaskOf: result.data.taskDetails[0].TASKOF,
                TaskOfId: result.data.taskDetails[0].TASKOFID,
                tcode: 'updateProject',
                Dispalycomp: !this.state.Dispalycomp
            })


        }

    };

    setSearchParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "TASKID": this.props.location.state.data
        }
        return parameters

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

            DropdownTaskList = []
            DropdownTaskList.push({
                "TASK_PRIORITY": result.data.TASK_PRIORITY, "ASSIGN_TO": result.data.ASSIGN_TO,
                "TASKINV_STATUS": result.data.TASKINV_STATUS

            })
            console.log(result);
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

    async CreateTasks() {
        var result = '', errorMessage = '';
        try {
            // console.log( this.setUpdateParams());
            result = await execGql('mutation', tasksCRUDOperations, this.setCreateParams())
            // console.log(result);
        }
        catch (err) {
            // errors = err.errorsGql;
            errorMessage = err.errorMessageGql;

        }

        if (!result) {
            errorval = true
            console.log(errorMessage);
            try {
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    this.setState({
                        errorSubject: errorMessage[key].errorSUBJECT,
                        errorDetails: errorMessage[key].errorTASKDETAILS,
                        errorStartDate: errorMessage[key].errorSTARTDATE,
                        errorDueDate: errorMessage[key].errorDUEDATE,
                        errorPriority: errorMessage[key].errorPRIORITY,
                        errorStatus: errorMessage[key].errorSTATUS,
                        errorAssignTo: errorMessage[key].errorTASKFOR
                    });
                }

            }
            catch (error) {
                console.log(error);

            }

        }
        else {
            console.log(result);
            this.navigateToTaskList()

        }

    };


    setCreateParams() {
        var parameters = {
            "transaction": "CREATE",
            "tasks": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",

                    "SUBJECT": this.state.Subject,
                    "TASKDETAILS": this.state.Details,
                    "STARTDATE": this.formatDate1(this.state.StartDate),
                    "DUEDATE": this.formatDate1(this.state.DueDate),
                    "PRIORITYID": this.state.Priority,
                    "STATUSID": this.state.Status,
                    "TASKFOR": this.state.AssignTo,
                    "TASKOWNER": loggedInUser,
                    "TASKOF": this.state.TaskOf,
                    "TASKOFID": this.state.TaskOfId

                }
            ]
        }
        return parameters

    };

    async UpdateTasks() {
        var result = '', errorMessage = '', errors = [];
        try {
            console.log(this.setUpdateParams());
            result = await execGql('mutation', tasksCRUDOperations, this.setUpdateParams())
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
            this.navigateToTaskList()
        }

    };

    setUpdateParams() {
        var parameters = {
            "transaction": "UPDATE",
            "tasks": [
                {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "TASKID": this.props.location.state.data,
                    "SUBJECT": this.state.Subject,
                    "TASKDETAILS": this.state.Details,
                    "STARTDATE": this.formatDate1(this.state.StartDate),
                    "DUEDATE": this.formatDate1(this.state.DueDate),
                    "PRIORITYID": this.state.Priority,
                    "STATUSID": this.state.Status,
                    "TASKFOR": this.state.AssignTo,
                    "TASKOWNER": loggedInUser,
                    "TASKOF": this.state.TaskOf,
                    "TASKOFID": this.state.TaskOfId
                }
            ]
        }
        return parameters

    };

    // navigateToTaskList() {
    //     if (this.props.location.state.taskof == "Lead") {
    //         return this.props.history.push('/leads')
    //     }
    //     else if (this.props.location.state.taskof == "Case") {
    //         return this.props.history.push('/cases')
    //     }
    //     else
    //         return this.props.history.push('/tasks')
    // };

    navigateToTaskList() {

        if (this.props.location.state.taskof == "Lead") {
            return this.props.history.push('/leads')
        }
        else if (this.props.location.state.lead == "LEAD") {
            return this.props.history.push('/leads')
        }
        else if (this.props.location.state.taskof == "Case") {
            return this.props.history.push('/cases')
        }
        else if (this.props.location.state.lead == "CASE") {
            return this.props.history.push('/cases')
        }
        else
            return this.props.history.push('/tasks')
    };

    CRUD_operation() {
        if (this.state.tcode == 'createProject') {
            this.CreateTasks()
        }
        else if (this.state.tcode == 'updateProject') {
            this.UpdateTasks()

        }
    };

    onClear() {
        errorval = false;
        this.setState({
            Subject: "",
            Details: "",
            StartDate: "",
            DueDate: "",
            Priority: "",
            Status: "",
            AssignTo: "",
            tcode: 'createProject',
            errorSubject: "",
            errorDetails: "",
            errorStartDate: "",
            errorDueDate: "",
            errorPriority: "",
            errorStatus: "",
            errorAssignTo: ""
        });
    };

    //..............Date Formate Convertion(mm-dd-yyyy)..........
    getformatDate(date) {
        var date_format = date.slice(0, 10)
        return date_format
    }

    //..............Date Formate Convertion..........
    formatDate(date) {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)
        // "2018-06-03"
        var date_format = year + '-' + month + '-' + day
        //  var date_format = month + '/' + day + '/' + year
        return date_format
    };

    //..............Date Formate Convertion..........
    formatDate1(date) {
        var year = date.slice(0, 4)
        var month = date.slice(5, 7)
        var day = date.slice(8, 10)

        var date_format = year + month + day
        return date_format
    };
    render() {
        return (

            <div className="ui one column grid">

                <div className=" row">

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                    <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                        <h1 id="title_header">TASK - ADD NEW</h1>
                    </div>

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                </div>

                <div className=" row">

                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>

                    <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">

                        <div className="ui segment">

                            <div className="ui form">

                                <div className="ui  stackable grid">

                                    <div className=" row" style={{ display: 'none' }}>
                                        <div className="five wide column">
                                            <div className="field">
                                                <label >TaskOf</label>
                                                <input type="text" name="TaskOf" placeholder="TaskOf" value={this.state.TaskOf} onChange={e => this.setState({ TaskOf: e.target.value })} />
                                            </div>

                                        </div>
                                        <div className="five wide column">
                                            <div className="field">
                                                <label >TaskOf Id</label>
                                                <input type="text" name="TaskOfId" placeholder="TaskOfId" value={this.state.TaskOfId} onChange={e => this.setState({ TaskOfId: e.target.value })} />
                                            </div>

                                        </div>
                                    </div>

                                    <div className=" row">
                                        <div className="ten wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorSubject ? 'brown' : null }}>Subject</label>
                                                <input style={{ borderColor: this.state.errorSubject ? 'brown' : null, backgroundColor: this.state.errorSubject ? '#f3ece7' : null }} type="text" name="subject" placeholder="Subject" value={this.state.Subject} onChange={e => this.setState({ Subject: e.target.value })} />
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorSubject}</span> : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" row">
                                        <div className="ten wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorDetails ? 'brown' : null }}>Details</label>
                                                <textarea style={{ borderColor: this.state.errorDetails ? 'brown' : null, backgroundColor: this.state.errorDetails ? '#f3ece7' : null }} type="text" name="details" placeholder="Details" value={this.state.Details} onChange={e => this.setState({ Details: e.target.value })} />
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorDetails}</span> : null}
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" row">

                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorStartDate ? 'brown' : null }}>Start Date</label>
                                                <div className="ui " id="">
                                                    <div className="ui input right icon">
                                                        <i className="calendar icon"></i>
                                                        <input style={{ borderColor: this.state.errorStartDate ? 'brown' : null, backgroundColor: this.state.errorStartDate ? '#f3ece7' : null }} type="date" name="SatrtDate" placeholder="Satrt Date" value={this.state.StartDate} onChange={e => this.setState({ StartDate: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorStartDate}</span> : null}
                                            </div>
                                        </div>

                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorDueDate ? 'brown' : null }}>Due Date</label>
                                                <div className="ui " id="">
                                                    <div className="ui input right icon">
                                                        <i className="calendar icon"></i>
                                                        <input style={{ borderColor: this.state.errorDueDate ? 'brown' : null, backgroundColor: this.state.errorDueDate ? '#f3ece7' : null }} type="date" name="DueDate" placeholder="Due Date" value={this.state.DueDate} onChange={e => this.setState({ DueDate: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorDueDate}</span> : null}
                                            </div>
                                        </div>

                                    </div>

                                    <div className=" row">

                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorPriority ? 'brown' : null }}>Priority</label>
                                                <select style={{ borderColor: this.state.errorPriority ? 'brown' : null, backgroundColor: this.state.errorPriority ? '#f3ece7' : null }} className="" value={this.state.Priority} onChange={e => this.setState({ Priority: e.target.value })}>
                                                    <option>Select</option>
                                                    {this.state.DropdownTaskListArr.map((data) => data.TASK_PRIORITY.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                </select>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorPriority}</span> : null}
                                            </div>
                                        </div>

                                        <div className="five wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorStatus ? 'brown' : null }}>Status</label>
                                                <select style={{ borderColor: this.state.errorStatus ? 'brown' : null, backgroundColor: this.state.errorStatus ? '#f3ece7' : null }} className="" value={this.state.Status} onChange={e => this.setState({ Status: e.target.value })}>
                                                    <option>select</option>
                                                    {this.state.DropdownTaskListArr.map((data) => data.TASKINV_STATUS.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                </select>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorStatus}</span> : null}
                                            </div>
                                        </div>

                                    </div>

                                    <div className=" row">

                                        <div className="ten wide column">
                                            <div className="field">
                                                <label style={{ color: this.state.errorAssignTo ? 'brown' : null }}>Assign To</label>
                                                <select style={{ borderColor: this.state.errorAssignTo ? 'brown' : null, backgroundColor: this.state.errorAssignTo ? '#f3ece7' : null }} className="" value={this.state.AssignTo} onChange={e => this.setState({ AssignTo: e.target.value })}>
                                                    <option>select</option>
                                                    {this.state.DropdownTaskListArr.map((data) => data.ASSIGN_TO.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                                                </select>
                                            </div>
                                            <div className="field">
                                                {errorval ? <span id="errorspan">{this.state.errorAssignTo}</span> : null}
                                            </div>
                                        </div>

                                    </div>

                                    <div className=" row">
                                        <div className="ten wide column">
                                            <button className="ui primary button" type="submit" onClick={() => this.CRUD_operation()}>Save</button>
                                            <button className="ui  button" type="submit" onClick={() => this.onClear()}>Clear</button>
                                            <button className="ui  button" type="submit" onClick={() => this.navigateToTaskList()}>Cancel</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                </div>
                <div className="ui message">
                    {/* <pre>
                        {JSON.stringify({
                            "Subject": this.state.Subject,
                            "Details": this.state.Details,
                            "StartDate": this.state.StartDate,
                            "DueDate": this.state.DueDate,
                            "Priority": this.state.Priority,
                            "Status": this.state.Status,
                            "AssignTo": this.state.AssignTo,


                        })}
                    </pre> */}
                </div>
            </div>

        );
    }
}