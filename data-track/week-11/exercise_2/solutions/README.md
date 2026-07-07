# Exercise 2 Solution

## Key steps

1. Create dashboard via New → Dashboard.
2. Add Questions via the + button in edit mode.
3. Add filter: Edit → Filters → Date → Date Range.
4. Map filter: click the filter gear icon on each Question card → select the date column (`pickup_datetime`).
5. Done → test.

## Common issue: filter has no effect

If the filter does not change the results, the most likely cause is that you forgot to map the filter to the Question's date column. Each Question has its own mapping, adding the filter to the dashboard is not enough.

Check: enter edit mode → click the filter label → confirm both Question cards show the mapped column.
