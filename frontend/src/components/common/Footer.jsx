export default function Footer() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-800 py-6 mt-12">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm opacity-70">
                    © SmartMatch - An AI Based Job Recommendation System
                </p>

                <div className="flex gap-4 mt-4 md:mt-0">
                    <span className="text-sm opacity-70">
                        Development Team - Arpan | Akash | Anuj | Asif | Surajit
                    </span>
                </div>
            </div>
        </footer>
    );
}