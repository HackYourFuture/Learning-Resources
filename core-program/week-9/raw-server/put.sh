#!/bin/bash
# PUT request - replace a resource
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Bob", "age": 25}'
