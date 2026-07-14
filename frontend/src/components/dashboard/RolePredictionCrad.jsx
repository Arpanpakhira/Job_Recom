export default function RolePredictionCard({
    role,
    confidence,
}) {
    return (
        <div className="border rounded-2xl p-5 bg-white dark:bg-slate-900">
            <h3 className="font-semibold">
                {role}
            </h3>

            <div className="mt-4">
                <div className="w-full h-3 bg-slate-200 rounded-full">
                    <div
                        className="h-3 rounded-full bg-blue-600"
                        style={{
                            width: `${confidence * 100}%`,
                        }}
                    />
                </div>

                <p className="mt-2 font-semibold">
                    {(confidence * 100).toFixed(1)}%
                </p>
            </div>
        </div>
    );
}