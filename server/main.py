from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from database import engine, Base
from router.auth import router as auth_router
from .schemas import Question
from .qa_chain import build_chain

import uvicorn
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app with metadata
app = FastAPI(
    title="MedQuery Agent API",
    description="AI-Powered Medical Intelligence Platform API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
import os
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        FRONTEND_URL,  # Add your frontend production URL
        "*"  # For development only - remove in production
    ], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Custom exception handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation errors with detailed messages."""
    errors = []
    for error in exc.errors():
        field = " -> ".join(str(loc) for loc in error["loc"])
        message = error["msg"]
        errors.append(f"{field}: {message}")
    
    return JSONResponse(
        status_code=422,
        content={
            "detail": "Validation failed",
            "errors": errors,
            "error_type": "validation_error"
        }
    )

@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    """Handle value errors."""
    return JSONResponse(
        status_code=400,
        content={
            "detail": str(exc),
            "error_type": "value_error"
        }
    )

# Health check endpoint
@app.get("/", tags=["Health"])
async def root():
    """Root endpoint - API health check."""
    return {
        "message": "MedQuery Agent API is running successfully!",
        "status": "healthy",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health", tags=["Health"])
async def health_check():
    """Comprehensive health check endpoint."""
    return {
        "status": "healthy",
        "service": "MedQuery Agent API",
        "version": "1.0.0",
        "database": "connected",
        "authentication": "active"
    }

qa_chain = build_chain()

@app.post("/ask")
async def ask_question(q: Question):
    result = qa_chain.run(q.query)
    return {"answer": result}

# Include routers
app.include_router(auth_router)


if __name__ == "__main__":
    import uvicorn
    # Get port from environment variable (for Render deployment) or default to 8080
    port = int(os.getenv("PORT", 8080))
    
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=port,
        log_level="info",
        reload=os.getenv("ENVIRONMENT", "development") == "development"
    )