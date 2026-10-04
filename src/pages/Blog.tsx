import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { PageHero, fadeUp, stagger } from "../components/ui";
import { posts } from "../data/site";
import { useState } from "react";

export default function Blog() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = posts.filter(
    (p) => (cat === "All" || p.category === cat) && p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <PageHero
        crumb="Blog"
        title={<>Immigration <span className="gradient-text">insights.</span></>}
        subtitle="Guides, news, and expert opinions on visas, migration, and moving abroad."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    cat === c ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-slate-100 border border-transparent focus:border-brand-300 focus:bg-white focus:outline-none text-sm"
              />
            </div>
          </div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <motion.article key={p.slug} variants={fadeUp} className="bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover">
                <Link to={`/blog/${p.slug}`} className="block">
                  <div className="relative h-52 overflow-hidden">
                    <img src={p.image} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-xs font-semibold text-brand-700">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{p.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-400" />
                      <span>{p.read} read</span>
                    </div>
                    <h3 className="mt-3 font-display font-bold text-lg text-ink line-clamp-2 hover:text-brand-600 transition-colors">{p.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">{p.excerpt}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                      Read more <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">No articles found. Try a different search.</div>
          )}
        </div>
      </section>
    </>
  );
}
