import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-900 text-slate-200">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[100px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-fuchsia-600/20 blur-[150px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <span className="text-purple-400 text-2xl">⬡</span>
          <span>PortfolioAI</span>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link to="/dashboard" className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all shadow-[0_0_15px_rgba(147,51,234,0.5)]">
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2.5 rounded-full text-slate-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center max-w-5xl mx-auto py-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-sm font-medium text-slate-300 mb-8">
          ✨ AI-Powered Portfolio Builder
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">Professional Portfolio</span>{" "}
          in Minutes
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Create a stunning, personalized portfolio website by simply filling in
          your information. Choose from beautiful templates and let PortfolioAI
          do the rest.
        </p>
        
        <div className="mb-24">
          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-lg font-semibold transition-all shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_40px_rgba(147,51,234,0.6)]"
          >
            Start Building — It's Free
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl text-left hover:bg-slate-800/60 transition-colors">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 text-2xl mb-6">⚡</div>
            <h3 className="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
            <p className="text-slate-400 leading-relaxed">Fill in your info and generate your portfolio in under 5 minutes without touching any code.</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl text-left hover:bg-slate-800/60 transition-colors">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-400 text-2xl mb-6">🎨</div>
            <h3 className="text-xl font-semibold text-white mb-3">Beautiful Templates</h3>
            <p className="text-slate-400 leading-relaxed">Choose from professionally designed templates that stand out and make a great impression.</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl text-left hover:bg-slate-800/60 transition-colors">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 text-2xl mb-6">📱</div>
            <h3 className="text-xl font-semibold text-white mb-3">Fully Responsive</h3>
            <p className="text-slate-400 leading-relaxed">Your portfolio looks perfect on every device and screen size, from mobile phones to large desktop monitors.</p>
          </div>
        </div>
      </main>
    </div>
  );
}