# Exercise 5 (stretch): Compare a cartesian join to a filtered join

## What you do

A forgotten join condition produces a cartesian product: every trip paired with every zone. You use `EXPLAIN` to see how the query planner treats two versions differently, the cartesian `CROSS JOIN` with no `ON` clause, and the filtered `INNER JOIN` on `pickup_location_id = location_id`, without actually running the expensive one. Then you compare the estimated row counts at the top node of each plan.

## How to run

Open `exercise.sql` and run both `EXPLAIN` queries against your own schema on the shared Azure PostgreSQL, using psql or any SQL client. `EXPLAIN` only prints the plan, it does not execute the query or modify any data.

## Success criteria

The cartesian plan estimates roughly 57,000 times 265 rows (around 15 million) at its top node, while the filtered plan estimates about one matched zone per trip. That gap is why a forgotten `ON` clause can hang your session.

Stuck? The reference queries are in `solutions/exercise.sql`, try for 10 to 20 minutes first.
