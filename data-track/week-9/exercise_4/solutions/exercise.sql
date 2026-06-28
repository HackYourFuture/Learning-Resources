-- Exercise 4 solution: Refactor a nested subquery into CTEs

WITH positive_fares AS (       -- WHY first CTE: names the "filter" step; replaces the innermost subquery so the intent (keep positive fares) is obvious
    SELECT *
    FROM nyc_taxi.raw_trips
    WHERE fare_amount > 0
),
joined AS (                    -- WHY second CTE: names the "join" step; it reads from the first CTE, so the steps chain in plain order
    SELECT
        z.borough,
        t.fare_amount
    FROM positive_fares t
    INNER JOIN nyc_taxi.raw_zones z
        ON t.pickup_location_id = z.location_id
)
SELECT
    borough,
    ROUND(AVG(fare_amount)::numeric, 2) AS avg_fare  -- WHY final SELECT only aggregates: the filtering and joining are already done, so this step does one thing
FROM joined
GROUP BY borough
ORDER BY avg_fare DESC;

-- WHY this is better: same result as the nested version, but now each step reads top to bottom: filter, join, aggregate.
