# Exercise 4: Streamlit Daily Trend + Data-Freshness Panel

Extend the metrics app from Exercise 3 with a daily trip-volume line chart. The data-freshness
panel (row count + last pickup) is already provided so you can focus on the chart query.

## Prerequisites

- Exercise 3 working (KPI tiles showing real data)
- Azure Postgres connection string (`PG_URL`) and schema name (`PG_SCHEMA`) from your teacher

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env
# Fill in PG_URL and PG_SCHEMA
streamlit run app.py
```

## Task

Open `app.py`. Follow the `TODO` comment to:

1. Implement `get_daily_trips(pg_url, schema)` using `psycopg2`.
2. Query trips per day:
   `SELECT date_trunc('day', pickup_datetime) AS day, COUNT(*) AS trips
   FROM {schema}.fct_trips GROUP BY 1 ORDER BY 1`.
3. Return a `pandas.DataFrame` indexed by `day` with a `trips` column; the app renders it with
   `st.line_chart`.

The freshness panel (`get_fct_trips_freshness`) is already implemented — leave it as is.

## Success criteria

- The line chart shows trips per day for your `fct_trips` data.
- Both freshness `st.metric` widgets show non-zero / non-null values.
- Both query functions use `@st.cache_data(ttl=60)`.
- Credentials come from environment variables only.

## Stretch

Calculate how many hours ago the last pickup was and display it as the `delta` parameter of the
"Last pickup" `st.metric`. For example: "Last pickup: 2024-01-15 03:00 UTC, 14 h ago".

## Solution

See `solutions/app.py`.
