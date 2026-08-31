import os
import tempfile

from fastapi import APIRouter, File, UploadFile, Form
from app.services.resume_parser import extract_resume_text
from app.services.matcher import extract_skills, match_skills
from app.services.scorer import calculate_score

router = APIRouter()

ALLOWED_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}


@router.post("/analyze")
async def analyze_resume(resume: UploadFile = File(...), job_description: str = Form(...)):
    if resume.content_type not in ALLOWED_TYPES:
        return HTTPException(status_code=400, detail="Invalid file type. Only PDF and DOCX files are allowed.")

    suffix = os.path.splitext(resume.filename)[1].lower()

    with tempfile.NamedTemporaryFile(delete = False, suffix = suffix) as temp:

        content = await resume.read()
        temp.write(content)
        temp_path = temp.name

    try:
        resume_text = extract_resume_text(temp_path)

        resume_skills = extract_skills(resume_text)

        required_skills = extract_skills(job_description)

        match_result = match_skills(resume_skills, required_skills)

        score = calculate_score(match_result["matched"], required_skills)

        return{
            "filename": resume.filename,
            "job_description": job_description,
            "resume_text": resume_text,
            "required_skills": required_skills,
            "resume_skills": resume_skills,
            "matched_skills": match_result["matched"],
            "missing_skills": match_result["missing"],
            "match_score": score
        }

    finally:
        os.remove(temp_path)
