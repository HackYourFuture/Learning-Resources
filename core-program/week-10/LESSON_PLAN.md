# Lesson Plan: Building a Web Client with fetch()

- **Duration:** 45 minutes
- **Topic:** Using `fetch()` to connect a web UI to a REST API
- **Prior knowledge:** HTTP methods, API endpoints (week-9), basic `fetch()` (deck-of-cards)
- **Tools:** VS Code with Live Server, browser DevTools
- **Server:** Post Central (run by instructor)

## Introduction

This session uses the same Post Central API from week-9, but this time trainees write JavaScript to interact with it. In week-9 they used curl, Postman, and Scalar to make requests manually. Now they implement `fetch()` calls in a real web application.

The UI is already built — trainees implement the **services layer**: a set of functions that use `fetch()` to call the API. There are seven functions to implement. The `register()` function is provided as a working template.

The client runs locally in the browser via Live Server. It makes cross-origin requests to the instructor's Post Central server. A `BASE_URL` constant in `constants.js` tells `fetch()` where the server is.

## Setup

### Instructor

- Start Post Central: `cd week-9/post-central && npm start`
- Open the portal on the projector: `http://localhost:3000/portal`
- Note the local network IP displayed in the terminal — trainees will use this
- Have the API docs open: `http://localhost:3000/api-docs`

### Trainees (pairs)

1. Open the `post-client` folder (inside `week-9/post-central`) in VS Code
2. Open `src/services/constants.js` and set `BASE_URL` to the instructor's IP (e.g. `'http://192.168.1.42:3000'`)
3. Rename `src/services/services.starter.js` to `src/services/services.js` (replacing the existing file)
4. Right-click `index.html` → **"Open with Live Server"**
5. Verify: the app loads in the browser but shows "Not implemented" errors when you try to do anything — this is expected

## Schedule Overview

| Time | Section | Format |
| --- | --- | --- |
| 0–3 min | Introduction | Instructor talk |
| 3–8 min | Demo + setup | Instructor demo + trainees |
| 8–15 min | Exercise 1: getHello + login | Instructor-led → pair work |
| 15–23 min | Exercise 2: getProfile + getMyPosts | Pair work |
| 23–33 min | Exercise 3: createPost | Pair work |
| 33–43 min | Exercise 4: editPost + deletePost | Pair work |
| 43–45 min | Wrap-up | Instructor talk |

---

## 1. Introduction (3 min)

_Instructor sets the scene._

Explain what trainees will be doing in this session:

- You know Post Central from last week — you used curl, Postman, and the Scalar docs to interact with it. This week you do the same thing, but with **JavaScript** using `fetch()` calls that connect a web UI to the API
- The web application is already built. You are implementing the **service functions** that talk to the server
- The `register()` function is already implemented as a template — you will follow the same pattern for the other six functions

## 2. Demo + Setup (5 min)

_Instructor demonstrates the finished client, then trainees set up._

1. **Show the working client** — log in, create a post, edit it, delete it. Show how the portal updates in real time on the projector.
2. **Show the code** — open `services.js` and walk through the `register()` function briefly. Point out `BASE_URL`, the `fetch()` call, the response handling, and the error pattern.
3. **Trainees set up** — follow the setup steps above. The instructor writes the server IP address on the board.
4. **Verify** — trainees should see the client load but get "Not implemented" errors. This confirms their setup is correct.

## 3. Exercise 1: getHello + login (7 min)

**Goal:** Implement the two simplest functions to get the app working.

_Instructor walks through `getHello()` together as a class._

- This is the simplest function: a `GET` request with no authentication
- Show how it mirrors the `register()` template but without a request body, method, or headers
- Trainees type along

_Pairs implement `login()` independently._

- Point out that `login()` is almost identical to `register()` — same structure, different URL
- After implementing, trainees can log in through the UI

**Verify:** Trainees can register and log in. The instructor's portal shows new users appearing.

