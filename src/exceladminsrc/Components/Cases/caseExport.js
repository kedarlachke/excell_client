export const caseState = (typeofCase, stateType, errorMessage, key) => {

console.log(typeofCase);
console.log(stateType);

    // ASSET_SEARCH

    if (typeofCase == 'ASSET_SEARCH' && stateType == 'caseGetInitialState')
        return Asset_SearchGetInitialState();

    if (typeofCase == 'ASSET_SEARCH' && stateType == 'caseGetResultState')
        return Asset_SearchGetResultState(errorMessage);


    if (typeofCase == 'ASSET_SEARCH' && stateType == 'caseGetErrorState')
        return Asset_SearchGetErrorState(errorMessage, key);

    if (typeofCase == 'ASSET_SEARCH' && stateType == 'caseGetErrorStateInitial')
        return Asset_SearchGetErrorStateInitial();

    if (typeofCase == 'ASSET_SEARCH' && stateType == 'caseGetClearState')
        return Asset_SearchGetClearState();


    if (typeofCase == 'ASSET_SEARCH' && stateType == 'caseGetInputFields')
        return Asset_SearchGetInputFields();


    // CHILD_CUSTODY

    if (typeofCase == 'CHILD_CUSTODY' && stateType == 'caseGetInitialState')
        return Child_CustodyGetInitialState();

    if (typeofCase == 'CHILD_CUSTODY' && stateType == 'caseGetResultState')
        return Child_CustodyGetResultState(errorMessage);


    if (typeofCase == 'CHILD_CUSTODY' && stateType == 'caseGetErrorState')
        return Child_CustodyGetErrorState(errorMessage, key);

    if (typeofCase == 'CHILD_CUSTODY' && stateType == 'caseGetErrorStateInitial')
        return Child_CustodyGetErrorStateInitial();

    if (typeofCase == 'CHILD_CUSTODY' && stateType == 'caseGetClearState')
        return Child_CustodyGetClearState();


    if (typeofCase == 'CHILD_CUSTODY' && stateType == 'caseGetInputFields')
        return Child_CustodyGetInputFields();


    // INFIDELITY

    if (typeofCase == 'INFIDELITY' && stateType == 'caseGetInitialState')
        return InfidelityGetInitialState();

    if (typeofCase == 'INFIDELITY' && stateType == 'caseGetResultState')
        return InfidelityGetResultState(errorMessage);


    if (typeofCase == 'INFIDELITY' && stateType == 'caseGetErrorState')
        return InfidelityGetErrorState(errorMessage, key);

    if (typeofCase == 'INFIDELITY' && stateType == 'caseGetErrorStateInitial')
        return InfidelityGetErrorStateInitial();

    if (typeofCase == 'INFIDELITY' && stateType == 'caseGetClearState')
        return InfidelityGetClearState();


    if (typeofCase == 'INFIDELITY' && stateType == 'caseGetInputFields')
        return InfidelityGetInputFields();


    //LOCATE_PEOPLE

    if (typeofCase == 'LOCATE_PEOPLE' && stateType == 'caseGetInitialState')
        return Locate_PeopleGetInitialState();

    if (typeofCase == 'LOCATE_PEOPLE' && stateType == 'caseGetResultState')
        return Locate_PeopleGetResultState(errorMessage);


    if (typeofCase == 'LOCATE_PEOPLE' && stateType == 'caseGetErrorState')
        return Locate_PeopleGetErrorState(errorMessage, key);

    if (typeofCase == 'LOCATE_PEOPLE' && stateType == 'caseGetErrorStateInitial')
        return Locate_PeopleGetErrorStateInitial();

    if (typeofCase == 'LOCATE_PEOPLE' && stateType == 'caseGetClearState')
        return Locate_PeopleGetClearState();


    if (typeofCase == 'LOCATE_PEOPLE' && stateType == 'caseGetInputFields')
        return Locate_PeopleGetInputFields();


    //	OTHER

    if (typeofCase == 'OTHER_CASE' && stateType == 'caseGetInitialState')
        return OtherGetInitialState();

    if (typeofCase == 'OTHER_CASE' && stateType == 'caseGetResultState')
        return OtherGetResultState(errorMessage);


    if (typeofCase == 'OTHER_CASE' && stateType == 'caseGetErrorState')
        return OtherGetErrorState(errorMessage, key);

    if (typeofCase == 'OTHER_CASE' && stateType == 'caseGetErrorStateInitial')
        return OtherGetErrorStateInitial();

    if (typeofCase == 'OTHER_CASE' && stateType == 'caseGetClearState')
        return OtherGetClearState();


    if (typeofCase == 'OTHER_CASE' && stateType == 'caseGetInputFields')
        return OtherGetInputFields();


    //PROCESS_SERVER

    if (typeofCase == 'PROCESS_SERVER' && stateType == 'caseGetInitialState')
        return Process_ServerGetInitialState();

    if (typeofCase == 'PROCESS_SERVER' && stateType == 'caseGetResultState')
        return Process_ServerGetResultState(errorMessage);


    if (typeofCase == 'PROCESS_SERVER' && stateType == 'caseGetErrorState')
        return Process_ServerGetErrorState(errorMessage, key);

    if (typeofCase == 'PROCESS_SERVER' && stateType == 'caseGetErrorStateInitial')
        return Process_ServerGetErrorStateInitial();

    if (typeofCase == 'PROCESS_SERVER' && stateType == 'caseGetClearState')
        return Process_ServerGetClearState();


    if (typeofCase == 'PROCESS_SERVER' && stateType == 'caseGetInputFields')
        return Process_ServerGetInputFields();



    //WORKERS_COMP

    if (typeofCase == 'WORKERS_COMP' && stateType == 'caseGetInitialState')
        return Workers_CompGetInitialState();

    if (typeofCase == 'WORKERS_COMP' && stateType == 'caseGetResultState')
        return Workers_CompGetResultState(errorMessage);


    if (typeofCase == 'WORKERS_COMP' && stateType == 'caseGetErrorState')
        return Workers_CompGetErrorState(errorMessage, key);

    if (typeofCase == 'WORKERS_COMP' && stateType == 'caseGetErrorStateInitial')
        return Workers_CompGetErrorStateInitial();

    if (typeofCase == 'WORKERS_COMP' && stateType == 'caseGetClearState')
        return Workers_CompGetClearState();


    if (typeofCase == 'WORKERS_COMP' && stateType == 'caseGetInputFields')
        return Workers_CompGetInputFields();

};


export const setCRUDParams = (xnsType, typeofCase, inputFieldList) => {

    var fieldList = "";

    if (typeofCase == 'ASSET_SEARCH') { fieldList = Asset_SearchGetInputFields(inputFieldList) };

    if (typeofCase == 'CHILD_CUSTODY') { fieldList = Child_CustodyGetInputFields(inputFieldList) };

    if (typeofCase == 'INFIDELITY') { fieldList = InfidelityGetInputFields(inputFieldList); };


    if (typeofCase == 'LOCATE_PEOPLE') { fieldList = Locate_PeopleGetInputFields(inputFieldList) };

    if (typeofCase == 'WORKERS_COMP') { fieldList = Workers_CompGetInputFields(inputFieldList) };

    if (typeofCase == 'PROCESS_SERVER') { fieldList = Process_ServerGetInputFields(inputFieldList) };

    if (typeofCase == 'OTHER_CASE') { fieldList = OtherGetInputFields(inputFieldList) };

    var parameters = {
        "typeofCase": typeofCase,
        "transaction": xnsType,
        "cases": [
            fieldList
        ]
    }
    return parameters

};


export const formatDate = (CDate) => {
    if(CDate)
    {
        var year = CDate.slice(0, 4)
    var month = CDate.slice(5, 7)
    var day = CDate.slice(8, 10)
    var date_format = year + month + day
    return date_format
       
    }
    else
    {
        return CDate
    }
}

//......To Convert System Date to yyyymmdd.....//
export const formatSystemDate = () => {
    var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 1).toString();
    month = month.length == 1 ? '0' + month : month;
    var day = date.getDate().toString();
    var date_format = year + month + day
    // console.log(date_format);
    return date_format
}

//..............Date Formate yyyymmdd to mm/dd/yyyy..........
export const formatDate1 = (date) => {

    if(date)
    {
        var year = date.slice(0, 4)
        var month = date.slice(4, 6)
        var day = date.slice(6, 8)
        // "2018-06-03"
        var date_format = year + '-' + month + '-' + day
        //  var date_format = month + '/' + day + '/' + year
        return date_format
        
    }
    else{
        return date
    }
};



export const setDropdownParams = () => {
    var parameters = {
        "CLNT": "1002",
        "LANG": "EN"
    }
    return parameters
}

export const setSearchParams = CaseId => {
    var parameters = {
        "CLNT": "1002",
        "LANG": "EN",
        "CIDSYS": CaseId
    }
    return parameters

};


export const isValidDate = s => {
    var d = new Date(s.substring(0, 4), s.substring(4, 6) - 1, s.substring(6, 8));
    //console.log(s);
    //   console.log(s.substring(0, 4));
    // console.log(s.substring(4, 6));
    // console.log(s.substring(6, 8));
    // console.log(d);
    //console.log(d.getMonth());
    // console.log(d.getMonth());
    return d && d.getMonth() + 1 == s.substring(4, 6);

}


// ASSET_SEARCH GetInitialState
export const Asset_SearchGetInitialState = () => {

    var ret =
    {
        Client_Id: "",
        Case_Id: "",
        First_Name: "",
        Last_Name: "",
        Spouse: "",
        AKAs: "",
        DOB: "",
        Business_Name: "",
        Type_of_Business: "",
        Business_Tax_ID: "",
        Last_Known_Address: "",
        Phone_Number: "",
        City: "",
        State: "",
        Zip: "",
        Last_Known_Address1: "",
        Phone_Number1: "",
        City1: "",
        State1: "",
        Zip1: "",
        Employed_By: "",
        Employee_Address: "",
        Phone_Number2: "",
        City2: "",
        State2: "",
        Zip2: "",
        Social_Security_Subject: "",
        Social_Security_Spouse: "",
        Drivers_License_Subject: "",
        Drivers_License_Spouse: "",

        Accounts: "N",
        Accountschk: false,
        Carbotvs: "N",
        Carbotvschk: false,
        Srcofincm: "N",
        Srcofincmchk: false,
        Landprpty: "N",
        Landprptychk: false,
        HiddenAsset: "N",
        HiddenAssetchk: false,
        BusOrCrop: "N",
        BusOrCropchk: false,
        Other: "N",
        Otherchk: false,
        Otherinfo: "",

        Judgement: "",
        judgementrecovery: "",
        Priority_Status: "",
        Assign_To: "",
        DropdownCasesListArr: [],
        CDATE: formatSystemDate(),
        tcode: 'CREATE',
        Dispalycomp: false,
        //error state
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSPOUSE: "",
        errorAKA: "",
        errorDOB: "",
        errorBUSINESSNM: "",
        errorBUSINESSTYP: "",
        errorBUSINESSTXID: "",
        errorBUSADDRESS: "",
        errorPHONE: "",
        errorCITY: "",
        errorSTATE: "",
        errorZIPCD: "",
        errorRESADDRESS: "",
        errorPHONE2: "",
        errorCITY2: "",
        errorSTATE2: "",
        errorZIPCD2: "",
        errorEMPID: "",
        errorADJADDRESS: "",
        errorEMPPHONE: "",
        errorEMPCITY: "",
        errorEMPSTATE: "",
        errorEMPZIPCD: "",
        errorSECURITYSUB: "",
        errorSECURITYSPOS: "",
        errorDRIVERLINCSUB: "",
        errorDRIVERLINCSPOS: "",
        errorCRTJDGMT: "",
        errorHELPRCVRY: "",
        errorPRIORITY: "",
        errorOTHERINFO: "",
        DispalyBackColor: false,
        OnClickButton: ""
    }


    return ret;
};




