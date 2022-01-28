import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from "../apolloClient/apolloClient";
import { UpdateUserAuthQuery, SearchUserAuthQuery } from '../Queries/queries';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { cloneDeep } from 'lodash';

export default class User_Authorization extends Component {
    constructor() {
        super();
        this.state = {
            dataList: '',
            userID: '',
            phone: '',
            email: '',
            rowUserID: '',
            showModal: 'none',
            showSearchComp: false
        };
    }

    componentDidMount() {
        this.searchUser()
    };

    /*-----------------------search user--------------------*/
    async searchUser() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', SearchUserAuthQuery, this.setSearchParams())
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
            this.setState({ dataList: result.data.searchAuthorizations })
        }
    }

    /*-----------------------set SearchUserAuthQuery variables--------------------*/
    setSearchParams() {
        var parameterValue = {
            "CLNT": "1002",
            "LANG": "EN",
            "USRID": this.props.userID
        }
        return parameterValue;
    }

    /*-----------------------update user auth--------------------*/
    async updateUserAuthorizations(dataList) {
        var result = '', errorMessage = '', errors = [], GrpIdArr = [];

        for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].GDESC == "true") {
                GrpIdArr.push(dataList[i].GRPID)
            }
        }

        try {
            result = await execGql('mutation', UpdateUserAuthQuery, this.setUpdateAuthParams(GrpIdArr))
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
            this.showMsg()
        }
    }

    /*-----------------------set UpdateUserAuthQuery variables--------------------*/
    setUpdateAuthParams(GrpIdArr) {
        var parameterValue = {
            "CLNT": "1002",
            "LANG": "EN",
            "USRID": this.props.userID,
            "GRPID": GrpIdArr
        }
        return parameterValue;
    }

    /*----------------------handle status change-------------------*/
    async  handleStatusChange(e, cellInfo) {
        try {
            const dataList = cloneDeep([...this.state.dataList]);
            var checked = e.target.checked.toString()
            dataList[cellInfo.index][cellInfo.column.id] = checked;
            await this.setState({ dataList });
        } catch (error) {
            console.log(error);
        }
    }

    /*-----------------------to show msg after auth is updated--------------------*/
    showMsg() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    /*-----------------------navigate to user list--------------------*/
    navigateToUserList() {
        return this.props.history.push('/users')
    };

    render() {
        const { dataList } = this.state
        if (dataList) {
            return (
                <div>
                    <div className="ui one column grid">

                        <div className="three column row">
                            <div className="one wide computer one wide tablet one wide mobile column">
                            </div>
                            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                                <div id="cus_segment" className="ui segment">
                                    <div className="ui form">
                                        {/* <ContactList data={this.state.dataList} function={this.searchContact()}/> */}
                                        <ReactTable
                                            data={dataList}
                                            columns={[
                                                {
                                                    Header: "Action",
                                                    accessor: 'GDESC',
                                                    width: 50,
                                                    style: {
                                                        cursor: 'pointer',
                                                        paddingTop: 4,
                                                        paddingBottom: 4
                                                    },
                                                    Cell: props => (
                                                        <div>
                                                            <input type="checkbox" defaultChecked={props.value == 'true' ? true : false} onChange={(e) => this.handleStatusChange(e, props)} />
                                                        </div>)
                                                },
                                                {
                                                    Header: "Group ID",
                                                    accessor: "GRPID",
                                                    width: 100,

                                                },
                                                {
                                                    Header: "Group Name",
                                                    accessor: "GRPNM",
                                                },
                                            ]}
                                            showPagination={false}
                                            defaultPageSize={dataList.length}
                                            className="-highlight"

                                        />

                                        <div className="row" style={{ marginTop: 20 }}>
                                            <div className="five wide column">
                                                <button className="ui primary button" type="submit" onClick={() => this.updateUserAuthorizations(dataList)}>Save</button>
                                                <button className="ui  button" type="submit" onClick={() => this.navigateToUserList()} >Cancel</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* -- popup after changing status-- */}
                                    <div id="snackbar">  <i className="info circle icon"></i> Record Updated successfully.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="ui icon header">
                    <div className="ui active loader"></div>
                </div>
            )
        }
    }
}