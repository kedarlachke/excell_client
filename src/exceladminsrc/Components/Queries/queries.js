import gql from 'graphql-tag';

export const ContactDetails= gql`query Contactdetails($CLNT:String!,$LANG:String!,$CONTACTID:String,$EMAILID:String
){
  contactDetails(CLNT:$CLNT,LANG:$LANG,CONTACTID:$CONTACTID,EMAILID:$EMAILID){
    FRSTNM
    LSTNM
    COMPANY
    EMAILID
    PHONE
    FAXNO
    ADDR
    CITY
    STATE
    PINC
    MODOFCON
    BESTTMCAL
    CONTACTTYPE
    CONTACTID
  }
}`;

export const ContactsCRUDOpsQuery= gql`mutation Contacts
(
  $contacts : [Contacts!]!,
  $transaction :TransactionTypes!
)
{
ContactsAffected : ContactsCRUDOps
  (
    contacts : $contacts,
    transaction : $transaction
  )

}`;

export const LeadsCRUDOpsQuery = gql`
mutation Leads
(
  $leads : [Leads!]!,
  $transaction :TransactionTypes!
)
{
  LeadsAffected : LeadsCRUDOps
  (
    leads : $leads,
    transaction : $transaction
  )

}`;

export const CustomerCRUDopsQuery=  gql`
mutation Customers
(
  $customers : [Customers!]!,
  $transaction :TransactionTypes!
)
{
CustomersAffected : CustomersCRUDOps
  (
   customers:$customers
    transaction:$transaction
  )

}`

export const CustomerDetailsQuery=  gql`
query($CLNT:String!,$LANG:String!,$CCODE:String,$CMAIL:String){
  customerDetails(
    CLNT:$CLNT,
    LANG:$LANG,
    CCODE:$CCODE,
    CMAIL:$CMAIL
  )
  {
    FIRSTNM
    LASTNM
    OFFICENM
    CMAIL
    PHNO
    FAXNO
    ADDR
    CITY
    STATE
    PINC
    BESTTMCAL
    MODOFCON
    CCODE
  }
}`


  export const DashboardListQuery= gql`
query ($clnt:String!, $lang:String!,$isAdmin:Boolean,$TASKFOR:String!,$isDashboard:Boolean)
{
 searchDashboardLeads(CLNT:$clnt,LANG:$lang)
{
      CDATE
      FULLNM
      OFFICENM
      MODEOFSRC
      PRIORITY
      CSOURCE
      STATUS
      LSTUPDT
      EMAILID
      PHONE
      BESTTMCAL
      STDESC
      LSTNM
      FRSTNM
      CID
      ADDCOMMETS
      MODDESC
}
  
 searchCases(CLNT : $clnt,LANG : $lang,isAdmin : $isAdmin)
{
  FRSTNM
  CIDSYS
  CASEDT
  STATUS
  SERVICETYP
  MODDESC
  STDESC
  TDESC
  EMAILID
  PHONE
    ADDRESS
    CITY
    UDATE
}
  
  searchLoggedUserTasks(CLNT:$clnt,LANG:$lang,TASKFOR:$TASKFOR,isDashboard:$isDashboard){
    TASKID
    CLNT
    LANG
    TASKFOR
    TASKOWNER
    SUBJECT
    SUBJECT
    STARTDATE
    DUEDATE
    STATUSID
    STATUS
    PRIORITYID
    PRIORITY
    PERCNTCOMPL
    
  }
  
   searchDashboardTasks(CLNT:$clnt,LANG:$lang)
  {
    TASKID
    CLNT
    LANG
    TASKFOR
    TASKOWNER
    SUBJECT
    STARTDATE
    DUEDATE
    STATUS
    PRIORITY
  }
}`;

export const DDLAddCustomer=  gql`
query DDLAddCustomer 
(
  $CLNT : String!,
  $LANG : String!,
)
{
  STATES : populateDDL(
  ddlName : ,STATES
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
  
  BEST_METHOD_OF_CONTACT:populateDDL(
    ddlName:BEST_METHOD_OF_CONTACT,
    paraArray:[$CLNT, $LANG])
  {
    CODE
    DESC
  }
  
    BEST_TIME_TO_CALL:populateDDL(
    ddlName:BEST_TIME_TO_CALL,
    paraArray:[$CLNT, $LANG])
  {
    CODE
    DESC
  }
}
`

export const DropDownSearchLeadQuery = gql`
query Leads 
(
  $CLNT : String!,
  $LANG : String!,
)
{
  STATUS:populateDDL(ddlName:STATUS,paraArray:[$CLNT, $LANG])
  {
    CODE
    DESC
  }
}`;

export const DropDownQueryContact = gql`query contact 
(
  $CLNT : String!,
  $LANG : String!,
)
{
  
  STATES : populateDDL(ddlName : STATES,
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
  
  BEST_METHOD_OF_CONTACT : populateDDL(ddlName : BEST_METHOD_OF_CONTACT,
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
  
  
  BEST_TIME_TO_CALL : populateDDL(ddlName : BEST_TIME_TO_CALL,
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
  
  CONTACT_TYPES : populateDDL(ddlName : CONTACT_TYPES
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
  

}`;

export const DropdwonQueryLeads = gql`
query Leads 
(
  $CLNT : String!,
  $LANG : String!,
)
{
  
  BEST_TIME_TO_CALL : populateDDL(ddlName : BEST_TIME_TO_CALL,
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
  
  PRIORITY_LEVEL : populateDDL(ddlName : PRIORITY_LEVEL,
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }

  BEST_METHOD_OF_CONTACT : populateDDL(ddlName : BEST_METHOD_OF_CONTACT,
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }

  SOURCE_OF_LEADS : populateDDL(ddlName : SOURCE_OF_LEADS,
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
  
 STATUS:populateDDL(ddlName:STATUS,paraArray:[$CLNT,$LANG])
  {
    CODE
    DESC
  }
  ASSIGN_TO:populateDDL(ddlName:ASSIGN_TO,paraArray:[$CLNT,$LANG])
  {
    CODE
    DESC
  }
  STATES : populateDDL(ddlName : STATES, paraArray : [$CLNT, $LANG])
    {
      CODE
      DESC
    }

    BUSINESS_TYPES : populateDDL(ddlName : BUSINESS_TYPES, paraArray : [$CLNT, $LANG])
    {
      CODE
      DESC
    }
    SERVICE_CATEGORY: populateDDL(ddlName: SERVICE_CATEGORY, paraArray: [$CLNT, $LANG]) {
      CODE
      DESC
    }
    OTHER_SERVICES: populateDDL(ddlName: OTHER_SERVICES, paraArray: [$CLNT, $LANG]) {
      CODE
      DESC
    }
}`;


