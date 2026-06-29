-- Exercise 6: Validate the raw data
--
-- Raw data is rarely clean. Write three checks that the assignment's audit task
-- expects you to run:
--   6a. Count trips with a NULL pickup_location_id.
--   6b. Find duplicate trips: rows that share the same vendor_id, pickup_datetime,
--       and dropoff_datetime.
--   6c. Find orphaned pickup IDs: pickup_location_id values in nyc_taxi.raw_trips that do
--       not exist in nyc_taxi.raw_zones.
--
-- Dataset: nyc_taxi.raw_trips (~57K green-taxi rows, Jan 2024) and nyc_taxi.raw_zones (265 rows).
-- Run these against your OWN schema on the shared Azure PostgreSQL, not public.
--
-- Hint: For duplicates, GROUP BY the three columns and keep groups with
--       HAVING COUNT(*) > 1. For orphans, a LEFT JOIN to nyc_taxi.raw_zones with
--       WHERE z.location_id IS NULL surfaces the unmatched IDs.

-- 6a. Trips with a missing pickup location
-- TODO: count rows where pickup_location_id IS NULL.
--      Expect 5 here: some pickup IDs are intentionally NULL. The real dirt is
--      duplicates (6b), negative fares, and orphans (6c).
-- Starter skeleton:
SELECT COUNT(*) FROM nyc_taxi.raw_trips WHERE 1=0; -- replace 1=0 with filter


-- 6b. Duplicate trips (same vendor + pickup + dropoff time)
-- TODO: group by the three columns and keep groups with more than one row.
-- Starter skeleton:
SELECT vendor_id, pickup_datetime, dropoff_datetime, COUNT(*)
FROM nyc_taxi.raw_trips
GROUP BY 1, 2, 3
LIMIT 1; -- replace LIMIT with HAVING count filter


-- 6c. Orphaned pickup IDs not present in nyc_taxi.raw_zones
-- TODO: LEFT JOIN nyc_taxi.raw_trips to nyc_taxi.raw_zones and keep rows with no matching zone.
-- Starter skeleton:
SELECT DISTINCT t.pickup_location_id
FROM nyc_taxi.raw_trips t
LEFT JOIN nyc_taxi.raw_zones z ON t.pickup_location_id = z.location_id
LIMIT 1; -- replace LIMIT with WHERE clause to find unmatched zones

