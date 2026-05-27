# WealthPilot AI - Enterprise Private Banking Backend

Welcome to the Spring Boot backend engine for **WealthPilot AI**, a production-grade, containerized private banking and wealth management platform built using **Java 21** and **Spring Boot 3.2**.

---

## 🛠️ Tech Stack & Architecture

- **Java 21** (using modern records, structured pattern matching, and enhanced collection APIs)
- **Spring Boot 3.2** (featuring stateless REST APIs, CORS control, and native Spring Security 6)
- **Spring Security 6 & JWT** (robust RBAC support with secure bearer-tokens)
- **Spring Data JPA** (Hibernate engine with transactional boundary controls)
- **PostgreSQL 15** (fully integrated with automated Flyway schemas)
- **Flyway Migrations** (versioned database migrations for seamless reproducible setup)
- **Swagger / OpenAPI 3** (interactive REST interface for sandbox sandbox testing)
- **Lombok** (boilerplate reduction)
- **Docker & Compose** (multi-stage package compilation and multi-container coordination)

---

## 📂 Core Module Directory

Under `ai.wealthpilot`, the codebase follows a **Clean Layered Architecture**:

```
ai.wealthpilot
├── config                 # Global Spring Configurations (Security, CORS, OpenAPI, JPA Audit)
├── controller             # REST Controllers (Validation, enveloped ApiResponses)
├── dto                    # Data Transfer Objects (JSR-380 input validations)
├── exception              # Custom Exception hierarchies & RestControllerAdvice Handler
├── mapper                 # Enterprise-grade mapping components
├── model                  # Domain entities (DateAudit base, enums, relationship models)
├── repository             # JPA Repositories (lookups, fetch query tuning)
├── security               # JWT filter context, token provider, custom UserDetailsService
└── service                # Business logic layer (quantitative risk, rebalance simulators)
```

---

## 🚀 Rapid Local Deployment

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ensure it is running)
- Maven 3.9+ (optional if using local run)

### Run Containerized (Database + Cache + App)
To launch the entire coordinate database, Redis cache, and backend app, execute:
```bash
docker compose up --build
```
This command compiles the project in a multi-stage Maven build container, constructs a minimal Eclipse Temurin JRE run-container, launches PostgreSQL (with pre-loaded vector extensions), starts Redis, and registers them.

---

## 🧪 Interactive API Testing (Swagger)

Once the application is running, open your browser and navigate to:
```
http://localhost:8080/swagger-ui.html
```

### Steps to test secure endpoints:
1. Trigger `/api/v1/auth/login` with mock RM credentials:
   - **Email**: `advisor@wealthpilot.ai`
   - **Password**: `password123`
2. Extract the `accessToken` string from the successful response.
3. Click the **Authorize** lock button in the top right of Swagger.
4. Paste the token as the value (bearer format is handled automatically).
5. Run secure portfolio operations like `/api/v1/portfolios/{id}/risk` or rebalance simulations `/api/v1/portfolios/{id}/rebalance`.

---

## 🗄️ Database Seed Data & Entities

The application automatically runs Flyway migrations on boot:
- **`V1__init_schema.sql`**: Formulates tables, foreign keys, constraints, and audit indexes.
- **`V2__seed_data.sql`**: Seeds:
  - System roles and a default advisor account (`advisor@wealthpilot.ai` / `password123`).
  - Three high-fidelity HNW clients (Vikram Aditya, Ananya Sen, Dr. Kabir Mehta).
  - Calculated investment portfolios ($4.5M, $2.2M, $7.8M total valuations) with real global assets (AAPL, MSFT, NVDA, BND, GLD, BTC, Cash).
  - Realistic RM touchpoint meeting schedules and detailed AI-generated meeting summaries.
  - Interactive portfolio drift warnings and custom RM push alerts.