export const ServicesRequiredDropdwonQuery = gql`query Leads 
(
  $CLNT : String!,
  $LANG : String!,
  $CATCODE:String
)
{
  SERVICES_REQUIRED : populateDDL(
  ddlName : SERVICES_REQUIRED,
  paraArray : [$CLNT, $LANG,$CATCODE])
  {
    CODE
    DESC
  }
}`;

export const LeadDetails = gql`query leadDetails($CLNT:String!,$LANG:String!, $CID:String!)
   {
    leadDetails(CLNT:$CLNT,LANG:$LANG,CID: $CID,
     ){
         FRSTNM
         LSTNM
         OFFICENM
         EMAILID
         PHONE
         MODOFCON
         TYPSERV
         BESTTMCAL
         PRIORITY
         ADDCOMMETS
         MODEOFSRC
         ASSIGNTO
         STATUS
         CATCODE
    }
  }`;


export const LeadDoctTypQuery = gql`query Leads 
( $CLNT : String!, $LANG : String!)
{
  Documenttype : populateDDL(
  ddlName : LEAD_DOCTYPES
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
  
}`;


export const SearchCases=  gql`
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
  STDESC
  TDESC
  EMAILID
  PHONE
    ADDRESS
    CITY
    UDATE
}
}`

export const SearchContactQuery=  gql`
query SearchContact($CLNT:String!,$LANG:String!,
  $DISNAME:String,$COMPANY:String,$PHONE:String,$EMAILID:String,
  $exactMatch:Boolean
){
  searchContacts(CLNT:$CLNT,LANG:$LANG,DISNAME: $DISNAME,
    COMPANY:$COMPANY,PHONE:$PHONE,EMAILID:$EMAILID,exactMatch:$exactMatch){
    CONTACTID,
    DISNAME,
    COMPANY,
    EMAILID,
    PHONE,
    CONTACTTYPE,
    CDATE,
    
  }
}`


export const SearchCustomerQuery=  gql`
query($CLNT:String!,$LANG:String!,$FIRSTNM:String,$LASTNM:String,$CMAIL:String,$CELLNO:String,$exactMatch:Boolean){
  searchCustomers
  (
    CLNT:$CLNT,
  LANG:$LANG,
  FIRSTNM:$FIRSTNM,
  LASTNM:$LASTNM,
  CMAIL:$CMAIL,
  CELLNO:$CELLNO,
  exactMatch:$exactMatch)
  {
    CCODE
    FIRSTNM
    LASTNM
    OFFICENM
    CMAIL
    PHNO
    CITY
    FAXNO
    ADDR
    STATE
    PINC
    BESTTMCAL
    BESTTMCAL
  }
}`


export const SearchDocUploadQuery = gql`query searchUploadedDocuments($CLNT:String!,$LANG:String!,$CENTITY:String!,$CENTITYID:String!)
{
    searchUploadedDocuments(CLNT:$CLNT,LANG:$LANG,CENTITY:$CENTITY,CENTITYID:$CENTITYID)
  {
    SRNO
    CDATE
    USERNM
    CDOCNAME
    CDOCTYPE
    NOTE
  }
  }`;

  export const searchLeads= gql`query searchLeads($CLNT:String!,$LANG:String!,
    $FULLNM:String,$OFFICENM:String,$PHONE:String,$EMAILID:String,
    $TYPSERV:String, $STATUS:String,$ASSIGNTO:String,$isAdmin:Boolean,
  ){
    searchLeads(CLNT:$CLNT,LANG:$LANG,FULLNM: $FULLNM,
      OFFICENM:$OFFICENM,PHONE:$PHONE,EMAILID:$EMAILID,TYPSERV:$TYPSERV,
      STATUS:$STATUS, ASSIGNTO:$ASSIGNTO,isAdmin:$isAdmin){
        CDATE
        FULLNM
        OFFICENM
        MODEOFSRC
        PRIORITY
        STATUS
        LSTUPDT
        EMAILID
        PHONE
        BESTTMCAL
        STDESC
        LSTNM
        FRSTNM
        CID
        ADDCOMMETS
        MODDESC
        ASSIGNTO
        STATUS
        MAILCOUNT
        TASKCOUNT
        LEADNOTECOUNT
    }
  }`;



export const searchCasesQuery = gql`
query($CLNT:String!,$LANG:String!,$FIRSTNM:String,$LASTNM:String,$EMAILID:String,$PHONE:String,$isAdmin:Boolean){
  searchCases(CLNT:$CLNT,
    LANG:$LANG,
    FIRSTNM:$FIRSTNM,
    LASTNM:$LASTNM,
    EMAILID:$EMAILID,
    PHONE:$PHONE
    isAdmin:$isAdmin)
  {  CLNTID
    CASEDT
    FRSTNM
    OFFICENM
    CLNTID
    SERVICETYP
    EMAILID
    PHONE
    STATUS
    ADDRESS
    CITY
     UDATE
    TDESC
    MODDESC
    STDESC
    CIDSYS
    TYPE,
    MAILCOUNT,
    TASKCOUNT,
    LEADNOTECOUNT,
    ADDCOMMETS
  }
}

`;





// export const searchBillableHoursQuery = gql`
// query($CLNT:String!,$LANG:String!,$FIRSTNM:String,$LASTNM:String,$FROMDATE:String!,$TODATE:String!){
//   searchBillableHours
//   (
//     CLNT:$CLNT,
//     LANG:$LANG,
//     FROMDATE:$FROMDATE,
//     TODATE:$TODATE,
//     FIRSTNM:$FIRSTNM,
//     LASTNM:$LASTNM
    
//   )
//   {
//     CLNTID
//     CLIENTNAME
//     CLNTHW
//   }
// }`;

// export const searchInvoicesQuery = gql`
// query($CLNT:String!,$LANG:String!,$DOCTYPE:String!,$DOCFRMDT:String!,$DOCTODT:String!,$CMPNNM:String,$DOCNO:String,$CUSTOMER:String,$CIDSYS:String){
//   searchInvoices(
//     CLNT:$CLNT,
//     LANG:$LANG,
//     DOCTYPE:$DOCTYPE,
//     DOCFRMDT:$DOCFRMDT,
//     DOCTODT:$DOCTODT,
//   CMPNNM:$CMPNNM,
//   DOCNO:$DOCNO,
//   CIDSYS:$CIDSYS,
//   CUSTOMER:$CUSTOMER)
//   {
//     DOCNO
//      INVDT
//     DUEDT
//     CUSTOMER
//     BAL
//     TOT
//     PAYMENTBY
//     STATUS
//     CMPNNM
//     DOCHDR
//     RMKS
//   }
// }`;

