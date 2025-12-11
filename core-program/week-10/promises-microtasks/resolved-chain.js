// import { CustomPromise as Promise } from './lib/custom-promise.js';

function main() {
  console.log('[main start]');

  const promise = new Promise((resolve, reject) => {
    resolve(42);
  });

  promise
    .then((num) => {
      console.log('then#1', num);
      return num + 1;
    })
    .then((num) => {
      console.log('then#2', num);
    })
    .catch((err) => {
      console.log('catch#1', err);
    });

  console.log('[main end]');
}

main();

// Questions:
// 1. What will be the output of the above code?
// 2. How many promises will be created in total?
