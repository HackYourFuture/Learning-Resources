# HYF Data Track — Week 6 Practice Exercises

Five exercises that consolidate Week 6 (Azure fundamentals for data engineers): resource hierarchy, Blob Storage, Postgres, Container Apps Jobs, and cost awareness.

The Week 6 practice chapter is paper-based by design because the real value lives in live Azure runs against the shared infrastructure your teacher provisioned. These exercises are the Codespace-runnable counterpart: each one trains the muscle the assignment needs, so you arrive at the Azure portal with the thinking already done.

Work through them in order. None depend on each other, but the difficulty climbs gently.

> 🖼️ [Visual: Week 6 end-to-end (ACR → Job → Blob + Postgres)](https://htmlpreview.github.io/?https://gist.githubusercontent.com/lassebenni/bcd40b4adef81347309c9b931a04098f/raw/deployment_flow_visual.html)

Each exercise README links a diagram that matches the in-class slides. Open the visual before you start if you were not in class.

## Layout

| Folder | Topic | Azure access? |
|---|---|---|
| [`exercise_1/`](exercise_1/) | Trace a Resource Group | yes (`az login`) |
| [`exercise_2/`](exercise_2/) | End-to-End Blob Verification | yes (Key Vault + storage) |
| [`exercise_3/`](exercise_3/) | Postgres: create, ingest, query | yes (Key Vault + Postgres) |
| [`exercise_4/`](exercise_4/) | Container App Job create | yes (`az login` + ACR image) |
| [`exercise_5/`](exercise_5/) | Cost Analysis in the Portal | yes (`az login`) |

```text
week-6/
├── exercise_1/
│   ├── exercise.sh
│   ├── resource_table.md          # starter: fill from CLI output
│   ├── README.md
│   └── solutions/
│       ├── exercise.sh
│       └── resource_table.md
├── exercise_2/
│   ├── exercise.py
│   ├── .env.example
│   ├── pyproject.toml
│   ├── README.md
│   └── solutions/
│       └── exercise.py
├── exercise_3/
│   ├── exercise.py
│   ├── weather_data.csv
│   ├── pyproject.toml
│   ├── README.md
│   └── solutions/
│       └── exercise.py
├── exercise_4/
│   ├── exercise.sh
│   ├── validate_flags.sh          # gotchas check before you run create
│   ├── README.md
│   └── solutions/
│       └── exercise.sh
└── exercise_5/
    ├── exercise.sh                # prints portal link + verifies az login
    ├── cost_findings.md           # starter: fill from portal Cost Analysis
    ├── README.md
    └── solutions/
        ├── exercise.sh
        └── cost_findings.md
```

## Open in GitHub Codespaces

> 💻 [Open in GitHub Codespaces](https://github.com/codespaces/new/HackYourFuture/Learning-Resources?devcontainer_path=.devcontainer%2Fdata-track%2Fdevcontainer.json)

One Codespace covers all five exercises. From the Explorer, navigate into `data-track/week-6/exercise_N/`.

**Before you start**, confirm:

- `az login` works and your active subscription is the shared HYF tenant (`az account show`).
- You can read secrets from Key Vault (`kv-hyf-data`) for exercises 2 and 3.
- Your IP is on the Postgres firewall allowlist (your teacher manages this).
- The shared Container Apps environment is reachable: `az containerapp env show --name env-hyf-data --resource-group rg-hyf-data`.

If any of the above fails, ping your teacher before debugging your code.

## Clone locally

```bash
git clone https://github.com/HackYourFuture/Learning-Resources.git
cd Learning-Resources/data-track/week-6
```

Each exercise folder ships its own `README.md`. Python exercises use `uv sync` for dependencies.

## Reference solutions (peek only after attempting)

Each `exercise_N/solutions/` folder holds the reference answer in-place. The original `# TODO` comments are preserved, and `# WHY ...:` notes sit underneath each non-obvious choice.

**Read the WHY notes, not just the code.** The reasoning is what carries into real projects.

Time-box yourself: 15 to 30 minutes of honest attempt before opening `solutions/`. You can diff your work against the reference:

```bash
diff exercise_1/exercise.sh exercise_1/solutions/exercise.sh
diff exercise_3/exercise.py exercise_3/solutions/exercise.py
```
