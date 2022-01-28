import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import {
    ActionToDispatch,
    ActionToRedirect,
   handleSignoutUsernameJWT,
    checkCurrentUsernameJWT
  } from '../../../actions';
  import { connect } from 'react-redux';
 
 
 
 
 
 
 
 
 
 
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
 
 
 

 
 
    state = { activeItem: 'home' }
 
    handleItemClick = (e, { name }) =>
    {
    this.setState({ activeItem: name })
    }
 
 
    handleItemClickDashboard = (e, { name }) =>
    {
    this.setState({ activeItem: name })
this.props.ActionToRedirect('/dashboard');
    }
 
 
 
    handleItemClickProfile = (e, { name }) =>
    {
    this.setState({ activeItem: name })
this.props.ActionToRedirect('/profile');
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

          
 
    render() {
        
       console.log('Header'); 
        const { activeItem } = this.state
 
if(this.props.authuser)
{
    console.log('this.props.authuser.authenticated start' );
    console.log(this.props );
    console.log('this.props.authenticated end' );
   
    // if(this.props.authprocess=='pending')
    // {
    //   return (
    //     <div className="ui icon header">
    //     <div className="ui active loader"></div>          
    //   </div>
    //   )
    // }
 
 
 
 
    
    if(this.props.authenticated)
{
        return (
 
               <div>
                <Menu size='small'>
                <Menu.Item name='EXCELL IINVESTIGATIONS' active={activeItem === 'home'} onClick={this.handleItemClickDashboard} />
                <Menu.Item
                  name='ADMIN CONTROL PANEL'
                  active={activeItem === 'messages'}
                  onClick={this.handleItemClickDashboard}
                />
        
                <Menu.Menu position='right'>
                <Menu.Item name={ this.props.authuser.username } active={activeItem === 'home'} onClick={this.handleItemClickDashboard} />
                  <Dropdown item text='MENU'>
                    <Dropdown.Menu>
                      <Dropdown.Item ><Link to={'/leads'}>Leads</Link></Dropdown.Item>
                      <Dropdown.Item ><Link to={'/customers'}>Customer</Link></Dropdown.Item>
                      <Dropdown.Item ><Link to={'/contacts'}>Contact</Link></Dropdown.Item>
                      <Dropdown.Item ><Link to={'/tasks'}>Task</Link></Dropdown.Item>
                      <Dropdown.Item ><Link to={'/billing'}>Billing</Link></Dropdown.Item>
                      <Dropdown.Item ><Link to={'/cases'}>Cases</Link></Dropdown.Item>
                      <Dropdown.Item ><Link to={'/users'}>Users</Link></Dropdown.Item>
                      <Dropdown.Item ><Link to={'/settings'}>Setting</Link></Dropdown.Item>
                      <Dropdown.Item ><Link to={'/fileupload'}>File Upload </Link></Dropdown.Item>
 
                    </Dropdown.Menu>
                  </Dropdown>
                  <Menu.Item name='PROFILE' active={activeItem === 'home'} onClick={this.handleItemClickProfile} />
                  <Menu.Item>
                    <Button primary onClick={this.onLogoutClick}>Sign Out</Button>
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
                 </div>
 
                    )
                }
            
            else{
 
                return(
 
                <div>
 
 
 
 
 
 
 
 
 
 
 
 
 
                </div>
 
                )
            }
 
        }
 
 
 
                        else{
                    return(
                    <div>
 
                    </div>
                    )
                }
 
 
 
 
 
 
 
                }
}
 
 
const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated,
      authprocess: state.auth.authprocess,
      authuser: state.auth.authuser,
    };
 
  };
  
  export default connect(
    mapStateToProps,
    { ActionToDispatch,ActionToRedirect
     }
  )(Header);
  