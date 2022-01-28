import React, { Component, } from 'react';

export default class AddInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [{}],
            invoiceno: "",
            customer: "",
            invoicedate: "",
            duedate: "",
            header: "",
            remark: "",

        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = idx => e => {
        const { name, value } = e.target;
        const rows = [...this.state.rows];
        var cname="";
        cname= name;
        var serviceValue=this.state.rows[idx].service;
        var taxValue=this.state.rows[idx].tax;
        var amountValue=this.state.rows[idx].amount;

        if(cname=="service")
        {
            serviceValue=value;
        }
        else if (cname=="tax")
        {
            taxValue=value;
        }
        else if (cname=="amount")
        {
            amountValue=value;
        }
        rows[idx] = {
            service: serviceValue,
            tax:taxValue,
            amount:amountValue
        };
        this.setState({
            rows
        });

        console.log(this.state.rows)
       
     };
    handleAddRow = () => {
     
        this.setState({
            rows: [...this.state.rows, '']
        });
       
    };

    handleAddRow = () => {

        this.setState({ rows: [...this.state.rows, ''] });
      
    };

    handleRemoveRow = (idx) => {
        this.setState({ rows: this.state.rows.filter((s, sidx) => idx !== sidx) });
       
    };

    onSubmit() {
        alert(JSON.stringify(
            {
                "invoice_no": this.state.invoiceno,
                "customer": this.state.customer,
                "invoice_date": this.state.invoicedate,
                "due_date": this.state.duedate,
                "header": this.state.header,
                "remark": this.state.remark,
                "items": this.state.rows
            }
        )
        );
    }

    render() {
        return (
            <div className="ui one column grid">
                <div className=" row">
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                    <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                        <h1 id="title_header">INVOICE-ADD NEW</h1>
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                </div>
                <div className=" row">
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                    <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                        <div  className="ui segment" >
                            <div className="ui form">
                                <div className="ui  stackable grid">
                                  
                                <div className="one row">
                                    <div className="five wide column">
                                        <div className="field">
                                            <label>Invoice No</label>
                                            <input type="text" name="invoiceno" placeholder="Invoice No" value={this.state.invoiceno} onChange={e => this.setState({ invoiceno: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className=" five wide column">
                                        <div className="field">
                                            <label>Customer</label>
                                            <select name="customer" value={this.state.customer} onChange={e => this.setState({ customer: e.target.value })}>
                                                <option defaultValue="">select</option>
                                                <option value="sohanpatil@gmail.com">sohanpatil@gmail.com</option>
                                                <option value="mayurawati@gmail.co">mayurawati@gmail.com</option>
                                                <option value="nasirpatel@gmail.com">nasirpatel@gmail.com</option>
                                                <option value="nandkishorshinde@gmail.com">nandkishorshinde@gmail.com</option>
                                            </select>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="one row">
                                        <div className="five wide column">
                                            <div className="field">
                                                <label>Invoice Date</label>
                                                <div className="ui calendar" id="calender1">
                                                    <div className="ui input right icon">
                                                        <i className="calendar icon"></i>
                                                        <input type="text" placeholder="Invoice Date" value={this.state.invoicedate} onBlur={e => this.setState({ invoicedate: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="five wide column">
                                            <div className="field">
                                                <label>Due Date</label>
                                                <div className="ui calendar" id="calender2">
                                                    <div className="ui input right icon">
                                                        <i className="calendar icon"></i>
                                                        <input type="text" placeholder="Due Date" value={this.state.duedate} onBlur={e => this.setState({ duedate: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="two row">
                                        <div className="five wide column">
                                            <div className="field">
                                                <label>Header</label>
                                                <input type="text" name="header" placeholder="Header" value={this.state.header} onChange={e => this.setState({ header: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="five wide column">
                                            <div className="field">
                                                <label>Remark</label>
                                                <input type="text" name="remark" placeholder="Remark" value={this.state.remark} onChange={e => this.setState({ remark: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="three row">
                                        <div className="ten wide column">
                                            <button className="ui primary button" type="submit" onClick={() => this.onSubmit()}>Save</button>
                                            <button className="ui  button" type="submit">Clear</button>
                                            <button className="ui  button" type="submit">Cancel</button>
                                        </div>
                                    </div>

                                    <div className="foure row">
                                        <div className="one wide column">
                                            <div className="field">
                                                <h4 style={{ textAlign: "center", borderRadius: 2 }}>Action</h4>
                                            </div>
                                        </div>
                                        <div className="two wide column" >
                                            <div className="field">
                                                <h4 >Text</h4>
                                            </div>
                                        </div>
                                        <div className="three column" style={{ marginLeft: 150 }}>
                                            <div className="field">
                                                <h4 >Tax</h4>
                                            </div>
                                        </div>
                                        <div className="foure wide column" style={{ marginLeft: 75 }}>
                                            <div className="field">
                                                <h4 >Amount</h4>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.rows.map((item, idx) => (
                                        <div className="five row" id="addr0" key={idx} >
                                            <div className="one wide column">
                                                <div className="field">
                                                    <div className="ui icon" style={{ backgroundColor: "#f76060", color: "white", height: 35, width: 40, textAlign: "center", borderRadius: 2 }} onClick={() => this.handleRemoveRow(idx)}>
                                                        <i className="trash alternate icon" style={{ marginTop: 8 }}></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="four wide column">
                                                <div className="field">
                                                    <input type="text" name="service" placeholder="text" value={this.state.rows[idx].service} onChange={this.handleChange(idx)} />
                                                </div>
                                            </div>

                                            <div className="two wide column">
                                                <div className="field">
                                                    <select name="tax"  value={this.state.rows[idx].tax} onChange={this.handleChange(idx)}>
                                                        <option defaultValue="">Select</option>
                                                        <option value="STAX">STAX</option>
                                                        <option value="VAT">VAT</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="three wide column">
                                                <div className="field">
                                                    <input type="text" name="amount" placeholder="amount" value={this.state.rows[idx].amount} onChange={this.handleChange(idx)} />
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                    <div className="six row">
                                        <div className="two wide column">
                                            <div className="field">
                                                <div className="ui icon" style={{ backgroundColor: "#c4d3d3", height: 35, width: 55, textAlign: "center", borderRadius: 2 }} onClick={this.handleAddRow}>
                                                    <i className="plus icon" style={{ marginTop: 8 }}></i>
                                                    <label>Add</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="one wide computer one wide tablet one wide mobile column">
                    </div>
                </div>
                {/* <div className="ui message">
                    <p>
                        {JSON.stringify({
                            "invoice_details": {
                                "invoice_no": this.state.invoiceno,
                                "customer": this.state.customer,
                                "invoice_date": this.state.invoicedate,
                                "due_date": this.state.duedate,
                                "header": this.state.header,
                                "remark": this.state.remark,
                                "items": this.state.rows
                            }
                        })}
                    </p>

                </div> */}
            </div>
        );
    }
}