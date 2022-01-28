export const contractState = (typeofContract, stateType, result) => {
    //alert(result)
    if (typeofContract == 'CUSTOM' && stateType == 'contractGetInitialState')
        return customContractGetInitialState();

    if (typeofContract == 'CUSTOM' && stateType == 'contractGetResultState')
        return customContractGetResultState(result);

    if (typeofContract == 'CUSTOM' && stateType == 'contractGetInputFields')
        return customContractGetInputFields();

    if (typeofContract == 'ASSET' && stateType == 'contractGetInitialState')
        return assetContractGetInitialState();

    if (typeofContract == 'ASSET' && stateType == 'contractGetResultState')
        return assetContractGetResultState(result);

    if (typeofContract == 'ASSET' && stateType == 'contractGetInputFields')
        return assetContractGetInputFields();

    if (typeofContract == 'PROCESS' && stateType == 'contractGetInitialState')
        return processContractGetInitialState();

    if (typeofContract == 'PROCESS' && stateType == 'contractGetResultState')
        return processContractGetResultState(result);

    if (typeofContract == 'PROCESS' && stateType == 'contractGetInputFields')
        return processContractGetInputFields();


    if (typeofContract == 'LOCATE' && stateType == 'contractGetInitialState')
        return locateContractGetInitialState();

    if (typeofContract == 'LOCATE' && stateType == 'contractGetResultState')
        return locateContractGetResultState(result);

    if (typeofContract == 'LOCATE' && stateType == 'contractGetInputFields')
        return locateContractGetInputFields();


    if (typeofContract == 'INFIDELITY' && stateType == 'contractGetInitialState')
        return infidelityContractGetInitialState();

    if (typeofContract == 'INFIDELITY' && stateType == 'contractGetResultState')
        return infidelityContractGetResultState(result);

    if (typeofContract == 'INFIDELITY' && stateType == 'contractGetInputFields')
        return infidelityContractGetInputFields();


};

export const locateContractGetInitialState = () => {

    let ret =
    {
        CLIENTID: "",
        SERVICETYPE: "",
        CIDSYS: "",
        FULLNM: "",
        CONTACTTYPE: "",
        RATEPERH: "",
        RATEPERM: "",
        TOTAL: "",
        OTHER: "",
        FEE: "",
        DispCKEditor: true,
        tcode: 'CREATE',
        Dispalycomp: true,
        DispalyBackColor: false,
        OnClickButton: '',

        // error state
        errorFULLNM: "",
        errorCONTACTTYPE: "",
        errorRATEPERH: "",
        errorRATEPERM: "",
        errorTOTAL: "",
        errorOTHER: ""

    };

    return ret;
};

export const locateContractGetInputFields = (inpFields) => {

    let ret =
    {
        "CLNT": "1002",
        "LANG": "EN",
        "CLIENTID": inpFields.CLIENTID,
        "CIDSYS": inpFields.CIDSYS,
        "CONTACTTYPE": inpFields.CONTACTTYPE,
        "SERVICETYPE": inpFields.SERVICETYPE,
        "FULLNM": inpFields.FULLNM,
        "TOTAL": inpFields.TOTAL,
        "RATEPERH": inpFields.RATEPERH,
        "RATEPERM": inpFields.RATEPERM,
        "OTHER": inpFields.OTHER,
        "MAXH": inpFields.FEE

    }

    return ret;
};

export const locateContractGetResultState = (result) => {

    let ret =
    {
        CLIENTID: result.data.contractDetails[0].CLIENTID,
        SERVICETYPE: result.data.contractDetails[0].SERVICETYPE,
        CIDSYS: result.data.contractDetails[0].CIDSYS,
        FULLNM: result.data.contractDetails[0].FULLNM,
        CONTACTTYPE: result.data.contractDetails[0].CONTACTTYPE,
        RATEPERH: result.data.contractDetails[0].RATEPERH,
        RATEPERM: result.data.contractDetails[0].RATEPERM,
        TOTAL: result.data.contractDetails[0].TOTAL,
        OTHER: result.data.contractDetails[0].OTHER,
        FEE: result.data.contractDetails[0].MAXH,
        tcode: 'UPDATE',
        //  Dispalycomp:false

    }

    return ret;
};

export const infidelityContractGetInitialState = () => {

    let ret =
    {
        CLIENTID: "",
        SERVICETYPE: "",
        CIDSYS: "",
        FULLNM: "",
        CONTACTTYPE: "",
        RATEPERH: "",
        RATEPERM: "",
        TOTAL: "",
        OTHER: "",
        MAX: "",
        FEE:"",
        tcode: 'CREATE',
        Dispalycomp: true,
        DispCKEditor: true,
        DispalyBackColor: false,
        OnClickButton: '',

        // error state
        errorFULLNM: "",
        errorCONTACTTYPE: "",
        errorRATEPERH: "",
        errorRATEPERM: "",
        errorTOTAL: "",
        errorMAX: "",

    };

    return ret;
};


