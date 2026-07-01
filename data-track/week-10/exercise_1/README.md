# Exercise 1: Macros and computed columns for `stg_trips`

## What you do

The [Materializations chapter](https://github.com/HackYourFuture/datatrack) builds `fct_trips` assuming `stg_trips` already exposes `tip_pct`, `fare_per_mile`, and `payment_type_label`. This exercise adds those three columns so `fct_trips` can use them.

There are two files:

| File | Copy to your project at |
|---|---|
| `safe_divide.sql` | `macros/safe_divide.sql` |
| `stg_trips.sql` | `models/staging/stg_trips.sql` |

## How to run

Copy both files into your Week 10 dbt project, complete the TODOs, then:

```bash
dbt compile --select stg_trips
```

Open `target/compiled/<project>/models/staging/stg_trips.sql` and confirm every `{{ ... }}` block has been replaced with plain SQL.

```bash
dbt run --select stg_trips
```

Spot-check the result against your schema:

```sql
SELECT payment_type, payment_type_label, tip_pct, fare_per_mile
FROM dev_<your_name>.stg_trips
LIMIT 10;
```

## Success criteria

- Every `payment_type` code (1–6) resolves to a readable label.
- `tip_pct` and `fare_per_mile` are non-null for rows with non-zero denominators.
- `dbt compile` exits cleanly with no Jinja errors.

Stuck? The reference implementation is in `solutions/`. Try for 20 minutes first.
