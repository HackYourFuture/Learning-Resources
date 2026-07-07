# Exercise 1: Write a Metabase SQL Question

Practice writing a SQL Question in Metabase using your `fct_trips` dbt mart table.

## Prerequisites

- Logged in to HYF Metabase
- Your `dev_<name>.fct_trips` table is visible under Browse data

## Task

1. Log in to Metabase and go to **New → SQL query**.
2. Select the **Azure Postgres (HYF)** database.
3. Write a query that returns trip count by `pickup_borough`, ordered descending:

   ```sql
   SELECT pickup_borough,
          COUNT(*) AS trip_count
   FROM dev_yourname.fct_trips
   GROUP BY pickup_borough
   ORDER BY trip_count DESC
   ```

   Replace `dev_yourname` with your actual schema name (e.g. `dev_jana`).

4. Set the visualisation to **Bar chart**.
5. Save the Question to **Your Personal Collection** with the name "Trip count by borough".

## Success criteria

- The Question runs without error.
- The bar chart shows at least 3 boroughs with non-zero counts.
- The Question is saved (you can see it in your Personal Collection).

## Stretch

Write a second Question: average `fare_amount` by `pickup_borough`, filtered to exclude trips where `fare_amount = 0`. Save it as "Average fare by borough (non-zero)".

## Solution

See `solutions/README.md` for the reference SQL.
