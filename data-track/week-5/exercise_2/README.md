# Exercise 2: Cache-Friendly Dockerfile

Reorder a Dockerfile so that `pip install` is cached separately from source code changes.

## Setup

No extra setup — `src/pipeline.py` uses only `os` from the standard library. `requests` is in `requirements.txt` but not imported yet; it represents a real project dependency.

## Task

1. Build the image as-is and note how long the install step takes:
   ```bash
   docker build -t pipeline-practice:2.0 .
   ```
2. Add a blank line to `src/pipeline.py` and build again. Observe that `pip install` runs again from scratch.
3. Open `Dockerfile` and fix the `TODO 1`: reorder the `COPY` and `RUN` instructions so dependency installs are cached.
4. Build again after the fix, then add another blank line to `src/pipeline.py` and build a fourth time. Confirm that `pip install` is now served from cache (`---> Using cache`).

## Success criteria

- After fixing the Dockerfile, editing `src/pipeline.py` does **not** trigger a pip reinstall.
- `docker build` output shows `---> Using cache` for the pip install layer after a code-only change.

## Stretch

- Add a second package to `requirements.txt` (e.g. `pydantic==2.6.1`) and rebuild. Is the install layer invalidated? Why?
- What happens if you remove `requirements.txt` from `.dockerignore` but you already have it in the image?
