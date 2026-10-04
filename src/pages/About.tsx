import { motion } from "framer-motion";
import { CheckCircle2, Target, Eye, HeartHandshake, Award, Users, Globe2 } from "lucide-react";
import { PageHero, SectionTitle, fadeUp, stagger } from "../components/ui";
import { team, stats } from "../data/site";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <PageHero
        crumb="About Us"
        title={<>We help people cross borders <span className="gradient-text">with confidence.</span></>}
        subtitle="Visamotion is a global immigration & visa consulting firm founded in 2010, helping thousands of individuals, families, and businesses relocate every year."
        image="https://images.pexels.com/photos/7433853/pexels-photo-7433853.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600"
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <img
              src="https://images.pexels.com/photos/7964413/pexels-photo-7964413.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=800"
              className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/5]"
            />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -bottom-6 -right-6 bg-brand-600 text-white p-6 rounded-2xl shadow-2xl w-56">
              <Award className="w-8 h-8 text-accent" />
              <div className="mt-3 font-display text-2xl font-bold">15 Years</div>
              <div className="text-sm text-white/80">of trust across 40+ countries</div>
            </motion.div>
          </motion.div>

          <div>
            <SectionTitle
              eyebrow="Our Story"
              title={<>From a small office to a <span className="gradient-text">global movement.</span></>}
              subtitle="What began in 2010 as a two-person consultancy has grown into a full-service immigration firm with offices in 6 countries and partners in 40+ jurisdictions."
            />
            <p className="mt-4 text-slate-600 leading-relaxed">
              We believe migration should be empowering — not intimidating. That's why we built a service model combining legal precision, human warmth, and modern technology so every client feels supported from consultation to settlement.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold gradient-text">{s.value}</div>
                  <div className="text-sm text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionTitle center eyebrow="What drives us" title={<>Purpose, <span className="gradient-text">principles & people.</span></>} />
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Mission", desc: "Empower every person to build a life across borders with clarity, dignity, and success." },
              { icon: Eye, title: "Vision", desc: "A world where mobility is a right, not a privilege — accessible to anyone with a dream." },
              { icon: HeartHandshake, title: "Values", desc: "Honesty, empathy, and mastery of craft. Every case matters, every client is family." },
            ].map((v) => (
              <motion.div key={v.title} variants={fadeUp} className="bg-white rounded-3xl p-8 border border-slate-100 card-hover">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center text-white mb-5 shadow-lg shadow-brand-500/30">
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionTitle eyebrow="Why Choose Us" title={<>The Visamotion <span className="gradient-text">difference.</span></>} />
            <div className="mt-8 space-y-5">
              {[
                { t: "Licensed & regulated advisors", d: "Every case is handled by ICCRC/OISC-certified professionals." },
                { t: "Transparent flat-fee pricing", d: "No hidden charges. You'll know the exact cost upfront." },
                { t: "End-to-end journey", d: "From documentation to landing, housing, and job search." },
                { t: "Multi-country strategy", d: "We compare programs across 40+ countries so you pick the best fit." },
              ].map((x, i) => (
                <motion.div key={x.t} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-50 grid place-items-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-ink">{x.t}</h4>
                    <p className="text-sm text-slate-600 mt-1">{x.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl bg-brand-50 p-6 aspect-square grid place-items-center text-center">
                <Users className="w-10 h-10 text-brand-600 mb-3" />
                <div className="font-display text-3xl font-bold text-ink">120+</div>
                <div className="text-xs text-slate-500 mt-1">Global Experts</div>
              </div>
              <img src="https://images.pexels.com/photos/7433919/pexels-photo-7433919.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500" className="rounded-2xl w-full aspect-square object-cover" />
            </div>
            <div className="space-y-4 mt-8">
              <img src="https://images.pexels.com/photos/8777886/pexels-photo-8777886.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=500" className="rounded-2xl w-full aspect-square object-cover" />
              <div className="rounded-2xl bg-accent/20 p-6 aspect-square grid place-items-center text-center">
                <Globe2 className="w-10 h-10 text-brand-700 mb-3" />
                <div className="font-display text-3xl font-bold text-ink">40+</div>
                <div className="text-xs text-slate-500 mt-1">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionTitle center eyebrow="The Team" title={<>Meet the people <span className="gradient-text">behind Visamotion.</span></>} subtitle="A blend of immigration lawyers, former consular officers, and student advisors." />
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <motion.div key={m.name} variants={fadeUp} whileHover={{ y: -6 }} className="text-center bg-white rounded-3xl p-6 border border-slate-100 card-hover">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-brand-50">
                  <img src={m.image} className="w-full h-full object-cover" />
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-ink">{m.name}</h3>
                <p className="text-sm text-brand-600 font-medium">{m.role}</p>
                <div className="mt-4 flex justify-center gap-2">
                  {["in", "tw", "@"].map((s) => (
                    <span key={s} className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-xs grid place-items-center hover:bg-brand-600 hover:text-white transition-colors cursor-pointer">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionTitle center eyebrow="Ready?" title={<>Let's start your <span className="gradient-text">journey today.</span></>} />
          <div className="mt-8">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold shadow-xl shadow-brand-500/30 hover:-translate-y-0.5 transition-all">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
