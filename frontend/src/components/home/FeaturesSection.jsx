import {
    Brain,
    BriefcaseBusiness,
    BarChart3,
} from "lucide-react";

const features = [
    {
        icon: Brain,
        title: "AI Role Prediction",
        desc: "Predict suitable career roles from resume content.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Job Recommendations",
        desc: "Get personalized opportunities based on skills.",
    },
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        desc: "Visualize skills, confidence, and insights.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-14">
                    Why Choose Our Platform
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="p-8 rounded-3xl border hover:shadow-xl transition"
                        >
                            <feature.icon
                                size={40}
                                className="mb-4 text-blue-600"
                            />

                            <h3 className="font-bold text-xl">
                                {feature.title}
                            </h3>

                            <p className="opacity-70 mt-2">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}