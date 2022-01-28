import { execGql } from '../apolloClient/apolloClient';
import { clientDetails } from '../Queries/queries';

/*---------fetch clnt details---------*/
const PORT = process.env.APIPORT;
export async function fetchClntDetails(emailid) {
    var result = '', errorMessage = '';
    try {
        console.log(setClntDetailsParam(emailid));

        result = await execGql('query', clientDetails, setClntDetailsParam(emailid))
    }
    catch (err) {
        // errors = err.errorsGql;
        errorMessage = err.errorMessageGql;
    }

    if (!result) {
        console.log(errorMessage);
    }
    else {
        console.log(result);
        return result
    }
}

/*---------- set delete LeadsCRUDOpsQuery variables  ---------*/
function setClntDetailsParam(emailid) {
    var parameters = {
        "CLNT": "1002",
        "LANG": "EN",
        "CLNTID": "",
        "EMAILID": emailid
    }
    return parameters
}


/**
 * Downloads PDF Report
 * @author Nandu
 * @param queryParams 
 * @returns URI
 */
export function downloadReport(queryParams) {

    //let url = 'http://81.4.102.11:80/excellinv?query=query';
   
    let url =`${process.env.API_SERVER}?query=query`;
    url = url + "{downloadReport(ReportType:" + queryParams.ReportType + ",";
    url = url + "ParamObj:" + JSON.stringify(queryParams.ParamObj) + ",";
    url = url + "ReportName:" + JSON.stringify(queryParams.ReportName) + ")}";
    let uri = encodeURI(url)
    return uri;
}

/**
* Downloads Excel Report
* @param queryParams 
* @returns URI
*/

export function exportToExcel(queryParams) {
    //let url = 'http://81.4.102.11:80/excellinv?query=query';
    let url =`${process.env.API_SERVER}?query=query`;
    url = url + "{exportToExcel(ReportType:[" + queryParams.ReportType + "],";
    url = url + "ParamArray:" + JSON.stringify(queryParams.ParamArray) + ",";
    url = url + "ReportName:" + JSON.stringify(queryParams.ReportName) + ")}";
    let uri = encodeURI(url)
    return uri;
}