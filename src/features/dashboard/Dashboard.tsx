import { Header } from "./Header";
import { KPISection } from "./KPISection";
import { GDPGrowthTrend } from "./GDPGrowthTrend";
import { TopEconomies } from "./TopEconomies";
import { MacroeconomicTable } from "./MacroeconomicTable";

export default function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">
      <Header />
      <KPISection />
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GDPGrowthTrend />
        <TopEconomies />
      </div>
      <MacroeconomicTable />

      <footer className="border-t border-slate-800 bg-slate-900 mt-12 py-8">
        <div className="px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm">
            © 2026 African Economic Intelligence. Data sourced from World Bank
            Open Data.
          </div>
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <a
              href="https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              API Access
            </a>
            <a
              href="https://github.com/guytito/african-intelligence-platform"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
