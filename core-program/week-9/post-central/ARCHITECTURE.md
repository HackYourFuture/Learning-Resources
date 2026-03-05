# Architecture: Observable State + Reactive View

This document specifies the frontend architecture shared by the **portal** (`week-9/post-central/portal/`) and **post-client** (`week-9/post-central/post-client/`). It is intended as a blueprint that Claude Code can follow to scaffold a new vanilla JS app, and as a reference for instructors.

## 1. Overview

The architecture has four layers:

```
App (bootstrap) → Page (business logic) → View (DOM rendering)
                                        ↗
                  Services / Transport (I/O)
```

- **App** — entry point. Creates `ObservableState`, instantiates the root Page (single-page) or a Router (multi-page), and mounts.
- **Page** — owns all business logic. Calls services/transport, updates state, handles errors. The only layer that writes to state.
- **View** — pure rendering. Receives state via its `update(state)` method, renders DOM, and fires callbacks to the page. Never writes to state, never calls services.
- **Services** — pure async functions that call `fetch()`. Never touch state. Return data or throw errors with a `.status` property.
- **Transport** — for non-HTTP I/O (e.g. WebSocket). Pure transport layer that accepts callbacks. Never touches state.
- **ObservableState** — the reactive glue. Pages write to it; views subscribe and react.

Data flow:

```
User action → View callback → Page handler → Service call → Page updates state → View re-renders
```

## 2. Directory structure convention

### Single-page app (e.g. portal)

```
src/
  app.js                  bootstrap
  lib/
    observableState.js
    websocket.js          transport (if needed)
  pages/
    <name>Page.js         e.g. dashboardPage.js
  views/
    <name>View.js         e.g. dashboardView.js
```

### Multi-page app (e.g. post-client)

```
src/
  app.js                  bootstrap
  routes.js               route table
  lib/
    observableState.js
    router.js
    tokenUtils.js         localStorage wrapper (if auth)
    getElementsWithIds.js DOM utility
  pages/
    basePage.js           abstract base class
    <name>Page.js         e.g. homePage.js, loginPage.js
  views/
    baseView.js           abstract base class
    <name>View.js         e.g. homeView.js, loginView.js
  services/
    <name>.js             e.g. services.js, admin.js
```

## 3. ObservableState

The shared reactive store. Copy this class verbatim into any new project.

```js
export default class ObservableState {
  #state = {};
  #subscribers = new Set();

  #notify() {
    console.log(this.#state);

    this.#subscribers.forEach((subscriber) => {
      subscriber.update({ ...this.#state });
    });
  }

  subscribe(subscriber) {
    this.#subscribers.add(subscriber);
  }

  unsubscribe(subscriber) {
    this.#subscribers.delete(subscriber);
  }

  update(updates) {
    this.#state = { ...this.#state, ...updates };
    this.#notify();
  }

  get() {
    return { ...this.#state };
  }

  set(nextState) {
    this.#state = { ...nextState };
    this.#notify();
  }

  clear() {
    this.#state = {};
    this.#notify();
  }
}
```

### API

| Method | Description |
|---|---|
| `subscribe(subscriber)` | Register an object with an `update(state)` method |
| `unsubscribe(subscriber)` | Remove a subscriber |
| `update(updates)` | Shallow-merge `updates` into state, notify all subscribers |
| `set(nextState)` | Replace entire state, notify all subscribers |
| `get()` | Return a shallow copy of current state |
| `clear()` | Reset state to `{}`, notify all subscribers |

Subscribers must implement `{ update(state) }`. Views satisfy this contract naturally.

## 4. How to create a Page

A Page owns all business logic for one screen (or the entire app in single-page mode).

### Single-page pattern (no BasePage)

```js
import SomeTransport from '../lib/someTransport.js';
import DashboardView from '../views/dashboardView.js';

export default class DashboardPage {
  #state;
  #view;
  #transport;

  constructor({ state, container }) {
    this.#state = state;

    // 1. Define initial state shape
    state.set({
      items: [],
      connectionStatus: 'connecting',
      lastAction: null,
    });

    // 2. Create the view (pass container, not state)
    this.#view = new DashboardView(container);

    // 3. Create transport/services with callbacks
    this.#transport = new SomeTransport(url, {
      onMessage: (msg) => this.#handleMessage(msg),
      onStatusChange: (status) => state.update({ connectionStatus: status }),
    });
  }

  mount() {
    this.#state.subscribe(this.#view);
    this.#view.update(this.#state.get());  // initial render
    this.#transport.connect();
  }

  destroy() {
    this.#state.unsubscribe(this.#view);
    this.#transport.disconnect();
    this.#view.destroy();
  }

  #handleMessage(message) {
    // Update state — the ONLY place that calls state.update()
    this.#state.update({ items: newItems, lastAction: { type: '...' } });
    queueMicrotask(() => this.#state.update({ lastAction: null }));
  }
}
```

