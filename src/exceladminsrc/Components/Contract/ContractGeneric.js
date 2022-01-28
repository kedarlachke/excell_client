import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
import { execGql } from '../apolloClient/apolloClient';
import { ContractsCRUDOps, contractDetails,MailContract } from '../Queries/queries';
import { setSearchParams, setCRUDParams,contractState} from './contractExport';
import Contract_Mail from './Contract_Mail'; 
export default class ContractGeneric extends Component {
    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.gotoCaseType = this.props.gotoCaseType.bind(this);
        this.gotoCustomContract=this.props.gotoCustomContract.bind(this);
        this.gotoPreviousTab = this.props.gotoPreviousTab.bind(this);
        this.showMsg=this.props.showMsg.bind(this);
        this.validateContract=this.validateContract.bind(this)
        this.MailContractfun=this.MailContractfun.bind(this)
        this.state = contractState(this.props.contractType,'contractGetInitialState');
        this.closeMailPopup=this.closeMailPopup.bind(this)
        console.log('--------------------------------------23-4-----------------------')
        console.log(this.state)
        console.log('--------------------------------------23-4-----------------------')
    }  

    async  componentDidMount() {
     console.log(this.props.Case_Id);
     // To Show Msg When User Don't save Client details First
     console.log();
     
     if (!this.props.CLIENTID) {
         this.showMsg("Client details not save."+"\n"+"Please save client details first",true);
         this.gotoPreviousTab(0)
     }   

        // Populate Data When Edit Mode
        
        if (this.props.data) {
            //alert('data',this.props.data)
           // await this.setState({Dispalycomp:true});
            this.PopulateData(this.props.data);
        };

        // Populate Data when back to Client tab
        if (this.props.Case_Id) {
           // alert('Case_Id',this.props.Case_Id)
           // await this.setState({Dispalycomp:true});
            this.PopulateData(this.props.Case_Id);
        }

    };

    // To Populate Data
    async PopulateData(CaseId) {
        var result = '', errorMessage = '', errors = [];
        try {
            // console.log('result1');
            result = await execGql('query', contractDetails, setSearchParams(CaseId))
          //  console.log(result);
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
console.log('PopulateData 1')
             console.log(result);
            if (result.data.contractDetails.length != 0) {
                await  this.setState({
                    Dispalycomp: !this.state.Dispalycomp,
                    custbuttom:false
                })
                await this.setState(contractState(this.props.contractType,'contractGetResultState',result));
                await this.setState({  Dispalycomp: !this.state.Dispalycomp});
            }else{
                await this.setState({custbuttom:true})
            }
            console.log(this.state)
            // else
            // {
            //     await this.setState({Dispalycomp:false})
            // }
        }

    };


    // To create contract
    async CreateContract(typeofContract ,inputFieldList) {
    
        await this.setState({
            CIDSYS: this.props.Case_Id,
            CLIENTID: this.props.CLIENTID,
            SERVICETYPE: this.props.SERVICETYP,
            errorCONTACTTYPE:"",
            errorFULLNM:"",
            errorTOTAL:"",
            errorRATEPERH:"",
            errorRATEPERM:"",
            errorMAXH:"",
            errorOTHER:""
        });
        if (this.props.CLIENTID) {
            var result = '', errorMessage = '', errors = [];
            try {
                console.log(setCRUDParams('CREATE', typeofContract ,this.state));
           //     console.log(inputFieldList);
                
                
                result = await execGql('mutation', ContractsCRUDOps, setCRUDParams('CREATE', typeofContract ,this.state))
                // console.log(result);
            }
            catch (err) {
                errors = err.errorsGql;
                errorMessage = err.errorMessageGql;

            }

            if (!result) {
                console.log(errors);
                console.log(errorMessage);
                errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    this.setState(errorMessage[key]);
                }
            }
            else {
              //    console.log(result);
                if (this.state.OnClickButton == 'Save') {
                    this.showMsg("Business Details Added Successfully..!!",false)
                  //  await this.setState({Dispalycomp:true});
                    this.PopulateData(this.state.CIDSYS);
                    this.gotoCaseType(false,this.state.CLIENTID, this.state.CIDSYS);

                }
                else if (this.state.OnClickButton == 'Save&Continue') {
                    this.showMsg("Business Details Added Successfully..!!",false)
                    this.gotoCaseType(true,this.state.CLIENTID, this.state.CIDSYS);
                    // this.setCaseId(result.data.CasesAffected[0])
                }

            }

        }
        else {
            this.showMsg("Client Details Must be fill first",true)
        }

    };

    // To create contract
    async ClearContract(){
        await this.setState({
            CIDSYS: this.props.Case_Id,
            CLIENTID: this.props.CLIENTID,
            SERVICETYPE: this.props.SERVICETYP,
            errorCONTACTTYPE:"",
            errorFULLNM:"",
            errorTOTAL:"",
            errorRATEPERH:"",
            errorRATEPERM:"",
            errorMAXH:"",
            errorOTHER:"",
            CONTACTTYPE:"",
            FULLNM:"",
            TOTAL:"",
            RATEPERH:"",
            RATEPERM:"",
            FEE:"",
            OTHER:"",
            CUSTOMCON:"",
        });
    }
    async MailContractfun( subject,mailbody,to,cc,bcc) {
        console.log('MailContractfun')
console.log(subject +"-"+mailbody+"-"+to+"-"+cc+"-"+bcc)
        let tcode="CREATE";
    if(this.state.tcode==='update'){tcode="UPDATE"}
        await this.setState({
          CIDSYS: this.props.Case_Id,
          CLIENTID: this.props.CLIENTID,
          SERVICETYPE: this.props.SERVICETYP,
          errorCONTACTTYPE:"",
          errorFULLNM:"",
          errorTOTAL:"",
          errorRATEPERH:"",
          errorRATEPERM:"",
          errorMAXH:"",
          errorOTHER:""
      });
     
      if (this.props.CLIENTID) {
      
          var result = '', errorMessage = '', errors = [];
          try {
              console.log(await setCRUDParams(tcode, this.props.contractType ,this.state,subject,mailbody,to,cc,bcc))
              result = await execGql('mutation', MailContract, await setCRUDParams(tcode, this.props.contractType ,this.state,subject,mailbody,to,cc,bcc))
          }
          catch (err) {
              errors = err.errorsGql;
              errorMessage = err.errorMessageGql;
            }
          if (!result) {
              console.log(errorMessage)
              errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    this.setState(errorMessage[key]);
                }
          }
          else {
            this.showMsg(result.data.ContractsAffected)
          }
    }
      else {
          this.showMsg("Client Details Must be fill first",true)
      }

  };



    // To Update contract
    async UpdateContract(typeofContract ,inputFieldList) {
        await this.setState({
            // CIDSYS: this.props.Case_Id,
            // CLIENTID: this.props.CLIENTID,
            // SERVICETYPE: this.props.SERVICETYP,
            errorCONTACTTYPE:"",
            errorFULLNM:"",
            errorTOTAL:"",
            errorRATEPERH:"",
            errorRATEPERM:"",
            errorMAXH:"",
            errorOTHER:""
        });
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('mutation', ContractsCRUDOps,  setCRUDParams('UPDATE', typeofContract ,inputFieldList))
            // console.log(result);
        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;

        }

        if (!result) {
            console.log(errors);
            console.log(errorMessage);
            errorMessage = JSON.parse(errorMessage);
                for (let key in errorMessage) {
                    this.setState(errorMessage[key]);
                }
        }
        else {
      //      console.log(result);

            if (this.state.OnClickButton == 'Save') {
                this.showMsg("Business Details Updated Successfully..!!",false);
             //   await this.setState({Dispalycomp:true});
                this.PopulateData(this.state.CIDSYS)
                this.gotoCaseType(false,this.state.CLIENTID, this.state.CIDSYS);
            }
            else if (this.state.OnClickButton == 'Save&Continue') {
                this.showMsg("Customer Details Added Successfully..!!",false);
                this.gotoCaseType(true,this.state.CLIENTID, this.state.CIDSYS);
            }

        }
    };

    


    onChange(evt) {
        //console.log(evt.editor.getData());
        var newContent = evt.editor.getData();
        this.setState({
            contenttext: newContent
        })
    };

    // // Navigate To Case List
    // navigateToCaseList() {
        
    //     if (this.props.isCust) {
    //         return this.props.history.push('/customerdashboard')
    //     }
    //     else {
    //         return this.props.history.push('/Dashboard/Case_main')
    //     }
    // };


    // Navigate To Case List
    navigateToCaseList() {
        
        if (this.props.isCust) {
            return this.props.history.push('/customerdashboard')
        }
        else {
            return this.props.history.push('/cases')
        }
    };

    // CRUD Operations
    CRUD_operation(typeofContract) {

        if (this.state.tcode == 'CREATE') {
            this.CreateContract(typeofContract,this.state)
        }
        else if (this.state.tcode == 'UPDATE') {
            this.UpdateContract(typeofContract,this.state)

        }
    };
    closeMailPopup() {
        this.setState({ showMailPopup: "none" })
    }
