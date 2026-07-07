# Week 11: Dashboarding with Metabase and Streamlit

Practice exercises for [Week 11](https://www.notion.so/hackyourfuture/Data-track) of the Data Track.
<!-- TODO: point this link at the renamed Week 11 Notion chapter once the chapter is moved. -->

Both tools read the **dbt marts you built in Week 10** (`fct_trips`) straight from Azure Postgres —
no orchestration required. Metabase gives you point-and-click Questions and dashboards; Streamlit
lets you build a light metrics app in a few lines of Python.

## Exercises

| Exercise | Topic |
|---|---|
| [Exercise 1](exercise_1/) | Write a Metabase SQL Question |
| [Exercise 2](exercise_2/) | Build a Metabase dashboard with a date filter |
| [Exercise 3](exercise_3/) | Streamlit: KPI metrics from `fct_trips` |
| [Exercise 4](exercise_4/) | Streamlit: daily trend + data-freshness panel |

## Prerequisites

- Logged in to HYF Metabase (URL in the Week 11 chapter)
- Your Week 10 `fct_trips` table is populated in `dev_<name>` on Azure Postgres
- Your Azure Postgres connection string (`PG_URL`) for the Streamlit exercises

## Running the Streamlit exercises

```bash
cd exercise_3  # or exercise_4
pip install -r requirements.txt
cp .env.example .env  # fill in PG_URL and PG_SCHEMA
streamlit run app.py
```