### Multi-page pattern (with BasePage + Router)

**BasePage** provides lifecycle hooks and state/router access:

```js
export default class BasePage {
  #state;
  #view;
  #router;

  constructor(props) {
    this.#state = props.state;
    this.#router = props.router;
  }

  set view(value) {
    this.#view = value;
  }

  get root() {
    return this.#view.root;
  }

  get state() {
    return this.#state;
  }

  get router() {
    return this.#router;
  }

  pageDidMount() {
    this.#state.subscribe(this.#view);
    this.#view.update(this.#state.get());
  }

  pageWillUnmount() {
    this.#state.unsubscribe(this.#view);
  }
}
```

**Concrete page:**

```js
import { login } from '../services/services.js';
import { putToken } from '../lib/tokenUtils.js';
import LoginView from '../views/loginView.js';
import BasePage from './basePage.js';

export default class LoginPage extends BasePage {
  constructor(props) {
    super(props);
    // Pass callbacks as props — the view calls these, not services directly
    this.view = new LoginView({
      onSubmit: this.#onSubmit,
      onRegister: this.#onRegister,
    });
  }

  #onSubmit = async (name, password) => {
    try {
      const data = await login(name, password);
      putToken(data.token);
      this.state.update({ token: data.token, user: data.user, error: null });
      this.router.navigateTo('home');
    } catch (error) {
      this.state.update({ error: error.message });
    }
  };

  #onRegister = () => {
    this.router.navigateTo('register');
  };
}
```

### Key rules for pages

1. Define the initial state shape in the constructor via `state.set()` (single-page) or `state.update()` (multi-page, to preserve token).
2. Only pages call `state.update()`, `state.set()`, or `state.clear()`.
3. Pass callbacks to views — views fire them, pages handle them.
4. Call services in try/catch blocks. On error: `state.update({ error: error.message })`.
5. Auth error handling: check `error.status === 401` → clear token → clear state → redirect to login.
6. For transient events (notifications), use `lastAction` + `queueMicrotask` clearing (see section 8).

## 5. How to create a View

A View renders DOM and fires callbacks. It never writes to state or calls services.

### Multi-page view (with BaseView)

**BaseView** creates a root DOM element:

```js
export default class BaseView {
  #root;

  constructor(tagName = 'div') {
    this.#root = document.createElement(tagName);
  }

  update(state) {
    // Override in subclass
  }

  get root() {
    return this.#root;
  }
}
```

**Concrete view:**

```js
import getElementsWithIds from '../lib/getElementsWithIds.js';
import BaseView from './baseView.js';

export default class LoginView extends BaseView {
  #props;
  #dom;

  constructor(props) {
    super('div');
    this.#props = props;

    // 1. Build DOM with innerHTML (using String.raw for template clarity)
    this.root.innerHTML = String.raw`
      <div class="auth-container">
        <div id="errorSlot"></div>
        <form id="form">
          <input type="text" id="name" required />
          <input type="password" id="password" required />
          <button type="submit">Login</button>
        </form>
        <a href="#" id="registerLink">Register</a>
      </div>
    `;

    // 2. Cache DOM references
    this.#dom = getElementsWithIds(this.root);

    // 3. Attach event listeners — fire callbacks to the page
    this.#dom.form.addEventListener('submit', this.#onSubmit);
    this.#dom.registerLink.addEventListener('click', this.#onRegister);
  }

  // Event handlers delegate to page via props callbacks
  #onSubmit = (e) => {
    e.preventDefault();
    const { name, password } = this.#dom;
    this.#props.onSubmit(name.value, password.value);
  };

  #onRegister = (e) => {
    e.preventDefault();
    this.#props.onRegister();
  };

  // Called by ObservableState on every state change
  update(state) {
    if (state.error) {
      this.#dom.errorSlot.innerHTML = `<div class="error-banner">${state.error}</div>`;
    } else {
      this.#dom.errorSlot.innerHTML = '';
    }
  }
}
```

### Single-page view (no BaseView)

When the HTML is pre-defined in `index.html`, the view receives the container element instead of creating its own root:

