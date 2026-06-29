-- Exercise 2: Trips and average fare per borough
--
-- Aggregate trips up to the borough level. For each pickup borough, count the
-- trips and compute the average fare.
--
-- Question to answer: which borough has the most trips?
--
-- Dataset: nyc_taxi.raw_trips (~57K green-taxi rows, Jan 2024) and nyc_taxi.raw_zones (265 rows).
-- Run this against your OWN schema on the shared Azure PostgreSQL, not public.
--
-- Hint: Join to nyc_taxi.raw_zones to get borough, then GROUP BY z.borough. Every
--       non-aggregated column in the SELECT must appear in the GROUP BY.

-- Starter query: counting raw trips by location ID (no join)
SELECT t.pickup_location_id, COUNT(*) AS trips, AVG(t.fare_amount) AS avg_fare
FROM nyc_taxi.raw_trips t
GROUP BY t.pickup_location_id
ORDER BY trips DESC
LIMIT 5;

-- TODO: rewrite the query above to join to nyc_taxi.raw_zones, group by the borough name, and order by total trips descending.
