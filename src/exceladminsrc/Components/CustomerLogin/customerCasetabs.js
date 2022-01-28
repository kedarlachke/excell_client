import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CaseGeneric from "../Cases/CaseGeneric";
import ContractGeneric from "../Contract/ContractGeneric";
import CardAuthorization from "../Authorization/CardAuthorization";
import ECheckAuthorization from "../Authorization/eCheckAuthorization";
import OtherAuthorization from "../Authorization/OtherAuthorization";
import CaseDocument from "../File Upload/file_Upload";
import Signature from "../Signature/Signature";
import { execGql } from "../apolloClient/apolloClient";
import { AuthorizationDetails, contractDetails,Searchratecards } from "../Queries/queries";
export default class TabComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Status: "",
      SERVICETYP: "",
      Contract_Typ: "",
      Service_Typ: "",
      ContractType: "",
      Auth_Typ: "",
      Auth_Data: "",
      Case_Typ: "",
      Cust_Case_Typ: "",
      Rate: "",
      DispalyComp: true,
      DispalyTab: false,
      DispalyTaskTab: false,
      DisplayAuthBtn: "flex",
      showMailPopup: "none",
      tabIndex: 0,
      CLIENTID: "",
      Client_Name: "",
      CASEDT: "",
      PRIORITY: "",
      ASSIGNUSER: "",
      DropdownCasesListArr: [],
      OnClickAuthbtn: "",
      Case_Id: "",
      ContractSkip: false
    };

    this.gotoCaseType = this.gotoCaseType.bind(this);
    this.gotoPreviousTab = this.gotoPreviousTab.bind(this);
    this.gotoCustomContract = this.gotoCustomContract.bind(this);
    this.populateRateCards = this.populateRateCards.bind(this);
    this.getCaseText = this.getCaseText.bind(this);
    this.showMsg = this.showMsg.bind(this);
    this.closeMailPopup = this.closeMailPopup.bind(this);
  }

  //----------close Mail Popup
  closeMailPopup() {
    this.setState({ showMailPopup: "none" });
  }

  async componentDidMount() {
    console.log("Props in Customer Tabs");
    console.log(this.props.location.state);
    console.log("Props in Customer Tabs");
    if (this.props.location.state) {
      if (this.props.location.state.data) {
        await this.setState({
          SERVICETYP: this.props.location.state.data.SERVICETYP,
          CLIENTID: this.props.location.state.data.CLNTID,
          Contract_Typ: this.props.location.state.data.SERVICETYP,
          Case_Id: this.props.location.state.data.CIDSYS,
          Client_Name: this.props.location.state.data.FRSTNM,
          CASEDT: this.formatDate(this.props.location.state.data.CASEDT),
          PRIORITY: this.props.location.state.data.PRIORITY,
          ASSIGNUSER: this.props.location.state.data.ASSIGNUSER,
          Status: this.props.location.state.data.STATUS,
          //   DispalyComp: false,
          DispalyTaskTab: !this.state.DispalyTaskTab
        });

        // To Set Case Type and Contract Type
        if (this.state.SERVICETYP == "Asset Search") {
          await this.setState({
            SERVICETYP: "ASSET_SEARCH",
            DispalyComp: false
          });
        }
        if (this.state.SERVICETYP == "Child Custody") {
          await this.setState({
            SERVICETYP: "CHILD_CUSTODY",
            DispalyComp: false
          });
        }
        if (this.state.SERVICETYP == "Infidelity") {
          await this.setState({ SERVICETYP: "INFIDELITY", DispalyComp: false });
        }

        if (this.state.SERVICETYP == "Other Cases") {
          await this.setState({ SERVICETYP: "OTHER_CASE", DispalyComp: false });
        }

        if (this.state.SERVICETYP == "Locate People") {
          await this.setState({
            SERVICETYP: "LOCATE_PEOPLE",
            DispalyComp: false
          });
        }

        if (this.state.SERVICETYP == "Workers Comp") {
          await this.setState({
            SERVICETYP: "WORKERS_COMP",
            DispalyComp: false
          });
        }

        if (this.state.SERVICETYP == "Process Server") {
          await this.setState({
            SERVICETYP: "PROCESS_SERVER",
            DispalyComp: false
          });
        }

        // To Show Invoice Tab When Status was Submited

        if (this.state.Status == "Submited") {
          await this.setState({ DispalyTab: !this.state.DispalyTab });
        }

        if (this.state.Status == "Contract Pending") {
          await this.setState({ DispalyTab: !this.state.DispalyTab });
        }
        await this.getCaseText(this.state.SERVICETYP);
        await this.PopulateAuthData();
        this.PopulateContractData();
      } else {
        await this.setState({ CLIENTID: this.props.location.state.CLIENTID });
      }
    }
  }

  // To Populate Authorization Data and set Auth_Typ

  async PopulateAuthData() {
    var result = "",
      errorMessage = "",
      errors = [];
    try {
      result = await execGql("query", AuthorizationDetails, this.setParams());
      //console.log(result);
    } catch (err) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
    }

    if (!result) {
      console.log(errors);
      console.log(errorMessage);
    } else {
      console.log(result);

      if (result.data.Card.length != 0) {
        await this.setState({
          Auth_Typ: "Card",
          DisplayAuthBtn: "none",
          Auth_Data: result.data.Card
        });
      } else if (result.data.Cash.length != 0) {
        await this.setState({
          Auth_Typ: "Cash",
          DisplayAuthBtn: "none",
          Auth_Data: result.data.Cash
        });
      } else if (result.data.Check.length != 0) {
        await this.setState({
          Auth_Typ: "Check",
          DisplayAuthBtn: "none",
          Auth_Data: result.data.Check
        });
      }
    }
  }

  setParams() {
    var parameters = {
      CLNT: "1002",
      LANG: "EN",
      CIDSYS: this.state.Case_Id
    };
    return parameters;
  }

  // To Populate Contract Data and set Contract_Typ

  async PopulateContractData() {
    //  console.log('in edit')
    var result = "",
      errorMessage = "",
      errors = [];
    try {
      // console.log('result1');
      result = await execGql(
        "query",
        contractDetails,
        this.setContractParams()
      );
      // console.log(result);
    } catch (err) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
    }

    if (!result) {
      console.log(errors);
      console.log(errorMessage);
    } else {
      // console.log(result);
      if (result.data.contractDetails.length != 0) {
        await this.setState({
          Contract_Typ: result.data.contractDetails[0].SERVICETYPE
        });
      }

      if (
        this.state.Contract_Typ == "ASSET_SEARCH" ||
        this.state.Contract_Typ == "Asset Search"
      ) {
        await this.setState({ ContractType: "ASSET" });
      }

      if (
        this.state.Contract_Typ == "CHILD_CUSTODY" ||
        this.state.Contract_Typ == "Child Custody"
      ) {
        await this.setState({ ContractType: "INFIDELITY" });
      }

      if (
        this.state.Contract_Typ == "INFIDELITY" ||
        this.state.Contract_Typ == "Infidelity"
      ) {
        await this.setState({ ContractType: "INFIDELITY" });
      }

      if (
        this.state.Contract_Typ == "OTHER_CASE" ||
        this.state.Contract_Typ == "Other Cases"
      ) {
        await this.setState({ ContractType: "INFIDELITY" });
      }

      if (
        this.state.Contract_Typ == "PROCESS_SERVER" ||
        this.state.Contract_Typ == "Process Server"
      ) {
        await this.setState({ ContractType: "PROCESS" });
      }
      if (
        this.state.Contract_Typ == "LOCATE_PEOPLE" ||
        this.state.Contract_Typ == "Locate People"
      ) {
        await this.setState({ ContractType: "LOCATE" });
      }
      if (
        this.state.Contract_Typ == "WORKERS_COMP" ||
        this.state.Contract_Typ == "Workers Comp"
      ) {
        await this.setState({ ContractType: "INFIDELITY" });
      }

      if (this.state.Contract_Typ == "CUSTOM") {
        await this.setState({ ContractType: "CUSTOM" });
        // console.log(this.state.ContractType);
      }
    }
  }

  setContractParams() {
    var parameters = {
      CLNT: "1002",
      LANG: "EN",
      CIDSYS: this.state.Case_Id
    };
    return parameters;
  }

  // If User not save Client and Case Details,then move to previous tab
  async gotoPreviousTab(isNext) {
    await this.setState({ tabIndex: isNext });
  }

  //............for show msg Popup..........
  async showMsg(text, isColor) {
    //await this.setState({  });
    await this.setState({ showMsgText: text, DispalyBackColor: isColor });
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }

  // Go To Next Tab and set Client Id & Case Id & Client Name ,Case Type, Last Update
  async gotoCaseType(
    isNext,
    CID,
    CaseId,
    ClientName,
    CaseType,
    LastUpdate,
    isContractskip
  ) {
    isNext ? await this.setState({ tabIndex: this.state.tabIndex + 1 }) : null;
    CID ? await this.setState({ CLIENTID: CID }) : null;
    CaseId ? await this.setState({ Case_Id: CaseId }) : null;
    ClientName ? await this.setState({ Client_Name: ClientName }) : null;
    CaseType ? await this.getCaseText(CaseType) : null;
    isContractskip
      ? await this.setState({ ContractSkip: isContractskip })
      : null;
  }

  // To Open Custom Contract in Same Tab
  async gotoCustomContract(casetyp) {
    //    console.log(`caseid${casetyp}`);
    await this.setState({
      Case_Typ: this.state.Case_Typ ? casetyp : this.state.Case_Typ,
      SERVICETYP: this.state.SERVICETYP ? casetyp : this.state.SERVICETYP,
      ContractType: casetyp
    });

    console.log(this.state.Case_Typ);
  }

  //..............Date Formate Convertion..........
  formatDate(date) {
    var year = date.slice(0, 4);
    var month = date.slice(4, 6);
    var day = date.slice(6, 8);

    var date_format = month + "/" + day + "/" + year;
    return date_format;
  }

  // To Set Case Type
  getCaseText(caseType) {
    var caseText = "";
    switch (caseType) {
      case "INFIDELITY":
        caseText = "Infidelity";
        break;
      case "CHILD_CUSTODY":
        caseText = "Child Custody";
        break;
      case "WORKERS_COMP":
        caseText = "Workers Comp";
        break;
      case "LOCATE_PEOPLE":
        caseText = "Locate People";
        break;
      case "PROCESS_SERVER":
        caseText = "Process Server";
        break;
      case "OTHER_CASE":
        caseText = "Other";
        break;
      case "ASSET_SEARCH":
        caseText = "Asset Search";
        break;
    }
    this.setState({ Service_Typ: caseText });
  }

    // To Populate Rate Releted To Case (New Changes add on 19/06/2019)
    async populateRateCards(ServiceTyp) {
      console.log(`Service Type============>>>>>>${ServiceTyp}`);
      var result = "",
        errorMessage = "",
        errors = [];
      try {
        result = await execGql(
          "query",
          Searchratecards,
          this.setSearchParams(ServiceTyp)
        );
      } catch (err) {
        errors = err.errorsGql;
        errorMessage = err.errorMessageGql;
      }
  
      if (!result) {
        console.log(errors);
        console.log(errorMessage);
      } else {
        // console.log(result.data.searchRatecards.length);
        if (result.data.searchRatecards.length !== 0) {
          console.log(
            `result.data.searchRatecards[0].ITEMRATE${
              result.data.searchRatecards[0].ITEMRATE
            }`
          );
  
          await this.setState({ Rate: result.data.searchRatecards[0].ITEMRATE });
          console.log(`Rate=========>>>>>${this.state.Rate}`);
        }
      }
    }
  
    setSearchParams(ServiceTyp) {
      var parameters = {
        CLNT: "1002",
        LANG: "EN",
        CIDSYS: "%%",
        CLIENTID: "%%",
        ITEMID: "%%",
        ISACTIVE: "%%",
        ITEMDECS: "%" + ServiceTyp + "%",
        exactMatch: true
      };
      return parameters;
    }
  render() {
    console.log("SERVICETYP");
    console.log(this.state.Case_Typ);
    console.log("SERVICETYP");
    return (
      <div className="ui three column stackable grid">
        <div className="row">
          <div className="one wide computer one wide tablet one wide mobile column" />
          <div className="five wide computer five wide tablet five wide mobile column">
            <h1 id="title_header">ASSIGN YOUR CASE</h1>
            <div style={{ fontSize: 16, fontWeight: 600 }}>
              {this.state.Case_Id ? "CASE ID : " + this.state.Case_Id : ""}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>
              {this.state.Service_Typ
                ? "Service type: " + this.state.Service_Typ
                : "" + this.state.CASEDT
                ? " | " + "Last Update On : " + this.state.CASEDT
                : ""}
            </div>
          </div>

          <div className="three wide computer three wide tablet three wide mobile column" />
        </div>
        <div className="row">
          <div className="one wide computer one wide tablet one wide mobile column" />
          {/* -- popup after changing status-- */}
          <div
            id="snackbar"
            style={{
              backgroundColor: this.state.DispalyBackColor
                ? "#dd212d"
                : "rgba(33,155,166,0.88)"
            }}
          >
            {" "}
            <i className="info circle icon" />
            {this.state.showMsgText}
          </div>
          <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
            <Tabs
              selectedIndex={this.state.tabIndex}
              onSelect={tabIndex => this.setState({ tabIndex })}
            >
              <TabList>
                {this.state.DispalyComp ? <Tab>Case Type</Tab> : null}
                <Tab>Case Details</Tab>
                <Tab>Case Documents</Tab>
                <Tab>Contracts & Agreements</Tab>
                <Tab>Authorization</Tab>
                <Tab>Electronic Signature</Tab>
              </TabList>
              {/* Case Type Panel */}

              {this.state.DispalyComp ? (
                <TabPanel>
                  <div
                    className=" row"
                    style={{
                      display: this.state.DispalyComp ? "flex" : "none",
                      marginLeft: 10
                    }}
                  >
                    <div className="ten wide column">
                      <button
                        className="ui primary button"
                        type="submit"
                        onClick={() =>
                          this.setState({
                            tabIndex: 1,
                            Case_Typ: "ASSET_SEARCH",
                            ContractType: "ASSET"
                          })
                        }
                      >
                        Asset Search
                      </button>
                      <button
                        className="ui primary button"
                        type="submit"
                        onClick={() =>
                          this.setState({
                            tabIndex: 1,
                            Case_Typ: "INFIDELITY",
                            ContractType: "INFIDELITY"
                          })
                        }
                      >
                        Infidelity
                      </button>
                      <button
                        className="ui primary  button"
                        type="submit"
                        onClick={() =>
                          this.setState({
                            tabIndex: 1,
                            Case_Typ: "CHILD_CUSTODY",
                            ContractType: "INFIDELITY"
                          })
                        }
                      >
                        Child Custody
                      </button>
                      <button
                        className="ui primary  button"
                        type="submit"
                        onClick={() =>
                          this.setState({
                            tabIndex: 1,
                            Case_Typ: "WORKERS_COMP",
                            ContractType: "INFIDELITY"
                          })
                        }
                      >
                        Workers Comp
                      </button>
                      <button
                        className="ui primary  button"
                        type="submit"
                        onClick={() =>
                          this.setState({
                            tabIndex: 1,
                            Case_Typ: "LOCATE_PEOPLE",
                            ContractType: "LOCATE"
                          })
                        }
                      >
                        Locate People
                      </button>
                      <button
                        className="ui primary  button"
                        type="submit"
                        onClick={() =>
                          this.setState({
                            tabIndex: 1,
                            Case_Typ: "PROCESS_SERVER",
                            ContractType: "PROCESS"
                          })
                        }
                      >
                        Process Server
                      </button>
                      <button
                        className="ui primary  button"
                        type="submit"
                        onClick={() =>
                          this.setState({
                            tabIndex: 1,
                            Case_Typ: "OTHER_CASE",
                            ContractType: "INFIDELITY"
                          })
                        }
                      >
                        Other
                      </button>
                    </div>
                  </div>
                </TabPanel>
              ) : null}

              {/* Case Details Panel */}

              <TabPanel>
                {this.state.Case_Typ ? (
                  <CaseGeneric
                    showMsg={this.showMsg}
                    Case_Id={this.state.Case_Id}
                    isCust={true}
                    caseType={this.state.Case_Typ}
                    gotoCaseType={this.gotoCaseType}
                    populateRateCards={this.populateRateCards}
                    gotoPreviousTab={this.gotoPreviousTab}
                    CLIENTID={this.state.CLIENTID}
                    history={this.props.history}
                  />
                ) : null}

                {this.state.SERVICETYP ? (
                  <CaseGeneric
                    showMsg={this.showMsg}
                    caseType={this.state.SERVICETYP}
                    Case_Id={this.state.Case_Id}
                    gotoCaseType={this.gotoCaseType}
                    gotoPreviousTab={this.gotoPreviousTab}
                    data={this.props.location.state.data.CIDSYS}
                    CLIENTID={this.state.CLIENTID}
                    history={this.props.history}
                  />
                ) : null}
              </TabPanel>
              {/* Case Document Panel */}
              <TabPanel>
                <CaseDocument
                  isCust={true}
                  CLIENTID={this.state.CLIENTID}
                  Case_Id={this.state.Case_Id}
                  showMsg={this.showMsg}
                  gotoPreviousTab={this.gotoPreviousTab}
                  gotoCaseType={this.gotoCaseType}
                  history={this.props.history}
                />
              </TabPanel>

              {/* Contract Panel */}

              <TabPanel>
                {this.state.Case_Typ ? (
                  <ContractGeneric
                    showMsg={this.showMsg}
                    isCust={true}
                    Case_Typ={this.state.Case_Typ}
                    contractType={this.state.ContractType}
                    gotoPreviousTab={this.gotoPreviousTab}
                    CLIENTID={this.state.CLIENTID}
                    Case_Id={this.state.Case_Id}
                    SERVICETYP={this.state.Case_Typ}
                    gotoCaseType={this.gotoCaseType}
                    gotoCustomContract={this.gotoCustomContract}
                    history={this.props.history}
                  />
                ) : null}

                {this.state.Contract_Typ ? (
                  <ContractGeneric
                    showMsg={this.showMsg}
                    Case_Typ={this.state.SERVICETYP}
                    contractType={this.state.ContractType}
                    gotoPreviousTab={this.gotoPreviousTab}
                    CLIENTID={this.state.CLIENTID}
                    Case_Id={this.state.Case_Id}
                    data={this.props.location.state.data.CIDSYS}
                    SERVICETYP={this.state.SERVICETYP}
                    gotoCustomContract={this.gotoCustomContract}
                    gotoCaseType={this.gotoCaseType}
                    history={this.props.history}
                  />
                ) : null}
              </TabPanel>

              {/* Authorization Panel */}

              <TabPanel>
                <div
                  className=" row"
                  style={{ marginLeft: 10, display: this.state.DisplayAuthBtn }}
                >
                  <div className="ten wide column">
                    <button
                      className="ui  button"
                      type="submit"
                      onClick={() =>
                        this.setState({
                          OnClickAuthbtn: "eCheck Authorization"
                        })
                      }
                    >
                      eCheck Authorization
                    </button>
                    <button
                      className="ui  button"
                      type="submit"
                      onClick={() =>
                        this.setState({ OnClickAuthbtn: "Card Authorization" })
                      }
                    >
                      Card Authorization
                    </button>
                    <button
                      className="ui   button"
                      type="submit"
                      onClick={() =>
                        this.setState({ OnClickAuthbtn: "Cash/Other" })
                      }
                    >
                      Cash/Other
                    </button>
                  </div>
                </div>

                {this.state.OnClickAuthbtn == "eCheck Authorization" ? (
                  <ECheckAuthorization
                    isCust={true}
                    Case_Id={this.state.Case_Id}
                    showMsg={this.showMsg}
                    gotoCaseType={this.gotoCaseType}
                    gotoPreviousTab={this.gotoPreviousTab}
                    Client_Name={this.state.Client_Name}
                    CLIENTID={this.state.CLIENTID}
                    ContractSkip={this.state.ContractSkip}
                    history={this.props.history}
                  />
                ) : this.state.OnClickAuthbtn == "Card Authorization" ? (
                  <CardAuthorization
                    isCust={true}
                    Case_Id={this.state.Case_Id}
                    showMsg={this.showMsg}
                    gotoCaseType={this.gotoCaseType}
                    gotoPreviousTab={this.gotoPreviousTab}
                    Client_Name={this.state.Client_Name}
                    CLIENTID={this.state.CLIENTID}
                    ContractSkip={this.state.ContractSkip}
                    history={this.props.history}
                  />
                ) : this.state.OnClickAuthbtn == "Cash/Other" ? (
                  <OtherAuthorization
                    isCust={true}
                    Case_Id={this.state.Case_Id}
                    showMsg={this.showMsg}
                    gotoCaseType={this.gotoCaseType}
                    gotoPreviousTab={this.gotoPreviousTab}
                    Client_Name={this.state.Client_Name}
                    CLIENTID={this.state.CLIENTID}
                    ContractSkip={this.state.ContractSkip}
                    history={this.props.history}
                  />
                ) : null}

                {this.state.Auth_Typ == "Check" ? (
                  <ECheckAuthorization
                    data={this.state.Auth_Data}
                    Case_Id={this.state.Case_Id}
                    showMsg={this.showMsg}
                    gotoCaseType={this.gotoCaseType}
                    gotoPreviousTab={this.gotoPreviousTab}
                    CLIENTID={this.state.CLIENTID}
                    history={this.props.history}
                  />
                ) : this.state.Auth_Typ == "Card" ? (
                  <CardAuthorization
                    data={this.state.Auth_Data}
                    Case_Id={this.state.Case_Id}
                    showMsg={this.showMsg}
                    gotoCaseType={this.gotoCaseType}
                    gotoPreviousTab={this.gotoPreviousTab}
                    CLIENTID={this.state.CLIENTID}
                    history={this.props.history}
                  />
                ) : this.state.Auth_Typ == "Cash" ? (
                  <OtherAuthorization
                    data={this.state.Auth_Data}
                    Case_Id={this.state.Case_Id}
                    showMsg={this.showMsg}
                    gotoCaseType={this.gotoCaseType}
                    gotoPreviousTab={this.gotoPreviousTab}
                    CLIENTID={this.state.CLIENTID}
                    history={this.props.history}
                  />
                ) : null}
              </TabPanel>

              {/* Authorization Panel */}

              <TabPanel>
                <Signature
                  Case_Id={this.state.Case_Id}
                  CLIENTID={this.state.CLIENTID}
                  isCust={true}
                  ContractSkip={this.state.ContractSkip}
                  showMsg={this.showMsg}
                  gotoPreviousTab={this.gotoPreviousTab}
                  history={this.props.history}
                />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}
