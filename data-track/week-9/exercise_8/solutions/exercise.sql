-- Exercise 8: Detect and fix join fan-out

-- TASK 8a: Write a query to check duplicate_zones for duplicate location_ids.
-- It should return location_id 43 and show a count of 2.
WITH duplicate_zones AS (
    SELECT location_id, zone, borough FROM nyc_taxi.raw_zones
    UNION ALL
    SELECT 43 AS location_id, 'Central Park (Duplicate)' AS zone, 'Manhattan' AS borough
)
SELECT location_id, COUNT(*) AS occurrences
FROM duplicate_zones
GROUP BY location_id
HAVING COUNT(*) > 1;

-- WHY: Grouping by the unique identifier (location_id) and filtering for count > 1 (HAVING COUNT(*) > 1) 
-- is the standard defensive query to detect if a dimension's join key is duplicated before joining.


-- TASK 8b: Write a query that deduplicates duplicate_zones FIRST (e.g. using DISTINCT/GROUP BY in a CTE),
-- joins it to raw_trips, and returns the correct sum (723,284.18).
WITH duplicate_zones AS (
    SELECT location_id, zone, borough FROM nyc_taxi.raw_zones
    UNION ALL
    SELECT 43 AS location_id, 'Central Park (Duplicate)' AS zone, 'Manhattan' AS borough
),

-- Deduplicate by grouping on the key and picking one representative zone/borough string
deduplicated_zones AS (
    SELECT 
        location_id, 
        MAX(zone) AS zone, 
        MAX(borough) AS borough
    FROM duplicate_zones
    GROUP BY location_id
)

SELECT ROUND(SUM(t.fare_amount)::numeric, 2) AS total_fare
FROM nyc_taxi.raw_trips t
JOIN deduplicated_zones z ON t.pickup_location_id = z.location_id;

-- WHY: Staging the deduplication in a CTE (deduplicated_zones) using GROUP BY location_id ensures that
-- each location ID appears exactly once in the join. This prevents the trips table rows from fanning out 
-- and double-counting the SUM(fare_amount).
