-- Exercise 6 solution: Validate the raw data

-- 6a. Trips with a missing pickup location
SELECT COUNT(*) AS null_pickup_location
FROM nyc_taxi.raw_trips t
WHERE t.pickup_location_id IS NULL;
-- WHY IS NULL (not = NULL): in SQL, NULL is never equal to anything, even NULL.
--   You must test for absence with IS NULL, not with = NULL, or the filter matches nothing.


-- 6b. Duplicate trips (same vendor + pickup + dropoff time)
SELECT
    t.vendor_id,
    t.pickup_datetime,
    t.dropoff_datetime,
    COUNT(*) AS copies
FROM nyc_taxi.raw_trips t
GROUP BY t.vendor_id, t.pickup_datetime, t.dropoff_datetime
HAVING COUNT(*) > 1            -- WHY HAVING (not WHERE): WHERE filters individual rows before grouping; HAVING filters the GROUPS after aggregation. COUNT(*) only exists per group, so it must be tested in HAVING.
ORDER BY copies DESC;


-- 6c. Orphaned pickup IDs not present in nyc_taxi.raw_zones
SELECT DISTINCT t.pickup_location_id
FROM nyc_taxi.raw_trips t
LEFT JOIN nyc_taxi.raw_zones z          -- WHY LEFT JOIN: keeps every trip even when no zone matches; an INNER JOIN would silently drop the unmatched (orphan) rows we are hunting for
    ON t.pickup_location_id = z.location_id
WHERE z.location_id IS NULL    -- WHY IS NULL here: after a LEFT JOIN, an unmatched trip has NULL zone columns; filtering on z.location_id IS NULL isolates exactly the orphans
ORDER BY t.pickup_location_id;

-- Any rows returned for 6b or 6c are the problems to report.
