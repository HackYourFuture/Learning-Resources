# Slide Content: Building a Web Client with fetch()

Copy each slide into Google Slides. Speaker notes are included below each slide.

---

## Slide 1: Title

**Building a Web Client with fetch()**

Post Central — Hands-on Session

> Speaker notes: Welcome slide. Keep displayed while trainees settle in. This session builds directly on week-9 — same API, but now they write JavaScript instead of using curl/Postman.

---

## Slide 2: What you will do today

- Write JavaScript `fetch()` calls that connect a web app to the Post Central API
- Implement **seven service functions** — the same requests you made manually last week
- The UI is already built — you write the code that talks to the server
- The `register()` function is provided as a working template

> Speaker notes: Emphasise continuity with week-9. They already know the API, the endpoints, and the request structure. The only new thing is doing it in JavaScript. Point out that `register()` is their reference for every function they write.

---

## Slide 3: How the app works

**Browser (your code)** → `fetch()` → **Post Central API**

- The web app runs locally in your browser via Live Server
- Your service functions use `fetch()` to send HTTP requests to the API
- The API responds with JSON — just like last week
- The UI reads the responses and updates the page

_Image suggestion: simple diagram showing Browser on the left, an arrow labelled "fetch()" in the middle, and Post Central API on the right_

> Speaker notes: Draw or show this diagram. The key point is that `fetch()` is doing exactly what curl and Postman did — building an HTTP request and sending it. The browser is the new tool.

---

## Slide 4: Setup

1. Open the `post-client` folder in VS Code
2. Set `BASE_URL` in `src/services/constants.js` to the instructor's IP
3. Rename `services.starter.js` to `services.js`
4. Right-click `index.html` → **"Open with Live Server"**
5. Verify: the app loads but shows **"Not implemented"** errors

_The instructor will write the server IP address on the board._

> Speaker notes: Walk through each step. The "Not implemented" errors confirm that setup is correct — the app is running but the service functions are stubs. Give trainees a minute to complete setup before moving on.

---

## Slide 5: Exercise 1 — getHello + login

**Goal:** Implement the two simplest functions.

- `getHello()` — a plain `GET` request, no authentication needed
- `login()` — almost identical to the provided `register()` function
- Follow the pattern in `register()` for both
- After implementing, you should be able to **log in** through the UI

_Image suggestion: screenshot of the login screen_

> Speaker notes: Walk through `getHello()` together as a class — it's the simplest possible fetch call. Then let pairs implement `login()` independently. It's nearly identical to `register()` but with a different URL. Check the portal to confirm new users are appearing.

---

## Slide 6: Exercise 2 — getProfile + getMyPosts

**Goal:** Use the `Authorization` header with a Bearer token.

- After logging in, the app stores a **token**
- Protected endpoints require: `Authorization: Bearer <token>`
- Read the JSDoc comments above each function for guidance
- `getProfile()` and `getMyPosts()` follow the same pattern
- After implementing, the **home page** should load (but empty — no posts yet)

> Speaker notes: Walk through `getProfile()` together to introduce the auth header concept. Show how to add `Authorization: \`Bearer ${token}\`` to the headers object. Then let pairs do `getMyPosts()` on their own — same pattern, different URL.

---

## Slide 7: Exercise 3 — createPost

**Goal:** Combine an auth header with a JSON request body.

- `createPost()` needs **both** the `Authorization` header **and** a JSON body
- This combines what you learned from `register()` (body) and `getProfile()` (auth)
- Use the JSDoc comments — they document exactly what is needed
- After implementing, create a post and **watch it appear on the portal**

> Speaker notes: Let pairs work through this one independently — they have all the building blocks from the previous exercises. Circulate and ask: "What happens if you forget the Authorization header?" (401 Unauthorized). This is a good moment to check that every pair has completed exercise 2.

---

## Slide 8: Exercise 4 — editPost + deletePost

**Goal:** Use PUT and DELETE methods with dynamic URLs.

- The URL includes the post ID: `` `${BASE_URL}/posts/${id}` ``
- `editPost()` uses `PUT` and needs a body
- `deletePost()` uses `DELETE` and does **not** need a body
- Both need the `Authorization` header
- **Bonus:** Try editing or deleting someone else's post — what happens?

> Speaker notes: Pairs should be fairly independent by now. The bonus question about modifying someone else's post leads to a 403 Forbidden response — this is the authentication vs authorization distinction from week-9. Once a pair finishes, they have full CRUD working.

---

## Slide 9: The fetch() pattern

Every function you wrote follows the same pattern:

1. **Build the URL** — base URL + endpoint (+ optional ID)
2. **Choose the method** — GET, POST, PUT, or DELETE
3. **Set headers** — `Content-Type` for JSON bodies, `Authorization` for protected routes
4. **Add a body** — `JSON.stringify()` the data (when needed)
5. **Send and handle** — `await fetch()`, check the response, parse JSON

> Speaker notes: This is the key takeaway. Every web application works this way — a front end sending HTTP requests to an API. The specific URLs and data change, but the pattern is always the same. Ask trainees: "Which of these five steps did every function need? Which were optional?"

---

## Slide 10: Wrap-up + homework

- You connected a real web UI to a REST API using `fetch()`
- The same API, the same requests — but now in JavaScript
- Every web application works this way under the hood
- **Self-check:** Run `npm test` in the `post-client` folder to verify your code
- **Homework:** `post-cli` — same patterns, but in Node.js on the command line

> Speaker notes: Keep it short. Remind trainees that `npm test` works without a running server — the tests mock `fetch()`. The post-cli homework reinforces the same patterns in a different environment. Tests are a take-home activity — they don't need to run them in class.
