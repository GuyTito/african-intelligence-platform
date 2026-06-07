import {
  // TrendingUp,
  // TrendingDown,
  // DollarSign,
  Activity,
  // Users,
  Globe,
  Download,
  Search,
  // Filter,
  // AlertCircle,
  // BarChart3,
  // Map as MapIcon,
  // ChevronDown,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Globe className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">
                African Economic Intelligence
              </h1>
              <p className="text-xs text-slate-400">
                Executive Overview Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full">
              <Activity size={14} className="text-emerald-400 animate-pulse" />
              Live System Status
            </div>
            <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
              <Search size={18} className="text-slate-400" />
            </button>
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-slate-700">
              <Download size={16} />
              <span className="hidden sm:inline">Export Report</span>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
