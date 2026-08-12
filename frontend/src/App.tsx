import FileUploader from "./components/FileUploader";
import JobInput from "./components/JobInput";
import ScoreBoard from "./components/ScoreBoard";
import { analyzeResume } from "./api/client";
import { useStore } from "./store/useStore";

function App() {
  const resume = useStore((state) => state.resume);
  const jobDescription = useStore(
    (state) => state.jobDescription
  );

  const isLoading = useStore(
    (state) => state.isLoading
  );

  const error = useStore((state) => state.error);

  const setLoading = useStore(
    (state) => state.setLoading
  );

  const setResult = useStore(
    (state) => state.setResult
  );

  const setError = useStore(
    (state) => state.setError
  );

  const handleAnalyze = async () => {
    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const result = await analyzeResume({
        resume,
        jobDescription,
      });

      setResult(result);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to analyze resume. Please check the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-5 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[760px]">
        <header className="mb-9">
          <p className="mb-2 text-xs font-bold tracking-[1.4px] text-blue-600">
            AI CAREER TOOL
          </p>

          <h1 className="text-[clamp(34px,5vw,44px)] font-bold leading-tight text-[#162b49]">
            Resume Matcher
          </h1>

          <p className="mt-3 leading-relaxed text-gray-500">
            Compare your resume with a job description
            using AI-powered analysis.
          </p>
        </header>

        <FileUploader />

        <JobInput />

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isLoading}
          className="
            inline-flex
            min-h-[54px]
            min-w-[210px]
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-blue-400
            px-7
            text-[17px]
            font-bold
            text-white
            shadow-md
            transition
            hover:-translate-y-px
            hover:bg-blue-500
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isLoading
            ? "Analyzing Resume..."
            : "Calculate Match"}
        </button>

        {isLoading && (
          <p className="mt-4 text-sm text-gray-500">
            Extracting resume content and comparing
            skills...
          </p>
        )}

        <ScoreBoard />
      </div>
    </main>
  );
}

export default App;