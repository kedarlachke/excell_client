import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { LeadsCRUDOpsQuery, DropdwonQueryLeads, LeadDetails, ServicesRequiredDropdwonQuery } from '../Queries/queries';
import { fetchClntDetails } from "../commonfunctions/commonfunctions";

var DropdownLeadList = []
var ServiceRequiredDropdown = []
var errorval = false
export default class Lead_Add extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tcode: 'create',
      Firstname: "",
      Lasttname: "",
      BusinessOrLowOffice: "",
      Email: "",
      Phoneno: "",
      BestMethodOfContact: "",
      BestTimeToCall: "",
      ServiceCategory: "",
      ServiceRequired: "",
      PriorityLevel: "",
      Message: "",
      Source: "",
      errorFirstname: "",
      errorMODEOFSRC:"",
      errorLasttname: "",
      errorBusinessOrLowOffice: "",
      errorEmail: "",
      errorPhoneno: "",
      errorServiceRequired: "",
      errorServiceCategory: "",
      errorMessage: "",
      showLoading: false,
      Dispalydrp: true,
      Status: "01",
      AssignTo: "",
      DropdownLeadListArr: [],
      ServiceRequiredArr: [],
      popupmsg: '',
      leadID: ''
    }
  };

  componentDidMount() {
    this.populateDDLAll();
    if (this.props.data) {
      this.setState({ showLoading: !this.state.showLoading, Dispalydrp: !this.state.Dispalydrp })
      this.populateFormData()
    }
  };

  /*-----------------------populates data on form load  --------------------*/
  async populateFormData() {
    var result = '', errorMessage = '', errors = [];
    try {
      result = await execGql('query', LeadDetails, this.setSearchParams())

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
      await this.ServicesRequiredDropdownLeads(result.data.leadDetails[0].CATCODE);
      this.setState({
        Firstname: result.data.leadDetails[0].FRSTNM,
        Lasttname: result.data.leadDetails[0].LSTNM,
        BusinessOrLowOffice: result.data.leadDetails[0].OFFICENM,
        Email: result.data.leadDetails[0].EMAILID,
        Phoneno: result.data.leadDetails[0].PHONE,
        BestMethodOfContact: result.data.leadDetails[0].MODOFCON,
        BestTimeToCall: result.data.leadDetails[0].BESTTMCAL,
        ServiceCategory: result.data.leadDetails[0].CATCODE,
        ServiceRequired: result.data.leadDetails[0].TYPSERV,
        PriorityLevel: result.data.leadDetails[0].PRIORITY,
        Message: result.data.leadDetails[0].ADDCOMMETS,
        Source: result.data.leadDetails[0].MODEOFSRC,
        AssignTo: result.data.leadDetails[0].ASSIGNTO,
        Status: result.data.leadDetails[0].STATUS,
        tcode: "update",
        showLoading: !this.state.showLoading
      })
    };
  }

  /*---------- set LeadDetails query variables  ---------*/
  setSearchParams() {
    var parameters = {
      "CLNT": "1002",
      "LANG": "EN",
      "CID": this.state.leadID ? this.state.leadID : this.props.data.data.CID
    }
    return parameters
  };

  /*---------- populates DDL  ---------*/
  async populateDDLAll() {
    var result = '', errorMessage = '', errors = [];
    try {
      result = await execGql('query', DropdwonQueryLeads, this.setDropdownParams())
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
      DropdownLeadList = []
      DropdownLeadList.push({
        "BEST_METHOD_OF_CONTACT": result.data.BEST_METHOD_OF_CONTACT, "BEST_TIME_TO_CALL": result.data.BEST_TIME_TO_CALL,
        "PRIORITY_LEVEL": result.data.PRIORITY_LEVEL, "SERVICE_CATEGORY": result.data.SERVICE_CATEGORY, "SOURCE_OF_LEADS": result.data.SOURCE_OF_LEADS,
        "ASSIGN_TO": result.data.ASSIGN_TO, "STATUS": result.data.STATUS
      })
      this.setState({ DropdownLeadListArr: DropdownLeadList })
    };
  }

  /*---------- set DropdwonQueryLeads variables  ---------*/
  setDropdownParams() {
    var parameters = {
      "CLNT": "1002",
      "LANG": "EN"
    }
    return parameters
  };

  /*---------- populates service Req DDL onchange of service Category  ---------*/
  async ServicesRequiredDropdownLeads(ServiceCat) {
    var result = '', errorMessage = '', errors = [];
    try {
      result = await execGql('query', ServicesRequiredDropdwonQuery, this.setServicesRequiredDropdownParams(ServiceCat))
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

      ServiceRequiredDropdown = []
      ServiceRequiredDropdown.push({
        "SERVICES_REQUIRED": result.data.SERVICES_REQUIRED
      })
      this.setState({
        ServiceRequiredArr: ServiceRequiredDropdown,
        ServiceRequired: ServiceRequiredDropdown[0].SERVICES_REQUIRED.length == 1 ? ServiceRequiredDropdown[0].SERVICES_REQUIRED[0].CODE : ''
      })
    }
  };

  /*---------- set ServicesRequiredDropdwonQuery variables  ---------*/
  setServicesRequiredDropdownParams(ServiceCat) {
    var parameters = {
      "CLNT": "1002",
      "LANG": "EN",
      "CATCODE": ServiceCat
    }
    return parameters
  };

  /*---------- LeadsCRUDOps create and update ---------*/
  async LeadsCRUDOps(variables) {
    var result = '', errorMessage = '', errors = [];
    try {
      result = await execGql('mutation', LeadsCRUDOpsQuery, variables)
    }
    catch (err) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
    }

    if (!result) {
      console.log(errors);
      console.log(errorMessage);
      errorval = true
      errorMessage = JSON.parse(errorMessage);
      for (let key in errorMessage) {

        this.setState({
          errorFirstname: errorMessage[key].errorFRSTNM,
          errorLasttname: errorMessage[key].errorLSTNM,
          errorBusinessOrLowOffice: errorMessage[key].errorOFFICENM,
          errorServiceCategory: errorMessage[key].errorCATCODE,
          errorServiceRequired: errorMessage[key].errorTYPSERV,
          errorEmail: errorMessage[key].errorEMAILID,
          errorPhoneno: errorMessage[key].errorPHONE,
          errorMessage: errorMessage[key].errorADDCOMMETS,
          errorMODEOFSRC: errorMessage[key].errorMODEOFSRC
        });
      }
    }
    else {
      console.log(result)
      this.onClear()
      await this.setState({
        popupmsg: this.state.tcode === "create" ? "Record saved successfully" : "Record updated successfully",
        leadID: result.data.LeadsAffected[0],
        showLoading: !this.state.showLoading
      })
      await this.populateFormData()
      this.showMsg()
    }
  };

  /*---------- set create LeadsCRUDOpsQuery variables  ---------*/
  setCreateParams() {
    var parameters = {
      "transaction": "CREATE",
      "leads": [
        {
          "CLNT": "1002",
          "LANG": "EN",
          "FRSTNM": this.state.Firstname,
          "LSTNM": this.state.Lasttname,
          "CATCODE": this.state.ServiceCategory,
          "TYPSERV": this.state.ServiceRequired,
          "EMAILID": this.state.Email,
          "PHONE": this.state.Phoneno,
          "MODOFCON": this.state.BestMethodOfContact,
          "BESTTMCAL": this.state.BestTimeToCall,
          "OFFICENM": this.state.BusinessOrLowOffice,
          "MODEOFSRC": this.state.Source,
          "PRIORITY": this.state.PriorityLevel,
          "ADDCOMMETS": this.state.Message
        }
      ]
    }
    return parameters
  };

  /*---------- set update LeadsCRUDOpsQuery variables  ---------*/
  setUpdateParams() {

    var parameters = {
      "transaction": "UPDATE",
      "leads": [
        {
          "CLNT": "1002",
          "LANG": "EN",
          "CID": this.state.leadID ? this.state.leadID : this.props.data.data.CID,
          "FRSTNM": this.state.Firstname,
          "LSTNM": this.state.Lasttname,
          "EMAILID": this.state.Email,
          "PHONE": this.state.Phoneno,
          "MODOFCON": this.state.BestMethodOfContact,
          "BESTTMCAL": this.state.BestTimeToCall,
          "OFFICENM": this.state.BusinessOrLowOffice,
          "MODEOFSRC": this.state.Source,
          "PRIORITY": this.state.PriorityLevel,
          "CATCODE": this.state.ServiceCategory,
          "TYPSERV": this.state.ServiceRequired,
          "ADDCOMMETS": this.state.Message,
          // "ASSIGNTO": this.state.AssignTo,
          // "STATUS": this.state.Status
        }
      ]
    }
    return parameters
  };


  /*-----------------------crud operations--------------------*/
  async CRUD_operation() {
    if (this.state.tcode == 'create') {
      await this.LeadsCRUDOps(this.setCreateParams())

    }
    else if (this.state.tcode == 'update') {
      await this.LeadsCRUDOps(this.setUpdateParams())

    }

  }
  /*-----------------------clear form fields--------------------*/
  onClear() {
    errorval = false;
    this.setState({
      Firstname: "",
      Lasttname: "",
      BusinessOrLowOffice: "",
      Email: "",
      Phoneno: "",
      BestMethodOfContact: "",
      BestTimeToCall: "",
      ServiceCategory: "",
      ServiceRequired: "",
      PriorityLevel: "",
      Message: "",
      Source: "",
      errorFirstname: "",
      errorMODEOFSRC:"",
      errorLasttname: "",
      errorBusinessOrLowOffice: "",
      errorEmail: "",
      errorPhoneno: "",
      errorServiceRequired: "",
      errorServiceCategory: "",
      errorMessage: "",
    });
  };

  /*-----------------------clear btn fun--------------------*/
  // clearBtn() {
  //   this.onClear()
  //   this.setState({
  //     tcode: 'create',
  //   })
  // }

  /*-----------------------navigate To LeadList--------------------*/
  navigateToLeadList() {
    return this.props.history.push('/leads')
  };

  //..............Date Formate Convertion..........
  formatDate(date) {
    var year = date.slice(0, 4)
    var month = date.slice(4, 6)
    var day = date.slice(6, 8)

    var date_format = month + '/' + day + '/' + year
    return date_format
  };

  /*-----------------------handle onchage event of service category--------------------*/
  async handleChange(e) {
    await this.setState({ ServiceCategory: e.target.value })
    this.ServicesRequiredDropdownLeads(this.state.ServiceCategory)
  }

  /*-----------------------to show msg after create and update--------------------*/
  showMsg() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }


  //onblur of email input field fetch clnt details
  async populateClntDetails(emailid) {
    this.setState({showLoading:true})
    let clntData = await fetchClntDetails(emailid)
    if (clntData.data.clientDetails.length == 0) {
      this.setState({
        showLoading:false})
    }
    else{
      this.setState({
        Firstname: clntData.data.clientDetails[0].FIRSTNM,
        Lasttname: clntData.data.clientDetails[0].LASTNM,
        BusinessOrLowOffice: clntData.data.clientDetails[0].OFFICENM,
        Email: clntData.data.clientDetails[0].EMAILID,
        Phoneno: clntData.data.clientDetails[0].PHONE,
        BestMethodOfContact: clntData.data.clientDetails[0].MODOFCON,
        BestTimeToCall: clntData.data.clientDetails[0].BESTTMCAL,
        showLoading:false
      })
    }
  }

  render() {
      return (
        <div>

          <div className="ui one column grid">

            <div className="three column row">
              <div className="one wide computer one wide tablet one wide mobile column">
              </div>
              <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                {!this.props.data ? <h1 id="title_header">LEAD-ADD NEW</h1> : null}
                <div className="ui segment">
                  <div className="ui form">
                    <div className="ui three column stackable grid">

                      <div className="row">
                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorFirstname ? 'brown' : null }}>First Name</label>
                            <div className="ui right icon input">
                              <i className="user icon"></i>
                              <input style={{ borderColor: this.state.errorFirstname ? 'brown' : null, backgroundColor: this.state.errorFirstname ? '#f3ece7' : null }} type="text" name="firstname" placeholder="First Name" value={this.state.Firstname} onChange={e => this.setState({ Firstname: e.target.value })} />
                            </div>
                          </div>
                          <div className="field">
                            {errorval ? <span id="errorspan">{this.state.errorFirstname}</span> : null}
                          </div>
                        </div>
                        <div className=" five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorLasttname ? 'brown' : null }}>Last Name</label>
                            <div className="ui right icon input">
                              <i className="user icon"></i>
                              <input style={{ borderColor: this.state.errorLasttname ? 'brown' : null, backgroundColor: this.state.errorLasttname ? '#f3ece7' : null }} type="text" name="lastname" placeholder="Last Name" value={this.state.Lasttname} onChange={e => this.setState({ Lasttname: e.target.value })} />
                            </div>
                          </div>
                          <div className="field">
                            {errorval ? <span id="errorspan">{this.state.errorLasttname}</span> : null}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="ten wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorBusinessOrLowOffice ? 'brown' : null }}>If you an Attorney or a Business,please enter the name of your Law Office or Business</label>
                            <div className="ui right icon input">
                              <i className="suitcase icon"></i>
                              <input style={{ borderColor: this.state.errorBusinessOrLowOffice ? 'brown' : null, backgroundColor: this.state.errorBusinessOrLowOffice ? '#f3ece7' : null }}
                                type="text" name="business_office" placeholder="Business/Office Name" value={this.state.BusinessOrLowOffice} onChange={e => this.setState({ BusinessOrLowOffice: e.target.value })} />
                            </div>
                          </div>
                          <div className="field">
                            {errorval ? <span id="errorspan">{this.state.errorBusinessOrLowOffice}</span> : null}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorEmail ? 'brown' : null }}>E-mail</label>
                            <div className="ui right icon input">
                              <i className="mail icon"></i>
                              <input style={{ borderColor: this.state.errorEmail ? 'brown' : null, backgroundColor: this.state.errorEmail ? '#f3ece7' : null }}
                                type="text" name="email" placeholder="E-mail" value={this.state.Email} onChange={e => this.setState({ Email: e.target.value })}
                                //onBlur={e => e.target.value ? this.populateClntDetails(e.target.value) : null} 
                                />
                            </div>
                          </div>
                          <div className="field">
                            {errorval ? <span id="errorspan">{this.state.errorEmail}</span> : null}
                          </div>
                        </div>
                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorPhoneno ? 'brown' : null }}>Phone Number</label>
                            <div className="ui right icon input">
                              <i className="call icon"></i>
                              <input style={{ borderColor: this.state.errorPhoneno ? 'brown' : null, backgroundColor: this.state.errorPhoneno ? '#f3ece7' : null }} type="text" name="phoneno" placeholder="Phone Number" value={this.state.Phoneno} onChange={e => this.setState({ Phoneno: e.target.value })} />
                            </div>
                          </div>
                          <div className="field">
                            {errorval ? <span id="errorspan">{this.state.errorPhoneno}</span> : null}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="five wide column">
                          <div className="field">
                            <label>Best Method Of Contact</label>

                            <select className="" value={this.state.BestMethodOfContact} onChange={e => this.setState({ BestMethodOfContact: e.target.value })}>
                              <option value="">Select</option>
                              {this.state.DropdownLeadListArr.map((data) => data.BEST_METHOD_OF_CONTACT.map((data, idx) => <option key={idx} value={data.CODE}>{data.DESC}</option>))}
                            </select>
                          </div>
                        </div>
                        <div className="five wide column">
                          <div className="field">
                            <label>Best Time To Call</label>
                            <select className="" value={this.state.BestTimeToCall} onChange={e => this.setState({ BestTimeToCall: e.target.value })}>
                              <option value="">Select</option>
                              {this.state.DropdownLeadListArr.map((data) => data.BEST_TIME_TO_CALL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorServiceCategory ? 'brown' : null }} >Service Category</label>
                            <select style={{ borderColor: this.state.errorServiceCategory ? 'brown' : null, backgroundColor: this.state.errorServiceCategory ? '#f3ece7' : null }}
                              value={this.state.ServiceCategory} onChange={e => this.handleChange(e)}>
                              <option value="">Select</option>
                              {this.state.DropdownLeadListArr.map((data) => data.SERVICE_CATEGORY.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>))}
                            </select>
                          </div>
                          <div className="field">
                            {errorval ? <span id="errorspan">{this.state.errorServiceCategory}</span> : null}
                          </div>
                        </div>

                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorServiceRequired ? 'brown' : null }}>Service(s) Required</label>
                            <select style={{ borderColor: this.state.errorServiceRequired ? 'brown' : null, backgroundColor: this.state.errorServiceRequired ? '#f3ece7' : null }}
                              value={this.state.ServiceRequired} onChange={e => this.setState({ ServiceRequired: e.target.value })}
                              disabled={this.state.ServiceRequiredArr.length == 0}>
                              <option value="">Select</option>
                              {this.state.ServiceRequiredArr.map((data) => data.SERVICES_REQUIRED.map((data, index) => <option key={index} value={data.CODE} >{data.DESC}</option>))}
                            </select>

                          </div>
                          <div className="field">
                            {errorval ? <span id="errorspan">{this.state.errorServiceRequired}</span> : null}
                          </div>
                        </div>

                      </div>

                      <div className="row">
                        <div className="ten wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorMessage ? 'brown' : null }}>Message</label>
                            <div className="ui right icon input">
                              <textarea style={{ borderColor: this.state.errorMessage ? 'brown' : null, backgroundColor: this.state.errorMessage ? '#f3ece7' : null }}
                                name='message' rows="2" value={this.state.Message} onChange={e => this.setState({ Message: e.target.value })} />
                            </div>
                          </div>
                          <div className="field">
                            {errorval ? <span id="errorspan">{this.state.errorMessage}</span> : null}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="five wide column">
                          <div className="field">
                            <label style={{ color: this.state.errorFirstname ? 'brown' : null }}>Source</label>
                            <select className="" value={this.state.Source} onChange={e => this.setState({ Source: e.target.value })} style={{ borderColor: this.state.errorFirstname ? 'brown' : null, backgroundColor: this.state.errorFirstname ? '#f3ece7' : null }}>
                              <option value="">Select</option>
                              {this.state.DropdownLeadListArr.map((data) => data.SOURCE_OF_LEADS.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>))}
                            </select>
                          </div>
                          <div className="field">
                            {errorval ? <span id="errorspan">{this.state.errorMODEOFSRC}</span> : null}
                            
                          </div>
                        </div>
                        <div className="five wide column">
                          <div className="field">
                            <label>Priority Level</label>
                            <select className="" value={this.state.PriorityLevel} onChange={e => this.setState({ PriorityLevel: e.target.value })}>
                              <option value="">Select</option>
                              {this.state.DropdownLeadListArr.map((data) => data.PRIORITY_LEVEL.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>))}
                            </select>
                          </div>
                        </div>
                      </div>
                      {/* <div className="row" style={{ display: this.state.Dispalydrp ? "none" : "flex" }}>
                        <div className="five wide column">
                          <div className="field">
                            <label>Assign To</label>
                            <select className="" value={this.state.AssignTo} onChange={e => this.setState({ AssignTo: e.target.value })}>
                              <option value="">Select</option>
                              {this.state.DropdownLeadListArr.map((data) => data.ASSIGN_TO.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>))}
                            </select>
                          </div>
                        </div>
                        <div className="five wide column">
                          <div className="field">
                            <label>Status</label>
                            <select className="" value={this.state.Status} onChange={e => this.setState({ Status: e.target.value })}>
                              <option value="">Select</option>
                              {this.state.DropdownLeadListArr.map((data) => data.STATUS.map((data, index) => <option key={index} value={data.CODE}>{data.DESC}</option>))}
                            </select>
                          </div>
                        </div>
                      </div> */}
                      <div className="row">
                        <div className="ten wide column">
                          <button className="ui primary button" type="submit" onClick={() => this.CRUD_operation()}>Submit</button>
                          <button className="ui  button" type="submit" onClick={() => this.onClear()}>Clear</button>
                          <button className="ui  button" type="submit" onClick={() => this.navigateToLeadList()} >Cancel</button>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="one wide computer one wide tablet one wide mobile column">
              </div>

            </div>
            {/* -- popup to show msg-- */}
            <div id="snackbar">  <i className="info circle icon"></i> {this.state.popupmsg}</div>

                 {/* -- loading Component- */}  
            <div className="modal" style={{ display:this.state.showLoading?'flex':'none' }} >
              <div className="modal-content">

                <div className="ui icon header">
                  <div className="ui active inverted loader"></div>
                </div>
              </div>
            </div>
            {/* <div>
              <pre>
                {JSON.stringify({
                  "Firstname": this.state.Firstname,
                  "Lasttname": this.state.Lasttname,
                  "BusinessOrLowOffice": this.state.BusinessOrLowOffice,
                  "Email": this.state.Email,
                  "Phoneno": this.state.Phoneno,
                  "BestMethodOfContact": this.state.BestMethodOfContact,
                  "BestTimeToCall": this.state.BestTimeToCall,
                  "ServiceRequired": this.state.ServiceRequired,
                  "PriorityLevel": this.state.PriorityLevel,
                  "Message": this.state.Message,
                  "Source": this.state.Source
                })}
              </pre>
            </div> */}
          </div>

        </div>
      )
  }
}