import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from "lucide-react";
import { PageHero } from "../components/ui";
import { posts } from "../data/site";

export default function BlogDetail() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;
  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero crumb={post.category} title={post.title} image={post.image} />

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-brand-600 font-semibold hover:gap-3 transition-all mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 mb-8">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.read}</span>
            <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> Visamotion Team</span>
            <span className="flex items-center gap-1.5"><Tag className="w-4 h-4" /> {post.category}</span>
          </div>

          <motion.img initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} src={post.image} className="w-full rounded-3xl aspect-[16/9] object-cover shadow-xl mb-10" />

          <article className="prose prose-slate max-w-none">
            <p className="text-xl text-slate-700 leading-relaxed font-medium">{post.excerpt}</p>

            <h2 className="font-display text-2xl font-bold text-ink mt-10 mb-4">Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              Immigration policies are constantly evolving. Whether you're planning to study, work, or settle abroad, staying up-to-date with the latest changes is critical to a successful application. In this article, our licensed advisors break down the most important updates and what they mean for you.
            </p>

            <h2 className="font-display text-2xl font-bold text-ink mt-10 mb-4">Key changes to watch</h2>
            <p className="text-slate-600 leading-relaxed">
              Governments around the world have introduced several updates this year, ranging from processing time improvements to new pathway categories. Our team monitors every change so you don't have to.
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mt-4">
              <li>New CRS scoring adjustments for skilled workers</li>
              <li>Faster turnaround for family sponsorship applications</li>
              <li>Additional occupations added to the shortage list</li>
              <li>Updated language requirements for select programs</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-ink mt-10 mb-4">How to prepare</h2>
            <p className="text-slate-600 leading-relaxed">
              The best way to prepare is to talk to a licensed immigration advisor early. A 30-minute consultation can save you months of trial and error, ensuring your documents are in order and your strategy fits the latest rules.
            </p>

            <blockquote className="border-l-4 border-brand-500 pl-5 my-8 italic text-lg text-ink">
              "The right advice at the right time can turn a two-year process into a six-month success story."
            </blockquote>

            <h2 className="font-display text-2xl font-bold text-ink mt-10 mb-4">Final thoughts</h2>
            <p className="text-slate-600 leading-relaxed">
              Your migration journey deserves clarity and confidence. Bookmark this blog, subscribe to our newsletter, and reach out whenever you're ready to move forward.
            </p>
          </article>

          <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/60?img=45" className="w-12 h-12 rounded-full" />
              <div>
                <div className="font-semibold text-ink">Visamotion Team</div>
                <div className="text-xs text-slate-500">Licensed advisors</div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-sm font-semibold">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-ink mb-8">Related articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="bg-white rounded-2xl overflow-hidden border border-slate-100 card-hover">
                <img src={r.image} className="w-full h-44 object-cover" />
                <div className="p-5">
                  <span className="text-xs font-semibold text-brand-600">{r.category}</span>
                  <h3 className="mt-2 font-display font-bold text-ink line-clamp-2">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
