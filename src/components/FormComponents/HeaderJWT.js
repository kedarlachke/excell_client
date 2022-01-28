import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {ActionToDispatch,ActionToRedirect,handleSignoutUsernameJWT, checkCurrentUsernameJWT} from '../../actions'
import ErrorBoundary from '../commoncomponents/ErrorBoundary';



// The Header creates links that can be used to navigate
// between routes.

class Header extends Component {
     constructor(props) {
        super(props)
        this.state={
            formErrors:[],
            formErrorMessage:'' 
        };
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.handleProcessLogout = this.handleProcessLogout.bind(this);
    }



    componentWillMount() 
    {
        var result='',errorMessage='',errors=[];
        checkCurrentUsernameJWT((err,result) =>
        {
                if(!err){
                if(!result)
                {
                    this.props.ActionToDispatch({ type: 'UNAUTH_USER' ,payload : [''] });
                }
                else
                {
                   this.props.ActionToDispatch({ type: 'AUTH_USER' ,payload : result});
                }   
                 }
            }
       
       
        );
  }
    

  async handleProcessLogout() 
  {
       
    handleSignoutUsernameJWT(async () =>
  {
           
          checkCurrentUsernameJWT((err,result)=>
          { 
                console.log('In result handleSignoutUsernameJWT');
             if(!result)
              {
                console.log('In result handleSignoutUsernameJWT -1');
                  this.props.ActionToDispatch({ type: 'UNAUTH_USER' ,payload : [''] });
                  this.props.ActionToRedirect('/signin');
              } 
              else
              {
                console.log('In result handleSignoutUsernameJWT-2');
                  this.props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : err });
               
              }
          }
      );
  
      }
   );
  
  
  }
  
  



    onLogoutClick(event) 
    {
         try{ this.handleProcessLogout();   }
         catch(err)  {  this.state.formErrorMessage=err;} 
         event.preventDefault();
          }

    renderHeaderOptions()
    {
     
        
        if(this.props.authenticated)
        {
            return(
              
                <div>
                     <li>
                <Link to='/dashboard'>Dashboard JWT</Link>
                </li>
            <li>
                <Link to='/'>Home</Link>
                </li>
                <li>
                    <a onClick={this.onLogoutClick}>Logout JWT</a>
                    </li>
                    </div>
                  
        )
        }
        else
        {
        return(
            
            <div>
                    <li>
                <Link to='/dashboard'>Dashboard JWT</Link>
                </li>
        <li>
            <Link to='/'>Home</Link>
            </li> 
            <li>
                <Link to='/signup'>Sign Up JWT</Link>
                </li>
        <li>
            <Link to='/signin'>Sign In JWT</Link>
            </li>
              </div>
           
    )
        }

    }
    
    

render() {
 return ( 
    <ErrorBoundary>
    <header>
    <nav>
      <ul>
       {this.renderHeaderOptions()}
      </ul>
    </nav>
   
  </header>
   </ErrorBoundary>
 );

}
}
const mapStateToProps = (state) => { 
    
    return { authenticated:state.auth.authenticated };
   };
   
export default connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect})(Header);