```js
export default class DashboardView {
  #container;
  #lastState;
  #timestampUpdateInterval;

  constructor(container) {
    this.#container = container;

    // Query existing DOM elements from the pre-defined HTML
    // (no innerHTML creation needed — the structure is in index.html)

    // Optional: periodic re-render for relative timestamps
    this.#timestampUpdateInterval = setInterval(() => {
      if (this.#lastState) {
        this.#render(this.#lastState);
      }
    }, 60000);
  }

  update(state) {
    this.#lastState = state;
    this.#render(state);
  }

  #render(state) {
    // Render DOM based on state
  }

  destroy() {
    if (this.#timestampUpdateInterval) {
      clearInterval(this.#timestampUpdateInterval);
    }
  }
}
```

### `getElementsWithIds` utility

Used in multi-page views to cache DOM references by `id` attribute. Copy this into `lib/getElementsWithIds.js`:

```js
/**
 * Get all child elements with an `id` attribute, starting from `root`.
 * @param {HTMLElement} root The root element to start from.
 * @returns An object with `id` as key and an element reference as value.
 */
function getElementsWithIds(root) {
  const elementsWithIds = Array.from(root.querySelectorAll('[id]'));
  const dom = {};
  for (const elem of elementsWithIds) {
    dom[elem.id] = elem;
  }
  return dom;
}

export default getElementsWithIds;
```

### Key rules for views

1. Never call `state.update()`, `state.set()`, or `state.get()`.
2. Never import or call services.
3. Communicate with the page only through callback props (`this.#props.onSubmit(...)`, etc.).
4. All rendering happens in `update(state)` (called by ObservableState).
5. Use `getElementsWithIds` to cache DOM references after setting `innerHTML`.
6. Use event delegation for dynamic lists (listen on the parent, use `e.target.closest()`).
7. Escape user content with `textContent` → `innerHTML` pattern to prevent XSS.

## 6. How to create a Service

Services are pure async functions. They call `fetch()`, parse the response, and return data or throw errors. They never touch state.

### Error handling contract

Every service function follows this pattern:

```js
const response = await fetch(url, options);
const data = await response.json();
if (!response.ok) {
  const error = new Error(data.error || response.statusText);
  error.status = response.status;
  throw error;
}
return data;
```

The thrown error always has a `.status` property (HTTP status code) so pages can distinguish auth errors (401) from other failures.

### Full examples

```js
// GET (no auth)
export async function getHello() {
  const response = await fetch('/posts/hello');
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}

// POST (no auth)
export async function register(name, password) {
  const response = await fetch('/users/register', {
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

// GET (with auth)
export async function getMyPosts(token) {
  const response = await fetch('/posts/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}

// PUT (with auth)
export async function editPost(token, id, text) {
  const response = await fetch(`/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || response.statusText);
    error.status = response.status;
    throw error;
  }
  return data;
}

