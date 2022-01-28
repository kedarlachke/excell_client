import React, { Component } from 'react';
export default class CustomerFooter extends Component {
    render() {
        return (
            <div className="row" id="custDashboardFooter">
                <center>  ExcellInvestigations.com © {new Date().getFullYear()} - All Rights Reserved.  </center>
            </div>
        )
    }
}