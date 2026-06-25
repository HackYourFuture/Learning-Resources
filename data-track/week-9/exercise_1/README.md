# Exercise 1: Join trips to zone names

## What you do

Each trip stores a pickup location as a number, not a name. You join `nyc_taxi.raw_trips` to `nyc_taxi.raw_zones` on the location ID so you can read the human-readable pickup zone name alongside the pickup datetime, trip distance, and fare amount for the first 5 trips.

## How to run

Open `exercise.sql` and run it against your own schema on the shared Azure PostgreSQL, using psql or any SQL client. This query only reads data, it does not modify anything.

## Success criteria

The first 5 trips show a readable pickup zone name next to each row's datetime, distance, and fare.

Stuck? The reference query is in `solutions/exercise.sql`, try for 10 to 20 minutes first.
