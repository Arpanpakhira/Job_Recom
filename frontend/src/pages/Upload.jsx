import MainLayout from "../layouts/MainLayout";

import PageTransition from "../components/common/PageTransition";

import ResumeUploader from "../components/upload/ResumeUploader";

export default function Upload() {
    return (
        <MainLayout>
            <PageTransition>
                <section className="max-w-6xl mx-auto px-6 py-20">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold">
                            Upload Your Resume
                        </h1>

                        <p className="mt-4 opacity-70">
                            Analyze your resume and get
                            AI-powered role predictions.
                        </p>
                    </div>

                    <ResumeUploader />
                </section>
            </PageTransition>
        </MainLayout>
    );
}