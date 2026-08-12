import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/config";
import type { AnalyzeRequest, AnalyzeResponse } from "../types";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60_000,
});

export const analyzeResume = async (
    data: AnalyzeRequest
): Promise<AnalyzeResponse> => {
    const formData = new FormData();

    formData.append("resume", data.resume);
    formData.append("job_description", data.jobDescription);

    const response = await apiClient.post<AnalyzeResponse>(
        API_ENDPOINTS.analyze,
        formData
    );

    return response.data;
};

export default apiClient;