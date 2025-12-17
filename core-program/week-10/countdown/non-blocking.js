let isRunning = false;

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

function timer(count) {
  // Stop recursing if the timer should no longer run.
  if (!isRunning) {
    return;
  }

  console.log('count:', count);
  speak(count.toString());

  document.querySelector('#counter').textContent = count;

  // If the count reaches zero, we're done.
  if (count === 0) {
    isRunning = false;
    return;
  }

  // If the count is not zero, set a timeout to recursively call this function
  // again after 1 second.
  setTimeout(() => {
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
