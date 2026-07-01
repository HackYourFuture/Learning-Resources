-- Exercise 1a: safe_divide macro
--
-- Create this file at macros/safe_divide.sql in your Week 10 dbt project.
--
-- A macro is a reusable Jinja function. This one wraps a division so it returns
-- NULL instead of a database error when the denominator is 0 or NULL.
--
-- Signature: safe_divide(numerator, denominator) -> SQL expression
-- Returns:   numerator / denominator, or NULL when denominator is 0 or NULL.
--
-- Used by stg_trips.sql for tip_pct and fare_per_mile.

{% macro safe_divide(numerator, denominator) %}
    -- TODO: write the macro body. It should:
    --   1. Wrap denominator in NULLIF(denominator, 0) so a zero denominator becomes NULL.
    --   2. Divide numerator by that result. PostgreSQL propagates NULL automatically.
    --   3. Return only the SQL expression — no semicolon, no SELECT.
    --
    -- Expected compiled output for safe_divide('tip_amount', 'fare_amount'):
    --   tip_amount / NULLIF(fare_amount, 0)
{% endmacro %}
