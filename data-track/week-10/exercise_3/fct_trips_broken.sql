-- Exercise 3: Debug a broken ref()
--
-- This is a version of models/marts/fct_trips.sql with a deliberate typo.
-- Copy it to models/marts/fct_trips.sql in your project (it overwrites your working version).
--
-- Step 1: Run `dbt compile --select fct_trips` and read the error carefully.
--         Note which node dbt names and which file the error points at.
--
-- Step 2: Find the typo in this file and fix it.
--
-- Step 3: Run `dbt compile --select fct_trips` again to confirm it compiles cleanly.
--
-- Do NOT look at the solution until you have identified the typo yourself.
-- The error message tells you exactly where to look.

WITH trips AS (
    SELECT *
    FROM {{ ref('stg_trps') }}
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
FROM trips t
LEFT JOIN zones z
    ON t.pickup_location_id = z.location_id