export const infidelityContractGetInputFields = (inpFields) => {

    let ret =
    {
        "CLNT": "1002",
        "LANG": "EN",
        "CLIENTID": inpFields.CLIENTID,
        "CIDSYS": inpFields.CIDSYS,
        "CONTACTTYPE": inpFields.CONTACTTYPE,
        "SERVICETYPE": inpFields.SERVICETYPE,
        "FULLNM": inpFields.FULLNM,
        "TOTAL": inpFields.TOTAL,
        "RATEPERH": inpFields.RATEPERH,
        "RATEPERM": inpFields.RATEPERM,
        "OTHER": inpFields.OTHER,
        "MAXH": inpFields.FEE

    }

    return ret;
};

export const infidelityContractGetResultState = (result) => {

    let ret =
    {
        CLIENTID: result.data.contractDetails[0].CLIENTID,
        SERVICETYPE: result.data.contractDetails[0].SERVICETYPE,
        CIDSYS: result.data.contractDetails[0].CIDSYS,
        FULLNM: result.data.contractDetails[0].FULLNM,
        CONTACTTYPE: result.data.contractDetails[0].CONTACTTYPE,
        RATEPERH: result.data.contractDetails[0].RATEPERH,
        RATEPERM: result.data.contractDetails[0].RATEPERM,
        TOTAL: result.data.contractDetails[0].TOTAL,
        OTHER: result.data.contractDetails[0].OTHER,
        FEE: result.data.contractDetails[0].MAXH,
        tcode: 'UPDATE',
        //  Dispalycomp:false

    }

    return ret;
};

export const customContractGetInitialState = () => {

    let ret =
    {
        CLIENTID: "",
        SERVICETYPE: "",
        CIDSYS: "",
        contenttext: "",
        tcode: 'CREATE',
        Dispalycomp: true,
        DispCKEditor: true,
        DispalyBackColor: false,
        OnClickButton: ''
    };

    console.log("DispCKEditor Export");
    //console.log(this.DispCKEditor);
    console.log("DispCKEditor Export");

    return ret;
};

export const customContractGetInputFields = (inpFields) => {

    let ret =
    {
        "CLNT": "1002",
        "LANG": "EN",
        "CLIENTID": inpFields.CLIENTID,
        "CIDSYS": inpFields.CIDSYS,
        "SERVICETYPE": inpFields.SERVICETYPE,
        "CUSTOMCON": inpFields.contenttext

    }

    return ret;
};

export const customContractGetResultState = (result) => {

    let ret =
    {

        CLIENTID: result.data.contractDetails[0].CLIENTID,
        SERVICETYPE: result.data.contractDetails[0].SERVICETYPE,
        CIDSYS: result.data.contractDetails[0].CIDSYS,
        contenttext: result.data.contractDetails[0].CUSTOMCON,
        tcode: 'UPDATE',
        DispCKEditor: false,
        // Dispalycomp:false

    }



    return ret;
};



export const setCRUDParams = async(xnsType, typeofContract, inputFieldList,subject,mailbody,to,cc,bcc) => {
    console.log('setCRUDParams')
    try{
    var fieldList = "";

    if (typeofContract == 'CUSTOM') { fieldList = customContractGetInputFields(inputFieldList) };
    if (typeofContract == 'PROCESS') { fieldList = processContractGetInputFields(inputFieldList) };
    if (typeofContract == 'LOCATE') { fieldList = locateContractGetInputFields(inputFieldList) };
    if (typeofContract == 'INFIDELITY') { fieldList = infidelityContractGetInputFields(inputFieldList) };
    if (typeofContract == 'ASSET') { fieldList = assetContractGetInputFields(inputFieldList) };
    console.log('fieldList')
    //console.log(fieldList)
    fieldList.TYPOFCONTRACT=typeofContract
    fieldList.SUBJECT=subject
    fieldList.MAILBODY=mailbody||""
    fieldList._TO=to || ""
    fieldList.CC=cc|| ""
    fieldList.BCC=bcc||""

console.log(fieldList)

    var parameters = {
        "transaction": xnsType,
        "contracts": [
            fieldList
        ]
    }
    return parameters
    }catch(err){
        //console.log(err)
    }
    return parameters

};



