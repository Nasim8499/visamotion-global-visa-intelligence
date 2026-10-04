import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Clock, Wallet, FileText, ShieldCheck,
  X, ZoomIn, Stamp, Plane, MapPin, Phone, Mail, Sparkles,
} from "lucide-react";
import { PageHero, SectionTitle, fadeUp, stagger } from "../components/ui";
import { destinationMap, destinations } from "../data/destinations";
import VisaSpecimen from "../components/VisaSpecimen";
import { formatBDT } from "../data/site";

export default function CountryDetail() {
  const { slug } = useParams();
  const dest = slug ? destinationMap[slug] : undefined;
  const [lightbox, setLightbox] = useState(false);

  if (!dest) return <Navigate to="/countries" replace />;
  const others = destinations.filter((d) => d.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumb={dest.name}
        title={<>{dest.flag} {dest.name} <span className="gradient-text">visa routes.</span></>}
        subtitle={dest.tagline}
        image={dest.image}
      />

      {/* Quick facts */}
      <section className="py-10 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Plane, label: "Visa routes", value: `${dest.routes.length}` },
            { icon: Clock, label: "Processing", value: dest.timeline },
            { icon: Wallet, label: "Gov. fee from", value: formatBDT(Math.min(...dest.routes.map((r) => r.govFee))) },
            { icon: FileText, label: "Documents", value: `${dest.checklist.length}+ items` },
          ].map((f, i) => (
            <motion.div key={f.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <f.icon className="w-5 h-5 text-brand-600 mb-2" />
              <div className="text-xs text-slate-500">{f.label}</div>
              <div className="font-display font-bold text-ink mt-0.5">{f.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Routes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow="Visa Routes" title={<>Programs & <span className="gradient-text">pathways.</span></>} subtitle={`Every route available for ${dest.name}, with transparent government fees in BDT and USD.`} />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dest.routes.map((r) => (
              <motion.div key={r.code} variants={fadeUp} className="bg-white rounded-3xl border border-slate-100 p-7 card-hover flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-50 text-brand-700 uppercase tracking-wider">{r.code}</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {r.duration}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{r.name}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{r.desc}</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Gov. fee</div>
                    <div className="font-bold text-ink text-sm">{formatBDT(r.govFee)}</div>
                    <div className="text-[10px] text-slate-400">≈ ${r.govFee / 120 > 0 ? Math.round(r.govFee / 120) : 0} USD</div>
                  </div>
                  <div className="bg-brand-50 rounded-xl p-3">
                    <div className="text-[10px] uppercase tracking-wider text-brand-600/70">Service pkg</div>
                    <div className="font-bold text-brand-800 text-sm">{formatBDT(r.serviceFee)}</div>
                    <div className="text-[10px] text-brand-600/60">≈ ${Math.round(r.serviceFee / 120)} USD</div>
                  </div>
                </div>
                <ul className="mt-5 space-y-2">
                  {r.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" /> {req}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Breakdown */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {dest.breakdown.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white rounded-3xl border border-slate-100 p-7">
                <h3 className="font-display text-xl font-bold text-ink flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-brand-600 text-white grid place-items-center text-sm">{i + 1}</span>
                  {b.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {b.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Visual specimen */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-white rounded-3xl border border-slate-100 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-ink mb-3">
                <Stamp className="w-4 h-4 text-brand-600" /> Visa specimen
              </div>
              <button onClick={() => setLightbox(true)} className="relative block w-full group" aria-label="Open specimen viewer">
                <VisaSpecimen dest={dest} compact />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 group-hover:bg-ink/40 transition-colors rounded-2xl">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-ink text-sm font-bold shadow-lg">
                    <ZoomIn className="w-4 h-4" /> Zoom specimen
                  </span>
                </span>
              </button>
              <button onClick={() => setLightbox(true)} className="mt-4 w-full py-3 rounded-full bg-ink text-white font-semibold text-sm inline-flex items-center justify-center gap-2">
                <ZoomIn className="w-4 h-4" /> View full specimen
              </button>
            </div>

            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-7 text-white">
              <Sparkles className="w-7 h-7 text-accent" />
              <h3 className="mt-3 font-display text-xl font-bold">Start your {dest.name} case</h3>
              <p className="mt-2 text-white/80 text-sm">Free eligibility check — a licensed advisor replies within 24 hours.</p>
              <Link to="/contact" className="mt-5 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-white text-ink font-bold hover:bg-accent transition-colors">
                Book consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-6">
              <h3 className="font-display font-bold text-ink mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand-600" /> 01619-064013</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand-600" /> info.intlimmigrationconsultancy@gmail.com</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-brand-600" /> Banani C/A, Dhaka, Bangladesh</li>
              </ul>
            </div>

            <div className="bg-slate-900 rounded-3xl p-7 text-white">
              <h3 className="font-display font-bold mb-4">Other destinations</h3>
              <ul className="space-y-1">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link to={`/countries/${o.slug}`} className="flex items-center justify-between py-2.5 border-b border-white/10 hover:text-accent transition-colors">
                      <span className="text-sm">{o.flag} {o.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Document checklist */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <SectionTitle center eyebrow="Document Checklist" title={<>Everything you need <span className="gradient-text">to prepare.</span></>} subtitle={`A ${dest.checklist.length}-item checklist for ${dest.name} applications.`} />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12 grid sm:grid-cols-2 gap-3">
            {dest.checklist.map((c, i) => (
              <motion.div key={c} variants={fadeUp} className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="w-7 h-7 rounded-full bg-white border border-slate-200 grid place-items-center text-xs font-bold text-brand-600 flex-shrink-0">{i + 1}</span>
                <span className="text-sm font-medium text-ink">{c}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Specimen strip */}
      <section className="py-16 bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-2"><ShieldCheck className="w-6 h-6 text-brand-600" /> Visual specimen showcase</h3>
            <span className="text-xs text-slate-500">Tap any specimen to open the zoom viewer</span>
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d) => (
              <motion.button key={d.slug} variants={fadeUp} onClick={() => { if (d.slug === dest.slug) setLightbox(true); }} className="text-left">
                <VisaSpecimen dest={d} compact />
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-ink text-sm">{d.flag} {d.name}</span>
                  <Link to={`/countries/${d.slug}`} className="text-xs font-bold text-brand-600 hover:underline">Details</Link>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/80 backdrop-blur-sm grid place-items-center p-4"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-600">Visa specimen viewer</div>
                  <div className="font-display font-bold text-ink">{dest.flag} {dest.name} — {dest.specimen.documentType}</div>
                </div>
                <button onClick={() => setLightbox(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 grid lg:grid-cols-[1.4fr_1fr] gap-6">
                <VisaSpecimen dest={dest} />
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-ink">Grant validity details</h4>
                  <dl className="space-y-2.5 text-sm">
                    {[
                      ["Document type", dest.specimen.documentType],
                      ["Control number", dest.specimen.controlNo],
                      ["Valid from", dest.specimen.validFrom],
                      ["Valid to", dest.specimen.validTo],
                      ["Entries", dest.specimen.entries],
                      ["Route", dest.routes[0]?.name ?? "—"],
                      ["Processing time", dest.timeline],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-2">
                        <dt className="text-slate-500">{k}</dt>
                        <dd className="font-semibold text-ink text-right">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-700">
                    This is a visual <strong>SPECIMEN</strong> mockup for illustration only. It is not a valid
                    immigration document and cannot be used for travel.
                  </div>
                  <Link to="/contact" className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold">
                    Apply for this route <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
