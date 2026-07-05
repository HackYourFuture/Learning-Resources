-- Exercise 4 solution: stg_trips with trip_duration_minutes

SELECT
    pickup_datetime,
    dropoff_datetime,
    pickup_location_id,
    dropoff_location_id,
    trip_distance,
    fare_amount,
    tip_amount,
    payment_type,
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

    extract(epoch from (dropoff_datetime - pickup_datetime)) / 60
                                                        AS trip_duration_minutes
    -- WHY epoch: PostgreSQL's interval arithmetic returns an INTERVAL type;
    -- extract(epoch from ...) converts it to seconds as a float. Dividing by 60
    -- gives minutes. This avoids the DATEDIFF function that SQL Server / BigQuery
    -- users might reach for — it does not exist in standard PostgreSQL.

FROM {{ source('nyc_taxi', 'raw_trips') }}
WHERE pickup_location_id IS NOT NULL
  AND fare_amount >= 0
