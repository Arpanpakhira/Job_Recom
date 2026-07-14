export default function UploadProgress({
    progress,
}) {
    return (
        <div className="w-full">
            <div className="w-full h-3 bg-slate-200 rounded-full">
                <div
                    className="h-3 bg-blue-600 rounded-full transition-all"
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>

            <p className="text-sm mt-2">
                Uploading... {progress}%
            </p>
        </div>
    );
}