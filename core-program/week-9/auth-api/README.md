# Auth API

## Getting started

Go to the `auth-api/server` folder and run:

```bash
npm install
```

Start the server:

```bash
npm start
```

The server listens on `http://localhost:3000`.

## Authentication

- JWT signed with a secret key, expires after 1 hour.
- Send tokens with `Authorization: Bearer <token>`.

> Important: For simplicity, this demo API comes with a hardcoded "secret" in `server.js` for signing and verifying JSON webtokens. See the section at the bottom of this README how to handle secrets in production code.

## Endpoints

### Register user

- **POST** `/user/register`
- **Body**: `{ "username": <username>, "password": <password> }`
- **Responses**:
  - `201 Created`: `{ "id": "<uuid>", "username": <username> }`
  - `400 Bad Request`: missing fields or username already exists

### Login

- **POST** `/user/login`
- **Body**: `{ "username": <username>, "password": <password> }`
- **Responses**:
  - `200 OK`: `{ "token": "<jwt>" }`
  - `400 Bad Request`: missing fields
  - `401 Unauthorized`: invalid username or password

### Logout

- **POST** `/user/logout`
- **Responses**:
  - `200 OK`: `{ "message": "Logged out successfully" }`

### Get profile

- **GET** `/user/me`
- **Headers**: `Authorization: Bearer <jwt>`
- **Responses**:
  - `200 OK`: `{ "message": "You are currently logged in as <username>" }`
  - `401 Unauthorized`: missing/invalid/expired token
  - `404 Not Found`: user id in token not found

## Notes

- Passwords are hashed with bcrypt (10 salt rounds) before storage.
- Requests and JSON responses are logged to the console.
- Users are kept in-memory for this demo; restart clears registrations.

## Keep secrets out of source control

For production APIs, you should never expose your secrets in code that is pushed to a remote repository. Instead, load secrets from environment variables. The [`dotenv`](https://github.com/motdotla/dotenv) NPM package is often used for this. Here is how would use that:

1. Install dotenv (optional helper for local dev): `npm install dotenv`.
2. Create a `.env` file (not checked in) alongside `server.js`:

   ```bash
   JWT_SECRET="<your-long-random-secret>"
   ```

3. Add `.env` to `.gitignore` so it never gets committed:

   ```bash
   echo ".env" >> .gitignore
   ```

4. In your server code, load the secret with `import 'dotenv/config';` before using `process.env.JWT_SECRET`.

## Client (optional)

While you can test the endpoints of your API with Postman and/or `curl`, we have also provided a fully functional demo front-end application that demonstrates how a web token based authentication system might be used from the front-end side. The demo front-end resides in the `client` folder and is statically served by the backend. When the backend is running you can access the client at <http://localhost:3000>.

The client allows you to register, login and logout. After logging in, it uses the received JWT token to fetch the profile of the logged-in user and shows it on its home page. If this fetch fails, e.g. due to an expired token, the user is redirected to the login page.

Upon logging in, the client stores the JWT token in `localStorage`. When the client starts it tries to load this token from `localStorage`. If a token was found it try to load the client's home page directly. This may fail if the token is expired as mentioned earlier in which case the login page is loaded. If no token was found in `localStorage` at client startup the login page is loaded directly.

When logging out, the token is removed from `localStorage` and the user is redirected to the login page.

The process is illustrated in the diagram below.

![client-date-diagram](../.assets/client-state-diagram.png)

The client code logs debug information in the browser's console. This may help you to follow the application flow as you navigate through its pages.
