import { Link } from "react-router-dom";

export default function CTASection() {
    return (
        <section className="py-24">
            <div className="max-w-5xl mx-auto px-6">
                <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-12 text-center text-white">
                    <h2 className="text-4xl font-bold">
                        Ready to Find Your Perfect Role?
                    </h2>

                    <p className="mt-4 opacity-90">
                        Upload your resume and start exploring
                        opportunities powered by AI.
                    </p>

                    <Link
                        to="/upload"
                        className="inline-block mt-8 bg-white text-black px-6 py-4 rounded-xl font-semibold"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </section>
    );
}