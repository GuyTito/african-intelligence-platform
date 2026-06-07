import { TrendingDown, TrendingUp } from "lucide-react";

export const KPICard = ({
  title,
  value,
  trend,
  subtitle,
  icon: Icon,
  inverseTrend = false,
  isLoading = false,
}: any) => {
  const isPositive = trend > 0;
  const isGood = inverseTrend ? !isPositive : isPositive;

  if (isLoading) {
    return (
      <div className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-xl animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="h-4 bg-slate-600 rounded w-24"></div>
          <div className="h-8 w-8 bg-slate-600 rounded-full"></div>
        </div>
        <div className="h-8 bg-slate-600 rounded w-32 mb-2"></div>
        <div className="h-3 bg-slate-600 rounded w-20"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl shadow-lg hover:border-slate-600 transition-colors group cursor-pointer relative overflow-hidden">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-slate-700/10 rounded-full group-hover:scale-150 transition-transform duration-500 blur-2xl"></div>

      <div className="flex justify-between items-start mb-2 relative">
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <div className="p-2 bg-slate-700/50 rounded-lg text-slate-300">
          <Icon size={18} />
        </div>
      </div>

      <div className="relative">
        <div className="text-3xl font-bold text-white mb-1 tracking-tight">
          {value ? value : "N/A"}
        </div>
        <div className="flex items-center gap-2">
          {trend !== null && trend !== undefined && (
            <div
              className={`flex items-center text-xs font-semibold px-2 py-1 rounded-md ${
                isGood
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-rose-500/10 text-rose-400"
              }`}
            >
              {isPositive ? (
                <TrendingUp size={12} className="mr-1" />
              ) : (
                <TrendingDown size={12} className="mr-1" />
              )}
              {Math.abs(trend).toFixed(1)}% YoY
            </div>
          )}
          {subtitle && (
            <span className="text-slate-500 text-xs">{subtitle}</span>
          )}
        </div>
      </div>
    </div>
  );
};
