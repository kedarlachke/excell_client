import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { execGql } from "../apolloClient/apolloClient";
import { searchPassword } from '../Queries/queries'

export default class Send_Mail extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            showMailPopup:'flex',
            message: ''
        };
    };


     /*-----------------------to close mail popup--------------------*/
    closeMailPopup(){
        this.setState({
            showMailPopup:'none'
        })
    }

       /*-----------------------to show msg after mail sending--------------------*/
       showMsg() {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }



     // To send Mail
     async senMail() {
        var result = '', errorMessage = '', errors = [];
        try {
            result = await execGql('query', searchPassword, this.setParams())

        }
        catch (err) {
            errors = err.errorsGql;
            errorMessage = err.errorMessageGql;
        }

        if (!result) {
            console.log(errors);
            console.log(errorMessage);
        }
        else {
            console.log('result 1');
            console.log(result.data.searchPassword[0].TSTATUS);
            console.log('result 1');
            if (result.data.searchPassword[0].TSTATUS === 'SUCCESS') {
                await this.setState({ message: 'Mail sent' })
                this.showMsg()
            }
            else if (result.data.searchPassword[0].TSTATUS === 'FAILED') {
                await this.setState({ message: 'Mail Not sent' })
                this.showMsg()
            }
        }

    };

    setParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "APPLICATIONID": "",
            "USERNAME": this.state.email,
        }
        return parameters

    };
    render() {

        return (
            <div className="ui one column grid">

                    <div className=" row">

                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>

                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <h1 id="title_header" style={{ color: "#fff" }}>FORGOT PASSWORD</h1>
                        </div>

                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>

                    </div>

                    <div className=" row">

                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>

                        <div className="ten wide computer ten wide tablet ten wide mobile column">


                        <div className="ui segment">
                            <div className="ui form">
                                <div className="ui three column stackable grid">

                                    <div className="row">
                                        <div className="eight wide column">
                                            <div className="field"style={{ textAlign: "left" }}>
                                                <label > Email</label>
                                                <input type="text" name="email" placeholder="Email" 
                                                    value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                             <div className="row">
                                    <div className="five wide column"style={{ marginTop:12 }}>
                                             <button className="ui primary button" type="submit" onClick={() => this.senMail()}>Send</button>
                                             <Link to={'/customersignin'}>  Back To Login? </Link >  
                                        </div>
                                        </div>

                                        
                                </div>
                            </div>
                        </div>

                         {/*msg after mail sending*/}
                         <div id="snackbar">  <i className="info circle icon"></i>{this.state.message}</div>
                    </div>
                </div>

            </div>
        );
    }
}