import React from "react";
import DashBoardAssignedTaskList from './DashboardAssignedTasksList/DashboardAssignedTasksList'
import DashBoardMyTaskList from './DashboardMyTaskList/DashboardMyTaskList'
import DashBoardLeadList from './DashboardLeadsList/DashboardLeadsList'
import DashBoardCaseList from './DashboardCasesList/DashboardCaseList'

import { execGql,pCLNT,pLANG } from "../apolloClient/apolloClient";
import {DashboardListQuery} from '../Queries/queries'
import {
  ActionToDispatch,
  ActionToRedirect,
 handleSignoutUsername,
  checkCurrentUsername
} from '../../../actions';


import { connect } from 'react-redux';



export  class DashboardHomePage extends React.Component {

  constructor() {
    super();
    this.state = {
      dataList: '',

    };

  }
  async componentDidMount() {
    var result = '', errorMessage = '', errors = [];
    try {
      //   console.log('result1');
      result = await execGql('query', DashboardListQuery, this.setSearchParams())

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

  }

  setSearchParams() {
    var parameters = {
      "clnt": "1002",
      "lang": "EN",
      "isAdmin": true,
      "TASKFOR": "exuser",
      "isDashboard": true
    }
    return parameters
  }


  render() {

    console.log('DashboardHomePage start'); 

    console.log(this.props.authprocess); 

    console.log('DashboardHomePage end'); 

    if(this.props.authuser.username != 'exuser' )
    {
    console.log('customerheader rutruning blank');
    this.props.ActionToRedirect('/customersignin');
     
    }

 

    const { dataList } = this.state
    if (dataList) {
      return (

        <div>
          <div className="ui one column grid" style={{ marginLeft: 0 }}>

            <div className="three column row">
              <div className="one wide computer one wide tablet one wide mobile column">
              </div>
              <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                <h1 id="title_header" className="ui header" style={{ marginBottom: "0px" }}>DASHBOARD</h1>
                <div >
                  Welcome back,Last Login on Jun 13,2018 10:48
              </div>
              </div>

              <div className="one wide computer one wide tablet one wide mobile column">
              </div>
            </div>


            <div className="three column row" >
              <div className="one wide computer one wide tablet one wide mobile column">
              </div>




              <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                <div className="ui two column stackable grid">
                  <div className="row">
                    <div className="eight wide computer fourteen wide tablet fourteen wide mobile column">
                      <div className="ui segment" >
                        <h4 className="ui header" style={{ margin: "10px" }}>Task Assigned</h4>
                        <form className="gridForm">

                          <div >
                            <DashBoardAssignedTaskList assignedtasklistData={dataList.data.searchDashboardTasks} />
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="eight wide computer fourteen wide tablet fourteen wide mobile column">
                      <div className="ui segment" >
                        <h4 className="ui header" style={{ margin: "10px" }}>My Task</h4>
                        <form className="gridForm">
                          <div >
                            <DashBoardMyTaskList mytasklistdata={dataList.data.searchLoggedUserTasks} />
                          </div>
                        </form>
                      </div>
                    </div>

                  </div>
                </div>
              </div>




              <div className="one wide computer one wide tablet one wide mobile column">
              </div>

            </div>
            <div className="one wide computer one wide tablet one wide mobile column">
            </div>
            <div className="row " >
              <div className="one wide computer one wide tablet one wide mobile column">
              </div>

              <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                <div className="ui two column stackable grid">
                  <div className="row">
                    <div className="eight wide computer fourteen wide tablet fourteen wide mobile column">
                      <div className="ui segment">
                        <h4 className="ui header" style={{ margin: "10px" }}>New Leads</h4>
                        <form className="gridForm">
                          <div>
                            <DashBoardLeadList leadlistdata={dataList.data.searchDashboardLeads} />
                          </div>
                        </form>
                      </div>
                    </div>

                    <div className="eight wide computer fourteen wide tablet fourteen wide mobile column">
                      <div className="ui segment" >
                        <h4 className="ui header" style={{ margin: "10px" }}>Cases</h4>
                        <form className="gridForm">
                          <div >
                            <DashBoardCaseList caselistdata={dataList.data.searchCases} />
                          </div>
                        </form>
                      </div>
                    </div>

                  </div>
                </div>
              </div>


              <div className="one wide computer one wide tablet one wide mobile column">
              </div>
            </div>
            <div className="one wide computer one wide tablet one wide mobile column">
            </div>
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



const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    authprocess: state.auth.authprocess,
    authuser: state.auth.authuser,
  };
};

export default connect(
  mapStateToProps,
  { ActionToDispatch,ActionToRedirect
   }
)(DashboardHomePage);

