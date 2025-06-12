# MedQuery Server

This is the backend server for the MedQuery GenAI Medical Platform. It provides API endpoints for authentication, user management, and other medical data operations.

## Features

- Flask-based REST API
- JWT Authentication
- SQLAlchemy ORM with SQLite database
- User registration and login
- Role-based access control (doctor, researcher, patient, admin)

## Setup and Installation

1. Create a virtual environment (optional but recommended):
   ```
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   python3 -m pip install -r requirements.txt
   ```

3. Run the server:
   ```
   python3 app.py
   ```

The server will start at http://localhost:8000

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login and get access token
- `GET /auth/me` - Get current user information (requires authentication)

## Environment Variables

The server uses the following environment variables (defined in .env file):
- JWT_SECRET_KEY: Secret key for JWT token generation
- JWT_ACCESS_TOKEN_EXPIRES: Token expiration time in minutes
- DATABASE_URL: Database connection string (default: SQLite)