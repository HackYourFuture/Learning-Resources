-- Exercise 2 solution: Trips and average fare per borough

SELECT
    z.borough,
    COUNT(*) AS total_trips,            -- WHY COUNT(*): counts every row in the group, which is one row per trip, so this is the trip count per borough
    ROUND(AVG(t.fare_amount), 2) AS avg_fare  -- WHY ROUND: AVG returns many decimal places; rounding to 2 keeps the fare readable as currency
FROM nyc_taxi.raw_trips t
INNER JOIN nyc_taxi.raw_zones z
    ON t.pickup_location_id = z.location_id
GROUP BY z.borough                      -- WHY GROUP BY borough: every non-aggregated SELECT column must be in GROUP BY; here borough is the grouping key
ORDER BY total_trips DESC;              -- WHY ORDER BY DESC: puts the busiest borough first so the answer (Manhattan) is at the top

-- Manhattan dominates the pickup counts for this dataset.
