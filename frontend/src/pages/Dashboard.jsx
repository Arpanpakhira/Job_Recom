import { Navigate } from "react-router-dom";

import {
    Brain,
    Award,
    BadgeCheck,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";

import PageTransition from "../components/common/PageTransition";

import StatsCard from "../components/dashboard/StatsCard";
import SkillChip from "../components/dashboard/SkillChip";
import PredictionTable from "../components/dashboard/PredictionTable";
import ConfidenceGauge from "../components/dashboard/ConfidenceGauge";
import PerformanceScore from "../components/dashboard/PerformanceScore";

import useResumeStore from "../store/useResumeStore";

export default function Dashboard() {
    const analysis =
        useResumeStore(
            (state) => state.analysis
        );

    if (!analysis) {
        return (
            <Navigate to="/upload" />
        );
    }

    const topPrediction =
        analysis.recommendedRoles?.[0];

    return (
        <DashboardLayout>
            <PageTransition>
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold">
                            Dashboard
                        </h1>

                        <p className="opacity-70 mt-2">
                            AI Resume Analysis Results
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <StatsCard
                            title="Recommended Role"
                            value={
                                analysis.recommendedRole
                            }
                            icon={
                                <Brain size={32} />
                            }
                        />

                        <StatsCard
                            title="Skills Found"
                            value={
                                analysis.skills.length
                            }
                            icon={
                                <Award size={32} />
                            }
                        />

                        <StatsCard
                            title="Predictions"
                            value={
                                analysis.recommendedRoles
                                    ?.length || 0
                            }
                            icon={
                                <BadgeCheck size={32} />
                            }
                        />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6">
                            <h2 className="text-xl font-semibold mb-6">
                                Confidence Analysis
                            </h2>

                            <ConfidenceGauge
                                confidence={
                                    topPrediction
                                        ?.score || 0
                                }
                            />
                        </div>

                        <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6">
                            <h2 className="text-xl font-semibold mb-6">
                                Skills Extracted
                            </h2>

                            <div className="flex flex-wrap gap-3">
                                {analysis.skills.map(
                                    (skill) => (
                                        <SkillChip
                                            key={skill}
                                            skill={skill}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Performance Score and Course recommendations based on lacking skills */}
                    <PerformanceScore analysis={analysis} />


                    <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6">
                        <h2 className="text-xl font-semibold mb-6">
                            Role Predictions
                        </h2>

                        <PredictionTable
                            predictions={
                                analysis.recommendedRoles
                            }
                        />
                    </div>
                </div>
            </PageTransition>
        </DashboardLayout>
    );
}