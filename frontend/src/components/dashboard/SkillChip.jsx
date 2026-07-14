export default function SkillChip({
    skill,
}) {
    return (
        <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 text-sm font-medium">
            {skill}
        </span>
    );
}