# Exercise 1 Solution

## Minimum SQL

```sql
SELECT pickup_borough,
       COUNT(*) AS trip_count
FROM dev_yourname.fct_trips
GROUP BY pickup_borough
ORDER BY trip_count DESC
```

## Stretch SQL (average fare, excluding zero fares)

```sql
SELECT pickup_borough,
       AVG(fare_amount) AS avg_fare
FROM dev_yourname.fct_trips
WHERE fare_amount > 0
GROUP BY pickup_borough
ORDER BY avg_fare DESC
```

Both queries should be saved as SQL Questions in your Personal Collection before proceeding to Exercise 2.
