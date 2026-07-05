# Exercise 5: Add the four generic tests

## What you do

Generic tests (`not_null`, `unique`, `accepted_values`, `relationships`) are the highest-frequency test type in real dbt projects, and the one an interviewer is most likely to ask you to write on the spot. Here you attach all four yourself, then read a *real* failure that is not a bug in your code but a fact about the source data.

You edit two schema YAML files:

| File | Copy to your project at |
|---|---|
| `_stg_zones.yml` | `models/staging/_stg_zones.yml` |
| `_stg_trips.yml` | `models/staging/_stg_trips.yml` |

If you already created these files in the dbt Tests hands-on, merge the tests below into them instead of overwriting.

## How to run

1. In `_stg_zones.yml`, add `unique` and `not_null` on `location_id`. It is the zone dimension's primary key and the target of the `relationships` test, so it must be a clean key first.
2. In `_stg_trips.yml`, add:
   - `not_null` on `pickup_location_id` (the join key into `stg_zones`).
   - `not_null` on `fare_amount`.
   - `accepted_values` on `payment_type` with `values: [1, 2, 3, 4, 5, 6]` (the six TLC codes).
3. Add the test that crosses models: a `relationships` test on `stg_trips.pickup_location_id` asserting every value exists as a `location_id` in `stg_zones`.
4. Run the staging tests:

   ```bash
   dbt test --select stg_trips stg_zones
   ```

   The `relationships` test **fails**: some trips carry a `pickup_location_id` with no matching row in `raw_zones`, the same unmatched trips that show a `NULL` `pickup_borough` in `fct_trips`. This is not a code bug, it is a real gap in the source data.
5. Inspect the failing rows. Open the compiled test under `target/compiled/nyc_taxi/models/staging/` and run it in `psql` to see how many trips and which location IDs are unmatched.
6. Decide what to do. Set `severity: warn` on the `relationships` test (you accept the gap but want a visible warning, not a blocked pipeline), re-run, and confirm the test now reports `WARN` instead of `ERROR`.

## Success criteria

- You can state in one sentence what each of the four generic tests checks.
- You can explain why the `relationships` test failed on real data, and why `warn` (not `error`) is a reasonable severity for a known source-data gap.

Stuck? The reference implementation is in `solutions/`. Try for 15 minutes first, then read the `WHY` comments there rather than copying the code.
