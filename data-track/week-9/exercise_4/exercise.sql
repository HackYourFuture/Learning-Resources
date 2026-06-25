-- Exercise 4: Refactor a nested subquery into CTEs
--
-- The query below works, but the nested subqueries make it hard to read.
-- Rewrite it using CTEs so each step is named and readable. The result must
-- stay identical: the average fare per borough, for trips with a positive fare only.
--
-- Dataset: nyc_taxi.raw_trips (~57K green-taxi rows, Jan 2024) and nyc_taxi.raw_zones (265 rows).
-- Run this against your OWN schema on the shared Azure PostgreSQL, not public.
--
-- Hint: Pull each subquery out into its own named step: one CTE to filter
--       positive fares, one to join to zones, then a final SELECT that aggregates.

-- The messy original query to refactor:
SELECT
    borough,
    ROUND(AVG(fare_amount), 2) AS avg_fare
FROM (
    SELECT
        z.borough,
        t.fare_amount
    FROM (
        SELECT *
        FROM nyc_taxi.raw_trips
        WHERE fare_amount > 0
    ) t
    INNER JOIN nyc_taxi.raw_zones z
        ON t.pickup_location_id = z.location_id
) joined
GROUP BY borough
ORDER BY avg_fare DESC;

-- TODO: rewrite the query above using CTEs (one to filter, one to join, then aggregate).
