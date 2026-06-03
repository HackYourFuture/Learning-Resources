# HYF Data Track — Week 6 Practice Exercises

Five exercises that consolidate Week 6 (Azure fundamentals for data engineers): resource hierarchy, Blob Storage, Postgres connection strings, Container Apps Jobs, and cost awareness.

The Week 6 practice chapter is paper-based by design because the real value lives in live Azure runs against the shared infrastructure your teacher provisioned. These exercises are the Codespace-runnable counterpart: each one trains the *Python* and *diagnosis* muscle the assignment needs, so you arrive at the Azure portal with the thinking already done.

Work through them in order. None depend on each other, but the difficulty climbs gently.

## Layout

| Folder | Topic | Concepts |
|---|---|---|
| [`exercise_1/`](exercise_1/) | Trace a Resource Group | Azure CLI output, resource hierarchy, idle billing |
| [`exercise_2/`](exercise_2/) | End-to-End Blob Verification | `azure-storage-blob`, upload-from-code, verify-from-CLI |
| [`exercise_3/`](exercise_3/) | Debug a Broken Connection String | URL parsing, Azure FQDN, SSL, port |
| [`exercise_4/`](exercise_4/) | Dry-Run a Container App Job | `az containerapp job create`, flag self-check |
| [`exercise_5/`](exercise_5/) | Cost Estimation Challenge | Pricing arithmetic, idle billing, saving from stopping |

```text
week-6/
├── exercise_1/
│   ├── az_resource_list_output.json  # mock `az resource list` output
│   ├── exercise.py                   # starter with TODOs
│   ├── README.md
│   └── solutions/
│       └── exercise.py               # reference answer with # WHY notes
├── exercise_2/
│   ├── exercise.py                   # Azure-dependent; fails gracefully without env var
│   ├── .env.example
│   ├── requirements.txt
│   ├── README.md
│   └── solutions/
│       └── exercise.py
├── exercise_3/
│   ├── exercise.py
│   ├── README.md
│   └── solutions/
│       └── exercise.py
├── exercise_4/
│   ├── exercise.py
│   ├── README.md
│   └── solutions/
│       └── exercise.py
└── exercise_5/
    ├── exercise.py
    ├── README.md
    └── solutions/
        └── exercise.py
```

## Open in GitHub Codespaces

> 💻 [Open in GitHub Codespaces](https://github.com/codespaces/new/HackYourFuture/Learning-Resources?devcontainer_path=.devcontainer%2Fdata-track%2Fdevcontainer.json)

One Codespace covers all five exercises. From the Explorer, navigate into `data-track/week-6/exercise_N/`.

**Azure access needed?**

- Exercises 1, 3, 4, 5 run pure-Python with no Azure access required: the Codespace alone is enough.
- Exercise 2 needs the shared storage account's connection string. Ask your teacher; the starter prints the exact env-var name and exits cleanly if it is missing.
- Exercise 1 ships a representative mock of `az resource list` output. If you have Azure CLI installed and a shared resource group, you can drop in your own JSON to label the real environment.

## Clone locally

```bash
git clone https://github.com/HackYourFuture/Learning-Resources.git
cd Learning-Resources/data-track/week-6
```

Each exercise folder ships its own `requirements.txt` (when needed) and a per-exercise README with detailed instructions.

## Reference solutions (peek only after attempting)

Each `exercise_N/solutions/` folder holds the reference answer in-place. The original `# TODO` comments are preserved, and `# WHY ...:` notes sit underneath each non-obvious choice.

**Read the WHY notes, not just the code.** The reasoning is what carries into real projects.

Time-box yourself: 15 to 30 minutes of honest attempt before opening `solutions/`. You can diff your work against the reference:

```bash
diff exercise_1/exercise.py exercise_1/solutions/exercise.py
```
