import gql from 'graphql-tag';
export default  gql`
 mutation saveUsername($client: String,
    $lang: String,
    $applicationid: String,
    $username: String,
    $password: String,
    $email: String,
    $mobile: String,
    $firstname:String,
    $lastname:String,
    $userauthorisations:String,
     )
    {
      saveUsername(
        client: $client,
    lang: $lang,
    applicationid: $applicationid,
    username: $username,
    password: $password,
    email: $email,
    mobile: $mobile,
    firstname:$firstname,
    lastname:$lastname,
    userauthorisations:$userauthorisations,
    
      )
      {
        applicationid
        username
		lang
		mobile
		email
        firstname
        lastname
        userauthorisations
	  }
    }
  
`;
