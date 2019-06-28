const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");

require("dotenv").config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());

let cache;
const url =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=playlist";

const videourl =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=PL4QNnZJr8sRNKjKzArmzTBAlNYBDN2h-J";

const search = "kpop";

const getVideos = pageToken =>
  fetch(
    `${url}&q=${search}&key=${process.env.GOOGLE_API_KEY}` +
      (pageToken ? `&pageToken=${pageToken}` : "")
  ).then(response => response.json());

app.get("/videos", async (req, res) => {
  if (cache) return res.json(cache);

  let page = await getVideos();
  let videos = page.items;

  while (page.nextPageToken) {
    page = await getVideos(page.nextPageToken);
    videos = videos.concat(page.items);
  }

  cache = videos;
  res.json(videos);
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found");
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Listening on port", port);
});
