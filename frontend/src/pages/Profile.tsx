import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyProfile } from "../api/api";
import ProfileStep from "./dashboard/ProfileStep";
import SkillsStep from "./dashboard/SkillsStep";
import ProjectsStep from "./dashboard/ProjectsStep";
import EducationStep from "./dashboard/EducationStep";
import ExperienceStep from "./dashboard/ExperienceStep";
import CertificatesStep from "./dashboard/CertificatesStep";
import SocialLinksStep from "./dashboard/SocialLinksStep";
import TemplateStep from "./dashboard/TemplateStep";

const STEPS = [
  { key: "profile", label: "Profile", icon: "👤" },
  { key: "skills", label: "Skills", icon: "⚡" },
  { key: "projects", label: "Projects", icon: "🚀" },
  { key: "education", label: "Education", icon: "🎓" },
  { key: "experience", label: "Experience", icon: "💼" },
  { key: "certificates", label: "Certificates", icon: "📜" },
  { key: "social", label: "Social Links", icon: "🌐" },
  { key: "template", label: "Template", icon: "🎨" },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [profileId, setProfileId] = useState<number>(0);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        setProfileId(res.data.profile.id);
      })
      .catch(() => {});
  }, []);

  const goNext = () =>
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleGenerate = () => {
    navigate("/portfolio");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <ProfileStep onNext={goNext} />;
      case 1:
        return (
          <SkillsStep
            profileId={profileId}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 2:
        return (
          <ProjectsStep
            profileId={profileId}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 3:
        return (
          <EducationStep
            profileId={profileId}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 4:
        return (
          <ExperienceStep
            profileId={profileId}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 5:
        return (
          <CertificatesStep
            profileId={profileId}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 6:
        return (
          <SocialLinksStep
            profileId={profileId}
            onNext={goNext}
            onBack={goBack}
          />
        );
      case 7:
        return (
          <TemplateStep
            selectedTemplate={selectedTemplate}
            onSelect={setSelectedTemplate}
            onGenerate={handleGenerate}
            onBack={goBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-6">
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <span className="text-purple-400 text-2xl">⬡</span>
          <span>PortfolioAI</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-medium hidden sm:inline-block">{user?.fullname}</span>
          <button 
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        {/* Sidebar Stepper */}
        <aside className="hidden md:flex flex-col w-72 border-r border-slate-800 p-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="flex-1 space-y-1">
            {STEPS.map((s, i) => (
              <button
                key={s.key}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
                  i === step 
                    ? "bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(147,51,234,0.1)]" 
                    : i < step 
                      ? "text-slate-300 hover:bg-slate-800/50" 
                      : "text-slate-500 hover:text-slate-400 hover:bg-slate-800/50"
                }`}
                onClick={() => setStep(i)}
              >
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm ${
                  i === step ? "bg-purple-500/20 text-purple-400" : i < step ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800"
                }`}>
                  {i < step ? "✓" : s.icon}
                </span>
                {s.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium">
              <span>Progress</span>
              <span>{Math.round(((step) / (STEPS.length - 1)) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out"
                style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </aside>

        {/* Mobile Stepper (simplified) */}
        <div className="md:hidden w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md p-4 sticky top-16 z-10 flex items-center justify-between">
          <div className="font-medium text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              {STEPS[step].icon}
            </span>
            {STEPS[step].label}
          </div>
          <div className="text-sm text-slate-400">
            {step + 1} / {STEPS.length}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-3xl mx-auto">
          {renderStep()}
        </main>
      </div>
    </div>
  );
}
