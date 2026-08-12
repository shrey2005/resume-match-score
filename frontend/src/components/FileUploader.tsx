import { useRef } from "react";
import { RESUME_CONFIG } from "../constants/config";
import { useStore } from "../store/useStore";

const FileUploader = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const resume = useStore((state) => state.resume);
    const setResume = useStore((state) => state.setResume);
    const setError = useStore((state) => state.setError);

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const isValidType =
            RESUME_CONFIG.acceptedTypes.includes(file.type);

        if (!isValidType) {
            setError("Only PDF and DOCX files are supported.");
            return;
        }

        const maxSize =
            RESUME_CONFIG.maxSizeMB * 1024 * 1024;

        if (file.size > maxSize) {
            setError(
                `Resume size must be less than ${RESUME_CONFIG.maxSizeMB}MB.`
            );
            return;
        }

        setResume(file);
    };

    const handleRemove = () => {
        setResume(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <section className="mb-8">
            <h2 className="mb-3 text-[22px] font-semibold text-[#18385f]">
                Upload Resume (PDF/DOCX)
            </h2>

            <div className="rounded-xl border-2 border-dashed border-[#cdd6e3] bg-[#fbfcfe] p-7">
                <div className="flex flex-wrap items-center gap-4">
                    <input
                        ref={inputRef}
                        type="file"
                        accept={RESUME_CONFIG.acceptedExtensions}
                        onChange={handleFileChange}
                        hidden
                        id="resume-upload"
                    />

                    <label
                        htmlFor="resume-upload"
                        className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md bg-blue-50 px-5 font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                        Choose File
                    </label>

                    <span className="max-w-[300px] truncate text-gray-500">
                        {resume?.name || "No file selected"}
                    </span>

                    {resume && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="border-0 bg-transparent text-sm text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    )}
                </div>

                {resume && (
                    <p className="mt-4 font-bold text-green-600">
                        Selected: {resume.name}
                    </p>
                )}

                <p className="mt-2 text-xs text-gray-400">
                    Maximum size: {RESUME_CONFIG.maxSizeMB}MB
                </p>
            </div>
        </section>
    );
};

export default FileUploader;