export const searchInvoicesQuery = gql`
query($CLNT:String!,$LANG:String!,$DOCTYPE:String!,$DOCFRMDT:String!,$DOCTODT:String!,$CMPNNM:String,$DOCNO:String,$CUSTOMER:String,$CIDSYS:String){
  searchInvoices(
    CLNT:$CLNT,
    LANG:$LANG,
    DOCTYPE:$DOCTYPE,
    DOCFRMDT:$DOCFRMDT,
    DOCTODT:$DOCTODT,
  CMPNNM:$CMPNNM,
  DOCNO:$DOCNO,
  CUSTOMER:$CUSTOMER,
  CIDSYS:$CIDSYS)
  {
    DOCNO
     INVDT
    DUEDT
    CUSTOMER
    BAL
    TOT
    PAYMENTBY
    STATUS
    STATUSDSC
    CMPNNM
    DOCHDR
    RMKS
    DOCID
    CIDSYS
  }
}`;



//search BilledHoursHeader Query
export const searchBilledHoursHeaderQuery = gql`
query($CLNT:String!,$LANG:String!){
  searchBilledHoursHeader(
    CLNT:$CLNT,
    LANG:$LANG
    
  )
  {
     CLIENTNAME
    CLNTBILLABLEHW
    CLNTHW
    CLNTID
  }
}`



//query for CRUD operations of Task
export const tasksCRUDOperations = gql`
    mutation Tasks
    (
    $tasks : [Tasks!]!,
    $transaction :TransactionTypes!
    )
    {
    TasksAffected : TasksCRUDOps
    (
        tasks : $tasks,
        transaction : $transaction
    )

    }
`;


//List of assigned Task
export const searchTask=  gql`query searchTask(
  $CLNT: String!,
  $LANG: String!,
  $CUSER: String,
  $STATUS: String,
  $SUBJECT: String,
  $TASKFOR: String,
  $PRIORITYID: String,
  $FROMDATE: String,
  $TODATE: String,
  $TASKOF:String,
  $TASKOFID:String,
  $isAdmin: Boolean )
{
searchTasks(CLNT:$CLNT
LANG: $LANG
CUSER: $CUSER
STATUS: $STATUS
SUBJECT: $SUBJECT
TASKFOR: $TASKFOR
PRIORITYID: $PRIORITYID
FROMDATE: $FROMDATE
TODATE: $TODATE
  TASKOF:$TASKOF
  TASKOFID:$TASKOFID
isAdmin: $isAdmin)
{
TASKID
CLNT
LANG
TASKFOR
TASKOWNER
SUBJECT
STARTDATE
DUEDATE
STATUSID
STATUS
PRIORITYID
PRIORITY
PERCNTCOMPL
REMINDERREQ
REMINDERDT
REMINDERTM
TASKDETAILS
TASKOF
TASKOFID
}
}`;

// To Fetch TaskDetails
export const searchTaskDetails = gql`query searchTaskDetails($CLNT:String!,$LANG:String!,$TASKID:String!) 
{taskDetails(CLNT:$CLNT LANG :$LANG  TASKID:$TASKID)
  {
    TASKID
    CLNT
    LANG
    TASKFOR
    TASKOWNER
    SUBJECT
    STARTDATE
    DUEDATE
    STATUSID
    STATUS
    PRIORITYID
    PRIORITY
    PERCNTCOMPL
    REMINDERREQ
    REMINDERDT
    REMINDERTM
    TASKDETAILS
    TASKOF
    TASKOFID
    
  }
}`;



// Task Dropdwon
export const ddlTask=gql`query Task 
(
  $CLNT : String!,
  $LANG : String!,
  $STATUS_FOR:String
)
{
  

 TASKINV_STATUS:populateDDL(ddlName:TASKINV_STATUS,paraArray:[$CLNT,$LANG,$STATUS_FOR])
  {
    CODE
    DESC
  }
   TASK_PRIORITY:populateDDL(ddlName:TASK_PRIORITY,paraArray:[$CLNT,$LANG])
  {
    CODE
    DESC
  }
  ASSIGN_TO:populateDDL(ddlName:ASSIGN_TO,paraArray:[$CLNT,$LANG])
  {
    CODE
    DESC
  }
  TASK_OF:populateDDL(ddlName:TASK_OF,paraArray:[$CLNT,$LANG])
  {
    CODE
    DESC
  }
}`;


//Query for searching user
export const SearchUserQuery=gql`
query($CLNT:String!$LANG:String!,$USRID:String,$UMAIL:String,$CELLNO:String,$exactMatch:Boolean)
{
  searchUsers(
    CLNT:$CLNT,
    LANG:$LANG,
    USRID:$USRID,
    UMAIL:$UMAIL,
    CELLNO:$CELLNO,
    exactMatch:$exactMatch
  )
  {
    FNAME
    LNAME
    USRID
    UMAIL
    CELLNO
    
  }
}`;

//Query for create,update,delete user
export const UsersCRUDOpsQuery=gql`
mutation Users
(
$users : [Users!]!,
$transaction :TransactionTypes!
)
{
UsersAffected : UsersCRUDOps
(
     users: $users,
    transaction : $transaction
)

}`;






//Query for create,update,delete user
export const SignUpCustomerUsernameQuery=gql`
mutation SignUpCustomerUsername
(
$users : [Users!]!,
$transaction :TransactionTypes!
)
{
UsersAffected : SignUpCustomerUsername
(
     users: $users,
    transaction : $transaction
)
{
  username,
  applicationid,
  lang,
  client,
  email,
  mobile
}
}`;

//Query for populating state and country DDL in add user form
export const PopulateAddUserDDLQuery=gql`
query DDLAddUser 
(
  $CLNT : String!,
  $LANG : String!,
)
{
  COUNTRIES : populateDDL(
  ddlName : COUNTRIES
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
  
  STATES : populateDDL(
  ddlName : STATES
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
}`


//Query for user details
export const UserDetailsQuery=gql`
query($CLNT:String!,$LANG:String!,$USRID:String!){
  userDetails(
    CLNT:$CLNT,
    LANG:$LANG,
    USRID:$USRID
  )
  {
    FNAME
    LNAME
    USEX
    UMAIL
    CELLNO
    PHNO
    USRID
    ADDR
    CITY
    STATECD
    COUNTRY
    PINC
    
  }
}`



//Query for search user Authorizations
export const SearchUserAuthQuery=gql`
query ($CLNT:String!,$LANG:String!,$USRID:String!){
  searchAuthorizations(
    CLNT : $CLNT,
    LANG : $LANG,
    USRID : $USRID,
  )
  {
    GRPID
    GRPNM
    GDESC
  }
}`

//Query for Update user Authorizations
export const UpdateUserAuthQuery=gql`
mutation UpdateAuthorization(
  $CLNT:String!,$LANG:String!,$USRID:String!,$GRPID:[String!]!
  )
  {
    updateUserAuthorizations(
      CLNT:$CLNT,
      LANG:$LANG,
      USRID:$USRID,
      GRPID:$GRPID
    )
  }`
  
  
  
  //Query for create,update,delete Cases
export const CasesCRUDOpsQuery = gql`mutation Cases
(
  $typeofCase:CaseTypes!,
  $cases : [Cases!]!,
  $transaction :TransactionTypes!
)
{
CasesAffected : CasesCRUDOps
  (
    typeofCase:$typeofCase
    cases : $cases
    transaction : $transaction
  )

}`;

  
  
  

  // Fetch Data for Case Types
