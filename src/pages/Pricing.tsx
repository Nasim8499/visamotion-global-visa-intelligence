import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { PageHero, SectionTitle, fadeUp, stagger } from "../components/ui";
import { pricing, faqs, govFees } from "../data/site";
import { useState } from "react";

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  return (
    <>
      <PageHero
        crumb="Pricing"
        title={<>Simple, transparent <span className="gradient-text">pricing.</span></>}
        subtitle="Flat-fee packages. No hidden charges. Pay in installments if you need to."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-slate-100 rounded-full p-1">
              <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!annual ? "bg-white shadow text-ink" : "text-slate-500"}`}>
                One-time
              </button>
              <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${annual ? "bg-white shadow text-ink" : "text-slate-500"}`}>
                Installments <span className="ml-1 text-xs text-brand-600">save 5%</span>
              </button>
            </div>
          </div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {pricing.map((p) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                className={`relative rounded-3xl p-8 border-2 transition-all ${
                  p.highlight ? "bg-gradient-to-br from-brand-600 to-brand-800 text-white border-brand-600 shadow-2xl shadow-brand-500/30 scale-[1.02]" : "bg-white border-slate-100"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-ink text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </span>
                )}
                <div className={p.highlight ? "text-white/80" : "text-slate-500"}>{p.tag}</div>
                <h3 className={`font-display text-2xl font-bold mt-1 ${p.highlight ? "text-white" : "text-ink"}`}>{p.name}</h3>
                <div className="mt-5">
                  <div className="flex items-end gap-1">
                    <span className={`font-display text-5xl font-extrabold ${p.highlight ? "text-white" : "text-ink"}`}>
                      ৳{(annual ? Math.round(p.price * 0.95) : p.price).toLocaleString("en-BD")}
                    </span>
                    <span className={`pb-2 text-sm ${p.highlight ? "text-white/70" : "text-slate-500"}`}>/case</span>
                  </div>
                  <div className={`text-xs mt-1 ${p.highlight ? "text-white/60" : "text-slate-400"}`}>
                    ≈ ${annual ? Math.round(p.usd * 0.95) : p.usd} USD
                  </div>
                </div>
                <ul className={`mt-6 space-y-3 text-sm ${p.highlight ? "text-white/90" : "text-slate-700"}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${p.highlight ? "text-accent" : "text-brand-600"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`mt-8 w-full py-3.5 rounded-full font-semibold transition-all ${
                  p.highlight ? "bg-accent text-ink hover:bg-white" : "bg-ink text-white hover:bg-brand-700"
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionTitle center eyebrow="Transparent Fees" title={<>Government fees <span className="gradient-text">at a glance.</span></>} subtitle="Official visa fees are paid directly to the immigration authority. Consultancy packages are separate." />
          </div>
          <div className="rounded-3xl border border-slate-100 overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_0.8fr] bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <div className="px-5 py-3">Country / route</div>
              <div className="px-5 py-3">Government fee (৳ BDT)</div>
              <div className="px-5 py-3 text-right">≈ USD</div>
            </div>
            {govFees.map((f) => (
              <div key={f.country + f.route} className="grid grid-cols-[1.4fr_1fr_0.8fr] border-t border-slate-100 text-sm">
                <div className="px-5 py-3">
                  <div className="font-semibold text-ink">{f.country}</div>
                  <div className="text-xs text-slate-500">{f.route}</div>
                </div>
                <div className="px-5 py-3 font-bold text-brand-700">৳{f.bdt.toLocaleString("en-BD")}</div>
                <div className="px-5 py-3 text-right text-slate-500">${f.usd}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionTitle center eyebrow="FAQ" title={<>Pricing <span className="gradient-text">questions.</span></>} />
          </div>
          <div className="space-y-3">
            {faqs.slice(0, 4).map((f, i) => (
              <motion.details
                key={f.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-2xl border border-slate-100 p-5"
              >
                <summary className="cursor-pointer flex items-center justify-between font-display font-semibold text-ink">
                  {f.q}
                  <span className="w-7 h-7 rounded-full bg-slate-100 grid place-items-center group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
