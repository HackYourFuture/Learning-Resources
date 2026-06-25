-- Exercise 7 (stretch): Compare a cartesian join to a filtered join
--
-- A missing join condition produces a cartesian product: every trip matched to
-- every zone. Use EXPLAIN to see how the planner treats the two queries
-- differently, without actually running the expensive one.
--
-- Run EXPLAIN on both versions and compare the estimated row counts at the top node.
--
-- Dataset: nyc_taxi.raw_trips (~57K green-taxi rows, Jan 2024) and nyc_taxi.raw_zones (265 rows).
-- Run these against your OWN schema on the shared Azure PostgreSQL, not public.
--
-- Hint: EXPLAIN shows the plan and its cost estimate without executing the query.
--       The cartesian version has no ON clause; the filtered version joins on
--       pickup_location_id = location_id. Compare the rows= estimate on the top
--       line of each plan.

-- Cartesian product: no join condition
-- TODO: EXPLAIN a CROSS JOIN of nyc_taxi.raw_trips and nyc_taxi.raw_zones (no ON clause).


-- Filtered join: one zone per trip
-- TODO: EXPLAIN an INNER JOIN of nyc_taxi.raw_trips and nyc_taxi.raw_zones on pickup_location_id = location_id.
