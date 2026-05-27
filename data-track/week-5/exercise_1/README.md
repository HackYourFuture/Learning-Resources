# Exercise 1: Minimal Pipeline to Container

Package a small Python script into a Docker image and run it with an environment variable.

## Setup

No extra dependencies. `src/pipeline.py` uses only the standard library.

## Task

1. Open `Dockerfile` and fill in the five TODOs.
2. Build the image:
   ```bash
   docker build -t pipeline-practice:1.0 .
   ```
3. Run the container **without** `API_KEY` and confirm the output:
   ```
   API key present: False
   ```
4. Run it **with** `API_KEY` set:
   ```bash
   docker run --rm -e API_KEY=demo pipeline-practice:1.0
   ```
   Expected output:
   ```
   API key present: True
   ```

## Success criteria

- `docker build` completes without errors.
- Running without `-e API_KEY` prints `API key present: False`.
- Running with `-e API_KEY=demo` prints `API key present: True`.

## Stretch

- Change the `CMD` to use the exec form (`["python", "src/pipeline.py"]`) if you used the shell form. What is the difference?
- Add a `LABEL maintainer="yourname"` instruction. Run `docker inspect pipeline-practice:1.0` and find it.
