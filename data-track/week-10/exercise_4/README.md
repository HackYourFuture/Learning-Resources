# Exercise 4: Propagate a column change

## What you do

Adding a column to a staging model is one of the most common dbt changes in a real job. The column does not automatically appear in downstream marts: you must add it there too, and rebuild with the `+` prefix so dbt rebuilds the full chain. This exercise walks you through that cycle end to end.

| File | Copy to your project at |
|---|---|
| `stg_trips.sql` | `models/staging/stg_trips.sql` |
| `fct_trips.sql` | `models/marts/fct_trips.sql` |

## How to run

1. Copy both files. Complete the TODO in `stg_trips.sql` first:

   ```bash
   dbt run --select stg_trips
   ```

   Verify the column exists in staging:

   ```sql
   SELECT trip_duration_minutes FROM dev_<your_name>.stg_trips LIMIT 3;
   ```

2. Before editing `fct_trips.sql`, try querying the mart:

   ```sql
   SELECT trip_duration_minutes FROM dev_<your_name>.fct_trips LIMIT 3;
   ```

   This should error. Write down why.

3. Complete the TODO in `fct_trips.sql`, then rebuild both layers:

   ```bash
   dbt run --select +fct_trips
   ```

4. Re-run the mart query from step 2. It now returns rows.

## Success criteria

- `trip_duration_minutes` appears in both `stg_trips` and `fct_trips`.
- You can state why the mart query in step 2 errored even though staging had the column.
- You can state what the `+` prefix in `--select +fct_trips` does that plain `--select fct_trips` would not.

Stuck? The reference implementation is in `solutions/`. Try for 20 minutes first.
