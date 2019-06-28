import React, { Component } from "react";

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
      <div>
        {this.state.videos.map(video => (
          <a href={"https://www.youtube.com/watch?v=1"}>
            <div className={"video" + video.Id.playlistId}>
              <img src={video} alt="Video thumbnails" />
            </div>
          </a>
        ))}
      </div>
    );
  }
}