export const processContractGetInputFields = (inpFields) => {

    let ret =
    {
        "CLNT": "1002",
        "LANG": "EN",
        "CLIENTID": inpFields.CLIENTID,
        "CIDSYS": inpFields.CIDSYS,
        "CONTACTTYPE": inpFields.CONTACTTYPE,
        "SERVICETYPE": inpFields.SERVICETYPE,
        "FULLNM": inpFields.FULLNM,
        "TOTAL": inpFields.TOTAL,
        "RATEPERH": inpFields.RATEPERH,
        "RATEPERM": inpFields.RATEPERM,
        "OTHER": inpFields.OTHER,
        "MAXH": inpFields.FEE
    }

    return ret;
};

export const processContractGetInitialState = (inpFields) => {

    let ret =
    {
        CLIENTID: "",
        SERVICETYPE: "",
        CIDSYS: "",
        FULLNM: "",
        CONTACTTYPE: "",
        RATEPERH: "",
        RATEPERM: "",
        TOTAL: "",
        OTHER: "",
        FEE: "",
        tcode: 'CREATE',
        Dispalycomp: true,
        DispCKEditor: true,
        DispalyBackColor: false,
        OnClickButton: '',

        // error state
        errorFULLNM: "",
        errorCONTACTTYPE: "",
        errorRATEPERH: "",
        errorRATEPERM: "",
        errorTOTAL: ""

    }

    return ret;
};



export const processContractGetResultState = (result) => {
    console.log(result);

    let ret =
    {

        CLIENTID: result.data.contractDetails[0].CLIENTID,
        SERVICETYPE: result.data.contractDetails[0].SERVICETYPE,
        CIDSYS: result.data.contractDetails[0].CIDSYS,
        FULLNM: result.data.contractDetails[0].FULLNM,
        CONTACTTYPE: result.data.contractDetails[0].CONTACTTYPE,
        RATEPERH: result.data.contractDetails[0].RATEPERH,
        RATEPERM: result.data.contractDetails[0].RATEPERM,
        TOTAL: result.data.contractDetails[0].TOTAL,
        OTHER: result.data.contractDetails[0].OTHER,
        FEE: result.data.contractDetails[0].MAXH,
        tcode: 'UPDATE',
        // Dispalycomp:false
    }



    return ret;
};

export const assetContractGetInputFields = (inpFields) => {

    let ret =
    {
        "CLNT": "1002",
        "LANG": "EN",
        "CLIENTID": inpFields.CLIENTID,
        "CIDSYS": inpFields.CIDSYS,
        "CONTACTTYPE": inpFields.CONTACTTYPE,
        "SERVICETYPE": inpFields.SERVICETYPE,
        "FULLNM": inpFields.FULLNM,
        "TOTAL": inpFields.TOTAL,
        "RATEPERH": inpFields.RATEPERH,
        "RATEPERM": inpFields.RATEPERM,
        "OTHER": inpFields.OTHER,
        "MAXH": inpFields.FEE
    }

    return ret;
};

export const assetContractGetInitialState = (inpFields) => {

    let ret =
    {
        CLIENTID: "",
        SERVICETYPE: "",
        CIDSYS: "",
        FULLNM: "",
        CONTACTTYPE: "",
        RATEPERH: "",
        RATEPERM: "",
        TOTAL: "",
        OTHER: "",
        FEE: "",
        tcode: 'CREATE',
        Dispalycomp: true,
        DispCKEditor: true,
        DispalyBackColor: false,
        OnClickButton: '',

        // error state
        errorFULLNM: "",
        errorCONTACTTYPE: "",
        errorRATEPERH: "",
        errorRATEPERM: "",
        errorTOTAL: ""

    }

    return ret;
};



export const assetContractGetResultState = (result) => {
    console.log(result);

    let ret =
    {

        CLIENTID: result.data.contractDetails[0].CLIENTID,
        SERVICETYPE: result.data.contractDetails[0].SERVICETYPE,
        CIDSYS: result.data.contractDetails[0].CIDSYS,
        FULLNM: result.data.contractDetails[0].FULLNM,
        CONTACTTYPE: result.data.contractDetails[0].CONTACTTYPE,
        RATEPERH: result.data.contractDetails[0].RATEPERH,
        RATEPERM: result.data.contractDetails[0].RATEPERM,
        TOTAL: result.data.contractDetails[0].TOTAL,
        OTHER: result.data.contractDetails[0].OTHER,
        FEE: result.data.contractDetails[0].MAXH,
        tcode: 'UPDATE',
        // Dispalycomp:false
    }



    return ret;
};

export const setSearchParams = (CaseId) => {
    var parameters = {
        "CLNT": "1002",
        "LANG": "EN",
        "CIDSYS": CaseId
    }
    return parameters

};
