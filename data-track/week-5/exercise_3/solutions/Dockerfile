# TODO 1: Start from the official Python 3.11-slim base image.
# WHY slim: saves ~770MB vs the full image. No documentation or test data needed
# in a production container.
FROM python:3.11-slim

WORKDIR /app

# TODO 2: Copy the uv binary from the official uv image.
# WHY COPY --from: this is a Docker multi-stage copy. Instead of installing uv
# via pip (which adds a pip dependency and is slower), we pull only the compiled
# binary from the official uv image. The result: a smaller final image with no
# pip layer involved.
COPY --from=ghcr.io/astral-sh/uv:0.6 /uv /usr/local/bin/uv

# TODO 3: Copy pyproject.toml and uv.lock into the container.
# WHY before source code: same caching logic as Exercise 2. uv.lock changes
# only when dependencies change; source code changes on every commit. Separating
# them means the install layer stays cached across code edits.
COPY pyproject.toml uv.lock ./

# TODO 4: Install dependencies using uv with the --frozen and --no-dev flags.
# WHY --frozen: without this flag, uv re-resolves the dependency graph from
# pyproject.toml and may pick newer versions than what uv.lock specifies. This
# defeats the purpose of committing a lock file — you would no longer be
# guaranteed the same environment across machines and CI runs.
# WHY --no-dev: pytest, ruff, and other dev tools are not needed at runtime.
# Including them inflates the image and widens the attack surface.
RUN uv sync --frozen --no-dev

# TODO 5: Copy the rest of the source code.
# WHY copy src/ separately: keeps source code changes from busting the uv sync layer.
COPY src/ src/

# TODO 6: Set the default run command using uv run.
# WHY uv run: uv run activates the managed virtual environment and then executes
# the command. This is the correct way to use the uv-managed venv inside Docker
# rather than manually sourcing the venv or relying on PATH manipulation.
CMD ["uv", "run", "python", "src/pipeline.py"]
