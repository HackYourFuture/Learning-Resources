# HYF Data Track — Week 9 Practice Exercises

Seven SQL exercises that consolidate Week 9 (SQL for Analytics): joins, CTEs, aggregations, data validation, and building views. They are the runnable counterpart to the in-chapter practice. Run them against your own schema on the shared Azure PostgreSQL instance, not the shared `public` schema.

The dataset is the same NYC Taxi data you used in the chapters: `nyc_taxi.raw_trips` (~57K green-taxi rides from January 2024) and `nyc_taxi.raw_zones` (265 location lookups).

## Layout

| Folder | Topic | Core skill |
|--------|-------|------------|
| `exercise_1` | Join trips to zone names | INNER JOIN between fact and dimension |
| `exercise_2` | Trips and average fare per borough | GROUP BY with COUNT and AVG |
| `exercise_3` | Find the busiest day with a CTE | WITH block, then query the CTE |
| `exercise_4` | Refactor a nested subquery into CTEs | Rewrite nested subqueries as named steps |
| `exercise_5` | Validate the raw data | NULL checks, duplicate detection, orphan detection |
| `exercise_6` | Build views, then query them | CREATE OR REPLACE VIEW and star-schema queries |
| `exercise_7` | Compare a cartesian join to a filtered join | EXPLAIN and query plans |

## Folder structure

```text
week-9/
  exercise_1/
    exercise.sql
    README.md
    solutions/
      exercise.sql
  exercise_2/
    exercise.sql
    README.md
    solutions/
      exercise.sql
  ... (through exercise_7)
```

## How to run

These are SQL files, not Python. There is no `requirements.txt` and no Codespace runtime needed. Open each `exercise.sql` and run it against your assigned schema on the shared Azure PostgreSQL using `psql` or any SQL client (DBeaver, VS Code SQLTools, etc.).

None of these queries modify data, with one exception: exercise 6 creates views in your own schema using `CREATE OR REPLACE VIEW`, which is safe to re-run.

## Reference solutions and spoiler discipline

Each `exercise_N/solutions/exercise.sql` holds the answer with `-- WHY` notes explaining the non-obvious choices. Time-box yourself to 10 to 30 minutes on each exercise before peeking. When you do open a solution, read the WHY notes, not just the SQL: the reasoning is the teaching content.
