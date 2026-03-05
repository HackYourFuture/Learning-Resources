#!/bin/bash
# PATCH request - partially update a resource
curl -X PATCH http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"age": 26}'
