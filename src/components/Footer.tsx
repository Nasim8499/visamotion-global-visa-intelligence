import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, ArrowUpRight } from "lucide-react";

const socialIcons = {
  facebook: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.5-1.5h1.6V3.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.4H7.7V13h2.7v8h3.1z"/></svg>
  ),
  twitter: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  ),
  instagram: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.2 4.8 1.7 5 5 .1 1.2.1 1.6.1 4.7s0 3.6-.1 4.8c-.2 3.3-1.7 4.8-5 5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.2-4.8-1.7-5-5C2.1 15.6 2 15.2 2 12s0-3.6.1-4.8c.2-3.3 1.7-4.8 5-5C8.4 2.2 8.8 2.2 12 2.2zm0 3.2c-3.6 0-6.6 3-6.6 6.6s3 6.6 6.6 6.6 6.6-3 6.6-6.6-3-6.6-6.6-6.6zm0 10.8c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2zm6.9-10.7c0 .9-.7 1.6-1.6 1.6-.9 0-1.5-.7-1.5-1.6s.7-1.5 1.5-1.5c.9 0 1.6.6 1.6 1.5z"/></svg>
  ),
  linkedin: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
  ),
  youtube: (p: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23.5 6.2c-.3-1-1-1.8-2-2C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.5.5c-1 .3-1.7 1-2 2C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1 1.8 2 2 1.9.5 9.5.5 9.5.5s7.6 0 9.5-.5c1-.3 1.7-1 2-2 .5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4L15.8 12z"/></svg>
  ),
};
import { services } from "../data/site";

export default function Footer() {
  return (
    <footer className="relative bg-[#0b1220] text-slate-300 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      {/* CTA */}
      <div className="relative max-w-7xl mx-auto px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 md:p-14 overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] text-accent uppercase">Ready to move?</span>
              <h3 className="mt-2 font-display text-3xl md:text-4xl font-bold text-white">
                Get a free eligibility check today.
              </h3>
              <p className="mt-3 text-white/80 max-w-md">
                Talk to a licensed advisor within 24 hours. No obligation, 100% confidential.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-4 rounded-full bg-white/95 text-ink placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-accent text-ink font-bold hover:bg-white transition-colors">
                Get Started <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Main */}
      <div className="relative max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
        <div className="col-span-2 lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2l7.5 3.75L12 11.7 4.5 7.95 12 4.2z" />
              </svg>
            </div>
            <span className="font-display text-xl font-bold text-white">Visamotion</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 max-w-sm">
            Visamotion is a global immigration and visa consulting firm helping individuals, families, and businesses relocate to 40+ countries with confidence.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {(Object.keys(socialIcons) as (keyof typeof socialIcons)[]).map((k) => {
              const Icon = socialIcons[k];
              return (
                <a
                  key={k}
                  href="#"
                  aria-label={k}
                  className="w-10 h-10 rounded-full border border-white/10 grid place-items-center text-slate-300 hover:bg-brand-500 hover:border-brand-500 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["About", "Services", "Countries", "Pricing", "Blog", "Contact"].map((l) => (
              <li key={l}>
                <Link to={`/${l.toLowerCase()}`} className="hover:text-white transition-colors flex items-center gap-1 group">
                  <span>{l}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="hover:text-white transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><Phone className="w-4 h-4 text-brand-400 mt-0.5" /> 01619-064013</li>
            <li className="flex gap-3"><Phone className="w-4 h-4 text-brand-400 mt-0.5" /> 01335223267</li>
            <li className="flex gap-3"><Phone className="w-4 h-4 text-brand-400 mt-0.5" /> 01335223269</li>
            <li className="flex gap-3"><Mail className="w-4 h-4 text-brand-400 mt-0.5" /> info.intlimmigrationconsultancy@gmail.com</li>
            <li className="flex gap-3"><MapPin className="w-4 h-4 text-brand-400 mt-0.5" /> Banani C/A, Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Visamotion · Intl Immigration Consultancy. Banani C/A, Dhaka, Bangladesh.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