// ASSET_SEARCH GetResultState
export const Asset_SearchGetResultState = (result) => {

    var ret =
    {

        Case_Id: result.data.caseDetails[0].CIDSYS,
        Client_Id: result.data.caseDetails[0].CLIENTID,
        Accounts: result.data.caseDetails[0].ACCOUNTS,
        Carbotvs: result.data.caseDetails[0].CARBOTVS,
        Srcofincm: result.data.caseDetails[0].SRCOFINCM,
        Landprpty: result.data.caseDetails[0].LANDPRPTY,
        HiddenAsset: result.data.caseDetails[0].HIDDENASST,
        BusOrCrop: result.data.caseDetails[0].BUSSORCORP,
        Other: result.data.caseDetails[0].OTHER,
        Otherinfo: result.data.caseDetails[0].OTHERINFO,
        First_Name: result.data.caseDetails[0].FRSTNM,
        Last_Name: result.data.caseDetails[0].LSTNM,
        Spouse: result.data.caseDetails[0].SPOUSE,
        AKAs: result.data.caseDetails[0].AKA,
        DOB: formatDate1(result.data.caseDetails[0].DOB),
        Business_Name: result.data.caseDetails[0].BUSINESSNM,
        Type_of_Business: result.data.caseDetails[0].BUSINESSTYP,
        Business_Tax_ID: result.data.caseDetails[0].BUSINESSTXID,
        Last_Known_Address: result.data.caseDetails[0].BUSADDRESS,
        Phone_Number: result.data.caseDetails[0].PHONE,
        City: result.data.caseDetails[0].CITY,
        State: result.data.caseDetails[0].STATE,
        Zip: result.data.caseDetails[0].ZIPCD,
        Last_Known_Address1: result.data.caseDetails[0].RESADDRESS,
        Phone_Number1: result.data.caseDetails[0].PHONE2,
        City1: result.data.caseDetails[0].CITY2,
        State1: result.data.caseDetails[0].STATE2,
        Zip1: result.data.caseDetails[0].ZIPCD2,
        Employed_By: result.data.caseDetails[0].EMPID,
        Employee_Address: result.data.caseDetails[0].ADJADDRESS,
        Phone_Number2: result.data.caseDetails[0].EMPPHONE,
        City2: result.data.caseDetails[0].EMPCITY,
        State2: result.data.caseDetails[0].EMPSTATE,
        Zip2: result.data.caseDetails[0].EMPZIPCD,
        Social_Security_Subject: result.data.caseDetails[0].SECURITYSUB,
        Social_Security_Spouse: result.data.caseDetails[0].SECURITYSPOS,
        Drivers_License_Subject: result.data.caseDetails[0].DRIVERLINCSUB,
        Drivers_License_Spouse: result.data.caseDetails[0].DRIVERLINCSPOS,
        Judgement: result.data.caseDetails[0].CRTJDGMT,
        judgementrecovery: result.data.caseDetails[0].HELPRCVRY,
        Priority_Status: result.data.caseDetails[0].PRIORITY,
        Assign_To: result.data.caseDetails[0].ASSIGNUSER,
        tcode: 'UPDATE',
        Dispalycomp: false
    }

    return ret;
};


//// ASSET_SEARCH GetErrorState

export const Asset_SearchGetErrorState = (errorMessage, key) => {

    var ret =
    {

        errorFRSTNM: errorMessage[key].errorFRSTNM,
        errorLSTNM: errorMessage[key].errorLSTNM,
        errorSPOUSE: errorMessage[key].errorSPOUSE,
        errorAKA: errorMessage[key].errorAKA,
        errorDOB: errorMessage[key].errorDOB,
        errorBUSINESSNM: errorMessage[key].errorBUSINESSNM,
        errorBUSINESSTYP: errorMessage[key].errorBUSINESSTYP,
        errorBUSINESSTXID: errorMessage[key].errorBUSINESSTXID,
        errorBUSADDRESS: errorMessage[key].errorBUSADDRESS,
        errorPHONE: errorMessage[key].errorPHONE,
        errorCITY: errorMessage[key].errorCITY,
        errorSTATE: errorMessage[key].errorSTATE,
        errorZIPCD: errorMessage[key].errorZIPCD,
        errorRESADDRESS: errorMessage[key].errorRESADDRESS,
        errorPHONE2: errorMessage[key].errorPHONE2,
        errorCITY2: errorMessage[key].errorCITY2,
        errorSTATE2: errorMessage[key].errorSTATE2,
        errorZIPCD2: errorMessage[key].errorZIPCD2,
        errorEMPID: errorMessage[key].errorEMPID,
        errorADJADDRESS: errorMessage[key].errorADJADDRESS,
        errorEMPPHONE: errorMessage[key].errorEMPPHONE,
        errorEMPCITY: errorMessage[key].errorEMPCITY,
        errorEMPSTATE: errorMessage[key].errorEMPSTATE,
        errorEMPZIPCD: errorMessage[key].errorEMPZIPCD,
        errorSECURITYSUB: errorMessage[key].errorSECURITYSUB,
        errorSECURITYSPOS: errorMessage[key].errorSECURITYSPOS,
        errorDRIVERLINCSUB: errorMessage[key].errorDRIVERLINCSUB,
        errorDRIVERLINCSPOS: errorMessage[key].errorDRIVERLINCSPOS,
        errorCRTJDGMT: errorMessage[key].errorCRTJDGMT,
        errorHELPRCVRY: errorMessage[key].errorHELPRCVRY,
        errorPRIORITY: errorMessage[key].errorPRIORITY,
        errorOTHERINFO: errorMessage[key].errorOTHERINFO

    }



    return ret;
};


//Asset_SearchGetErrorStateInitial

export const Asset_SearchGetErrorStateInitial = () => {

    var ret =
    {

        errorFRSTNM: "",
        errorLSTNM: "",
        errorSPOUSE: "",
        errorAKA: "",
        errorDOB: "",
        errorBUSINESSNM: "",
        errorBUSINESSTYP: "",
        errorBUSINESSTXID: "",
        errorBUSADDRESS: "",
        errorPHONE: "",
        errorCITY: "",
        errorSTATE: "",
        errorZIPCD: "",
        errorRESADDRESS: "",
        errorPHONE2: "",
        errorCITY2: "",
        errorSTATE2: "",
        errorZIPCD2: "",
        errorEMPID: "",
        errorADJADDRESS: "",
        errorEMPPHONE: "",
        errorEMPCITY: "",
        errorEMPSTATE: "",
        errorEMPZIPCD: "",
        errorSECURITYSUB: "",
        errorSECURITYSPOS: "",
        errorDRIVERLINCSUB: "",
        errorDRIVERLINCSPOS: "",
        errorCRTJDGMT: "",
        errorHELPRCVRY: "",
        errorPRIORITY: "",


    }





    return ret;
};


//Asset_SearchGetClearState
export const Asset_SearchGetClearState = () => {

    var ret =
    {
        First_Name: "",
        Last_Name: "",
        Spouse: "",
        AKAs: "",
        DOB: "",
        Business_Name: "",
        Type_of_Business: "",
        Business_Tax_ID: "",
        Last_Known_Address: "",
        Phone_Number: "",
        City: "",
        State: "",
        Zip: "",
        Last_Known_Address1: "",
        Phone_Number1: "",
        City1: "",
        State1: "",
        Zip1: "",
        Employed_By: "",
        Employee_Address: "",
        Phone_Number2: "",
        City2: "",
        State2: "",
        Zip2: "",
        Social_Security_Subject: "",
        Social_Security_Spouse: "",
        Drivers_License_Subject: "",
        Drivers_License_Spouse: "",
        Accounts: "N",
        Carbotvs: "N",
        Srcofincm: "N",
        Landprpty: "N",
        HiddenAsset: "N",
        BusOrCrop: "N",
        Other: "N",
        Otherinfo: "",
        Judgement: "",
        judgementrecovery: "",
        Priority_Status: "",
        Assign_To: "",

        //error state
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSPOUSE: "",
        errorAKA: "",
        errorDOB: "",
        errorBUSINESSNM: "",
        errorBUSINESSTYP: "",
        errorBUSINESSTXID: "",
        errorBUSADDRESS: "",
        errorPHONE: "",
        errorCITY: "",
        errorSTATE: "",
        errorZIPCD: "",
        errorRESADDRESS: "",
        errorPHONE2: "",
        errorCITY2: "",
        errorSTATE2: "",
        errorZIPCD2: "",
        errorEMPID: "",
        errorADJADDRESS: "",
        errorEMPPHONE: "",
        errorEMPCITY: "",
        errorEMPSTATE: "",
        errorEMPZIPCD: "",
        errorSECURITYSUB: "",
        errorSECURITYSPOS: "",
        errorDRIVERLINCSUB: "",
        errorDRIVERLINCSPOS: "",
        errorCRTJDGMT: "",
        errorHELPRCVRY: "",
        errorPRIORITY: "",
    }

    return ret;
};


