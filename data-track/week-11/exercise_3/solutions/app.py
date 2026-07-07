"""Exercise 3 solution."""

import os

import psycopg2
import streamlit as st
from dotenv import load_dotenv

load_dotenv()

PG_URL = os.environ["PG_URL"]
PG_SCHEMA = os.environ.get("PG_SCHEMA", "dev_yourname")


@st.cache_data(ttl=60)
def get_trip_metrics(pg_url: str, schema: str) -> dict:
    with psycopg2.connect(pg_url) as conn, conn.cursor() as cur:
        cur.execute(
            f"SELECT COUNT(*), AVG(fare_amount), SUM(fare_amount) FROM {schema}.fct_trips"
        )
        trip_count, avg_fare, total_fare = cur.fetchone()
    return {
        "trip_count": trip_count or 0,
        "avg_fare": float(avg_fare or 0),
        "total_fare": float(total_fare or 0),
    }


st.title("NYC Taxi Metrics")
st.subheader("Headline KPIs")

metrics = get_trip_metrics(PG_URL, PG_SCHEMA)
col1, col2, col3 = st.columns(3)
col1.metric("Total trips", f"{metrics['trip_count']:,}")
col2.metric("Avg fare", f"${metrics['avg_fare']:.2f}")
col3.metric("Total fare revenue", f"${metrics['total_fare']:,.0f}")
