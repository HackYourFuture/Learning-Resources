# Exercise 3: Cache-Friendly Dockerfile with uv

Build a Docker image that uses `uv` for locked dependency installs.

## Setup

You need `uv` installed locally to regenerate `uv.lock`. Install it once:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

The `uv.lock` is already committed in this exercise folder. If you want to see how it is generated from scratch:

```bash
uv lock
```

## Task

1. Fill in the six TODOs in `Dockerfile`.
2. Build the image:
   ```bash
   docker build -t pipeline-practice:3.0 .
   ```
3. Run it and confirm the output:
   ```bash
   docker run --rm -e API_KEY=demo pipeline-practice:3.0
   ```
   Expected:
   ```
   API key present: True
   ```
4. Edit only `src/pipeline.py` (add a comment) and build again. Confirm the `uv sync` layer stays cached.
5. Add a second dependency to `pyproject.toml`, run `uv lock` to update `uv.lock`, and build again. Confirm `uv sync` now reruns.
6. **Intentional failure:** bump the version in `pyproject.toml` without running `uv lock`. Try `uv sync --frozen` locally. Read the error — this is exactly what CI should throw when a lock file is stale.

## Success criteria

- Image builds and runs with the expected output.
- Editing source code does not invalidate the `uv sync` layer.
- Changing `pyproject.toml` + updating `uv.lock` does invalidate the layer.
- Running `uv sync --frozen` after editing `pyproject.toml` (without `uv lock`) produces an error.

## Stretch

- Compare the image size of Exercise 2 (pip) vs Exercise 3 (uv): `docker images pipeline-practice`.
- What would happen if you forgot `--frozen` in the `RUN` step?
