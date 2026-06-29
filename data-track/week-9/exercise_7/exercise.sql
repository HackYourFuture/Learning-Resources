-- Exercise 7: Build views, then query them
--
-- Wrap the cleaned-up logic in two views, then query them. This is exactly the
-- star-schema deliverable the assignment asks for, scaled down to practice once.
--   7a. Create vw_dim_zones from nyc_taxi.raw_zones and vw_fact_trips from nyc_taxi.raw_trips,
--       excluding rows where fare_amount is negative.
--   7b. Using your views, find which borough had the highest total fare revenue.
--   7c. Using your views, find the top 5 pickup zones by trip count.
--
-- Dataset: nyc_taxi.raw_trips (~57K green-taxi rows, Jan 2024) and nyc_taxi.raw_zones (265 rows).
-- Run these against your OWN schema on the shared Azure PostgreSQL, not public.
-- NOTE: 7a creates views in YOUR OWN schema. CREATE OR REPLACE VIEW is safe to re-run.
-- NOTE: this practice view is scaled down. The Week 9 assignment's vw_fact_trips
--       also casts pickup_datetime to a TIMESTAMP (pickup_datetime::TIMESTAMP).
--       Add that cast when you build the assignment version.
--
-- Hint: A view is a saved query: CREATE VIEW name AS SELECT ... The borough and
--       zone names live in vw_dim_zones, so join
--       vw_fact_trips.pickup_location_id = vw_dim_zones.location_id for any
--       name-level breakdown.

-- 7a. The two views
-- TODO: CREATE OR REPLACE VIEW vw_dim_zones from nyc_taxi.raw_zones.
-- TODO: CREATE OR REPLACE VIEW vw_fact_trips from nyc_taxi.raw_trips, excluding negative fares.
-- Starter skeletons:
CREATE OR REPLACE VIEW vw_dim_zones AS
SELECT 1; -- replace with columns from raw_zones

CREATE OR REPLACE VIEW vw_fact_trips AS
SELECT 1; -- replace with columns from raw_trips and filter negative fares


-- 7b. Highest total fare revenue by borough
-- TODO: join the two views, sum fare per borough, and return the top borough.
-- Starter skeleton:
SELECT d.borough, SUM(f.fare_amount) AS total_revenue
FROM vw_fact_trips f
INNER JOIN vw_dim_zones d ON f.pickup_location_id = d.location_id
GROUP BY 1
LIMIT 1; -- replace with correct ORDER BY and final touches


-- 7c. Top 5 pickup zones by trip count
-- TODO: join the two views, count trips per zone, and return the top 5 zones.
-- Starter skeleton:
SELECT d.zone, COUNT(*) AS trips
FROM vw_fact_trips f
INNER JOIN vw_dim_zones d ON f.pickup_location_id = d.location_id
GROUP BY 1
LIMIT 5; -- replace with correct ORDER BY and final touches