export const caseDetails = gql`query caseDetails($CLNT:String!,$LANG:String!,$CIDSYS:String!)
{ 
  caseDetails
  (
    CLNT :$CLNT, LANG : $LANG, CIDSYS :$CIDSYS)
  {
    CLNT
    LANG
    CLIENTID
    CID
    CASEDT
    COURTNM
    CASETL
    FILENO
    LTDTTOSERV
    TYPE
    HEARINGSETFOR
    AT
    DEPT
    MISCELIST
    FRSTNM
    LSTNM
    SPOUSE
    SEX
    RACE
    AGE
    HEIGHT
    WEIGHT
    HAIRCOLOR
    RESADDRESS
    BUSADDRESS
    BTTMTOSERV
    HOURSOFWK
    PLMKATTPAT
    PRIORITY
    CIDSYS
    ASSIGNUSER
    ISCLOSED
    SURSTARTDT
    SURENDDT
    ISGPSNEEDED
    ACTIONDETAILS
    DAYSFORSUR
    ISIFTWOINVESTIGATORS
    ISPREVIOUSSUR
    ISBEYONDTMACTIVE
    BUDGET
    HEARABOUTUS
    LICENSEPLATE
    CMAKE
    CMODEL
    CDESCRIPTION
    ADJFIRSTNM
    ADJLASTNM
    PHONE
    EMAIL
    ADJADDRESS
    CITY
    STATE
    ZIPCD
    CLAIM
    ISSUBREPRESENT
    SUBINJURYCLAIM
    EXPCUSTSITUATION
    EXPNEGSUBINVOLVE
    AKA
    DOB
    BUSINESSNM
    BUSINESSTYP
    BUSINESSTXID
    PHONE2
    CITY2
    STATE2
    ZIPCD2
    EMPID
    EMPPHONE
    EMPCITY
    EMPSTATE
    EMPZIPCD
    SECURITYSUB
    SECURITYSPOS
    DRIVERLINCSUB
    DRIVERLINCSPOS
    ACCOUNTS
    CARBOTVS
    SRCOFINCM
    LANDPRPTY
    HIDDENASST
    BUSSORCORP
    OTHER
    OTHERINFO
    CRTJDGMT
    HELPRCVRY
    LSTPERSON
    FRQTLOCATION
    HOOBBIES
    POTLADDRESS
    SERVICETYP
    STATUSDT
    STATUSTM
    STATUS
    PRGRPTTXT
    SUBJECT
    DESCRIPTION
    CASERATE
    ABOUTBUSINESS
    SUBJECT_FREQUENTS
    OVERALL_OBJ
    DEADLINE
    SERVICETYP
  }
}`;
  
  
//Mutation For ServicesCRUDOps

export const ServicesCRUDOps = gql`mutation Service
(
$services : [Services!]!,
$transaction :TransactionTypes!
)
{
ServiceAffected : ServicesCRUDOps
(
    services : $services,
    transaction : $transaction
)
}`;

// Query For Fetch Service Deatils
export const serviceDetails = gql`query serviceDetails($CLNT: String!, $LANG: String!, $CATCODE: String!, $STCODE: String!) {
  serviceDetails(CLNT: $CLNT, LANG: $LANG, CATCODE: $CATCODE, STCODE: $STCODE) {
    CATCODE
    STDESC
    ORDERNO
    ISACTIVE
  }
}`;


  
  //CLIENT ClientCRUDOps

export const ClientCRUDOps = gql`mutation Customers
(
  $clients: [Clients!]!,
  $transaction :TransactionTypes!
)
{
ClientsAffected : ClientCRUDOps
  (
   clients:$clients
    transaction:$transaction
  )

}`;
  
// To Fetch Client Details

export const clientDetails = gql`query ($CLNT: String!, $LANG: String!, $CLNTID: String!,$EMAILID:String) {
  clientDetails(CLNT: $CLNT, LANG: $LANG, CLNTID: $CLNTID,EMAILID:$EMAILID) {
    FIRSTNM
    LASTNM
    OFFICENM
    EMAILID
    PHONE
    FAX
    ADDRESS
    CITY
    STATE
    ZIPCD
    BESTTMCAL
    MODOFCON
    CLNTID
  }
}`;

  
  // Contract CRUD

export const ContractsCRUDOps = gql`mutation Contracts
(
$contracts : [Contracts!]!,
$transaction :TransactionTypes!
)
{
ContractsAffected : ContractsCRUDOps
(
     contracts: $contracts,
    transaction : $transaction
)

}`;

export const MailContract = gql`mutation MailContract
(
$contracts : [Contracts!]!,
$transaction :TransactionTypes!
)
{
ContractsAffected : MailContract
(
     contracts: $contracts,
    transaction : $transaction
)

}`;
  // To Fetch Contract Details

export const contractDetails = gql`query contractDetails($CLNT:String!,$LANG:String!,$CIDSYS:String!)
{ 
  contractDetails
  (
    CLNT :$CLNT, LANG : $LANG, CIDSYS :$CIDSYS)
  {
    CLNT
    LANG
    CLIENTID
    SERVICETYPE
    CIDSYS
    FULLNM
    CONTACTTYPE
    TOTAL
    RATEPERH
    RATEPERM
    OTHER
    MAXH
    CUSTOMCON
    
  }
}`;

  
  // Query For Authorization Dropdwon
export const Authorizationddl = gql`query Authorization($CLNT: String!, $LANG: String!) {
  PAY_FOR: populateDDL(ddlName: PAY_FOR, paraArray: [$CLNT, $LANG]) {
    CODE
    DESC
  }
  PAY_MODE: populateDDL(ddlName: PAY_MODE, paraArray: [$CLNT, $LANG]) {
    CODE
    DESC
  }
  CARD_TYPE: populateDDL(ddlName: CARD_TYPE, paraArray: [$CLNT, $LANG]) {
    CODE
    DESC
  }
}`;

// To Fetch Card Authorization Details

export const CardAuthorizationDetails = gql`query CardAuthorizationDetails($CLNT:String!,$LANG:String!,$CIDSYS:String!)
{ 
  CardAuthorizationDetails
  (
    CLNT :$CLNT, LANG : $LANG, CIDSYS :$CIDSYS)
  {
   CIDSYS
    TODAYDATE
    CLNTNAME
    ACCHLDRNAME
    CARDTYP
    CARDNO
    EXPDATE
    SECURITYCD
    BILLINGADDR
    AMOUNT
    PAYFOR
    AGREE
    
  }
}`;




// To Fetch Cash Authorization Details

export const CashAuthorizationDetails = gql`query CashAuthorizationDetails($CLNT:String!,$LANG:String!,$CIDSYS:String!)
{ 
  CashAuthorizationDetails
  (
    CLNT :$CLNT, LANG : $LANG, CIDSYS :$CIDSYS)
  {
    CIDSYS
    PAYMENTFOR
    PAYMENTMODE
    AMOUNT
    FEE
    
  }
}`;


