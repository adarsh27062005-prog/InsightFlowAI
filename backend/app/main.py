from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.insights_routes import router as insights_router
from app.routes.upload_routes import router as upload_router
from app.routes.analytics_routes import router as analytics_router
from app.routes.ai_routes import router as ai_router
from app.routes.ml_routes import router as ml_router
from app.routes.export_routes import router as export_router

from app.db.database import engine
from app.db.models import Base

app = FastAPI(
    title="InsightFlow AI",
    version="1.0.0"
)

Base.metadata.create_all(
    bind=engine
)

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# ROUTES
# =========================

app.include_router(upload_router)
app.include_router(analytics_router)
app.include_router(ai_router)
app.include_router(insights_router)
app.include_router(ml_router)
app.include_router(export_router)

# =========================
# ROOT
# =========================

@app.get("/")
def root():

    return {
        "message": "InsightFlow AI Backend Running"
    }

# =========================
# HEALTH
# =========================

@app.get("/health")
def health():

    return {
        "status": "healthy"
    }

# =========================
# TEST ROUTE
# =========================

@app.get("/test-route")
def test_route():

    return {
        "working": True
    }