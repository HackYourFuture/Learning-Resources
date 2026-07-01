-- Exercise 4 solution: fct_trips with trip_duration_minutes propagated

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
    t.trip_distance,
    t.trip_duration_minutes
    -- WHY this must also change: fct_trips uses SELECT <explicit columns>, not SELECT *.
    -- A new column in stg_trips is not visible to fct_trips until you add it here
    -- and rebuild the mart. This is intentional: explicit column lists protect the mart
    -- from accidental schema changes in upstream models.
    --
    -- WHY +fct_trips: plain --select fct_trips rebuilds only the mart view.
    -- It reads from the existing stg_trips in the database, which is the OLD version
    -- without trip_duration_minutes. The + prefix tells dbt to rebuild all upstream
    -- dependencies first (stg_trips, stg_zones) before rebuilding fct_trips.
FROM trips t
LEFT JOIN zones z
    ON t.pickup_location_id = z.location_id
