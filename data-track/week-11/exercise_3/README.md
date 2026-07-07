# Exercise 3: Streamlit KPI Metrics from `fct_trips`

Build a Streamlit app that reads your `fct_trips` dbt mart from Azure Postgres and shows three
headline KPI tiles. No orchestration involved — the app queries the table directly.

## Prerequisites

- Your Week 10 `fct_trips` table populated in `dev_<name>` on Azure Postgres
- Your Postgres connection string (`PG_URL`) and schema name (`PG_SCHEMA`) from your teacher
- Python 3.11+ and `pip`

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env
# Fill in PG_URL and PG_SCHEMA in .env
streamlit run app.py
```

## Task

Open `app.py`. Follow the `TODO` comment to:

1. Implement `get_trip_metrics(pg_url, schema)` using `psycopg2`.
2. Query `COUNT(*)`, `AVG(fare_amount)`, and `SUM(fare_amount)` from `{schema}.fct_trips`.
3. Return a dict `{"trip_count", "avg_fare", "total_fare"}`; the app renders it as three
   `st.metric` tiles (Total trips, Avg fare, Total fare revenue).

The app should look like this when working:

```text
┌───────────────┬───────────────┬─────────────────────┐
│ Total trips   │ Avg fare      │ Total fare revenue  │
│ 57,000        │ $13.42        │ $765,000            │
└───────────────┴───────────────┴─────────────────────┘
```

## Success criteria

- Running `streamlit run app.py` opens a page in the browser.
- The three tiles show non-zero values from your real `fct_trips` data.
- The function uses `@st.cache_data(ttl=60)`.
- No credentials are hardcoded in `app.py` — they come from environment variables only.

## Stretch

Add a `st.selectbox` in the sidebar to filter the KPIs by `pickup_borough`. The tiles should
recompute when you change the selection (pass the borough into the query with a parameterised
`WHERE pickup_borough = %s`).

## Solution

See `solutions/app.py` for the reference implementation.
