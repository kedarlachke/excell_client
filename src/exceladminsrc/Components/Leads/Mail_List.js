import React from "react";
import { execGql } from "../apolloClient/apolloClient";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { SearchMailList, searchTask } from "../Queries/queries";
export default class MailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sentBy: "",
      FromDate: "2015-01-01",
      ToDate: this.getformatDate(new Date().toISOString()),
      loggedInUser: "exuser",
      showLoadingComp: "none"
    };
  }

  componentDidMount() {
    //    console.log("this.props.lead");
    //   console.log(this.props.lead);
    this.populateList();
  }

  async populateList() {
    console.log(searchTask);
    console.log(this.setSearchParams());
    this.setState({ showLoadingComp: "flex" });
    var result = "",
      errorMessage = "",
      errors = [];
    try {
      //  result = await execGql('query', searchTask, this.setSearchParams())
      result = await execGql("query", SearchMailList, this.setSearchParams());
    } catch (err) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
    }

    if (!result) {
      console.log(errors);
      console.log(errorMessage);
    } else {
      console.log(result);
      this.setState({ dataList: result, showLoadingComp: "none" });
    }
  }
  setSearchParams() {
    var parameters = {
      CLNT: "1002",
      LANG: "EN",
      MAILFOR: this.props.lead, //"Lead"
      MAILFORID: this.props.LeadId, //"600999",
      FROMDATE: this.formatDate1(this.state.FromDate),
      TODATE: this.formatDate1(this.state.ToDate),
      CUSER: this.state.sentBy
    };
    return parameters;
  }

  async clearscreen() {
    await this.setState({
      sentBy: "",
      FromDate: "2015-01-01",
      ToDate: this.getformatDate(new Date().toISOString())
    });
    this.populateList();
  }

  toggleSearchForm() {
    this.setState({ showSearchForm: !this.state.showSearchForm });
    this.clearscreen();
  }

  //..............Date Formate Convertion(yyyymmdd)..........
  formatDate1(date) {
    var year = date.slice(0, 4);
    var month = date.slice(5, 7);
    var day = date.slice(8, 10);

    var date_format = year + month + day;
    return date_format;
  }

  //..............Date Formate Convertion(mm/dd/yyyy)..........
  formatDate(date) {
    var year = date.slice(0, 4);
    var month = date.slice(4, 6);
    var day = date.slice(6, 8);

    var date_format = month + "/" + day + "/" + year;
    return date_format;
  }

  //..............Date Formate Convertion(mm-dd-yyyy)..........
  getformatDate(date) {
    var date_format = date.slice(0, 10);
    return date_format;
  }

  render() {
    const { dataList } = this.state;

    if (dataList) {
      return (
        <div>
          <div className="ui one column grid">
            <div className="three column row">
              <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                <h1> Sent Mail List</h1>

                <div className="icode">
                  <i
                    id="iconbar"
                    className="search icon"
                    onClick={() => this.toggleSearchForm()}
                  />
                </div>

                {this.state.showSearchForm ? (
                  <div className="field">
                    <div className="ui segment">
                      <i
                        id="closeicon"
                        className="window close outline icon"
                        onClick={() => this.toggleSearchForm()}
                      />
                      <div className="ui form">
                        <div className="ui three column stackable grid">
                          <div className="row">
                            <div className="five wide column">
                              <div className="field">
                                <label>Sent By</label>

                                <input
                                  type="text"
                                  name="subject"
                                  placeholder="Subject"
                                  value={this.state.sentBy}
                                  onChange={e =>
                                    this.setState({ sentBy: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="five wide column">
                              <div className="field">
                                <label>From Date</label>
                                <div className="ui " id="">
                                  <div className="ui input right icon">
                                    <i className="calendar icon" />
                                    <input
                                      type="date"
                                      name="DueDate"
                                      placeholder="Due Date"
                                      value={this.state.FromDate}
                                      onChange={e =>
                                        this.setState({
                                          FromDate: e.target.value
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="five wide column">
                              <div className="field">
                                <label>To Date</label>
                                <div className="ui " id="">
                                  <div className="ui input right icon">
                                    <i className="calendar icon" />
                                    <input
                                      type="date"
                                      name="DueDate"
                                      placeholder="Due Date"
                                      value={this.state.ToDate}
                                      onChange={e =>
                                        this.setState({
                                          ToDate: e.target.value
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="ten wide column">
                              <button
                                className="ui primary button"
                                type="submit"
                                onClick={() => this.populateList()}
                              >
                                Search
                              </button>
                              <button
                                className="ui  button"
                                type="submit"
                                onClick={() => this.clearscreen()}
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="three column row">
              <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                <div id="cus_segment" className="ui segment">
                  <div className="ui form">
                    <ReactTable
                      data={dataList.data.searchMailsList}
                      columns={[
                        {
                          Header: "Mailed Date",
                          accessor: "CDATE",
                          width: 90,
                          Cell: props => {console.log(JSON.stringify(props))
                            
                             return(
                            <span className="date">
                              {this.formatDate(props.value)}
                            </span>
                          )}
                        },
                        {
                          Header: "Subject",
                          accessor: "MAILSUB"
                        },
                        {
                          Header: "Body",
                          accessor: "MSGBODY",
                          Cell: props => (
                            <span >
                              <td dangerouslySetInnerHTML={{__html: props.value}} />
                            </span>
                          )
                        }
                      ]}
                      defaultPageSize={10}
                      className="-highlight"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* -- The loading Modal -- */}
            <div
              className="modal"
              style={{ display: this.state.showLoadingComp }}
            >
              <div className="modal-content">
                <div className="ui icon header">
                  <div className="ui active inverted loader"> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui icon header">
          <div className="ui active loader" />
        </div>
      );
    }
  }
}