// To Fetch eCheck Authorization Details

export const eCheckAuthorizationDetails = gql`query eCheckAuthorizationDetails($CLNT:String!,$LANG:String!,$CIDSYS:String!)
{ 
  eCheckAuthorizationDetails
  (
    CLNT :$CLNT, LANG : $LANG, CIDSYS :$CIDSYS)
  {
   CIDSYS
    TODAYDATE
    CLNTNAME
    ACCHLDRNAME
    BANKNAME
    BANKACCNO
    BANKROUTNO
    CLNTADDRFLBANK
    AMTAUTHRZD
    FEE
    PAYFOR
    AGREE
    
  }
}`;


  
// eCheck Authorization CRUDOps
export const eCheckAuthorizationCRUDOps = gql`mutation eCheckAuthorization($authorizations: [eCheckAuthorizations!]!, $transaction: TransactionTypes!) {
  eCheckAuthorizationAffected: eCheckAuthorizationCRUDOps(authorizations: $authorizations, transaction: $transaction)
}`;


// Card Authorization CRUDOps
export const CardAuthorizationCRUDOps = gql`mutation CardAuthorization($authorizations: [CardAuthorizations!]!, $transaction: TransactionTypes!) {
  CardAuthorizationAffected: CardAuthorizationCRUDOps(authorizations: $authorizations, transaction: $transaction)
}`;


// Cash Authorization CRUDOps
export const CashAuthorizationCRUDOps = gql`mutation CashAuthorization($authorizations: [CashAuthorizations!]!, $transaction: TransactionTypes!) {
  CashAuthorizationAffected: CashAuthorizationCRUDOps(authorizations: $authorizations, transaction: $transaction)
}`;


// To Populate Authorization Data
export const AuthorizationDetails = gql`query AuthDetails($CLNT: String!, $LANG: String!, $CIDSYS: String!) {
  Check: eCheckAuthorizationDetails(CLNT: $CLNT, LANG: $LANG, CIDSYS: $CIDSYS) {
    CIDSYS
    TODAYDATE
    CLNTNAME
    ACCHLDRNAME
    BANKNAME
    BANKACCNO
    BANKROUTNO
    CLNTADDRFLBANK
    AMTAUTHRZD
    FEE
    PAYFOR
    AGREE
  }
  Card: CardAuthorizationDetails(CLNT: $CLNT, LANG: $LANG, CIDSYS: $CIDSYS) {
    CIDSYS
    TODAYDATE
    CLNTNAME
    ACCHLDRNAME
    CARDTYP
    CARDNO
    EXPDATE
    SECURITYCD
    BILLINGADDR
    AMOUNT
    PAYFOR
    AGREE
  }
  Cash: CashAuthorizationDetails(CLNT: $CLNT, LANG: $LANG, CIDSYS: $CIDSYS) {
    CIDSYS
    PAYMENTFOR
    PAYMENTMODE
    AMOUNT
    FEE
  }
}`

//Query for invoice status and payment mode 
export const StatusPayModeDDLQuery=gql`
query InvoiceStatusDDL 
(
  $CLNT : String!,
  $LANG : String!,
  $DOCTYPE:String!
)
{
  TASKINV_STATUS : populateDDL(
  ddlName : TASKINV_STATUS,
  paraArray : [$CLNT, $LANG,$DOCTYPE])
  {
    CODE
    DESC
  }

  
    PAYMENT_MODE : populateDDL(
    ddlName : PAYMENT_MODE
    paraArray : [$CLNT, $LANG])
    {
      CODE
      DESC
    }
    
  
}`


   //Query for Update Invoice Status
   export const UpdateInvoiceStatusQuery=gql`
   mutation($CLNT:String!,$LANG:String!,$DOCID:String!,$STATUS:String!,$PAYMENTBY:String){
     updateInvoiceStatus(
       CLNT:$CLNT,
       LANG:$LANG,
       DOCID:$DOCID,
       STATUS:$STATUS,
       PAYMENTBY:$PAYMENTBY
     )
   }`;
   //Query for Invoice Reminders CRUD
   export const RemindersCRUDOps=gql`mutation(
     $reminders : [Reminders!]!,
     $transaction :TransactionTypes!
   )
   {
    RemindersAffected : RemindersCRUDOps
     (
      reminders:$reminders
       transaction:$transaction
     )
   }`;


   //Query for Invoice Details For Reminder
export const InvoiceDetailsForReminder=gql`query InvoiceDetailsForReminder($CLNT  :String!,
  $LANG : String!,
  $DOCID : String!)
{
invoiceDetailsForReminder(
  CLNT:$CLNT,
  LANG: $LANG,
  DOCID:$DOCID
  ) 
{
  CLNT
  LANG
  DOCNO
  CUSTOMER
  DOCDT
  CMPNNM
  COMPMAIL
  DUEDT
  CUSTMAIL
  TOT
  }
}`;

//Query for invoice populate
export const invoiceDetails=gql`query invoiceDetails($CLNT:String!,$LANG:String!,$DOCID:String!){
  Invoices: invoiceDetails(CLNT:$CLNT,LANG:$LANG,DOCID:$DOCID)
  {
    DocHeader {
      CLNT
      LANG
      DOCID
      DOCDT
      DOCTYPE
      DOCNO
      PONO
      RMKS
      CURRENCY
      DUEDT
      DOCHDR
      TOT
      CUSTCD
      INVDT
      BAL
      CMPN
      CMPNNM
      CUSTOMER
      STATUS
      VENDORCD
      CIDSYS
      PAYMENTBY
    }
    DocDetails {
      CLNT
      LANG
      LINEITEMNO
      DOCID
      PARTNUMBER
      PARTDESC
      RATE
      QUANTITY
      TAX
      AMOUNT
      SIGN
      ACCCODE
    }
    TaxAmounts {
      CLNT
      LANG
      DOCID
      DOCTYPE
      GEOGRAPHY
      DATE
      TAXTYPE
      LINEITEMNO
      AMOUNT
      RATE
      TAXAMOUNT
      TAXTEXT
      SIGN
      CORDER
    }
  }
}`;
   

//Query for Invoice DDL
export const InvoiceDDLQuery=gql`
query InvoiceDDL 
(
  $CLNT : String!,
  $LANG : String!,
)
{
  TAX_TYPES : populateDDL(
  ddlName : TAX_TYPES,
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
  CUSTOMERS : populateDDL (
    ddlName : CUSTOMERS
   paraArray : [$CLNT, $LANG]
  )
  {
    CODE
    DESC
  }
  COMPANY : populateDDL (
    ddlName : COMPANY
   paraArray : [$CLNT, $LANG]
  )
  {
    CODE
    DESC
  }
  PARTS : populateDDL (
   ddlName : PART_MASTER
   paraArray : [$CLNT, $LANG]
  )
  {
    CODE
    DESC
  }
 
  }`;

 //Query for Tax Rates
  export const SearchTaxRatesQuery=gql`
  query TaxRate($CLNT:String!,$LANG:String!,$DOCTYPE:String!){
    searchTaxRates(CLNT:$CLNT,LANG:$LANG,DOCTYPE:$DOCTYPE
   
    ){
      TAXCD
      RATE
      TAXDESC
      CORDER
    }
  }
  `
  //Query for creating invoice
