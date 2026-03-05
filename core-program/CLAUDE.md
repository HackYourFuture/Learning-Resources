# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Scope:** These instructions apply to `week-9/` and `week-10/` only. Other folders may have their own CLAUDE.md files with different conventions.

## About this repo

HackYourFuture (HYF) is an educational organization that trains refugees and displaced people for tech careers. This repository contains learning resources for the **core program** of the HYF curriculum. Trainees typically have no prior programming experience.

- Our students are called **"trainees"** — never use the word "student" in documentation (`.md` files). Code files (`.js`) are exempt.
- **README files are trainee-facing** — never expose admin credentials, internal details, or solution code there.
- Other markdown files (non-README) are for instructors/teachers/mentors and may contain internal details.
- All code must work **cross-platform** (macOS, Windows, Linux), including installation instructions.
- The `.hyf/` folder (if present) contains CI/grading infrastructure and is exempt from trainee-facing and cross-platform rules.

## Repository structure

```
week-9/     REST APIs & authentication
├── simple-api/        Minimal Express REST API demo
├── auth-api/          JWT authentication demo (server + client)
├── post-central/      Full-featured educational API (Express + WebSocket + OpenAPI)
│   └── post-client/   Web client for post-central (trainee assignment)
└── public-holidays/   External API integration demo (browser fetch)
week-10/    Promises, async/await & fetch()
├── event-loop/        Promise & microtask visualization
├── promise-finally/   Promise.finally() patterns
├── countdown/         Blocking vs non-blocking code
├── deck-of-cards/     Fetch API with external API
└── post-cli/          CLI client for post-central (trainee assignment)
```

### Post Central ecosystem (the main interconnected project)

- **`week-9/post-central/`** — The backend API server (Express v5, JWT auth, WebSocket, OpenAPI docs)
- **`week-9/post-central/post-client/`** — Web client assignment where trainees implement service functions against post-central
- **`week-10/post-cli/`** — CLI client assignment where trainees implement `fetch()` calls against post-central

  Both clients depend on post-central running at `http://localhost:3000`.

## Commands

### post-central (week-9)

```bash
cd week-9/post-central
npm install
npm start          # starts on port 3000
npm run kill       # kills process on port 3000
npm run dev        # nodemon dev mode
```

### post-cli (week-10)

```bash
cd week-10/post-cli
npm install
npm start          # run the CLI app
npm test           # run all vitest tests (watch mode)
npm run test:me    # run individual test suites
npm run test:get
npm run test:post
npm run test:crud
```

### post-client (week-9/post-central)

```bash
cd week-9/post-central/post-client
npm install
npm test           # run vitest tests
```

## Markdown conventions

- Use [GitHub alert syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) for tips, notes, warnings, etc. (e.g. `> [!TIP]`, `> [!NOTE]`)

## Code conventions

- **ES modules everywhere** (`import`/`export`, `"type": "module"`) — no CommonJS
- Destructure imports where possible
- Semicolons required
- Error responses use `{ error: '...' }` pattern
- JSON files saved with 2-space indentation

## Key architectural decisions

- **No database** — persistence is file-based JSON in `data/` directories. Don't introduce a database.
- **Config values are intentionally hardcoded** (JWT secret, port, expiry in `config/constants.js`) — this is fine for an educational app. **Exception:** the admin seed password is read from `process.env.ADMIN_PASSWORD` (loaded via dotenv) with fallback to `'admin'`.
- **Routes → controllers → services** pattern in post-central.
- **Admin account** (username: `admin`, password: `admin`) is auto-seeded on first run. Admin is hidden from `GET /users` — preserve this behavior.

## Trainee-facing code guidelines

For code that trainees will work on or read (starter files, assignments):

- Prefer **simple, inline code** over abstractions — clarity over DRY
- Avoid helper functions unless repetition is excessive
- Offer hints where repetition could be reduced
- Starter files (`services.starter.js`) have stub implementations; solution files (`services-solution.js` or `services.js`) are the references

These restrictions don't apply to pre-made code that trainees don't need to modify.

## Testing

- **Framework:** Vitest
- Tests mock `fetch()` — no running server required
- Tests verify correct URL, method, headers, and body construction
- post-central has no tests yet (vitest is installed as dev dependency)

## OpenAPI docs (post-central)

- Spec at `config/openapi.yaml`
- Scalar UI served at `/api-docs`, raw JSON at `/openapi.json`
- **Keep the spec in sync** when modifying endpoints
