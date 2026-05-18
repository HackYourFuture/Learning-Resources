"""Exercise 7: Visualize Revenue.

Plot total revenue by region as a bar chart and save it to disk.
Uses the non-interactive 'Agg' backend so it works in headless
environments (Codespaces, CI, servers).
"""
from io import StringIO
from pathlib import Path

import matplotlib
matplotlib.use("Agg")   # must come before importing pyplot
import matplotlib.pyplot as plt
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
output_dir = Path(__file__).resolve().parent / "output"
output_dir.mkdir(exist_ok=True)

# TODO 1: Group orders by 'region' and sum 'amount'.
# Plot the result as a bar chart using .plot(kind='bar').

# WHY matplotlib.use("Agg") before pyplot: pyplot's import triggers backend
# initialisation. If you call use() after importing pyplot, matplotlib raises
# a warning and ignores it (or crashes). "Agg" is the off-screen raster
# renderer: it produces PNG files without needing a display. In a Codespace
# or server environment there is no DISPLAY, so the default interactive backend
# (TkAgg, Qt5Agg, etc.) raises "cannot connect to X server" and crashes.
revenue = orders.groupby("region")["amount"].sum()
ax = revenue.plot(kind="bar")

# TODO 2: Add axis labels and a title.

# WHY ax.set_xlabel/ylabel/set_title over plt.*: when you have a reference to
# the Axes object (ax), using its own methods is more explicit and avoids
# acting on whichever axes is "current" in the global pyplot state machine.
# This matters when you have multiple subplots or build figures programmatically.
ax.set_xlabel("Region")
ax.set_ylabel("Total Revenue (€)")
ax.set_title("Revenue by Region")

# TODO 3: Save to 'output/revenue_by_region.png' and confirm file exists.

# WHY tight_layout before savefig: tight_layout adjusts subplot parameters so
# labels and titles do not clip. Without it, long axis labels are often cut off
# at the edge of the saved image, even though they look fine on screen.
plt.tight_layout()
plt.savefig(output_dir / "revenue_by_region.png")
print((output_dir / "revenue_by_region.png").exists())  # expect True
