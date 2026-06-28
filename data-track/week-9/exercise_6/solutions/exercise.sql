-- Exercise 6 solution: Build views, then query them

-- 6a. The two views
CREATE OR REPLACE VIEW vw_dim_zones AS  -- WHY CREATE OR REPLACE: lets you re-run this script while iterating without first DROPping the view; a plain CREATE VIEW would error if the view already exists
SELECT
    location_id,
    borough,
    zone
FROM nyc_taxi.raw_zones;

CREATE OR REPLACE VIEW vw_fact_trips AS
SELECT *
FROM nyc_taxi.raw_trips
WHERE fare_amount >= 0;       -- WHY filter in the view: the cleaning rule (no negative fares) lives in one place, so every query against the view is automatically clean


-- 6b. Highest total fare revenue by borough
SELECT
    d.borough,
    ROUND(SUM(f.fare_amount)::numeric, 2) AS total_revenue  -- WHY SUM: revenue is the total of all fares in the borough, not an average
FROM vw_fact_trips f
INNER JOIN vw_dim_zones d     -- WHY join to the dim view: borough names live in the dimension, not the fact, so we join to get the breakdown label
    ON f.pickup_location_id = d.location_id
GROUP BY d.borough
ORDER BY total_revenue DESC
LIMIT 1;                      -- WHY LIMIT 1: the question asks for the single highest-revenue borough


-- 6c. Top 5 pickup zones by trip count
SELECT
    d.zone,
    COUNT(*) AS trips
FROM vw_fact_trips f
INNER JOIN vw_dim_zones d
    ON f.pickup_location_id = d.location_id
GROUP BY d.zone
ORDER BY trips DESC
LIMIT 5;                      -- WHY LIMIT 5: the question asks for the top 5 zones by trip count

-- Because these use CREATE OR REPLACE VIEW, you can re-run them safely while you iterate, without dropping the view first.
