# How the UI Uses Your Service Functions

The [README.md](./README.md) explains what you need to implement in `services.js`.
This document explains what happens _around_ your code — how the rest of the
application calls your functions and puts the results on the screen.

You don't need to change any of the files discussed here. The goal is to help
you understand the full picture so you can see your service functions in action.

## The Big Picture

The app has three layers:

| Layer | Files | What it does |
| --- | --- | --- |
| View | `loginView.js`, `homeView.js`, ... | What the user sees and clicks. |
| Page | `loginPage.js`, `homePage.js`, ... | Logic that decides what to do. |
| Services | `services/services.js` | **Your code** — Talks to the server. |

**You are writing the bottom layer.** The Views and Pages are already done. When
you implement `login()`, `getMyPosts()`, and the other functions, the app will
start working — without you having to touch any of the UI code.

> **A note about the UI code.** This app is written in plain ("vanilla")
> JavaScript — no libraries or frameworks. In real-world projects you would
> almost certainly use a framework like React or Angular to build the View and
> Page layers. We chose vanilla JS here so you can see exactly what is happening
> without having to learn a framework first. The good news: the Services layer
> (your code) looks the same regardless of the framework used for the UI.

## A Quick HTML & DOM Primer

If you are new to HTML and the browser, here are the few concepts you need to
follow the code in this project.

### The HTML file

The browser loads [index.html](./index.html). It is very short:

```html
<body>
  <div id="app-root"></div>
  <script src="./src/app.js" type="module"></script>
</body>
```

There are only two things here:

1. A `<div>` with `id="app-root"` — an empty container where the app will live.
2. A `<script>` tag that loads `src/app.js` — the JavaScript that builds the
   entire UI.

Everything you see on screen (the login form, the posts list, buttons) is
created by JavaScript, not written directly in the HTML file.

### The DOM

When the browser reads the HTML, it creates a live tree of objects in memory
called the **DOM** (Document Object Model). JavaScript can talk to this tree:

- **`document.getElementById('app-root')`** — finds the element with that `id`
  and returns it as a JavaScript object.
- **`element.innerHTML = '<p>Hello</p>'`** — replaces the content inside an
  element with new HTML. This is how the app puts posts on the screen.
