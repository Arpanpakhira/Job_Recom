import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import UploadZone from "./UploadZone";
import UploadProgress from "./UploadProgress";

import { uploadResume } from "../../services/resumeService";

import useResumeStore from "../../store/useResumeStore";

export default function ResumeUploader() {
    const navigate = useNavigate();

    const setAnalysis =
        useResumeStore(
            (state) => state.setAnalysis
        );

    const [file, setFile] = useState(null);

    const [loading, setLoading] =
        useState(false);

    const [progress, setProgress] =
        useState(0);

    const handleUpload = async () => {
        if (!file) {
            toast.error(
                "Please select a PDF file"
            );
            return;
        }

        try {
            setLoading(true);

            const timer = setInterval(() => {
                setProgress((prev) =>
                    prev >= 90 ? prev : prev + 10
                );
            }, 200);

            const data =
                await uploadResume(file);

            clearInterval(timer);

            setProgress(100);

            setAnalysis(data);

            toast.success(
                "Resume analyzed successfully"
            );

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (error) {
            console.error(error);

            toast.error(
                "Failed to upload resume"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <UploadZone
                onFileSelect={setFile}
            />

            {file && (
                <div className="mt-6">
                    <p className="font-medium">
                        {file.name}
                    </p>
                </div>
            )}

            {loading && (
                <div className="mt-6">
                    <UploadProgress
                        progress={progress}
                    />
                </div>
            )}

            <button
                onClick={handleUpload}
                disabled={loading}
                className="mt-8 px-6 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
            >
                Analyze Resume
            </button>
        </div>
    );
}