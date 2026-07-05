-- Exercise 1b solution: stg_trips with computed columns

SELECT
    -- identifiers
    pickup_datetime,
    dropoff_datetime,

    -- location keys
    pickup_location_id,
    dropoff_location_id,

    -- trip facts
    trip_distance,
    fare_amount,
    tip_amount,
    payment_type,

    -- computed: tip as a fraction of fare
    {{ safe_divide('tip_amount', 'fare_amount') }}      AS tip_pct,
    -- WHY safe_divide: fare_amount can be 0 (voided or no-charge trips in the TLC data).
    -- Without NULLIF the database raises a division-by-zero error on those rows.

    -- computed: fare per mile of travel
    {{ safe_divide('fare_amount', 'trip_distance') }}   AS fare_per_mile,
    -- WHY safe_divide: trip_distance is 0 on some short trips recorded as
    -- metered-time-only (airport flat-rate, etc.). Same NULLIF guard needed.

    -- computed: human-readable payment label from TLC integer code
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
    END                                                 AS payment_type_label
    -- WHY Jinja loop: the six codes and labels live in one place in the template;
    -- adding or removing a code is a one-line change rather than editing six WHEN branches.

FROM {{ source('nyc_taxi', 'raw_trips') }}
WHERE pickup_location_id IS NOT NULL
  AND fare_amount >= 0
