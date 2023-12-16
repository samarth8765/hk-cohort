const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 3000 || process.env.PORT;

let NUM_REQUESTS = 0;

function calculateRequestTime(startTime) {
  const time = process.hrtime(startTime);
  let data = `Request ${++NUM_REQUESTS} Time elasped ${time[0]} seconds and ${
    time[1] / 1000
  } ms\n`;
  ``;
  fs.appendFile("count.log", data, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

app.use((req, res, next) => {
  const startTime = process.hrtime();

  res.on("finish", () => {
    calculateRequestTime(startTime);
  });

  next();
});

app.get("/health_check", (req, res) => {
  res.json({ msg: "Ser Estar Tener" });
});

app.listen(PORT, () => {
  console.log(`Listening at PORT ${PORT}`);
});