//Asset_SearchGetInputFields
export const Asset_SearchGetInputFields = (inpFields) => {

    var ret =
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
        "DOB": formatDate(inpFields.DOB),
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


// Child_Custody GetInitialState
export const Child_CustodyGetInitialState = () => {

    var ret =
    {
        Client_Id: "",
        Case_Id: "",
        CaseDt: formatSystemDate(),
        SurveillanceStartdate: "",
        SurveillanceEnddate: "",
        GPSNeeded: "",
        ActionYouAreLookingFor: "",
        DaysForSurveillanceToBeConducted: "",
        PermissionToMoveForward: "",
        ConductedAnySurveillanceOnTheSubject: "",
        PermissionToGoBeyondTheAllowedTime: "",
        BudgetfortheInvestigation: "",
        HearAboutUs: "",

        First_Name: "",
        Last_Name: "",
        Sex: "",
        Age: "",
        Race: "",
        Height: "",
        Weight: "",
        Hair_Color: "",
        Residence_Address: "",
        Business_Address: "",

        LicensePlate: "",
        Make: "",
        Model: "",
        Description: "",
        CustodySituation: "",
        NegativeThingsSubjectInvolved: "",
        Priority_Status: "",
        Assign_To: "",
        tcode: "CREATE",
        Dispalycomp: false,
        DropdownCasesListArr: [],

        //errorspan
        errorSURSTARTDT: "",
        errorSURENDDT: "",
        errorISGPSNEEDED: "",
        errorACTIONDETAILS: "",

        errorISIFTWOINVESTIGATORS: "",
        errorISPREVIOUSSUR: "",
        errorISBEYONDTMACTIVE: "",
        errorBUDGET: "",

        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",

        errorLICENSEPLATE: "",
        errorCMAKE: "",
        errorCMODEL: "",
        errorCDESCRIPTION: "",
        errorEXPCUSTSITUATION: "",
        errorEXPNEGSUBINVOLVE: "",
        errorPRIORITY: "",

        errorBUSADDRESS: "",
        errorRESADDRESS: "",
        errorHEARABOUTUS: "",
        errorHEIGHT: "",
        errorWEIGHT: "",
        errorRACE: "",
        errorHAIRCOLOR: "",

        DispalyBackColor: false,
        OnClickButton: ''
    }
    return ret;
};


// Child_Custody GetResultState
export const Child_CustodyGetResultState = (result) => {

    var ret =
    {

        Case_Id: result.data.caseDetails[0].CIDSYS,
        Client_Id: result.data.caseDetails[0].CLIENTID,
        SurveillanceStartdate: formatDate1(result.data.caseDetails[0].SURSTARTDT),
        SurveillanceEnddate: formatDate1(result.data.caseDetails[0].SURENDDT),
        GPSNeeded: result.data.caseDetails[0].ISGPSNEEDED,
        ActionYouAreLookingFor: result.data.caseDetails[0].ACTIONDETAILS,
        DaysForSurveillanceToBeConducted: result.data.caseDetails[0].DAYSFORSUR,
        PermissionToMoveForward: result.data.caseDetails[0].ISIFTWOINVESTIGATORS,
        ConductedAnySurveillanceOnTheSubject: result.data.caseDetails[0].ISPREVIOUSSUR,
        PermissionToGoBeyondTheAllowedTime: result.data.caseDetails[0].ISBEYONDTMACTIVE,
        BudgetfortheInvestigation: result.data.caseDetails[0].BUDGET,
        HearAboutUs: result.data.caseDetails[0].HEARABOUTUS,

        First_Name: result.data.caseDetails[0].FRSTNM,
        Last_Name: result.data.caseDetails[0].LSTNM,
        Sex: result.data.caseDetails[0].SEX,
        Age: result.data.caseDetails[0].AGE,
        Race: result.data.caseDetails[0].RACE,
        Height: result.data.caseDetails[0].HEIGHT,
        Weight: result.data.caseDetails[0].WEIGHT,
        Hair_Color: result.data.caseDetails[0].HAIRCOLOR,
        Residence_Address: result.data.caseDetails[0].RESADDRESS,
        Business_Address: result.data.caseDetails[0].BUSADDRESS,

        LicensePlate: result.data.caseDetails[0].LICENSEPLATE,
        Make: result.data.caseDetails[0].CMAKE,
        Model: result.data.caseDetails[0].CMODEL,
        Description: result.data.caseDetails[0].CDESCRIPTION,
        CustodySituation: result.data.caseDetails[0].EXPCUSTSITUATION,
        NegativeThingsSubjectInvolved: result.data.caseDetails[0].EXPNEGSUBINVOLVE,

        Priority_Status: result.data.caseDetails[0].PRIORITY,
        Assign_To: result.data.caseDetails[0].ASSIGNUSER,
        tcode: 'UPDATE',
        Dispalycomp: false

    }



    return ret;
};


// Child_Custody GetErrorState

export const Child_CustodyGetErrorState = (errorMessage, key) => {

    var ret =
    {

        errorSURSTARTDT: errorMessage[key].errorSURSTARTDT,
        errorSURENDDT: errorMessage[key].errorSURENDDT,
        errorISGPSNEEDED: errorMessage[key].errorISGPSNEEDED,
        errorACTIONDETAILS: errorMessage[key].errorACTIONDETAILS,

        errorISIFTWOINVESTIGATORS: errorMessage[key].errorISIFTWOINVESTIGATORS,
        errorISPREVIOUSSUR: errorMessage[key].errorISPREVIOUSSUR,
        errorISBEYONDTMACTIVE: errorMessage[key].errorISBEYONDTMACTIVE,
        errorBUDGET: errorMessage[key].errorBUDGET,

        errorFRSTNM: errorMessage[key].errorFRSTNM,
        errorLSTNM: errorMessage[key].errorLSTNM,
        errorSEX: errorMessage[key].errorSEX,

        errorLICENSEPLATE: errorMessage[key].errorLICENSEPLATE,
        errorCMAKE: errorMessage[key].errorCMAKE,
        errorCMODEL: errorMessage[key].errorCMODEL,
        errorCDESCRIPTION: errorMessage[key].errorCDESCRIPTION,

        errorEXPCUSTSITUATION: errorMessage[key].errorEXPCUSTSITUATION,
        errorEXPNEGSUBINVOLVE: errorMessage[key].errorEXPNEGSUBINVOLVE,
        errorPRIORITY: errorMessage[key].errorPRIORITY,

        errorBUSADDRESS: errorMessage[key].errorBUSADDRESS,
        errorRESADDRESS: errorMessage[key].errorRESADDRESS,
        errorHEARABOUTUS: errorMessage[key].errorHEARABOUTUS,
        errorHEIGHT: errorMessage[key].errorHEIGHT,
        errorWEIGHT: errorMessage[key].errorWEIGHT,
        errorRACE: errorMessage[key].errorRACE,
        errorHAIRCOLOR: errorMessage[key].errorHAIRCOLOR

    }

    return ret;
};


//Child_Custody GetErrorStateInitial

export const Child_CustodyGetErrorStateInitial = () => {

    var ret =
    {

        errorSURSTARTDT: "",
        errorSURENDDT: "",
        errorISGPSNEEDED: "",
        errorACTIONDETAILS: "",

        errorISIFTWOINVESTIGATORS: "",
        errorISPREVIOUSSUR: "",
        errorISBEYONDTMACTIVE: "",
        errorBUDGET: "",

        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",

        errorLICENSEPLATE: "",
        errorCMAKE: "",
        errorCMODEL: "",
        errorCDESCRIPTION: "",
        errorEXPCUSTSITUATION: "",
        errorEXPNEGSUBINVOLVE: "",
        errorPRIORITY: "",

        errorBUSADDRESS: "",
        errorRESADDRESS: "",
        errorHEARABOUTUS: "",
        errorHEIGHT: "",
        errorWEIGHT: "",
        errorRACE: "",
        errorHAIRCOLOR: "",

    }
    return ret;

};


//Child_Custody GetClearState

export const Child_CustodyGetClearState = () => {

    var ret =
    {
        SurveillanceStartdate: "",
        SurveillanceEnddate: "",
        GPSNeeded: "",
        ActionYouAreLookingFor: "",
        DaysForSurveillanceToBeConducted: "",
        PermissionToMoveForward: "",
        ConductedAnySurveillanceOnTheSubject: "",
        PermissionToGoBeyondTheAllowedTime: "",
        BudgetfortheInvestigation: "",
        HearAboutUs: "",

        First_Name: "",
        Last_Name: "",
        Sex: "",
        Age: "",
        Race: "",
        Height: "",
        Weight: "",
        Hair_Color: "",
        Residence_Address: "",
        Business_Address: "",

        LicensePlate: "",
        Make: "",
        Model: "",
        Description: "",
        CustodySituation: "",
        NegativeThingsSubjectInvolved: "",
        Priority_Status: "",
        Assign_To: "",

        errorSURSTARTDT: "",
        errorSURENDDT: "",
        errorISGPSNEEDED: "",
        errorACTIONDETAILS: "",

        errorISIFTWOINVESTIGATORS: "",
        errorISPREVIOUSSUR: "",
        errorISBEYONDTMACTIVE: "",
        errorBUDGET: "",

        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",

        errorLICENSEPLATE: "",
        errorCMAKE: "",
        errorCMODEL: "",
        errorCDESCRIPTION: "",
        errorEXPCUSTSITUATION: "",
        errorEXPNEGSUBINVOLVE: "",
        errorPRIORITY: "",
    }

    return ret;
};


// Child_Custody GetInputFields 
export const Child_CustodyGetInputFields = (inpFields) => {

    var ret =
    {
        "CLNT": "1002",
        "LANG": "EN",
        "CASEDT": inpFields.CaseDt,
        "CIDSYS": inpFields.Case_Id,
        "CLIENTID": inpFields.Client_Id,
        "SURSTARTDT": formatDate(inpFields.SurveillanceStartdate),
        "SURENDDT": formatDate(inpFields.SurveillanceEnddate),
        "ISGPSNEEDED": inpFields.GPSNeeded,
        "ACTIONDETAILS": inpFields.ActionYouAreLookingFor,
        "DAYSFORSUR": inpFields.DaysForSurveillanceToBeConducted,
        "ISIFTWOINVESTIGATORS": inpFields.PermissionToMoveForward,
        "ISPREVIOUSSUR": inpFields.ConductedAnySurveillanceOnTheSubject,
        "ISBEYONDTMACTIVE": inpFields.PermissionToGoBeyondTheAllowedTime,
        "BUDGET": inpFields.BudgetfortheInvestigation,
        "HEARABOUTUS": inpFields.HearAboutUs,

        //Subject Information
        "FRSTNM": inpFields.First_Name,
        "LSTNM": inpFields.Last_Name,
        "SEX": inpFields.Sex,
        "AGE": inpFields.Age,
        "RACE": inpFields.Race,
        "HEIGHT": inpFields.Height,
        "WEIGHT": inpFields.Weight,
        "HAIRCOLOR": inpFields.Hair_Color,
        "RESADDRESS": inpFields.Residence_Address,
        "BUSADDRESS": inpFields.Business_Address,

        //Vehicle Info
        "LICENSEPLATE": inpFields.LicensePlate,
        "CMAKE": inpFields.Make,
        "CMODEL": inpFields.Model,
        "CDESCRIPTION": inpFields.Description,

        "EXPCUSTSITUATION": inpFields.CustodySituation,
        "EXPNEGSUBINVOLVE": inpFields.NegativeThingsSubjectInvolved,

        "PRIORITY": inpFields.Priority_Status,
        "ASSIGNUSER": inpFields.Assign_To,

        //extra
        "LTDTTOSERV": inpFields.CaseDt
    }

    return ret;
};



// Infidelity GetInitialState
export const InfidelityGetInitialState = () => {

    var ret =
    {
        Client_Id: "",
        Case_Id: "",
        Surveillance_Start_Date: "",
        Surveillance_End_Date: "",
        GPS: "",
        Action: "",
        Surveillance: "",
        Permission_To_Move_Forward: "",
        Surveillance_On_The_Subject: "",
        Permission_To_Go_Beyond_The_Allowed_Time: "",
        Budget: "",
        Aboutus: "",

        First_Name: "",
        Last_Name: "",
        Sex: "",
        Age: "",
        Race: "",
        Height: "",
        Weight: "",
        Hair_Color: "",
        Residence_Address: "",
        Business_Address: "",

        License_Plate: "",
        Make: "",
        Model: "",
        Description: "",
        Priority_Status: "",
        Assign_To: "",
        CDATE: formatSystemDate(),
        DropdownCasesListArr: [],
        tcode: 'CREATE',
        Dispalycomp: false,

        //error state

        errorSURSTARTDT: "",
        errorSURENDDT: "",
        errorISGPSNEEDED: "",
        errorACTIONDETAILS: "",
        errorDAYSFORSUR: "",
        errorISIFTWOINVESTIGATORS: "",
        errorISPREVIOUSSUR: "",
        errorISBEYONDTMACTIVE: "",
        errorBUDGET: "",
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",
        errorLICENSEPLATE: "",
        errorCMAKE: "",
        errorCMODEL: "",
        errorCDESCRIPTION: "",
        errorPRIORITY: "",
        errorBUSADDRESS: "",
        errorHAIRCOLOR: "",
        errorHEARABOUTUS: "",
        errorHEIGHT: "",
        errorRACE: "",
        errorRESADDRESS: "",
        errorWEIGHT: "",
        DispalyBackColor: false,
        OnClickButton: ''
    }

    return ret;
};

// Infidelity GetResultState
export const InfidelityGetResultState = (result) => {

    var ret =
    {

        Case_Id: result.data.caseDetails[0].CIDSYS,
        Client_Id: result.data.caseDetails[0].CLIENTID,
        Surveillance_Start_Date: formatDate1(result.data.caseDetails[0].SURSTARTDT),
        Surveillance_End_Date: formatDate1(result.data.caseDetails[0].SURENDDT),
        GPS: result.data.caseDetails[0].ISGPSNEEDED,
        Action: result.data.caseDetails[0].ACTIONDETAILS,
        Surveillance: result.data.caseDetails[0].DAYSFORSUR,
        Permission_To_Move_Forward: result.data.caseDetails[0].ISIFTWOINVESTIGATORS,
        Surveillance_On_The_Subject: result.data.caseDetails[0].ISPREVIOUSSUR,
        Permission_To_Go_Beyond_The_Allowed_Time: result.data.caseDetails[0].ISBEYONDTMACTIVE,
        Budget: result.data.caseDetails[0].BUDGET,
        Aboutus: result.data.caseDetails[0].HEARABOUTUS,

        First_Name: result.data.caseDetails[0].FRSTNM,
        Last_Name: result.data.caseDetails[0].LSTNM,
        Sex: result.data.caseDetails[0].SEX,
        Age: result.data.caseDetails[0].AGE,
        Race: result.data.caseDetails[0].RACE,
        Height: result.data.caseDetails[0].HEIGHT,
        Weight: result.data.caseDetails[0].WEIGHT,
        Hair_Color: result.data.caseDetails[0].HAIRCOLOR,
        Residence_Address: result.data.caseDetails[0].RESADDRESS,
        Business_Address: result.data.caseDetails[0].BUSADDRESS,

        License_Plate: result.data.caseDetails[0].LICENSEPLATE,
        Make: result.data.caseDetails[0].CMAKE,
        Model: result.data.caseDetails[0].CMODEL,
        Description: result.data.caseDetails[0].CDESCRIPTION,

        Priority_Status: result.data.caseDetails[0].PRIORITY,
        Assign_To: result.data.caseDetails[0].ASSIGNUSER,
        tcode: 'UPDATE',
         Dispalycomp: false
    }

    return ret;
};


// Infidelity GetErrorState

export const InfidelityGetErrorState = (errorMessage, key) => {

    var ret =
    {

        errorSURSTARTDT: errorMessage[key].errorSURSTARTDT,
        errorSURENDDT: errorMessage[key].errorSURENDDT,
        errorISGPSNEEDED: errorMessage[key].errorISGPSNEEDED,
        errorACTIONDETAILS: errorMessage[key].errorACTIONDETAILS,
        errorDAYSFORSUR: errorMessage[key].errorDAYSFORSUR,
        errorISIFTWOINVESTIGATORS: errorMessage[key].errorISIFTWOINVESTIGATORS,
        errorISPREVIOUSSUR: errorMessage[key].errorISPREVIOUSSUR,
        errorISBEYONDTMACTIVE: errorMessage[key].errorISBEYONDTMACTIVE,
        errorBUDGET: errorMessage[key].errorBUDGET,
        errorFRSTNM: errorMessage[key].errorFRSTNM,
        errorLSTNM: errorMessage[key].errorLSTNM,
        errorSEX: errorMessage[key].errorSEX,
        errorLICENSEPLATE: errorMessage[key].errorLICENSEPLATE,
        errorCMAKE: errorMessage[key].errorCMAKE,
        errorCMODEL: errorMessage[key].errorCMODEL,
        errorCDESCRIPTION: errorMessage[key].errorCDESCRIPTION,
        errorPRIORITY: errorMessage[key].errorPRIORITY,
        errorBUSADDRESS: errorMessage[key].errorBUSADDRESS,
        errorHAIRCOLOR: errorMessage[key].errorHAIRCOLOR,
        errorHEARABOUTUS: errorMessage[key].errorHEARABOUTUS,
        errorHEIGHT: errorMessage[key].errorHEIGHT,
        errorRACE: errorMessage[key].errorRACE,
        errorRESADDRESS: errorMessage[key].errorRESADDRESS,
        errorWEIGHT: errorMessage[key].errorWEIGHT

    }

    return ret;
};


//Infidelity GetErrorStateInitial

export const InfidelityGetErrorStateInitial = () => {

    var ret =
    {

        errorSURSTARTDT: "",
        errorSURENDDT: "",
        errorISGPSNEEDED: "",
        errorACTIONDETAILS: "",
        errorDAYSFORSUR: "",
        errorISIFTWOINVESTIGATORS: "",
        errorISPREVIOUSSUR: "",
        errorISBEYONDTMACTIVE: "",
        errorBUDGET: "",
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",
        errorLICENSEPLATE: "",
        errorCMAKE: "",
        errorCMODEL: "",
        errorCDESCRIPTION: "",
        errorPRIORITY: "",
        errorBUSADDRESS: "",
        errorHAIRCOLOR: "",
        errorHEARABOUTUS: "",
        errorHEIGHT: "",
        errorRACE: "",
        errorRESADDRESS: "",
        errorWEIGHT: ""

    }
    return ret;

};


// Infidelity GetClearState 

export const InfidelityGetClearState = () => {

    var ret =
    {
        Surveillance_Start_Date: "",
        Surveillance_End_Date: "",
        GPS: "",
        Action: "",
        Surveillance: "",
        Permission_To_Move_Forward: "",
        Surveillance_On_The_Subject: "",
        Permission_To_Go_Beyond_The_Allowed_Time: "",
        Budget: "",
        Aboutus: "",
        First_Name: "",
        Last_Name: "",
        Sex: "",
        Age: "",
        Race: "",
        Height: "",
        Weight: "",
        Hair_Color: "",
        Residence_Address: "",
        Business_Address: "",
        License_Plate: "",
        Make: "",
        Model: "",
        Description: "",
        Priority_Status: "",
        Assign_To: "",
        //error state
        errorSURSTARTDT: "",
        errorSURENDDT: "",
        errorISGPSNEEDED: "",
        errorACTIONDETAILS: "",
        errorDAYSFORSUR: "",
        errorISIFTWOINVESTIGATORS: "",
        errorISPREVIOUSSUR: "",
        errorISBEYONDTMACTIVE: "",
        errorBUDGET: "",
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",
        errorLICENSEPLATE: "",
        errorCMAKE: "",
        errorCMODEL: "",
        errorCDESCRIPTION: "",
        errorPRIORITY: ""
    }

    return ret;
};


// Infidelity GetInputFields
export const InfidelityGetInputFields = (inpFields) => {

    var ret =
    {
        "CLNT": "1002",
        "LANG": "EN",
        "CASEDT": inpFields.CDATE,
        "CIDSYS": inpFields.Case_Id,
        "CLIENTID": inpFields.Client_Id,
        "SURSTARTDT": formatDate(inpFields.Surveillance_Start_Date),
        "SURENDDT": formatDate(inpFields.Surveillance_End_Date),
        "ISGPSNEEDED": inpFields.GPS,
        "ACTIONDETAILS": inpFields.Action,
        "DAYSFORSUR": inpFields.Surveillance,
        "ISIFTWOINVESTIGATORS": inpFields.Permission_To_Move_Forward,
        "ISPREVIOUSSUR": inpFields.Surveillance_On_The_Subject,
        "ISBEYONDTMACTIVE": inpFields.Permission_To_Go_Beyond_The_Allowed_Time,
        "BUDGET": inpFields.Budget,
        "HEARABOUTUS": inpFields.Aboutus,
        "FRSTNM": inpFields.First_Name,
        "LSTNM": inpFields.Last_Name,
        "SEX": inpFields.Sex,
        "AGE": inpFields.Age,
        "RACE": inpFields.Race,
        "HEIGHT": inpFields.Height,
        "WEIGHT": inpFields.Weight,
        "HAIRCOLOR": inpFields.Hair_Color,
        "RESADDRESS": inpFields.Residence_Address,
        "BUSADDRESS": inpFields.Business_Address,
        "LICENSEPLATE": inpFields.License_Plate,
        "CMAKE": inpFields.Make,
        "CMODEL": inpFields.Model,
        "CDESCRIPTION": inpFields.Description,
        "PRIORITY": inpFields.Priority_Status,
        "ASSIGNUSER": inpFields.Assign_To,
        "LTDTTOSERV": inpFields.CDATE
    }

    return ret;
};

//PROCESS_SERVER

// PROCESS_SERVER GetInitialState
export const Process_ServerGetInitialState = () => {

    var ret =
    {
        Client_Id: "",
        Case_Id: "",
        Date: "",
        Court: "",
        File: "",
        Last_Date_To_Serve: "",
        Type: "",
        Hearing_Set_For: "",
        AT: "",
        Department: "",
        Miscellaneous_Instructions: "",
        First_Name: "",
        Last_Name: "",
        Sex: "",
        Age: "",
        Race: "",
        Height: "",
        Weight: "",
        Hair_Color: "",
        Residence_Address: "",
        Business_Address: "",
        Best_Time_To_Serve: "",
        Hours_Of_Work: "",
        Please_Make_Attempt_At: "",
        Priority_Status: "",
        Assign_To: "",
        DropdownCasesListArr: [],
        tcode: 'CREATE',
        Dispalycomp: false,
        // error state

        errorCASEDT: "",
        errorCOURTNM: "",
        errorFILENO: "",
        errorLTDTTOSERV: "",
        errorTYPE: "",
        errorAT: "",
        errorDEPT: "",
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",
        errorBTTMTOSERV: "",
        errorHOURSOFWK: "",
        errorPLMKATTPAT: "",
        errorPRIORITY: "",

        errorHEIGHT:"",
        errorHAIRCOLOR:"",
        errorWEIGHT:"",
        errorRACE:"",
        errorHEARINGSETFOR:"",

        DispalyBackColor: false,
        OnClickButton: '',

    }



    return ret;
};




// PROCESS_SERVER GetResultState
export const Process_ServerGetResultState = (result) => {

    var ret =
    {

        Case_Id: result.data.caseDetails[0].CIDSYS,
        Client_Id: result.data.caseDetails[0].CLIENTID,
        Date: formatDate1(result.data.caseDetails[0].CASEDT),
        Court: result.data.caseDetails[0].COURTNM,
        File: result.data.caseDetails[0].FILENO,
        Last_Date_To_Serve: formatDate1(result.data.caseDetails[0].LTDTTOSERV),
        Type: result.data.caseDetails[0].TYPE,
        Hearing_Set_For: result.data.caseDetails[0].HEARINGSETFOR,
        AT: result.data.caseDetails[0].AT,
        Department: result.data.caseDetails[0].DEPT,
        Miscellaneous_Instructions: result.data.caseDetails[0].MISCELIST,

        First_Name: result.data.caseDetails[0].FRSTNM,
        Last_Name: result.data.caseDetails[0].LSTNM,
        Sex: result.data.caseDetails[0].SEX,
        Age: result.data.caseDetails[0].AGE,
        Race: result.data.caseDetails[0].RACE,
        Height: result.data.caseDetails[0].HEIGHT,
        Weight: result.data.caseDetails[0].WEIGHT,
        Hair_Color: result.data.caseDetails[0].HAIRCOLOR,
        Residence_Address: result.data.caseDetails[0].RESADDRESS,
        Business_Address: result.data.caseDetails[0].BUSADDRESS,

        Best_Time_To_Serve: result.data.caseDetails[0].BTTMTOSERV,
        Hours_Of_Work: result.data.caseDetails[0].HOURSOFWK,
        Please_Make_Attempt_At: result.data.caseDetails[0].PLMKATTPAT,
        Priority_Status: result.data.caseDetails[0].PRIORITY,
        Assign_To: result.data.caseDetails[0].ASSIGNUSER,
        tcode: 'UPDATE',
        Dispalycomp: false
    }

    return ret;
};


//// PROCESS_SERVER GetErrorState

export const Process_ServerGetErrorState = (errorMessage, key) => {

    var ret =
    {

        errorCASEDT: errorMessage[key].errorCASEDT,
        errorCOURTNM: errorMessage[key].errorCOURTNM,
        errorFILENO: errorMessage[key].errorFILENO,
        errorLTDTTOSERV: errorMessage[key].errorLTDTTOSERV,
        errorTYPE: errorMessage[key].errorTYPE,
        errorAT: errorMessage[key].errorAT,
        errorDEPT: errorMessage[key].errorDEPT,
        errorFRSTNM: errorMessage[key].errorFRSTNM,
        errorLSTNM: errorMessage[key].errorLSTNM,
        errorSEX: errorMessage[key].errorSEX,
        errorBTTMTOSERV: errorMessage[key].errorBTTMTOSERV,
        errorHOURSOFWK: errorMessage[key].errorHOURSOFWK,
        errorPLMKATTPAT: errorMessage[key].errorPLMKATTPAT,
        errorPRIORITY: errorMessage[key].errorPRIORITY,
        errorHEIGHT:errorMessage[key].errorHEIGHT,
        errorHAIRCOLOR:errorMessage[key].errorHAIRCOLOR,
        errorWEIGHT:errorMessage[key].errorWEIGHT,
        errorRACE:errorMessage[key].errorRACE,
        errorHEARINGSETFOR:errorMessage[key].errorHEARINGSETFOR

    }

    return ret;
};


//PROCESS_SERVER GetErrorStateInitial

export const Process_ServerGetErrorStateInitial = () => {

    var ret =
    {

        errorCASEDT: "",
        errorCOURTNM: "",
        errorFILENO: "",
        errorLTDTTOSERV: "",
        errorTYPE: "",
        errorAT: "",
        errorDEPT: "",
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",
        errorBTTMTOSERV: "",
        errorHOURSOFWK: "",
        errorPLMKATTPAT: "",
        errorPRIORITY: "",
        errorHEIGHT:"",
        errorHAIRCOLOR:"",
        errorWEIGHT:"",
        errorRACE:"",
        errorHEARINGSETFOR:"",
        
    }

    return ret;
};


//PROCESS_SERVER GetClearState
export const Process_ServerGetClearState = () => {

    var ret =
    {
        Date: "",
        Court: "",
        File: "",
        Last_Date_To_Serve: "",
        Type: "",
        Hearing_Set_For: "",
        AT: "",
        Department: "",
        Miscellaneous_Instructions: "",
        First_Name: "",
        Last_Name: "",
        Sex: "",
        Age: "",
        Race: "",
        Height: "",
        Weight: "",
        Hair_Color: "",
        Residence_Address: "",
        Business_Address: "",
        Best_Time_To_Serve: "",
        Hours_Of_Work: "",
        Please_Make_Attempt_At: "",
        Priority_Status: "",
        Assign_To: "",
        // error state
        errorCASEDT: "",
        errorCOURTNM: "",
        errorFILENO: "",
        errorLTDTTOSERV: "",
        errorTYPE: "",
        errorAT: "",
        errorDEPT: "",
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",
        errorBTTMTOSERV: "",
        errorHOURSOFWK: "",
        errorPLMKATTPAT: "",
        errorPRIORITY: ""
    }

    return ret;
};


//PROCESS_SERVER GetInputFields
export const Process_ServerGetInputFields = (inpFields) => {

    var ret =
    {
        "CLNT": "1002",
        "LANG": "EN",
        "CIDSYS": inpFields.Case_Id,
        "CLIENTID": inpFields.Client_Id,
        "CASEDT": formatDate(inpFields.Date),
        "COURTNM": inpFields.Court,
        "FILENO": inpFields.File,
        "LTDTTOSERV": formatDate(inpFields.Last_Date_To_Serve),
        "TYPE": inpFields.Type,
        "HEARINGSETFOR": inpFields.Hearing_Set_For,
        "AT": inpFields.AT,
        "DEPT": inpFields.Department,
        "MISCELIST": inpFields.Miscellaneous_Instructions,
        "FRSTNM": inpFields.First_Name,
        "LSTNM": inpFields.Last_Name,
        "SEX": inpFields.Sex,
        "AGE": inpFields.Age,
        "RACE": inpFields.Race,
        "HEIGHT": inpFields.Height,
        "WEIGHT": inpFields.Weight,
        "HAIRCOLOR": inpFields.Hair_Color,
        "RESADDRESS": inpFields.Residence_Address,
        "BUSADDRESS": inpFields.Business_Address,
        "BTTMTOSERV": inpFields.Best_Time_To_Serve,
        "HOURSOFWK": inpFields.Hours_Of_Work,
        "PLMKATTPAT": inpFields.Please_Make_Attempt_At,
        "PRIORITY": inpFields.Priority_Status,
        "ASSIGNUSER": inpFields.Assign_To

    }

    return ret;
};


//LOCATE_PEOPLE

// LOCATE_PEOPLE GetInitialState
export const Locate_PeopleGetInitialState = () => {

    var ret =
    {
        Client_Id: "",
        Case_Id: "",

        First_Name: "",
        Last_Name: "",
        Spouse: "",
        AKAs: "",
        DOB: "",
        Business_Name: "",
        Type_of_Business: "",
        Business_Tax_ID: "",
        Last_Known_Address: "",
        Phone_Number: "",
        City: "",
        State: "",
        Zip: "",
        Last_Known_Address1: "",
        Phone_Number1: "",
        City1: "",
        State1: "",
        Zip1: "",
        Employed_By: "",
        Employee_Address: "",
        Phone_Number2: "",
        City2: "",
        State2: "",
        Zip2: "",
        Social_Security_Subject: "",
        Social_Security_Spouse: "",
        Drivers_License_Subject: "",
        Drivers_License_Spouse: "",
        Events_Leading: "",
        Subject_Frequents: "",
        Hobbies: "",
        List_Locations: "",
        Priority_Status: "",
        Assign_To: "",
        CDATE: formatSystemDate(),
        DropdownCasesListArr: [],
        tcode: 'CREATE',
        Dispalycomp: false,


        // error state

        errorFRSTNM: "",
        errorLSTNM: "",
        errorSPOUSE: "",
        errorAKA: "",
        errorDOB: "",
        errorBUSINESSNM: "",
        errorBUSINESSTYP: "",
        errorBUSINESSTXID: "",
        errorBUSADDRESS: "",
        errorPHONE: "",
        errorCITY: "",
        errorSTATE: "",
        errorZIPCD: "",
        errorRESADDRESS: "",
        errorPHONE2: "",
        errorCITY2: "",
        errorSTATE2: "",
        errorZIPCD2: "",
        errorEMPID: "",
        errorADJADDRESS: "",
        errorEMPPHONE: "",
        errorEMPCITY: "",
        errorEMPSTATE: "",
        errorEMPZIPCD: "",
        errorSECURITYSUB: "",
        errorSECURITYSPOS: "",
        errorDRIVERLINCSUB: "",
        errorDRIVERLINCSPOS: "",
        errorPRIORITY: "",
        DispalyBackColor: false,
        OnClickButton: '',
    }

    return ret;
};


// LOCATE_PEOPLE GetResultState
export const Locate_PeopleGetResultState = (result) => {

    var ret =
    {

        Case_Id: result.data.caseDetails[0].CIDSYS,
        Client_Id: result.data.caseDetails[0].CLIENTID,
        DOB: formatDate1(result.data.caseDetails[0].DOB),
        First_Name: result.data.caseDetails[0].FRSTNM,
        Last_Name: result.data.caseDetails[0].LSTNM,
        Spouse: result.data.caseDetails[0].SPOUSE,
        AKAs: result.data.caseDetails[0].AKA,
        Business_Name: result.data.caseDetails[0].BUSINESSNM,
        Type_of_Business: result.data.caseDetails[0].BUSINESSTYP,
        Business_Tax_ID: result.data.caseDetails[0].BUSINESSTXID,
        Last_Known_Address: result.data.caseDetails[0].BUSADDRESS,
        Phone_Number: result.data.caseDetails[0].PHONE,
        City: result.data.caseDetails[0].CITY,
        State: result.data.caseDetails[0].STATE,
        Zip: result.data.caseDetails[0].ZIPCD,
        Last_Known_Address1: result.data.caseDetails[0].RESADDRESS,
        Phone_Number1: result.data.caseDetails[0].PHONE2,
        City1: result.data.caseDetails[0].CITY2,
        State1: result.data.caseDetails[0].STATE2,
        Zip1: result.data.caseDetails[0].ZIPCD2,
        Employed_By: result.data.caseDetails[0].EMPID,
        Employee_Address: result.data.caseDetails[0].ADJADDRESS,
        Phone_Number2: result.data.caseDetails[0].EMPPHONE,
        City2: result.data.caseDetails[0].EMPCITY,
        State2: result.data.caseDetails[0].EMPSTATE,
        Zip2: result.data.caseDetails[0].EMPZIPCD,
        Social_Security_Subject: result.data.caseDetails[0].SECURITYSUB,
        Social_Security_Spouse: result.data.caseDetails[0].SECURITYSPOS,
        Drivers_License_Subject: result.data.caseDetails[0].DRIVERLINCSUB,
        Drivers_License_Spouse: result.data.caseDetails[0].DRIVERLINCSPOS,
        Events_Leading: result.data.caseDetails[0].LSTPERSON,
        Subject_Frequents: result.data.caseDetails[0].FRQTLOCATION,
        Hobbies: result.data.caseDetails[0].HOOBBIES,
        List_Locations: result.data.caseDetails[0].POTLADDRESS,
        Priority_Status: result.data.caseDetails[0].PRIORITY,
        Assign_To: result.data.caseDetails[0].ASSIGNUSER,
        tcode: 'UPDATE',
        Dispalycomp: false
    }

    return ret;
};


//// LOCATE_PEOPLE GetErrorState

export const Locate_PeopleGetErrorState = (errorMessage, key) => {

    var ret =
    {
        errorFRSTNM: errorMessage[key].errorFRSTNM,
        errorLSTNM: errorMessage[key].errorLSTNM,
        errorSPOUSE: errorMessage[key].errorSPOUSE,
        errorAKA: errorMessage[key].errorAKA,
        errorDOB: errorMessage[key].errorDOB,
        errorBUSINESSNM: errorMessage[key].errorBUSINESSNM,
        errorBUSINESSTYP: errorMessage[key].errorBUSINESSTYP,
        errorBUSINESSTXID: errorMessage[key].errorBUSINESSTXID,
        errorBUSADDRESS: errorMessage[key].errorBUSADDRESS,
        errorPHONE: errorMessage[key].errorPHONE,
        errorCITY: errorMessage[key].errorCITY,
        errorSTATE: errorMessage[key].errorSTATE,
        errorZIPCD: errorMessage[key].errorZIPCD,
        errorRESADDRESS: errorMessage[key].errorRESADDRESS,
        errorPHONE2: errorMessage[key].errorPHONE2,
        errorCITY2: errorMessage[key].errorCITY2,
        errorSTATE2: errorMessage[key].errorSTATE2,
        errorZIPCD2: errorMessage[key].errorZIPCD2,
        errorEMPID: errorMessage[key].errorEMPID,
        errorADJADDRESS: errorMessage[key].errorADJADDRESS,
        errorEMPPHONE: errorMessage[key].errorEMPPHONE,
        errorEMPCITY: errorMessage[key].errorEMPCITY,
        errorEMPSTATE: errorMessage[key].errorEMPSTATE,
        errorEMPZIPCD: errorMessage[key].errorEMPZIPCD,
        errorSECURITYSUB: errorMessage[key].errorSECURITYSUB,
        errorSECURITYSPOS: errorMessage[key].errorSECURITYSPOS,
        errorDRIVERLINCSUB: errorMessage[key].errorDRIVERLINCSUB,
        errorDRIVERLINCSPOS: errorMessage[key].errorDRIVERLINCSPOS,
        errorPRIORITY: errorMessage[key].errorPRIORITY,

    }

    return ret;
};


//LOCATE_PEOPLE GetErrorStateInitial

export const Locate_PeopleGetErrorStateInitial = () => {

    var ret =
    {
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSPOUSE: "",
        errorAKA: "",
        errorDOB: "",
        errorBUSINESSNM: "",
        errorBUSINESSTYP: "",
        errorBUSINESSTXID: "",
        errorBUSADDRESS: "",
        errorPHONE: "",
        errorCITY: "",
        errorSTATE: "",
        errorZIPCD: "",
        errorRESADDRESS: "",
        errorPHONE2: "",
        errorCITY2: "",
        errorSTATE2: "",
        errorZIPCD2: "",
        errorEMPID: "",
        errorADJADDRESS: "",
        errorEMPPHONE: "",
        errorEMPCITY: "",
        errorEMPSTATE: "",
        errorEMPZIPCD: "",
        errorSECURITYSUB: "",
        errorSECURITYSPOS: "",
        errorDRIVERLINCSUB: "",
        errorDRIVERLINCSPOS: "",
        errorPRIORITY: ""

    }

    return ret;
};


//LOCATE_PEOPLE GetClearState
export const Locate_PeopleGetClearState = () => {

    var ret =
    {
        First_Name: "",
        Last_Name: "",
        Spouse: "",
        AKAs: "",
        DOB: "",
        Business_Name: "",
        Type_of_Business: "",
        Business_Tax_ID: "",
        Last_Known_Address: "",
        Phone_Number: "",
        City: "",
        State: "",
        Zip: "",
        Last_Known_Address1: "",
        Phone_Number1: "",
        City1: "",
        State1: "",
        Zip1: "",
        Employed_By: "",
        Employee_Address: "",
        Phone_Number2: "",
        City2: "",
        State2: "",
        Zip2: "",
        Social_Security_Subject: "",
        Social_Security_Spouse: "",
        Drivers_License_Subject: "",
        Drivers_License_Spouse: "",
        Events_Leading: "",
        Subject_Frequents: "",
        Hobbies: "",
        List_Locations: "",
        Priority_Status: "",
        Assign_To: "",
        // error state

        errorFRSTNM: "",
        errorLSTNM: "",
        errorSPOUSE: "",
        errorAKA: "",
        errorDOB: "",
        errorBUSINESSNM: "",
        errorBUSINESSTYP: "",
        errorBUSINESSTXID: "",
        errorBUSADDRESS: "",
        errorPHONE: "",
        errorCITY: "",
        errorSTATE: "",
        errorZIPCD: "",
        errorRESADDRESS: "",
        errorPHONE2: "",
        errorCITY2: "",
        errorSTATE2: "",
        errorZIPCD2: "",
        errorEMPID: "",
        errorADJADDRESS: "",
        errorEMPPHONE: "",
        errorEMPCITY: "",
        errorEMPSTATE: "",
        errorEMPZIPCD: "",
        errorSECURITYSUB: "",
        errorSECURITYSPOS: "",
        errorDRIVERLINCSUB: "",
        errorDRIVERLINCSPOS: "",
        errorPRIORITY: ""
    }

    return ret;
};


//LOCATE_PEOPLE GetInputFields
export const Locate_PeopleGetInputFields = (inpFields) => {

    var ret =
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
        "DOB": formatDate(inpFields.DOB),
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
        "LSTPERSON": inpFields.Events_Leading,
        "HOOBBIES": inpFields.Hobbies,
        "FRQTLOCATION": inpFields.Subject_Frequents,
        "POTLADDRESS": inpFields.List_Locations,
        "PRIORITY": inpFields.Priority_Status,
        "ASSIGNUSER": inpFields.Assign_To

    }

    return ret;
};


