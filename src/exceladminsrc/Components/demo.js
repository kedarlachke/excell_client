
import React from "react";
import { render } from "react-dom";
export default class IncorporationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      shareholders: [{ name: '',mobile:'' }],
    };
  }
  
  handleNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }
  
  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value[idx]  };
    });
    
    this.setState({ shareholders: newShareholders });

    console.log(`Share Holder${this.state.shareholders}`)
  }
  
  handleSubmit = (evt) => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  }
  
  handleAddShareholder = () => {
    this.setState({ shareholders: this.state.shareholders.concat([{ name: '', mobile:'' }]) });
  }
  
  handleRemoveShareholder = (idx) => () => {
    this.setState({ shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx) });
  }
  
  render() {    
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Company name, e.g. Magic Everywhere LLC"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      
        <h4>Shareholders</h4>
      
        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder">
            <input
              type="text"
              placeholder={`Shareholder #${idx + 1} name`}
              value={shareholder.name}
              onChange={this.handleShareholderNameChange(idx)}
            />
            <input
              type="text"
              placeholder={`Shareholder #${idx + 1} mobile`}
              value={shareholder.mobile}
              onChange={this.handleShareholderNameChange(idx)}
            />
            <button type="button" onClick={this.handleRemoveShareholder(idx)} className="small">Delete</button>
          </div>
        ))}
        <button type="button" onClick={this.handleAddShareholder} className="small">Add Shareholder</button>
        <button>Incorporate</button>
      </form>
    )
  }
}

// export default class App extends React.Component {
//   state = {
//     rows: [{}]
//   };
//   handleChange = idx => e => {
//     const { name, value } = e.target;
//     const rows = [...this.state.rows];
//     rows[idx] = {
//       [name]: value
//     };
//     this.setState({
//       rows
//     });
//   };
//   handleAddRow = (event) => {
//     const item = {
//       name: "",
//       mobile: "",
//       btn: ""
//     };
//     event.preventDefault()
//     this.setState({
//       rows: [...this.state.rows, item]
//     });
//   };
//   handleRemoveRow = (idx) => {
//     this.state.rows.splice(idx, 1);

//     this.setState({

//       rows: this.state.rows
//     });
//   };
//   render() {
//     return (
//       <div>
//         <div className="container">
//           <div className="row clearfix">
//             <div className="col-md-12 column">
//               <table
//                 className="table table-bordered table-hover"
//                 id="tab_logic"
//               >
              
//                 <tbody>
//                   {this.state.rows.map((item, idx) => (
//                     <div className="five row" id="addr0" key={idx} >
//                       <div className="one wide column">
//                         <div className="field">
//                           <div className="ui icon" style={{ backgroundColor: "#f76060", color: "white", height: 35, width: 40, textAlign: "center", borderRadius: 2 }} onClick={() => this.handleRemoveRow(idx)}>
//                             <i className="trash alternate icon" style={{ marginTop: 8 }}></i>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="five wide column">
//                         <div className="field">
//                           <input type="text" name="text" placeholder="text" value={this.state.rows[idx].text} onChange={this.handleChange(idx)} />
//                         </div>
//                       </div>

//                       <div className="three wide column">
//                         <div className="field">
//                           <select className="ui fluid selection search dropdown " name="tax" id="tax_dropdown" value={this.state.rows[idx].tax} onChange={this.handleChange.bind(this)}>
//                             <option defaultValue="">Select</option>
//                             <option value="STAX">STAX</option>
//                             <option value="VAT">VAT</option>
//                           </select>
//                         </div>
//                       </div>

//                       <div className="three wide column">
//                         <div className="field">
//                           <input type="text" name="amount" placeholder="amount"  value={this.state.rows[idx].amount} onChange={this.handleChange(idx)} />
//                         </div>
//                       </div>
//                     </div>
                   
//                                     ))}
//                 </tbody>
//               </table>
//               <button onClick={e=>this.handleAddRow(e)} className="btn btn-primary">
//                 Add Row
//                             </button>
//               {/* <button onClick={this.handleRemoveRow} className="btn btn-danger float-right"
//                             >
//                                 Delete Row
//                          </button> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }






// import React, { Component, } from 'react';
// // import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { values: [] };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   createUI(){
//      return this.state.values.map((el, i) => 
//          <div key={i}>
//     	    <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
//     	    <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
//          </div>          
//      )
//   }

