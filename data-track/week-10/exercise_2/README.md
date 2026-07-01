# Exercise 2: Write a singular test

## What you do

Singular tests are plain `.sql` files that return the bad rows. dbt passes the test when the query returns zero rows. You write one yourself to prove you understand when to use a singular test over a generic YAML test, and experience the `FAIL 182 → PASS` cycle that confirms the test actually catches real data issues.

| File | Copy to your project at |
|---|---|
| `assert_fare_amount_non_negative.sql` | `tests/assert_fare_amount_non_negative.sql` |

## How to run

1. Copy the file to `tests/` and complete the TODO.
2. Temporarily remove the `AND fare_amount >= 0` filter from `stg_trips.sql` and rebuild:

   ```bash
   dbt run --select stg_trips
   dbt test --select test_type:singular
   ```

   The test must report `FAIL 182`. This step proves the test actually catches the problem.

3. Restore `AND fare_amount >= 0` to `stg_trips.sql`, rebuild, and re-run the test. It must now report `PASS`.

## Success criteria

- Test reports `FAIL 182` against unfiltered `stg_trips`, and `PASS` after the filter is restored.
- You can state in one sentence why a singular test is the right tool here rather than a generic `not_null` YAML test.

Stuck? The reference implementation is in `solutions/`. Try for 15 minutes first.
