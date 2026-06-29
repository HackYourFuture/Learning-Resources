# HYF Shop

A simple Spring Boot REST API built as an **in-class exercise** for Week 9 of the Backend Track.

## 🚀 Getting Started

### Prerequisites

- Java 25+
- Maven
- A running PostgreSQL instance

### Database Setup

Run the provided `database.sql` file against your PostgreSQL database:

```bash
psql -U <your_user> -d <your_database> -f database.sql
```

This creates the `products` table, adds a GIN index on the `details` JSONB column, and inserts **115 sample products** across 7 categories.

### Configuration

Set the following environment variables before running:

| Variable | Description |
| --- | --- |
| `DB_URL` | JDBC URL (e.g. `jdbc:postgresql://localhost:5432/hyfshop`) |
| `DB_USERNAME` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |

### Running

```bash
./mvnw spring-boot:run
```

The server starts on **port 8080**.

## 📡 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/products` | List all products |
| `GET` | `/products/search?color=<color>` | Filter products by color |
| `PUT` | `/products/{id}/size` | Set the size of a product |
| `PUT` | `/products/{id}/image` | Upload a product image |
| `DELETE` | `/products/{id}/image` | Remove a product image |

## 🛠️ Tech Stack

- **Java 25** · **Spring Boot 4.1.0** (Web MVC, JDBC)
- **PostgreSQL** (via `JdbcClient`) · **Lombok**
