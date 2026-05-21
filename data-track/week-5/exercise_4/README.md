# Exercise 4: Compare Both Docker Approaches

A written comparison exercise. No code to write — this is about understanding trade-offs.

## Task

Open your Dockerfiles from Exercise 2 (requirements.txt) and Exercise 3 (uv) side by side.

Answer the following questions in writing (a text file, a comment, or just think them through):

1. Which files does each Dockerfile copy before the dependency install step?
   - Exercise 2 (requirements.txt): copies `___`.
   - Exercise 3 (uv): copies `___` and `___`.

2. Why does the uv Dockerfile need to copy two files before the install step, while the requirements.txt Dockerfile only needs one?

3. `uv sync --frozen` is stricter than `pip install -r requirements.txt`. Explain what "stricter" means here and why that matters in CI.

4. Your team already has a `requirements.txt` and a working Dockerfile. A colleague suggests switching to `uv`. List one concrete reason to switch and one concrete reason to stay.

5. Which approach would you use for a brand-new project you control entirely? Why?

## Success criteria

You can explain the caching difference and the `--frozen` guarantee without looking at the chapter.

Check your answers against `solutions/answers.md`.
