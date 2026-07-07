# Exercise 2: Build a Metabase Dashboard with a Date Filter

Combine the Questions from Exercise 1 into a dashboard, then add a date filter.

## Prerequisites

- Exercise 1 completed: "Trip count by borough" Question saved in your Personal Collection
- At least one more Question saved (e.g. "Average fare by borough")

## Task

### Part A: Create the dashboard

1. Go to **New → Dashboard**.
2. Name it "NYC Taxi Analytics: [Your Name]".
3. Click **Add a question** and add both Questions from Exercise 1.
4. Arrange the cards side by side using the drag handles.
5. Click **Done** to exit edit mode.

### Part B: Add a date filter

1. Re-enter edit mode (**Edit**).
2. Click **Filters → Date → Date Range**.
3. Open the filter settings for the "Trip count by borough" Question.
4. Map the filter to the `pickup_datetime` column.
5. Repeat for the "Average fare by borough" Question.
6. Click **Done** and test the filter: select a 30-day range and verify both panels update.

## Success criteria

- Dashboard contains at least 2 Questions.
- Date-range filter is connected to at least 2 Questions.
- Filtering to a specific month changes the trip counts shown.

## Stretch

Add a third Question: daily trip volume over time (line chart). Check that the date filter also connects to it.

## Solution

See `solutions/README.md` for step-by-step guidance.
