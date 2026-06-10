"""Exercise 3 solution."""

import os

import requests
import streamlit as st
from dotenv import load_dotenv

load_dotenv()

AIRFLOW_URL = os.environ["AIRFLOW_URL"]
AIRFLOW_USER = os.environ["AIRFLOW_USER"]
AIRFLOW_PASS = os.environ["AIRFLOW_PASS"]


@st.cache_data(ttl=60)
def get_dag_runs(dag_id: str, limit: int = 10) -> list:
    url = f"{AIRFLOW_URL}/api/v2/dags/{dag_id}/dagRuns"
    r = requests.get(
        url,
        params={"limit": limit, "order_by": "-logical_date"},
        auth=(AIRFLOW_USER, AIRFLOW_PASS),
        timeout=10,
    )
    r.raise_for_status()
    return r.json()["dag_runs"]


st.title("Pipeline Health")
st.subheader("Last DAG run")

dag_id = "ingest_taxi_month"

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
else:
    st.info("No runs found.")
