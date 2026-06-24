# Exercise 4: Refactor a nested subquery into CTEs

## What you do

You take a working but hard-to-read query built from nested subqueries and rewrite it using CTEs, so each step has a name and the logic reads top to bottom: filter positive fares, join to zones, then aggregate. The starter file holds the messy original verbatim, your job is to produce an equivalent query that is easier to read.

## How to run

Open `exercise.sql` and run it against your own schema on the shared Azure PostgreSQL, using psql or any SQL client. This query only reads data, it does not modify anything.

## Success criteria

Your refactored query returns the same result as the original: the average fare per borough for trips with a positive fare only, ordered by average fare descending. The difference is readability, not output.

Stuck? The reference query is in `solutions/exercise.sql`, try for 10 to 20 minutes first.
