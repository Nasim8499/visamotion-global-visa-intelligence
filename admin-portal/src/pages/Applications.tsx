import { useEffect, useState } from "react";
import { Search, CheckCircle2, Clock, XCircle, FileWarning } from "../lib/icons";
import { fetchApplications, updateApplicationStatus, type Application, type ApplicationStatus } from "../lib/adminStore";
import { statusMeta } from "../lib/utils";

const STATUSES: ApplicationStatus[] = ["pending", "under_review", "pending_docs", "approved", "refused"];

export default function Applications() {
  const [apps, setApps] = useState<Application[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | ApplicationStatus>("all");

  useEffect(() => { fetchApplications().then(setApps); }, []);

  const change = async (id: string, status: ApplicationStatus) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    await updateApplicationStatus(id, status);
  };

  const filtered = apps.filter((a) => {
    const matchQ = (a.applicant_name + a.email + a.country).toLowerCase().includes(q.toLowerCase());
    const matchF = filter === "all" || a.status === filter;
    return matchQ && matchF;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">Applications</h1>
          <p className="text-slate-600 mt-1">Approve, review, request docs or refuse cases. {filtered.length} shown.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search applicant..." className="pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 focus:border-brand-400 focus:outline-none text-sm w-full md:w-72" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter("all")} className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${filter === "all" ? "bg-ink text-white border-ink" : "bg-white text-slate-600 border-slate-200"}`}>All</button>
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-1.5 rounded-full text-xs font-semibold border ${filter === s ? "bg-ink text-white border-ink" : "bg-white text-slate-600 border-slate-200"}`}>
            {statusMeta[s].label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Applicant</th>
                <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Destination</th>
                <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Route</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
                <th className="text-left px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-ink">{a.applicant_name}</div>
                    <div className="text-xs text-slate-500">{a.email}</div>
                  </td>
                  <td className="px-5 py-3.5 capitalize text-slate-600 hidden md:table-cell">{a.country.replace("-", " ")}</td>
                  <td className="px-5 py-3.5 text-slate-600 hidden lg:table-cell">{a.route}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${statusMeta[a.status].cls}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusMeta[a.status].dot}`} /> {statusMeta[a.status].label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      <Action icon={CheckCircle2} label="Approve" tone="emerald" onClick={() => change(a.id, "approved")} />
                      <Action icon={Clock} label="Review" tone="amber" onClick={() => change(a.id, "under_review")} />
                      <Action icon={FileWarning} label="Docs" tone="orange" onClick={() => change(a.id, "pending_docs")} />
                      <Action icon={XCircle} label="Refuse" tone="rose" onClick={() => change(a.id, "refused")} />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-slate-500">No applications match your filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Action({ icon: Icon, label, tone, onClick }: { icon: typeof CheckCircle2; label: string; tone: string; onClick: () => void }) {
  const tones: Record<string, string> = {
    emerald: "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200",
    amber: "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200",
    orange: "hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200",
    rose: "hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200",
  };
  return (
    <button onClick={onClick} title={label} className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold transition-colors ${tones[tone]}`}>
      <Icon className="w-3.5 h-3.5" /> {label}
    </button>
  );
}
