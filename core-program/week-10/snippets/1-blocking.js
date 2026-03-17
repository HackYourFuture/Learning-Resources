function wait(delay) {
  const endTime = Date.now() + delay;
  while (Date.now() < endTime) {
    // blocks everything!
  }
}

console.log('Hello!');
wait(2000);
console.log('This waits until the loop is done');
