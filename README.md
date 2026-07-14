# Job Recommendation System

An AI-powered resume analyzer that extracts skills from uploaded resumes and recommends the best-matching job roles using machine learning.

## Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐     ┌─────────┐
│  React      │────▶│  Spring Boot     │────▶│  Flask ML       │     │  MySQL  │
│  Frontend   │     │  Backend API     │     │  Service        │     │  DB     │
│  (Nginx)    │     │  :8080           │     │  :8000          │     │  :3306  │
│  :80        │     │                  │────▶│                 │     │         │
└─────────────┘     └────────┬─────────┘     └─────────────────┘     └────┬────┘
                             │                                            │
                             └────────────────────────────────────────────┘
```

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, Vite, TailwindCSS, Zustand |
| Backend    | Spring Boot 3.3, JPA, Maven        |
| ML Service | Flask, scikit-learn, NumPy          |
| Database   | MySQL 8                             |
| Deployment | Docker, Docker Compose, Nginx       |

## Quick Start with Docker Compose

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) & Docker Compose installed
- ML model files (`clf.pkl`, `tfidf.pkl`, `encoder.pkl`) placed in `JobRecommendationServer-main/src/main/ml/`

### Run
```bash
docker-compose up --build -d
```

The app will be available at **http://localhost**.

### Stop
```bash
docker-compose down
```

### Stop and remove data
```bash
docker-compose down -v
```

## Local Development Setup

### 1. MySQL Database
```bash
# Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS job_recommendation;"
```

### 2. ML Service (Python)
```bash
cd JobRecommendationServer-main/src/main/ml

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Ensure model files (clf.pkl, tfidf.pkl, encoder.pkl) are in this directory

# Start dev server
python app.py
```
ML service runs at `http://localhost:8000`

### 3. Backend API (Spring Boot)
```bash
cd JobRecommendationServer-main

# Set environment variables (or edit application.properties)
# DB_URL, DB_USERNAME, DB_PASSWORD, ML_API_URL

./mvnw spring-boot:run
```
Backend runs at `http://localhost:8080`

### 4. Frontend (React)
```bash
cd frontend

# Copy environment template
cp .env.example .env

# Install dependencies
npm install

# Start dev server
npm run dev
```
Frontend runs at `http://localhost:5173`

## Environment Variables

### Backend (Spring Boot)

| Variable         | Default                                          | Description              |
|------------------|--------------------------------------------------|--------------------------|
| `SERVER_PORT`    | `8080`                                           | Server port              |
| `DB_URL`         | `jdbc:mysql://localhost:3306/job_recommendation`  | MySQL JDBC URL           |
| `DB_USERNAME`    | `root`                                           | Database username        |
| `DB_PASSWORD`    | *(empty)*                                        | Database password        |
| `DDL_AUTO`       | `update`                                         | Hibernate DDL strategy   |
| `ML_API_URL`     | `http://localhost:8000/predict`                   | ML service endpoint      |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173`                    | Allowed CORS origins (comma-separated) |

### ML Service (Flask)

| Variable    | Default | Description                   |
|-------------|---------|-------------------------------|
| `MODEL_DIR` | `.`     | Directory containing .pkl files |

### Frontend (React/Vite)

| Variable       | Default                  | Description        |
|----------------|--------------------------|--------------------|
| `VITE_API_URL` | `http://localhost:8080`   | Backend API URL    |

## API Endpoints

| Method | Endpoint                       | Description                    |
|--------|--------------------------------|--------------------------------|
| POST   | `/api/resume/upload`           | Upload resume (multipart/form) |
| GET    | `/api/resume/health`           | Backend health check           |
| GET    | `/api/recommendations/{id}`    | Get recommendations by resume  |
| POST   | `/predict` (ML service)        | ML prediction (internal)       |
| GET    | `/health` (ML service)         | ML service health check        |

## Project Structure

```
Job-Recommendation-System/
├── docker-compose.yml                  # Orchestrates all services
├── README.md
├── frontend/                           # React + Vite frontend
│   ├── Dockerfile
│   ├── nginx.conf                      # Production Nginx config
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       ├── services/                   # API client
│       └── store/                      # Zustand state
└── JobRecommendationServer-main/       # Spring Boot backend
    ├── Dockerfile
    ├── pom.xml
    └── src/main/
        ├── java/com/example/JobRecomendationserver/
        │   ├── controller/             # REST controllers
        │   ├── service/                # Business logic
        │   ├── entity/                 # JPA entities
        │   ├── repository/             # Data access
        │   ├── config/                 # CORS, RestTemplate, etc.
        │   └── DTO/                    # Request/Response DTOs
        ├── ml/                         # Python ML service
        │   ├── Dockerfile
        │   ├── app.py                  # Flask prediction API
        │   ├── requirements.txt
        │   └── *.pkl                   # ML model files (not in git)
        └── resources/
            ├── application.properties  # Spring config
            └── skills.txt              # Skills reference data
```

## License

This project is for educational purposes.
