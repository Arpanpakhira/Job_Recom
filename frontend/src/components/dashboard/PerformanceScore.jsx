import { useNavigate } from "react-router-dom";
import { CheckCircle2, AlertCircle, BookOpen, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ROLE_REQUIRED_SKILLS } from "../../utils/constants";
import useCourseStore from "../../store/useCourseStore";

export default function PerformanceScore({ analysis }) {
  const navigate = useNavigate();
  const setSelectedSkill = useCourseStore((state) => state.setSelectedSkill);

  // Determine the target role for evaluation
  const targetRole = analysis.recommendedRole || analysis.recommendedRoles?.[0]?.role || "Software Developer";
  const requiredSkills = ROLE_REQUIRED_SKILLS[targetRole] || [];

  if (requiredSkills.length === 0) {
    return null;
  }

  // Calculate matching & lacking skills
  const userSkillsLower = (analysis.skills || []).map((s) => s.toLowerCase());
  
  const matchedSkills = requiredSkills.filter((skill) =>
    userSkillsLower.includes(skill.toLowerCase())
  );
  
  const lackingSkills = requiredSkills.filter((skill) =>
    !userSkillsLower.includes(skill.toLowerCase())
  );

  const totalCount = requiredSkills.length;
  const matchCount = matchedSkills.length;
  const score = Math.round((matchCount / totalCount) * 100);

  // Set colors based on performance score
  let strokeColor = "#ef4444"; // Red
  let bgLightColor = "from-red-50 to-orange-50 dark:from-red-950/10 dark:to-orange-950/10";
  
  if (score >= 70) {
    strokeColor = "#10b981"; // Emerald
    bgLightColor = "from-emerald-50 to-teal-50 dark:from-emerald-950/10 dark:to-teal-950/10";
  } else if (score >= 40) {
    strokeColor = "#f59e0b"; // Amber
    bgLightColor = "from-amber-50 to-yellow-50 dark:from-amber-950/10 dark:to-yellow-950/10";
  }

  const handleLearnSkill = (skill) => {
    setSelectedSkill(skill);
    navigate("/courses");
  };

  const handleExploreAllLacking = () => {
    if (lackingSkills.length > 0) {
      setSelectedSkill(lackingSkills[0]);
    }
    navigate("/courses");
  };

  return (
    <div className={`bg-gradient-to-br ${bgLightColor} border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm`}>
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-between">
        
        {/* Left Side: Score Indicator */}
        <div className="flex flex-col items-center text-center lg:w-1/3">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            Analysis Performance Score
          </h3>
          
          <div className="relative w-40 h-40">
            <svg className="w-40 h-40" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={strokeColor}
                strokeWidth="10"
                strokeDasharray="314"
                initial={{ strokeDashoffset: 314 }}
                animate={{ strokeDashoffset: 314 - (314 * score) / 100 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold tracking-tight">{score}%</span>
              <span className="text-xs opacity-60 mt-0.5">Resume Strength</span>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
            Your resume matches <span className="font-bold text-slate-900 dark:text-white">{matchCount}</span> of <span className="font-bold text-slate-900 dark:text-white">{totalCount}</span> required skills for <span className="font-bold text-blue-600 dark:text-blue-400">"{targetRole}"</span>.
          </p>
        </div>

        {/* Right Side: Skills Matching Detail */}
        <div className="flex-1 space-y-6 w-full">
          
          {/* Matched Skills */}
          {matchedSkills.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                  Skills Matched ({matchedSkills.length})
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-900/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Lacking Skills */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={18} className="text-amber-500" />
              <h4 className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                Skills Lacking ({lackingSkills.length})
              </h4>
            </div>
            {lackingSkills.length > 0 ? (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {lackingSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleLearnSkill(skill)}
                      className="group/btn px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      title={`Find recommended courses for ${skill}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 group-hover/btn:bg-blue-400 transition-colors" />
                      {skill}
                      <ChevronRight size={10} className="opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
                <div className="pt-2">
                  <button
                    onClick={handleExploreAllLacking}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    <BookOpen size={14} />
                    Explore Recommended Courses
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-4 rounded-xl">
                Wow! Your resume covers all the typical skills expected for a "{targetRole}". Keep it up!
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
