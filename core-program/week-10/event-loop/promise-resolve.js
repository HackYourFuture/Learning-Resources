// import { CustomPromise as Promise } from './lib/custom-promise.js';

function whatIsTheMeaningOfLife() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(42);
    }, 2000);
  });
}

function ask() {
  let text = new Date().toLocaleTimeString('nl-NL') + ' ';

  return whatIsTheMeaningOfLife()
    .then((result) => {
      text += `The answer is ${result}`;
    })
    .catch((err) => {
      text += `Error: ${err.message}`;
    })
    .then(() => {
      return console.log(text);
    })
    .catch((err) => {
      console.error('Failed to write to log file:', err);
    });
}

console.log('Hello!');
ask();
console.log('Goodbye!');
