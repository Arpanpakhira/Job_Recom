export default function ConfidenceGauge({
    confidence,
}) {
    const percentage = Math.round(
        confidence * 100
    );

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-40 h-40">
                <svg
                    className="w-40 h-40"
                    viewBox="0 0 120 120"
                >
                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                    />

                    <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="10"
                        strokeDasharray="314"
                        strokeDashoffset={
                            314 -
                            (314 * percentage) / 100
                        }
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                    />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">
                        {percentage}%
                    </span>
                </div>
            </div>

            <p className="mt-4 opacity-70">
                Confidence Score
            </p>
        </div>
    );
}