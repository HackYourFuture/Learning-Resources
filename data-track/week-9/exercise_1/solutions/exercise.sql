-- Exercise 1 solution: Join trips to zone names

SELECT
    t.pickup_datetime,
    t.trip_distance,
    t.fare_amount,
    z.zone AS pickup_zone   -- WHY alias: the dimension column is named "zone"; renaming to pickup_zone makes the output self-describing
FROM nyc_taxi.raw_trips t
INNER JOIN nyc_taxi.raw_zones z      -- WHY INNER JOIN: every trip we keep must have a matching zone; trips with no match are dropped, which is fine here
    ON t.pickup_location_id = z.location_id  -- WHY this ON: the numeric pickup_location_id in the fact table maps to location_id in the dimension
ORDER BY t.pickup_datetime  -- WHY ORDER BY: without it, LIMIT returns an arbitrary 5 rows that can differ between runs; ordering makes the sample stable and reproducible
LIMIT 5;                    -- WHY LIMIT 5: we only need a small sample to confirm the join reads correctly, not all 57K rows
