import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_PENDING,
  FETCH_MESSAGE
  
} from '../actions/types';


const initialstate ={authenticated: false,authUser:{}}

export default function(state = initialstate, action) {

  switch(action.type) {
    case AUTH_PENDING:
    return { ...state,errors: action.payload, authenticated: false, authprocess : 'pending',authUser:{} }; 
    case AUTH_USER:
      return { ...state,authenticated: true ,authprocess : 'done',authuser:action.payload };
    case UNAUTH_USER:
      return { ...state,errors: action.payload, authenticated: false , authprocess : 'done',authUser:{} };
    case AUTH_ERROR:
      return { ...state, errors: action.payload , authenticated: false , authprocess : 'done',authUser:{}} ;
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
  }
  //console.log('auth state');
  //console.log(state);
  return state;
}