- **`element.textContent = 'Jim'`** — sets the plain text inside an element
  (safer than `innerHTML` because it won't interpret HTML tags).

### Events

Users interact with the page by clicking buttons, submitting forms, etc. The
browser fires **events** when these things happen. JavaScript can listen for
them:

```js
form.addEventListener('submit', (e) => {
  e.preventDefault(); // stop the browser from reloading the page
  // do something with the form data
});
```

- **`addEventListener('submit', fn)`** — runs `fn` every time the form is
  submitted.
- **`e.preventDefault()`** — by default, submitting a form causes the browser to
  reload the page. This line stops that, so our JavaScript can handle it instead.

That is all you need to know to follow the code below.

## How the App Starts

When the browser finishes loading `index.html`, the following happens in
[src/app.js](./src/app.js):

```js
function start() {
  const appRoot = document.getElementById('app-root');

  const pageRoot = document.createElement('div');
  pageRoot.id = 'page-root';
  appRoot.appendChild(pageRoot);

  const state = new ObservableState();

  const token = getToken(); // check if a token was saved earlier
  if (token) {
    state.set({ token });
  }

  const router = new Router(state);
  router.initialize(routes, pageRoot);
  router.navigateTo(token ? 'home' : 'login');
  router.start();
}

window.addEventListener('DOMContentLoaded', start);
```

In plain English:

1. Find the `app-root` div and create a child div (`page-root`) inside it. This
   is where pages will be rendered.
2. Create a **state** object — a shared container that holds data like the
   current user and their posts.
3. Check `localStorage` for a previously saved login token. If one exists, put
   it in state.
4. Create a **router** that can switch between pages (login, register, home).
5. Navigate to the _home_ page if the user has a token, or the _login_ page if
   they don't.

## The Login Flow — Step by Step

This is the most important flow to understand. It shows exactly how a user
action ends up calling **your** `login()` function and what happens with the
result.

### Step 1 — The View Creates the Form

When the router navigates to the login page, it creates a `LoginPage`, which in
turn creates a `LoginView`. The view builds the HTML for the login form
([src/views/loginView.js](./src/views/loginView.js)):

```js
this.root.innerHTML = String.raw`
  <form id="form">
    <input type="text" id="name" required />
    <input type="password" id="password" required />
    <button type="submit">Login</button>
  </form>
`;
```

(Simplified — the real file has more styling markup, but this is the essence.)

It then listens for the form's `submit` event:

```js
this.#dom.form.addEventListener('submit', this.#onSubmit);
```

### Step 2 — The User Clicks "Login"

When the user fills in the form and clicks the Login button, the browser fires a
`submit` event. The view's handler runs:

```js
#onSubmit = (e) => {
  e.preventDefault();
  const { name, password } = this.#dom;
  this.#props.onSubmit(name.value, password.value);
};
```

This reads the values the user typed and passes them to a **callback function**
(`this.#props.onSubmit`) that was given to it by the Page.

### Step 3 — The Page Calls Your Service Function

The callback leads to `LoginPage.#onSubmit`
([src/pages/loginPage.js](./src/pages/loginPage.js)):

```js
#onSubmit = async (name, password) => {
  try {
    const data = await login(name, password); // ← YOUR FUNCTION

    putToken(data.token);  // save token to localStorage
    this.state.update({ token: data.token, user: data.user, error: null });

    this.router.navigateTo('home');
  } catch (error) {
    this.state.update({ error: error.message });
  }
};
```

Here is what happens line by line:

1. **`await login(name, password)`** — calls **your** `login` function from
   `services.js`. This sends a `POST` request to the server and waits for the
   response. If the login fails, your function **throws an error**, which jumps
   straight to the `catch` block.
2. **`putToken(data.token)`** — saves the token in `localStorage` so the user
   stays logged in if they refresh the page.
3. **`this.state.update(...)`** — puts the token and username into the shared
   state.
4. **`this.router.navigateTo('home')`** — switches to the home page.
5. **`catch (error)`** — if anything went wrong (network error, bad credentials,
   etc.), the error message is put into state, which causes the view to show an
   error banner.

### Step 4 — The Home Page Loads Data

When the router switches to the home page, `HomePage` is created
([src/pages/homePage.js](./src/pages/homePage.js)). Its constructor immediately
calls `#loadData()`:

```js
async #loadData() {
  const { token } = this.state.get();

  try {
    const profile = await getProfile(token);  // ← YOUR FUNCTION
    const posts = await getMyPosts(token);    // ← YOUR FUNCTION

    this.state.update({
      user: profile.user,
      posts,
      error: null,
    });
  } catch (error) {
    if (!this.#handleAuthError(error)) {
      this.state.update({ error: error.message });
    }
  }
}
```

Two of **your** functions are called here:

- **`getProfile(token)`** — fetches the username for the logged-in user.
- **`getMyPosts(token)`** — fetches all posts created by that user.

If either function throws (e.g. expired token), the `catch` block checks whether
it is an authentication error (see below). Otherwise the error message is shown
to the user.

### Step 5 — The View Renders the Posts

The `HomeView` is subscribed to state changes. When state is updated, its
`update()` method is called automatically
([src/views/homeView.js](./src/views/homeView.js)):

```js
update(state) {
  if (state.user) {
    this.#dom.username.textContent = state.user;
  }

  if (state.posts) {
    this.#lastPosts = state.posts;
    this.#renderPosts(state.posts);
  }

  // ...error handling...
}
```

This takes the data that came from **your** service functions and puts it on the
screen: the username in the header, and the posts in a list.

### The Full Chain

```text
User clicks "Login"
  → View reads form values
    → Page calls login(name, password)        ← your code
      → Server responds with { user, token }
    → Page stores token and updates state
    → Router switches to home page
    → Page calls getProfile(token)            ← your code
    → Page calls getMyPosts(token)            ← your code
      → Server responds with posts array
    → Page updates state with user and posts
  → View renders posts on screen
```

## Creating, Editing, and Deleting Posts

Once on the home page, the user can create, edit, and delete posts. Every action
follows the same pattern.

### Creating a Post

1. The user types in the textarea and clicks "Post".
2. The view reads the text and calls the page's `onCreatePost` callback.
3. The page calls **your** `createPost(token, text)` function.
4. If successful, the page calls **your** `getMyPosts(token)` again to refresh
   the list.
5. The view re-renders with the new post included.

```js
// src/pages/homePage.js
#onCreatePost = async (text) => {
  const { token } = this.state.get();
  try {
    await createPost(token, text);  // ← YOUR FUNCTION (throws on error)
    await this.#refreshPosts();     // calls getMyPosts again
  } catch (error) {
    if (!this.#handleAuthError(error)) {
      this.state.update({ error: error.message });
    }
  }
};
```

### Editing a Post

1. The user clicks "Edit" on a post → the view switches that post to a textarea.
2. The user changes the text and clicks "Save".
3. The view calls the page's `onEditPost` callback with the post ID and new
   text.
4. The page calls **your** `editPost(token, id, text)` function.
5. The post list is refreshed.

### Deleting a Post

1. The user clicks "Delete" → a confirmation dialog appears.
2. If the user confirms, the view calls the page's `onDeletePost` callback with
   the post ID.
3. The page calls **your** `deletePost(token, id)` function.
4. The post list is refreshed.

## How Errors Reach the Screen

Every page method that calls a service function is wrapped in `try`/`catch`.
Here is the pattern:

```js
try {
  await createPost(token, text);  // your function throws on error
  // success — update state with new data
} catch (error) {
  this.state.update({ error: error.message });  // put error message in state
}
```

Because **your** functions throw when the server returns an error, the page code
doesn't need to check a result object — errors automatically land in the `catch`
block.

When `error` is set in state, the view's `update()` method runs and shows a red
error banner at the top of the page:

```js
// Inside the view's update() method
if (state.error) {
  this.#dom.errorSlot.innerHTML = `
    <div class="error-banner">
      <span>${state.error}</span>
    </div>
  `;
}
```

So the error message from **your** thrown error ends up visible to the user.

## What About Authentication Errors?

If **your** function throws an error with `status: 401` (unauthorized — meaning
the token has expired or is invalid), the home page handles it specially:

```js
#handleAuthError(error) {
  if (error.status === 401) {
    removeToken();                    // delete the saved token
    this.state.clear();               // clear all state
    this.router.navigateTo('login');  // send user back to login
    return true;
  }
  return false;
}
```

This is why the `status` property on your thrown error matters — it lets the
app distinguish "wrong input" errors from "you need to log in again" errors.

## File Map

| File | What it does |
| --- | --- |
| `index.html` | The single HTML page the browser loads |
| `src/app.js` | Starts the app: creates state, router, and navigates to the first page |
| `src/services/services.js` | **Your code** — the functions that talk to the server |
| `src/routes.js` | Maps page names (like `'login'`) to their Page classes |
| `src/pages/loginPage.js` | Login logic — calls `login()` from your services |
| `src/pages/registerPage.js` | Registration logic — calls `register()` |
| `src/pages/homePage.js` | Home logic — calls `getProfile()`, `getMyPosts()`, `createPost()`, `editPost()`, `deletePost()` |
| `src/views/loginView.js` | Builds the login form and captures user input |
| `src/views/homeView.js` | Builds the post list, create form, and edit/delete UI |
| `src/lib/observableState.js` | Shared state container — when data changes, views are notified automatically |
| `src/lib/router.js` | Switches between pages |
| `src/lib/tokenUtils.js` | Saves/reads/removes the login token from `localStorage` |
