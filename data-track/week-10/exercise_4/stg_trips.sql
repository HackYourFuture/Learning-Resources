-- Exercise 4: Propagate a column change — stg_trips
--
-- Copy this to models/staging/stg_trips.sql (it builds on your Exercise 1 solution).
-- Your task is to add trip_duration_minutes as a new derived column.
--
-- This is the version from Exercise 1, with one TODO added.

SELECT
    -- identifiers
    vendorid,
    lpep_pickup_datetime                                AS pickup_datetime,
    lpep_dropoff_datetime                               AS dropoff_datetime,

    -- location keys
    pulocationid                                        AS pickup_location_id,
    dolocationid                                        AS dropoff_location_id,

    -- trip facts
    trip_distance,
    fare_amount,
    tip_amount,
    payment_type,

    -- computed columns from Exercise 1
    {{ safe_divide('tip_amount', 'fare_amount') }}      AS tip_pct,
    {{ safe_divide('fare_amount', 'trip_distance') }}   AS fare_per_mile,

    CASE payment_type
        {% for code, label in [
            (1, 'Credit card'),
            (2, 'Cash'),
            (3, 'No charge'),
            (4, 'Dispute'),
            (5, 'Unknown'),
            (6, 'Voided trip')
        ] %}
        WHEN {{ code }} THEN '{{ label }}'
        {% endfor %}
        ELSE 'Other'
    END                                                 AS payment_type_label,

    -- TODO: add trip_duration_minutes
    --   Formula: extract(epoch from (dropoff_datetime - pickup_datetime)) / 60
    --   Alias it as trip_duration_minutes.
    --   After adding it here, run: dbt run --select stg_trips
    --   Then try: SELECT trip_duration_minutes FROM dev_<your_name>.stg_trips LIMIT 3;
    --   The column exists in stg_trips. Now try the same query on fct_trips.
    --   It should error. That is the point of this exercise.

FROM {{ source('nyc_taxi', 'raw_trips') }}
WHERE pickup_location_id IS NOT NULL
  AND fare_amount >= 0
