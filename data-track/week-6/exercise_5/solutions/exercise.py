"""Exercise 5: Cost estimation challenge.

Estimate the monthly cost of three configurations and quantify the saving from
stopping the shared Postgres server outside class hours. Pure arithmetic, no
Azure calls. The numbers below are illustrative West Europe figures (EUR) from
the Azure pricing calculator and Azure documentation circa 2024 to 2025; in the
assignment you re-check them against the live calculator before committing to a
budget.

The point is the *habit*: do the napkin math before you provision, not after.
"""

# Illustrative West Europe prices (EUR). Treat these as the "agreed numbers" for
# this exercise; in real budgeting, run the figures against the Azure pricing
# calculator the same week you provision.
POSTGRES_B1MS_HOURLY_EUR = 0.022       # Standard_B1ms flexible server, compute only
POSTGRES_STORAGE_GB_MONTH_EUR = 0.115  # 32 GB storage tier, included for simplicity
POSTGRES_STORAGE_GB = 32
CONTAINER_JOB_VCPU_SECOND_EUR = 0.000034
CONTAINER_JOB_GIB_SECOND_EUR = 0.0000038
CONTAINER_JOB_VCPU = 0.5
CONTAINER_JOB_GIB = 1.0
HOURS_PER_MONTH = 730  # Azure-standard month length


def postgres_compute_cost(hours_running: float) -> float:
    """Compute cost for `hours_running` of the Postgres server in one month.

    Storage is billed regardless of whether compute is running and is added by
    the caller via postgres_storage_cost().
    """
    # TODO 1: Multiply hourly rate by hours_running.
    return hours_running * POSTGRES_B1MS_HOURLY_EUR
# WHY split compute and storage: stopping an Azure Postgres flexible server pauses
# compute billing but keeps storage billing live. Mixing them into one number
# hides the fact that "stopped server" still costs ~EUR 3.68/month per 32 GB.
# Separating them in code mirrors the line items on the actual Azure bill.


def postgres_storage_cost() -> float:
    """Storage cost is fixed regardless of compute hours."""
    # TODO 2: Return POSTGRES_STORAGE_GB * POSTGRES_STORAGE_GB_MONTH_EUR.
    return POSTGRES_STORAGE_GB * POSTGRES_STORAGE_GB_MONTH_EUR


def container_job_cost(executions_per_day: int, seconds_per_execution: int) -> float:
    """Monthly cost for the Container App Job at the given cadence."""
    # TODO 3: Compute total vCPU-seconds and GiB-seconds across the whole month
    #         (30 days), multiply each by its rate, and sum.
    #         total_seconds = executions_per_day * seconds_per_execution * 30
    #         vcpu_seconds  = total_seconds * CONTAINER_JOB_VCPU
    #         gib_seconds   = total_seconds * CONTAINER_JOB_GIB
    total_seconds = executions_per_day * seconds_per_execution * 30
    vcpu_cost = total_seconds * CONTAINER_JOB_VCPU * CONTAINER_JOB_VCPU_SECOND_EUR
    gib_cost = total_seconds * CONTAINER_JOB_GIB * CONTAINER_JOB_GIB_SECOND_EUR
    return vcpu_cost + gib_cost
# WHY vCPU-seconds AND GiB-seconds: Container Apps Consumption plans bill on two
# axes. Halving memory (1 GiB -> 0.5 GiB) cuts the GiB-seconds half of the bill,
# not the vCPU half. Students who only sum one axis underestimate cost by the
# missing dimension, which then surprises them on the assignment.


def class_postgres_saving(class_hours_per_day: int, class_days_per_week: int) -> tuple[float, float, float]:
    """Compare 24/7 vs class-hours-only Postgres compute, return (always_on, class_only, saving)."""
    always_on_hours = HOURS_PER_MONTH
    # TODO 4: Compute the class-hours-only running hours. Use:
    #           weeks_per_month = HOURS_PER_MONTH / (24 * 7)
    #           class_only_hours = class_hours_per_day * class_days_per_week * weeks_per_month
    weeks_per_month = HOURS_PER_MONTH / (24 * 7)
    class_only_hours = class_hours_per_day * class_days_per_week * weeks_per_month
    always_on_cost = postgres_compute_cost(always_on_hours)
    class_only_cost = postgres_compute_cost(class_only_hours)
    return always_on_cost, class_only_cost, always_on_cost - class_only_cost
# WHY weeks_per_month from HOURS_PER_MONTH rather than 4.345: Azure consistently
# bills against 730 hours/month. Deriving weeks from the same constant keeps
# everything in one frame of reference, so a student who edits HOURS_PER_MONTH
# (e.g. to test "what if we used 720?") gets a self-consistent answer rather
# than a mix of two different month definitions.


if __name__ == "__main__":
    print("Scenario A: Standard_B1ms Postgres running 24/7")
    a_compute = postgres_compute_cost(HOURS_PER_MONTH)
    a_storage = postgres_storage_cost()
    print(f"  compute: EUR {a_compute:6.2f}  storage: EUR {a_storage:6.2f}  total: EUR {a_compute + a_storage:6.2f}")

    print("\nScenario B: same server, stopped 16 hours/day (running 8h)")
    b_compute = postgres_compute_cost(8 * 30)  # 30 days * 8 hours
    print(f"  compute: EUR {b_compute:6.2f}  storage: EUR {a_storage:6.2f}  total: EUR {b_compute + a_storage:6.2f}")

    print("\nScenario C: Container App Job running 5 times/day for 60 seconds")
    c_job = container_job_cost(executions_per_day=5, seconds_per_execution=60)
    print(f"  total: EUR {c_job:6.2f}")

    print("\nScenario D: class-only Postgres (8h/day, 5 days/week) vs always-on")
    always_on, class_only, saving = class_postgres_saving(class_hours_per_day=8, class_days_per_week=5)
    print(f"  always-on compute: EUR {always_on:6.2f}")
    print(f"  class-only compute: EUR {class_only:6.2f}")
    print(f"  saving per month:   EUR {saving:6.2f}")

# Expected output (approximate, rounded to two decimals):
#
# Scenario A: Standard_B1ms Postgres running 24/7
#   compute: EUR  16.06  storage: EUR   3.68  total: EUR  19.74
#
# Scenario B: same server, stopped 16 hours/day (running 8h)
#   compute: EUR   5.28  storage: EUR   3.68  total: EUR   8.96
#
# Scenario C: Container App Job running 5 times/day for 60 seconds
#   total: EUR   0.19
#
# Scenario D: class-only Postgres (8h/day, 5 days/week) vs always-on
#   always-on compute: EUR  16.06
#   class-only compute: EUR   3.82
#   saving per month:   EUR  12.24
