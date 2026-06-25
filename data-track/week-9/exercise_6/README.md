# Exercise 6: Build views, then query them

## What you do

You wrap the cleaned-up logic in two views, then query them. This is the star-schema deliverable the Week 9 assignment asks for, scaled down to practice it once:

- 6a: create `vw_dim_zones` from `nyc_taxi.raw_zones` and `vw_fact_trips` from `nyc_taxi.raw_trips`, excluding rows where `fare_amount` is negative.
- 6b: using your views, find which borough had the highest total fare revenue.
- 6c: using your views, find the top 5 pickup zones by trip count.

## How to run

Open `exercise.sql` and run it against your own schema on the shared Azure PostgreSQL, using psql or any SQL client. Unlike the other exercises, 6a creates two views in your own schema. It uses `CREATE OR REPLACE VIEW`, so it is safe to re-run while you iterate. Steps 6b and 6c only read from those views.

## Success criteria

After 6a, both views exist in your schema and can be queried. 6b returns the single highest-revenue borough (Manhattan), and 6c returns five pickup zones ranked by trip count.

> This practice view is deliberately scaled down. The assignment's `vw_fact_trips` also casts `pickup_datetime` to a `TIMESTAMP` (`pickup_datetime::TIMESTAMP`). Add that cast when you build the assignment version, or your fact view will not match the deliverable.

Stuck? The reference queries are in `solutions/exercise.sql`, try for 10 to 20 minutes first.
