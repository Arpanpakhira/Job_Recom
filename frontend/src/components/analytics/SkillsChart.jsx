import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#2563eb",
    "#7c3aed",
    "#06b6d4",
    "#10b981",
    "#f97316",
    "#ef4444",
];

export default function SkillsChart({
    skills,
}) {
    const chartData = skills.map(
        (skill) => ({
            name: skill,
            value: 1,
        })
    );

    return (
        <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6 h-[450px]">
            <h2 className="text-xl font-semibold mb-6">
                Skills Distribution
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                    >
                        {chartData.map(
                            (_, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                        index %
                                        COLORS.length
                                        ]
                                    }
                                />
                            )
                        )}
                    </Pie>

                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}