import { useState, useEffect } from "react";
import { getAllTemplates } from "../../api/api";

interface Template {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  thumbnail_url: string;
  preview_url: string;
}

interface Props {
  selectedTemplate: number | null;
  onSelect: (id: number) => void;
  onGenerate: () => void;
  onBack: () => void;
}

export default function TemplateStep({
  selectedTemplate,
  onSelect,
  onGenerate,
  onBack,
}: Props) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllTemplates()
      .then((res) => setTemplates(res.data.templates || []))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded) return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <svg className="animate-spin h-8 w-8 text-emerald-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading templates…
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl">
            🎨
          </div>
          <h2 className="text-3xl font-bold text-white">Choose a Template</h2>
        </div>
        <p className="text-slate-400 text-lg">
          Select a design template for your portfolio, then generate it!
        </p>
      </div>

      {templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {templates.map((t) => (
            <div
              key={t.id}
              className={`relative bg-slate-800/50 rounded-2xl overflow-hidden cursor-pointer transition-all border-2 group ${
                selectedTemplate === t.id 
                  ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]" 
                  : "border-slate-700 hover:border-slate-500"
              }`}
              onClick={() => onSelect(t.id)}
            >
              <div className="aspect-[4/3] bg-slate-900 relative">
                {t.thumbnail_url ? (
                  <img
                    src={t.thumbnail_url}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl opacity-50">
                    🎨
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
                
                {selectedTemplate === t.id && (
                  <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Selected
                  </div>
                )}
              </div>
              
              <div className="p-5 relative z-10">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">{t.name}</h3>
                  {t.category && (
                    <span className="text-xs font-medium px-2 py-1 rounded-md bg-slate-700 text-slate-300 whitespace-nowrap">
                      {t.category}
                    </span>
                  )}
                </div>
                {t.description && (
                  <p className="text-slate-400 text-sm line-clamp-2">{t.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 px-6 border-2 border-dashed border-slate-700 rounded-2xl text-center mb-8 bg-slate-800/20">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-bold text-white mb-2">Ready to generate</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            No templates available yet. You can still generate your portfolio with the default design!
          </p>
        </div>
      )}

      <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
        <button 
          type="button" 
          onClick={onBack}
          className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium transition-colors"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onGenerate}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2 transform hover:-translate-y-1"
        >
          ✨ Generate Portfolio
        </button>
      </div>
    </div>
  );
}
