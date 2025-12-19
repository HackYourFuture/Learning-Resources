// This code demonstrates the use of Promise.finally() to clean up resources
// after a promise is settled, regardless of whether it was resolved or rejected.
// It also shows how to handle errors in a promise chain and ensure that cleanup
// code runs.
import cowsay from 'cowsay';
import chalk from 'chalk';

function whatIsTheMeaningOfLife() {
  let count = 0;
  const intervalTimer = setInterval(() => {
    count += 1;
    process.stdout.write(chalk.dim('\rThinking' + '.'.repeat(count)));
  }, 1000);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(42);
      } else {
        reject(new Error('Come back in 7.5 million years and ask me again!'));
      }
      process.stdout.write('\r');
    }, Math.floor(Math.random() * 5000) + 3000);
  }).finally(() => {
    console.log();
    clearInterval(intervalTimer);
  });
}

console.log(
  'What is the answer to the Ultimate Question of Life, the Universe, and Everything?'
);

whatIsTheMeaningOfLife()
  .then((result) => {
    console.log(
      chalk.green(
        cowsay.say({
          text: `The answer is ${result}`,
          e: 'oO',
          T: 'U ',
        })
      )
    );
  })
  .catch((err) => {
    console.log(
      chalk.red(
        cowsay.say({
          text: err.message,
          e: 'oO',
          T: 'U ',
        })
      )
    );
  });
