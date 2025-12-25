# Promises, Event Loop and Microtasks

## TL;DR

This README explains how promises, the event loop, and microtasks interact in JavaScript. It includes examples using both native promises and a custom `CustomPromise` class that logs internal events for better understanding. Key points:

- Promises enqueue microtasks for `.then()` and `.catch()` callbacks, processed before other tasks in the event loop.
- `.then()` and `.catch()` create new promises, chaining operations.
- Provided examples demonstrate promise fulfillment, rejection, and microtask execution order.

## Introductory Video

The following YouTube video provides a good introduction to the event loop and microtasks and is an excellent starting point for this section:

- [JavaScript Visualized - Event Loop, Web APIs, (Micro)task Queue](https://www.youtube.com/watch?v=eiC58R16hb8) [12:34 min], by Lydia Hallie.

## Overview

Here, we explore how promises, the event loop, and microtasks work together in JavaScript. The purpose is to gain a deeper understanding of how asynchronous operations are handled in JavaScript.

This folder contains examples and explanations of how promises, the event loop, and microtasks work together in JavaScript.

> **Note**: The goal of this section is to help you understand how promises work under the hood and how they interact with the event loop and microtasks. In your everyday programming, you do not need think in these terms when you use promises. However, understanding these concepts will help you better understand how JavaScript handles asynchronous operations and how to write more efficient and effective code.

When a promise becomes settled (i.e., either `fulfilled` or `rejected`) _and_ a `.then()` was called on it, it creates a microtask and enqueues it in the microtask queue. This microtask runs the code inside `.then()` or `.catch()`. The event loop handles the microtask queue before the task queue, ensuring that promise callbacks are executed before any other tasks.

Every time you use `.then()` on a promise, it creates a new promise. The same goes for `.catch()`$^1$ it’s just a special version of `.then()` for handling errors. You can connect promises together in a chain to run multiple steps one after another.

To illustrate how the microtasks are used by promises, the examples in this folder use a custom replacement of `Promise` called `CustomPromise`. This replacement is a simplified version of the native `Promise` object, designed to logs its internal events to the console. (There is no need to understand its internal implementation to follow along, nor do we expect this from you. But if you are curious, you can find the implementation in the file [`lib/custom-promise.js`](./lib/custom-promise.js).

Each promise that created with `CustomPromise` is assigned a unique ID that is used to label the output of each event, as illustrated in the table below:

| Event                   | Example Message                 |
| ----------------------- | ------------------------------- |
| A promise is created    | `[promise#1 created (pending)]` |
| A promise is fulfilled  | `[promise#1 fulfilled]`         |
| A promise is rejected   | `[promise#1 rejected]`          |
| A microtask is enqueued | `[microtask#1 enqueued]`        |
| A microtask starts      | `[microtask#1 start]`           |
| A microtask exits       | `[microtask#1 exit]`            |

Notes:

1. [`.catch()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) is just syntactic sugar for `.then(null, onRejected)`, i.e. it is just a `.then()` in disguise.

The examples in this folder are stripped-down versions of the examples that demonstrate `Promise.finally()` in the folder [promise-finally](../promise-finally).

> The examples can be run using either the native `Promise` object or the custom `CustomPromise` class. By default, the examples are set up to use the native `Promise` object. To switch to the custom implementation, simply uncomment the line that imports `CustomPromise`.

## Example 1

File: `promise-resolve.js`

Let's first try and run this example using the native `Promise` object. For this, we start off with the line that imports the `CustomPromise` class commented out, like this:

```javascript
// import { CustomPromise as Promise } from './lib/custom-promise.js';
```

Now, run the example by using the following command in the terminal:

```bash
node ./promise-resolve.js
```

You should see output similar to this in the terminal:

```plaintext
Hello!
Goodbye!
10:34:12 The answer is 42
```

Observe that we only see the output of the `.then()` callbacks and not from the `.catch()` callbacks. This is to be expected as there is no promise rejection in the chain.

Now let's use the custom Promise implementation: uncomment the line that imports the `CustomPromise.js` class and run the example again:

```bash
node resolved-chain.js
```

You should see the same output as above but now interspersed with additional messages (in square brackets) from the custom Promise implementation:

```plaintext
Hello!
[promise#1 created (pending)]
[promise#2 created (pending)]
[promise#3 created (pending)]
[promise#4 created (pending)]
[promise#5 created (pending)]
Goodbye!
[promise#1 fulfilled → 42]
[microtask#1 enqueued]

[microtask#1 start]
[promise#2 fulfilled → undefined]
[microtask#2 enqueued]
[microtask#1 end]

[microtask#2 start]
[promise#3 fulfilled → undefined]
[microtask#3 enqueued]
[microtask#2 end]

[microtask#3 start]
10:35:03 The answer is 42
[promise#4 fulfilled → undefined]
[microtask#4 enqueued]
[microtask#3 end]

[microtask#4 start]
[promise#5 fulfilled → undefined]
[microtask#4 end]
```

### Quick Facts

- Each `.then()` or `.catch()` method called on a promise returns a new promise. Whatever you return inside `.then()` or `.catch()` becomes the result of the next promise in the chain.$^1$ If you don't return anything, the next promise is fulfilled with `undefined`.
- The promises are created _immediately_ when the `.then()` or `.catch()` methods are called, but they remain in the `pending` state until the previous promise in the chain is settled. That is why the "Goodbye!" message that signals the end of the main script appears, two seconds before any of the promises are fulfilled.
- When a promise with a `.then()` becomes settled (i.e. fulfilled or rejected), it enqueues a microtask to schedule the processing of that `.then()`.
- When the current code runs to completion, the event loop picks up the next microtask from the microtask queue and executes it.
- The microtask queue is processed before the task queue, ensuring that promise callbacks are executed before any other tasks in the task queue.

Notes:

1. If the `onFulfilled` or `onRejected` callback itself returns a promise, this promise will be used as the fulfillment value of the new promise. For more details, see the MDN documentation on [Promise.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then).

### Video

- [Event Loop](hhttps://www.youtube.com/watch?v=vCU64T-YYgA): An animation of this example (no audio)

## Example 2

File: `promise-reject.js`

This code is functionally equivalent to `resolved-chain.js`, except that this time the initial promise is rejected.

Let's run this example using the native `Promise` object first. For this, make sure that the line that imports the `CustomPromise` class is commented out. The code should look like this:

```javascript
// import { CustomPromise as Promise } from '../lib/custom-promise.js';
```

Now, run the example by using the following command in the terminal:

```bash
node ./promise-reject.js
```

You should see the following output in the terminal:

```plaintext
Hello!
Goodbye!
10:57:43 Error: Come back in 7.5 million years and ask me again!
```

Let's now use the custom Promise implementation: uncomment the line that imports the `CustomPromise.js` class and run the example again:

```bash
node ./rejected-chain.js
```

You should see the same output as above but now interspersed with additional messages (in square brackets) from the custom Promise implementation (see below). A detailed analysis of the output is left as an exercise for you.

```plaintext
Hello!
[promise#1 created (pending)]
[promise#2 created (pending)]
[promise#3 created (pending)]
[promise#4 created (pending)]
[promise#5 created (pending)]
Goodbye!
[promise#1 rejected → Error: Come back in 7.5 million years and ask me again!]
[microtask#1] enqueued

[microtask#1 start]
[promise#2 rejected → Error: Come back in 7.5 million years and ask me again!]
[microtask#2] enqueued
[microtask#1 end]

[microtask#2 start]
[promise#3 fulfilled → undefined]
[microtask#3 enqueued]
[microtask#2 end]

[microtask#3 start]
10:54:56 Error: Come back in 7.5 million years and ask me again!
[promise#4 fulfilled → undefined]
[microtask#4 enqueued]
[microtask#3 end]

[microtask#4 start]
[promise#5 fulfilled → undefined]
[microtask#4 end]
```

## Flowchart: Promises, Event Loop and Microtasks

![event loop](../.assets/promise.png)
