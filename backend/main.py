from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="InstaExplorer API", description="Backend for Instagram Analytics and Explainable AI")

# Configure CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "InstaExplorer API is running. Ready to analyze public accounts!"}

@app.get("/api/analyze/{handle}")
def analyze_account(handle: str):
    import scraper
    import explainer
    
    # 1. Scrape or mock account data
    profile_data = scraper.fetch_instagram_profile(handle)
    
    # 2. Feed into 'AI' explainer logic
    insights = explainer.generate_insights(profile_data)
    
    return {
        "handle": handle,
        "status": profile_data.get("status", "error"),
        "is_mock": profile_data.get("is_mock", True),
        "profile": profile_data,
        "xai_insights": insights
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