export const InvoicesCRUDOpsQuery=gql`
mutation Invoices
(
  $invoices : [Invoices!]!,
  $transaction :TransactionTypes!
)
{
    Invoices : InvoicesCRUDOps
  (
    invoices : $invoices,
    transaction : $transaction
  ){
    DocHeader {
      CLNT
      LANG
      DOCID
      DOCDT
      DOCTYPE
      DOCNO
      PONO
      RMKS
      CURRENCY
      DUEDT
      DOCHDR
      TOT
      CUSTCD
      INVDT
      BAL
      CMPN
      CMPNNM
      CUSTOMER
      STATUS
      VENDORCD
      CIDSYS
      PAYMENTBY
    }
    DocDetails {
      CLNT
      LANG
      LINEITEMNO
      DOCID
      PARTNUMBER
      PARTDESC
      RATE
      QUANTITY
      TAX
      AMOUNT
      SIGN
      ACCCODE
    }
    TaxAmounts {
      CLNT
      LANG
      DOCID
      DOCTYPE
      GEOGRAPHY
      DATE
      TAXTYPE
      LINEITEMNO
      AMOUNT
      RATE
      TAXAMOUNT
      TAXTEXT
      SIGN
      CORDER
    }
  }

}`;


//Query for populating state and country DDL in add user form
export const PopulateStateAndCountryDDLQuery=gql`
query DDLStateAndCountry 
(
  $CLNT : String!,
  $LANG : String!,
)
{
  COUNTRIES : populateDDL(
  ddlName : COUNTRIES
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
  
  STATES : populateDDL(
  ddlName : STATES
  paraArray : [$CLNT, $LANG])
  {
    CODE
    DESC
  }
}`


//Query for update case status after case submission
export const UpdateCaseStatusQuery=gql`
mutation($casestatus:[CaseStatus!]!){
  UpdateCaseStatus(
   casestatus:$casestatus
   
 )
 }`;


//Query for search Progress Report
export const searchProgressReports = gql`query ProgressReports($CLNT:String!,$LANG:String!,$FRMDATE:String!,$TODATE:String!,$CIDSYS:String!,$CUSER:String,$PRGRPTID:String,$RPTTXT:String){
  searchProgressReports(
    CLNT :$CLNT ,
    LANG : $LANG,
    FRMDATE :$FRMDATE,
    TODATE : $TODATE,
    CIDSYS :$CIDSYS,
    CUSER:$CUSER,
    PRGRPTID:$PRGRPTID,
    RPTTXT:$RPTTXT
  ) {
    CLNT
    LANG
    PRGRPTID
    PRGWORKID
    WORKCAT
    WORKHOURS
    CDATE
    CTIME
    CUSER
    UDATE
    UTIME
    UUSER
    ISDEL
    DDATE
    DTIME
    DUSER
    DOCID
    LINEITEMNO
    CDOCTYPE
    CDOC
    CDOCDESC
    CIDSYS
    RPTTXT
    DOCNM
    CEXTENSION
    ISBILLED
    SHAREWITH
  }
}`;


  
//Query for Progress Report Details
export const progressReportDetails=gql`query ProgressReportDetails($CLNT:String!,$LANG:String!,$PRGRPTID:String!){
 progressReportDetails(
   CLNT : $CLNT,
   LANG : $LANG,
   PRGRPTID: $PRGRPTID
 ) {
   CLNT
   LANG
   PRGRPTID
   PRGWORKID
   WORKCAT
   WORKHOURS
   CDATE
   CTIME
   CUSER
   UDATE
   UTIME
   UUSER
   ISDEL
   DDATE
   DTIME
   DUSER
   DOCID
   LINEITEMNO
   CDOCTYPE
   CDOC
   CDOCDESC
   CIDSYS
   RPTTXT
   DOCNM
   CEXTENSION
   ISBILLED
   SHAREWITH
 }
}`;
 
//Query for update lead status and assignto
export const UpdateLeadStatusQuery=gql`
mutation UpdateLeadStatus($leadstatus:[LeadStatus!]!){
 UpdateLeadStatus( leadstatus:$leadstatus
 )
}`


// Mutation for Progress Report CRUDOps
export const ProgressReportCRUDOps = `mutation ProgressReportCRUDOps
(
  $progressreport: [ProgressReports!]!,
  $transaction :TransactionTypes!
)
{
ProgressReport : ProgressReportCRUDOps
  (
   progressreports:$progressreport
    transaction:$transaction
  )

}`;



// Query for Progress Report DDL
export const ProgressReportDDL = gql`query ProgressReportDDL($CLNT: String!, $LANG: String!) {
  WORK_CATEGORY: populateDDL(ddlName: WORK_CATEGORY, paraArray: [$CLNT, $LANG]) {
    CODE
    DESC
  }
  DOCTYPES: populateDDL(ddlName: LEAD_DOCTYPES, paraArray: [$CLNT, $LANG]) {
    CODE
    DESC
  }
}`;


// Mutation for Delete Progress Report 
export const DeleteProgressReport= gql`mutation ProgressReport
(
  $progressreport: [ProgressReports!]!,
  $transaction :TransactionTypes!
)
{
ProgressReport : ProgressReportCRUDOps
  (
   progressreports:$progressreport
    transaction:$transaction
  )

}`;





// delete lead Documents Query
export const deleteDocumentsQuery = gql`
mutation(
  $CLNT:String!
  $LANG: String!
$CENTITY:String!
  $CENTITYID:String!
$SRNO:String!
)
{
deleteDocuments(
CLNT:$CLNT
LANG:$LANG
CENTITY:$CENTITY
CENTITYID:$CENTITYID
SRNO:$SRNO
)        
}`


// Query For sending mail from lead form
export const SendMailLeadQuery = gql`
mutation($emails:[Emails!]!){
  SendEmails(emails:$emails)
}`