## 4. Exercise 2: getProfile + getMyPosts (8 min)

**Goal:** Introduce the `Authorization` header.

_Instructor explains the Bearer token concept._

- After logging in, the app stores a JWT token
- Protected endpoints require an `Authorization: Bearer <token>` header
- Show the JSDoc comment above `getProfile()` — it documents the header

_Walk through `getProfile()` together._

- This is the first function with an auth header — show how to add `Authorization: \`Bearer ${token}\`` to the headers object
- Trainees type along

_Pairs implement `getMyPosts()` independently._

- Same pattern as `getProfile()` — different URL, same auth header

**Verify:** After logging in, the home page loads (but empty — no posts yet).

## 5. Exercise 3: createPost (10 min)

**Goal:** Combine authentication with a request body.

_Pairs implement `createPost()`._

- This function needs both the `Authorization` header **and** a JSON request body
- It combines what they learned from `register()` (body) and `getProfile()` (auth header)
- Give pairs time to figure this out — the JSDoc comments have all the information

**Verify:** Trainees create a post in the UI. It appears on the instructor's portal in real time.

**Discussion points for instructors walking around:**

- What is the difference between POST and GET?
- Why does `createPost` need a body but `getMyPosts` does not?
- What happens if you forget the `Authorization` header? (401 Unauthorized)

## 6. Exercise 4: editPost + deletePost (10 min)

**Goal:** Introduce PUT and DELETE methods with dynamic URLs.

_Pairs implement `editPost()` and `deletePost()`._

- New concept: the URL includes the post ID (e.g. `` `${BASE_URL}/posts/${id}` ``)
- `editPost` uses `PUT` and needs a body
- `deletePost` uses `DELETE` and does **not** need a body
- Both need the `Authorization` header

**Verify:** Full CRUD working in the browser — trainees can create, edit, and delete posts.

**Bonus:** Try editing or deleting someone else's post. What happens? (403 Forbidden — this is authorization vs authentication)

## 7. Wrap-up (2 min)

_Instructor-led recap._

- You used `fetch()` to connect a real web UI to a REST API — the same API you explored manually last week
- Every web application works this way: a front end sending HTTP requests to an API
- The pattern is always the same: build a URL, set headers, optionally add a body, send the request, handle the response
- **Self-check:** Trainees should run `npm test` from the `post-client` folder after class to verify their implementations. The tests mock `fetch()` — no running server is needed.
- **Homework:** The `post-cli` exercise uses the same patterns but in Node.js on the command line

---

## Instructor Notes

### Timing tips

- Exercises 2–4 are the core of the lesson — protect this time
- If pairs finish early, suggest looking at the JSDoc comments and thinking about how they could reduce repetition across the functions
- The introduction and demo can be compressed if trainees are already settled
- Tests are now a take-home activity — remind trainees to run `npm test` after class

### Common issues

- **BASE_URL wrong:** If `fetch()` calls fail with network errors, check that `BASE_URL` in `constants.js` matches the instructor's IP and port. This is the most common issue.
- **Missing `await`:** If trainees get `Promise { <pending> }` instead of data, they forgot to `await` the `fetch()` or `.json()` call
- **Missing Authorization header:** If authenticated endpoints return 401, check that the `Authorization` header is set correctly with the `Bearer ` prefix (note the space)
- **CORS errors:** If the browser console shows CORS errors, the `BASE_URL` is probably wrong or the server is not running. Post Central has CORS enabled for all origins.
- **Live Server not starting:** Make sure trainees right-click `index.html` specifically, not another file

### Role of the two instructors

- One instructor leads from the front (intro, demo, walk-throughs, wrap-up)
- Both instructors circulate during pair work to help trainees who are stuck
- Prioritise pairs who have not completed exercise 2 by minute 20

### Connection to week-9

Remind trainees that this is the same API they used last week with curl and Postman. The only difference is that now JavaScript is building and sending the requests instead of a human typing them. The URLs, methods, headers, and bodies are all the same.
