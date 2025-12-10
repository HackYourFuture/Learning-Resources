// Comment out the import statement to use native Promises
import { CustomPromise as Promise } from '../lib/custom-promise.js';

function main() {
  console.log('[main start]');

  const promise = new Promise((resolve, reject) => {
    reject();
  });

  promise
    .then(function onFulfilled() {
      console.log('then#1');
    })
    .then(function onFulfilled() {
      console.log('then#2');
    })
    .catch(function onRejected() {
      console.log('catch#1');
    })
    .catch(function onRejected() {
      console.log('catch#2');
    })
    .then(function onFulfilled() {
      console.log('then#3');
    });

  console.log('[main end]');
}

main();

// Questions:
// 1. What will be the output of the above code?
// 2. How many promises will be created in total?
