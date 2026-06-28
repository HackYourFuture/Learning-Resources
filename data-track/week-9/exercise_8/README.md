# Exercise 8: Detect and fix join fan-out

## What you do

When joining two tables at mismatched grains, if the dimension table contains duplicate keys, the matching fact rows get duplicated in the output. This is the **fan-out trap**: a metric like `SUM(fare_amount)` will count the duplicated rows multiple times, inflating the total.

In this exercise, you are given a CTE called `duplicate_zones` which simulates a zones dimension table that has a duplicate row for location ID `43` (Central Park).

You write two queries:
- **8a**: Write a verification query to find which `location_id` values are duplicated in the `duplicate_zones` CTE (group by the ID and filter for counts greater than 1).
- **8b**: Write a query to deduplicate the `duplicate_zones` CTE, join it to `nyc_taxi.raw_trips`, and compute the correct `SUM(fare_amount)`. The output must match the original sum from the clean `nyc_taxi.raw_zones` table.

## How to run

Open `exercise.sql` and write your queries against your schema on the shared Azure PostgreSQL.

## Success criteria

- For **8a**, your check returns location ID **`43`** as the duplicate.
- For **8b**, the fanned-out join originally results in a sum of **`997,421.12`** (inflated from the correct value of **`957,367.44`**). Your deduplicated join must return the correct sum: **`957,367.44`**.

Stuck? The reference queries are in `solutions/exercise.sql`, try for 10 to 20 minutes first.
