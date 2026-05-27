FROM python:3.11-slim

WORKDIR /app

# TODO 1: Add an ARG instruction for BUILD_SHA with no default value.
#         ARG values are available during the build but NOT at runtime.
???

# TODO 2: Add a RUN instruction that prints the BUILD_SHA value during the build.
#         Use: RUN echo "Building SHA: $BUILD_SHA"
???

COPY src/ src/

CMD ["python", "src/pipeline.py"]
