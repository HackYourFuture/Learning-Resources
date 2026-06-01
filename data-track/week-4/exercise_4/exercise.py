"""Exercise 4: Joining Two Tables.

Merge the orders DataFrame with a customers table, then analyse
which customer segment drives the most orders.
"""
from io import StringIO

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

customers = pd.DataFrame(
    {
        "customer_id": [100, 101, 102, 103],
        "name": ["Alice", "Bob", "Chloe", "Daan"],
        "segment": ["retail", "retail", "b2b", "b2b"],
    }
)

# TODO 1: Join orders with customers using a left join on customer_id.
# Assign the result to enriched and print it.

enriched = orders.merge(customers, on='customer_id', how='left')
print(enriched)

# TODO 2: Count how many orders belong to each segment.
# Use groupby('segment').size() or value_counts().
# Print the result.

# Expected enriched (5 rows — left join keeps all orders):
#    order_id  customer_id region  amount  order_date   name segment
# 0         1          100     NL   120.0  2024-01-02  Alice  retail
# 1         2          101     BE    90.0  2024-01-03    Bob  retail
# 2         3          102     NL     0.0  2024-01-03  Chloe     b2b
# 3         4          103     DE   200.0  2024-01-04   Daan     b2b
# 4         5          100     NL    50.0  2024-01-05  Alice  retail

# Expected segment order counts:
# retail    3
# b2b       2

customers.groupby('segment').size()

