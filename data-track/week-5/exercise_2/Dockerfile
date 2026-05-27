# BAD: This Dockerfile copies all source code before installing dependencies.
# Every code change — even a single blank line in pipeline.py — invalidates
# the pip install cache layer, forcing a full reinstall on each build.

FROM python:3.11-slim

WORKDIR /app

# TODO 1: Identify which COPY + RUN pair below causes slow rebuilds.
#         Then reorder the instructions so dependency installs are cached
#         separately from source code changes.

COPY . .
RUN pip install -r requirements.txt

CMD ["python", "src/pipeline.py"]
