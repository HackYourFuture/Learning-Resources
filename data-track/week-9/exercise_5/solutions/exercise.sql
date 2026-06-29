-- Exercise 5 solution (stretch): Compare a cartesian join to a filtered join

-- Cartesian product: no join condition, ~57K trips x 265 zones
EXPLAIN                        -- WHY EXPLAIN (not EXPLAIN ANALYZE): EXPLAIN only estimates and prints the plan; it never runs the query, so the ~15M-row cartesian product never actually materializes and cannot hang your session
SELECT *
FROM nyc_taxi.raw_trips t
CROSS JOIN nyc_taxi.raw_zones z;        -- WHY CROSS JOIN: with no ON clause the planner has no way to pair rows, so it produces every trip x every zone combination


-- Filtered join: one zone per trip
EXPLAIN
SELECT *
FROM nyc_taxi.raw_trips t
INNER JOIN nyc_taxi.raw_zones z
    ON t.pickup_location_id = z.location_id;  -- WHY the ON clause matters: it tells the planner each trip matches exactly one zone, so the estimate collapses from millions to roughly the trip count

-- WHY this comparison teaches: the cartesian plan estimates roughly 57,000 x 265 (around 15 million),
--   while the filtered plan estimates about one matched zone per trip. That gap is why a forgotten ON clause can hang your session.
