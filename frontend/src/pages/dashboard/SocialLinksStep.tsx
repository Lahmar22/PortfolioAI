import { useState, useEffect, type FormEvent } from "react";
import {
  getMySocialLinks,
  createSocialLink,
  deleteSocialLink,
} from "../../api/api";

interface SocialLink {
  id: number;
  platform: string;
  url: string;
}

const PLATFORMS = [
  "GitHub",
  "LinkedIn",
  "Twitter",
  "Instagram",
  "Facebook",
  "YouTube",
  "Dribbble",
  "Behance",
  "Medium",
  "Dev.to",
  "Stack Overflow",
  "Other",
];

const PLATFORM_ICONS: Record<string, string> = {
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
  Other: "🔗",
};

interface Props {
  profileId: number;
  onNext: () => void;
  onBack: () => void;
}

export default function SocialLinksStep({ profileId, onNext, onBack }: Props) {
  const [items, setItems] = useState<SocialLink[]>([]);
  const [platform, setPlatform] = useState("GitHub");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = () => {
    getMySocialLinks(profileId)
      .then((res) => setItems(res.data.socialLinks || []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  };

  useEffect(() => {
    if (profileId) load();
  }, [profileId]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setSaving(true);
    try {
      await createSocialLink({ profile_id: profileId, platform, url });
      setUrl("");
      load();
    } catch {
      alert("Failed to add social link");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSocialLink(id, profileId);
      setItems((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  if (!loaded) return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading social links…
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl">
            🌐
          </div>
          <h2 className="text-3xl font-bold text-white">Social Links</h2>
        </div>
        <p className="text-slate-400 text-lg">
          Connect your social media and professional profiles.
        </p>
      </div>

      <form onSubmit={handleAdd} className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700 mb-8 flex flex-col sm:flex-row gap-4 items-end">
        <div className="w-full sm:w-1/3 space-y-1.5">
          <label className="block text-sm font-medium text-slate-300" htmlFor="social-platform">Platform</label>
          <div className="relative">
            <select
              id="social-platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {PLATFORM_ICONS[p]} {p}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full space-y-1.5">
          <label className="block text-sm font-medium text-slate-300" htmlFor="social-url">URL</label>
          <input
            id="social-url"
            type="url"
            placeholder="https://…"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto px-6 h-[50px] rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors font-medium flex items-center justify-center min-w-[100px]"
        >
          {saving ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : "+ Add"}
        </button>
      </form>

      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {items.map((s) => (
            <div key={s.id} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center justify-between group hover:border-slate-600 transition-colors">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-xl flex-shrink-0">
                  {PLATFORM_ICONS[s.platform] || "🔗"}
                </div>
                <div className="overflow-hidden">
                  <span className="block font-medium text-white">{s.platform}</span>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-blue-400 transition-colors truncate block max-w-[200px]"
                  >
                    {s.url.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleDelete(s.id)}
                title="Delete social link"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0 ml-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <div className="py-12 px-6 border-2 border-dashed border-slate-700 rounded-2xl text-center mb-8">
          <p className="text-slate-400">No social links added yet.</p>
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
