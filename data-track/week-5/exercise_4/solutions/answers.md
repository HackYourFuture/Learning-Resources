# Exercise 4: Reference Answers

## Question 1: Files copied before install

- **Exercise 2 (requirements.txt):** copies `requirements.txt`.
- **Exercise 3 (uv):** copies `pyproject.toml` and `uv.lock`.

## Question 2: Why uv needs two files

`uv` stores two pieces of information separately: the *declared* dependencies (in `pyproject.toml`) and the *resolved* full dependency graph including transitive packages (in `uv.lock`). Both files are needed before `uv sync --frozen` so uv can verify that the declared and resolved versions are in sync and then install exactly what the lock file says.

`pip` only needs `requirements.txt` because pinned requirements already list the specific versions to install. There is no separate resolution step at install time.

## Question 3: What "stricter" means

`pip install -r requirements.txt` installs exactly the packages and versions listed. If `requests==2.31.0` is listed, pip installs that version. But transitive dependencies (what `requests` itself depends on, like `urllib3`) are resolved at install time and may differ between runs.

`uv sync --frozen` refuses to run if `pyproject.toml` and `uv.lock` have drifted apart. This means:
- If someone edits `pyproject.toml` without updating `uv.lock`, the install fails loudly.
- The full transitive graph is pinned in `uv.lock`, so every run installs byte-for-byte the same environment.

In CI, this is the right behaviour: a stale lock file is a bug, and you want CI to catch it immediately rather than silently installing a slightly different environment.

## Question 4: Switch vs stay

**Reason to switch:** `uv.lock` pins the complete dependency tree including transitive packages. This prevents "it worked last week" failures caused by a transitive package releasing a breaking update.

**Reason to stay:** The team's existing Dockerfiles, CI scripts, and deployment pipelines are already wired around `requirements.txt`. Migrating introduces risk and requires updating every Dockerfile and CI step. If the current setup is stable and the team is not experiencing lock drift problems, the switching cost may not be worth it.

## Question 5: New project

Prefer `uv`. Starting fresh means zero migration cost. You get `uv.lock` (full dependency pinning), faster installs, and `uv sync --frozen` as an automatic guard against lock drift in CI and Docker from day one.
