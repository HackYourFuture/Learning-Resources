"""Exercise 3: Grouping and Aggregation.

Aggregate the orders DataFrame by region, then add a derived column
using transform so every row knows its region's average.
"""
from numpy import rint
import pandas as pd
from io import StringIO



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

# TODO 1: Group by 'region' and calculate total revenue and order count.
# Use groupby().agg() with a dict: {'amount': ['sum', 'count']}.
# Assign the result to region_summary and print it.

summery= orders.groupby('region').agg({'amount': ['sum', 'count']})
print(summery)


# TODO 2: Add a column 'region_avg' to the original orders DataFrame
# with the average order amount per region.
# Use groupby().transform('mean') so the result aligns with the original index.
# Assign to orders['region_avg'].

orders['region_avg'] = orders.groupby('region')['amount'].transform('mean')


# TODO 3: Verify that 'region_avg' is the same for all rows in the same region.
# Print orders[['order_id', 'region', 'amount', 'region_avg']].

# Expected region_summary:
#         amount
#           sum count
# region
# BE       90.0     1
# DE      200.0     1
# NL      170.0     3   (120 + 0 + 50)

print('--- region summary ---')
print (orders[['order_id', 'region', 'amount', 'region_avg']])
print(orders.groupby('region')['region_avg'].count())
print('--- end of region summary ---')

# Expected region_avg (NL rows all share the same value):
#    order_id region  amount  region_avg
# 0         1     NL   120.0   56.666667  (170/3)
# 1         2     BE    90.0   90.000000
# 2         3     NL     0.0   56.666667
# 3         4     DE   200.0  200.000000
# 4         5     NL    50.0   56.666667
