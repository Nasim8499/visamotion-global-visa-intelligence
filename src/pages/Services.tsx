import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, GraduationCap, Home as HomeIcon, Compass, TrendingUp, Heart } from "lucide-react";
import { PageHero, SectionTitle, fadeUp, stagger } from "../components/ui";
import { services } from "../data/site";

const iconMap: Record<string, any> = {
  briefcase: Briefcase, graduation: GraduationCap, home: HomeIcon,
  compass: Compass, trending: TrendingUp, heart: Heart,
};

export default function Services() {
  return (
    <>
      <PageHero
        crumb="Services"
        title={<>Immigration & visa <span className="gradient-text">services.</span></>}
        subtitle="Whatever your goal — study, work, invest, retire, or reunite — we have a program for you."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <motion.div key={s.slug} variants={fadeUp}>
                  <Link to={`/services/${s.slug}`} className="group block relative overflow-hidden rounded-3xl bg-white border border-slate-100 card-hover">
                    <div className="relative h-56 overflow-hidden">
                      <img src={s.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-70 mix-blend-multiply`} />
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/95 grid place-items-center shadow-lg">
                        <Icon className="w-6 h-6 text-ink" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-ink group-hover:text-brand-600 transition-colors">{s.title}</h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.short}</p>
                      <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                        {s.included.slice(0, 3).map((i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" /> {i}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex items-center gap-2 text-brand-600 font-semibold text-sm">
                        Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process banner */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionTitle center eyebrow="How we work" title={<>A tailored plan for <span className="gradient-text">every case.</span></>} />
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {["Free consultation", "Eligibility mapping", "Filing & interview prep", "Landing & settlement"].map((t, i) => (
              <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 border border-slate-100">
                <div className="font-display text-4xl font-bold gradient-text">0{i + 1}</div>
                <h4 className="mt-3 font-display font-bold text-ink">{t}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
