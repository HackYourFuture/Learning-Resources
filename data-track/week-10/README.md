# HYF Data Track — Week 10 Practice

The Week 10 dbt drills no longer live here. They were loose SQL files with no dbt project around them, so they could not actually be run: you had to mentally graft them into your own project. They now live as **branches in the Week 10 reference repo**, each starting from the finished project so `dbt compile` and `dbt build` work for real.

## Where they went

Clone the reference repo once, then `git switch` to an exercise branch and follow its `EXERCISE.md`. Compare your work against the matching `-solution` branch.

```bash
git clone https://github.com/lassebenni/nyc-taxi-dbt-reference.git nyc_taxi
cd nyc_taxi
cp profiles.yml.example profiles.yml   # set your personal Week 9 login + schema
git switch exercise-macros             # then read EXERCISE.md
```

| Exercise | Start branch | Solution branch |
| --- | --- | --- |
| Macros and computed columns (`safe_divide`) | [`exercise-macros`](https://github.com/lassebenni/nyc-taxi-dbt-reference/tree/exercise-macros) | [`exercise-macros-solution`](https://github.com/lassebenni/nyc-taxi-dbt-reference/tree/exercise-macros-solution) |
| Write a singular test | [`exercise-singular-test`](https://github.com/lassebenni/nyc-taxi-dbt-reference/tree/exercise-singular-test) | [`exercise-singular-test-solution`](https://github.com/lassebenni/nyc-taxi-dbt-reference/tree/exercise-singular-test-solution) |
| Debug a broken `ref()` | [`exercise-debug-ref`](https://github.com/lassebenni/nyc-taxi-dbt-reference/tree/exercise-debug-ref) | [`exercise-debug-ref-solution`](https://github.com/lassebenni/nyc-taxi-dbt-reference/tree/exercise-debug-ref-solution) |
| Propagate a column change | [`exercise-column-propagation`](https://github.com/lassebenni/nyc-taxi-dbt-reference/tree/exercise-column-propagation) | [`exercise-column-propagation-solution`](https://github.com/lassebenni/nyc-taxi-dbt-reference/tree/exercise-column-propagation-solution) |
| Add the four generic tests | [`exercise-generic-tests`](https://github.com/lassebenni/nyc-taxi-dbt-reference/tree/exercise-generic-tests) | [`exercise-generic-tests-solution`](https://github.com/lassebenni/nyc-taxi-dbt-reference/tree/exercise-generic-tests-solution) |

Each branch is independent (all start from the complete project), so you can do them in any order. The full walkthrough for each is in the Week 10 Practice chapter of the Data Track curriculum.
