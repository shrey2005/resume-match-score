import { create } from "zustand";
import type { AnalyzeResponse } from "../types";

interface ResumeMatcherState {
    resume: File | null;
    jobDescription: string;

    result: AnalyzeResponse | null;

    isLoading: boolean;
    error: string | null;

    setResume: (file: File | null) => void;
    setJobDescription: (value: string) => void;

    setResult: (result: AnalyzeResponse | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    reset: () => void;
}

export const useStore = create<ResumeMatcherState>((set) => ({
    resume: null,
    jobDescription: "",

    result: null,

    isLoading: false,
    error: null,

    setResume: (file) =>
        set({
            resume: file,
            error: null,
            result: null,
        }),

    setJobDescription: (value) =>
        set({
            jobDescription: value,
            error: null,
        }),

    setResult: (result) =>
        set({
            result,
        }),

    setLoading: (loading) =>
        set({
            isLoading: loading,
        }),

    setError: (error) =>
        set({
            error,
        }),

    reset: () =>
        set({
            resume: null,
            jobDescription: "",
            result: null,
            isLoading: false,
            error: null,
        }),
}));