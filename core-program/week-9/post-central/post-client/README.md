# Post Central Client

A web client for the Post Central API where users can register, log in, and
manage posts. The API server lives in `week-9/post-central`.

## Getting Started

If you want to run the client, you need to have the API server running first. If you are in class working with an instructor, the instructor will run the server on the instructor's machine, and you can skip the server setup steps below. If you are trying this exercise on your own, make sure to start the server yourself.

### Starting the server (only if working alone)

From the `week-9/post-central` folder, install dependencies and start the
server:

```bash
npm install
npm start
```

### Running the client

This client is a static web page that you serve locally using the **Live Server** extension in VS Code.

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code (if you don't have it already).
2. Open the `post-client` folder in VS Code.
3. Open `src/services/constants.js` and set `BASE_URL` to the address of the Post Central server:
   - **In class:** Use the instructor's IP address, e.g. `'http://192.168.1.42:3000'`
   - **At home:** Keep the default `'http://localhost:3000'`
4. Right-click `index.html` and select **"Open with Live Server"**. The client will open in your browser (typically at `http://localhost:5500`).

## Your Task

All the UI code is already in place. Your job is to implement the API service
functions that connect the UI to the server. Curious how the UI calls your
functions? See [README_UI.md](./README_UI.md).

### Setup

1. Rename `src/services/services.starter.js` to `src/services/services.js`
   (replacing the existing file).
2. Open `src/services/services.js` — you'll see seven functions, one fully
   implemented (`register`) as a template, and six that throw "Not implemented".
3. Implement each function so it calls the correct API endpoint using `fetch`.

### What Each Function Should Do

Every function should:

- **On success:** return the parsed JSON response data directly.
- **On error** (when `response.ok` is `false`): throw an `Error` whose `message`
  comes from the server response and which has a `status` property set to the
  HTTP status code.

#### Example: The `register` Function

We have provided the `register` function as a fully implemented example. Here's
what it looks like:

```js
export async function register(name, password) {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}
```

`BASE_URL` is imported from `constants.js` and points to the Post Central
server. Every `fetch()` call must use it as a prefix.

> :exclamation: A note about `response.json()` and `response.ok`: Normally you would need
to check `response.ok` _before_ calling `response.json()`, because not every
server returns JSON for error responses. This API is different — it **always**
returns JSON, even when the response is not OK. That means you can safely call
`response.json()` first and then check `response.ok` afterwards (as you can see
in the `register` function above). This is convenient because the parsed JSON
body contains the error message you need for the thrown `Error`.

### Implementation

Use the JSDoc comments above each function for the exact endpoint, HTTP method,
headers, and request body.

Here is a summary:

| Function       | Method   | Path             | Auth   | Request Body       |
| -------------- | -------- | ---------------- | ------ | ------------------ |
| `getHello`     | `GET`    | `/posts/hello`   | No     | —                  |
| `login`        | `POST`   | `/users/login`   | No     | `{ name, password }` |
| `register`     | `POST`   | `/users/register`| No     | `{ name, password }` |
| `getProfile`   | `GET`    | `/users/me`      | Bearer | —                  |
| `getMyPosts`   | `GET`    | `/posts/me`      | Bearer | —                  |
| `createPost`   | `POST`   | `/posts`         | Bearer | `{ text }`         |
| `editPost`     | `PUT`    | `/posts/:id`     | Bearer | `{ text }`         |
| `deletePost`   | `DELETE` | `/posts/:id`     | Bearer | —                  |

All paths must be prefixed with `BASE_URL` in your `fetch()` calls (e.g.
`` `${BASE_URL}/posts/hello` ``).

**"Bearer"** means the request needs an `Authorization` header with the value
`Bearer <token>`.

**Request bodies** must be sent as JSON (`Content-Type: application/json`).

### Running Tests

There are unit tests that verify your implementation by checking that each
function calls the right URL with the right method, headers, and body. Run them
from the `post-client` folder:

```bash
npm install
npm test
```

When you first rename the starter file, all tests will fail. As you implement
each function, the corresponding tests will start passing.

### Tips

- Start with `login` — it's the simplest endpoint to test manually.
- Use the [API docs](http://localhost:3000/api-docs) (available while the
  server is running) for details on each endpoint.
- After implementing a couple of functions, look at your code. Do you see
  repeated patterns? Think about how you could reduce that repetition.
