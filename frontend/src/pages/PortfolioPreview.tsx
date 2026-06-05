import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyProfile,
  getMySkills,
  getMyProjects,
  getMyEducation,
  getMyExperiences,
  getMyCertificates,
  getMySocialLinks,
} from "../api/api";

interface Profile {
  id: number;
  fullname: string;
  email: string;
  title: string;
  bio: string;
  location: string;
  website: string;
  cv_url: string;
}

interface Skill {
  id: number;
  name: string;
  level: number;
}

interface Project {
  id: number;
  title: string;
  description: string;
  github_url: string;
}

interface Education {
  id: number;
  school: string;
  degree: string;
  start_date: string;
  end_date: string;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date: string;
}

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
  expiration_date: string;
  credential_url: string;
  description: string;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

const SOCIAL_ICONS: Record<string, string> = {
  GitHub: "🐙",
  LinkedIn: "💼",
  Twitter: "🐦",
  Instagram: "📷",
  Facebook: "📘",
  YouTube: "▶️",
  Dribbble: "🏀",
  Behance: "🎨",
  Medium: "✍️",
  "Dev.to": "👩‍💻",
  "Stack Overflow": "📚",
};

export default function PortfolioPreview() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const profileRes = await getMyProfile();
        const p = profileRes.data.profile;
        setProfile(p);

        const [sk, pr, ed, ex, ce, so] = await Promise.all([
          getMySkills(p.id),
          getMyProjects(p.id),
          getMyEducation(p.id),
          getMyExperiences(p.id),
          getMyCertificates(p.id),
          getMySocialLinks(p.id),
        ]);

        setSkills(sk.data.skills || []);
        setProjects(pr.data.projects || []);
        setEducation(ed.data.education || []);
        setExperiences(ex.data.experiences || []);
        setCertificates(ce.data.certificates || []);
        setSocialLinks(so.data.socialLinks || []);
      } catch {
        alert("Failed to load portfolio data");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-200">
        <svg className="animate-spin h-12 w-12 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-xl font-medium text-slate-400">Generating your portfolio…</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-200 gap-6">
        <p className="text-xl text-slate-400">No profile data found.</p>
        <button className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-lg" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500/30">
      {/* Back to dashboard button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          className="px-4 py-2 bg-slate-900/80 backdrop-blur border border-slate-800 text-slate-300 hover:text-white rounded-full text-sm font-medium transition-colors shadow-lg flex items-center gap-2"
          onClick={() => navigate("/dashboard")}
        >
          <span>←</span> Back to Dashboard
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[70vh] flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[100px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tight leading-tight mb-6 bg-clip-text bg-linear-to-br from-white via-slate-200 to-slate-500">
            {profile.fullname}
          </h1>
          {profile.title && (
            <p className="text-2xl md:text-3xl font-medium text-purple-400 mb-6">
              {profile.title}
            </p>
          )}
          {profile.location && (
            <p className="text-lg text-slate-400 mb-10 flex items-center gap-2">
              <span className="text-xl">📍</span> {profile.location}
            </p>
          )}
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {profile.cv_url && (
              <a
                href={profile.cv_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Download CV
              </a>
            )}
            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-white font-medium transition-all"
              >
                Visit Website
              </a>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all"
                  title={s.platform}
                >
                  <span className="text-lg">{SOCIAL_ICONS[s.platform] || "🔗"}</span>
                  <span className="text-sm font-medium">{s.platform}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT ── */}
      {profile.bio && (
        <section className="py-20 px-6 max-w-4xl mx-auto border-t border-slate-800/50">
          <h2 className="text-3xl font-bold text-white mb-8">About Me</h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
            {profile.bio}
          </p>
        </section>
      )}

      {/* ── SKILLS ── */}
      {skills.length > 0 && (
        <section className="py-20 px-6 bg-slate-900/30 border-y border-slate-800/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-10">Skills & Expertise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {skills.map((s) => (
                <div key={s.id} className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-white">{s.name}</span>
                    <span className="text-xs text-slate-400">{s.level}/5</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-purple-500 to-indigo-500 rounded-full"
                      style={{ width: `${(s.level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROJECTS ── */}
      {projects.length > 0 && (
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <div key={p.id} className="group flex flex-col bg-slate-900/50 border border-slate-800 hover:border-purple-500/30 p-8 rounded-3xl transition-all hover:bg-slate-800/50">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">{p.title}</h3>
                {p.description && <p className="text-slate-400 leading-relaxed flex-1 mb-8">{p.description}</p>}
                {p.github_url && (
                  <a
                    href={p.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-xl transition-colors self-start w-fit"
                  >
                    <span className="text-xl">🐙</span> View Source Code
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── EXPERIENCE & EDUCATION (TWO COLUMNS) ── */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-slate-800/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
                <span className="text-2xl">💼</span> Experience
              </h2>
              <div className="space-y-12">
                {experiences.map((ex) => (
                  <div key={ex.id} className="relative pl-8 border-l-2 border-slate-800">
                    <div className="absolute w-4 h-4 bg-slate-900 border-2 border-purple-500 rounded-full -left-2.25 top-1.5" />
                    <h3 className="text-xl font-bold text-white mb-1">{ex.position}</h3>
                    <p className="text-lg text-purple-400 font-medium mb-2">{ex.company}</p>
                    {(ex.start_date || ex.end_date) && (
                      <p className="text-sm text-slate-500 mb-4 font-medium uppercase tracking-wider">
                        {formatDate(ex.start_date)} — {formatDate(ex.end_date) || "Present"}
                      </p>
                    )}
                    {ex.description && (
                      <p className="text-slate-400 leading-relaxed">{ex.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
                <span className="text-2xl">🎓</span> Education
              </h2>
              <div className="space-y-12">
                {education.map((ed) => (
                  <div key={ed.id} className="relative pl-8 border-l-2 border-slate-800">
                    <div className="absolute w-4 h-4 bg-slate-900 border-2 border-indigo-500 rounded-full -left-2.25 top-1.5" />
                    <h3 className="text-xl font-bold text-white mb-1">{ed.school}</h3>
                    {ed.degree && (
                      <p className="text-lg text-indigo-400 font-medium mb-2">{ed.degree}</p>
                    )}
                    {(ed.start_date || ed.end_date) && (
                      <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                        {formatDate(ed.start_date)} — {formatDate(ed.end_date) || "Present"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── CERTIFICATES ── */}
      {certificates.length > 0 && (
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-800/50">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">Licenses & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((c) => (
              <div key={c.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    📜
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight mb-1">{c.name}</h3>
                    <p className="text-slate-400 font-medium text-sm">{c.issuer}</p>
                  </div>
                </div>
                {c.issue_date && (
                  <p className="text-sm text-slate-500 mb-4">
                    Issued {formatDate(c.issue_date)}
                  </p>
                )}
                {c.description && (
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{c.description}</p>
                )}
                {c.credential_url && (
                  <a
                    href={c.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 mt-auto"
                  >
                    View Credential <span>→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 border-t border-slate-800/50 text-center">
        <p className="text-slate-500 flex items-center justify-center gap-2">
          Built with <span className="text-red-500 text-lg">♥</span> using{" "}
          <span className="font-semibold text-slate-300">PortfolioAI</span>
        </p>
      </footer>
    </div>
  );
}
