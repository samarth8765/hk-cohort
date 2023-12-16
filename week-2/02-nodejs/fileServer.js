/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

function readDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err) {
        reject("There is some problem. Please try again");
      } else {
        resolve(data);
      }
    });
  });
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject("File not found");
      } else {
        resolve(data);
      }
    });
  });
}

app.get("/files", async (req, res) => {
  const __path = path.join(__dirname, "/files/");

  try {
    const files = await readDir(__path);
    return res.status(200).json(files);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get("/file/:filename", async (req, res) => {
  const filename = req.params.filename;
  const __path = path.join(__dirname, `/files/${filename}`);

  try {
    const fileContent = await readFile(__path);
    return res.status(200).send(fileContent);
  } catch (err) {
    return res.status(404).send(err);
  }
});

app.get("*", (req, res) => {
  return res.status(404).send("Route not found");
});

module.exports = app;
