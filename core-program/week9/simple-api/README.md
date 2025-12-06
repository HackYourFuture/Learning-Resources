# Simple User API

A simple REST API for managing users, built with Express.js for educational purposes.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server:

   ```bash
   npm start
   ```

3. The server will run at `http://localhost:3000`

## API Endpoints

### Get All Users

```http
GET /users
```

Returns a list of all users.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com"
    },
    {
      "id": 2,
      "name": "Bob",
      "email": "bob@example.com"
    }
  ]
}
```

### Get User by ID

```http
GET /users/:id
```

Returns a single user by their ID.

**Parameters:**

- `id` (number) - The user ID

**Response (success):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```

**Response (user not found):**

```json
{
  "success": false,
  "error": "User not found"
}
```

### Create a New User

```http
POST /users
```

Creates a new user.

**Request Body:**

```json
{
  "name": "Charlie",
  "email": "charlie@example.com"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Charlie",
    "email": "charlie@example.com"
  }
}
```

### Update a User

```http
PUT /users/:id
```

Updates an existing user.

**Parameters:**

- `id` (number) - The user ID

**Request Body:**

```json
{
  "name": "Charlie Updated",
  "email": "charlie.new@example.com"
}
```

**Response (success):**

```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Charlie Updated",
    "email": "charlie.new@example.com"
  }
}
```

**Response (user not found):**

```json
{
  "success": false,
  "error": "User not found"
}
```

### Delete a User

```http
DELETE /users/:id
```

Deletes a user by their ID.

**Parameters:**

- `id` (number) - The user ID

**Response (success):**

```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Charlie",
    "email": "charlie@example.com"
  }
}
```

**Response (user not found):**

```json
{
  "success": false,
  "error": "User not found"
}
```

## Testing with cURL

```bash
# Get all users
curl http://localhost:3000/users

# Get user by ID
curl http://localhost:3000/users/1

# Create a new user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Charlie","email":"charlie@example.com"}'

# Update a user
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated","email":"alice.new@example.com"}'

# Delete a user
curl -X DELETE http://localhost:3000/users/1
```

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created (for POST requests)
- `400` - Bad Request (invalid user ID)
- `404` - Not Found (user or route not found)
