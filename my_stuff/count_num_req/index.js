const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 3000 || process.env.PORT;

let NUM_REQUESTS = 0;

app.use((req, res, next) => {
  let data = `The number of request on the server is ${++NUM_REQUESTS}`;
  fs.writeFile("count.log", data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Request on the server");
    }
    next();
  });
});

app.get("/health_check", (req, res) => {
  res.json({ msg: "Health is Good!!" });
});

app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
