import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, BriefcaseBusiness } from "lucide-react";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import PageTransition from "../components/common/PageTransition";
import useAuthStore from "../store/useAuthStore";

export default function Login() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            const result = await login(formData.email, formData.password);

            if (result.success) {
                toast.success("Welcome back!");
                navigate("/");
            } else {
                toast.error(result.error || "Login failed");
            }
        } catch {
            toast.error("An error occurred during login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <PageTransition>
                <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl border border-gray-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl mb-4">
                                <BriefcaseBusiness size={32} />
                            </div>
                            <h1 className="text-3xl font-bold">Login</h1>
                            <p className="opacity-70 mt-2">Access your AI resume analysis dashboard</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 opacity-80">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none opacity-50">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 opacity-80">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none opacity-50">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-lg shadow-blue-500/20"
                            >
                                {loading ? (
                                    "Logging In..."
                                ) : (
                                    <>
                                        <LogIn size={18} />
                                        Login
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm opacity-70">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </MainLayout>
    );
}
