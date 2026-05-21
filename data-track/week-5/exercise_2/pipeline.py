import os

api_key = os.environ.get("API_KEY", "missing")
print(f"API key present: {api_key != 'missing'}")
