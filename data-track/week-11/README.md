# Week 11: Dashboarding with Metabase and Streamlit

Practice exercises for [Week 11](https://www.notion.so/hackyourfuture/Data-track) of the Data Track.
<!-- TODO: point this link at the renamed Week 11 Notion chapter once the chapter is moved. -->

The Week 11 practice no longer lives here as loose exercise folders. Like the Week 10 dbt drills, it
now lives as **branches in dedicated reference repos**, each starting from a complete, runnable
project so you can actually run the app / test the SQL instead of grafting snippets into your own
setup.

Both tools read the **dbt mart you built in Week 10** (`fct_trips`) straight from Azure Postgres —
no orchestration required. Clone a repo once, `git switch` to an exercise branch, follow its
`EXERCISE.md`, then compare against the matching `-solution` branch.

## Streamlit — [`nyc-taxi-streamlit-reference`](https://github.com/lassebenni/nyc-taxi-streamlit-reference)

A runnable metrics app (KPI tiles, daily-trend chart, freshness panel) that queries `fct_trips`.

| Exercise | Start branch | Solution branch |
| --- | --- | --- |
| KPI tiles from `fct_trips` | [`exercise-kpi-metrics`](https://github.com/lassebenni/nyc-taxi-streamlit-reference/tree/exercise-kpi-metrics) | [`exercise-kpi-metrics-solution`](https://github.com/lassebenni/nyc-taxi-streamlit-reference/tree/exercise-kpi-metrics-solution) |
| Daily trip-volume chart | [`exercise-daily-trend`](https://github.com/lassebenni/nyc-taxi-streamlit-reference/tree/exercise-daily-trend) | [`exercise-daily-trend-solution`](https://github.com/lassebenni/nyc-taxi-streamlit-reference/tree/exercise-daily-trend-solution) |

```bash
git clone https://github.com/lassebenni/nyc-taxi-streamlit-reference.git
cd nyc-taxi-streamlit-reference
git switch exercise-kpi-metrics
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # set your Week 9/10 PG_URL + PG_SCHEMA
streamlit run app.py
```

## Metabase — [`nyc-taxi-metabase-reference`](https://github.com/lassebenni/nyc-taxi-metabase-reference)

Each Metabase Question is driven by a SQL query. Those queries live as runnable `.sql` (your
checkable source of truth); the dashboard assembly stays in the Metabase UI.

| Exercise | Start branch | Solution branch |
| --- | --- | --- |
| Write a Metabase SQL Question | [`exercise-sql-question`](https://github.com/lassebenni/nyc-taxi-metabase-reference/tree/exercise-sql-question) | [`exercise-sql-question-solution`](https://github.com/lassebenni/nyc-taxi-metabase-reference/tree/exercise-sql-question-solution) |
| Build a dashboard with a date filter | [`exercise-dashboard-filter`](https://github.com/lassebenni/nyc-taxi-metabase-reference/tree/exercise-dashboard-filter) | [`exercise-dashboard-filter-solution`](https://github.com/lassebenni/nyc-taxi-metabase-reference/tree/exercise-dashboard-filter-solution) |

```bash
git clone https://github.com/lassebenni/nyc-taxi-metabase-reference.git
cd nyc-taxi-metabase-reference
git switch exercise-sql-question      # then read EXERCISE.md and log in to Metabase
```

## Prerequisites

- Your Week 10 `fct_trips` table populated in `dev_<name>` on the shared Azure Postgres.
- For Streamlit: your Postgres connection string (`PG_URL`) and schema name (`PG_SCHEMA`).
- For Metabase: logged in to HYF Metabase (URL in the Week 11 chapter).
