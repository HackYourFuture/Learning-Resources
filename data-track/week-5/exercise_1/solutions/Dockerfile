# TODO 1: Choose a base image. Use python:3.11-slim.
# WHY python:3.11-slim: the full python:3.11 image is ~900MB. The slim variant strips
# documentation, tests, and unused locale data, bringing it to ~130MB. For a pipeline
# that only needs the standard library, slim is the right default.
FROM python:3.11-slim

# TODO 2: Set the working directory inside the container to /app.
# WHY /app: a dedicated working directory keeps container paths predictable and avoids
# accidentally writing files into system directories like /usr or /.
WORKDIR /app

# TODO 4: Copy the src/ folder into the container.
# WHY COPY src/ src/: copies only the source directory, not the whole project. Smaller
# context means faster builds and no risk of leaking .env or other local files.
COPY src/ src/

# TODO 5: Set the default command to run the pipeline module.
# WHY CMD vs RUN: RUN executes at build time; CMD sets the default at run time.
# Using a JSON array ("exec form") avoids spawning a shell, so signals like SIGTERM
# reach the Python process directly instead of being swallowed by a shell wrapper.
CMD ["python", "src/pipeline.py"]