//OTHER

// OTHER GetInitialState
export const OtherGetInitialState = () => {
    var ret = {
      Client_Id: "",
      Case_Id: "",
      CDATE: formatSystemDate(),
      First_Name: "",
      Last_Name: "",
      Spouse: "",
      AKAs: "",
      DOB: "",
      Business_Name: "",
      Type_of_Business: "",
      Business_Tax_ID: "",
      Service_Type: "",
      Service_Desc:"",

  
      Last_Known_Address: "",
      Phone_Number: "",
      City: "",
      State: "",
      Zip: "",
      Last_Known_Address1: "",
      Phone_Number1: "",
      City1: "",
      State1: "",
      Zip1: "",
      Employed_By: "",
      Employee_Address: "",
      Phone_Number2: "",
      City2: "",
      State2: "",
      Zip2: "",
      Social_Security_Subject: "",
      Social_Security_Spouse: "",
      Drivers_License_Subject: "",
      Drivers_License_Spouse: "",
      ABOUTBUSINESS: "",
      SUBJECT_FREQUENTS: "",
      OVERALL_OBJ: "",
      HEARABOUTUS: "",
      DEADLINE: "",
      // Error State
  
      errorFRSTNM: "",
      errorLSTNM: "",
      errorSPOUSE: "",
      errorAKA: "",
      errorDOB: "",
      errorBUSINESSNM: "",
      errorBUSINESSTYP: "",
      errorBUSINESSTXID: "",
      errorSERVICES:"",
      errorBUSADDRESS: "",
      errorPHONE: "",
      errorCITY: "",
      errorSTATE: "",
      errorZIPCD: "",
      errorRESADDRESS: "",
      errorPHONE2: "",
      errorCITY2: "",
      errorSTATE2: "",
      errorZIPCD2: "",
      errorEMPID: "",
      errorADJADDRESS: "",
      errorEMPPHONE: "",
      errorEMPCITY: "",
      errorEMPSTATE: "",
      errorEMPZIPCD: "",
      errorSECURITYSUB: "",
      errorSECURITYSPOS: "",
      errorDRIVERLINCSUB: "",
      errorDRIVERLINCSPOS: "",
      tcode: "CREATE",
      Dispalycomp: false,
      DropdownCasesListArr: [],
      ServiceRequiredArr: [],
      DispalyBackColor: false,
      OnClickButton: ""
    };
  
    return ret;
  };
  
  // OTHER GetResultState
  export const OtherGetResultState = result => {


    console.log('r1r1r1r1r')
    console.log(result)
    console.log('r1r1r1r1r')

    var ret = {
      Case_Id: result.data.caseDetails[0].CIDSYS,
      Client_Id: result.data.caseDetails[0].CLIENTID,
      First_Name: result.data.caseDetails[0].FRSTNM,
      Last_Name: result.data.caseDetails[0].LSTNM,
      Spouse: result.data.caseDetails[0].SPOUSE,
      AKAs: result.data.caseDetails[0].AKA,
      DOB: formatDate1(result.data.caseDetails[0].DOB),
      Business_Name: result.data.caseDetails[0].BUSINESSNM,
      Type_of_Business: result.data.caseDetails[0].BUSINESSTYP,
      Business_Tax_ID: result.data.caseDetails[0].BUSINESSTXID,
      Service_Type: result.data.caseDetails[0].TYPE,
      Service_Desc: result.data.caseDetails[0].SERVICES,
      Last_Known_Address: result.data.caseDetails[0].BUSADDRESS,
      Phone_Number: result.data.caseDetails[0].PHONE,
      City: result.data.caseDetails[0].CITY,
      State: result.data.caseDetails[0].STATE,
      Zip: result.data.caseDetails[0].ZIPCD,
      Last_Known_Address1: result.data.caseDetails[0].RESADDRESS,
      Phone_Number1: result.data.caseDetails[0].PHONE2,
      City1: result.data.caseDetails[0].CITY2,
      State1: result.data.caseDetails[0].STATE2,
      Zip1: result.data.caseDetails[0].ZIPCD2,
      Employed_By: result.data.caseDetails[0].EMPID,
      Employee_Address: result.data.caseDetails[0].ADJADDRESS,
      Phone_Number2: result.data.caseDetails[0].EMPPHONE,
      City2: result.data.caseDetails[0].EMPCITY,
      State2: result.data.caseDetails[0].EMPSTATE,
      Zip2: result.data.caseDetails[0].EMPZIPCD,
      Social_Security_Subject: result.data.caseDetails[0].SECURITYSUB,
      Social_Security_Spouse: result.data.caseDetails[0].SECURITYSPOS,
      Drivers_License_Subject: result.data.caseDetails[0].DRIVERLINCSUB,
      Drivers_License_Spouse: result.data.caseDetails[0].DRIVERLINCSPOS,
      ABOUTBUSINESS: result.data.caseDetails[0].ABOUTBUSINESS,
      SUBJECT_FREQUENTS: result.data.caseDetails[0].SUBJECT_FREQUENTS,
      OVERALL_OBJ: result.data.caseDetails[0].OVERALL_OBJ,
      HEARABOUTUS: result.data.caseDetails[0].HEARABOUTUS,
      DEADLINE: formatDate1(result.data.caseDetails[0].DEADLINE),
      tcode: "UPDATE",
      Dispalycomp: false
    };
    return ret;
  };
  
  //// OTHER GetErrorState
  
  export const OtherGetErrorState = (errorMessage, key) => {
    var ret = {
      errorFRSTNM: errorMessage[key].errorFRSTNM,
      errorLSTNM: errorMessage[key].errorLSTNM,
      errorSPOUSE: errorMessage[key].errorSPOUSE,
      errorAKA: errorMessage[key].errorAKA,
      errorDOB: errorMessage[key].errorDOB,
      errorBUSINESSNM: errorMessage[key].errorBUSINESSNM,
      errorBUSINESSTYP: errorMessage[key].errorBUSINESSTYP,
      errorBUSINESSTXID: errorMessage[key].errorBUSINESSTXID,
      errorSERVICETYP: errorMessage[key].errorTYPE,
      errorBUSADDRESS: errorMessage[key].errorBUSADDRESS,
      errorPHONE: errorMessage[key].errorPHONE,
      errorCITY: errorMessage[key].errorCITY,
      errorSTATE: errorMessage[key].errorSTATE,
      errorZIPCD: errorMessage[key].errorZIPCD,
      errorRESADDRESS: errorMessage[key].errorRESADDRESS,
      errorPHONE2: errorMessage[key].errorPHONE2,
      errorCITY2: errorMessage[key].errorCITY2,
      errorSTATE2: errorMessage[key].errorSTATE2,
      errorZIPCD2: errorMessage[key].errorZIPCD2,
      errorEMPID: errorMessage[key].errorEMPID,
      errorADJADDRESS: errorMessage[key].errorADJADDRESS,
      errorEMPPHONE: errorMessage[key].errorEMPPHONE,
      errorEMPCITY: errorMessage[key].errorEMPCITY,
      errorEMPSTATE: errorMessage[key].errorEMPSTATE,
      errorEMPZIPCD: errorMessage[key].errorEMPZIPCD,
      errorSECURITYSUB: errorMessage[key].errorSECURITYSUB,
      errorSECURITYSPOS: errorMessage[key].errorSECURITYSPOS,
      errorDRIVERLINCSUB: errorMessage[key].errorDRIVERLINCSUB,
      errorDRIVERLINCSPOS: errorMessage[key].errorDRIVERLINCSPOS,
  
      
    };
  
    return ret;
  };
  
  //OTHER GetErrorStateInitial
  
  export const OtherGetErrorStateInitial = () => {
    var ret = {
      errorFRSTNM: "",
      errorLSTNM: "",
      errorSPOUSE: "",
      errorAKA: "",
      errorDOB: "",
      errorBUSINESSNM: "",
      errorBUSINESSTYP: "",
      errorBUSINESSTXID: "",
      errorSERVICES:"",
      errorBUSADDRESS: "",
      errorPHONE: "",
      errorCITY: "",
      errorSTATE: "",
      errorZIPCD: "",
      errorRESADDRESS: "",
      errorPHONE2: "",
      errorCITY2: "",
      errorSTATE2: "",
      errorZIPCD2: "",
      errorEMPID: "",
      errorADJADDRESS: "",
      errorEMPPHONE: "",
      errorEMPCITY: "",
      errorEMPSTATE: "",
      errorEMPZIPCD: "",
      errorSECURITYSUB: "",
      errorSECURITYSPOS: "",
      errorDRIVERLINCSUB: "",
      errorDRIVERLINCSPOS: "",
    };
  
    return ret;
  };
  
  //OTHER GetClearState
  export const OtherGetClearState = () => {
    var ret = {
      First_Name: "",
      Last_Name: "",
      Spouse: "",
      AKAs: "",
      DOB: "",
      Business_Name: "",
      Type_of_Business: "",
      Business_Tax_ID: "",
      Service_Type: "",
      Service_Desc:"",
      Last_Known_Address: "",
      Phone_Number: "",
      City: "",
      State: "",
      Zip: "",
      Last_Known_Address1: "",
      Phone_Number1: "",
      City1: "",
      State1: "",
      Zip1: "",
      Employed_By: "",
      Employee_Address: "",
      Phone_Number2: "",
      City2: "",
      State2: "",
      Zip2: "",
      Social_Security_Subject: "",
      Social_Security_Spouse: "",
      Drivers_License_Subject: "",
      Drivers_License_Spouse: "",
      ABOUTBUSINESS: "",
      SUBJECT_FREQUENTS: "",
      OVERALL_OBJ: "",
      HEARABOUTUS: "",
      DEADLINE: "",
      errorFRSTNM: "",
      errorLSTNM: "",
      errorSPOUSE: "",
      errorAKA: "",
      errorDOB: "",
      errorBUSINESSNM: "",
      errorBUSINESSTYP: "",
      errorBUSINESSTXID: "",
      errorSERVICES:"",
      errorBUSADDRESS: "",
      errorPHONE: "",
      errorCITY: "",
      errorSTATE: "",
      errorZIPCD: "",
      errorRESADDRESS: "",
      errorPHONE2: "",
      errorCITY2: "",
      errorSTATE2: "",
      errorZIPCD2: "",
      errorEMPID: "",
      errorADJADDRESS: "",
      errorEMPPHONE: "",
      errorEMPCITY: "",
      errorEMPSTATE: "",
      errorEMPZIPCD: "",
      errorSECURITYSUB: "",
      errorSECURITYSPOS: "",
      errorDRIVERLINCSUB: "",
      errorDRIVERLINCSPOS: "",
    };
  
    return ret;
  };
  
  //OTHER GetInputFields
  export const OtherGetInputFields = inpFields => {
    console.log('OtherGetInputFields')
    console.log(inpFields)
    console.log('OtherGetInputFields')
    var ret = {
      CLNT: "1002",
      LANG: "EN",
      CLIENTID: inpFields.Client_Id,
      CASEDT: inpFields.CDATE,
      CIDSYS: inpFields.Case_Id,
      FRSTNM: inpFields.First_Name,
      LSTNM: inpFields.Last_Name,
      SPOUSE: inpFields.Spouse,
      AKA: inpFields.AKAs,
      DOB: formatDate(inpFields.DOB),
      BUSINESSNM: inpFields.Business_Name,
      BUSINESSTYP: inpFields.Type_of_Business,
      BUSINESSTXID: inpFields.Business_Tax_ID,
      TYPE: inpFields.Service_Type,
      SERVICES:inpFields.Service_Desc,
      BUSADDRESS: inpFields.Last_Known_Address,
      PHONE: inpFields.Phone_Number,
      CITY: inpFields.City,
      STATE: inpFields.State,
      ZIPCD: inpFields.Zip,
      RESADDRESS: inpFields.Last_Known_Address1,
      PHONE2: inpFields.Phone_Number1,
      CITY2: inpFields.City1,
      STATE2: inpFields.State1,
      ZIPCD2: inpFields.Zip1,
      EMPID: inpFields.Employed_By,
      ADJADDRESS: inpFields.Employee_Address,
      EMPPHONE: inpFields.Phone_Number2,
      EMPCITY: inpFields.City2,
      EMPSTATE: inpFields.State2,
      EMPZIPCD: inpFields.Zip2,
      SECURITYSUB: inpFields.Social_Security_Subject,
      SECURITYSPOS: inpFields.Social_Security_Spouse,
      DRIVERLINCSUB: inpFields.Drivers_License_Subject,
      DRIVERLINCSPOS: inpFields.Drivers_License_Spouse,
      ABOUTBUSINESS: inpFields.ABOUTBUSINESS,
      SUBJECT_FREQUENTS: inpFields.SUBJECT_FREQUENTS,
      OVERALL_OBJ: inpFields.OVERALL_OBJ,
      HEARABOUTUS: inpFields.HEARABOUTUS,
      DEADLINE: formatDate(inpFields.DEADLINE)
    };
  
    return ret;
  };

