import gql from 'graphql-tag';
import { execGql } from '../apolloClient/apolloClient';
import { UploadDocQuery } from '../Queries/queries';
/*---------send mail---------*/
export async function createNote(variable) {
    var result = '', errorMessage = '';
    try {console.log(variable)
        result = await execGql('mutation', gql`${UploadDocQuery}`, variable)
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
    }
}


