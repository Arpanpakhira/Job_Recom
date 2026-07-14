import Sidebar from "../components/common/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                {children}
            </div>
        </div>
    );
}