"""Exercise 4 solution."""

import os

import pandas as pd
import psycopg2
import streamlit as st
from dotenv import load_dotenv

load_dotenv()

PG_URL = os.environ["PG_URL"]
PG_SCHEMA = os.environ.get("PG_SCHEMA", "dev_yourname")


@st.cache_data(ttl=60)
def get_daily_trips(pg_url: str, schema: str) -> pd.DataFrame:
    with psycopg2.connect(pg_url) as conn, conn.cursor() as cur:
        cur.execute(
            f"SELECT date_trunc('day', pickup_datetime) AS day, COUNT(*) AS trips "
            f"FROM {schema}.fct_trips GROUP BY 1 ORDER BY 1"
        )
        rows = cur.fetchall()
    return pd.DataFrame(rows, columns=["day", "trips"]).set_index("day")


@st.cache_data(ttl=60)
def get_fct_trips_freshness(pg_url: str, schema: str) -> dict:
    with psycopg2.connect(pg_url) as conn, conn.cursor() as cur:
        cur.execute(
            f"SELECT COUNT(*), MAX(pickup_datetime) FROM {schema}.fct_trips"
        )
        row_count, last_pickup = cur.fetchone()
    return {"row_count": row_count or 0, "last_pickup": last_pickup}


st.title("NYC Taxi Metrics")

st.subheader("Daily trip volume")
daily = get_daily_trips(PG_URL, PG_SCHEMA)
st.line_chart(daily)

st.subheader("Data freshness")
freshness = get_fct_trips_freshness(PG_URL, PG_SCHEMA)
col1, col2 = st.columns(2)
col1.metric("Row count", f"{freshness['row_count']:,}")
last = freshness["last_pickup"]
col2.metric("Last pickup", str(last) if last else "None")
