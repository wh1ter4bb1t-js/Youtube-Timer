import React, { Component } from "react";
import Timer from "./components/function/timer";
// import Youtube from "./components/function/youtube";
import "./components/style/App.scss";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      videos: []
    };
  }
  componentDidMount() {
    this.getVideo();
  }

  getVideo = () => {
    const API_URL = "http://localhost:5000/videos";
    fetch(API_URL)
      .then(res => res.json())
      .then(video => this.setState({ videos: video }));
  };

  render() {
    return (
      <div id="container">
        <ul>
          {this.state.videos.map(video => (
            <li key={video.id}>
              <a
                href={
                  "https://www.youtube.com/watch?v=" +
                  video.snippet.resourceId.videoId
                }
              >
                {video.snippet.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="app-container">
          <Timer />
        </div>
      </div>
    );
  }
}
