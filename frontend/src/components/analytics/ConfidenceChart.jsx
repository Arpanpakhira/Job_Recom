import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function ConfidenceChart({
    data,
}) {
    const chartData = data.map(
        (item) => ({
            role: item.role,
            confidence: Number(
                (item.score * 100).toFixed(1)
            ),
        })
    );

    return (
        <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6 h-[450px]">
            <h2 className="text-xl font-semibold mb-6">
                Role Confidence
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <BarChart data={chartData}>
                    <XAxis dataKey="role" />
                    <YAxis />
                    <Tooltip />

                    <Bar
                        dataKey="confidence"
                        fill="#2563eb"
                        radius={[10, 10, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}