// DELETE (with auth)
export async function deletePost(token, id) {
  const response = await fetch(`/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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

## 7. Router (multi-page apps only)

Hash-based SPA router. Copy this class for any multi-page app.

```js
export default class Router {
  #routes;
  #pageRoot;
  #currentPage = {};
  #state;

  constructor(state) {
    this.#state = state;
    window.addEventListener('hashchange', this.#onHashChange);
  }

  #getRouteParts() {
    const [hash, ...rest] = decodeURI(window.location.hash).split('/');
    const path = hash.replace('#', '');
    return [path, ...rest];
  }

  #findRouteByPathname(pathname) {
    return this.#routes.find((route) => route.path === pathname);
  }

  #onHashChange = async () => {
    const [pathname, ...params] = this.#getRouteParts();

    let route = this.#findRouteByPathname(pathname);
    if (!route) {
      route = 'login';
    }

    // Lifecycle: unmount previous page
    if (this.#currentPage.pageWillUnmount) {
      this.#currentPage.pageWillUnmount();
    }

    // Create new page
    let newPage = new route.page({ router: this, params, state: this.#state });

    // Swap DOM
    this.#pageRoot.innerHTML = '';
    this.#pageRoot.appendChild(newPage.root);
    window.scrollTo(0, 0);

    // Lifecycle: mount new page
    if (newPage.pageDidMount) {
      newPage.pageDidMount();
    }

    this.#currentPage = newPage;
  };

  initialize(routes, pageRoot) {
    this.#routes = routes;
    this.#pageRoot = pageRoot;
  }

  start() {
    this.#onHashChange();
  }

  navigateTo(path, ...params) {
    const encodedHash = encodeURI('#' + [path, ...params].join('/'));
    window.location.assign(encodedHash);
  }
}
```

### Route table format

```js
// routes.js
import HomePage from './pages/homePage.js';
import LoginPage from './pages/loginPage.js';

const routes = [
  { path: 'home', page: HomePage },
  { path: 'login', page: LoginPage },
];

export default routes;
```

### Page lifecycle

```
navigateTo('home')
  → currentPage.pageWillUnmount()   // unsubscribe view from state
  → new HomePage({ state, router }) // constructor: create view, start loading data
  → pageRoot.appendChild(root)      // DOM swap
  → homePage.pageDidMount()         // subscribe view to state, initial render
```

## 8. State management rules

1. **Only pages write to state** via `state.update()`, `state.set()`, or `state.clear()`.
2. **Views read state** via their `update(state)` callback. Never call `state.get()` from a view.
3. **Services and transport** never import or touch `ObservableState`.
4. **Define initial state shape** in the page constructor via `state.set()` (single-page) or `state.update()` (multi-page).
5. **Transient events** (notifications, flash messages) use the `lastAction` pattern:

```js
// In the page handler:
this.#state.update({
  items: newItems,
  lastAction: { type: 'item:create', item: newItem },
});
queueMicrotask(() => this.#state.update({ lastAction: null }));
```

The view processes `lastAction` in the current render cycle (showing a notification). The `queueMicrotask` clears it immediately after, so the next render doesn't show a stale notification. This replaces the anti-pattern of the view writing `lastAction: null` back to state.

## 9. Naming conventions

| What | Convention | Example |
|---|---|---|
| Files | `camelCase.js` | `homePage.js`, `homeView.js` |
| Classes | `PascalCase` | `HomePage`, `HomeView` |
| Page classes | `*Page` suffix | `DashboardPage`, `LoginPage` |
| View classes | `*View` suffix | `DashboardView`, `LoginView` |
| Private fields | `#` prefix | `#state`, `#view`, `#dom` |
| Callbacks (props) | `on*` prefix | `onSubmit`, `onDelete`, `onLogout` |
| Event handlers (view-internal) | `#on*` prefix | `#onSubmit`, `#onPostAction` |
| State update handlers (page-internal) | `#handle*` prefix | `#handlePostCreate` |
| Module system | ES modules | `import`/`export`, `"type": "module"` |

## 10. Wiring it all together

### Single-page app bootstrap

```js
// app.js
import ObservableState from './lib/observableState.js';
import DashboardPage from './pages/dashboardPage.js';

window.addEventListener('DOMContentLoaded', () => {
  const state = new ObservableState();
  const container = document.getElementById('app-root');
  const page = new DashboardPage({ state, container });
  page.mount();
});
```

### Multi-page app bootstrap

```js
// app.js
import ObservableState from './lib/observableState.js';
import Router from './lib/router.js';
import { getToken } from './lib/tokenUtils.js';
import routes from './routes.js';

function start() {
  const appRoot = document.getElementById('app-root');

  const pageRoot = document.createElement('div');
  pageRoot.id = 'page-root';
  appRoot.appendChild(pageRoot);

  const state = new ObservableState();

  const token = getToken();
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

## 11. Portal vs Post-Client comparison

| Aspect | Portal | Post-Client |
|---|---|---|
| Type | Single-page | Multi-page (SPA with hash router) |
| Page class | `DashboardPage` (standalone) | Multiple pages extending `BasePage` |
| View class | `DashboardView` (takes container) | Multiple views extending `BaseView` |
| I/O layer | WebSocket transport | HTTP services (fetch) |
| Routing | None | Hash-based `Router` |
| Auth | None (read-only dashboard) | JWT tokens in localStorage |
| State shape | `{ posts, users, connectionStatus, lastAction }` | `{ token, user, role, posts, error }` |
| HTML | Pre-defined in `index.html` | Views create DOM via `innerHTML` |
| DOM utility | `querySelector` on container | `getElementsWithIds` on view root |

## 12. Checklist for creating a new app

1. **Decide**: single-page or multi-page?
2. **Create directory structure** per section 2.
3. **Copy `ObservableState`** into `lib/observableState.js` (section 3).
4. **If multi-page**: copy `Router` (section 7), `BasePage` (section 4), `BaseView` (section 5), `getElementsWithIds` (section 5), and create `routes.js`.
5. **Define state shape**: list all state properties the app will use.
6. **Create services** (section 6): one async function per API call, following the error contract.
7. **Create views** (section 5): constructor builds DOM + attaches listeners, `update(state)` renders reactively, callbacks fire to page via props.
8. **Create pages** (section 4): constructor creates view + sets initial state, handlers call services and update state, lifecycle methods manage subscriptions.
9. **Write `app.js`** (section 10): bootstrap with `DOMContentLoaded`.
10. **Verify**: state only written by pages, views only read state, services are pure functions.
