import re

SKILLS = [
    "react",
    "react.js",
    "next.js",
    "javascript",
    "typescript",
    "node.js",
    "node",
    "express.js",
    "express",
    "redux",
    "zustand",
    "mongodb",
    "mysql",
    "postgresql",
    "sql",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "html",
    "css",
    "tailwind css",
    "rest api",
    "graphql",
    "git",
    "github",
    "vite",
    "jest",
]

def normalize_skills(skill: str) -> str:
    skill = skill.lower().strip()

    aliases = {
        "react.js": "react",
        "node.js": "node",
        "express.js": "express",
    }

    return aliases.get(skill, skill);

def extract_skills(text: str) -> list[str]:
    text = text.lower();

    found_skills = []

    for skill in SKILLS:
        pattern = rf"\b{re.escape(skill.lower())}\b"
        if re.search(pattern, text):
            normalized = normalize_skills(skill)

            if normalized not in found_skills:
                found_skills.append(normalized)

    return found_skills

def match_skills(resume_skills: list[str], required_skills: list[str]) -> dict:
    resume_set = set(resume_skills)
    required_set = set(required_skills)

    matched = sorted(resume_set & required_set)
    missing = sorted(required_set - resume_set)

    return{
        "matched": matched,
        "missing": missing,
    }