export default function PredictionTable({
    predictions,
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-4">
                            Role
                        </th>

                        <th className="text-left py-4">
                            Confidence
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {predictions.map((item) => (
                        <tr
                            key={item.role}
                            className="border-b"
                        >
                            <td className="py-4">
                                {item.role}
                            </td>

                            <td className="py-4">
                                {(
                                    item.score * 100
                                ).toFixed(1)}
                                %
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}