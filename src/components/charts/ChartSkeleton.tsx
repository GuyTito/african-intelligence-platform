export function ChartSkeleton() {
  const lineWidths = ["70%", "80%", "65%", "75%"];

  return (
    <div className="w-full h-full bg-slate-800/30 rounded-lg p-4">
      {/* Chart title skeleton */}
      <div className="h-6 bg-slate-600/50 rounded w-48 mb-4 animate-pulse" />

      {/* Legend skeleton */}
      <div className="flex gap-4 mb-6">
        <div className="h-3 bg-slate-600/50 rounded w-16 animate-pulse" />
        <div className="h-3 bg-slate-600/50 rounded w-16 animate-pulse" />
        <div className="h-3 bg-slate-600/50 rounded w-16 animate-pulse" />
      </div>

      {/* Chart content skeleton - simulates chart grid */}
      <div className="relative h-100">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between py-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-3 bg-slate-600/40 rounded w-full animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        {/* Chart grid lines with chart line placeholders */}
        <div className="ml-10 h-full flex flex-col justify-between py-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="relative">
              <div className="h-px bg-slate-600/30 w-full" />
              {/* Simulated chart line - only on content rows */}
              {i < 4 && (
                <div
                  className="absolute top-0 h-1 bg-blue-500/20 rounded-full animate-pulse"
                  style={{
                    width: lineWidths[i],
                    animationDelay: `${i * 150}ms`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-10 right-0 flex justify-between px-4">
          {["2020", "2021", "2022", "2023", "2024", "2025"].map((year, i) => (
            <div
              key={year}
              className="h-3 bg-slate-600/40 rounded w-8 animate-pulse"
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
