import { useState, useEffect, type FormEvent } from "react";
import { getMyProfile, updateProfile } from "../../api/api";

interface Props {
  onNext: () => void;
}

export default function ProfileStep({ onNext }: Props) {
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        const p = res.data.profile;
        setTitle(p.title || "");
        setBio(p.bio || "");
        setLocation(p.location || "");
        setWebsite(p.website || "");
        setCvUrl(p.cv_url || "");
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({ title, bio, location, website, cv_url: cvUrl });
      onNext();
    } catch {
      alert("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <svg className="animate-spin h-8 w-8 text-purple-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading profile…
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl">
            👤
          </div>
          <h2 className="text-3xl font-bold text-white">Personal Profile</h2>
        </div>
        <p className="text-slate-400 text-lg">
          Tell us about yourself — this will appear at the top of your portfolio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300" htmlFor="profile-title">Professional Title</label>
          <input
            id="profile-title"
            type="text"
            placeholder="e.g. Full Stack Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300" htmlFor="profile-bio">Bio</label>
          <textarea
            id="profile-bio"
            placeholder="Write a brief description about yourself…"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all resize-y"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="profile-location">Location</label>
            <input
              id="profile-location"
              type="text"
              placeholder="e.g. Casablanca, Morocco"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="profile-website">Website</label>
            <input
              id="profile-website"
              type="url"
              placeholder="https://yoursite.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300" htmlFor="profile-cv">CV / Resume URL</label>
          <input
            id="profile-cv"
            type="url"
            placeholder="https://example.com/cv.pdf"
            value={cvUrl}
            onChange={(e) => setCvUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
          />
        </div>

        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed min-w-[160px]"
            disabled={saving}
          >
            {saving ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Save & Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}
