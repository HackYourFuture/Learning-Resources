"""Exercise 5: Reshape and Export.

Create a pivot table from the orders data, then write it to CSV and
Parquet formats. Read the Parquet file back to confirm round-trip fidelity.
"""
from io import StringIO
from pathlib import Path

import pandas as pd

# Setup block
_csv = StringIO(
    """order_id,customer_id,region,amount,order_date
1,100,NL,120,2024-01-02
2,101,BE,90,2024-01-03
3,102,NL,,2024-01-03
4,103,DE,200,2024-01-04
5,100,NL,50,2024-01-05
"""
)
orders = pd.read_csv(_csv)
orders["amount"] = orders["amount"].fillna(0)
orders["order_date"] = pd.to_datetime(orders["order_date"])

output_dir = Path(__file__).resolve().parent / "output"
output_dir.mkdir(exist_ok=True)

# TODO 1: Create a pivot table of total 'amount' by 'region' (rows) and
# 'order_date' (columns). Use pd.pivot_table() with aggfunc='sum'.
# Assign the result to pivot and print it.

# WHY pivot_table not groupby + unstack: both work, but pivot_table has a
# cleaner API when you know up front which column goes on each axis. It also
# handles duplicate index+column combinations automatically with aggfunc,
# whereas unstack raises an error on duplicates.
# fill_value=0 replaces NaN cells (region/date combos with no orders) with 0
# so the CSV does not have confusing blank cells.
pivot = pd.pivot_table(
    orders,
    values="amount",
    index="region",
    columns="order_date",
    aggfunc="sum",
    fill_value=0,
)
print(pivot)

# TODO 2: Save pivot to 'output/pivot.csv' and 'output/pivot.parquet'.

# WHY Parquet: CSV is human-readable and universally supported but loses
# dtype information (e.g. datetimes become strings). Parquet preserves dtypes,
# compresses well, and is the default interchange format in modern data stacks.
pivot.to_csv(output_dir / "pivot.csv")
pivot.to_parquet(output_dir / "pivot.parquet")
print(f"Files written: {output_dir}/pivot.csv, {output_dir}/pivot.parquet")

# TODO 3: Read back the Parquet file and confirm the row count matches.

# WHY verify round-trip: writing and reading back confirms that the Parquet
# encoding preserved the data correctly. A mismatch in row count would point
# to a serialisation problem.
pivot_back = pd.read_parquet(output_dir / "pivot.parquet")
print(f"Parquet row count: {len(pivot_back)}")  # expect 3
