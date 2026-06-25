-- Exercise 3 solution: Find the busiest day with a CTE

WITH daily_trips AS (          -- WHY a CTE: it names the intermediate "trips per day" result so the final query reads cleanly instead of nesting a subquery
    SELECT
        t.pickup_datetime::date AS trip_date,  -- WHY ::date: casts the timestamp to a date, dropping the time so all rides on the same calendar day group together
        COUNT(*) AS trips
    FROM nyc_taxi.raw_trips t
    GROUP BY t.pickup_datetime::date
)
SELECT
    trip_date,
    trips
FROM daily_trips
ORDER BY trips DESC            -- WHY ORDER BY DESC: sorts the busiest day to the top
LIMIT 1;                       -- WHY LIMIT 1: we want only the single busiest day, not the full ranking
