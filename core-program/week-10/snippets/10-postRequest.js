fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Hello',
    body: 'World',
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
