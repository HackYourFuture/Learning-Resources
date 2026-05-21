# Exercise 7: Reference Answers

## Question 3a: Two engineers push `latest`

The second push overwrites the first. The registry stores only one image per tag name. The first engineer's `latest` is gone from the tag — the underlying layers may still exist if nothing else has been pushed over them, but there is no longer a way to refer to "the first engineer's image" by tag. This is why `latest` is unreliable for deployments: it is a moving target.

## Question 3b: Commit SHA advantage over `1.0`

A commit SHA is globally unique and immutable. `1.0` could be pushed again by anyone (or overwritten in CI). The SHA ties the image to a specific point in git history, so you can always answer: "what code is in this image?" and then `git log abc1234` or `git show abc1234` to inspect it. This traceability is essential when debugging a production incident: you can reproduce the exact environment by pulling the SHA-tagged image.

## Question 3c: Finding which SHA is deployed

Run `docker inspect <registry>/pipeline-practice:prod` and look at the `RepoTags` or check which SHA the `prod` tag resolves to. In Azure Container Registry, the portal shows each tag's digest and push timestamp. From there you can match the tag to a git commit with `git show <sha>`.

## Task 4: Simulating a CI tag

`git rev-parse --short HEAD` prints the short SHA of the current commit (e.g. `a3f8c12`). Using `$(...)` in a shell command runs it inline, so the docker tag becomes `pipeline-practice:a3f8c12`. This is exactly what a CI workflow does with `${{ github.sha }}` in GitHub Actions.

## Stretch: `docker rmi pipeline-practice:dev`

This removes only the **tag**, not the underlying image layers. The layers are still referenced by `pipeline-practice:1.0`, `staging`, and `prod`. Docker only removes the layers from disk when no tags or containers reference them any more. To verify: check that the Image ID still appears in `docker images` under another tag after the `rmi`.
