import { Header } from "./Header";
import { KPISection } from "./KPISection";

export default function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">
      <Header />
      <KPISection />
    </div>
  );
}
