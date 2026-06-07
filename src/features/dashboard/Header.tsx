import { Globe } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className=" h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Globe className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              African Economic Intelligence
            </h1>
            <p className="text-xs text-slate-400">
              Executive Overview Dashboard
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
