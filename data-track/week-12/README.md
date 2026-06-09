# Week 12: Dashboarding with Metabase and Streamlit

Practice exercises for [Week 12](https://www.notion.so/hackyourfuture/Week-12-Dashboarding-with-Metabase-and-Streamlit) of the Data Track.

## Exercises

| Exercise | Topic |
|---|---|
| [Exercise 1](exercise_1/) | Write a Metabase SQL Question |
| [Exercise 2](exercise_2/) | Build a Metabase dashboard with a date filter |
| [Exercise 3](exercise_3/) | Streamlit: last DAG run status panel |
| [Exercise 4](exercise_4/) | Streamlit: data-freshness panel from Postgres |

## Prerequisites

- Logged in to HYF Metabase (URL in Week 12, Ch2)
- Your Week 10 `fct_trips` table is populated in `dev_<name>` on Azure Postgres
- Your Week 11 Airflow `ingest_taxi_month` DAG has at least one run

## Running the Streamlit exercises

```bash
cd exercise_3  # or exercise_4
pip install -r requirements.txt
cp .env.example .env  # fill in your credentials
streamlit run app.py
```
