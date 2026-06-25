# Exercise 2: Trips and average fare per borough

## What you do

You aggregate the trips up to the borough level. After joining `nyc_taxi.raw_trips` to `nyc_taxi.raw_zones` to get the borough name, you count the trips and compute the average fare per pickup borough, then order the result so the busiest borough sits on top.

## How to run

Open `exercise.sql` and run it against your own schema on the shared Azure PostgreSQL, using psql or any SQL client. This query only reads data, it does not modify anything.

## Success criteria

Each borough shows a trip count and an average fare. The borough with the most trips appears first: Manhattan dominates the pickup counts for this dataset.

Stuck? The reference query is in `solutions/exercise.sql`, try for 10 to 20 minutes first.
