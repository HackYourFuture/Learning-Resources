"""
Exercise 3: Streamlit KPI metrics panel from fct_trips.
Fill in the TODO to make the tiles show real data.
"""

import os

import psycopg2
import streamlit as st
from dotenv import load_dotenv

load_dotenv()

PG_URL = os.environ["PG_URL"]
PG_SCHEMA = os.environ.get("PG_SCHEMA", "dev_yourname")


@st.cache_data(ttl=60)
def get_trip_metrics(pg_url: str, schema: str) -> dict:
    """Return headline KPIs for fct_trips.

    TODO: implement this function.
    Use psycopg2.connect(pg_url) to connect.
    Run: SELECT COUNT(*), AVG(fare_amount), SUM(fare_amount) FROM {schema}.fct_trips
    Return a dict: {"trip_count": int, "avg_fare": float, "total_fare": float}
    """
    raise NotImplementedError("TODO: implement get_trip_metrics")


st.title("NYC Taxi Metrics")
st.subheader("Headline KPIs")

try:
    metrics = get_trip_metrics(PG_URL, PG_SCHEMA)
    col1, col2, col3 = st.columns(3)
    col1.metric("Total trips", f"{metrics['trip_count']:,}")
    col2.metric("Avg fare", f"${metrics['avg_fare']:.2f}")
    col3.metric("Total fare revenue", f"${metrics['total_fare']:,.0f}")
except NotImplementedError:
    st.warning("Implement `get_trip_metrics` to see live data.")
except Exception as exc:
    st.error(f"Postgres error: {exc}")
