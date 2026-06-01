"""Exercise 1: Quick EDA on Orders.

You have a small orders dataset with a missing value. Explore it with
pandas and fix the gap before moving on to later exercises.

Each exercise is self-contained: the same sample data is embedded in
every starter file. You do not need to run this file first.
"""
from io import StringIO

import pandas as pd

csv_data = StringIO(
    """order_id,customer_id,region,amount,order_date
1,100,NL,120,2024-01-02
2,101,BE,90,2024-01-03
3,102,NL,,2024-01-03
4,103,DE,200,2024-01-04
5,100,NL,50,2024-01-05
"""
)

orders = pd.read_csv(csv_data)

# TODO 1: Print '--- info ---', then call orders.info().
# Print '--- describe ---', then print(orders.describe()).
# What dtype does pandas infer for 'amount'? What does describe() say about it?
print('--- info ---')
orders.info()
print('--- describe ---')

# TODO 2: Print '--- missing values ---', then count missing values per column.
# Hint: combine .isnull() and .sum().

# TODO 3: Fill missing 'amount' values with 0 using fillna() and reassign.
# Print '--- after fill ---', then print orders.isnull().sum() to confirm.

# Expected output after all three TODOs:
# --- info ---
# <class 'pandas.core.frame.DataFrame'>
# RangeIndex: 5 entries, 0 to 4
# ...   amount  4 non-null   float64
# ...
# --- describe ---
#        order_id  customer_id  amount
# count       5.0          5.0     4.0
# ...
# --- missing values ---
# order_id      0
# customer_id   0
# region        0
# amount        1
# order_date    0
# dtype: int64
# --- after fill ---
# order_id      0
# customer_id   0
# region        0
# amount        0
# order_date    0
# dtype: int64
