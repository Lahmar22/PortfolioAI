import { useState, useEffect, type FormEvent } from "react";
import {
  getMyCertificates,
  createCertificate,
  deleteCertificate,
} from "../../api/api";

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issue_date: string;
  expiration_date: string;
  credential_url: string;
  description: string;
}

interface Props {
  profileId: number;
  onNext: () => void;
  onBack: () => void;
}

export default function CertificatesStep({
  profileId,
  onNext,
  onBack,
}: Props) {
  const [items, setItems] = useState<Certificate[]>([]);
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = () => {
    getMyCertificates(profileId)
      .then((res) => setItems(res.data.certificates || []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  };

  useEffect(() => {
    if (profileId) load();
  }, [profileId]);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !issuer.trim()) return;
    setSaving(true);
    try {
      await createCertificate({
        profile_id: profileId,
        name,
        issuer,
        issue_date: issueDate || undefined,
        expiration_date: expirationDate || undefined,
        credential_url: credentialUrl || undefined,
        description: description || undefined,
      });
      setName("");
      setIssuer("");
      setIssueDate("");
      setExpirationDate("");
      setCredentialUrl("");
      setDescription("");
      load();
    } catch {
      alert("Failed to add certificate");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCertificate(id, profileId);
      setItems((prev) => prev.filter((c) => c.id !== id));
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
      <svg className="animate-spin h-8 w-8 text-amber-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading certificates…
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl">
            📜
          </div>
          <h2 className="text-3xl font-bold text-white">Certificates</h2>
        </div>
        <p className="text-slate-400 text-lg">
          Add your certifications and accreditations.
        </p>
      </div>

      <form onSubmit={handleAdd} className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="cert-name">Certificate Name</label>
            <input
              id="cert-name"
              type="text"
              placeholder="e.g. AWS Solutions Architect"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="cert-issuer">Issuer</label>
            <input
              id="cert-issuer"
              type="text"
              placeholder="e.g. Amazon Web Services"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="cert-issue-date">Issue Date</label>
            <input
              id="cert-issue-date"
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all [color-scheme:dark]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="cert-exp-date">Expiration Date</label>
            <input
              id="cert-exp-date"
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all [color-scheme:dark]"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300" htmlFor="cert-url">Credential URL</label>
          <input
            id="cert-url"
            type="url"
            placeholder="https://credential.example.com/…"
            value={credentialUrl}
            onChange={(e) => setCredentialUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-300" htmlFor="cert-desc">Description</label>
          <textarea
            id="cert-desc"
            placeholder="Brief description…"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all resize-y"
          />
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:bg-amber-600 hover:text-white transition-colors font-medium flex items-center gap-2"
          >
            {saving ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "+ Add Certificate"}
          </button>
        </div>
      </form>

      {items.length > 0 && (
        <div className="space-y-4 mb-8">
          {items.map((c) => (
            <div key={c.id} className="bg-slate-800/50 border border-slate-700 p-5 rounded-2xl flex gap-4 group hover:border-slate-600 transition-colors">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{c.name}</h3>
                <p className="text-amber-400 font-medium mb-2">by {c.issuer}</p>
                {c.issue_date && (
                  <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">
                    Issued: {formatDate(c.issue_date)}
                    {c.expiration_date &&
                      ` · Expires: ${formatDate(c.expiration_date)}`}
                  </p>
                )}
                {c.credential_url && (
                  <a
                    href={c.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View credential ↗
                  </a>
                )}
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                title="Delete certificate"
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
          <p className="text-slate-400">No certificates added yet.</p>
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
