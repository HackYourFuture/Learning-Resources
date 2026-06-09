# Exercise 4: Streamlit Data-Freshness Panel

Extend the app from Exercise 3 with a second panel that reads `fct_trips` row count and last-updated timestamp from Azure Postgres.

## Prerequisites

- Exercise 3 working (last run panel showing real data)
- Azure Postgres connection string (`PG_URL`) from your teacher

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env
# Add PG_URL to .env (in addition to the Airflow env vars)
streamlit run app.py
```

## Task

Open `app.py`. Follow the `TODO` comments to:

1. Implement `get_fct_trips_freshness(pg_url)` using `psycopg2`.
2. Query `MAX(pickup_datetime)` and `COUNT(*)` from `dev_<name>.fct_trips`.
3. Display as two `st.metric` widgets: "Row count" and "Last pickup".

## Success criteria

- Both `st.metric` widgets show non-zero / non-null values from real data.
- The function uses `@st.cache_data(ttl=60)`.
- Credentials come from environment variables only.

## Stretch

Calculate how many hours ago the last pickup was and display it as the `delta` parameter of `st.metric`. For example: "Last pickup: 2024-01-15 03:00 UTC — 14 h ago".

## Solution

See `solutions/app.py`.
