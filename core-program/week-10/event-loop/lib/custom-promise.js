// Custom Promise implementation. This is a simplified version of the native
// Promise implementation.It does not cover all edge cases and is not fully
// compliant with the Promise/A+ specification. It is meant for educational
// purposes only and should not be used in production code.
//
// This implementation uses microtasks to handle asynchronous operations. It
// also includes a static method to resolve and reject promises, as well as a
// static method to handle Promise.all().
//
// Loosely based on:
// https://medium.com/swlh/implement-a-simple-promise-in-javascript-20c9705f197a
import chalk from 'chalk';

export class CustomPromise {
  static resolve(value) {
    if (value instanceof CustomPromise) {
      return value;
    }
    return new CustomPromise((resolve) => resolve(value));
  }

  static reject(value) {
    return new CustomPromise((resolve, reject) => reject(value));
  }

  static #count = 0;

  #state = 'pending';
  #value = undefined;
  #reason = undefined;
  #rejectedHandlers = [];
  #fulfilledHandlers = [];
  #id = 0;

  constructor(executor) {
    // Assign a unique id to each promise
    this.#id = ++CustomPromise.#count;

    const resolve = (value) => {
      if (this.#state === 'pending') {
        this.#state = 'fulfilled';
        this.#value = value;
        console.log(chalk.green(`[promise#${this.#id} fulfilled → ${value}]`));
        this.#fulfilledHandlers.forEach((handler) => handler());
      }
    };

    const reject = (reason) => {
      if (this.#state === 'pending') {
        this.#state = 'rejected';
        this.#reason = reason;
        console.log(chalk.red(`[promise#${this.#id} rejected → ${reason}]`));
        this.#rejectedHandlers.forEach((handler) => handler());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }

    if (this.#state === 'pending') {
      console.log(chalk.dim(`[promise#${this.#id} created (pending)]`));
    }
  }

  #handleFulfilled(resolve, reject, onFulfilled) {
    console.log(chalk.magenta(`[microtask#${this.#id} enqueued]`));
    queueMicrotask(() => {
      console.log(chalk.yellow(`\n[microtask#${this.#id} start]`));

      try {
        if (typeof onFulfilled === 'function') {
          const result = onFulfilled(this.#value);
          if (isThenable(result)) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } else {
          resolve(this.#value);
        }
      } catch (err) {
        reject(err);
      }

      console.log(chalk.yellow(`[microtask#${this.#id} end]`));
    });
  }

  #handleRejected(resolve, reject, onRejected) {
    console.log(chalk.magenta(`[microtask#${this.#id}] enqueued`));
    queueMicrotask(() => {
      console.log(chalk.yellow(`\n[microtask#${this.#id} start]`));
      try {
        if (typeof onRejected === 'function') {
          const result = onRejected(this.#reason);
          if (isThenable(result)) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } else {
          reject(this.#reason);
        }
      } catch (err) {
        reject(err);
      }

      console.log(chalk.yellow(`[microtask#${this.#id} end]`));
    });
  }

  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      if (this.#state === 'fulfilled') {
        this.#handleFulfilled(resolve, reject, onFulfilled);
      } else if (this.#state === 'rejected') {
        this.#handleRejected(resolve, reject, onRejected);
      } else {
        // pending
        this.#fulfilledHandlers.push(() =>
          this.#handleFulfilled(resolve, reject, onFulfilled)
        );
        this.#rejectedHandlers.push(() =>
          this.#handleRejected(resolve, reject, onRejected)
        );
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// Helper functions

// Helper function to check if a given value is "thenable" (i.e., it has a `then` method and can be treated as a Promise).
// This is used to determine if the result of a function call should be chained as a Promise.
function isThenable(result) {
  return (
    ['object', 'function'].includes(typeof result) &&
    typeof result.then === 'function'
  );
}
