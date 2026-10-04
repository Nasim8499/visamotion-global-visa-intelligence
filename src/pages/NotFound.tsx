import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] grid place-items-center px-6 py-20 bg-mesh">
      <div className="text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-[8rem] md:text-[12rem] font-extrabold leading-none gradient-text">
          404
        </motion.div>
        <h1 className="font-display text-3xl font-bold text-ink mt-2">Page not found</h1>
        <p className="mt-3 text-slate-600 max-w-md mx-auto">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
