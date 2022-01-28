import React, { Component } from 'react';
import { execGql,pCLNT,pLANG } from '../apolloClient/apolloClient';
import { ContractsCRUDOps,contractDetails} from '../Queries/queries';
export default class locateContract extends Component {

    constructor(props) {
        super(props)
        this.state = {
            CLIENTID:"",
            SERVICETYPE:"",
            CIDSYS:"",
            FULLNM:"",
            CONTACTTYPE:"",
            RATEPERH:"",
            RATEPERM:"",
            TOTAL:"",
            OTHER:"",
            tcode: 'CREATE',
            Dispalycomp: true,
            DispalyBackColor: false,
            OnClickButton: '',

            // error state
            errorFULLNM:"",
            errorCONTACTTYPE:"",
            errorRATEPERH:"",
            errorRATEPERM:"",
            errorTOTAL:"",
            errorOTHER:""
        };
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
        this.gotoCustomContract = this.props.gotoCustomContract.bind(this)
    };

    componentDidMount()
    {
        console.log(this.props.data);
        
        if (this.props.data) {
            // this.setState({
            //     Dispalycomp: !this.state.Dispalycomp
            // })
           this.PopulateData();
         }
    };


     // To Populate Data
     async PopulateData() {
        console.log('in edit')
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', contractDetails, this.setSearchParams())
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

            console.log(result.data.contractDetails.length);
            if(result.data.contractDetails.length!=0)
            {
            this.setState({
                CLIENTID:result.data.contractDetails[0].CLIENTID,
                SERVICETYPE:result.data.contractDetails[0].SERVICETYPE,
                CIDSYS:result.data.contractDetails[0].CIDSYS,
                FULLNM:result.data.contractDetails[0].FULLNM,
                CONTACTTYPE:result.data.contractDetails[0].CONTACTTYPE,
                RATEPERH:result.data.contractDetails[0].RATEPERH,
                RATEPERM:result.data.contractDetails[0].RATEPERM,
                TOTAL:result.data.contractDetails[0].TOTAL,
                OTHER:result.data.contractDetails[0].OTHER,
                tcode: 'UPDATE',
              //  Dispalycomp: !this.state.Dispalycomp
            });
        }
        }

    };

     setSearchParams() {
        var caseid=''
        if(this.props.data)
        {
            caseid=this.props.data
        }
        else if(this.props.Case_Id)
        {
           caseid=this.props.Case_Id
        }
        var parameters = {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CIDSYS": caseid
        }
        return parameters

    };
       // To create contract
       async CreateContract() {
        if (this.props.CLIENTID) {
            const err=await this.validateData();
            if(!err)
            {
                await this.setState({CIDSYS:this.props.Case_Id,
                    CLIENTID:this.props.CLIENTID,
                   SERVICETYPE:this.props.SERVICETYP
               });
            var result = '', errorMessage = '', errors = [];
            try {
                result = await execGql('mutation', ContractsCRUDOps, this.setCreateParams())
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
                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Customer Details Updated Successfully..!!")
                    this.PopulateData();
                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.gotoCaseType(this.state.CLIENTID,this.state.CIDSYS);
                   // this.setCaseId(result.data.CasesAffected[0])
                }

            }
        }
    }
        else {
            await this.setState({ DispalyBackColor: true });
            this.showMsg("Client Details Must be fill first")
        }

    };


    setCreateParams() {
        var parameters = {
            "transaction": "CREATE",
             "contracts": [
             {
                 "CLNT":"1002",
                 "LANG": "EN",
                 "CLIENTID":this.state.CLIENTID,
                 "CIDSYS":this.state.CIDSYS,
                 "CONTACTTYPE": this.state.CONTACTTYPE,
                 "SERVICETYPE": this.state.SERVICETYPE,
                 "FULLNM": this.state.FULLNM,
                 "TOTAL": this.state.TOTAL,
                 "RATEPERH": this.state.RATEPERH,
                 "RATEPERM": this.state.RATEPERM,
                 "OTHER": this.state.OTHER,
                 "MAXH": ""
              }
            ]
        }
        return parameters

    };


     // To Update contract
     async UpdateContract() {
        const err= await this.validateData();
        if(!err)
        {
            var result = '', errorMessage = '', errors = [];
            try {
                result = await execGql('mutation', ContractsCRUDOps, this.setUpdateParams())
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
               
                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Customer Details Updated Successfully..!!");
                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.gotoCaseType(this.state.CLIENTID,this.state.CIDSYS);
                   // this.setCaseId(result.data.CasesAffected[0])
                }

            }
      
        }
    };


    setUpdateParams() {
        var parameters = {
            "transaction": "UPDATE",
             "contracts": [
             {
                 "CLNT":"1002",
                 "LANG": "EN",
                 "CLIENTID":this.state.CLIENTID,
                 "CIDSYS":this.state.CIDSYS,
                 "CONTACTTYPE": this.state.CONTACTTYPE,
                 "SERVICETYPE": this.state.SERVICETYPE,
                 "FULLNM": this.state.FULLNM,
                 "TOTAL": this.state.TOTAL,
                 "RATEPERH": this.state.RATEPERH,
                 "RATEPERM": this.state.RATEPERM,
                 "OTHER": this.state.OTHER,
                 "MAXH": ""
              }
            ]
        }
        return parameters

    };
    
    // Navigate To Case List
    navigateToCaseList() {
        return this.props.history.push('/cases')
    };

  

    // CRUD Operations
    CRUD_operation() {
        if (this.state.tcode == 'CREATE') {
            this.CreateContract()
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateContract()

        }
    };


    
       //............for show msg..........
       async showMsg(text) {
        await this.setState({ showMsgText: text })
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    };


    // To validate Data

  validateData()
  {  
    let errorval=false;
    const errors = {
         errorFULLNM:"",
         errorCONTACTTYPE:"",
         errorRATEPERH:"",
         errorRATEPERM:"",
         errorTOTAL:"",
         errorOTHER:""
        }
       
       if(this.state.FULLNM=='')
       {
           errorval=true;
           errors.errorFULLNM="Name is mandatory";
       } 

       if(this.state.FULLNM.length>80)
       {
           errorval=true;
           errors.errorFULLNM="Name should not be greater than 80 characters";
       } 
  
     if(this.state.CONTACTTYPE=='')
       {
        errorval=true;
        errors.errorCONTACTTYPE="Contract Detail is mandatory";
       }
       if(this.state.CONTACTTYPE.length>150)
       {
        errorval=true;
        errors.errorCONTACTTYPE="Contract Detail should not be greater than 150 characters";
       }

     if(this.state.TOTAL=='')
       {
        errorval=true;
        errors.errorTOTAL="Total is mandatory";
       }
        if(this.state.TOTAL.length>20)
       {
        errorval=true;
        errors.errorTOTAL="Total should not be greater than 20 digit";
       }
      if(isNaN(this.state.TOTAL))
       {
        errorval=true;
        errors.errorTOTAL="Total must be digit";
       }
  
    if(this.state.RATEPERH=='')
       {
        errorval=true;
        errors.errorRATEPERH="Rate per Hour is mandatory";
       }
       if(this.state.RATEPERH.length>20)
       {
        errorval=true;
        errors.errorRATEPERH="Rate per Hour should not be greater than 20 digit";
       }
       if(isNaN(this.state.RATEPERH))
       {
        errorval=true;
        errors.errorRATEPERH="Rate per must be digit";
       }

      if(this.state.RATEPERM=='')
       {
        errorval=true;
        errors.errorRATEPERM="Rate per Mile is mandatory";
       }
       
         if(this.state.RATEPERM.length>20)
       {
        errorval=true;
        errors.errorRATEPERM="Rate per Mile should not be greater than 20 digit";
       }
        if(isNaN(this.state.RATEPERM))
       {
        errorval=true;
        errors.errorRATEPERM="Rate per Mile must be digit";
       }
  
     if(this.state.OTHER=='')
       {
        errorval=true;
        errors.errorOTHER="Other Details is mandatory";
       }
        if(this.state.OTHER.length>20)
       {
        errorval=true;
        errors.errorOTHER="ther Details  should not be greater than 150 digit";
       }

       this.setState({
        ...this.state,
        ...errors
      });

       return errorval
    
    }
    render() {
    
        return (

            <div className="ui one column grid">
            <div className="one wide computer one wide tablet one wide mobile row">
            </div>
            <div className="three column row">
                <div className="one wide computer one wide tablet one wide mobile column">
                </div>
                <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                    <div className="ui segment" >
                        <div className="ui form">
                            <div className="ui three column stackable grid">
                        
                            <div className="row" style={{marginLeft: "0px"}} >
                        			<div className=""  >
                        			   <div  style={{width:"94%"}}>
                        			   <div className="panel" style={{padding: "10px"}}>
                        			   
                        		 <input id="FULLNM" value={this.state.FULLNM}  onChange={(e)=>this.setState({FULLNM:e.target.value})} style={{width:"20%"}}/><label  style={{color:this.state.errorFULLNM?'#dd212d':null}}>{this.state.errorFULLNM?this.state.errorFULLNM:null}</label>, Hereinafter referred to as <strong>“CLIENT”</strong> DOES hereby agree to retain the services of Excell Investigation, a private investigative agency, duly licensed under the laws of the state of California, which maintains its offices at 8105 East 2nd Street, Downey, CA, for the purpose of performing the following investigative work:
                        		
                        		
                        		<br/><br/><input  value={this.state.CONTACTTYPE} onChange={(e)=>this.setState({CONTACTTYPE:e.target.value})} id="CONTACTTYPE" style={{width:"60%"}} />
                        		<label id="errspanCONTACTTYPE" className="" style={{color:this.state.errorCONTACTTYPE?'#dd212d':null}}> {this.state.errorCONTACTTYPE?this.state.errorCONTACTTYPE:null}</label>
                        	    
                        	   <br/> <br/><strong>CLIENT</strong> agrees to pay a retainer for services of Excell Investigations or its agents the sum of <strong>$</strong><input id="TOTAL" value={this.state.TOTAL}  onChange={(e)=>this.setState({TOTAL:e.target.value})} style={{width:"10%"}} /> <label id="errspanTOTAL" className="" style={{color:this.state.errorTOTAL?'#dd212d':null}}>{this.state.errorTOTAL?this.state.errorTOTAL:null}</label>, the Hourly rate shall be <strong>$</strong><input id="RATEPERH" value={this.state.RATEPERH}  onChange={(e)=>this.setState({RATEPERH:e.target.value})} style={{width:"10%"}} /><label id="errspanRATEPERH" className="" style={{color:this.state.errorRATEPERH?'#dd212d':null}}>{this.state.errorRATEPERH?this.state.errorRATEPERH:null}</label> per hour, plus <strong>$</strong><input id="RATEPERM" value={this.state.RATEPERM} onChange={(e)=>this.setState({RATEPERM:e.target.value})} style={{width:"10%"}}/> <label id="errspanRATEPERM" className="" style={{color:this.state.errorRATEPERM?'#dd212d':null}}>{this.state.errorRATEPERM?this.state.errorRATEPERM:null}</label> per mile.plus actual costs and out-of-pocket expenses. (Unless agreed otherwise in the underline clause below) 
                        		   
                        		
                        		<br/><input id="OTHER" value={this.state.OTHER} onChange={(e)=>this.setState({OTHER:e.target.value})} style={{width:"60%"}} />
                        		<label id="errspanOTHER" className="" style={{color:this.state.errorOTHER?'#dd212d':null}}>{this.state.errorOTHER?this.state.errorOTHER:null}</label>   
                        		
                        		<br/><br/>In consideration of the forgoing terms, it is understood that <strong>Excell Investigations shall use it best efforts and resources available to locate the subject of the investigation and perform the services for which it is being retained. Excell shall explore all lawful means to assure the best performance and results and to do all necessary, appropriate or advisable in performing said services.  Excell promises to provide all proof of services which may include any of the Following: (written reports, utility searches, video documentation, photographs, skip trace and  information services reports, etc….) to guarantee our thorough and sincere efforts. Excell promise to provide a detailed invoice that outlines all expenses or your money back guarantee…! </strong>It is understood results cannot be guaranteed, compensation to Excell Investigation shall not be based on results. <strong>This Clause is exempt if Client is under the “Guarantee”</strong> Locate<strong> services agreement. </strong>The “Guarantee agreement” pertains to subjects that are locatable in the region the clients advises us to search   
                        		 
                        		 
                        		<br/><br/><strong>In the Event that Excell Investigation is unable or unsuccessful to obtain any information or unable to provide proof of service a complete refund will be issued. </strong>However travel time and information service costs shall not be refunded.
                        		 
                        		 <br/><br/><strong>Excell Investigations agrees to conduct this investigation with due diligence to protect the interests of CLIENT, and agrees that whatever confidential information is obtained while conducting the investigation, will only be given to CLIENT and further agrees to restrict the dissemination of said findings to any third party.</strong>
                        		
                        		<br/><br/>No service shall be rendered by Excell Investigations to CLIENT until such time as the retainer has been paid and this retainer agreement signed. A copy or fax of the retainer agreement will be valid as an original.
                        		
                        		 <br/><br/>Any amounts or expenses incurred above the retainer fee of $_500.00_ shall be due payable immediately upon notice. In the event of default in payment of sums due hereunder and if the agreement is placed in the hand of an attorney at law, small claims, or collection including time spent in court, at the same rate per hour agreed. This includes but not limited to any reasonable attorney’s fees. Payments arriving after the due date will be considered late and a service charge of 1.5% per month (compounded monthly) of the balance due will be charged to the client. Client consents to collection jurisdiction in the state, or county of Excell Investigation’s Choice.
                        		  
                        		  <br/><br/><strong>Excell Investigations</strong> reserves the right to obtain a current credit report upon receipt of this retainer agreement and subsequently for the purpose of an update or renewal of credit.
                        		 
                        		  <br/><br/><strong>Excell Investigations</strong> reserves the right to withhold the release of any information which it develops during the course of the investigation in the event the CLIENT has failed to pay for services rendered and costs incurred.
                        		 
                        		 <br/><br/>In the event the CLIENT chooses to pay for services with a visa, MasterCard, pay pal or any other form of charge CLIENT agrees not to dispute any charge with the understanding that this service is simply an attempt to gather information in the said Investigation and that results can never be guaranteed.  
                        		 
                        		 <br/><br/>In the event that CLIENT terminates this agreement, CLIENT agrees that the retainer paid to Excell Investigation shall remain the property of Excell investigation and shall be forfeited by CLIENT. CLIENT further agrees to pay promptly in full all fees for additional services, expenses, mileage or other costs, which exceed the amount of the retainer. CLIENT agrees that any remaining balance will be charged to the payment method available to EXCELL. Any balance of retainer not used by CLIENT will be applied to future investigations required b the client for a period of five years.
                        		  
                        		  <br/><br/>Excell Investigations does not warrant or guarantee the accuracy or completeness of any information used in the preparation of its reports that comes from outside sources, CLIENT further agrees to defend, indemnify and hold Excell INVESTIGATIONS and/or its agents, associates, and employees harmless from any and all action, courses of action, claims, damages and demands of whatever type arising directly or indirectly from the services EXCELL INVESTIGATIONS are being retained to perform pursuant to this agreement.
                        		  
                        		  <br/><br/>This agreement shall be construed in accordance with the laws of the state of California. If any portion of this agreement is determined to be invalid or unenforceable, the remainder of the agreement shall continue in full force and effect. There are no other agreements, express, implied, written, oral or otherwise, except as expressly set forth herein. This Agreement may only by modified in writing signed by both parties.
                        		  </div>
                        			   </div>
                        			   <label id="contractError" style={{color: "red"}}></label>
                        			</div>
                        			<input  id="TCode_con"  style={{width:"100%" ,display:"none"}}   />
                        		</div>
                                      {/* -- popup after changing status-- */}
                                  <div id="snackbar" style={{ backgroundColor: this.state.DispalyBackColor ? "#dd212d" : "rgba(33,155,166,0.88)" }}>  <i className="info circle icon"></i>{this.state.showMsgText}</div>
                                <div className="row" >
                                    <div className="">
                                        <button className="ui primary button" type="submit"  onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                        <button className="ui primary button" type="submit"  onClick={() => { this.CRUD_operation(), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                        <button className="ui  button" type="clear" >Clear</button>
                                        <button className="ui  button" type="submit" onClick={()=>this.navigateToCaseList()}>Cancel</button>
                                        <button className="ui  button" type="submit" >Skip & Continue</button>
                                        <button className="ui  button" type="submit" onClick={()=>this.gotoCustomContract('Custom')}>Custom Contract</button>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                <div className="one wide computer one wide tablet one wide mobile column">
                </div>
            </div>
        </div>
        );

    // }
    // else {
    //     return (
    //         <div className="ui icon header">
    //             <div className="ui active loader"></div>
    //         </div>
    //     );
    // }
    }
}