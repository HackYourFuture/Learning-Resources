# TODO 1: Start from the official Python 3.11-slim base image.
FROM ???

WORKDIR /app

# TODO 2: Copy the uv binary from the official uv image.
#         Use: COPY --from=ghcr.io/astral-sh/uv:0.6 /uv /usr/local/bin/uv
COPY --from=??? ??? ???

# TODO 3: Copy pyproject.toml and uv.lock into the container.
#         These must be copied BEFORE your source code so the install
#         layer is cached separately from code changes.
COPY ??? ???

# TODO 4: Install dependencies using uv with the --frozen and --no-dev flags.
#         --frozen: respect the lock file exactly, do not re-resolve.
#         --no-dev: skip development dependencies (linters, test runners).
RUN uv sync ???

# TODO 5: Copy the rest of the source code.
COPY ??? ???

# TODO 6: Set the default run command using uv run.
CMD ???
