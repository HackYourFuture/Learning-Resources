-- Exercise 8: Detect and fix join fan-out

-- This CTE simulates a zone table with a duplicate row for location_id 43 (Central Park)
WITH duplicate_zones AS (
    SELECT location_id, zone, borough FROM nyc_taxi.raw_zones
    UNION ALL
    SELECT 43 AS location_id, 'Central Park (Duplicate)' AS zone, 'Manhattan' AS borough
),

-- Fanned-out query: notice how the sum is 726,929.98 (inflated from the correct 723,284.18)
fanned_out_sum AS (
    SELECT ROUND(SUM(t.fare_amount)::numeric, 2) AS total_fare
    FROM nyc_taxi.raw_trips t
    JOIN duplicate_zones z ON t.pickup_location_id = z.location_id
)
SELECT * FROM fanned_out_sum;


-- TASK 8a: Write a query to check duplicate_zones for duplicate location_ids.
-- It should return location_id 43 and show a count of 2.
WITH duplicate_zones AS (
    SELECT location_id, zone, borough FROM nyc_taxi.raw_zones
    UNION ALL
    SELECT 43 AS location_id, 'Central Park (Duplicate)' AS zone, 'Manhattan' AS borough
)
-- TODO: Group by location_id and find the duplicates
SELECT 1;


-- TASK 8b: Write a query that deduplicates duplicate_zones FIRST (e.g. using DISTINCT/GROUP BY in a CTE),
-- joins it to raw_trips, and returns the correct sum (723,284.18).
WITH duplicate_zones AS (
    SELECT location_id, zone, borough FROM nyc_taxi.raw_zones
    UNION ALL
    SELECT 43 AS location_id, 'Central Park (Duplicate)' AS zone, 'Manhattan' AS borough
)
-- TODO: Deduplicate duplicate_zones and calculate the correct SUM(fare_amount)
SELECT 1;
