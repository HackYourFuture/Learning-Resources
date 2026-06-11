"""
Exercise 4: add a data-freshness panel to the pipeline health app.
"""

import os
from datetime import datetime, timezone

import psycopg2
import requests
import streamlit as st
from dotenv import load_dotenv

load_dotenv()

AIRFLOW_URL = os.environ["AIRFLOW_URL"]
AIRFLOW_USER = os.environ["AIRFLOW_USER"]
AIRFLOW_PASS = os.environ["AIRFLOW_PASS"]


@st.cache_data(ttl=3000)  # Airflow 3 uses token auth; the token is valid for 24h
def get_airflow_token() -> str:
    r = requests.post(
        f"{AIRFLOW_URL}/auth/token",
        json={"username": AIRFLOW_USER, "password": AIRFLOW_PASS},
    )
    r.raise_for_status()
    return r.json()["access_token"]
PG_URL = os.environ["PG_URL"]
PG_SCHEMA = os.environ.get("PG_SCHEMA", "dev_yourname")


@st.cache_data(ttl=60)
def get_dag_runs(dag_id: str, limit: int = 10) -> list:
    url = f"{AIRFLOW_URL}/api/v2/dags/{dag_id}/dagRuns"
    r = requests.get(
        url,
        params={"limit": limit, "order_by": "-logical_date"},
        headers={"Authorization": f"Bearer {get_airflow_token()}"},
        timeout=10,
    )
    r.raise_for_status()
    return r.json()["dag_runs"]


@st.cache_data(ttl=60)
def get_fct_trips_freshness(pg_url: str, schema: str) -> dict:
    """Return row count and last pickup_datetime for fct_trips.

    TODO: implement this function.
    Use psycopg2.connect(pg_url) to connect.
    Run: SELECT COUNT(*), MAX(pickup_datetime) FROM {schema}.fct_trips
    Return a dict: {"row_count": int, "last_pickup": datetime or None}
    """
    raise NotImplementedError("TODO: implement get_fct_trips_freshness")


st.title("Pipeline Health")

# Panel 1: last run
st.subheader("Last DAG run")
dag_id = "ingest_taxi_month"
try:
    runs = get_dag_runs(dag_id, limit=1)
    if runs:
        last = runs[0]
        state = last["state"]
        if state == "success":
            st.success(f"Last run: **{state}**, started {last['start_date']}")
        elif state == "failed":
            st.error(f"Last run: **{state}**, check Airflow logs")
        else:
            st.warning(f"Last run: **{state}**")
except Exception as exc:
    st.error(f"Airflow error: {exc}")

# Panel 2: data freshness
st.subheader("Data freshness")
try:
    freshness = get_fct_trips_freshness(PG_URL, PG_SCHEMA)
    col1, col2 = st.columns(2)
    col1.metric("Row count", f"{freshness['row_count']:,}")
    last = freshness["last_pickup"]
    col2.metric("Last pickup", str(last) if last else "None")
except NotImplementedError:
    st.warning("Implement `get_fct_trips_freshness` to see freshness data.")
except Exception as exc:
    st.error(f"Postgres error: {exc}")
