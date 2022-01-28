import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { downloadReport } from './commonfunctions'

export default class ViewPDF extends Component {
    state = {
        numPages: null,
        pageNumber: 1,
        URI: ''
    }

    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    }

    async componentDidMount() {
        if (this.props.location.state) {
            await this.setState({ URI: await this.downloadInvoicePDF(this.props.location.state.data) })
        }

    }

    //.........For  Navigate To Invoice List................
    navigateToInvoiceList() {
        return this.props.history.push('/billing')
    };

    //..................Download PDF......................
    async downloadInvoicePDF(docid) {

        let paramobj = {
            "CLNT": "1002",
            "LANG": "EN",
            "DOCID": docid
        };
        var parameters = {
            "ReportType": "INVOICE",
            "ParamObj": JSON.stringify(paramobj),
            "ReportName": "Invoice"
        }
        let uri = await downloadReport(parameters);
        console.log(uri);

        return uri;
    }

    render() {
        const { pageNumber, numPages } = this.state;
        console.log(this.state.URI)
        return (

            <div>
                <div className="ui one column grid">
                    <div className="three column row">
                        <div className="one wide computer one wide tablet one wide mobile column">
                        </div>
                        <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column">
                            <h1 id="title_header">INVOICE</h1>
                            <div className="icode" id="title_header">
                                <a href={this.state.URI}>
                                    <i id="iconbar" className="download icon"></i>
                                </a>
                                <i id="iconbar" className="close icon" onClick={() => this.navigateToInvoiceList()}></i>
                            </div>

                            <div className="field">
                                <div className="ui segment">
                                    <div className="ui form">

                                        <div className="ui three column stackable grid">
                                            <div className="row">
                                                <div className="three wide computer three wide tablet three wide mobile column" />
                                                <Document
                                                    file={this.state.URI}
                                                    onLoadSuccess={this.onDocumentLoad}>
                                                    <Page pageNumber={pageNumber} />
                                                </Document>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="one wide computer one wide tablet one wide mobile column" />
                    </div>
                </div>
            </div>
        );
    }
}