import { useState, useEffect, type FormEvent } from "react";
import {
  getMyExperiences,
  createExperience,
  deleteExperience,
} from "../../api/api";

interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  start_date: string;
  end_date: string;
}

interface Props {
  profileId: number;
  onNext: () => void;
  onBack: () => void;
}

export default function ExperienceStep({ profileId, onNext, onBack }: Props) {
  const [items, setItems] = useState<Experience[]>([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = () => {
    getMyExperiences(profileId)
      .then((res) => setItems(res.data.experiences || []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  };

  useEffect(() => {
    if (profileId) load();
  }, [profileId]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !position.trim()) return;
    setSaving(true);
    try {
      await createExperience({
        profile_id: profileId,
        company,
        position,
        description,
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      });
      setCompany("");
      setPosition("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      load();
    } catch {
      alert("Failed to add experience");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExperience(id, profileId);
      setItems((prev) => prev.filter((ex) => ex.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  if (!loaded) return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <svg className="animate-spin h-8 w-8 text-fuchsia-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading experience…
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center text-2xl">
            💼
          </div>
          <h2 className="text-3xl font-bold text-white">Experience</h2>
        </div>
        <p className="text-slate-400 text-lg">
          Add your work experience and professional history.
        </p>
      </div>

      <form onSubmit={handleAdd} className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="exp-company">Company</label>
            <input
              id="exp-company"
              type="text"
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="exp-position">Position</label>
            <input
              id="exp-position"
              type="text"
              placeholder="e.g. Software Engineer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300" htmlFor="exp-desc">Description</label>
          <textarea
            id="exp-desc"
            placeholder="Key responsibilities and achievements…"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all resize-y"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="exp-start">Start Date</label>
            <input
              id="exp-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all [color-scheme:dark]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="exp-end">End Date</label>
            <input
              id="exp-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all [color-scheme:dark]"
            />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/30 hover:bg-fuchsia-600 hover:text-white transition-colors font-medium flex items-center gap-2"
          >
            {saving ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "+ Add Experience"}
          </button>
        </div>
      </form>

      {items.length > 0 && (
        <div className="space-y-4 mb-8">
          {items.map((ex) => (
            <div key={ex.id} className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl flex gap-4 group hover:border-slate-600 transition-colors">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{ex.position} <span className="text-fuchsia-400 font-medium text-base">@ {ex.company}</span></h3>
                {ex.description && (
                  <p className="text-slate-400 text-sm mb-3 whitespace-pre-wrap">{ex.description}</p>
                )}
                {(ex.start_date || ex.end_date) && (
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                    {formatDate(ex.start_date)} —{" "}
                    {formatDate(ex.end_date) || "Present"}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleDelete(ex.id)}
                title="Delete experience"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <div className="py-12 px-6 border-2 border-dashed border-slate-700 rounded-2xl text-center mb-8">
          <p className="text-slate-400">No experience entries yet.</p>
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
