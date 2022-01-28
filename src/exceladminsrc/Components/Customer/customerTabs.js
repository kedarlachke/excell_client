import React, { Component } from "react";
import Customer from "./Customer_Add";
import FileUpload from "../File Upload/file_Upload";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
export default class TabComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      Ccode: ""
    };

    this.gotoNextTab = this.gotoNextTab.bind(this);
  }

  // Move to next tab
  async gotoNextTab(isNext, Ccode) {
    console.log("Customer Id in tabs");
    console.log(Ccode);
    console.log("Customer Id in tabs");
    isNext ? await this.setState({ tabIndex: this.state.tabIndex + 1 }) : null;
    Ccode ? await this.setState({ Ccode: Ccode }) : null;
  }
  render() {
    return (
      <div>
        <div className="ui one column grid">
          <div className="three column row">
            <div className="one wide computer one wide tablet one wide mobile column" />
            <div className="fourteen wide computer fourteen wide tablet fourteen wide mobile column" />
            <div className="one wide computer one wide tablet one wide mobile column" />
          </div>
          <div className="three column row">
            <div className="one wide computer one wide tablet one wide mobile column" />
            <div
              className="fourteen wide computer fourteen wide tablet fourteen wide mobile column"
              style={{ marginTop: 50 }}
            >
              {/* <h1 id="title_header">Setting</h1> */}
              <Tabs
                selectedIndex={this.state.tabIndex}
                onSelect={tabIndex => this.setState({ tabIndex })}
              >
                <TabList>
                  <Tab>Customer</Tab>
                  <Tab>Document Upload</Tab>
                </TabList>

                <TabPanel>
                  <Customer
                    state={
                      this.props.location.state
                        ? this.props.location.state.data
                        : null
                    }
                    history={this.props.history}
                    gotoNextTab={this.gotoNextTab}
                  />
                </TabPanel>
                <TabPanel>
                  <FileUpload
                    state={this.state.Ccode}
                    type="customer"
                    history={this.props.history}
                  />
                </TabPanel>
              </Tabs>
            </div>
          </div>
          <div />
        </div>
      </div>
    );
  }
}
