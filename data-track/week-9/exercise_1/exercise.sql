-- Exercise 1: Join trips to zone names
--
-- Each trip stores a pickup location as a number like 43, not a name.
-- Join nyc_taxi.raw_trips to nyc_taxi.raw_zones so you can read the pickup zone name for each trip.
--
-- Show the pickup datetime, trip distance, fare amount, and the pickup zone
-- name for the first 5 trips.
--
-- Dataset: nyc_taxi.raw_trips (~57K green-taxi rows, Jan 2024) and nyc_taxi.raw_zones (265 rows).
-- Run this against your OWN schema on the shared Azure PostgreSQL, not public.
--
-- Hint: The bridge between the two tables is t.pickup_location_id = z.location_id.
--       Use an INNER JOIN. Add ORDER BY t.pickup_datetime before LIMIT 5 so the
--       five rows are the same every run (a bare LIMIT returns an arbitrary
--       sample that can change between runs).

-- Starter query: exploring raw_trips columns
SELECT pickup_datetime, trip_distance, fare_amount, pickup_location_id
FROM nyc_taxi.raw_trips
ORDER BY pickup_datetime
LIMIT 5;

-- TODO: rewrite the query above to join nyc_taxi.raw_trips to nyc_taxi.raw_zones on pickup_location_id = location_id and select the zone name instead of the ID.
