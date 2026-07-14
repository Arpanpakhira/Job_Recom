import { UploadCloud } from "lucide-react";

export default function UploadZone({
    onFileSelect,
}) {
    const handleChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <label className="border-2 border-dashed border-slate-300 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition">
            <UploadCloud
                size={60}
                className="mb-4 text-blue-600"
            />

            <h3 className="font-semibold text-lg">
                Upload Resume
            </h3>

            <p className="opacity-70 mt-2">
                PDF files only
            </p>

            <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleChange}
            />
        </label>
    );
}