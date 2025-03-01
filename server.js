import express from "express";
import formidable from "express-formidable";
// Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is an open-source framework developed and maintained by the Node.js Foundation.
// Formidable is a Node.js module for parsing form data, including multipart/form-data file upload. So, express-formidable is something like a bridge between them, specifically an Express middleware implementation of Formidable.

import { promises as fs } from "fs";

// The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.

import path from "path";
const __dirname = path.resolve();

const app = express();
app.use(express.static("public"));
app.use(formidable());

app.get("/", (req, res) => {
  res.send("Hello world!");
  console.log("You got server");
});

app.get("/get-posts", (req, res) => {
  fs.readFile(__dirname + "/data/posts.json").then((file) => {
    const blogposts = JSON.parse(file);
    res.status(200).json(blogposts);
  });
});

app.post("/create-post", (req, res) => {
  const newBlogpost = req.fields.blogpost;
  fs.readFile(__dirname + "/data/posts.json").then((file) => {
    const blogposts = JSON.parse(file);
    const newTimestamp = Date.now();
    blogposts[newTimestamp] = newBlogpost;
    fs.writeFile(
      __dirname + "/data/posts.json",
      JSON.stringify(blogposts)
    ).then(() => {
      res.status(200).json({ newTimestamp: newBlogpost });
    });
  });
});

app.listen(3000, () => {
  console.log(
    "Server is listening on port http://localhost:3000. Ready to accept requests!"
  );
});
