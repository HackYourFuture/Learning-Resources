-- Exercise 4: Propagate a column change — fct_trips
--
-- Copy this to models/marts/fct_trips.sql (overwrites your current working version).
-- It is the same as the Exercise 3 solution — fct_trips does NOT yet include
-- trip_duration_minutes. Your task is to add it.
--
-- After adding trip_duration_minutes to stg_trips.sql (the other file in this exercise),
-- add the column here too, then run:
--
--   dbt run --select +fct_trips
--
-- The + prefix tells dbt to rebuild stg_trips first, then fct_trips.
-- Without +, dbt rebuilds fct_trips only, and the mart still reads the OLD stg_trips view.
--
-- TODO: add t.trip_duration_minutes to the SELECT list below.
--   After adding it here, run: dbt run --select +fct_trips
--   Then verify: SELECT trip_duration_minutes FROM dev_<your_name>.fct_trips LIMIT 3;

WITH trips AS (
    SELECT *
    FROM {{ ref('stg_trips') }}
),

zones AS (
    SELECT *
    FROM {{ ref('stg_zones') }}
)

SELECT
    t.pickup_datetime::date                         AS pickup_date,
    z.borough                                       AS pickup_borough,
    t.fare_amount,
    t.tip_pct,
    t.fare_per_mile,
    t.payment_type_label,
    t.trip_distance
    -- TODO: add t.trip_duration_minutes here (add a comma after trip_distance above)
FROM trips t
LEFT JOIN zones z
    ON t.pickup_location_id = z.location_id
