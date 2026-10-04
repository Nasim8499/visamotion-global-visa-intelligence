import { useEffect, useState } from "react";
import { Save, Globe2 } from "../lib/icons";
import { fetchDestinations, updateDestination, type Destination } from "../lib/adminStore";
import { formatBDT } from "../lib/utils";

export default function PricingAdmin() {
  const [dests, setDests] = useState<Destination[]>([]);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => { fetchDestinations().then(setDests); }, []);

  const patch = (id: string, field: "gov_fee_bdt" | "service_fee_bdt", value: number) => {
    setDests((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const save = async (d: Destination) => {
    await updateDestination(d.id, { gov_fee_bdt: d.gov_fee_bdt, service_fee_bdt: d.service_fee_bdt });
    setSaved(d.id);
    setTimeout(() => setSaved(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-ink">Destination Pricing & Fees</h1>
        <p className="text-slate-600 mt-1 flex items-center gap-2"><Globe2 className="w-4 h-4 text-brand-600" /> Update government fees and consultancy packages in BDT (৳).</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Destination</th>
                <th className="text-left px-5 py-3 font-semibold">Gov. fee (৳ BDT)</th>
                <th className="text-left px-5 py-3 font-semibold">Service pkg (৳ BDT)</th>
                <th className="text-left px-5 py-3 font-semibold">Total (৳)</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {dests.map((d) => (
                <tr key={d.id} className="border-t border-slate-100">
                  <td className="px-5 py-3.5">
                    <span className="text-xl mr-2">{d.flag}</span>
                    <span className="font-semibold text-ink">{d.name}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <input
                      type="number"
                      value={d.gov_fee_bdt}
                      onChange={(e) => patch(d.id, "gov_fee_bdt", +e.target.value)}
                      className="w-36 px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-400 focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <input
                      type="number"
                      value={d.service_fee_bdt}
                      onChange={(e) => patch(d.id, "service_fee_bdt", +e.target.value)}
                      className="w-36 px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-400 focus:outline-none text-sm"
                    />
                  </td>
                  <td className="px-5 py-3.5 font-bold text-brand-700 whitespace-nowrap">{formatBDT(d.gov_fee_bdt + d.service_fee_bdt)}</td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => save(d)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-600 text-white text-xs font-bold hover:bg-brand-700">
                      <Save className="w-3.5 h-3.5" /> {saved === d.id ? "Saved" : "Save"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-slate-500">Note: Government fees are indicative and set by the respective immigration authorities. Exchange reference: 1 USD ≈ 120 BDT.</p>
    </div>
  );
}
