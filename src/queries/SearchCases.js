import gql from 'graphql-tag';

export default gql`
query   searchCases($CLNT: String!,
        $LANG: String!,
        $isAdmin: Boolean,
        $ASSIGNUSER: String
        )
  {
      searchCases(
    CLNT : $CLNT,
  	LANG : $LANG,
  	isAdmin : $isAdmin,
    ASSIGNUSER : $ASSIGNUSER
  )
  {
    FRSTNM
    CIDSYS
    CASEDT
    STATUS
    SERVICETYP
    MODDESC
    EMAILID
    PHONE
  }
}
`;

/*
mutation signInUsername($client: String,
    $lang: String,
    $applicationid: String,
    $username: String,
    $password: String,
    )
    {
      signInUsername(
        client: $client,
    lang: $lang,
    applicationid: $applicationid,
    username: $username,
    password: $password,

      )
      {
        applicationid
        username
        email
        mobile
        lang
      }
    }  
`;
`;

*/