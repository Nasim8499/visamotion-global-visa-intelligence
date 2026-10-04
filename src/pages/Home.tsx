import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight, Play, CheckCircle2, Shield, Clock, Award, Users, Globe2,
  MessageCircle, FileCheck, Stamp, Sparkles, Star, Quote,
  Briefcase, GraduationCap, Home as HomeIcon, Compass, TrendingUp, Heart,
  Zap, Calendar, MapPin, Plane, Trophy, ArrowUpRight, Building2,
} from "lucide-react";
import { SectionTitle, fadeUp, stagger } from "../components/ui";
import { services, countries, stats, process, testimonials, posts, faqs } from "../data/site";
import {
  industries, successStories, timeline, compareTable, events,
  awards, jobs, newsTicker, partners, universityLogos, chatPreview, globeStats,
} from "../data/extra";

const iconMap: Record<string, any> = { briefcase: Briefcase, graduation: GraduationCap, home: HomeIcon, compass: Compass, trending: TrendingUp, heart: Heart };
const procIcons: Record<string, any> = { chat: MessageCircle, check: CheckCircle2, docs: FileCheck, stamp: Stamp };

export default function Home() {
  return (
    <>
      <NewsBar />
      <Hero />
      <TrustLogos />
      <Features />
      <ServicesSection />
      <IndustriesSection />
      <StatsSection />
      <About />
      <ProcessSection />
      <EligibilityCalc />
      <CountriesSection />
      <ComparisonSection />
      <SuccessStories />
      <TimelineSection />
      <UniversitiesSection />
      <VideoSection />
      <AppShowcase />
      <TestimonialsSection />
      <PricingPreview />
      <EventsSection />
      <AwardsSection />
      <PressSection />
      <GlobalPresence />
      <FAQSection />
      <NewsletterSection />
      <BlogPreview />
      <CareersSection />
      <SecuritySection />
      <PartnersMarquee />
      <TeamPreview />
      <CtaBanner />
    </>
  );
}

