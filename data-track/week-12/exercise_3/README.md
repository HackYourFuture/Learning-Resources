# Exercise 3: Streamlit Last DAG Run Status Panel

Build a Streamlit app with one panel that calls the Airflow REST API and shows the last run state.

## Prerequisites

- Airflow URL, username, and password (from your teacher)
- Python 3.11+ and `pip`

## Setup

```bash
pip install -r requirements.txt
cp .env.example .env
# Fill in AIRFLOW_URL, AIRFLOW_USER, AIRFLOW_PASS in .env
streamlit run app.py
```

## Task

Open `app.py`. Follow the `TODO` comments to:

1. Implement `get_dag_runs(dag_id, limit)`: Airflow 3 uses token auth, so first `POST` to `/auth/token` for a JWT, then call `/api/v2/.../dagRuns` with an `Authorization: Bearer <token>` header.
2. Call it with `dag_id = "ingest_taxi_month"` and `limit = 1`.
3. Display the result as `st.success` (success), `st.error` (failed), or `st.warning` (other state).

The app should look like this when working:

```text
┌─────────────────────────────────────────┐
│  Last run: success - started 2024-01-15 │
└─────────────────────────────────────────┘
```

## Success criteria

- Running `streamlit run app.py` opens a page in the browser.
- The panel shows the real last run state of your `ingest_taxi_month` DAG.
- No credentials are hardcoded in `app.py`.

## Stretch

Add a `st.selectbox` in the sidebar to switch between two DAG IDs. The panel should update when you change the selection.

## Solution

See `solutions/app.py` for the reference implementation.
