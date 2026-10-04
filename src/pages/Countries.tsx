import { motion } from "framer-motion";
import { ArrowRight, Clock, Wallet } from "lucide-react";
import { PageHero, fadeUp, stagger } from "../components/ui";
import { countries } from "../data/site";
import { destinationMap } from "../data/destinations";
import { Link } from "react-router-dom";
import { formatBDT } from "../data/site";

export default function Countries() {
  return (
    <>
      <PageHero
        crumb="Countries"
        title={<>Explore destinations <span className="gradient-text">worldwide.</span></>}
        subtitle="Eight in-demand destinations — each with dedicated visa routes, timelines, document checklists and visual specimens."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {countries.map((c) => {
              const d = destinationMap[c.slug];
              return (
                <motion.div key={c.slug} variants={fadeUp} whileHover={{ y: -6 }} className="relative rounded-2xl overflow-hidden aspect-[4/5] group shadow-lg">
                  <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 text-3xl">{c.flag}</div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="font-display font-bold text-lg">{c.name}</div>
                    <div className="text-xs text-white/80 mt-1">{c.programs} visa routes</div>
                    {d && (
                      <div className="mt-3 flex items-center gap-3 text-[11px] text-white/70">
                        <span className="flex items-center gap-1"><Wallet className="w-3 h-3" /> from {formatBDT(d.routes[0].govFee)}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {d.timeline}</span>
                      </div>
                    )}
                    <Link to={`/countries/${c.slug}`} className="mt-3 inline-flex items-center gap-1 text-xs text-accent font-semibold">
                      View details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink">Not sure where to go?</h2>
          <p className="mt-4 text-slate-600">Our advisors can compare programs across multiple countries and recommend the best fit for your profile.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold shadow-xl hover:-translate-y-0.5 transition-all">
            Talk to an Advisor <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
