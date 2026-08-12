import { useStore } from "../store/useStore";

const ScoreBoard = () => {
    const result = useStore((state) => state.result);

    if (!result) return null;

    const score = Math.min(
        100,
        Math.max(0, result.score)
    );

    return (
        <section className="mt-11 rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_40px_rgba(15,35,65,0.07)]">
            <div className="flex items-center justify-between gap-5">
                <div>
                    <p className="mb-1.5 text-sm font-semibold text-gray-500">
                        Resume Match Score
                    </p>

                    <h2 className="m-0 text-[42px] font-bold text-[#17375f]">
                        {score}%
                    </h2>
                </div>

                <div className="flex h-[82px] w-[82px] items-center justify-center rounded-full border-[7px] border-blue-300 text-lg font-extrabold text-blue-700">
                    {score}%
                </div>
            </div>

            <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                    className="h-full rounded-full bg-blue-400 transition-all duration-700"
                    style={{ width: `${score}%` }}
                />
            </div>

            <div className="mt-7">
                <h3 className="mb-2 text-[17px] font-semibold text-[#203a5c]">
                    Summary
                </h3>

                <p className="leading-relaxed text-gray-500">
                    {result.summary}
                </p>
            </div>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
                <div>
                    <h3 className="mb-3 text-[17px] font-semibold text-[#203a5c]">
                        Matched Skills
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {result.matchedSkills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 text-[17px] font-semibold text-[#203a5c]">
                        Missing Skills
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {result.missingSkills.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-7 border-t border-slate-100 pt-6">
                <h3 className="mb-3 text-[17px] font-semibold text-[#203a5c]">
                    Recommendations
                </h3>

                <ul className="space-y-2 pl-5 text-gray-500">
                    {result.recommendations.map(
                        (recommendation, index) => (
                            <li key={`${recommendation}-${index}`}>
                                {recommendation}
                            </li>
                        )
                    )}
                </ul>
            </div>
        </section>
    );
};

export default ScoreBoard;