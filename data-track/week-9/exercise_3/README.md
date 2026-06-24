# Exercise 3: Find the busiest day with a CTE

## What you do

You build a CTE (a `WITH` block) that counts trips per calendar day, then query that named result to find the single date with the most pickups. The CTE splits the work into two readable steps: first compute the daily counts, then pick the top one.

## How to run

Open `exercise.sql` and run it against your own schema on the shared Azure PostgreSQL, using psql or any SQL client. This query only reads data, it does not modify anything.

## Success criteria

The query returns exactly one row: the calendar date with the highest pickup count, along with that count.

Stuck? The reference query is in `solutions/exercise.sql`, try for 10 to 20 minutes first.
