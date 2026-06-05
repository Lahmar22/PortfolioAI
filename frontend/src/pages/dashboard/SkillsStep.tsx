import { useState, useEffect, type FormEvent } from "react";
import { getMySkills, createSkill, deleteSkill } from "../../api/api";

interface Skill {
  id: number;
  name: string;
  level: number;
}

interface Props {
  profileId: number;
  onNext: () => void;
  onBack: () => void;
}

export default function SkillsStep({ profileId, onNext, onBack }: Props) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState(3);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = () => {
    getMySkills(profileId)
      .then((res) => setSkills(res.data.skills || []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  };

  useEffect(() => {
    if (profileId) load();
  }, [profileId]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await createSkill({ profile_id: profileId, name, level });
      setName("");
      setLevel(3);
      load();
    } catch {
      alert("Failed to add skill");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSkill(id, profileId);
      setSkills((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete skill");
    }
  };

  if (!loaded) return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <svg className="animate-spin h-8 w-8 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading skills…
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl">
            ⚡
          </div>
          <h2 className="text-3xl font-bold text-white">Skills</h2>
        </div>
        <p className="text-slate-400 text-lg">
          Add your technical and professional skills.
        </p>
      </div>

      <form onSubmit={handleAdd} className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700 mb-8 flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full space-y-1.5">
          <label className="block text-sm font-medium text-slate-300" htmlFor="skill-name">Skill Name</label>
          <input
            id="skill-name"
            type="text"
            placeholder="e.g. React, Python, Figma…"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
          />
        </div>
        
        <div className="w-full sm:w-48 space-y-1.5">
          <label className="block text-sm font-medium text-slate-300 flex justify-between" htmlFor="skill-level">
            <span>Level</span>
            <span className="text-purple-400 font-bold">{level}<span className="text-slate-500 text-xs font-normal">/5</span></span>
          </label>
          <div className="h-[50px] flex items-center px-2">
            <input
              id="skill-level"
              type="range"
              min={1}
              max={5}
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto px-6 h-[50px] rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600 hover:text-white transition-colors font-medium flex items-center justify-center min-w-[100px]"
        >
          {saving ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : "+ Add"}
        </button>
      </form>

      {skills.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {skills.map((s) => (
            <div key={s.id} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center justify-between group hover:border-slate-600 transition-colors">
              <div>
                <span className="block font-medium text-white mb-2">{s.name}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`w-6 h-2 rounded-full ${n <= s.level ? "bg-purple-500" : "bg-slate-700"}`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleDelete(s.id)}
                title="Delete skill"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {skills.length === 0 && (
        <div className="py-12 px-6 border-2 border-dashed border-slate-700 rounded-2xl text-center mb-8">
          <p className="text-slate-400">No skills added yet. Add your first skill above!</p>
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
