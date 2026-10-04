import { useState } from "react";
import { LayoutDashboard, Users, Inbox, Globe2, FileText, ShieldCheck, LogOut, Menu, X } from "@/lib/icons";
import { motion, AnimatePresence } from "framer-motion";
import Overview from "./pages/Overview";
import Applications from "./pages/Applications";
import Leads from "./pages/Leads";
import PricingAdmin from "./pages/PricingAdmin";
import DocumentsAdmin from "./pages/DocumentsAdmin";
import { usingSupabase } from "./lib/adminStore";

type Tab = "overview" | "applications" | "leads" | "pricing" | "documents";

const nav: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "applications", label: "Applications", icon: Users },
  { id: "leads", label: "Leads", icon: Inbox },
  { id: "pricing", label: "Pricing & Fees", icon: Globe2 },
  { id: "documents", label: "Documents", icon: FileText },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("overview");
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className={`fixed lg:static z-40 inset-y-0 left-0 w-64 bg-ink text-white flex flex-col transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center shadow-lg">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2l7.5 3.75L12 11.7 4.5 7.95 12 4.2z" /></svg>
          </div>
          <div className="leading-tight">
            <div className="font-display font-extrabold">Visamotion</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">Admin Portal</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => { setTab(n.id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors ${
                tab === n.id ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30" : "text-white/70 hover:bg-white/5"
              }`}
            >
              <n.icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} /> {n.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className={`mb-2 px-3 py-2 rounded-xl text-[11px] font-semibold ${usingSupabase ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>
            {usingSupabase ? "● Supabase connected" : "● Demo mode (mock data)"}
          </div>
          <button className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-rose-300 hover:bg-rose-500/10">
            <LogOut style={{ width: 16, height: 16 }} /> Sign out
          </button>
        </div>
      </aside>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-30 lg:hidden" />}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 h-16 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen((v) => !v)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              {nav.find((n) => n.id === tab)?.label}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-slate-500">Banani C/A, Dhaka</span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white text-sm font-bold">AD</div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              {tab === "overview" && <Overview />}
              {tab === "applications" && <Applications />}
              {tab === "leads" && <Leads />}
              {tab === "pricing" && <PricingAdmin />}
              {tab === "documents" && <DocumentsAdmin />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
