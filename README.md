<img width="1777" height="897" alt="image" src="https://github.com/user-attachments/assets/e624a880-64f1-4d18-8470-891ff16ec025" />

# WealthPilot AI

> AI-Native Private Banking & Wealth Management Workspace

WealthPilot AI is a modern fintech platform designed for Relationship Managers, Wealth Advisors, and Private Banking teams.  
The platform combines AI copilots, portfolio analytics, risk intelligence, and automated advisory workflows into a premium enterprise workspace.

---

# Features

- AI Wealth Copilot
- Portfolio Analytics Dashboard
- Risk Intelligence
- AI Meeting Summaries
- Automated Investment Insights
- Portfolio Rebalancing Recommendations
- Client Management Workspace
- PDF Report Generation
- Secure JWT Authentication
- Enterprise-grade Dashboard UI

---

# Tech Stack

## Frontend
- React
- Vite
- TailwindCSS v4
- React Router DOM
- Framer Motion
- Recharts

## FE: https://wealth-pilot-ai-seven.vercel.app/

## Backend
- Java 21
- Spring Boot 3
- Spring Security
- JWT Authentication
- PostgreSQL
- Swagger/OpenAPI
- Lombok
- Flyway
- MapStruct

---

# Project Structure

```bash
WealthPilot-AI/
│
├── wealthpilot-frontend/
├── wealthpilot-backend/
├── database/
├── .github/
├── README.md
└── .gitignore
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd wealthpilot-frontend
```

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Backend Setup

## Navigate to backend

```bash
cd wealthpilot-backend
```

## Compile the project

```bash
mvn clean compile
```

## Run Spring Boot application

```bash
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# Swagger API Documentation

Swagger UI:

```bash
http://localhost:8080/swagger-ui/index.html
```

OpenAPI Docs:

```bash
http://localhost:8080/v3/api-docs
```

---

# Database Setup

## PostgreSQL

Create database:

```sql
CREATE DATABASE wealthpilot_db;
```

Update database credentials in:

```bash
wealthpilot-backend/src/main/resources/application.yml
```

Example:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/wealthpilot_db
    username: postgres
    password: postgres
```

---

# Environment Requirements

## Frontend
- Node.js 20+
- npm 10+

## Backend
- Java 21
- Maven 3.9+
- PostgreSQL 15+

---

# Authentication Roles

- ROLE_ADMIN
- ROLE_RELATIONSHIP_MANAGER
- ROLE_ANALYST

---

# Main Application Routes

## Public Routes

- /
- /login
- /register

## Protected Routes

- /dashboard
- /clients
- /portfolio
- /analytics
- /ai-copilot
- /meetings
- /reports
- /settings

---

# AI Features

## AI Wealth Copilot
- Portfolio analysis
- Risk insights
- Rebalancing suggestions
- Client summary generation

## AI Meeting Summaries
- Upload meeting notes
- Generate structured summaries
- Extract action items

## AI Portfolio Insights
- Diversification analysis
- Allocation drift detection
- Risk alerts

---

# Development Workflow

## Frontend

```bash
cd wealthpilot-frontend
npm install
npm run dev
```

## Backend

```bash
cd wealthpilot-backend
mvn clean compile
mvn spring-boot:run
```

---

# Future Enhancements

- Real-time Market Data Integration
- AI Portfolio Optimization
- Multi-tenant SaaS Architecture
- Advanced Compliance Workflows
- AI-powered Tax Optimization
- Live Trading Integrations

---

# Screenshots

## Landing Page
(Add Screenshot)

## Dashboard
(Add Screenshot)

## AI Copilot
(Add Screenshot)

## Portfolio Analytics
(Add Screenshot)

---

# License

This project is created for educational and evaluation purposes.

---

# Author

BHIMASHANKAR
http://bhimashankar.vercel.app/
