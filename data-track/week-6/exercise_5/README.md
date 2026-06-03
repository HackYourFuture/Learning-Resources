# Exercise 5: Cost Estimation Challenge

Estimate the monthly cost of three Azure configurations and quantify the saving from stopping the shared Postgres server outside class hours. Pure Python arithmetic: no Azure access required.

## Setup

No extra dependencies. The starter uses only the standard library.

## Task

The constants at the top of `exercise.py` are illustrative West Europe EUR prices from the [Azure pricing calculator](https://azure.microsoft.com/en-us/pricing/calculator/). Use them as-is so the self-check numbers reproduce.

1. Implement `postgres_compute_cost(hours_running)` (TODO 1).
2. Implement `postgres_storage_cost()` (TODO 2).
3. Implement `container_job_cost(executions_per_day, seconds_per_execution)` (TODO 3). Use vCPU-seconds and GiB-seconds across a 30-day month.
4. Implement `class_postgres_saving(class_hours_per_day, class_days_per_week)` (TODO 4). Convert "8 hours/day, 5 days/week" into total monthly hours, then compare against always-on (730 h/month).
5. Run `python3 exercise.py`. Confirm the four scenarios print numbers close to the `# Expected output:` block at the bottom of the file.

## Success criteria

- All four functions return values without raising.
- Scenario A (24/7 Postgres) totals about EUR 19.74/month.
- Scenario B (stopped 16h/day) totals about EUR 8.96/month.
- Scenario C (Container Job 5×/day for 60s) totals about EUR 0.19/month.
- Scenario D shows a saving of about EUR 12/month from class-only operation.

## Stretch

- The numbers shift if you switch from West Europe to North Europe (cheaper compute, similar storage). Look up the actual North Europe figures and run a "should we move regions?" comparison.
- Add a fifth scenario: what if the class shared one Postgres across two cohorts (still 8h/day but 10 days/week)? Use `class_postgres_saving()` with new parameters.
- Compare the Container Job to a Container App revision running 24/7 with min-replicas=1. What is the break-even number of executions per day?

## After this exercise

Write a 3 to 4 sentence paragraph (paper, README, or a quiz answer) describing how you would structure costs in a real project. Reference at least one specific number from your scenarios. This is the explanation step from the practice chapter.
