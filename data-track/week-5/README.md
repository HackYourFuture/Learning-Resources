# HYF Data Track — Week 5 Practice Exercises

Seven exercises that consolidate Week 5 (containers & CI/CD): writing Dockerfiles, managing dependencies for reproducible builds, and automating checks with GitHub Actions.

Work through them in order. Exercises 1–4 build on each other (pipeline → caching → uv → comparison). Exercises 5–7 are standalone.

## Layout

| Folder | Topic | Concepts |
|---|---|---|
| [`exercise_1/`](exercise_1/) | Minimal Pipeline to Container | Dockerfile basics, `ENV`, `CMD` |
| [`exercise_2/`](exercise_2/) | Cache-Friendly Dockerfile | Layer ordering, `requirements.txt` |
| [`exercise_3/`](exercise_3/) | Cache-Friendly Dockerfile with uv | `uv sync --frozen`, `pyproject.toml`, `uv.lock` |
| [`exercise_4/`](exercise_4/) | Compare Both Docker Approaches | `requirements.txt` vs `uv`, trade-offs |
| [`exercise_5/`](exercise_5/) | CI Smoke Test | GitHub Actions, `pytest`, breaking CI intentionally |
| [`exercise_6/`](exercise_6/) | Environment Variable Patterns | `-e`, `--env-file`, `ARG` vs `ENV` |
| [`exercise_7/`](exercise_7/) | Image Tagging Strategy | `docker tag`, commit SHA, multi-environment tags |

```text
week-5/
├── exercise_1/
│   ├── src/pipeline.py       # starter pipeline script
│   ├── Dockerfile            # student fills the TODOs
│   ├── README.md
│   └── solutions/
│       └── Dockerfile        # reference answer with # WHY comments
├── exercise_2/
│   ├── src/pipeline.py
│   ├── requirements.txt
│   ├── Dockerfile            # BAD ordering — student fixes it
│   ├── README.md
│   └── solutions/
│       └── Dockerfile
├── exercise_3/
│   ├── src/pipeline.py
│   ├── pyproject.toml
│   ├── uv.lock
│   ├── Dockerfile            # student fills the TODOs
│   ├── README.md
│   └── solutions/
│       └── Dockerfile
├── exercise_4/
│   ├── README.md             # written comparison task
│   └── solutions/
│       └── answers.md
├── exercise_5/
│   ├── tests/
│   │   └── test_smoke.py     # student creates this
│   ├── .github/
│   │   └── workflows/
│   │       └── ci.yml        # student creates this
│   ├── README.md
│   └── solutions/
│       ├── test_smoke.py
│       └── ci.yml
├── exercise_6/
│   ├── src/pipeline.py
│   ├── .env.example
│   ├── Dockerfile
│   ├── README.md
│   └── solutions/
│       └── Dockerfile
└── exercise_7/
    ├── README.md
    └── solutions/
        └── answers.md
```

## Open in GitHub Codespaces

> 💻 [Open in GitHub Codespaces](https://github.com/codespaces/new/HackYourFuture/Learning-Resources?devcontainer_path=.devcontainer%2Fdata-track%2Fdevcontainer.json)

One Codespace covers all seven exercises. From the Explorer, navigate into `data-track/week-5/exercise_N/`.

**Note:** Exercises 1–3, 6–7 require Docker. The Codespace devcontainer includes Docker-in-Docker. If you work locally, make sure Docker Desktop is running.

## Clone locally

```bash
git clone https://github.com/HackYourFuture/Learning-Resources.git
cd Learning-Resources/data-track/week-5
```

## Reference solutions (peek only after attempting)

Each `exercise_N/solutions/` folder holds the reference answer. The original `# TODO` comments are preserved, and `# WHY ...:` notes explain the non-obvious choices.

**Read the WHY notes, not just the code.** The reasoning is what carries into real projects.

Time-box yourself: 15–30 minutes of honest attempt before opening `solutions/`. You can diff your work against the reference:

```bash
diff exercise_1/Dockerfile exercise_1/solutions/Dockerfile
```
