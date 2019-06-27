import React, { Component } from "react";

export default class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentDidMount() {
    const API_URL = "http://localhost:5000/videos";
    const response = await fetch(API_URL);
    const json = await response.json();
    this.setState({ data: json });
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}
