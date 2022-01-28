import { execGql } from '../apolloClient/apolloClient';
import { UpdateCaseStatusQuery ,InvoicesCRUDOpsQuery} from '../Queries/queries';

//..............update status after case submission..........

export async function updateCaseStatus(caseid) {
    var result = '', errors = [], errorMessage = '';
    try {
        let queryVariables = await setUpdtStatusParams(caseid);
        result = await execGql('mutation', UpdateCaseStatusQuery, queryVariables);
    }
    catch (err) {
        console.log(err);
        errors = err.errorsGql;
        errorMessage = err.errorMessageGql;
    }

    if (!result) {
        console.log(errors);
        console.log(errorMessage);
    }
    else {
        console.log(result);
    }
}

//....................set update InvoicesCRUDOpsQuery variabls ............................
async function setUpdtStatusParams(caseid) {
    var parameters = {
        "casestatus": [
            {
                "CLNT": "1002",
                "LANG": "EN",
                "CIDSYS": caseid,
                "STATUS": "Submited"
            }
        ]
    }
    return parameters
};

//....................create Invoice............................
export async function createInvoice(queryVariables) {
    var result = '', errors = [], errorMessage = '';
    try {
        console.log(queryVariables);
        
        result = await execGql('mutation', InvoicesCRUDOpsQuery, queryVariables);
    }
    catch (err) {
        console.log(err);
        errors = err.errorsGql;
        errorMessage = err.errorMessageGql;
    }

    if (!result) {
        console.log(errors);
        console.log(errorMessage);

    }
    else {
        console.log(result);
    }
};