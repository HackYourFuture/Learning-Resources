# HYF Data Track — Week 12 Practice

The Week 12 Airflow drills are not standalone files here. Each one modifies the `taxi_pipeline` DAG you built across the Week 12 chapters, so they only make sense inside a full Astro + dbt project. Loose `.py` files with no project around them cannot be triggered, scheduled, or backfilled, so there is nothing useful to check out on its own.

## Where the exercises are

The seven exercises live in the **Week 12 Practice chapter** of the Data Track curriculum. Each one is a guided modification of your own DAG, with success criteria you verify locally.

If your `taxi_pipeline` is broken or you want a known-good starting point, use the reference repo:

```bash
git clone https://github.com/lassebenni/nyc-taxi-airflow-reference.git
cd nyc-taxi-airflow-reference
astro dev start
```

You can also open it in [GitHub Codespaces](https://github.com/codespaces/new/lassebenni/nyc-taxi-airflow-reference) and run `astro dev start` there if local Docker is giving you trouble. Compare your work against `dags/lasse/taxi_pipeline.py`.

| Exercise | What you practice |
| --- | --- |
| 1. Run the taxi pipeline locally | Astro CLI, DAG discovery, manual trigger |
| 2. Add scheduling and retries | cron schedule, retry configuration |
| 3. Quality gate between ingest and dbt | task dependencies, `>>` chaining |
| 4. Trigger multiple months, compare `ds` | `{{ ds }}` templating, parameterized runs |
| 5. Controlled backfill with idempotency proof | `backfill create`, delete-then-append |
| 6. Reproduce the Ch7 403 failure | log investigation, deterministic vs transient failures |
| 7. Deploy to the shared Airflow | shared-infra workflow, namespacing, multi-student etiquette |

The full walkthrough for each is in the Week 12 Practice chapter of the Data Track curriculum.
