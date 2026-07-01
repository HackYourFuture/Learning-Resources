-- Exercise 3 solution: fct_trips with corrected ref()

WITH trips AS (
    SELECT *
    FROM {{ ref('stg_trips') }}  -- WHY compile-time error: dbt resolves {{ ref() }} before sending
                                  -- any SQL to the database. If 'stg_trps' does not match any
                                  -- model name, dbt raises "Relation not found" at parse/compile
                                  -- time. A plain CREATE VIEW would compile fine and fail only
                                  -- when someone queries it (a runtime error, not a build-time one).
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
