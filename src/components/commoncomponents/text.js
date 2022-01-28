import React,{ Component } from 'react';
class Text extends React.Component {
    render() {
       console.log(this.props);
        return (
        
          <input className="form-control" type="text"  placeholder={this.props.placeholder} value={this.props.value}  onChange={this.props.onChange}/>
        
             );
    
    }
 }
 
export default Text;