import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-[0.18em] border border-brand-100"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
      {children}
    </motion.span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <motion.h2
        variants={fadeUp}
        className={`mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`mt-4 text-base md:text-lg leading-relaxed ${
            light ? "text-white/70" : "text-slate-600"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

export function PageHero({
  title,
  crumb,
  subtitle,
  image,
}: {
  title: ReactNode;
  crumb: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative pt-14 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-ink text-white">
      <div className="absolute inset-0 bg-mesh opacity-40" />
      <div className="absolute inset-0 bg-dots opacity-20" />
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-900/60 via-brand-900/80 to-ink" />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-white/70 mb-5"
        >
          Home <span className="mx-2">/</span> <span className="text-accent">{crumb}</span>
        </motion.nav>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-6xl font-bold tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-5 max-w-2xl mx-auto text-white/80 text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
