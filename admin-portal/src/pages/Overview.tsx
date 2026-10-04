import { useEffect, useState } from "react";
import { Users, Clock, CheckCircle2, XCircle, TrendingUp, Inbox } from "../lib/icons";
import { fetchApplications, fetchLeads, type Application, type Lead } from "../lib/adminStore";

export default function Overview() {
  const [apps, setApps] = useState<Application[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetchApplications().then(setApps);
    fetchLeads().then(setLeads);
  }, []);

  const count = (s: string) => apps.filter((a) => a.status === s).length;
  const kpis = [
    { icon: Users, label: "Total applications", value: apps.length, color: "from-blue-500 to-indigo-600" },
    { icon: Clock, label: "Under review", value: count("under_review") + count("pending"), color: "from-amber-500 to-orange-600" },
    { icon: CheckCircle2, label: "Approved", value: count("approved"), color: "from-emerald-500 to-teal-600" },
    { icon: XCircle, label: "Refused", value: count("refused"), color: "from-rose-500 to-red-600" },
  ];

  const statusBars = [
    { l: "Pending", v: count("pending"), c: "bg-slate-400" },
    { l: "Under Review", v: count("under_review"), c: "bg-amber-500" },
    { l: "Pending Docs", v: count("pending_docs"), c: "bg-orange-500" },
    { l: "Approved", v: count("approved"), c: "bg-emerald-500" },
    { l: "Refused", v: count("refused"), c: "bg-rose-500" },
  ];
  const total = Math.max(1, apps.length);

  const byCountry = Object.entries(
    apps.reduce<Record<string, number>>((acc, a) => {
      acc[a.country] = (acc[a.country] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">Operational Overview</h1>
        <p className="text-slate-600 mt-1">Manage applications, leads, pricing and documents across all 8 destinations.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl p-5 border border-slate-100">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${k.color} grid place-items-center text-white mb-3 shadow-lg`}>
              <k.icon className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-500">{k.label}</div>
            <div className="font-display text-2xl font-bold text-ink mt-0.5">{k.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-display font-bold text-ink mb-5">Case status distribution</h3>
          <div className="space-y-4">
            {statusBars.map((s) => (
              <div key={s.l}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-600 font-medium">{s.l}</span>
                  <span className="text-slate-500 font-semibold">{s.v}</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full ${s.c} rounded-full transition-all`} style={{ width: `${(s.v / total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-600 to-brand-800 text-white rounded-2xl p-6">
          <Inbox className="w-8 h-8 text-accent mb-3" />
          <div className="text-5xl font-display font-extrabold">{leads.length}</div>
          <div className="text-white/80 mt-1">New leads from booking form</div>
          <div className="mt-5 space-y-2 text-sm">
            {leads.slice(0, 3).map((l) => (
              <div key={l.id} className="bg-white/10 rounded-xl px-3 py-2 border border-white/10">
                <div className="font-semibold">{l.name}</div>
                <div className="text-white/60 text-xs">{l.visa_type} · {l.country}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-display font-bold text-ink mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-brand-600" /> Applications by destination</h3>
          <div className="space-y-3">
            {byCountry.map(([slug, n]) => (
              <div key={slug} className="flex items-center justify-between text-sm">
                <span className="capitalize text-slate-700 font-medium">{slug.replace("-", " ")}</span>
                <div className="flex-1 mx-4 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400" style={{ width: `${(n / total) * 100}%` }} />
                </div>
                <span className="font-semibold text-ink w-6 text-right">{n}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="font-display font-bold text-ink mb-4">Recent activity</h3>
          <div className="space-y-4">
            {[
              { who: "System", what: "3 new applications received", when: "just now", c: "bg-brand-500" },
              { who: "Admin", what: "Approved Tanvir Ahmed · Singapore EP", when: "1h ago", c: "bg-emerald-500" },
              { who: "Booking", what: "New lead — Arif Chowdhury", when: "2h ago", c: "bg-accent" },
              { who: "Admin", what: "Requested docs for Nusrat Jahan", when: "5h ago", c: "bg-orange-500" },
            ].map((a, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className={`w-2 h-2 rounded-full ${a.c} mt-2 flex-shrink-0`} />
                <div>
                  <div className="text-sm text-ink"><span className="font-semibold">{a.who}</span> {a.what}</div>
                  <div className="text-xs text-slate-500">{a.when}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