//WORKERS COMP

// WORKERS_COMP GetInitialState
export const Workers_CompGetInitialState = () => {

    var ret =
    {
        Client_Id: "",
        Case_Id: "",
        CaseDt: formatSystemDate(),

        SurveillanceStartdate: "",
        SurveillanceEnddate: "",
        GPSNeeded: "",
        ActionYouAreLookingFor: "",
        DaysForSurveillanceToBeConducted: "",
        PermissionToMoveForward: "",
        ConductedAnySurveillanceOnTheSubject: "",
        PermissionToGoBeyondTheAllowedTime: "",
        BudgetfortheInvestigation: "",
        HearAboutUs: "",
        First_Name: "",
        Last_Name: "",
        Sex: "",
        Age: "",
        Race: "",
        Height: "",
        Weight: "",
        Hair_Color: "",
        Residence_Address: "",
        Business_Address: "",
        LicensePlate: "",
        Make: "",
        Model: "",
        Description: "",
        SubjectRepresentedByAttorney: "",
        Claim: "",
        FirstName_Adjuster: "",
        LastName_Adjuster: "",
        Email: "",
        PhoneNumber: "",
        Address: "",
        City: "",
        State: "",
        ZipCode: "",
        ClaimOfInjury: "",
        Priority_Status: "",
        Assign_To: "",
        tcode: 'CREATE',
        Dispalycomp: false,
        DropdownCasesListArr: [],
        //ERROR STATE
        errorSURSTARTDT: "",
        errorSURENDDT: "",
        errorISGPSNEEDED: "",
        errorACTIONDETAILS: "",
        errorISIFTWOINVESTIGATORS: "",
        errorISPREVIOUSSUR: "",
        errorISBEYONDTMACTIVE: "",
        errorBUDGET: "",
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",
        errorDAYSFORSUR: "",
        errorLICENSEPLATE: "",
        errorCMAKE: "",
        errorCMODEL: "",
        errorCDESCRIPTION: "",
        errorPRIORITY: "",
        errorADJFIRSTNM: "",
        errorADJLASTNM: "",
        errorPHONE: "",
        errorEMAIL: "",
        errorADJADDRESS: "",
        errorCITY: "",
        errorZIPCD: "",
        errorCLAIM: "",
        errorSUBINJURYCLAIM: "",
        errorSTATE: "",
        errorISSUBREPRESENT: "",
        DispalyBackColor: false,
        OnClickButton: '',
    }



    return ret;
};




