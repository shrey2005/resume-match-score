import re
from pathlib import Path
from pypdf import PdfReader
from docx import Document

def extract_pdf_text(file_path: str) -> str:
    reader = PdfReader(file_path)

    text = []

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text.append(page_text)

    return "\n".join(text)

def extract_docx_text(file_path: str) -> str:
    document = Document(file_path)

    text = []

    for paragraph in document.paragraphs:
        if paragraph.text.strip():
            text.append(paragraph.text)

    return "\n".join(text)

def clean_resume_text(text: str) -> str:

    text = text.replace("\r\n", "\n")
    text = text.replace("\r", "\n")

    text = re.sub(r"\s+([,.;:])", r"\1", text)
    text = re.sub(r"\bSr\s*\.\s*", "Sr. ", text)
    text = re.sub(r"\bJr\s*\.\s*", "Jr. ", text)

    text = re.sub(r"\bT\s+echnology\b", "Technology", text)
    text = re.sub(r"\bT\s+ools\b", "Tools", text)

    text = re.sub(r":(?=\S)", ": ", text)

    text = re.sub(r"[ \t]+", " ", text)

    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()

def extract_resume_text(file_path: str) -> str:
    file_extension = Path(file_path).suffix.lower()

    if file_extension == ".pdf":
        text =  extract_pdf_text(file_path)

    elif file_extension == ".docx":
        text = extract_docx_text(file_path)

    else:
        raise ValueError("Unsupported file format: {file_extension}")

    return clean_resume_text(text)
    
