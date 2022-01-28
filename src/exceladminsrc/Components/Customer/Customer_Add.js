import React, { Component } from "react";
import {
  CustomerCRUDopsQuery,
  CustomerDetailsQuery,
  DDLAddCustomer
} from "../Queries/queries";
import { execGql } from "../apolloClient/apolloClient";

export default class Customer_Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tcode: "create",
      ccode: "",
      fName: "",
      lName: "",
      officeName: "",
      email: "",
      phoneNo: "",
      faxNo: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      bestMethodOfCntct: "",
      bestTimeToCall: "",
      stateDDL: [],
      bestMethodCntctDDL: [],
      bestTimeCallDDL: [],
      errorFirstname: "",
      errorLASTNM: "",
      errorOFFICENM: "",
      errorEmail: "",
      errorPhoneno: "",
      errorFAXNO: "",
      errorADDR: "",
      errorCITY: "",
      errorPINC: "",
      isError: false,
      showLoading: false,
      popupmsg: ""
    };
   // this.gotoNextTab = this.props.gotoNextTab.bind(this);
  }

  componentDidMount() {
    this.populateDDL();
    // if (this.props.state) {
    //   this.setState({ ccode: this.props.state });
    //   this.populateData(this.props.state);
    // }


    if (this.props.location.state) {
      this.setState({ ccode: this.props.location.state.data });
      this.populateData(this.props.location.state.data);
    }
  }

  /* ----navigate to customer list---------- */
  navigateToCustomerList() {
    return this.props.history.push("/customers");
  }

  /* ----populates DDL---------- */
  async populateDDL(ccode) {
    var result = "",
      errorMessage = "",
      errors = [];
    try {
      result = await execGql(
        "query",
        DDLAddCustomer,
        this.setDropdownParams(ccode)
      );
    } catch (err) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
    }

    if (!result) {
      console.log(errors);
      console.log(errorMessage);
    } else {
      console.log(result);
      this.setState({
        stateDDL: result.data.STATES,
        bestMethodCntctDDL: result.data.BEST_METHOD_OF_CONTACT,
        bestTimeCallDDL: result.data.BEST_TIME_TO_CALL
      });
    }
  }

  /* ----set DDLAddCustomer query variables---------- */
  setDropdownParams(ccode) {
    var parameters = {
      CLNT: "1002",
      LANG: "EN"
    };
    return parameters;
  }

  /* ----populates data when form loads---------- */
  async populateData(ccode) {
    this.setState({ showLoading: true });
    var result = "",
      errorMessage = "",
      errors = [];
    try {
      result = await execGql(
        "query",
        CustomerDetailsQuery,
        this.setPopulateDataParams(ccode)
      );
    } catch (err) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
    }

    if (!result) {
      console.log(errors);
      console.log(errorMessage);
    } else {
      console.log(result);
      if (result.data.customerDetails.length == 0) {
        this.setState({
          tcode: "create",
          showLoading: false
        });
      } else {
        this.setState({
          tcode: "update",
          fName: result.data.customerDetails[0].FIRSTNM,
          lName: result.data.customerDetails[0].LASTNM,
          officeName: result.data.customerDetails[0].OFFICENM,
          email: result.data.customerDetails[0].CMAIL,
          phoneNo: result.data.customerDetails[0].PHNO,
          faxNo: result.data.customerDetails[0].FAXNO,
          address: result.data.customerDetails[0].ADDR,
          city: result.data.customerDetails[0].CITY,
          state: result.data.customerDetails[0].STATE,
          zipCode: result.data.customerDetails[0].PINC,
          bestMethodOfCntct: result.data.customerDetails[0].MODOFCON,
          bestTimeToCall: result.data.customerDetails[0].BESTTMCAL,
          ccode: result.data.customerDetails[0].CCODE,
          showLoading: false
        });
      }
    }
  }

  /* ----set CustomerDetailsQuery variables---------- */
  setPopulateDataParams(ccode) {
    var parameters = {
      CLNT: "1002",
      LANG: "EN",
      CCODE: ccode,
      CMAIL: this.state.email
    };
    return parameters;
  }

  /* ----function to create and update customer---------- */
  async CustomerCRUDops(variables) {
    var result = "",
      errorMessage = "",
      errors = [];
    try {
      result = await execGql("mutation", CustomerCRUDopsQuery, variables);
    } catch (err) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
    }

    if (!result) {
      console.log(errors);
      console.log(errorMessage);

      errorMessage = JSON.parse(errorMessage);
      for (let key in errorMessage) {
        this.setState({
          isError: true,
          errorFirstname: errorMessage[key].errorFIRSTNM,
          errorLASTNM: errorMessage[key].errorLASTNM,
          errorOFFICENM: errorMessage[key].errorOFFICENM,
          errorEmail: errorMessage[key].errorCMAIL,
          errorPhoneno: errorMessage[key].errorPHNO,
          errorFAXNO: errorMessage[key].errorFAXNO,
          errorADDR: errorMessage[key].errorADDR,
          errorCITY: errorMessage[key].errorCITY,
          errorPINC: errorMessage[key].errorPINC
        });
      }
    } else {
      console.log(result);
      this.clearscreen();
      this.setState({
        popupmsg:
          this.state.tcode === "create"
            ? "Record saved successfully"
            : "Record updated successfully",
        ccode: result.data.CustomersAffected[0],
        showLoading: !this.state.showLoading
      });
      await this.populateData(result.data.CustomersAffected[0]);
      this.showMsg();
     // this.props.gotoNextTab(true, this.state.ccode);
    }
  }

  /* ----set create CustomerCRUDopsQuery variables---------- */
  setCreateCustomerParams() {
    var parameters = {
      transaction: "CREATE",
      customers: [
        {
          CLNT: "1002",
          LANG: "EN",
          FIRSTNM: this.state.fName,
          LASTNM: this.state.lName,
          OFFICENM: this.state.officeName,
          CMAIL: this.state.email,
          PHNO: this.state.phoneNo,
          FAXNO: this.state.faxNo,
          ADDR: this.state.address,
          CITY: this.state.city,
          STATE: this.state.state,
          PINC: this.state.zipCode,
          MODOFCON: this.state.bestMethodOfCntct,
          BESTTMCAL: this.state.bestTimeToCall
        }
      ]
    };
    return parameters;
  }

  /* ----set update CustomerCRUDopsQuery variables---------- */
  setUpdateParams() {
    var parameters = {
      transaction: "UPDATE",
      customers: [
        {
          CLNT: "1002",
          LANG: "EN",
          CCODE: this.state.ccode,
          FIRSTNM: this.state.fName,
          LASTNM: this.state.lName,
          OFFICENM: this.state.officeName,
          CMAIL: this.state.email,
          PHNO: this.state.phoneNo,
          FAXNO: this.state.faxNo,
          ADDR: this.state.address,
          CITY: this.state.city,
          STATE: this.state.state,
          PINC: this.state.zipCode,
          MODOFCON: this.state.bestMethodOfCntct,
          BESTTMCAL: this.state.bestTimeToCall
        }
      ]
    };
    return parameters;
  }

  /* ----crud operation---------- */
  CRUD_operation() {
    if (this.state.tcode == "create") {
      this.CustomerCRUDops(this.setCreateCustomerParams());
    } else if (this.state.tcode == "update") {
      this.CustomerCRUDops(this.setUpdateParams());
    }
  }

  /* ----clears the form fields---------- */
  clearscreen() {
    this.setState({
      fName: "",
      lName: "",
      officeName: "",
      email: "",
      phoneNo: "",
      faxNo: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      bestMethodOfCntct: "",
      bestTimeToCall: "",
      errorFirstname: "",
      errorLASTNM: "",
      errorOFFICENM: "",
      errorEmail: "",
      errorPhoneno: "",
      errorFAXNO: "",
      errorADDR: "",
      errorCITY: "",
      errorPINC: ""
    });
  }

  /*-----------------------clear btn fun--------------------*/
  // clearBtn()
  // {
  //     this.clearscreen()
  //     this.setState({ tcode: 'create'})
  // }

  /*-----------------------to show msg after create and update--------------------*/
  showMsg() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  render() {
    return (
      <div>
        <div className="ui one column grid">
          <div className="three column row">
            <div className="one wide computer one wide tablet one wide mobile column" />
            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column" />
            <div className="one wide computer one wide tablet one wide mobile column" />
          </div>
          <div className="three column row">
            <div className="one wide computer one wide tablet one wide mobile column" />
            <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
              <div className="ui segment">
                <div className="ui form">
                  <div className="ui three column stackable grid">
                    <div className="row">
                      <div className="five wide column">
                        <div className="field">
                          <label
                            style={{
                              color: this.state.errorFirstname ? "brown" : null
                            }}
                          >
                            First Name
                          </label>
                          <div className="ui right icon input">
                            <i className="user icon" />
                            <input
                              type="text"
                              name="firstname"
                              placeholder="First Name"
                              style={{
                                borderColor: this.state.errorFirstname
                                  ? "brown"
                                  : null,
                                backgroundColor: this.state.errorFirstname
                                  ? "#f3ece7"
                                  : null
                              }}
                              value={this.state.fName}
                              onChange={e =>
                                this.setState({ fName: e.target.value })
                              }
                            />
                          </div>
                          <div className="field">
                            {this.state.isError ? (
                              <span id="errorspan">
                                {this.state.errorFirstname}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className=" five wide column">
                        <div className="field">
                          <label
                            style={{
                              color: this.state.errorLASTNM ? "brown" : null
                            }}
                          >
                            Last Name
                          </label>
                          <div className="ui right icon input">
                            <i className="user icon" />
                            <input
                              type="text"
                              name="lastname"
                              placeholder="Last Name"
                              style={{
                                borderColor: this.state.errorLASTNM
                                  ? "brown"
                                  : null,
                                backgroundColor: this.state.errorLASTNM
                                  ? "#f3ece7"
                                  : null
                              }}
                              value={this.state.lName}
                              onChange={e =>
                                this.setState({ lName: e.target.value })
                              }
                            />
                          </div>
                          <div className="field">
                            {this.state.isError ? (
                              <span id="errorspan">
                                {this.state.errorLASTNM}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="three column row">
                      <div className="ten wide column">
                        <div className="field">
                          <label
                            style={{
                              color: this.state.errorOFFICENM ? "brown" : null
                            }}
                          >
                            Business Or Law Office
                          </label>
                          <div className="ui right icon input">
                            <i className="suitcase icon" />
                            <input
                              type="text"
                              name="business_office"
                              placeholder="Business/Office Name"
                              style={{
                                borderColor: this.state.errorOFFICENM
                                  ? "brown"
                                  : null,
                                backgroundColor: this.state.errorOFFICENM
                                  ? "#f3ece7"
                                  : null
                              }}
                              value={this.state.officeName}
                              onChange={e =>
                                this.setState({ officeName: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="field">
                          {this.state.isError ? (
                            <span id="errorspan">
                              {this.state.errorOFFICENM}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="three column row">
                      <div className="four wide column">
                        <div className="field">
                          <label
                            style={{
                              color: this.state.errorEmail ? "brown" : null
                            }}
                          >
                            E-mail
                          </label>
                          <div className="ui right icon input">
                            <i className="mail icon" />
                            <input
                              type="text"
                              name="email"
                              placeholder="E-mail"
                              style={{
                                borderColor: this.state.errorEmail
                                  ? "brown"
                                  : null,
                                backgroundColor: this.state.errorEmail
                                  ? "#f3ece7"
                                  : null
                              }}
                              value={this.state.email}
                              onChange={e =>
                                this.setState({ email: e.target.value })
                              }
                              onBlur={() => {
                                this.state.email ? this.populateData() : null;
                              }}
                            />
                          </div>
                          <div className="field">
                            {this.state.isError ? (
                              <span id="errorspan">
                                {this.state.errorEmail}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="three wide column">
                        <div className="field">
                          <label
                            style={{
                              color: this.state.errorPhoneno ? "brown" : null
                            }}
                          >
                            Phone Number
                          </label>
                          <div className="ui right icon input">
                            <i className="call icon" />
                            <input
                              type="text"
                              name="phoneno"
                              placeholder="Phone Number"
                              style={{
                                borderColor: this.state.errorPhoneno
                                  ? "brown"
                                  : null,
                                backgroundColor: this.state.errorPhoneno
                                  ? "#f3ece7"
                                  : null
                              }}
                              value={this.state.phoneNo}
                              onChange={e =>
                                this.setState({ phoneNo: e.target.value })
                              }
                            />
                          </div>
                          <div className="field">
                            {this.state.isError ? (
                              <span id="errorspan">
                                {this.state.errorPhoneno}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div className="three wide column">
                        <div className="field">
                          <label
                            style={{
                              color: this.state.errorFAXNO ? "brown" : null
                            }}
                          >
                            Fax Number
                          </label>
                          <div className="ui right icon input">
                            <i className="fax icon" />
                            <input
                              type="text"
                              name="faxno"
                              placeholder="Fax Number"
                              style={{
                                borderColor: this.state.errorFAXNO
                                  ? "brown"
                                  : null,
                                backgroundColor: this.state.errorFAXNO
                                  ? "#f3ece7"
                                  : null
                              }}
                              value={this.state.faxNo}
                              onChange={e =>
                                this.setState({ faxNo: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="field">
                          {this.state.isError ? (
                            <span id="errorspan">{this.state.errorFAXNO}</span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="three column row">
                      <div className="ten wide column">
                        <div className="field">
                          <label
                            style={{
                              color: this.state.errorADDR ? "brown" : null
                            }}
                          >
                            Address
                          </label>
                          <div className="ui right icon input">
                            <i className="home icon" />
                            <input
                              type="text"
                              name="address"
                              placeholder="Address"
                              style={{
                                borderColor: this.state.errorADDR
                                  ? "brown"
                                  : null,
                                backgroundColor: this.state.errorADDR
                                  ? "#f3ece7"
                                  : null
                              }}
                              value={this.state.address}
                              onChange={e =>
                                this.setState({ address: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="field">
                          {this.state.isError ? (
                            <span id="errorspan">{this.state.errorADDR}</span>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="three column row">
                      <div className="four wide column">
                        <div className="field">
                          <label
                            style={{
                              color: this.state.errorCITY ? "brown" : null
                            }}
                          >
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            placeholder="City"
                            style={{
                              borderColor: this.state.errorCITY
                                ? "brown"
                                : null,
                              backgroundColor: this.state.errorCITY
                                ? "#f3ece7"
                                : null
                            }}
                            value={this.state.city}
                            onChange={e =>
                              this.setState({ city: e.target.value })
                            }
                          />
                        </div>
                        <div className="field">
                          {this.state.isError ? (
                            <span id="errorspan">{this.state.errorCITY}</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="three wide column">
                        <div className="field">
                          <label>State</label>
                          <select
                            className=""
                            value={this.state.state}
                            onChange={e =>
                                this.setState({ state: e.target.value })
                              }
                            >
                              <option value="">Select</option>
                              {this.state.stateDDL.map((data, index) => (
                                <option key={index} value={data.CODE}>
                                  {data.DESC}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
  
                        <div className="three wide column">
                          <div className="field">
                            <label
                              style={{
                                color: this.state.errorPINC ? "brown" : null
                              }}
                            >
                              Zip Code
                            </label>
                            <input
                              type="text"
                              name="zipcode"
                              placeholder="Zip Code"
                              style={{
                                borderColor: this.state.errorPINC
                                  ? "brown"
                                  : null,
                                backgroundColor: this.state.errorPINC
                                  ? "#f3ece7"
                                  : null
                              }}
                              value={this.state.zipCode}
                              onChange={e =>
                                this.setState({ zipCode: e.target.value })
                              }
                            />
                          </div>
                          <div className="field">
                            {this.state.isError ? (
                              <span id="errorspan">{this.state.errorPINC}</span>
                            ) : null}
                          </div>
                        </div>
                      </div>
  
                      <div className="five wide column">
                        <div className="field">
                          <label>Best Method Of Contact</label>
                          <select
                            className=""
                            value={this.state.bestMethodOfCntct}
                            onChange={e =>
                              this.setState({ bestMethodOfCntct: e.target.value })
                            }
                          >
                            <option value="">Select</option>
                            {this.state.bestMethodCntctDDL.map((data, index) => (
                              <option key={index} value={data.CODE}>
                                {data.DESC}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
  
                      <div className="five wide column">
                        <div className="field">
                          <label>Best Time To Call</label>
                          <select
                            className=""
                            value={this.state.bestTimeToCall}
                            onChange={e =>
                              this.setState({ bestTimeToCall: e.target.value })
                            }
                          >
                            <option value="">Select</option>
                            {this.state.bestTimeCallDDL.map((data, index) => (
                              <option key={index} value={data.CODE}>
                                {data.DESC}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
  
                      <div className="three column row">
                        <div className="ten wide column">
                          <button
                            className="ui primary button"
                            type="submit"
                            onClick={() => this.CRUD_operation()}
                          >
                            Save
                          </button>
                          <button
                            className="ui  button"
                            type="clear"
                            onClick={() => this.clearscreen()}
                          >
                            Clear
                          </button>
                          <button
                            className="ui  button"
                            type="submit"
                            onClick={() => this.navigateToCustomerList()}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="one wide computer one wide tablet one wide mobile column" />
            </div>
            {/* -- popup to show msg-- */}
            <div id="snackbar">
              {" "}
              <i className="info circle icon" /> {this.state.popupmsg}
            </div>
  
            {/* -- loading Component- */}
            <div
              className="modal"
              style={{ display: this.state.showLoading ? "flex" : "none" }}
            >
              <div className="modal-content">
                <div className="ui icon header">
                  <div className="ui active inverted loader" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
                  