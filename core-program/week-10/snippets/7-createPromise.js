// How many promises are created in this code?

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Done!');
    // reject(new Error("Failed"));
  }, 2000);
});

console.log(promise, typeof promise);

promise
  .then((result) => {
    console.log(promise, result);
  })
  .catch((err) => {
    console.log(promise, err.message);
  });
