FROM python:3.11-slim

WORKDIR /app

# TODO 1: Identify which COPY + RUN pair below causes slow rebuilds.
#         Then reorder the instructions so dependency installs are cached
#         separately from source code changes.

# WHY copy requirements.txt first: Docker builds images as a stack of layers.
# Each instruction produces a layer. If a layer's inputs have not changed,
# Docker reuses the cached layer and skips re-executing it.
#
# By copying requirements.txt before any source code, the pip install layer
# only reruns when requirements.txt itself changes — not when pipeline.py changes.
# For a project with many dependencies, this can save 30–120 seconds per build.
COPY requirements.txt .
RUN pip install -r requirements.txt

# WHY copy source code after pip install: source code changes on every feature commit.
# Placing it after the dependency layer means code edits only invalidate this final
# COPY layer, not the expensive install step above.
COPY src/ src/

CMD ["python", "src/pipeline.py"]
