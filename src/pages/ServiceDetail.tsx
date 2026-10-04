import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Phone, Mail, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { PageHero, SectionTitle, fadeUp, stagger } from "../components/ui";
import { services } from "../data/site";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero crumb={service.title} title={service.title} subtitle={service.short} image={service.image} />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <motion.img initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} src={service.image} className="w-full rounded-3xl shadow-xl aspect-[16/9] object-cover" />

            <div>
              <SectionTitle eyebrow="Overview" title={<>About the <span className="gradient-text">{service.title}</span> program</>} />
              <p className="mt-5 text-slate-600 leading-relaxed text-lg">{service.description}</p>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-ink mb-6">What's included</h3>
              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-4">
                {service.included.map((f) => (
                  <motion.div key={f} variants={fadeUp} className="flex items-start gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-brand-600 text-white grid place-items-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-ink">{f}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-ink mb-6">Timeline</h3>
              <div className="space-y-4">
                {[
                  { t: "Week 1", d: "Consultation, eligibility check, and document checklist." },
                  { t: "Week 2 – 4", d: "Document gathering, translation, and attestation." },
                  { t: "Week 5 – 8", d: "Application filing and biometrics scheduling." },
                  { t: "Week 9+", d: "Interview coaching (if required) and decision tracking." },
                ].map((s, i) => (
                  <motion.div key={s.t} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex gap-5 items-start">
                    <div className="flex-shrink-0 w-24 py-2 px-3 rounded-full bg-brand-50 text-brand-700 text-xs font-bold text-center">{s.t}</div>
                    <p className="text-slate-600 pt-1.5">{s.d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-7 text-white shadow-2xl">
              <Sparkles className="w-8 h-8 text-accent" />
              <h3 className="mt-3 font-display text-2xl font-bold">Free eligibility check</h3>
              <p className="mt-2 text-white/80 text-sm">Talk to an advisor within 24 hours. No obligation.</p>
              <Link to="/contact" className="mt-5 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-white text-ink font-bold hover:bg-accent transition-colors">
                Book Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-slate-100">
              <h3 className="font-display font-bold text-ink mb-4">Quick facts</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-brand-600" /> Processing: 4–16 weeks</li>
                <li className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-brand-600" /> Success rate: 96%+</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-brand-600" /> 01619-064013</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-brand-600" /> info.intlimmigrationconsultancy@gmail.com</li>
              </ul>
            </div>

            <div className="bg-slate-900 rounded-3xl p-7 text-white">
              <h3 className="font-display font-bold mb-4">Other services</h3>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/services/${r.slug}`} className="flex items-center justify-between py-2 border-b border-white/10 hover:text-accent transition-colors">
                      <span className="text-sm">{r.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
