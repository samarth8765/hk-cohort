/*
Easy 
1- Counter
let counter = 0;
setInterval() => {
  counter++;
  console.log(counter);
}, 1000);

2- Counter without setInterval
let ct = 0;
function counter() {
  console.log(++ct);
  setTimeout(counter, 1000);
}
counter();

3- ReadFile

const fs = require("fs");

fs.readFile("a.txt", "utf-8", (err, data) => {
  console.log(`File \n ${data}`);
});

let a = 0;
for (let i = 0; i < 1e10; i++) {
  a++;
}
console.log(a);

4- WriteFile
const fs = require("fs");
const data = `My name is Samarth Dhawan`;

fs.writeFile("a.txt", data, () => {});
let a = 0;
for (let i = 0; i < 1e10; i++) {
  a++;
}
console.log(a);

5- Read edit and write

const fs = require("fs");

function read() {
  return new Promise((resolve, reject) => {
    fs.readFile("a.txt", "utf-8", (err, data) => {
      data = data.trim();
      data = data.replace(/\s+/g, " ");
      resolve(data);
    });
  });
}

function write(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile("a.txt", data, (err) => {
      resolve(data);
    });
  });
}

function fileCleaner() {
  read()
    .then((res) => write(res))
    .then((res) => console.log(res));
}

fileCleaner();

6- Clock
function format(date) {
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const time24 = `${hours}: ${minutes}: ${seconds}`;
  const time12 = `${hours}: ${minutes}: ${seconds} ${ampm}`;

  return { time24, time12 };
}
function updateTime(timeformat) {
  const now = new Date();
  const { time24, time12 } = format(now);
  if (timeformat === 12) console.log(time12);
  if (timeformat == 24) console.log(time24);
}

function clock() {
  updateTime(12);
  setTimeout(clock, 1000);
}

clock();

*/


function name(paramint){
    const a = 5;
  setTimeout(() => {
    
  }, timeout);
}
















