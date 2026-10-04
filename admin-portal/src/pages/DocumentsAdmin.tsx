import { useEffect, useState } from "react";
import { FileText, CheckCircle2, XCircle, Clock, Download } from "../lib/icons";
import { fetchApplications, fetchDocuments, type Application, type Document } from "../lib/adminStore";

export default function DocumentsAdmin() {
  const [apps, setApps] = useState<Application[]>([]);
  const [active, setActive] = useState<string>("");
  const [docs, setDocs] = useState<Document[]>([]);

  useEffect(() => {
    fetchApplications().then((list) => {
      setApps(list);
      if (list[0]) setActive(list[0].id);
    });
  }, []);

  useEffect(() => { if (active) fetchDocuments(active).then(setDocs); }, [active]);

  const activeApp = apps.find((a) => a.id === active);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">Document Review</h1>
        <p className="text-slate-600 mt-1">Inspect and verify uploaded documents against each application.</p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-3 h-fit">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-3 py-2">Applications</div>
          {apps.map((a) => (
            <button
              key={a.id}
              onClick={() => setActive(a.id)}
              className={`w-full text-left px-3 py-3 rounded-xl mb-1 transition-colors ${active === a.id ? "bg-brand-50 border border-brand-100" : "hover:bg-slate-50"}`}
            >
              <div className="font-semibold text-sm text-ink">{a.applicant_name}</div>
              <div className="text-xs text-slate-500 capitalize">{a.country.replace("-", " ")} · {a.route}</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          {activeApp && (
            <>
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-display font-bold text-ink">{activeApp.applicant_name}</h3>
                  <p className="text-xs text-slate-500">{activeApp.email} · {activeApp.route}</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">{docs.length} files</span>
              </div>
              <div className="space-y-3">
                {docs.map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 grid place-items-center"><FileText className="w-5 h-5 text-slate-600" /></div>
                      <div>
                        <div className="font-medium text-sm text-ink">{d.name}</div>
                        <div className="text-xs text-slate-500">Uploaded</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                        d.status === "verified" ? "bg-emerald-100 text-emerald-700" : d.status === "rejected" ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"
                      }`}>
                        {d.status === "verified" ? <CheckCircle2 className="w-3 h-3" /> : d.status === "rejected" ? <XCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {d.status}
                      </span>
                      <a href={d.url} className="p-2 rounded-lg hover:bg-white text-slate-500"><Download className="w-4 h-4" /></a>
                    </div>
                  </div>
                ))}
                {docs.length === 0 && <p className="text-sm text-slate-500 py-8 text-center">No documents uploaded for this application yet.</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
