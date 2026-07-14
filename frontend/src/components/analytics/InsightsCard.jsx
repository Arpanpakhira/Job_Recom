export default function InsightsCard({
    title,
    value,
    description,
}) {
    return (
        <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6">
            <h3 className="text-sm opacity-70">
                {title}
            </h3>

            <h2 className="text-3xl font-bold mt-2">
                {value}
            </h2>

            <p className="mt-3 text-sm opacity-70">
                {description}
            </p>
        </div>
    );
}