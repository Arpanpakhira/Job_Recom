import { Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import PageTransition from "../components/common/PageTransition";

import ConfidenceChart from "../components/analytics/ConfidenceChart";
import SkillsChart from "../components/analytics/SkillsChart";
import InsightsCard from "../components/analytics/InsightsCard";
import PredictionSummary from "../components/analytics/PredictionSummary";
import PerformanceScore from "../components/dashboard/PerformanceScore";

import useResumeStore from "../store/useResumeStore";
import { ROLE_REQUIRED_SKILLS } from "../utils/constants";

export default function Analytics() {
    const analysis =
        useResumeStore(
            (state) => state.analysis
        );

    if (!analysis) {
        return (
            <Navigate to="/upload" />
        );
    }

    const highestConfidence =
        analysis.recommendedRoles?.[0]
            ?.score || 0;

    // Calculate resume strength
    const targetRole = analysis.recommendedRole || analysis.recommendedRoles?.[0]?.role || "Software Developer";
    const requiredSkills = ROLE_REQUIRED_SKILLS[targetRole] || [];
    const userSkillsLower = (analysis.skills || []).map((s) => s.toLowerCase());
    const matchedCount = requiredSkills.filter((skill) =>
        userSkillsLower.includes(skill.toLowerCase())
    ).length;
    const performanceScore = requiredSkills.length > 0 
        ? Math.round((matchedCount / requiredSkills.length) * 100) 
        : 0;

    return (
        <DashboardLayout>
            <PageTransition>
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold">
                            Analytics
                        </h1>

                        <p className="opacity-70 mt-2">
                            Deep insights from your
                            resume analysis.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        <InsightsCard
                            title="Skills Found"
                            value={
                                analysis.skills.length
                            }
                            description="Total extracted skills."
                        />

                        <InsightsCard
                            title="Top Confidence"
                            value={`${(
                                highestConfidence *
                                100
                            ).toFixed(1)}%`}
                            description="Highest prediction confidence."
                        />

                        <InsightsCard
                            title="Recommended Role"
                            value={
                                analysis.recommendedRole
                            }
                            description="Best matching role."
                        />

                        <InsightsCard
                            title="Resume Strength"
                            value={`${performanceScore}%`}
                            description="Core skills match rate."
                        />
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <ConfidenceChart
                            data={
                                analysis.recommendedRoles
                            }
                        />

                        <SkillsChart
                            skills={
                                analysis.skills
                            }
                        />
                    </div>

                    <PerformanceScore analysis={analysis} />

                    <PredictionSummary
                        predictions={
                            analysis.recommendedRoles
                        }
                    />
                </div>
            </PageTransition>
        </DashboardLayout>
    );
}