/* 1. NEWS TICKER */
function NewsBar() {
  return (
    <div className="bg-ink text-white overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center gap-4">
        <span className="text-[10px] font-bold bg-accent text-ink px-2 py-0.5 rounded uppercase tracking-widest whitespace-nowrap hidden sm:inline">Live</span>
        <div className="flex-1 overflow-hidden">
          <div className="marquee-track flex gap-10 whitespace-nowrap text-xs text-white/80">
            {[...newsTicker, ...newsTicker].map((n, i) => <span key={i}>{n}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2. HERO */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-8 md:pt-14 pb-20 md:pb-28">
      <div className="absolute inset-0 bg-mesh" />
      <motion.div style={{ y }} className="absolute top-32 -right-24 w-96 h-96 bg-brand-300/30 rounded-full blur-3xl" />
      <motion.div style={{ y }} className="absolute -bottom-10 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-100 shadow-sm text-brand-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            #1 Immigration Consultancy · 2025 Awards
          </motion.div>
          <motion.h1 variants={fadeUp} className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            Move Anywhere. <br />
            <span className="gradient-text">We handle the visa.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 text-slate-600 text-lg leading-relaxed max-w-xl">
            Visamotion is your global immigration partner — helping students, professionals, families, and investors relocate to 40+ countries with confidence and clarity.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/signup" className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold shadow-xl shadow-brand-500/30 hover:shadow-2xl transition-all hover:-translate-y-0.5">
              Start Free Assessment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group inline-flex items-center gap-3 px-5 py-3.5 rounded-full bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-ink font-semibold transition-colors">
              <span className="w-9 h-9 rounded-full bg-brand-600 text-white grid place-items-center group-hover:scale-105 transition-transform">
                <Play className="w-4 h-4 ml-0.5 fill-white" />
              </span>
              Watch 90-sec intro
            </button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              {["15", "32", "53", "47", "68"].map((i) => (
                <img key={i} src={`https://i.pravatar.cc/60?img=${i}`} className="w-9 h-9 rounded-full ring-3 ring-white" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}
                <span className="ml-1 text-sm font-bold text-ink">4.9/5</span>
              </div>
              <div className="text-xs text-slate-500">from 3,200+ Trustpilot reviews</div>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 grid grid-cols-3 gap-6 max-w-md border-t border-slate-200 pt-6">
            {stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl md:text-3xl font-bold text-ink">{s.value}</div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <HeroVisual />
      </motion.div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] max-w-md mx-auto lg:max-w-none">
      <div className="absolute inset-0 blob bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800" />
      <img src="https://images.pexels.com/photos/8777879/pexels-photo-8777879.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=800" alt="Happy travelers" className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover blob shadow-2xl" />
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-4 md:-left-10 top-16 bg-white rounded-2xl shadow-2xl p-4 w-52 border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 grid place-items-center"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>
          <div><div className="text-xs text-slate-500">Visa approved</div><div className="font-semibold text-sm text-ink">Australia 189 · 6 mo</div></div>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-emerald-500" />
        </div>
      </motion.div>
      <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-2 md:-right-8 bottom-20 bg-white rounded-2xl shadow-2xl p-4 w-56 border border-slate-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex -space-x-2">{["45", "12", "38"].map((i) => <img key={i} src={`https://i.pravatar.cc/40?img=${i}`} className="w-7 h-7 rounded-full border-2 border-white" />)}</div>
          <span className="text-xs font-semibold text-slate-600">+12k clients</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}
          <span className="ml-1 text-xs font-semibold text-slate-700">4.9/5 · Trustpilot</span>
        </div>
      </motion.div>
      <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-dashed border-brand-300/60 grid place-items-center">
        <Globe2 className="w-8 h-8 text-brand-500" />
      </motion.div>
      <motion.div animate={{ y: [0, -8, 0], x: [0, 4, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-1/2 -right-4 bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-2 border border-slate-100">
        <Plane className="w-4 h-4 text-brand-600" />
        <div className="text-xs"><div className="font-bold text-ink">Flight booked</div><div className="text-slate-500">YYZ · Apr 28</div></div>
      </motion.div>
    </motion.div>
  );
}

/* 3. TRUST LOGOS */
function TrustLogos() {
  return (
    <section className="py-10 border-y border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">Trusted by teams at</div>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {partners.map((p, i) => (
            <motion.div key={p} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="font-display text-lg font-bold text-slate-400 hover:text-brand-600 transition-colors">
              {p}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 4. FEATURES */
function Features() {
  const features = [
    { icon: Shield, title: "Licensed advisors", desc: "ICCRC & OISC certified consultants on every case." },
    { icon: Clock, title: "Fast processing", desc: "Priority filings with real-time status tracking." },
    { icon: Award, title: "98% success rate", desc: "Over 12,000 approvals across 40+ countries." },
    { icon: Users, title: "Post-arrival care", desc: "Housing, schools & jobs — we settle you in." },
  ];
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp} className="bg-white rounded-2xl p-6 border border-slate-100 card-hover">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 grid place-items-center mb-4"><f.icon className="w-6 h-6" /></div>
              <h3 className="font-display font-bold text-ink">{f.title}</h3>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* 5. SERVICES */
function ServicesSection() {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionTitle eyebrow="Our Services" title={<>Immigration solutions <br /><span className="gradient-text">tailored to you.</span></>} subtitle="From tourist visas to permanent residency — pick the pathway that fits your goals." />
          <Link to="/services" className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:gap-3 transition-all">View all services <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.div key={s.slug} variants={fadeUp}>
                <Link to={`/services/${s.slug}`} className="group block relative overflow-hidden rounded-3xl bg-white border border-slate-100 card-hover">
                  <div className="relative h-44 overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-70 mix-blend-multiply`} />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur grid place-items-center shadow-lg"><Icon className="w-6 h-6 text-ink" /></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-ink group-hover:text-brand-600 transition-colors">{s.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.short}</p>
                    <div className="mt-4 flex items-center justify-between text-sm font-semibold text-brand-600">Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* 6. INDUSTRIES */
function IndustriesSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionTitle center eyebrow="By Industry" title={<>Placements across <span className="gradient-text">every field.</span></>} subtitle="Whatever your profession, we've helped someone in your industry successfully migrate." />
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((ind) => (
            <motion.div key={ind.name} variants={fadeUp} whileHover={{ y: -6 }} className="group relative overflow-hidden bg-white rounded-2xl p-6 border border-slate-100 cursor-pointer">
              <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${ind.color} opacity-10 group-hover:opacity-30 transition-opacity`} />
              <div className="relative">
                <div className="text-4xl mb-3">{ind.icon}</div>
                <h3 className="font-display font-bold text-ink">{ind.name}</h3>
                <div className="mt-2 text-xs text-slate-500">
                  <span className="font-bold text-brand-600">{ind.count.toLocaleString()}+</span> placements
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* 7. STATS */
function StatsSection() {
  return (
    <section className="py-16 md:py-20 relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/30 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center border border-white/10 rounded-2xl p-6 bg-white/5 backdrop-blur">
            <div className="font-display text-4xl md:text-5xl font-bold gradient-text">{s.value}</div>
            <div className="mt-2 text-white/70 text-sm">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* 8. ABOUT */
function About() {
  const points = ["40+ destination countries covered", "Licensed & regulated immigration lawyers", "Flat-fee pricing — no surprise costs", "Success guarantee on eligible cases"];
  return (
    <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-200/30 blur-3xl rounded-full" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center relative">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img src="https://images.pexels.com/photos/7433869/pexels-photo-7433869.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500" className="w-full h-56 object-cover rounded-2xl shadow-lg" />
              <img src="https://images.pexels.com/photos/29402986/pexels-photo-29402986.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500" className="w-full h-40 object-cover rounded-2xl shadow-lg" />
            </div>
            <div className="space-y-4 mt-8">
              <img src="https://images.pexels.com/photos/2305097/pexels-photo-2305097.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=500" className="w-full h-40 object-cover rounded-2xl shadow-lg" />
              <img src="https://images.pexels.com/photos/36622165/pexels-photo-36622165.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500" className="w-full h-56 object-cover rounded-2xl shadow-lg" />
            </div>
          </div>
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -bottom-4 -right-4 bg-white p-5 rounded-2xl shadow-2xl border border-slate-100 w-52">
            <div className="font-display text-3xl font-bold gradient-text">15+</div>
            <div className="text-xs text-slate-500 mt-1">Years helping people cross borders</div>
          </motion.div>
        </motion.div>
        <div>
          <SectionTitle eyebrow="Who we are" title={<>Trusted by 12,000+ movers across the globe.</>} subtitle="We're a boutique immigration firm combining decades of legal expertise with modern, tech-driven service. Every case is handled by a dedicated advisor from day one." />
          <motion.ul variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-8 grid sm:grid-cols-2 gap-3">
            {points.map((p) => (
              <motion.li key={p} variants={fadeUp} className="flex items-center gap-3 text-slate-700">
                <span className="w-6 h-6 rounded-full bg-brand-50 grid place-items-center"><CheckCircle2 className="w-4 h-4 text-brand-600" /></span>
                <span className="text-sm font-medium">{p}</span>
              </motion.li>
            ))}
          </motion.ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/about" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-white font-semibold hover:bg-brand-700 transition-colors">About Us <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-ink text-ink font-semibold hover:bg-ink hover:text-white transition-colors">Talk to an Advisor</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 9. PROCESS */
function ProcessSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14"><SectionTitle center eyebrow="Our Process" title={<>Four steps to your <span className="gradient-text">new home.</span></>} subtitle="A simple, transparent journey from consultation to landing." /></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-brand-200" />
          {process.map((p, i) => {
            const Icon = procIcons[p.icon];
            return (
              <motion.div key={p.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative text-center bg-white rounded-2xl p-6 border border-slate-100 card-hover">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full bg-brand-50" />
                  <div className="relative w-full h-full grid place-items-center"><Icon className="w-7 h-7 text-brand-600" /></div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-ink text-white text-xs font-bold grid place-items-center">{p.step}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 10. ELIGIBILITY CALCULATOR */
function EligibilityCalc() {
  const [age, setAge] = useState(30);
  const [edu, setEdu] = useState(3);
  const [exp, setExp] = useState(5);
  const [lang, setLang] = useState(7);
  const score = Math.min(100, Math.round((age <= 32 ? 25 : age <= 40 ? 18 : 8) + edu * 6 + exp * 4 + lang * 5));

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-brand-50 via-white to-amber-50 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl" />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center relative">
        <div>
          <SectionTitle eyebrow="Free Tool" title={<>Instant <span className="gradient-text">eligibility check.</span></>} subtitle="Answer 4 quick questions and see your score in seconds. No signup required." />
          <div className="mt-8 space-y-6">
            {[
              { label: "Your age", value: age, min: 18, max: 55, set: setAge, unit: "years" },
              { label: "Highest education (1=HS, 5=PhD)", value: edu, min: 1, max: 5, set: setEdu, unit: "level" },
              { label: "Work experience", value: exp, min: 0, max: 15, set: setExp, unit: "years" },
              { label: "English proficiency (IELTS band)", value: lang, min: 4, max: 9, set: setLang, unit: "band" },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-ink">{f.label}</span>
                  <span className="font-bold text-brand-600">{f.value} {f.unit}</span>
                </div>
                <input type="range" min={f.min} max={f.max} value={f.value} onChange={(e) => f.set(+e.target.value)} className="w-full accent-brand-600" />
              </div>
            ))}
          </div>
        </div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="relative">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
            <div className="text-center">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your estimated score</div>
              <div className="relative w-48 h-48 mx-auto mt-4">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                  <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round"
                    initial={{ strokeDasharray: "0 100" }} animate={{ strokeDasharray: `${score} 100` }} transition={{ duration: 1 }} />
                  <defs><linearGradient id="grad" x1="0" x2="1"><stop offset="0" stopColor="#2543e6" /><stop offset="1" stopColor="#ffb838" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="font-display text-5xl font-extrabold gradient-text">{score}</div>
                    <div className="text-xs text-slate-500">out of 100</div>
                  </div>
                </div>
              </div>
              <div className={`mt-4 inline-block px-4 py-1 rounded-full text-xs font-bold ${score >= 65 ? "bg-emerald-100 text-emerald-700" : score >= 40 ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>
                {score >= 65 ? "🎉 Strong candidate" : score >= 40 ? "⚡ Eligible with support" : "💡 Needs a plan"}
              </div>
              <p className="mt-4 text-sm text-slate-600">Based on your score, we recommend exploring <span className="font-semibold text-brand-600">{score >= 65 ? "Australia Skilled 189" : score >= 40 ? "Employer-sponsored work visa" : "Study-to-work pathways"}</span>.</p>
              <Link to="/signup" className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white font-bold text-sm">
                Get personalized report <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* 11. COUNTRIES */
function CountriesSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14"><SectionTitle center eyebrow="Destinations" title={<>Popular <span className="gradient-text">destinations</span></>} subtitle="Explore visa programs across the world's most sought-after countries." /></div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {countries.map((c) => (
            <motion.div key={c.slug} variants={fadeUp} whileHover={{ y: -6 }} className="relative rounded-2xl overflow-hidden aspect-[4/5] group shadow-lg">
              <Link to={`/countries/${c.slug}`} className="absolute inset-0 block">
                <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 text-3xl">{c.flag}</div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="font-display font-bold text-lg">{c.name}</div>
                  <div className="text-xs text-white/80 flex items-center gap-1 mt-1"><span className="w-1 h-1 rounded-full bg-accent" /> {c.programs} visa routes</div>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-accent font-semibold">View details <ArrowRight className="w-3 h-3" /></span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* 12. COMPARISON */
function ComparisonSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14"><SectionTitle center eyebrow="Why Visamotion" title={<>How we <span className="gradient-text">stack up.</span></>} subtitle="A quick comparison against typical immigration consultancies." /></div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50">
            <div className="p-5 font-display font-bold text-ink">Feature</div>
            <div className="p-5 font-display font-bold text-center bg-gradient-to-br from-brand-600 to-brand-800 text-white flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" /> Visamotion
            </div>
            <div className="p-5 font-display font-bold text-slate-500 text-center">Typical firm</div>
          </div>
          {compareTable.map((row, i) => (
            <motion.div key={row.feature} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="grid grid-cols-3 border-b border-slate-100 last:border-0">
              <div className="p-4 text-sm font-medium text-ink">{row.feature}</div>
              <div className="p-4 text-center bg-brand-50/40">{row.vm ? <CheckCircle2 className="w-5 h-5 text-brand-600 mx-auto" /> : <span className="text-slate-300">—</span>}</div>
              <div className="p-4 text-center">{row.others ? <CheckCircle2 className="w-5 h-5 text-slate-400 mx-auto" /> : <span className="text-slate-300">—</span>}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* 13. SUCCESS STORIES */
function SuccessStories() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14"><SectionTitle center eyebrow="Success Stories" title={<>Real people. <span className="gradient-text">Real journeys.</span></>} subtitle="A few of the 12,000+ movers who trusted us with their next chapter." /></div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((s) => (
            <motion.div key={s.name} variants={fadeUp} className="relative bg-white rounded-3xl overflow-hidden border border-slate-100 card-hover">
              <div className="bg-gradient-to-br from-brand-600 to-brand-800 h-24 relative">
                <div className="absolute -bottom-8 left-6"><img src={s.image} className="w-16 h-16 rounded-2xl ring-4 ring-white shadow-lg" /></div>
                <div className="absolute top-4 right-4 text-xs font-bold text-white/90 bg-white/10 backdrop-blur px-3 py-1 rounded-full">{s.time}</div>
              </div>
              <div className="pt-12 pb-6 px-6">
                <div className="font-display font-bold text-ink">{s.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.from} → {s.to} · {s.visa}</div>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed italic">"{s.story}"</p>
                <div className="mt-4 flex items-center gap-1 text-xs">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-accent text-accent" />)}
                  <span className="ml-1 text-slate-500 font-medium">Verified journey</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* 14. TIMELINE */
function TimelineSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14"><SectionTitle center eyebrow="Our Journey" title={<>15 years of <span className="gradient-text">helping people move.</span></>} /></div>
        <div className="relative">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-brand-500 via-brand-300 to-transparent -translate-x-1/2" />
          <div className="space-y-8">
            {timeline.map((t, i) => (
              <motion.div key={t.year} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`md:grid md:grid-cols-2 md:gap-8 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                <div className={`md:[direction:ltr] ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">{t.year}</div>
                  <h3 className="mt-3 font-display text-2xl font-bold text-ink">{t.title}</h3>
                  <p className="mt-2 text-slate-600">{t.desc}</p>
                </div>
                <div className="hidden md:flex md:[direction:ltr] justify-center">
                  <div className="w-4 h-4 rounded-full bg-brand-600 ring-4 ring-brand-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 15. UNIVERSITIES */
function UniversitiesSection() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">500+ partner universities · placements at</div>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {universityLogos.map((u) => (
            <motion.div key={u} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-display font-bold text-slate-500 hover:text-brand-600 transition-colors text-lg">
              🎓 {u}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 16. VIDEO */
function VideoSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10"><SectionTitle center eyebrow="See it in action" title={<>Watch how we <span className="gradient-text">get you there.</span></>} /></div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
          <img src="https://images.pexels.com/photos/7433853/pexels-photo-7433853.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=720&w=1280" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <motion.div whileHover={{ scale: 1.1 }} className="absolute inset-0 grid place-items-center">
            <div className="relative">
              <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 rounded-full bg-white/30" />
              <div className="relative w-20 h-20 rounded-full bg-white grid place-items-center shadow-2xl">
                <Play className="w-8 h-8 text-brand-600 ml-1 fill-brand-600" />
              </div>
            </div>
          </motion.div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="text-xs font-bold uppercase tracking-widest text-accent">2 min video</div>
            <h3 className="mt-1 font-display text-2xl font-bold">The Visamotion difference — in 120 seconds</h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* 17. APP SHOWCASE */
function AppShowcase() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-ink to-brand-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle eyebrow="Client Portal" title={<>Your entire visa journey <span className="text-accent">on one screen.</span></>} subtitle="Track your case, chat with your advisor, upload documents, and book calls — all in one beautifully designed dashboard." light />
          <ul className="mt-8 space-y-4">
            {[
              { i: Zap, t: "Real-time case updates" },
              { i: MessageCircle, t: "Secure chat with your advisor" },
              { i: FileCheck, t: "Document vault with e-signing" },
              { i: Calendar, t: "One-click call scheduling" },
            ].map((x, i) => (
              <motion.li key={x.t} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 grid place-items-center"><x.i className="w-4 h-4 text-accent" /></div>
                <span className="text-white/90">{x.t}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-ink font-bold">Create free account <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 font-semibold">Preview dashboard</Link>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
          <div className="bg-white rounded-3xl shadow-2xl p-4 text-ink">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div className="ml-2 text-xs text-slate-400">app.visamotion.com/dashboard</div>
            </div>
            <div className="pt-4">
              <div className="text-xs text-slate-500">Case #VM-U242</div>
              <div className="font-display font-bold text-lg">Australia 189 · In Review</div>
              <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "74%" }} viewport={{ once: true }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-brand-500 to-accent" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[{ l: "Docs", v: "12/15" }, { l: "Days", v: "127" }, { l: "Points", v: "85" }].map((x) => (
                  <div key={x.l} className="bg-slate-50 rounded-lg p-2 text-center">
                    <div className="font-bold text-sm">{x.v}</div>
                    <div className="text-[10px] text-slate-500">{x.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-1.5">
                {chatPreview.slice(0, 3).map((m, i) => (
                  <div key={i} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
                    <div className={`text-[11px] px-2.5 py-1.5 rounded-xl max-w-[80%] ${m.from === "me" ? "bg-brand-600 text-white" : "bg-slate-100"}`}>{m.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl">
            🎉 New update: +2 documents verified
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* 18. TESTIMONIALS */
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14"><SectionTitle center eyebrow="Testimonials" title={<>What our clients <span className="gradient-text">say.</span></>} subtitle="Real stories from real people who moved abroad with Visamotion." /></div>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div key={active} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-100">
            <Quote className="absolute top-6 right-6 w-16 h-16 text-brand-100" />
            <div className="flex items-center gap-1 mb-4">{[...Array(testimonials[active].rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-accent text-accent" />)}</div>
            <p className="text-lg md:text-xl text-ink leading-relaxed font-medium">"{testimonials[active].text}"</p>
            <div className="mt-6 flex items-center gap-4">
              <img src={testimonials[active].avatar} className="w-14 h-14 rounded-full object-cover ring-4 ring-brand-50" />
              <div>
                <div className="font-display font-bold text-ink">{testimonials[active].name}</div>
                <div className="text-sm text-slate-500">{testimonials[active].role}</div>
              </div>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <button key={t.name} onClick={() => setActive(i)} className={`text-left p-5 rounded-2xl border transition-all ${active === i ? "bg-brand-50 border-brand-200 shadow-lg" : "bg-white border-slate-100 hover:border-brand-100"}`}>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} className="w-11 h-11 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-ink truncate">{t.name}</div>
                    <div className="text-xs text-slate-500 truncate">{t.role}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600 line-clamp-2">"{t.text}"</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 19. PRICING PREVIEW */
function PricingPreview() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14"><SectionTitle center eyebrow="Pricing" title={<>Flat fees. <span className="gradient-text">No surprises.</span></>} subtitle="Pick a package or ask us for a custom quote." /></div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Starter", price: 199, features: ["Eligibility check", "Document checklist", "Online filing"] },
            { name: "Professional", price: 749, popular: true, features: ["Dedicated advisor", "SOP & interview prep", "Priority filing", "Post-landing kit"] },
            { name: "Elite", price: 1999, features: ["Multi-country strategy", "Legal counsel", "Family included", "Lifetime support"] },
          ].map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className={`relative rounded-3xl p-8 border-2 ${p.popular ? "bg-gradient-to-br from-brand-600 to-brand-800 text-white border-brand-600 shadow-2xl scale-[1.02]" : "bg-white border-slate-100"}`}>
              {p.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-ink text-xs font-bold flex items-center gap-1"><Sparkles className="w-3 h-3" /> Most Popular</span>}
              <div className={`font-display text-2xl font-bold ${p.popular ? "text-white" : "text-ink"}`}>{p.name}</div>
              <div className="mt-4">
                <div className="flex items-end gap-1">
                  <span className={`font-display text-4xl font-extrabold ${p.popular ? "text-white" : "text-ink"}`}>৳{(p.price * 120).toLocaleString("en-BD")}</span>
                  <span className={`pb-1.5 text-xs ${p.popular ? "text-white/70" : "text-slate-500"}`}>/case</span>
                </div>
                <div className={`text-xs mt-0.5 ${p.popular ? "text-white/60" : "text-slate-400"}`}>≈ ${p.price} USD</div>
              </div>
              <ul className={`mt-6 space-y-3 text-sm ${p.popular ? "text-white/90" : "text-slate-700"}`}>
                {p.features.map((f) => (<li key={f} className="flex gap-2"><CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${p.popular ? "text-accent" : "text-brand-600"}`} /> {f}</li>))}
              </ul>
              <Link to="/pricing" className={`mt-6 block text-center py-3 rounded-full font-bold ${p.popular ? "bg-accent text-ink" : "bg-ink text-white"}`}>Choose {p.name}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 20. EVENTS */
function EventsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionTitle eyebrow="Events & Webinars" title={<>Learn from <span className="gradient-text">the experts.</span></>} subtitle="Live workshops, webinars, and networking events — usually free." />
          <a href="#" className="inline-flex items-center gap-2 text-brand-600 font-semibold">View calendar <ArrowRight className="w-4 h-4" /></a>
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((e) => (
            <motion.div key={e.title} variants={fadeUp} className="bg-white rounded-2xl border border-slate-100 p-5 card-hover">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-600">{e.date}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{e.type}</span>
              </div>
              <h3 className="mt-3 font-display font-bold text-ink">{e.title}</h3>
              <div className="mt-2 flex items-center gap-1 text-xs text-slate-500"><MapPin className="w-3 h-3" /> {e.city}</div>
              <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-500">{e.spots} spots left</span>
                <button className="text-xs font-bold text-brand-600 hover:gap-2 flex items-center gap-1 transition-all">Register <ArrowRight className="w-3 h-3" /></button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* 21. AWARDS */
function AwardsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-brand-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14"><SectionTitle center eyebrow="Recognition" title={<>Awards & <span className="gradient-text">accolades.</span></>} /></div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {awards.map((a) => (
            <motion.div key={a.title} variants={fadeUp} className="relative bg-white rounded-2xl p-6 border border-slate-100 text-center card-hover overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/10 rounded-full blur-2xl" />
              <Trophy className="w-10 h-10 mx-auto text-accent" />
              <div className="mt-3 text-xs font-bold text-brand-600">{a.year}</div>
              <h3 className="mt-1 font-display font-bold text-ink text-sm">{a.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{a.org}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* 22. PRESS */
function PressSection() {
  const press = ["Forbes", "TechCrunch", "The Guardian", "Bloomberg", "Wired"];
  return (
    <section className="py-16 border-y border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">As featured in</div>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
          {press.map((p) => (
            <span key={p} className="font-display text-2xl font-black text-slate-400 hover:text-ink transition-colors italic">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 23. GLOBAL PRESENCE */
function GlobalPresence() {
  return (
    <section className="py-20 md:py-28 bg-ink text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-20" />
      <div className="absolute inset-0 bg-dots opacity-10" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionTitle eyebrow="Global Reach" title={<>Offices on <span className="text-accent">6 continents.</span></>} subtitle="Wherever you are, we're nearby. Real people, real support — in your timezone." light />
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { c: "Dhaka 🇧🇩", tm: "GMT+6" },
              { c: "Sydney 🇦🇺", tm: "GMT+11" },
              { c: "Singapore 🇸🇬", tm: "GMT+8" },
              { c: "Riyadh 🇸🇦", tm: "GMT+3" },
              { c: "Istanbul 🇹🇷", tm: "GMT+3" },
              { c: "Belgrade 🇷🇸", tm: "GMT+2" },
            ].map((o, i) => (
              <motion.div key={o.c} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="font-semibold text-sm">{o.c}</div>
                <div className="text-xs text-white/60 mt-0.5">{o.tm}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Cases by region</div>
          <div className="space-y-4">
            {globeStats.map((g, i) => (
              <div key={g.region}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{g.region}</span>
                  <span className="text-white/60">{g.value}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${g.value}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.1 }} className={`h-full ${g.color}`} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-brand-600/30 to-accent/20 border border-white/10 flex items-center gap-4">
            <Globe2 className="w-10 h-10 text-accent flex-shrink-0" />
            <div>
              <div className="font-display font-bold text-lg">120+ languages spoken</div>
              <div className="text-sm text-white/70">Native speakers in every region we serve.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 24. FAQ */
function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14"><SectionTitle center eyebrow="FAQ" title={<>Frequently asked <span className="gradient-text">questions.</span></>} subtitle="Everything you need to know before starting your visa journey." /></div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={f.q} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`rounded-2xl border overflow-hidden ${open === i ? "bg-white border-brand-200 shadow-lg" : "bg-white border-slate-100"}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between text-left p-5 md:p-6">
                <span className="font-display font-semibold text-ink text-base md:text-lg pr-4">{f.q}</span>
                <span className={`w-8 h-8 rounded-full grid place-items-center flex-shrink-0 transition-all ${open === i ? "bg-brand-600 text-white rotate-45" : "bg-slate-100 text-ink"}`}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
              <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
                <p className="px-5 md:px-6 pb-6 text-slate-600 leading-relaxed">{f.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 25. NEWSLETTER */
function NewsletterSection() {
  const [ok, setOk] = useState(false);
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-ink text-white p-8 md:p-14">
          <div className="absolute inset-0 bg-dots opacity-15" />
          <motion.div animate={{ x: [0, 20, 0], y: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold">
              <Sparkles className="w-3 h-3" /> Weekly · 25,000+ subscribers
            </div>
            <h3 className="mt-4 font-display text-3xl md:text-4xl font-bold">Get visa updates in your inbox.</h3>
            <p className="mt-3 text-white/80 max-w-lg mx-auto">One email a week with new immigration programs, policy changes, and success tips. No spam.</p>
            {ok ? (
              <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 text-white font-bold">
                <CheckCircle2 className="w-5 h-5" /> Subscribed — check your inbox!
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setOk(true); }} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" required placeholder="you@gmail.com" className="flex-1 px-5 py-3.5 rounded-full bg-white/95 text-ink placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent" />
                <button className="px-6 py-3.5 rounded-full bg-accent text-ink font-bold hover:bg-white transition-colors">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 26. BLOG PREVIEW */
function BlogPreview() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionTitle eyebrow="Insights" title={<>Latest immigration <span className="gradient-text">news.</span></>} subtitle="Tips, guides, and updates from our team of licensed advisors." />
          <Link to="/blog" className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:gap-3 transition-all">All articles <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((p) => (
            <motion.article key={p.slug} variants={fadeUp} className="bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover">
              <div className="relative h-52 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-xs font-semibold text-brand-700">{p.category}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-slate-500"><span>{p.date}</span><span className="w-1 h-1 rounded-full bg-slate-400" /><span>{p.read} read</span></div>
                <h3 className="mt-3 font-display font-bold text-lg text-ink line-clamp-2">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>
                <Link to={`/blog/${p.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2 transition-all">Read more <ArrowRight className="w-3.5 h-3.5" /></Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* 27. CAREERS */
function CareersSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionTitle eyebrow="Careers" title={<>Join our <span className="gradient-text">mission.</span></>} subtitle="We're hiring passionate people who care about helping others move." />
          <a href="#" className="inline-flex items-center gap-2 text-brand-600 font-semibold">All openings <ArrowRight className="w-4 h-4" /></a>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {jobs.map((j, i) => (
            <motion.a key={j.title} href="#" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="group flex items-center justify-between bg-white rounded-2xl p-5 border border-slate-100 card-hover">
              <div className="min-w-0">
                <h3 className="font-display font-bold text-ink group-hover:text-brand-600 transition-colors">{j.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {j.loc}</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {j.type}</span>
                  <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {j.dept}</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-brand-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 28. SECURITY */
function SecuritySection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14"><SectionTitle center eyebrow="Trust & Safety" title={<>Your data, <span className="gradient-text">secured.</span></>} subtitle="Enterprise-grade security for every client, every document, every message." /></div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-4 gap-5">
          {[
            { i: Shield, t: "SOC 2 Type II", d: "Audited controls" },
            { i: FileCheck, t: "GDPR & CCPA", d: "Privacy-first" },
            { i: Zap, t: "256-bit encryption", d: "Bank-level" },
            { i: Users, t: "Confidentiality NDA", d: "Every advisor" },
          ].map((s) => (
            <motion.div key={s.t} variants={fadeUp} className="bg-white rounded-2xl p-6 border border-slate-100 text-center card-hover">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white grid place-items-center mb-3 shadow-lg shadow-brand-500/30"><s.i className="w-6 h-6" /></div>
              <h3 className="font-display font-bold text-ink">{s.t}</h3>
              <p className="text-xs text-slate-500 mt-1">{s.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* 29. PARTNERS MARQUEE */
function PartnersMarquee() {
  return (
    <section className="py-10 bg-white overflow-hidden border-y border-slate-100">
      <div className="flex">
        <div className="marquee-track flex gap-16 whitespace-nowrap pr-16">
          {[...partners, ...partners, ...partners].map((p, idx) => (
            <span key={idx} className="font-display text-lg font-bold text-slate-400">{p}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 30. TEAM PREVIEW */
function TeamPreview() {
  const team = [
    { n: "Elena Rossi", r: "Founder & CEO", i: "45" },
    { n: "Marcus Chen", r: "Head of Immigration", i: "12" },
    { n: "Priya Anand", r: "Student Visa Lead", i: "38" },
    { n: "David Okoro", r: "Business Visa Advisor", i: "68" },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14"><SectionTitle center eyebrow="The Team" title={<>Meet your <span className="gradient-text">future advisors.</span></>} /></div>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <motion.div key={m.n} variants={fadeUp} whileHover={{ y: -6 }} className="text-center bg-white rounded-3xl p-6 border border-slate-100 card-hover">
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden ring-4 ring-brand-50">
                <img src={`https://i.pravatar.cc/300?img=${m.i}`} className="w-full h-full object-cover" />
              </div>
              <h3 className="mt-4 font-display font-bold text-ink">{m.n}</h3>
              <p className="text-sm text-brand-600 font-medium">{m.r}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* 31. CTA BANNER */
function CtaBanner() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden">
          <img src="https://images.pexels.com/photos/16936915/pexels-photo-16936915.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=1600" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/85 to-brand-700/70" />
          <div className="relative px-6 md:px-14 py-16 md:py-20 text-white grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <h3 className="font-display text-3xl md:text-5xl font-bold leading-tight">Your dream destination is <span className="text-accent">one call away.</span></h3>
              <p className="mt-4 text-white/80 max-w-xl">Book your free consultation today. A licensed advisor will map your best pathway within 24 hours.</p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
              <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-ink font-bold hover:bg-accent transition-colors">Create Account <ArrowRight className="w-4 h-4" /></Link>
              <a href="tel:01619064013" className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors">01619-064013</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