//List Of My Task
export const searchLoggedUserTasks=  gql`query searchLoggedUserTasks(
  $CLNT:String!,
  $LANG:String!,
  $TASKFOR:String!,
  $STATUS:String!,
  $SUBJECT:String,
  $TASKOWNER:String,
  $PRIORITYID:String,
  $FROMDATE:String,
  $TODATE:String,
  $TASKOF:String,
  $TASKOFID:String,
  $isDashboard:Boolean)
{
searchLoggedUserTasks(
  CLNT:$CLNT,
  LANG:$LANG,
  TASKFOR:$TASKFOR,
  STATUS:$STATUS,
  SUBJECT:$SUBJECT,
  TASKOWNER:$TASKOWNER,
  PRIORITYID:$PRIORITYID,
  FROMDATE:$FROMDATE,
  TODATE:$TODATE,
  TASKOF:$TASKOF,
  TASKOFID:$TASKOFID,
  isDashboard:$isDashboard,
  )
{

TASKID
CLNT
LANG
TASKFOR
TASKOWNER
SUBJECT
STARTDATE
DUEDATE
STATUSID
STATUS
PRIORITYID
PRIORITY
PERCNTCOMPL
REMINDERREQ
REMINDERDT
REMINDERTM
TASKDETAILS
TASKOF
TASKOFID
}
}`;


// Mutation For Case status Update a Genrate Invoice 
export const CaseStatusInoviceCRUDOps = gql`mutation BulkCaseOperation
(
  $invoices : [Invoices!]!,
  $transaction :TransactionTypes!,
  $casestatus:[CaseStatus!]!
)
{
  Invoices : InvoicesCRUDOps
  (
    invoices : $invoices,
    transaction : $transaction
  )
  {
    DocHeader {
      CLNT
      LANG
      DOCID
      DOCDT
      DOCTYPE
      DOCNO
      PONO
      RMKS
      CURRENCY
      DUEDT
      DOCHDR
      TOT
      CUSTCD
      INVDT
      BAL
      CMPN
      CMPNNM
      CUSTOMER
      STATUS
      VENDORCD
      CIDSYS
      PAYMENTBY
    }
    DocDetails {
      CLNT
      LANG
      LINEITEMNO
      DOCID
      PARTNUMBER
      PARTDESC
      RATE
      QUANTITY
      TAX
      AMOUNT
      SIGN
      ACCCODE
    }
    TaxAmounts {
      CLNT
      LANG
      DOCID
      DOCTYPE
      GEOGRAPHY
      DATE
      TAXTYPE
      LINEITEMNO
      AMOUNT
      RATE
      TAXAMOUNT
      TAXTEXT
      SIGN
      CORDER
    }
  },
  
  CaseStatus : UpdateCaseStatus(
    casestatus:$casestatus    
  )

}`;





// doc detail query
export const documentDetailsQuery = gql`
query($CLNT:String!,
  $LANG:String!,
  $CENTITYID:String!
  $CENTITY:String! 
  $SRNO:String!) {
  documentDetails(
    CLNT:$CLNT
  	LANG:$LANG
    CENTITYID:$CENTITYID
    CENTITY:$CENTITY
    SRNO:$SRNO
  )
    {
      NOTE
      CENTITY
      CENTITYID
      SRNO
      CIMGDOC
    }
}`


// update doc query
export const updateDocQuery = `
mutation($CLNT:String!
  $LANG:String!
  $CENTITY:String!
  $CENTITYID:String!
  $NOTE:String!
  $SRNO:String!
  $CIMGDOC:String
){
    editDocuments(
      CLNT:$CLNT
      LANG:$LANG
      CENTITY:$CENTITY
      CENTITYID:$CENTITYID
      NOTE:$NOTE
      SRNO:$SRNO
      CIMGDOC:$CIMGDOC
    )  
  }`


  export const UploadDocQuery = `mutation uploaddocuments($CLNT:String,$LANG:String,$CENTITY:String,$CENTITYID:String,$NOTE:String,$CIMGDOC:String)
  {
      uploadDocuments(CLNT:$CLNT,LANG:$LANG,CENTITY:$CENTITY,CENTITYID:$CENTITYID,NOTE:$NOTE,CIMGDOC:$CIMGDOC) 
    }
  `;


// Query For Search Services
export const searchServices = gql`query searchServices ($clnt: String!, $lang: String!, $doctyp: String!) {
  searchServices(CLNT: $clnt, LANG: $lang, STDESC: $doctyp) {
    CATCODE
    CATDESC
    STCODE
    STDESC
    ORDERNO
    ISACTIVE 
  }
}`;



//Fetch Client Details query
export const excelDocListQuery = gql`
query($CLNT:String!,$LANG:String!){
  searchCompanyDocuments(
    CLNT:$CLNT,
    LANG:$LANG
  )
  {
    DOCTYPE
    DOCID
    DOCNM
     
  }
}`


export const SignatureCrudOps=gql `
mutation($ESignatures:[ESignatures!]!,$transaction:TransactionTypes!){
    ESignatureCRUDOps(
      ESignatures:$ESignatures
      transaction:$transaction
    )
    
  }`;

 export const SearchSignature=gql`
 query($CLNT:String!,$LANG:String!,$SIGNATUREID:String,$CID:String!,$CIDSYS:String){
    searchESignatures(CLNT:$CLNT,LANG:$LANG,SIGNATUREID:$SIGNATUREID,CID:$CID,CIDSYS:$CIDSYS){
      SIGNATUREID
      CID
      CIDSYS
      FONTTYPE
      TAGOPEN
      TAGCLOSE
      SIGNATURE
    }
  }` 


//search BillableCaseHours Query
export const searchBillableCaseHoursQuery = gql`
query(
  $CLNT:String!
  $LANG:String!
  $CLNTID:String!
  $CIDSYS:String!
  $FROMDATE:String!
  $TODATE:String!
  $ISBILLED:String!
  
){
  searchBillableCaseHours(
    CLNT:$CLNT
    LANG:$LANG
    CLNTID:$CLNTID
    CIDSYS:$CIDSYS
   FROMDATE:$FROMDATE
    TODATE:$TODATE
    ISBILLED:$ISBILLED
  )
  {
    CLIENTNAME
    CIDSYS
    CLNTHW
    CLNTID
    FIRSTNM
    CASETL
    SERVICETYP
    RPTDATE
    RPTTXT
    WORKCAT
    CATDESC
    CDATE
    CUSER
    WORKHOURS
    PRGRPTID
    PRGWORKID
    ISBILLED
    RATE
  }
}`;


//generate Invoice In Cases-BillableHrs (bulk query-create invoice,update progress report)
export const generateInvoiceQuery = gql`
mutation generateInvoiceInCasesBillableHrs
(
  $invoices : [Invoices!]!,
  $transaction :TransactionTypes!,
  $progressreportsIsBilled:[ProgressReports!]!
)
{
    Invoices : InvoicesCRUDOps
  (
    invoices : $invoices,
    transaction : $transaction
  ){
    DocHeader {
      CLNT
      LANG
      DOCID
      DOCDT
      DOCTYPE
      DOCNO
      PONO
      RMKS
      CURRENCY
      DUEDT
      DOCHDR
      TOT
      CUSTCD
      INVDT
      BAL
      CMPN
      CMPNNM
      CUSTOMER
      STATUS
      VENDORCD
      CIDSYS
      PAYMENTBY
    }
    DocDetails {
      CLNT
      LANG
      LINEITEMNO
      DOCID
      PARTNUMBER
      PARTDESC
      RATE
      QUANTITY
      TAX
      AMOUNT
      SIGN
      ACCCODE
    }
    TaxAmounts {
      CLNT
      LANG
      DOCID
      DOCTYPE
      GEOGRAPHY
      DATE
      TAXTYPE
      LINEITEMNO
      AMOUNT
      RATE
      TAXAMOUNT
      TAXTEXT
      SIGN
      CORDER
    }
  },
 
  ToggleProgressWorkBilling(
    progressreports : $progressreportsIsBilled
  )
}`


