# Exercise 3: Debug a broken `ref()`

## What you do

When dbt cannot resolve a `{{ ref() }}`, it fails at compile time, not at run time. That is different from a plain SQL `CREATE VIEW`: Postgres would not catch a bad table name until someone queries the view. This exercise drills the compile-to-find-the-typo workflow.

| File | Copy to your project at |
|---|---|
| `fct_trips_broken.sql` | `models/marts/fct_trips.sql` (overwrites your working file) |

## How to run

1. Copy the file and run:

   ```bash
   dbt compile --select fct_trips
   ```

2. Read the error message. Write down: which node did dbt name, and which file did it point at?

3. Find the typo and fix it directly in `models/marts/fct_trips.sql`.

4. Re-run `dbt compile --select fct_trips` to confirm it compiles cleanly.

## Success criteria

- You spotted the typo from the error message without reading the file top-to-bottom.
- You can state in one sentence why dbt reports the error at compile time rather than at run time.

Stuck? The corrected file is in `solutions/`. Try for 10 minutes first.