// WORKERS_COMP GetResultState
export const Workers_CompGetResultState = (result) => {

    var ret =
    {

        Case_Id: result.data.caseDetails[0].CIDSYS,
        Client_Id: result.data.caseDetails[0].CLIENTID,
        SurveillanceStartdate: formatDate1(result.data.caseDetails[0].SURSTARTDT),
        SurveillanceEnddate: formatDate1(result.data.caseDetails[0].SURENDDT),
        GPSNeeded: result.data.caseDetails[0].ISGPSNEEDED,
        ActionYouAreLookingFor: result.data.caseDetails[0].ACTIONDETAILS,
        DaysForSurveillanceToBeConducted: result.data.caseDetails[0].DAYSFORSUR,
        PermissionToMoveForward: result.data.caseDetails[0].ISIFTWOINVESTIGATORS,
        ConductedAnySurveillanceOnTheSubject: result.data.caseDetails[0].ISPREVIOUSSUR,
        PermissionToGoBeyondTheAllowedTime: result.data.caseDetails[0].ISBEYONDTMACTIVE,
        BudgetfortheInvestigation: result.data.caseDetails[0].BUDGET,
        HearAboutUs: result.data.caseDetails[0].HEARABOUTUS,

        First_Name: result.data.caseDetails[0].FRSTNM,
        Last_Name: result.data.caseDetails[0].LSTNM,
        Sex: result.data.caseDetails[0].SEX,
        Age: result.data.caseDetails[0].AGE,
        Race: result.data.caseDetails[0].RACE,
        Height: result.data.caseDetails[0].HEIGHT,
        Weight: result.data.caseDetails[0].WEIGHT,
        Hair_Color: result.data.caseDetails[0].HAIRCOLOR,
        Residence_Address: result.data.caseDetails[0].RESADDRESS,
        Business_Address: result.data.caseDetails[0].BUSADDRESS,

        LicensePlate: result.data.caseDetails[0].LICENSEPLATE,
        Make: result.data.caseDetails[0].CMAKE,
        Model: result.data.caseDetails[0].CMODEL,
        Description: result.data.caseDetails[0].CDESCRIPTION,
        CustodySituation: result.data.caseDetails[0].EXPCUSTSITUATION,
        NegativeThingsSubjectInvolved: result.data.caseDetails[0].EXPNEGSUBINVOLVE,
        SubjectRepresentedByAttorney: result.data.caseDetails[0].ISSUBREPRESENT,
        Claim: result.data.caseDetails[0].CLAIM,
        FirstName_Adjuster: result.data.caseDetails[0].ADJFIRSTNM,
        LastName_Adjuster: result.data.caseDetails[0].ADJLASTNM,
        Email: result.data.caseDetails[0].EMAIL,
        PhoneNumber: result.data.caseDetails[0].PHONE,
        Address: result.data.caseDetails[0].ADJADDRESS,
        City: result.data.caseDetails[0].CITY,
        State: result.data.caseDetails[0].STATE,
        ZipCode: result.data.caseDetails[0].ZIPCD,
        ClaimOfInjury: result.data.caseDetails[0].SUBINJURYCLAIM,

        Priority_Status: result.data.caseDetails[0].PRIORITY,
        Assign_To: result.data.caseDetails[0].ASSIGNUSER,
        tcode: 'UPDATE',
         Dispalycomp: false


    }



    return ret;
};


