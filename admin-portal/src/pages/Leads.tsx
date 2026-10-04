import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Search, Inbox } from "../lib/icons";
import { fetchLeads, type Lead } from "../lib/adminStore";

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [q, setQ] = useState("");
  useEffect(() => { fetchLeads().then(setLeads); }, []);

  const filtered = leads.filter((l) => (l.name + l.email + l.country + l.visa_type).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">Leads — Booking Form</h1>
          <p className="text-slate-600 mt-1">Enquiries captured from the client site's consultation form.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search leads..." className="pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 focus:border-brand-400 focus:outline-none text-sm w-full md:w-72" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-500">
          <Inbox className="w-10 h-10 mx-auto mb-3 text-slate-300" /> No leads found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((l) => (
            <div key={l.id} className="bg-white rounded-2xl border border-slate-100 p-5 card-hover">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-display font-bold text-ink">{l.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5 capitalize">{l.country.replace("-", " ")} · {l.visa_type}</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-brand-50 text-brand-700 uppercase">new</span>
              </div>
              <p className="mt-3 text-sm text-slate-600 line-clamp-2">{l.message}</p>
              <div className="mt-4 space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-brand-600" /> {l.email}</div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-brand-600" /> {l.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-brand-600" /> {l.created_at}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <a href={`mailto:${l.email}`} className="flex-1 text-center py-2 rounded-lg bg-brand-600 text-white text-xs font-bold">Reply</a>
                <a href={`tel:${l.phone}`} className="flex-1 text-center py-2 rounded-lg border border-slate-200 text-xs font-bold text-ink">Call</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
