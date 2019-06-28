import React, { Component } from "react";
import Timer from "./components/function/timer";
import Youtube from "./components/function/youtube";
import "./components/style/App.scss";

export default class App extends Component {
  render() {
    return (
      <div id="container">
        <div className="app-container">
          <div className="search_container">
            <p className="search_title">Search A Video</p>
            <input className="search_input" type="text" placeholder="Search" />
          </div>
          <Youtube />
          {/* <Timer /> */}
        </div>
      </div>
    );
  }
}