//// WORKERS_COMP GetErrorState

export const Workers_CompGetErrorState = (errorMessage, key) => {

    var ret =
    {

        errorSURSTARTDT: errorMessage[key].errorSURSTARTDT,
        errorSURENDDT: errorMessage[key].errorSURENDDT,
        errorISGPSNEEDED: errorMessage[key].errorISGPSNEEDED,
        errorACTIONDETAILS: errorMessage[key].errorACTIONDETAILS,
        errorISIFTWOINVESTIGATORS: errorMessage[key].errorISIFTWOINVESTIGATORS,
        errorISPREVIOUSSUR: errorMessage[key].errorISPREVIOUSSUR,
        errorISBEYONDTMACTIVE: errorMessage[key].errorISBEYONDTMACTIVE,
        errorBUDGET: errorMessage[key].errorBUDGET,
        errorFRSTNM: errorMessage[key].errorFRSTNM,
        errorLSTNM: errorMessage[key].errorLSTNM,
        errorSEX: errorMessage[key].errorSEX,
        errorLICENSEPLATE: errorMessage[key].errorLICENSEPLATE,
        errorCMAKE: errorMessage[key].errorCMAKE,
        errorCMODEL: errorMessage[key].errorCMODEL,
        errorCDESCRIPTION: errorMessage[key].errorCDESCRIPTION,
        errorDAYSFORSUR: errorMessage[key].errorDAYSFORSUR,
        errorPRIORITY: errorMessage[key].errorPRIORITY,
        //adjr's 
        errorADJFIRSTNM: errorMessage[key].errorADJFIRSTNM,
        errorADJLASTNM: errorMessage[key].errorADJLASTNM,
        errorPHONE: errorMessage[key].errorPHONE,
        errorEMAIL: errorMessage[key].errorEMAIL,
        errorADJADDRESS: errorMessage[key].errorADJADDRESS,
        errorCITY: errorMessage[key].errorCITY,
        errorZIPCD: errorMessage[key].errorZIPCD,
        errorCLAIM: errorMessage[key].errorCLAIM,
        errorSUBINJURYCLAIM: errorMessage[key].errorSUBINJURYCLAIM,
        errorSTATE: errorMessage[key].errorSTATE,
        errorISSUBREPRESENT: errorMessage[key].errorISSUBREPRESENT,

    }



    return ret;
};


