#!/bin/bash
# POST request with JSON body
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "age": 30}'
