console.log('1. Hello!');

Promise.resolve().then(() => {
  console.log('2. promise then');
});

setTimeout(() => {
  console.log('3. timeout');
}, 0);

console.log('4. Goodbye!');
