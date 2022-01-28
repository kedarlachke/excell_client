import React, { Component } from 'react';
import { execGql } from '../apolloClient/apolloClient';
import { createNote } from './createNote';
import { SendMailLeadQuery } from '../Queries/queries';

import { EditorState, convertToRaw } from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
var CLNT = '1002'
var LANG = 'EN'
var loggedInUser = "support@excellinvestigation.com"
var errorval = false

let config = {
    allowedContent: true
}
export default class Lead_Mail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            MailFor: 'Lead',
            From: loggedInUser,
            To: '',
            Cc: '',
            Bcc: '',
            Subject: '',
            Message: '',
            Message: EditorState.createEmpty(),
            errorFrom: '',
            errorTo: '',
            errorCc: '',
            errorBcc: '',
            errorSubject: '',
            errorMessage: '',

            showCcfield: 'none',
            showBccfield: 'none',
            showCcLabel: 'flex',
            showBccLabel: 'flex'
        }
        this.closeMailPopup = this.props.closeMailPopup.bind(this)
        this.showMsg = this.props.showMsg.bind(this)
        //this.onChange = this.onChange.bind(this)
        this.clearEditor=this.clearEditor.bind(this)
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            Message:editorState,
        });
      };

    closeMailPopup1=()=>{
        this.clearscreen()
        this.closeMailPopup()
        
    }
    componentWillReceiveProps(props) {
        console.log('----->'+props.MailFrom);
        this.setState({ To: this.props.iscase === 'CASE' ? this.props.to : props.MailFrom })
        console.log(this.props);

    }

    /*---------send mail---------*/
    async sendMail() {
       // alert(this.state.Message)
        var result = '', errorMessage = '';
        try {
            result = await execGql('mutation', SendMailLeadQuery, this.setMailSendingParams())
        }
        catch (err) {
            // errors = err.errorsGql;
            errorMessage = err.errorMessageGql;

        }

        if (!result) {
            errorval = true
            console.log(errorMessage);

            errorMessage = JSON.parse(errorMessage);
            for (let key in errorMessage) {

                this.setState({
                    errorFrom: errorMessage[key].errorFROMID,
                    errorTo: errorMessage[key].errorTOID,
                    errorSubject: errorMessage[key].errorMAILSUB,
                    errorMessage: errorMessage[key].errorMSGBODY,
                    errorCc: errorMessage[key].errorMAILCC,
                    errorBcc: errorMessage[key].errorMAILBCC,
                });
            }
        }
        else {
            console.log(result);
            createNote(this.setCreateNoteParams())
            this.clearscreen()
            this.closeMailPopup()
            this.showMsg("Mail sent Successfully.", false);
        }
    }

    /*---------set mail sending params---------*/
    setMailSendingParams() {
        //alert(draftToHtml(convertToRaw(this.state.Message)))
        var mailfor = ''
        this.props.MailFor ? mailfor = this.props.MailFor : mailfor = "Lead"
        var parameters = {
            "emails": [{
                "CLNT": "1002",
                "LANG": "EN",
                "FROMID": this.state.From,
                "TOID": this.state.To,
                "MAILFOR": mailfor,
                "MAILFORID": this.props.LeadId,
                "MAILSUB": this.state.Subject,
                "MAILCC": this.state.Cc,
                "MAILBCC": this.state.Bcc,
                "MSGBODY": draftToHtml(convertToRaw(this.state.Message.getCurrentContent())),
                "MAILLOGID": this.props.FULLNM
            }]

        }

        return parameters
    }
    /*---------set Create Note Params---------*/
    setCreateNoteParams() {
        var parameters = {
            "CLNT": "1002",
            "LANG": "EN",
            "CENTITY": "Lead",
            "CENTITYID": this.props.LeadId,
            "NOTE": this.state.Subject + draftToHtml(convertToRaw(this.state.Message.getCurrentContent()))
        }
        return parameters
    }

    //--------clears the mail form fields
    clearscreen(evt) {
        this.setState({
            From: loggedInUser,
            To: '',
            Cc: '',
            Bcc: '',
            Subject: '',
            Message: EditorState.createEmpty(),
            errorFrom: '',
            errorTo: '',
            errorCc: '',
            errorBcc: '',
            errorSubject: '',
            errorMessage: '',
        })
        //evt.editor.setData('Hi ');
        //alert('1')
    }
    clearEditor(){
       
        this.setState({Message:EditorState.createEmpty()})
    }
    
    closeCcBCc() {
        if (this.state.Cc == "") {
            this.setState({
                showCcfield: 'none',
                showCcLabel: 'flex',
            })
        }
        if (this.state.Bcc == "") {
            this.setState({
                showBccfield: 'none',
                showBccLabel: 'flex'
            })
        }

    }
    render() {
       
        const { Message } = this.state;
      
        return (
            <div>
                <div className="ui one column grid" >
                    
                    <div className=" row">
                        
                        <div className="twelve wide computer fourteen wide tablet fourteen wide mobile column">
                            <div className="ui segment ">
                                <div className="ui form">
                                    <div className="ui  stackable grid">

                                        <div className=" row">
                                            <div className="fifty  wide column">
                                                <div className="field" style={{ textAlign: "left" }}>
                                                    <label style={{ color: this.state.errorFrom ? 'brown' : null }}>From</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon"></i>
                                                        <input style={{ borderColor: this.state.errorFrom ? 'brown' : null, backgroundColor: this.state.errorFrom ? '#f3ece7' : null }}
                                                            type="text" name="from" placeholder="From" value={this.state.From} onChange={e => this.setState({ From: e.target.value })} />
                                                    </div>
                                                    <div className="field" style={{ textAlign: "left" }}>
                                                        {errorval ? <span id="errorspan">{this.state.errorFrom}</span> : null}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className=" row">
                                            <div className="fifty  wide column">
                                                <div className="field" style={{ textAlign: "left" }}>
                                                    <label style={{ color: this.state.errorTo ? 'brown' : null }}>To</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon" onClick={() => this.setState({ showCcfield: 'flex', showCcLabel: 'none' })}></i>
                                                        <input style={{ borderColor: this.state.errorTo ? 'brown' : null, backgroundColor: this.state.errorTo ? '#f3ece7' : null }}
                                                            type="text" name="TO" placeholder="To" value={this.state.To} onChange={e => this.setState({ To: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field" style={{ textAlign: "left" }}>
                                                    {errorval ? <span id="errorspan">{this.state.errorTo}</span> : null}
                                                </div>
                                                <div className="field" style={{ marginTop: 5, fontWeight: 'normal' }} >
                                                    <label onClick={() => this.setState({ showCcfield: 'flex', showCcLabel: 'none' })} style={{ display: this.state.showCcLabel, float: 'left', marginRight: 5, textDecorationLine: 'underline' }}>Cc</label>
                                                    <label onClick={() => this.setState({ showBccfield: 'flex', showBccLabel: 'none' })} style={{ display: this.state.showBccLabel, textDecorationLine: 'underline' }}>Bcc</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row" style={{ display: this.state.showCcfield }}>
                                            <div className="fifty  wide column">
                                                <div className="field" style={{ textAlign: "left" }}>
                                                    <label style={{ color: this.state.errorCc ? 'brown' : null }}>Cc</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon" onClick={() => this.setState({ showCcfield: 'none', showCcLabel: 'flex' })}></i>
                                                        <input style={{ borderColor: this.state.errorCc ? 'brown' : null, backgroundColor: this.state.errorCc ? '#f3ece7' : null }}
                                                            type="text" name="cc" placeholder="Cc" value={this.state.Cc} onChange={e => this.setState({ Cc: e.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="field" style={{ textAlign: "left" }}>
                                                    {errorval ? <span id="errorspan">{this.state.errorCc}</span> : null}
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row" style={{ display: this.state.showBccfield }}>
                                            <div className="fifty  wide column">
                                                <div className="field" style={{ textAlign: "left" }}>
                                                    <label style={{ color: this.state.errorBcc ? 'brown' : null }}>Bcc</label>
                                                    <div className="ui right icon input">
                                                        <i className="user icon" onClick={() => this.setState({ showBccfield: 'none', showBccLabel: 'flex' })}></i>
                                                        <input style={{ borderColor: this.state.errorCUSTMAIL ? 'brown' : null, backgroundColor: this.state.errorBcc ? '#f3ece7' : null }}
                                                            type="text" name="bcc" placeholder="Bcc" value={this.state.Bcc} onChange={e => this.setState({ Bcc: e.target.value })} />

                                                    </div>
                                                </div>
                                                <div className="field" style={{ textAlign: "left" }}>
                                                    {errorval ? <span id="errorspan">{this.state.errorBcc}</span> : null}
                                                </div>
                                            </div>
                                        </div>



                                        <div className=" row">
                                            <div className="fifty  wide column">
                                                <div className="field" style={{ textAlign: "left" }}>
                                                    <label style={{ color: this.state.errorSubject ? 'brown' : null }}>Subject</label>
                                                    <div className="ui right icon input">
                                                        <input style={{ borderColor: this.state.errorSubject ? 'brown' : null, backgroundColor: this.state.errorSubject ? '#f3ece7' : null }}
                                                            type="text" name="SUBJECT" placeholder="Subject" value={this.state.Subject} onChange={e => this.setState({ Subject: e.target.value })}
                                                            onClick={() => this.closeCcBCc()} />
                                                    </div>
                                                </div>
                                                <div className="field" style={{ textAlign: "left" }}>
                                                    {errorval ? <span id="errorspan">{this.state.errorSubject}</span> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row" style={{ display: this.state.Dispalydrp ? "none" : "flex" }}>
                                            <div className="fifty  wide column">
                                                <div className="field" style={{ textAlign: "left" }}>
                                                    <label style={{ color: this.state.errorMessage ? 'brown' : null }}>Message</label>
                                                    <div className="ui right icon input">
                                                        {/* <textarea style={{ borderColor: this.state.errorMessage ? 'brown' : null, backgroundColor: this.state.errorMessage ? '#f3ece7' : null }}
                                                            rows="5" name="faxno" value={this.state.Message} onChange={e => this.setState({ Message: e.target.value })}
                                                            onClick={() => this.closeCcBCc()} /> */}

                                                    {/* <CKEditor
                                                        activeClass="p10"
                                                        content={Message}
                                                        config={config}
                                                        events={{ "change": this.onChange,
                                                       
                                                    }}
                                                    /> */}
                                                    <Editor
                                                        editorState={Message}
                                                        wrapperClassName="demo-wrapper"
                                                        editorClassName="demo-editor"
                                                        onEditorStateChange={this.onEditorStateChange}
                                                    />

                                                            
                                                    </div>
                                                    <div className="field" style={{ textAlign: "left" }}>
                                                        {errorval ? <span id="errorspan">{this.state.errorMessage}</span> : null}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className=" row" style={{ textAlign: "right",marginTop:20 }}>
                                            <div className="fifty  wide column">

                                                <button className="ui primary button" type="submit" onClick={() => this.sendMail()}>Send</button>
                                                <button className="ui  button" type="submit" onClick={() => this.clearEditor()}>Clear</button>
                                                <button className="ui  button" type="submit" onClick={() => this.closeMailPopup1()}>Cancel</button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        
                        
                    </div>
                    
                    {/*msg after mail sending*/}
                    <div id="snackbar">  <i className="info circle icon"></i>Mail sent successfully.</div>
                </div>

            </div>
        );
    }

}