// render Component
    render() {
//alert(this.state.custbuttom)
    if (this.state.Dispalycomp) {
            return(
       <div>
                {this.renderContract(this.props.contractType)}
                <div className="row" >
                                    <div className="">
                                        <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.contractType), this.setState({ OnClickButton: "Save&Continue" }) }} >Submit & Continue</button>
                                        <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.contractType), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                      { this.state.DispCKEditor?null: <button className="ui primary button" type="submit" onClick={()=>this.setState({DispCKEditor:true})}>Edit</button>}
                                        <button className="ui  button" type="clear" onClick={()=>this.ClearContract()}>Clear</button>
                                        <button className="ui  button" type="submit" onClick={() => this.navigateToCaseList()}>Cancel</button>
                                        <button className="ui  button" type="submit" onClick={()=>this.gotoCaseType(true,this.props.CLIENTID,this.props.Case_Id,null,null,null,true)}>Skip & Continue</button>
                                        { !this.state.custbuttom ?null:<button className="ui  button" type="submit" onClick={()=>{this.setState({custbuttom:false});this.gotoCustomContract('CUSTOM')}}>Custom Contract</button>}
                                        { this.state.custbuttom ?null:<button className="ui  button" type="submit" 
                                        //onClick={()=>{this.MailContractfun(this.props.contractType)}}
                                        onClick={() => this.setState({ showMailPopup: 'flex', popupmsg: 'Mail sent Successfully.' })}
                                        >Mail Contract</button>}
                                        
                                    </div>
                                </div>
                                <div className="modal" style={{ display: this.state.showMailPopup }} >
                                <div className="modal-content">

                                   {this.state.showMailPopup==='flex'? <Contract_Mail LeadId={this.props.Case_Id} to="" 
                                    iscase={'CASE'}  
                                    FULLNM={this.state.FULLNM}
                                    mailfun={this.MailContractfun}
                                    contractType={this.props.contractType} 
                                    closeMailPopup={this.closeMailPopup} 
                                    showMsg={this.showMsg} />:null
                                    }
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

validateContract(){
    const errorList=[]
    if(this.state.FULLNM.trim().length==0){
        this.setState({errorFULLNM:'required'})

    }
    if(this.state.CONTACTTYPE.trim().length==0){
        this.setState({errorCONTACTTYPE:'required'})
    }
    if(this.state.TOTAL.trim().length==0){
        this.setState({errorTOTAL:'required'})
    }
    if(this.state.RATEPERH.trim().length==0){
        this.setState({errorRATEPERH:'required'})
    }
    if(this.state.RATEPERM.trim().length==0){
        this.setState({errorRATEPERM:'required'})
    }
    if(this.state.OTHER.trim().length==0){
        this.setState({errorOTHER:'required'})
    }
    if(this.state.FEE.trim().length==0){
        this.setState({errorFEE:'required'})
    }
}

    renderContract(contractType)
    {
        if (contractType == "CUSTOM") return this.renderCustom_Contract();
        if (contractType == "ASSET") return this.renderAsset_Contract();
        if(contractType=="PROCESS") return this.renderProcess_Contract();
        if(contractType=="LOCATE") return  this.renderLocate_Contract();
        if (contractType =="INFIDELITY") return this.renderInfidelity_Contract();
    }


    // replaceContent(value)
    // {
    //     var str="",res=""
    //     str=value.replace("<p>", "");
    //     res=str.replace("</p>","")
    //   return res
    // }
    
