import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyProfile, getMyProjects, getMySkills } from "../api/api";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const profileRes = await getMyProfile();
        const p = profileRes.data.profile;
        setProfile(p);

        const [projRes, skillsRes] = await Promise.all([
          getMyProjects(p.id),
          getMySkills(p.id)
        ]);

        setProjects(projRes.data.projects || []);
        setSkills(skillsRes.data.skills || []);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Top Navbar */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between px-6">
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <span className="text-purple-400 text-2xl">⬡</span>
          <span>PortfolioAI</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 font-medium hidden sm:inline-block">
            {user?.fullname || profile?.fullname}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-800/30 p-8 rounded-3xl border border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.fullname || profile?.fullname}!
            </h1>
            <p className="text-slate-400">
              Here is an overview of your portfolio profile.
            </p>
          </div>
          <button
            onClick={() => navigate("/portfolio")}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <span>✨</span> Preview Portfolio
          </button>
        </div>

        {profile && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Profile Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white mb-6 shadow-lg shadow-purple-500/20">
                  {profile.fullname?.charAt(0) || "U"}
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{profile.fullname}</h2>
                <p className="text-purple-400 font-medium mb-4">{profile.title || "No Title Set"}</p>

                <div className="space-y-3 text-sm text-slate-400">
                  {profile.location && (
                    <div className="flex items-center gap-2">
                      <span>📍</span> {profile.location}
                    </div>
                  )}
                  {profile.email && (
                    <div className="flex items-center gap-2">
                      <span>✉️</span> {profile.email}
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center gap-2">
                      <span>🔗</span> <a href={profile.website} target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">Website</a>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Quick View */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>⚡</span> Top Skills
                </h3>
                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skills.slice(0, 5).map(skill => (
                      <span key={skill.id} className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-sm font-medium text-slate-300">
                        {skill.name}
                      </span>
                    ))}
                    {skills.length > 5 && (
                      <span className="px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-sm font-medium text-slate-500">
                        +{skills.length - 5} more
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No skills added yet.</p>
                )}
              </div>
            </div>

            {/* Right Column: Bio and Projects */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio Section */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>👤</span> About Me
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {profile.bio || "No bio written yet. Add some details about yourself to make your portfolio stand out!"}
                </p>
              </div>

              {/* Projects Quick View */}
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span>🚀</span> Featured Projects
                </h3>
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projects.slice(0, 4).map(project => (
                      <div key={project.id} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                        <h4 className="font-bold text-white mb-2">{project.title}</h4>
                        <p className="text-sm text-slate-400 line-clamp-2">{project.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">No projects added yet.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
