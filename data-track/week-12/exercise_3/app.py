"""
Exercise 3: Streamlit last DAG run status panel.
Fill in the TODOs to make the panel show real data.
"""

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
    """Return recent DAG runs from the Airflow REST API.

    TODO: implement this function.
    Endpoint: GET {AIRFLOW_URL}/api/v1/dags/{dag_id}/dagRuns
    Params: limit=limit, order_by="-execution_date"
    Auth: requests.get(..., auth=(AIRFLOW_USER, AIRFLOW_PASS))
    Return: response.json()["dag_runs"]
    """
    raise NotImplementedError("TODO: implement get_dag_runs")


st.title("Pipeline Health")
st.subheader("Last DAG run")

dag_id = "ingest_taxi_month"

try:
    runs = get_dag_runs(dag_id, limit=1)
    if runs:
        last = runs[0]
        state = last["state"]
        if state == "success":
            st.success(f"Last run: **{state}** — started {last['start_date']}")
        elif state == "failed":
            st.error(f"Last run: **{state}** — check Airflow logs")
        else:
            st.warning(f"Last run: **{state}**")
    else:
        st.info("No runs found.")
except NotImplementedError:
    st.warning("Implement `get_dag_runs` to see live data.")
except Exception as exc:
    st.error(f"Error: {exc}")
