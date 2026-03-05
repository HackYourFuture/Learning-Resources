# Raw HTTP Request Viewer

A minimal TCP server that displays the raw HTTP request text exactly as it arrives on the wire. This helps you understand what HTTP requests actually look like at the protocol level — before any framework parses them.

## Setup

No extra dependencies needed beyond what's already installed in the project root. From the repository root:

```sh
npm install
```

## Usage

Start the server (default port 3000):

```sh
node core-program/week-9/raw-server/server.js
```

Or specify a custom port:

```sh
node core-program/week-9/raw-server/server.js 4000
```

Then, in another terminal, send a request:

```sh
curl http://localhost:3000/hello
```

The server console will display the raw request:

```
GET /hello HTTP/1.1
Host: localhost:3000
User-Agent: curl/8.15.0
Accept: */*

```

## Things to try

- **Different paths and methods:**
  ```sh
  curl http://localhost:3000/users/42
  curl -X POST http://localhost:3000/data
  ```
- **Custom headers:**
  ```sh
  curl -H "Authorization: Bearer abc123" http://localhost:3000/
  ```
- **Send a body:**
  ```sh
  curl -X POST -H "Content-Type: application/json" -d '{"name":"Ada"}' http://localhost:3000/
  ```
- **Open in a browser** and compare the request headers a browser sends vs. curl.

## How it works

This server uses Node's built-in `net` module to create a raw TCP server instead of the higher-level `http` module. This means it receives the request as a plain text string with no parsing — exactly the bytes the client sent. It then writes a hand-crafted HTTP response string back to the socket.
