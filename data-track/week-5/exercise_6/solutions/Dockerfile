FROM python:3.11-slim

WORKDIR /app

# TODO 1: Add an ARG instruction for BUILD_SHA with no default value.
# WHY ARG not ENV: ARG values are available only during the build phase.
# They do not appear in the final image's environment or in `docker inspect` output.
# This makes ARG safe for build-time metadata like a commit SHA: the value is used
# to label or log the build, then discarded. ENV values are baked into the image
# and visible to anyone who inspects it — wrong for secrets, acceptable for non-secret
# runtime config like APP_ENV=production.
ARG BUILD_SHA

# TODO 2: Add a RUN instruction that prints the BUILD_SHA value during the build.
# WHY echo during build: this is a common debugging technique for verifying that
# build arguments are reaching the Dockerfile correctly. In production you would
# label the image instead: LABEL git-sha=$BUILD_SHA
RUN echo "Building SHA: $BUILD_SHA"

COPY src/ src/

CMD ["python", "src/pipeline.py"]
