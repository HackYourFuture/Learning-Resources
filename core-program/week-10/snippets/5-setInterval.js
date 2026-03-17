let count = 0;

const id = setInterval(() => {
  console.log(`Interval count: ${count}`);
  count++;
  if (count === 3) {
    // Stop it after 3 times
    clearInterval(id);
  }
}, 1000);