// render Locate Contract
    renderLocate_Contract()
    {
        return (
            <div className="ui one column grid">
            {/* <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                        <div className="modal-content">
                            <div className="ui icon header">
                                <div className="ui active inverted loader"></div>
                            </div>
                        </div>
                    </div> */}
            <div className="one wide computer one wide tablet one wide mobile row">
            </div>
            <div className="three column row">
                <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                    <div className="ui segment" >
                        <div className="ui form">
                            <div className="ui three column stackable grid">
                        
                            <div className="row" style={{marginLeft: "0px"}} >
                        			<div className=""  >
                        			   <div  style={{width:"94%"}}>
                        			   <div className="panel" style={{padding: "10px"}}>
                        			   
                                <input id="FULLNM" value={this.state.FULLNM} onChange={(e) => this.setState({ FULLNM: e.target.value })} style={{ borderColor: this.state.errorFULLNM ? 'brown' : null, backgroundColor: this.state.errorFULLNM ? '#f3ece7' : null,width: "20%" }} /><label id="errorspan">{this.state.errorFULLNM}</label>,hereinafter referred to as<strong>“CLIENT”</strong> DOES hereby agree to retain the services of Excell Investigation,a private investigative agency, duly licensed under the laws of the state of California, which maintains its Central offices at 8105 East 2 nd Street, Downey, CA, for the purpose of performing the following investigative work:                       		                       		
                        		<br /><br /><textarea rows="2"  value={this.state.CONTACTTYPE} onChange={(e)=>this.setState({CONTACTTYPE:e.target.value})} id="CONTACTTYPE" style={{borderColor: this.state.errorCONTACTTYPE ? 'brown' : null, backgroundColor: this.state.errorCONTACTTYPE ? '#f3ece7' : null,width:"60%"}} />
                        		<label id="errorspan"> {this.state.errorCONTACTTYPE}</label>
                        	    
                        	   <br/> <br/><strong>CLIENT</strong> agrees to pay a retainer for services of Excell Investigations or its agents the sum of <strong>$</strong>
                               <input id="TOTAL" value={this.state.TOTAL}  onChange={(e)=>this.setState({TOTAL:e.target.value})} style={{borderColor: this.state.errorTOTAL ? 'brown' : null, backgroundColor: this.state.errorTOTAL ? '#f3ece7' : null,width:"10%"}} /> 
                               <label id="errorspan">{this.state.errorTOTAL}</label>, the Hourly rate shall be <strong>$</strong>
                               <input id="RATEPERH" value={this.state.RATEPERH}  onChange={(e)=>this.setState({RATEPERH:e.target.value})} style={{borderColor: this.state.errorRATEPERH ? 'brown' : null, backgroundColor: this.state.errorRATEPERH ? '#f3ece7' : null,width:"10%"}} />
                               <label id="errorspan" >{this.state.errorRATEPERH?this.state.errorRATEPERH:null}</label> per hour, plus <strong>$</strong>
                               <input id="RATEPERM" value={this.state.RATEPERM} onChange={(e)=>this.setState({RATEPERM:e.target.value})} style={{borderColor: this.state.errorRATEPERM ? 'brown' : null, backgroundColor: this.state.errorRATEPERM ? '#f3ece7' : null,width:"10%"}}/> 
                               <label id="errorspan">{this.state.errorRATEPERM?this.state.errorRATEPERM:null}</label> per mile.plus actual costs and out-of-pocket expenses. (Unless agreed otherwise in the underline clause below) 
                                                        
                                                 	
                        		<br /><textarea id="OTHER" rows="2"  value={this.state.OTHER} onChange={(e)=>this.setState({OTHER:e.target.value})} style={{borderColor: this.state.errorOTHER ? 'brown' : null, backgroundColor: this.state.errorOTHER ? '#f3ece7' : null,width:"60%"}} />
                        		<label id="errorspan">{this.state.errorOTHER}</label>   
                        		
                        		<br/><br/>In consideration of the forgoing terms, it is understood that <strong>Excell Investigations shall use it best efforts and resources available to locate the subject of the investigation and perform the services for which it is being retained. Excell shall explore all lawful means to assure the best performance and results and to do all necessary, appropriate or advisable in performing said services.  Excell promises to provide all proof of services which may include any of the Following: (written reports, utility searches, video documentation, photographs, skip trace and  information services reports, etc….) to guarantee our thorough and sincere efforts. Excell promise to provide a detailed invoice that outlines all expenses or your money back guarantee…! </strong>It is understood results cannot be guaranteed, compensation to Excell Investigation shall not be based on results. <strong>This Clause is exempt if Client is under the “Guarantee”</strong> Locate<strong> services agreement. </strong>The “Guarantee agreement” pertains to subjects that are locatable in the region the clients advises us to search   
                        		 
                        		 
                        		<br/><br/><strong>In the Event that Excell Investigation is unable or unsuccessful to obtain any information or unable to provide proof of service a complete refund will be issued. </strong>However travel time and information service costs shall not be refunded.
                        		 
                        		 <br/><br/><strong>Excell Investigations agrees to conduct this investigation with due diligence to protect the interests of CLIENT, and agrees that whatever confidential information is obtained while conducting the investigation, will only be given to CLIENT and further agrees to restrict the dissemination of said findings to any third party.</strong>
                        		
                        		<br/><br/>No service shall be rendered by Excell Investigations to CLIENT until such time as the retainer has been paid and this retainer agreement signed. A copy or fax of the retainer agreement will be valid as an original.
                                                                                        	
                        		 <br /><br />Any amounts or expenses incurred above the full retainer fee of $
                                 <input id="FULLNM" value={this.state.FEE} onChange={(e) => this.setState({ FEE: e.target.value })} style={{ borderColor: this.state.errorMAXH ? 'brown' : null, backgroundColor: this.state.errorMAXH ? '#f3ece7' : null,width: "20%" }} /> 
                                 <label id="errorspan">{this.state.errorMAXH}</label> shall be due payable immediately
upon notice. In the event of default in payment of sums due hereunder and if the agreement is placed in the
hand of an attorney at law, small claims, or collection including time spent in court, Excell shall be
compensated at the same rate per hour agreed. This includes but not limited to any reasonable attorney’s
fees. Payments arriving after the due date will be considered late and a service charge of 1.5% per month
(compounded monthly) of the balance due will be charged to the client. Client consents to collection
jurisdiction in the state, or county of Excell Investigation’s Choice.
                        		  
                        		  {/* <br/><br/><strong>Excell Investigations</strong> reserves the right to obtain a current credit report upon receipt of this retainer agreement and subsequently for the purpose of an update or renewal of credit. */}
                        		 
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

                                {/* <div className="row" >
                                    <div className="">
                                        <button className="ui primary button" type="submit"  onClick={() => { this.CRUD_operation(this.props.contractType), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                        <button className="ui primary button" type="submit"  onClick={() => { this.CRUD_operation(this.props.contractType), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                        <button className="ui  button" type="clear" >Clear</button>
                                        <button className="ui  button" type="submit" onClick={()=>this.navigateToCaseList()}>Cancel</button>
                                        <button className="ui  button" type="submit" onClick={()=>this.gotoCaseType(true,this.props.CLIENTID,this.props.Case_Id,null,null,null,true)}>Skip & Continue</button>
                                        <button className="ui  button" type="submit" onClick={()=>this.gotoCustomContract('CUSTOM')}>Custom Contract</button>
                                    </div>
                                </div> */}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="one wide computer one wide tablet one wide mobile column">
                </div>
        </div>
        )
    }



