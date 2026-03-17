function greetLater(callback) {
  console.log('Preparing to greet...');
  callback();
}

greetLater(() => {
  console.log('Hello from the callback!');
});