//   handleChange(i, event) {
//      let values = [...this.state.values];
//      values[i] = event.target.value;
//      this.setState({ values });
//   }

//   addClick(){
//     this.setState(prevState => ({ values: [...prevState.values, '']}))
//   }

//   removeClick(i){
//      let values = [...this.state.values];
//      values.splice(i,1);
//      this.setState({ values });
//   }

//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.values.join(', '));
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//           {this.createUI()}        
//           <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
//           <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }


// export default class DocumentsFieldSet extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       documents: [],
//       formValues: {},

//     }

//   }

//   render() {

//     return <div>
//       <div id="model">Open Model</div>
//       <div className="ui basic modal">
//         <div className="ui icon header">
//           <i className="archive icon"></i>
//           Archive Old Messages
//   </div>
//         <div className="content">
//           <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
//         </div>
//         <div className="actions">
//           <div className="ui red basic cancel inverted button">
//             <i className="remove icon"></i>
//             No
//     </div>
//           <div className="ui green ok inverted button">
//             <i className="checkmark icon"></i>
//             Yes
//     </div>
//         </div>
//       </div>

//       <div className="ui search multiple selection dropdown">MENU
//       <i className="dropdown icon" />
//         <div className=" menu" >
//           <div className="item">
//             DASHBOARD
//                                       </div>

//           <div className="item">
//             CONTACT
//                                    </div>


//           <div className="item">
//             LEADS
//                                   </div>


//           <div className="item">
//             CUSTOMER
//                                      </div>

//           <div className="item">
//             CASES
//                                    </div>
//           <div className="item">
//             BILLING
//                                  </div>

//           <div className="item">
//             TASKS
//                                  </div>

//           <div className="item">
//             USERS
//                                  </div>

//           <div className="item">
//             SETTINGS
//                                  </div>

//           <div className="item">
//             FILE UPLOAD
//                                  </div>
//         </div>

//       </div>
//     </div>
//   }
// }



// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       values: []
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   createUI() {
//     return this.state.values.map((el, i) =>
//       <div key={i}>
//         <div className="five row">
//           <div className="one wide column">
//             <div className="field">
//               <div className="ui icon" style={{ backgroundColor: "#f76060", color: "white", height: 35, width: 40, textAlign: "center", borderRadius: 2 }} onClick={this.removeClick.bind(this, i)}>
//                 <i className="trash alternate icon" style={{ marginTop: 8 }}></i>
//               </div>
//             </div>
//           </div>
//           <div className="five wide column">
//             <div className="field">
//               <input type="text" name="textInput" placeholder="text" value={el || ''} onChange={this.handleChange.bind(this, i)} />
//             </div>
//           </div>
//           <div className="three wide column">
//             <div className="field">
//               <select className="ui fluid selection search dropdown " name="tax" id="tax_dropdown" value={el || ''} onChange={this.handleChange.bind(this, i)}>
//                 <option value="STAX">STAX</option>
//                 <option value="VAT">VAT</option>
//               </select>
//             </div>
//           </div>
//           <div className="three wide column">
//             <div className="field">
//               <input type="text" name="amount" placeholder="amount" value={el || ''} onChange={this.handleChange.bind(this, i)} />
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   handleChange(i, event) {
//     console.log(`iii------>>>>${i}`)
//     let values = [...this.state.values];
//     console.log(`[...this.state.values]${[...this.state.values]}`)
//     console.log(`event.target.value${event.target.value}`)
//     values[i] = event.target.value;
//     this.setState({ values });
//     console.log(`{ values }${values}`)
//   }

//   addClick() {
//     this.setState(prevState => ({ values: [...prevState.values, ''] }))
//   }

//   removeClick(i) {
//     let values = [...this.state.values];
//     values.splice(i, 1);
//     this.setState({ values });
//   }

//   handleSubmit(event) {
//     alert('A name was submitted: ' + this.state.values.join(', '));
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         {this.createUI()}
//         <input type='button' value='add more' onClick={this.addClick.bind(this)} />
//         <input type="submit" value="Submit" />
//         <div>{`A name was submitted: ' ${this.state.values.join(', ')} `}</div>
//       </form>
//     );
//   }
// }