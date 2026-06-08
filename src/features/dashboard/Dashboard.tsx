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
    </div>
  );
}
