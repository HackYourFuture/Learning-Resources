# Blocking Demo

Folder: `1-blocking`

This example demonstrates the negative impact of **blocking code** on web page responsiveness. In JavaScript, "blocking" code is code that prevents the browser from doing anything else—such as updating the UI or responding to user input—until it finishes running. In contrast, **non-blocking code** allows the browser to continue handling other tasks while waiting for an operation to complete.

The example implements a simple timer that counts down from 10 to 0 seconds. When the counter reaches zero, the application will play a beep sound.

It provides two timer modes: a normal (non-blocking) mode using the standard `setTimeout` function, and a "blocking" mode using a custom `setTimeoutBlocking` function. The blocking version uses a "busy-wait loop"<sup>1</sup> that continually checks the system clock to see if the requested timeout has been reached. This simulates a long-running or CPU-intensive task.

## Usage

1. Open the `index.html` file in a web browser (e.g., Chrome, Firefox, Edge).

2. The example logs the countdown to the console, so please open the Developer Tools and select the Console tab when you run this example.

3. With the "Blocking" checkbox unchecked, click the "Start" button to start the timer. The timer will count down from 10 to 0, updating the displayed count every second. Let it run to completion and take note of the countdown in the developer console.

4. With the "Blocking" checkbox still unchecked, click the "Start" button again, and after a second or two, press the "Stop" button. Notice that the timer stops as expected.

5. Now, check the "Blocking" checkbox to use the blocking version of the timer. Press the "Start" button. Because JavaScript in the browser runs on a single-threaded event loop, blocking code prevents the browser from updating the UI or responding to user actions (e.g. "click" events). As a result, when the blocking timer is running:

    - The "Start" button remains red (i.e., depressed).
    - The counter display does not update.
    - The "Stop" button is unresponsive.

    However, the console output will still show the countdown, and you will still hear a beep when the timer finishes.

**Takeaway:**  
Blocking code makes the web page unresponsive and leads to a poor user experience. Always write non-blocking, asynchronous code to keep your web apps smooth and interactive.

Notes:

1. A busy-wait loop is a loop that continuously checks a condition without yielding control to the event loop, effectively blocking the thread until the condition is met.
