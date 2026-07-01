-- Exercise 1a solution: safe_divide macro

{% macro safe_divide(numerator, denominator) %}
    {{ numerator }} / NULLIF({{ denominator }}, 0)
    -- WHY NULLIF: NULLIF(x, 0) returns NULL when x is 0, and x otherwise.
    -- PostgreSQL propagates NULL through division automatically, so the whole
    -- expression becomes NULL instead of raising a division-by-zero error.
    -- This is the standard dbt pattern for any ratio column that could have a
    -- zero denominator (tip_pct when fare_amount=0, fare_per_mile when trip_distance=0).
{% endmacro %}
