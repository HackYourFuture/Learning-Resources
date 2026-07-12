# Simple REST API

A minimal Spring Boot application demonstrating basic REST endpoints.

## Endpoints

- **GET `/`**: Returns a "Hello world!" message.
- **GET `/random`**: Returns a random long number.
- **POST `/`**: Echoes back the request body.

## Getting Started

### Prerequisites

- Java 25 or higher
- Maven

### Running the Application

You can run the application using the Maven wrapper:

```bash
./mvnw spring-boot:run
```

The server will start at `http://localhost:8080`.