# Countdown Demo

This example demonstrates the negative impact of **blocking code** on web page responsiveness. In JavaScript, "blocking" code is code that prevents the browser from doing anything else, such as updating the UI or responding to user input, until it finishes running. In contrast, **non-blocking code** allows the browser to continue handling other tasks while waiting for an operation to complete.

The example implements a simple timer that counts down from 10 to 0 seconds. Each count is spoken aloud using the Web Speech API.

The example provides two timer modes: a normal (non-blocking) mode using the standard `setTimeout` function, and a "blocking" mode using a custom `setTimeoutBlocking` function. The blocking version uses a "busy-wait loop"<sup>1</sup> that continually checks the system clock to determine if the requested timeout has been reached. This simulates a long-running or CPU-intensive task.

## Usage

### Non-Blocking Version

1. Open the `index.html` file in a web browser (e.g., Chrome, Firefox, Edge).

2. Open the Developer Tools and select the Console tab to view the countdown logs.

3. Click the "Start" button to start the timer. The timer will count down from 10 to 0, speaking aloud and updating the count on the page every second. Observe the console output as the countdown completes.

### Blocking Version

1. Modify the `index.html` file to load `blocking.js` instead of `non-blocking.js`. You can do this by changing the script tag at the bottom of the file:

   ```html
   <script src="blocking.js" type="module"></script>
   ```

2. Save the changes to `index.html` and refresh the page in your web browser.

3. Click the "Start" button to start the timer. Because this version uses blocking code, you will notice:

   - The "Start" button appears depressed and unresponsive.
   - The counter display does not update.
   - The spoken countdown stops after the first count (10).
   - The "Stop" button is unresponsive.
   - The console output still shows the countdown.

Once the countdown reaches zero, the page becomes responsive again and the backlog of spoken counts (9 to 0) will be spoken aloud.

**Takeaway:**

Blocking code makes the web page unresponsive and leads to a poor user experience. Always write non-blocking, asynchronous code to keep your web apps smooth and interactive.

## Notes

1. A busy-wait loop is a loop that continuously checks a condition without yielding control to the event loop, effectively blocking the thread until the condition is met.
