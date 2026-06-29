-- Exercise 3: Find the busiest day with a CTE
--
-- Build a CTE that counts trips per calendar day, then query that CTE to find
-- the single busiest day.
--
-- Question to answer: which date had the most pickups?
--
-- Dataset: nyc_taxi.raw_trips (~57K green-taxi rows, Jan 2024) and nyc_taxi.raw_zones (265 rows).
-- Run this against your OWN schema on the shared Azure PostgreSQL, not public.
--
-- Hint: Use pickup_datetime::date to drop the time part. Define the daily counts
--       in a WITH block, then ORDER BY ... DESC LIMIT 1 over the CTE.

-- Starter query: counting trips per day without a CTE
SELECT t.pickup_datetime::date AS trip_date, COUNT(*) AS trips
FROM nyc_taxi.raw_trips t
GROUP BY trip_date
ORDER BY trips DESC
LIMIT 5;

-- TODO: rewrite the query above to use a CTE (WITH block) containing the daily counts, and select the single busiest day from the CTE.
