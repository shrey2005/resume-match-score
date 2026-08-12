import { useStore } from "../store/useStore";

const JobInput = () => {
    const jobDescription = useStore(
        (state) => state.jobDescription
    );

    const setJobDescription = useStore(
        (state) => state.setJobDescription
    );

    return (
        <section className="mb-8">
            <label
                htmlFor="job-description"
                className="mb-3 block text-[22px] font-semibold text-[#18385f]"
            >
                Job Description
            </label>

            <textarea
                id="job-description"
                value={jobDescription}
                onChange={(event) =>
                    setJobDescription(event.target.value)
                }
                placeholder="Paste job description here..."
                rows={8}
                className="
          block
          min-h-[210px]
          w-full
          resize-y
          rounded-xl
          border
          border-slate-300
          bg-white
          p-[18px]
          text-base
          leading-relaxed
          text-gray-900
          outline-none
          transition
          placeholder:text-gray-400
          focus:border-blue-400
          focus:ring-4
          focus:ring-blue-100
        "
            />

            <div className="mt-1.5 text-right text-xs text-gray-400">
                {jobDescription.length} characters
            </div>
        </section>
    );
};

export default JobInput;