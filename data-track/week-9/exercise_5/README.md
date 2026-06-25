# Exercise 5: Validate the raw data

## What you do

You write three data-quality checks that the Week 9 assignment's audit task expects, each as its own query:

- 5a: count trips with a NULL `pickup_location_id`.
- 5b: find duplicate trips, rows that share the same `vendor_id`, `pickup_datetime`, and `dropoff_datetime`.
- 5c: find orphaned pickup IDs, `pickup_location_id` values that do not exist in `nyc_taxi.raw_zones`.

## How to run

Open `exercise.sql` and run each of the three queries against your own schema on the shared Azure PostgreSQL, using psql or any SQL client. These queries only read data, they do not modify anything.

## Success criteria

Each check returns a clear answer. For 5a you get a single count. For 5b and 5c, an empty result means the check passed: any rows returned are the problems to report.

Stuck? The reference queries are in `solutions/exercise.sql`, try for 10 to 20 minutes first.
