# Exercise 7: Image Tagging Strategy

Practice tagging the same image with multiple identifiers and understand why explicit tags matter.

## Setup

You need the image from Exercise 1 (or any image you have built this week):

```bash
docker build -t pipeline-practice:1.0 .
```

(Run from the `exercise_1/` folder, or use an image you already have.)

## Task

1. Tag the same image as `dev`, `staging`, and `prod`:
   ```bash
   docker tag pipeline-practice:1.0 pipeline-practice:dev
   docker tag pipeline-practice:1.0 pipeline-practice:staging
   docker tag pipeline-practice:1.0 pipeline-practice:prod
   ```

2. Run `docker images pipeline-practice` and confirm all four tags (`1.0`, `dev`, `staging`, `prod`) show the same `IMAGE ID`.

3. Answer the following questions:
   - Two engineers both push `pipeline-practice:latest` to a shared registry an hour apart. What happens to the first engineer's image?
   - Your CI system tags images with the Git commit SHA (e.g. `abc1234`). What advantage does this give you over tagging with `1.0`?
   - You have tags `dev`, `staging`, and `prod` pointing at three different commit SHAs. A bug is reported in production. How do you find which SHA is currently deployed?

4. Simulate a CI tag using a fake SHA:
   ```bash
   docker tag pipeline-practice:1.0 pipeline-practice:$(git rev-parse --short HEAD 2>/dev/null || echo "abc1234")
   ```
   Run `docker images pipeline-practice` again and find the SHA tag.

## Success criteria

- `docker images pipeline-practice` shows at least four tags for the same Image ID.
- You can explain why commit SHA tags are more reliable than `latest` for deployments.

## Stretch

- Push one of your tags to a registry (ACR or Docker Hub) and verify it appears there.
- What does `docker rmi pipeline-practice:dev` do? Does it delete the underlying image?
