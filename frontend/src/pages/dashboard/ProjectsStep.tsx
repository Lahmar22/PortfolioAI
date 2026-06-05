import { useState, useEffect, type FormEvent } from "react";
import {
  getMyProjects,
  createProject,
  deleteProject,
} from "../../api/api";

interface Project {
  id: number;
  title: string;
  description: string;
  github_url: string;
}

interface Props {
  profileId: number;
  onNext: () => void;
  onBack: () => void;
}

export default function ProjectsStep({ profileId, onNext, onBack }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = () => {
    getMyProjects(profileId)
      .then((res) => setProjects(res.data.projects || []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  };

  useEffect(() => {
    if (profileId) load();
  }, [profileId]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      await createProject({
        profile_id: profileId,
        title,
        description,
        github_url: githubUrl,
      });
      setTitle("");
      setDescription("");
      setGithubUrl("");
      load();
    } catch {
      alert("Failed to add project");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id, profileId);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete project");
    }
  };

  if (!loaded) return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <svg className="animate-spin h-8 w-8 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading projects…
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl">
            🚀
          </div>
          <h2 className="text-3xl font-bold text-white">Projects</h2>
        </div>
        <p className="text-slate-400 text-lg">
          Showcase the projects you've built or contributed to.
        </p>
      </div>

      <form onSubmit={handleAdd} className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="project-title">Project Title</label>
            <input
              id="project-title"
              type="text"
              placeholder="e.g. Portfolio AI"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="project-github">GitHub URL</label>
            <input
              id="project-github"
              type="url"
              placeholder="https://github.com/…"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300" htmlFor="project-desc">Description</label>
          <textarea
            id="project-desc"
            placeholder="Brief description of the project…"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-y"
          />
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600 hover:text-white transition-colors font-medium flex items-center gap-2"
          >
            {saving ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "+ Add Project"}
          </button>
        </div>
      </form>

      {projects.length > 0 && (
        <div className="space-y-4 mb-8">
          {projects.map((p) => (
            <div key={p.id} className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl flex gap-4 group hover:border-slate-600 transition-colors">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{p.title}</h3>
                {p.description && (
                  <p className="text-slate-400 text-sm mb-3">{p.description}</p>
                )}
                {p.github_url && (
                  <a
                    href={p.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
              <button
                onClick={() => handleDelete(p.id)}
                title="Delete project"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {projects.length === 0 && (
        <div className="py-12 px-6 border-2 border-dashed border-slate-700 rounded-2xl text-center mb-8">
          <p className="text-slate-400">No projects added yet. Showcase your best work!</p>
        </div>
      )}

      <div className="pt-6 border-t border-slate-800 flex justify-between">
        <button 
          type="button" 
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium transition-colors"
        >
          ← Back
        </button>
        <button 
          type="button" 
          onClick={onNext}
          className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-lg"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
