# FAQ on Promises, Event Loop, and Microtasks in JavaScript

(Create with the help of NotebookLM)

**What is the fundamental interaction between promises, the event loop, and microtasks?**

Promises, when they settle (either become fulfilled or rejected), enqueue a microtask in the microtask queue if a `.then()` or `.catch()` callback is attached. The event loop is responsible for processing tasks from various queues. Crucially, the event loop prioritises the microtask queue, ensuring that promise callbacks are executed before any tasks in the standard task queue (sometimes referred to as the macro-task queue). This mechanism ensures that asynchronous operations handled by promises are processed efficiently and in a predictable order.

**How do `.then()` and `.catch()` methods influence the execution flow with promises and microtasks?**

Calling `.then()` or `.catch()` on a promise, once that promise is settled, results in a microtask being created and added to the microtask queue. When the event loop gets to this microtask, the code within the corresponding `.then()` or `.catch()` callback is executed. This is how the handlers for fulfilled or rejected promises are run. The `.catch()` method is effectively syntactic sugar for `.then(null, onRejected)`, meaning it's a form of `.then()` specifically for handling rejections.

**Do `.then()` and `.catch()` methods create new promises?**

Yes, each call to `.then()` or `.catch()` on a promise returns a new promise. This is a fundamental aspect of promise chaining. The value returned by the callback function inside a `.then()` or `.catch()` becomes the fulfillment value of the new promise returned by that `.then()` or `.catch()` call. If the callback itself returns a promise, the new promise will adopt the state and value of that returned promise. This chaining mechanism allows for sequential execution of asynchronous operations.

**What is the purpose of using a custom promise implementation in the provided examples?**

The `CustomPromise` class is a simplified, custom implementation of the native Promise object. Its primary purpose in the examples is to provide visibility into the internal workings of promises. By logging events such as promise creation, fulfillment, rejection, and microtask enqueuing and execution, `CustomPromise` helps illustrate how promises interact with the event loop and microtask queue. This logging allows for a deeper understanding of the asynchronous execution flow without requiring users to delve into the complex internal implementation of native promises.

**How does a fulfilled promise chain execute, particularly when `.catch()` is included in the chain?**

In a fulfilled promise chain, only the `.then()` callbacks are executed. When a promise in the chain is fulfilled and has a `.then()` attached, a microtask is enqueued to run the `.then()`'s callback. The value returned by the `.then()` callback determines the fulfillment value of the next promise in the chain. `.catch()` methods in a fulfilled chain are effectively skipped in terms of executing their `onRejected` handler. However, they still return a new promise which, in this case, is fulfilled with the value of the preceding promise. This is why a `.then()` following a `.catch()` in a fulfilled chain can still execute.

**How does a rejected promise chain execute, and why might a `.then()` execute after a rejection?**

When a promise in a chain is rejected, the event loop will look for the nearest `.catch()` or `.then(null, onRejected)` in the chain. The `onRejected` callback of that handler will be executed via a microtask. The value returned by the `onRejected` callback becomes the fulfillment value of the promise returned by that `.catch()` or `.then()`. If the `onRejected` callback does not explicitly return a value, it implicitly returns `undefined`, and the subsequent promise is fulfilled with `undefined`. This is why a `.then()` appearing later in the chain after a `.catch()` has handled a rejection can still execute, as it's acting on a promise that has become fulfilled (albeit potentially with undefined).

**What is the execution order of microtasks relative to other tasks in the event loop?**

The event loop processes the microtask queue before the standard task queue (macro-task queue). When the current code execution finishes (i.e., the call stack is empty), the event loop checks the microtask queue. It will execute all microtasks in the queue before moving on to process any tasks from the task queue. This prioritisation ensures that promise callbacks and other microtasks (like those from queueMicrotask) are handled promptly after the current script finishes.
