-- Exercise 2 solution: singular test for negative fare amounts

SELECT *
FROM {{ ref('stg_trips') }}
WHERE fare_amount < 0
-- WHY singular test (not a generic YAML test): the check involves the column's actual
-- value, not just presence or allowed set. A generic `not_null` only checks for NULL,
-- and `accepted_values` requires listing every valid value. A singular test can express
-- any SQL predicate, including numeric ranges or cross-column rules.
--
-- WHY this test is expected to PASS on the filtered stg_trips:
-- stg_trips already applies WHERE fare_amount >= 0, so no negative rows survive into
-- the model. The test passes because the staging filter removed the bad data upstream.
-- If the filter were ever accidentally removed, this test would catch the regression.
