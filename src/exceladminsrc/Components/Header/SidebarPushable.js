import React, { Component } from 'react'
import { Button, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
import Header from './Header';
import Main from '../../../components/FormComponents/Main';
import { BrowserRouter as Router, Route, Link,Switch} from "react-router-dom";


class SidebarPushable extends Component {
    constructor(props)
    {
        super(props);
    
    }

  
  
  render() {
   
    return (

<div >
            <Sidebar.Pushable  style={{float:'left',height:1000,width:150}} >
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
         
            vertical
            visible={this.props.sideBarVisible}
            width='thin'
            
>
      <Link to={'/'} >
                                 <Menu.Item as='a' >
                                     DASHBOARD
                                </Menu.Item>
                            </Link>

                             <Link to={'/contacts'}  onClick={this.props.setSideBarVisibility} >
                                 <Menu.Item as='a'>
                                     CONTACT
                                    </Menu.Item>
                             </Link>

                             <Link to={'/leads'} onClick={this.props.setSideBarVisibility}>
                                 <Menu.Item as='a'>
                                     LEADS
                                       </Menu.Item>
                             </Link>
                         <Link to={'/customers'} onClick={this.props.setSideBarVisibility}>
                                 <Menu.Item as='a'>
                                     CUSTOMER
                                      </Menu.Item>
                             </Link>

                             <Link to={'/cases'} onClick={this.props.setSideBarVisibility}>
                                 <Menu.Item as='a'>
                                     CASES
                                      </Menu.Item>
                             </Link>

                             <Link to={"/billing"} onClick={this.props.setSideBarVisibility}>
                                 <Menu.Item as='a'>
                                     BILLING
                                          </Menu.Item>
                             </Link>

                             <Link to={'/tasks'} onClick={this.props.setSideBarVisibility}>
                                 <Menu.Item as='a'>
                                     TASKS
                                         </Menu.Item>
                             </Link>

                             <Link to={'/users'} onClick={this.props.setSideBarVisibility}>
                                 <Menu.Item as='a'>
                                     USERS
                                        </Menu.Item>
                             </Link>

                             <Link to={'/settings'} onClick={this.props.setSideBarVisibility}>
                                <Menu.Item as='a'>
                                     SETTINGS
                                            </Menu.Item>
                             </Link>

                             <Link to={'/fileupload'} onClick={this.props.setSideBarVisibility}>
                                 <Menu.Item as='a'>
                                     FILE UPLOAD
                                           </Menu.Item>
                             </Link>
          </Sidebar>

 </Sidebar.Pushable>
          </div>
         




               
  


        
        

             )
  }
}


export default SidebarPushable;
  