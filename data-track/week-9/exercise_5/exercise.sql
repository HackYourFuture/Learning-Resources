-- Exercise 5: Validate the raw data
--
-- Raw data is rarely clean. Write three checks that the assignment's audit task
-- expects you to run:
--   5a. Count trips with a NULL pickup_location_id.
--   5b. Find duplicate trips: rows that share the same vendor_id, pickup_datetime,
--       and dropoff_datetime.
--   5c. Find orphaned pickup IDs: pickup_location_id values in nyc_taxi.raw_trips that do
--       not exist in nyc_taxi.raw_zones.
--
-- Dataset: nyc_taxi.raw_trips (~57K green-taxi rows, Jan 2024) and nyc_taxi.raw_zones (265 rows).
-- Run these against your OWN schema on the shared Azure PostgreSQL, not public.
--
-- Hint: For duplicates, GROUP BY the three columns and keep groups with
--       HAVING COUNT(*) > 1. For orphans, a LEFT JOIN to nyc_taxi.raw_zones with
--       WHERE z.location_id IS NULL surfaces the unmatched IDs.

-- 5a. Trips with a missing pickup location
-- TODO: count rows where pickup_location_id IS NULL.


-- 5b. Duplicate trips (same vendor + pickup + dropoff time)
-- TODO: group by the three columns and keep groups with more than one row.


-- 5c. Orphaned pickup IDs not present in nyc_taxi.raw_zones
-- TODO: LEFT JOIN nyc_taxi.raw_trips to nyc_taxi.raw_zones and keep rows with no matching zone.
