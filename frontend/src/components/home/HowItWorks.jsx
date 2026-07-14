const steps = [
    "Upload Resume",
    "Extract Skills",
    "Predict Role",
    "Get Recommendations",
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-center text-4xl font-bold mb-16">
                    How It Works
                </h2>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={step}
                            className="text-center"
                        >
                            <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                                {index + 1}
                            </div>

                            <h3 className="mt-4 font-semibold">
                                {step}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}