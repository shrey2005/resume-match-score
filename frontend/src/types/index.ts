export interface AnalyzeRequest {
    resume: File;
    jobDescription: string;
}

export interface AnalyzeResponse {
    score: number;
    summary: string;
    matchedSkills: string[];
    missingSkills: string[];
    recommendations: string[];
}

export interface ApiError {
    message: string;
}