// render Infidelity Contract
    renderInfidelity_Contract()
    {
    
        return (
            <div className="ui one column grid">
            {/* <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                        <div className="modal-content">
                            <div className="ui icon header">
                                <div className="ui active inverted loader"></div>
                            </div>
                        </div>
                    </div> */}
            <div className="one wide computer one wide tablet one wide mobile row">
            </div>
            <div className="three column row">
                <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                    <div className="ui segment" >
                        <div className="ui form">
                            <div className="ui three column stackable grid">
                        
                        	<div className="row" style={{marginLeft: "0px"}} >
                        			<div className="" style={{paddingLeft: "0px"}} >
                        			   <div  style={{width:"94%"}}>
                        			   <div className="panel" style={{paddingLeft: "10px"}}>
                                                    <br /><input id="FULLNM" value={this.state.FULLNM} onChange={(e) => this.setState({ FULLNM: e.target.value })} style={{ borderColor: this.state.errorFULLNM ? 'brown' : null, backgroundColor: this.state.errorFULLNM ? '#f3ece7' : null,width: "20%" }} /> <label id="errorspan" >{this.state.errorFULLNM}</label>, hereinafter referred to as “CLIENT” DOES hereby agree to retain the services of Excell Investigation, a private investigative agency, duly licensed under the laws of the state of California, which maintains its offices at 8105 East 2nd Street, Downey, CA, for the purpose of performing the following investigative work:
                        		<br/><br/><input id="CONTACTTYPE" value={this.state.CONTACTTYPE} onChange={(e)=>this.setState({CONTACTTYPE:e.target.value})} style={{borderColor: this.state.errorCONTACTTYPE ? 'brown' : null, backgroundColor: this.state.errorCONTACTTYPE ? '#f3ece7' : null,width:"60%"}} />
                        		<label id="errorspan" > {this.state.errorCONTACTTYPE}</label>
                        			   
                        	    <br/><br/><strong>CLIENT</strong> agrees to pay a retainer for services of Excell Investigations or its agents the sum of <strong>$</strong>
                                <input id="TOTAL"  value={this.state.TOTAL}  onChange={(e)=>this.setState({TOTAL:e.target.value})} style={{borderColor: this.state.errorTOTAL ? 'brown' : null, backgroundColor: this.state.errorTOTAL ? '#f3ece7' : null,width:"10%"}} /> 
                                <label id="errorspan" className="" >{this.state.errorTOTAL}</label>, the hourly rate shall be<br/><br/> <strong>$</strong>
                                <input id="RATEPERH" value={this.state.RATEPERH} onChange={(e)=>this.setState({RATEPERH:e.target.value})} style={{borderColor: this.state.errorRATEPERH ? 'brown' : null, backgroundColor: this.state.errorRATEPERH ? '#f3ece7' : null,width:"10%"}}/> 
                                <label id="errorspan" className="" >{this.state.errorRATEPERH}</label> per hour plus 
                                <input id="RATEPERM" value={this.state.RATEPERM} onChange={(e)=>this.setState({RATEPERM:e.target.value})} style={{borderColor: this.state.errorRATEPERM ? 'brown' : null, backgroundColor: this.state.errorRATEPERM ? '#f3ece7' : null,width:"10%"}} />
                                <label id="errorspan">{this.state.errorRATEPERM}</label> <strong>per mile</strong>  The balance shall be due payable before the completion of the
case. 
                        		
                        		
                        		<br/><br/>In the event it becomes necessary for and investigator to testify at deposition or in court, Excell Investigations shall be compensated at the same hourly rate for such time, including such actual travel time with a minimum of (5) hours chargeable (unless agreed otherwise in the underline clause below).    
                                                     
                                                    <br /><textarea id="OTHER" rows="2" value={this.state.OTHER} onChange={(e) => this.setState({ OTHER: e.target.value })} style={{ borderColor: this.state.errorOTHER ? 'brown' : null, backgroundColor: this.state.errorOTHER ? '#f3ece7' : null,width: "60%" }} />
                                                    <label id="errorspan">{this.state.errorOTHER}</label> 
                        		 <br/><br/>In consideration of the forgoing terms, it is understood that <strong>Excell Investigations shall use it best efforts to investigate the matters set forth and perform the services for which it is being retained. Excell shall explore all lawful means to assure the best performance and results and to do all necessary, appropriate or advisable in performing said services.  Excell promises to provide all proof of services which may include any of the Following: (written reports, statements, video documentation, photographs, information services reports, etc….) to guarantee our thorough and sincere efforts. Excell promise to provide a detailed invoice that outlines all expenses or your money back guarantee…! </strong>It is understood results cannot be guaranteed, compensation to Excell Investigation shall not be based on results.
                        		 
                        		 <br/><br/><strong>In the Event that Excell Investigation is unable or unsuccessful to obtain any information or unable to provide proof of service a complete refund will be issued.</strong> However out-of-pocket expenses, travel time and information service costs shall not be refunded.
                        		
                        		 <br/><br/><strong>Excell Investigations agrees to conduct this investigation with due diligence to protect the interests of CLIENT, and agrees that whatever confidential information is obtained while conducting the investigation, will only be given to CLIENT and further agrees to restrict the dissemination of said findings to any third party.</strong>
                        		 
                                                    <br /><br />No service shall be rendered by Excell Investigations to CLIENT until such time as the retainer has been paid and this retainer agreement signed. A copy or fax of the retainer agreement will be valid as an original and will  be sent to the CLIENT.
                                               	
                        		<br /><br />Any amounts or expenses incurred above the full retainer amount of $
                                <input id="FULLNM" value={this.state.FEE} onChange={(e) => this.setState({ FEE: e.target.value })} style={{ borderColor: this.state.errorMAXH ? 'brown' : null, backgroundColor: this.state.errorMAXH ? '#f3ece7' : null,width: "20%" }} />
                                <label id="errorspan">{this.state.errorMAXH}</label> balance shall be due payable immediately upon notice. In the event of default in payment of sums due hereunder and if the agreement is placed in the hand of an attorney at law, small claims, or collection including time spent in court, at the same rate per hour agreed. This includes but not limited to any reasonable attorney’s fees. Payments arriving after the due date will be considered late and a service charge of 1.5% per month (compounded monthly) of the balance due will be charged to the client. Client consents to collection jurisdiction in the state, or county of Excell Investigation’s Choice.
                        		
                        		  {/* <br/><br/><strong>Excell Investigations</strong> reserves the right to obtain a current credit report upon receipt of this retainer agreement and subsequently for the purpose of an update or renewal of credit. */}
                        		 
                        		  <br/><br/><strong>Excell Investigations</strong> reserves the right to withhold the release of any information which it develops during the course of the investigation in the event the CLIENT has failed to pay for services rendered and costs incurred.
                        		
                        		  <br/><br/>In the event the CLIENT chooses to pay for services with a visa, MasterCard, pay pal or any other form of charge CLIENT agrees not to dispute any charge with the understanding that this service is simply an attempt to gather information in the said Investigation and that results can never be guaranteed.    
                        		 
                        		  <br/><br/>In the event that CLIENT terminates this agreement, CLIENT agrees that the retainer paid to Excell Investigation shall remain the property of Excell investigation and shall be forfeited by CLIENT. CLIENT further agrees to pay promptly in full all fees for additional services, expenses, mileage or other costs, which exceed the amount of the retainer. Any balance of retainer not used by CLIENT will be applied to future investigations required b the client for a period of five years.
                        		 
                        		  <br/><br/>Excell Investigations does not warrant or guarantee the accuracy or completeness of any information used in the preparation of its reports, CLIENT further agrees to defend, indemnify and hold EXCELL INVESTIGATIONS and/or its agents, associates, and employees harmless from any and all action, courses of action, claims, damages and demands of whatever type arising directly or indirectly from the services EXCELL INVESTIGATIONS are being retained to perform pursuant to this agreement.
                        		 
                        		<br/><br/>This agreement shall be construed in accordance with the laws of the state of California. If any portion of this agreement is determined to be invalid or unenforceable, the remainder of the agreement shall continue in full force and effect. There are no other agreements, express, implied, written, oral or otherwise, except as expressly set forth herein. This Agreement may only by modified in writing signed by both parties.
                        		 
                        		  </div>
                        			   </div>
                        			   <label id="contractError" style={{color: "red"}}></label>
                        			</div>
                        			<input   id="TCode_con" style={{display:"none",width:"100%" }} />
                        		</div>

                                {/* <div className="row">
                                    <div className="">
                                        <button className="ui primary button" type="submit"  onClick={() => { this.CRUD_operation(this.props.contractType), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                        <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.contractType), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                        <button className="ui  button" type="clear" >Clear</button>
                                        <button className="ui  button" type="submit" onClick={()=>this.navigateToCaseList()}>Cancel</button>
                                        <button className="ui  button" type="submit" onClick={()=>this.gotoCaseType(true,this.props.CLIENTID,this.props.Case_Id,null,null,null,true)}>Skip & Continue</button>
                                        <button className="ui  button" type="submit" onClick={()=>this.gotoCustomContract('CUSTOM')}>Custom Contract</button>
                                    </div>
                                </div> */}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="one wide computer one wide tablet one wide mobile column">
                </div>
        </div>
        )
    }

    // render Custom Contract
    renderCustom_Contract()
    {
        // console.log("this.state.DispCKEditor");
        // console.log(this.state.DispCKEditor);
        // console.log("this.state.DispCKEditor");
        
        return (
            <div className="ui one column grid">
            {/* <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                        <div className="modal-content">
                            <div className="ui icon header">
                                <div className="ui active inverted loader"></div>
                            </div>
                        </div>
                    </div> */}
            <div className="three column row">
                <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
                    <div className="ui segment" >
                        <div className="ui form">
                            <div className="ui three column stackable grid">
                              
                                <div className="row" style={{ marginLeft: "0px",display:this.state.DispCKEditor?'flex':'none'}} >
                                    <div className=""  >
                                        <div style={{ width: "94%" }}>
                                            <div className="panel" style={{ padding: "10px" }}>
                                                <CKEditor
                                                    activeClass="p10"
                                                    content={this.state.contenttext}
                                                    events={{ "change": this.onChange }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <label id="errorspan">{this.state.errorCUSTOMCON}</label>
                                    </div>
                                    <input id="TCode_con" style={{ width: "100%", display: "none" }} />
                                </div>
                                {this.state.DispCKEditor?null:<div dangerouslySetInnerHTML={{__html: this.state.contenttext}}/>}
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="one wide computer one wide tablet one wide mobile column">
            </div>
        </div>
        )
    }

// render Process Contract
renderProcess_Contract()
{
return (
    <div className="ui one column grid">
    {/* <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                        <div className="modal-content">
                            <div className="ui icon header">
                                <div className="ui active inverted loader"></div>
                            </div>
                        </div>
                    </div> */}
    <div className="one wide computer one wide tablet one wide mobile row">
    </div>
    <div className="three column row">
        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
            <div className="ui segment" >
                <div className="ui form">
                    <div className="ui three column stackable grid">
                    <div className="row" style={{marginLeft: "0px"}} >
                            <div className="" style={{paddingLeft: "0px"}} >
                               <div  style={{width:"94%"}}>
                               <div className="panel" style={{padding: "10px"}}>
                                            <input id="FULLNM" value={this.state.FULLNM} onChange={(e) => this.setState({ FULLNM: e.target.value })} style={{borderColor: this.state.errorFULLNM ? 'brown' : null, backgroundColor: this.state.errorFULLNM ? '#f3ece7' : null, width: "20%" }} /><label id="errorspan">{this.state.errorFULLNM}</label>, Hereinafter referred to as <strong>“CLIENT”</strong> DOES hereby agree to retain the services of Excell Investigation, a private investigative agency and Registered Process Server, duly licensed under the laws of the state of California, which maintains its Headquarter offices at 8105 East 2nd Street, Downey, CA, for the purpose of performing the following Process service assignment:
                         
                        <br/><br/><textarea rows="2" id="CONTACTTYPE" value={this.state.CONTACTTYPE} onChange={(e)=>this.setState({CONTACTTYPE:e.target.value})}  style={{borderColor: this.state.errorFULLNM ? 'brown' : null, backgroundColor: this.state.errorFULLNM ? '#f3ece7' : null,width:"60%"}} />
                        <label id="errorspan"> {this.state.errorCONTACTTYPE}</label> 
                               
                        <br/><br/><strong>CLIENT</strong> agrees to pay a retainer for services of Excell Investigations or its agents the sum of <strong>$</strong>
                        <input id="TOTAL" value={this.state.TOTAL} onChange={(e)=>this.setState({TOTAL:e.target.value})}  style={{borderColor: this.state.errorTOTAL ? 'brown' : null, backgroundColor: this.state.errorTOTAL ? '#f3ece7' : null,width:"10%"}}/>  
                        <label id="errorspan">{this.state.errorTOTAL}</label>, the Hourly rate shall be <strong>$</strong>
                        <input id="RATEPERH" style={{borderColor: this.state.errorRATEPERH ? 'brown' : null, backgroundColor: this.state.errorRATEPERH ? '#f3ece7' : null,width:"10%"}} value={this.state.RATEPERH} onChange={(e)=>this.setState({RATEPERH:e.target.value})} />
                        <label id="errorspan">{this.state.errorRATEPERH}</label> per hour, plus <strong>$</strong>
                        <input id="RATEPERM" value={this.state.RATEPERM} onChange={(e)=>this.setState({RATEPERM:e.target.value})}  style={{borderColor: this.state.errorRATEPERM ? 'brown' : null, backgroundColor: this.state.errorRATEPERM ? '#f3ece7' : null,width:"10%"}} />
                        <label id="errorspan" >{this.state.errorRATEPERM}</label> 
                        per mile. In the event it becomes necessary for an investigator to testify at deposition or in court, <strong>Excell Investigations </strong>shall be compensated an hourly rate for such time, including such actual travel time with a minimum of 5 hours chargeable (unless agreed otherwise in the underline clause below). 
                                            
                                            <div><br /><textarea id="OTHER" rows="2" value={this.state.OTHER} onChange={(e) => this.setState({ OTHER: e.target.value })} style={{ borderColor: this.state.errorOTHER ? 'brown' : null, backgroundColor: this.state.errorOTHER ? '#f3ece7' : null,width: "60%" }} />
                                            <div><label id="errorspan">{this.state.errorOTHER}</label></div></div>
                                            <br /><br />In consideration of the forgoing terms, it is understood that <strong> Excell Investigations shall use it best efforts to
                    investigate the matters set forth and perform the services for which it is being retained. Excell shall explore
                    all lawful means to assure the best performance and results and to do all necessary, appropriate or
                    advisable in performing said services. Excell promises to provide all proof of services which may include any
                    of the Following: (Proof of service, written reports, statements, video documentation, photographs,
                    information services reports, etc….) to guarantee our thorough and sincere efforts. Excell promise to provide
                     a detailed invoice that outlines all expenses or your money back guarantee…! </strong> It is understood that not all
                                            results can be guaranteed, compensation to Excell Investigation shall not be based on results
                                                                     
                                                                     
                         <br/><br/><strong>In the Event that Excell Investigation is unable or unsuccessful to obtain any information or unable to provide proof of service a complete refund will be issued. </strong>However out-of-pocket expenses, travel time and information service costs shall not be refunded.
                         
                         <br/><br/><strong>Excell Investigations agrees to conduct this investigation with due diligence to protect the interests of CLIENT, and agrees that whatever confidential information is obtained while conducting the Process Service, will only be given to CLIENT and further agrees to restrict the dissemination of said findings to any third party.</strong>
                        
                        
                        <br/><br/>No service shall be rendered by Excell Investigations to CLIENT until such time as the retainer has been paid and this retainer agreement signed. A copy or fax of the retainer agreement will be valid as an original.
                                            
                         <br /><br />Any amounts or expenses incurred above the retainer fee of $<input id="FEE" value={this.state.FEE} onChange={(e) => this.setState({ FEE: e.target.value })} style={{  borderColor: this.state.errorMAXH ? 'brown' : null, backgroundColor: this.state.errorMAXH ? '#f3ece7' : null,width: "20%" }} />
                         <label id="errorspan">{this.state.errorMAXH}</label> shall be due payable immediately upon notice. In the event of default in payment of sums due hereunder and if the agreement is placed in the hand of an attorney at law, small claims, or collection including time spent in court, at the same rate per hour agreed. This includes but not limited to any reasonable attorney’s fees. Payments arriving after the due date will be considered late and a service charge of 1.5% per month (compounded monthly) of the balance due will be charged to the client. Client consents to collection jurisdiction in the state, or county of Excell Investigation’s Choice.
                          
                          <br/><br/><strong>Excell Investigations</strong> reserves the right to obtain a current credit report upon receipt of this retainer agreement and subsequently for the purpose of an update or renewal of credit.
                         
                          <br/><br/><strong>Excell Investigations</strong> reserves the right to withhold the release of Proof of service which it develops during the course of the service in the event the CLIENT has failed to pay for services rendered and costs incurred.
                         
                         <br/><br/>In the event the CLIENT chooses to pay for services with a visa, MasterCard, pay pal or any other form of charge CLIENT agrees not to dispute any charge with the understanding that this service is simply an attempt to Serve document  and that results can never be guaranteed. THIS CLAUSE IS EXEMPT
                         
                         <br/><br/>In the event that CLIENT terminates this agreement, CLIENT agrees that the retainer paid to Excell Investigation shall remain the property of Excell investigation and shall be forfeited by CLIENT. CLIENT further agrees to pay promptly in full all fees for additional services, expenses, mileage or other costs, which exceed the amount of the retainer. Any balance of retainer not used by CLIENT will be applied to future investigations required b the client for a period of five years.
                          
                          <br/><br/>Excell Investigations does not warrant or guarantee the accuracy or completeness of any information used in the preparation of its reports, CLIENT further agrees to defend, indemnify and hold EXCELL INVESTIGATIONS and/or its agents, associates, and employees harmless from any and all action, courses of action, claims, damages and demands of whatever type arising directly or indirectly from the services EXCELL INVESTIGATIONS are being retained to perform pursuant to this agreement.
                          
                          <br/><br/>This agreement shall be construed in accordance with the laws of the state of California. If any portion of this agreement is determined to be invalid or unenforceable, the remainder of the agreement shall continue in full force and effect. There are no other agreements, express, implied, written, oral or otherwise, except as expressly set forth herein. This Agreement may only by modified in writing signed by both parties.
                          </div>
                               </div>
                               <label id="contractError" style={{color: "red"}}></label>
                            </div>
                            <input  id="TCode_con"  style={{width:"100%",display:"none"}}  />
                        </div>


                        {/* <div className="row" >
                            <div className="">
                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.contractType), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.contractType), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                <button className="ui  button" type="clear" >Clear</button>
                                <button className="ui  button" type="submit" onClick={()=>this.navigateToCaseList()}>Cancel</button>
                                <button className="ui  button" type="submit" onClick={()=>this.gotoCaseType(true,this.props.CLIENTID,this.props.Case_Id,null,null,null,true)}>Skip & Continue</button>
                                <button className="ui  button" type="submit" onClick={()=>this.gotoCustomContract('CUSTOM')}>Custom Contract</button>
                            </div>
                        </div> */}
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="one wide computer one wide tablet one wide mobile column">
        </div>
</div>
)
    };
// render Asset Contract 
renderAsset_Contract()
{
return (
    <div className="ui one column grid">
    {/* <div className="modal" style={{ display: this.state.Dispalycomp ? 'flex' : 'none', backgroundColor: "rgba(0, 0, 0, 0.6)" }} >
                        <div className="modal-content">
                            <div className="ui icon header">
                                <div className="ui active inverted loader"></div>
                            </div>
                        </div>
                    </div> */}
    <div className="one wide computer one wide tablet one wide mobile row">
    </div>
    <div className="three column row">
        <div className="sixteen wide computer sixteen wide tablet sixteen wide mobile column">
            <div className="ui segment" >
                <div className="ui form">
                    <div className="ui three column stackable grid">
                    <div className="row" style={{marginLeft: "0px"}} >
                            <div className="" style={{paddingLeft: "0px"}} >
                               <div  style={{width:"94%"}}>
                               <div className="panel" style={{padding: "10px"}}>
                                            <input id="FULLNM" value={this.state.FULLNM} onChange={(e) => this.setState({ FULLNM: e.target.value })}  style={{ borderColor: this.state.errorFULLNM ? 'brown' : null, backgroundColor: this.state.errorFULLNM ? '#f3ece7' : null,width: "20%" }}/><label id="errorspan">{this.state.errorFULLNM}</label>, Hereinafter referred to as <strong>“CLIENT”</strong> DOES hereby agree to retain the services of Excell Investigation, a private investigative agency and Registered Process Server, duly licensed under the laws of the state of California, which maintains its Headquarter offices at 8105 East 2nd Street, Downey, CA, for the purpose of performing the following investigative work: Asset Search:
                         
                        <br/><br/><input  id="CONTACTTYPE" value={this.state.CONTACTTYPE} onChange={(e)=>this.setState({CONTACTTYPE:e.target.value})}  style={{borderColor: this.state.errorCONTACTTYPE ? 'brown' : null, backgroundColor: this.state.errorCONTACTTYPE ? '#f3ece7' : null,width:"60%"}} />
                        <label id="errorspan"> {this.state.errorCONTACTTYPE}</label> 
                               
                        <br/><br/><strong>CLIENT</strong> agrees to pay a retainer for services of Excell Investigations or its agents the sum of <strong>$</strong><input id="TOTAL" value={this.state.TOTAL} onChange={(e)=>this.setState({TOTAL:e.target.value})}  style={{borderColor: this.state.errorTOTAL ? 'brown' : null, backgroundColor: this.state.errorTOTAL ? '#f3ece7' : null,width:"10%"}}/>  <label id="errorspan">{this.state.errorTOTAL}</label>, the Hourly rate shall be <strong>$</strong><input id="RATEPERH" style={{borderColor: this.state.errorRATEPERH ? 'brown' : null, backgroundColor: this.state.errorRATEPERH ? '#f3ece7' : null,width:"10%"}} value={this.state.RATEPERH} onChange={(e)=>this.setState({RATEPERH:e.target.value})} /><label id="errorspan">{this.state.errorRATEPERH}</label> per hour, plus <strong>$</strong><input id="RATEPERM" value={this.state.RATEPERM} onChange={(e)=>this.setState({RATEPERM:e.target.value})}  style={{borderColor: this.state.errorRATEPERM ? 'brown' : null, backgroundColor: this.state.errorRATEPERM ? '#f3ece7' : null,width:"10%"}} /><label id="errorspan" >{this.state.errorRATEPERM}</label> per mile.plus actual costs and out-of-pocket expenses. (Unless
agreed otherwise in the underline clause below)
    <br /><textarea id="OTHER" rows="2"  value={this.state.OTHER} onChange={(e)=>this.setState({OTHER:e.target.value})} style={{borderColor: this.state.errorOTHER ? 'brown' : null, backgroundColor: this.state.errorOTHER ? '#f3ece7' : null,width:"60%"}} />
                        		<label id="errorspan">{this.state.errorOTHER}</label>                                               
                                                              
                        <br /><br />In consideration of the forgoing terms, it is understood that <strong> Excell Investigation shall use it best efforts and
                                        resources available to locate the Legal Assets of the subject and perform the services for which it is being
                                        retained. Excell shall explore all lawful means to assure the best performance and results and to do all
                                        necessary, appropriate or advisable in performing said services. Excell promises to provide all proof of
                                        services which may include any of the Following: (written reports, utility searches, video documentation,
                                        photographs, skip trace and information services reports, etc….) to guarantee our thorough and sincere
                                        efforts. Excell promises to provide a detailed invoice that outlines all expenses or your money back
                                        guarantee…!</strong> It is understood results cannot be guaranteed, compensation to Excell Investigation shall not be
                                            based on results.
                                                                     
                                                                     
                         <br/><br/><strong>In the Event that Excell Investigation is unable or unsuccessful to obtain any information or unable to provide proof of service a complete refund will be issued. </strong>However out-of-pocket expenses, travel time and information service costs shall not be refunded.
                         
                         <br/><br/><strong>Excell Investigations agrees to conduct this investigation with due diligence to protect the interests of CLIENT, and agrees that whatever confidential information is obtained while conducting the Process Service, will only be given to CLIENT and further agrees to restrict the dissemination of said findings to any third party.</strong>
                        
                        
                                            <br /><br />No service shall be rendered by Excell Investigations to CLIENT until such time as the retainer has been paid
                    and this retainer agreement signed. A copy or fax of the retainer agreement will be valid as an original and a
                    copy will be sent to the Client.
                                                                
                         <br /><br />Any amounts or expenses incurred above the final balance of $<input id="FULLNM" value={this.state.FEE} onChange={(e) => this.setState({ FEE: e.target.value })} style={{ borderColor: this.state.errorMAXH ? 'brown' : null, backgroundColor: this.state.errorMAXH ? '#f3ece7' : null,width: "20%" }} /><label id="errorspan">{this.state.errorMAXH}</label> shall be due payable immediately upon
completion of the service. In the event of default in payment of sums due hereunder and if the agreement is
placed in the hand of an attorney at law, small claims, or collection including time spent in court, Excell shall
be compensated at the same rate per hour agreed. This includes but not limited to any reasonable attorney’s
fees. Payments arriving after the due date will be considered late and a service charge of 1.5% per month
(compounded monthly) of the balance due will be charged to the client. Client consents to collection
jurisdiction in the state, or county of Excell Investigation’s Choice.
                          
                          {/* <br/><br/><strong>Excell Investigations</strong> reserves the right to obtain a current credit report upon receipt of this retainer agreement and subsequently for the purpose of an update or renewal of credit. */}
                         
                          <br/><br/><strong>Excell Investigations</strong> reserves the right to withhold the release of any information which it develops during the
course of the investigation in the event the CLIENT has failed to pay for services rendered and costs incurred.
                                           
                         <br /><br />In the event the CLIENT chooses to pay for services with a visa, MasterCard, pay pal or any other form of
                                      charge CLIENT agrees not to dispute any charge with the understanding that this service is simply an attempt
                                      to gather information in the said Investigation and that results can never be guaranteed.
                                                               
                         <br /><br />In the event that CLIENT terminates this agreement, CLIENT agrees that the retainer paid to Excell Investigation
                                      shall remain the property of Excell investigation and shall be forfeited by CLIENT. CLIENT further agrees to pay
                                      promptly in full all fees for additional services, expenses, mileage or other costs, which exceed the amount of
                                      the retainer. CLIENT agrees that any remaining balance will be charged to the payment method available to
                                      EXCELL. Any balance of retainer not used by CLIENT will be applied to future investigations required b the
                                      client for a period of five years.
                                                                
                          <br /><br />Excell Investigations does not warrant or guarantee the accuracy or completeness of any information used in
                                    the preparation of its reports that comes from outside sources, CLIENT further agrees to defend, indemnify
                                    and hold EXCELL INVESTIGATION and/or its agents, associates, and employees harmless from any and all
                                    action, courses of action, claims, damages and demands of whatever type arising directly or indirectly from
                                    the services EXCELL INVESTIGATION are being retained to perform pursuant to this agreement.
                                                              
                          <br /><br />This agreement shall be construed in accordance with the laws of the state of California. If any portion of this
                  agreement is determined to be invalid or unenforceable, the remainder of the agreement shall continue in full
                  force and effect. There are no other agreements, express, implied, written, oral or otherwise, except as
                  expressly set forth herein. This Agreement may only by modified in writing signed by both parties.
                          </div>
                               </div>
                               <label id="contractError" style={{color: "red"}}></label>
                            </div>
                            <input  id="TCode_con"  style={{width:"100%",display:"none"}}  />
                        </div>


                        <div className="row" >
                            {/* <div className="">
                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.contractType), this.setState({ OnClickButton: "Save&Continue" }) }}>Submit & Continue</button>
                                <button className="ui primary button" type="submit" onClick={() => { this.CRUD_operation(this.props.contractType), this.setState({ OnClickButton: "Save" }) }}>Save</button>
                                <button className="ui  button" type="clear" >Clear</button>
                                <button className="ui  button" type="submit" onClick={()=>this.navigateToCaseList()}>Cancel</button>
                                <button className="ui  button" type="submit" onClick={()=>this.gotoCaseType(true,this.props.CLIENTID,this.props.Case_Id,null,null,null,true)}>Skip & Continue</button>
                                <button className="ui  button" type="submit" onClick={()=>this.gotoCustomContract('CUSTOM')}>Custom Contract</button>
                            </div> */}
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="one wide computer one wide tablet one wide mobile column">
        </div>
</div>
)
};   
 

}