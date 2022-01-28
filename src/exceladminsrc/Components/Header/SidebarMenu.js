import React, { Component } from 'react'
import { Button, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
import Header from './Header';

import SidebarPushable from './SidebarPushable';
import Main from '../../../components/FormComponents/Main';
import { BrowserRouter as Router, Route, Link,Switch} from "react-router-dom";


class SidebarMenu extends Component {
    constructor(props)
    {
        super(props);
        this.setSideBarVisibility = this.setSideBarVisibility.bind(this);
        this.state = { sideBarVisible: false }
    
    }


  handleButtonClick = () => this.setState({ sideBarVisible: !this.state.sideBarVisible })

  handleSidebarHide = () => this.setState({ sideBarVisible: false })

  setSideBarVisibility = (visibility) => { 
      console.log('in setSideBarVisibility');
     if(visibility=='visible') 
      { 
          this.setState({ sideBarVisible: true }) 
          return;  
       } 

    if(visibility=='hidden') 
    { 
        this.setState({ sideBarVisible: false }) 
        return;
    }  

    this.setState({ sideBarVisible: !this.state.sideBarVisible })


}  
  
  render() {
   
    return (
            <div>
  <i aria-hidden='true' className='sidebar large icon' style={  {marginTop:10, backgroundColor:'white',  float:'left' } } onClick={this.setSideBarVisibility} />
   <Header  /> 

  <SidebarPushable   setSideBarVisibility={this.setSideBarVisibility} sideBarVisible={this.state.sideBarVisible} />

</div>

       




               
  


        
        

             )
  }
}


export default SidebarMenu;
  