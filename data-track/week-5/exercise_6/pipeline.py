import os

api_key = os.environ.get("API_KEY", "missing")
log_level = os.environ.get("LOG_LEVEL", "INFO")

print(f"API key present: {api_key != 'missing'}")
print(f"Log level: {log_level}")
