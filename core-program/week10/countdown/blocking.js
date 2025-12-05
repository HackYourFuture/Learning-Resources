let isRunning = false;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

// This function simulates a blocking setTimeout by using a busy-wait loop.
// It blocks the main thread for the specified time before executing the
// callback function.
// Note: This is not recommended for real applications as it can freeze the UI.
function setTimeoutBlocking(callback, delay) {
  const endTime = Date.now() + delay;

  // Busy-wait loop that blocks the main thread until the specified time has
  // passed.
  // This will prevent any other code from running, including UI updates.
  while (Date.now() < endTime) {
    // do nothing
  }
  callback();
}

function timer(count) {
  // Stop recursing if the timer should no longer run.
  if (!isRunning) {
    return;
  }

  console.log('count:', count);
  document.querySelector('#counter').textContent = count;

  // If the count reaches zero, we're done.
  if (count === 0) {
    isRunning = false;
    speak('Countdown finished');
    return;
  }

  // If the count is not zero, set a timeout to recursively call this function
  // again after 1 second.
  setTimeoutBlocking(() => {
    timer(count - 1);
  }, 1000);
}

function startTimer(count) {
  // If the timer is already running, do nothing.
  if (isRunning) {
    return;
  }

  // Indicate that the timer is running.
  isRunning = true;

  timer(count);
}

function stopTimer() {
  // Cause the timer to stop running.
  isRunning = false;
}

document
  .querySelector('#start')
  .addEventListener('click', () => startTimer(10));
document.querySelector('#stop').addEventListener('click', stopTimer);
