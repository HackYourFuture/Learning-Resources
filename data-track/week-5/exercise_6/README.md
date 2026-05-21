# Exercise 6: Environment Variable Patterns

Practice three ways to pass configuration to a container: single `-e` flag, `--env-file`, and build-time `ARG`.

## Setup

Copy `.env.example` to `.env` (the `.env` file is gitignored):

```bash
cp .env.example .env
```

Build the starter image (complete the TODOs in `Dockerfile` first):

```bash
docker build -t pipeline-practice:6.0 .
```

## Task

1. Fill in the two TODOs in `Dockerfile`.

2. Build with a `BUILD_SHA` argument and confirm it appears in the build log:
   ```bash
   docker build --build-arg BUILD_SHA=abc123 -t pipeline-practice:6.0 .
   ```
   Look for `Building SHA: abc123` in the output.

3. Run the container with a single `-e` flag:
   ```bash
   docker run --rm -e API_KEY=demo pipeline-practice:6.0
   ```
   Expected: `API key present: True` and `Log level: INFO` (the default).

4. Run the container with `--env-file`:
   ```bash
   docker run --rm --env-file .env pipeline-practice:6.0
   ```
   Expected: `API key present: True` and `Log level: DEBUG` (from `.env`).

5. Run **without** any `-e` flags:
   ```bash
   docker run --rm pipeline-practice:6.0
   ```
   Expected: `API key present: False` and `Log level: INFO`.

6. Add `RUN echo $BUILD_SHA` after `CMD` in the Dockerfile. Build and run the container. Is `BUILD_SHA` visible at runtime? Why not?

## Success criteria

- `--build-arg BUILD_SHA=abc123` prints the SHA during build.
- `-e API_KEY=demo` makes `API key present: True`.
- `--env-file .env` picks up both `API_KEY` and `LOG_LEVEL`.
- `BUILD_SHA` is not available when the container runs (step 6).

## Stretch

- Try passing a secret with `-e SECRET=hunter2` and then running `docker history pipeline-practice:6.0`. Is the secret visible? What does this tell you about using `ENV SECRET=...` in a Dockerfile?
