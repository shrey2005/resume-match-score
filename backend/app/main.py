from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return { 
        "status": "ok"
    }

ALLOWED_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

@app.post("/api/analyze")
async def analyze_file(resume: UploadFile = File(...), job_description: str = Form(...)):

    if resume.content_type not in ALLOWED_TYPES:
        return HTTPException(status_code=400, detail="Invalid file type. Only PDF and DOCX files are allowed.")
    
    return {
        "filename": resume.filename,
        "job_description": job_description,
        "message": "File and job description received successfully."
    }