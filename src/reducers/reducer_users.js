import _ from "lodash";
const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const AUTH_ERROR = 'AUTH_ERROR';
const FETCH_MESSAGE = 'FETCH_MESSAGE';
const CREATE_USER='CREATE_USER';
const FETCH_USER='FETCH_USER';
const FETCH_USERS='FETCH_USERS';
const DELETE_USER='DELETE_USER';
const SET_USER='SET_USER';

export default function(state = {}, action) {
    
   
    switch (action.type) {
   
      
            case FETCH_USER:
            return {...state, selected_user:action.payload };
                      
           case FETCH_USERS:
           //console.log( action.payload);
           return _.values(action.payload);
           //let data1=[1,2,3];
           //console.log(_.values(action.payload));
           //_.values(action.payload).forEach((val,index)=>{data1[val._id]=val;});
           //console.log('data1');
           //console.log(data1);
           //console.log('data1end');
           //return data1;  

            case CREATE_USER:
            return { ...state,message: action.payload} ;

            case DELETE_USER:
            return { ...state} ;

            case SET_USER:
            //console.log({...state,data:action.payload});
            return {...state,data:action.payload};

            default:
            return state;
    }
}