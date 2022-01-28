

   export const     setSearchParams= (CaseId) {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CIDSYS": CaseId
        }
        return parameters

    };

    export  const   customContractGetInitialState = () => {
        
        var ret= 
        {
            CLIENTID: "",
            SERVICETYPE: "",
            CIDSYS: "",
            contenttext: "",
            tcode: 'CREATE',
            Dispalycomp: true,
            DispalyBackColor: false,
            OnClickButton: ''
        };
        
    
    
        return ret;
    };


    export const   setCRUDParams = (xnsType,typeofContract,inputFieldList)=> {
        var fieldList= "";
        
        if ( typeofContract=='ASSET_SEARCH')  {fieldList= Custom_ContractGetInputFields(inputFieldList) };

        var parameters = {
            "typeofCase": typeofCase,
            "transaction": xnsType,
            "cases": [
                fieldList
            ]
        }
        return parameters

    };





    export const   contractState = (typeofContract)=> {


        
        if(typeofContract=='CUSTOM' && stateType=='contractGetInitialState' )
        return customContractGetInitialState();
        
        if(typeofContract=='CUSTOM' && stateType=='contractGetResultState' )
        return customContractGetInitialState();




                   };
    


                   export  const   Custom_ContractGetInputFields = (inpFields) => {

                    var ret= 
                    {
                    "CLNT": "1002",
                    "LANG": "EN",
                    "CLIENTID": inpFields.Client_Id,
                    "CASEDT": inpFields.CDATE,
                    "CIDSYS": inpFields.Case_Id,
                    "FRSTNM": inpFields.First_Name,
                    "LSTNM": inpFields.Last_Name,
                    "SPOUSE": inpFields.Spouse,
                    "AKA": inpFields.AKAs,
                    "DOB": this.formatDate(inpFields.DOB),
                    "BUSINESSNM": inpFields.Business_Name,
                    "BUSINESSTYP": inpFields.Type_of_Business,
                    "BUSINESSTXID": inpFields.Business_Tax_ID,
                    "BUSADDRESS": inpFields.Last_Known_Address,
                    "PHONE": inpFields.Phone_Number,
                    "CITY": inpFields.City,
                    "STATE": inpFields.State,
                    "ZIPCD": inpFields.Zip,
                    "RESADDRESS": inpFields.Last_Known_Address1,
                    "PHONE2": inpFields.Phone_Number1,
                    "CITY2": inpFields.City1,
                    "STATE2": inpFields.State1,
                    "ZIPCD2": inpFields.Zip1,
                    "EMPID": inpFields.Employed_By,
                    "ADJADDRESS": inpFields.Employee_Address,
                    "EMPPHONE": inpFields.Phone_Number2,
                    "EMPCITY": inpFields.City2,
                    "EMPSTATE": inpFields.State2,
                    "EMPZIPCD": inpFields.Zip2,
                    "SECURITYSUB": inpFields.Social_Security_Subject,
                    "SECURITYSPOS": inpFields.Social_Security_Spouse,
                    "DRIVERLINCSUB": inpFields.Drivers_License_Subject,
                    "DRIVERLINCSPOS": inpFields.Drivers_License_Spouse,
                    "ACCOUNTS": inpFields.Accounts,
                    "CARBOTVS": inpFields.Carbotvs,
                    "SRCOFINCM": inpFields.Srcofincm,
                    "LANDPRPTY": inpFields.Landprpty,
                    "HIDDENASST": inpFields.HiddenAsset,
                    "BUSSORCORP": inpFields.BusOrCrop,
                    "OTHER": inpFields.Other,
                    "OTHERINFO": inpFields.Otherinfo,
                    "CRTJDGMT": inpFields.Judgement,
                    "HELPRCVRY": inpFields.judgementrecovery,
                    "PRIORITY": inpFields.Priority_Status,
                    "ASSIGNUSER": inpFields.Assign_To
                    }
                
                return ret;
                };



                export  const   Custom_ContractGetResultState = (result) => {

                    var ret= 
                    {  
                        
                        CLIENTID: result.data.contractDetails[0].CLIENTID,
                        SERVICETYPE: result.data.contractDetails[0].SERVICETYPE,
                        CIDSYS: result.data.contractDetails[0].CIDSYS,
                        contenttext: result.data.contractDetails[0].CUSTOMCON,
                        tcode: 'UPDATE',
                            // Dispalycomp: !this.state.Dispalycomp
                        
                        }
                    
                
                
                    return ret;
                };
                