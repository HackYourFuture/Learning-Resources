-- Exercise 6: Build views, then query them
--
-- Wrap the cleaned-up logic in two views, then query them. This is exactly the
-- star-schema deliverable the assignment asks for, scaled down to practice once.
--   6a. Create vw_dim_zones from nyc_taxi.raw_zones and vw_fact_trips from nyc_taxi.raw_trips,
--       excluding rows where fare_amount is negative.
--   6b. Using your views, find which borough had the highest total fare revenue.
--   6c. Using your views, find the top 5 pickup zones by trip count.
--
-- Dataset: nyc_taxi.raw_trips (~57K green-taxi rows, Jan 2024) and nyc_taxi.raw_zones (265 rows).
-- Run these against your OWN schema on the shared Azure PostgreSQL, not public.
-- NOTE: 6a creates views in YOUR OWN schema. CREATE OR REPLACE VIEW is safe to re-run.
--
-- Hint: A view is a saved query: CREATE VIEW name AS SELECT ... The borough and
--       zone names live in vw_dim_zones, so join
--       vw_fact_trips.pickup_location_id = vw_dim_zones.location_id for any
--       name-level breakdown.

-- 6a. The two views
-- TODO: CREATE OR REPLACE VIEW vw_dim_zones from nyc_taxi.raw_zones.
-- TODO: CREATE OR REPLACE VIEW vw_fact_trips from nyc_taxi.raw_trips, excluding negative fares.


-- 6b. Highest total fare revenue by borough
-- TODO: join the two views, sum fare per borough, and return the top borough.


-- 6c. Top 5 pickup zones by trip count
-- TODO: join the two views, count trips per zone, and return the top 5 zones.
