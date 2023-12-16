// function fun1() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res("Hi there");
//     }, 3000);
//   });
// }

// function fun2() {
//   return new Promise((res, rej) => {
//     setTimeout(() => {
//       res("Hi there");
//     }, 3000);
//   });
// }

const fun1 = new Promise((res, rej) => {
  setTimeout(() => {
    res("Hi there");
  }, 3000);
});

const fun2 = new Promise((res, rej) => {
  setTimeout(() => {
    res("Hi there");
  }, 3000);
});
// for (let i = 0; i < 1e9; i++) {}
async function handle() {
  const start = Date.now();

  console.log("Handle Start");
  const a = await fun1;
  console.log(a);
  console.log("fun1 1 completed");
  const b = await fun2;
  console.log("fun2 completed");
  console.log(b);

  const end = Date.now();
  console.log((end - start) / 1000);
}

handle();
for (let i = 0; i < 1e10; i++) {}