//mark as billed query
export const MarkAsBilledQuery = gql`
mutation($progressreports:[ProgressReports!]!){
  ToggleProgressWorkBilling(
    progressreports : $progressreports
  )
}`




//Excel_Doc DDL Query
export const ExcelDocDDLQuery = gql`
query ($CLNT:String!, $LANG:String!){
  populateDDL(
    ddlName: EXCEL_DOCS,
    paraArray :[$CLNT, $LANG]
    
  ) {
    CODE
    DESC
  }
}`

//upload company doc query
export const uploadCompanyDocumentsQuery = `
mutation($CLNT:String! $LANG:String! $DOCTYPE:String! $APPEND:Boolean!){
  uploadCompanyDocuments(
    CLNT:$CLNT
  	LANG:$LANG
    DOCTYPE:$DOCTYPE
    APPEND:$APPEND)
}`

//upload company doc query
export const deleteCompanyDocumentsQuery = gql`
mutation($CLNT:String!,$LANG:String!,$DOCID:String!)
{
  deleteCompanyDocuments(
    CLNT:$CLNT
    LANG:$LANG
    DOCID:$DOCID
  )
}`


//search BillableHoursHeader Query
export const searchBillableHoursHeaderQuery = gql`
query($CLNT:String!,$LANG:String!,$FIRSTNM:String,$LASTNM:String,$FROMDATE:String!,$TODATE:String!){
  searchBillableHoursHeader
  (
    CLNT:$CLNT,
    LANG:$LANG,
    FROMDATE:$FROMDATE,
    TODATE:$TODATE,
    FIRSTNM:$FIRSTNM,
    LASTNM:$LASTNM
    
  )
  {
    CLNTID
    CLIENTNAME
    CLNTHW
  }
}`;


//search BillableHoursDetails Query
export const searchBillableHoursDetailsQuery = gql`
query BillableHoursDetails(
  $CLNT:String!,
   $LANG:String!,
   $FROMDATE:String! ,
    $TODATE:String! ,
     $CLNTID:String!
){
  searchBillableHoursDetails(
    CLNT :$CLNT,
    LANG : $LANG,
    FROMDATE :$FROMDATE ,
    TODATE :$TODATE ,
    CLNTID : $CLNTID
  ) {
    CLIENTNAME
    CIDSYS
    CLNTHW
    CLNTID
    FIRSTNM
    CASETL
    SERVICETYP
    RPTDATE
    RPTTXT
    WORKCAT
    CATDESC
    CDATE
    CUSER
    WORKHOURS
    PRGRPTID
    PRGWORKID
    ISBILLED
    RATE
  }
}`



//update lineitemno in TPROGRESSWORK table
export const UpdateProgressAgainstInvoiceQuery = gql`
mutation($progressreports:[ProgressReports!]!)
{
  UpdateProgressAgainstInvoice(
    progressreports :$progressreports
  )
}`


//search BilledHoursDetails Query
export const searchBilledHoursDetailsQuery = gql`
query($CLNT:String!,$LANG:String!,$CLNTIDS:String!){
  searchBilledHoursDetails
  (
    CLNT:$CLNT,
    LANG:$LANG,
   CLNTIDS:$CLNTIDS
    
  )
  {
  DOCNO
    DOCDT
    CLIENTNAME
    CASETL
    SERVICETYP
    RPTDATE
    RPTTXT
    WORKCAT
    CDATE
    CLNTBILLABLEHW
    WORKHOURS
    PRGRPTID
    CIDSYS
    CLNTID
    PRGWORKID
    RATE
    
  }
}`


// mutation For Rate cards CRUDOps
export const RatecardsCRUDOps=gql`mutation RateCard
(
  
  $Ratecards : [Ratecards!]!,
  $transaction :TransactionTypes!
)
{
RateCardAffected : RatecardsCRUDOps
  (
    
    ratecards : $Ratecards
    transaction : $transaction
  )

}`;


// Query For ratecardDetails
export const ratecardDetails=gql`query ($CLNT: String!, $LANG: String!, $CLIENTID: String, $CIDSYS: String, $ITEMID: String)
{
  ratecardDetails(CLNT: $CLNT, LANG: $LANG, CLIENTID: $CLIENTID, CIDSYS: $CIDSYS, ITEMID: $ITEMID) 
  {
    CLNT
    LANG
    CLIENTID
    CIDSYS
    ITEMDECS
    ITEMRATE
    ISACTIVE
    ITEMID
  }
}`;

// Query For Search rate cards
export const Searchratecards=gql`query ($CLNT: String!, $LANG: String!, $CLIENTID: String, $CIDSYS: String, $ITEMID: String,$ITEMDECS:String,$ISACTIVE:String,$exactMatch:Boolean)
{
 searchRatecards(CLNT: $CLNT, LANG: $LANG, CLIENTID: $CLIENTID, CIDSYS: $CIDSYS, ITEMID: $ITEMID,ITEMDECS:$ITEMDECS,ISACTIVE:$ISACTIVE,exactMatch:$exactMatch) 
  {
    CLNT
    LANG
    CLIENTID
    CIDSYS
    ITEMDECS
    ITEMRATE
    ISACTIVE
    ITEMID
  }
}`;

export const searchPassword = gql`query($CLNT: String!, $LANG: String!, $APPLICATIONID: String!, $USERNAME: String!) {
  searchPassword(APPLICATIONID: $APPLICATIONID, CLIENT: $CLNT, LANG: $LANG, USERNAME: $USERNAME) {
    TSTATUS
    SUCCESS_MSG
    FAIL_MSG
  }
}`;

// Query For Searc Mail List
export const SearchMailList = gql`
  query(
    $CLNT: String!
    $LANG: String!
    $MAILFOR: String!
    $MAILFORID: String!
    $FROMDATE: String
    $TODATE: String
    $CUSER: String
  ) {
    searchMailsList(
      CLNT: $CLNT
      LANG: $LANG
      MAILFOR: $MAILFOR
      MAILFORID: $MAILFORID
      FROMDATE: $FROMDATE
      TODATE: $TODATE
      CUSER: $CUSER
    ) {
      CLNT
      LANG
      MAILLOGID
      MAILCC
      MAILSUB
      MSGBODY
      CDATE
      CUSER
    }
  }
`;