//WORKERS_COMP GetErrorStateInitial

export const Workers_CompGetErrorStateInitial = () => {

    var ret =
    {
        errorSURSTARTDT: "",
        errorSURENDDT: "",
        errorISGPSNEEDED: "",
        errorACTIONDETAILS: "",
        errorISIFTWOINVESTIGATORS: "",
        errorISPREVIOUSSUR: "",
        errorISBEYONDTMACTIVE: "",
        errorBUDGET: "",
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",
        errorDAYSFORSUR: "",
        errorLICENSEPLATE: "",
        errorCMAKE: "",
        errorCMODEL: "",
        errorCDESCRIPTION: "",
        errorPRIORITY: "",
        errorADJFIRSTNM: "",
        errorADJLASTNM: "",
        errorPHONE: "",
        errorEMAIL: "",
        errorADJADDRESS: "",
        errorCITY: "",
        errorZIPCD: "",
        errorCLAIM: "",
        errorSUBINJURYCLAIM: "",
        errorSTATE: "",
        errorISSUBREPRESENT: ""



    }





    return ret;
};


//WORKERS_COMP GetClearState
export const Workers_CompGetClearState = () => {

    var ret =
    {
        SurveillanceStartdate: "",
        SurveillanceEnddate: "",
        GPSNeeded: "",
        ActionYouAreLookingFor: "",
        DaysForSurveillanceToBeConducted: "",
        PermissionToMoveForward: "",
        ConductedAnySurveillanceOnTheSubject: "",
        PermissionToGoBeyondTheAllowedTime: "",
        BudgetfortheInvestigation: "",
        HearAboutUs: "",
        First_Name: "",
        Last_Name: "",
        Sex: "",
        Age: "",
        Race: "",
        Height: "",
        Weight: "",
        Hair_Color: "",
        Residence_Address: "",
        Business_Address: "",
        LicensePlate: "",
        Make: "",
        Model: "",
        Description: "",
        SubjectRepresentedByAttorney: "",
        Claim: "",
        FirstName_Adjuster: "",
        LastName_Adjuster: "",
        Email: "",
        PhoneNumber: "",
        Address: "",
        City: "",
        State: "",
        ZipCode: "",
        ClaimOfInjury: "",
        Priority_Status: "",
        Assign_To: "",
        errorSURSTARTDT: "",
        errorSURENDDT: "",
        errorISGPSNEEDED: "",
        errorACTIONDETAILS: "",
        errorISIFTWOINVESTIGATORS: "",
        errorISPREVIOUSSUR: "",
        errorISBEYONDTMACTIVE: "",
        errorBUDGET: "",
        errorFRSTNM: "",
        errorLSTNM: "",
        errorSEX: "",
        errorDAYSFORSUR: "",
        errorLICENSEPLATE: "",
        errorCMAKE: "",
        errorCMODEL: "",
        errorCDESCRIPTION: "",
        errorPRIORITY: "",
        errorADJFIRSTNM: "",
        errorADJLASTNM: "",
        errorPHONE: "",
        errorEMAIL: "",
        errorADJADDRESS: "",
        errorCITY: "",
        errorZIPCD: "",
        errorCLAIM: "",
        errorSUBINJURYCLAIM: "",
        errorSTATE: "",
        errorISSUBREPRESENT: ""
    }

    return ret;
};


//WORKERS_COMP GetInputFields
export const Workers_CompGetInputFields = (inpFields) => {

    var ret =
    {
        CLNT: "1002",
        "LANG": "EN",
        "CASEDT": inpFields.CaseDt,
        "CLIENTID": inpFields.Client_Id,
        "CIDSYS": inpFields.Case_Id,
        "SURSTARTDT": formatDate(inpFields.SurveillanceStartdate),
        "SURENDDT": formatDate(inpFields.SurveillanceEnddate),
        "ISGPSNEEDED": inpFields.GPSNeeded,
        "ACTIONDETAILS": inpFields.ActionYouAreLookingFor,
        "DAYSFORSUR": inpFields.DaysForSurveillanceToBeConducted,
        "ISIFTWOINVESTIGATORS": inpFields.PermissionToMoveForward,
        "ISPREVIOUSSUR": inpFields.ConductedAnySurveillanceOnTheSubject,
        "ISBEYONDTMACTIVE": inpFields.PermissionToGoBeyondTheAllowedTime,
        "BUDGET": inpFields.BudgetfortheInvestigation,
        "HEARABOUTUS": inpFields.HearAboutUs,


        //Subject Information
        "FRSTNM": inpFields.First_Name,
        "LSTNM": inpFields.Last_Name,
        "SEX": inpFields.Sex,
        "AGE": inpFields.Age,
        "RACE": inpFields.Race,
        "HEIGHT": inpFields.Height,
        "WEIGHT": inpFields.Weight,
        "HAIRCOLOR": inpFields.Hair_Color,
        "RESADDRESS": inpFields.Residence_Address,
        "BUSADDRESS": inpFields.Business_Address,

        //Vehicle Info
        "LICENSEPLATE": inpFields.LicensePlate,
        "CMAKE": inpFields.Make,
        "CMODEL": inpFields.Model,
        "CDESCRIPTION": inpFields.Description,

        //Adjuster’s Info
        "ISSUBREPRESENT": inpFields.SubjectRepresentedByAttorney,
        "CLAIM": inpFields.Claim,
        "ADJFIRSTNM": inpFields.FirstName_Adjuster,
        "ADJLASTNM": inpFields.LastName_Adjuster,
        "EMAIL": inpFields.Email,
        "PHONE": inpFields.PhoneNumber,
        "ADJADDRESS": inpFields.Address,
        "CITY": inpFields.City,
        "STATE": inpFields.State,
        "ZIPCD": inpFields.ZipCode,
        "SUBINJURYCLAIM": inpFields.ClaimOfInjury,
        "PRIORITY": inpFields.Priority_Status,
        "ASSIGNUSER": inpFields.Assign_To,

        //extra
        "LTDTTOSERV": inpFields.CaseDt

    }

    return ret;
};
