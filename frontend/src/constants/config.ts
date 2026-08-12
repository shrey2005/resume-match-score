export const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
    analyze: "/api/analyze",
};

export const RESUME_CONFIG = {
    acceptedTypes: [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    acceptedExtensions: ".pdf,.docx",
    maxSizeMB: 10,
};