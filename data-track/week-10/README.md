# HYF Data Track — Week 10 Practice Exercises

Four exercises that consolidate Week 10 (dbt Core: SQL transformations as a tested, documented, version-controlled project). Each exercise targets one skill from the content chapters. Work through them in order: Exercise 1 is a prerequisite for the `fct_trips` mart, and later exercises assume the project state from Exercises 1–3.

These exercises require your Week 10 dbt project (set up in Chapter 2) running against the shared Azure PostgreSQL instance. They are not standalone: you copy the provided SQL files into your project and run dbt commands.

## Layout

| Folder | Skill | dbt command to verify |
|--------|-------|----------------------|
| `exercise_1` | Macros and computed columns for `stg_trips` | `dbt run --select stg_trips` |
| `exercise_2` | Write and run a singular test | `dbt test --select test_type:singular` |
| `exercise_3` | Debug a broken `ref()` | `dbt compile --select fct_trips` |
| `exercise_4` | Propagate a column change from staging to mart | `dbt run --select +fct_trips` |

## Folder structure

```text
week-10/
  exercise_1/
    safe_divide.sql     -- copy to macros/safe_divide.sql
    stg_trips.sql       -- copy to models/staging/stg_trips.sql
    README.md
    solutions/
      safe_divide.sql
      stg_trips.sql
  exercise_2/
    assert_fare_amount_non_negative.sql  -- copy to tests/
    README.md
    solutions/
      assert_fare_amount_non_negative.sql
  exercise_3/
    fct_trips_broken.sql  -- copy to models/marts/fct_trips.sql (overwrites)
    README.md
    solutions/
      fct_trips.sql
  exercise_4/
    stg_trips.sql         -- copy to models/staging/stg_trips.sql
    fct_trips.sql         -- copy to models/marts/fct_trips.sql
    README.md
    solutions/
      stg_trips.sql
      fct_trips.sql
```

## How to run

These are dbt model, macro, and test files. Copy each file to the path shown in the exercise README, then run the dbt command shown in the table above. You need your Week 10 dbt project connected to the shared Azure PostgreSQL and `PG_PASSWORD` set in your environment.

No `requirements.txt` is needed here: your dbt project already has `dbt-core` and `dbt-postgres` installed from Chapter 2.

## Reference solutions and spoiler discipline

Each `exercise_N/solutions/` folder holds the answer with `-- WHY` comments explaining the non-obvious choices. Time-box yourself to 15–20 minutes on each exercise before peeking. When you do open a solution, read the WHY notes: the reasoning is the teaching content.
