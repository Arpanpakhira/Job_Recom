export default function PredictionSummary({
    predictions,
}) {
    return (
        <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-6">
                Prediction Summary
            </h2>

            <div className="space-y-4">
                {predictions.map(
                    (prediction) => (
                        <div
                            key={prediction.role}
                        >
                            <div className="flex justify-between mb-2">
                                <span>
                                    {prediction.role}
                                </span>

                                <span>
                                    {(
                                        prediction.score *
                                        100
                                    ).toFixed(1)}
                                    %
                                </span>
                            </div>

                            <div className="w-full bg-slate-200 h-3 rounded-full">
                                <div
                                    className="bg-blue-600 h-3 rounded-full"
                                    style={{
                                        width: `${prediction.score *
                                            100
                                            }%`,
                                    }}
                                />
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}