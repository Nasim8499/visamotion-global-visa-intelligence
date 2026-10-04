import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { PageHero, fadeUp, stagger } from "../components/ui";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero
        crumb="Contact"
        title={<>Let's talk about <span className="gradient-text">your move.</span></>}
        subtitle="Book a free 30-minute consultation. A licensed advisor will get back to you within 24 hours."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
          {/* Info */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5">
            {[
              { icon: Phone, title: "Call us", info: "01619-064013", sub: "Also 01335223267 / 01335223269" },
              { icon: Mail, title: "Email us", info: "info.intlimmigrationconsultancy@gmail.com", sub: "24-hour response time" },
              { icon: MapPin, title: "Visit us", info: "Banani C/A, Dhaka", sub: "Bangladesh" },
              { icon: Clock, title: "Business hours", info: "9:00 AM – 7:00 PM", sub: "Saturday to Thursday" },
            ].map((c) => (
              <motion.div key={c.title} variants={fadeUp} className="bg-white rounded-2xl p-5 border border-slate-100 flex gap-4 items-start card-hover">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 grid place-items-center flex-shrink-0">
                  <c.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-ink">{c.title}</h4>
                  <p className="text-sm text-ink font-medium mt-1">{c.info}</p>
                  <p className="text-xs text-slate-500">{c.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-xl">
              {sent ? (
                <div className="text-center py-14">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 grid place-items-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-ink">Message sent!</h3>
                  <p className="mt-2 text-slate-600">We'll be in touch within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-6 px-6 py-3 rounded-full bg-brand-600 text-white font-semibold">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                  <h3 className="font-display text-2xl font-bold text-ink">Book a free consultation</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full name" placeholder="Jane Doe" />
                    <Field label="Email address" type="email" placeholder="jane@email.com" />
                    <Field label="Phone" type="tel" placeholder="01619-064013" />
                    <Field label="Nationality" placeholder="Bangladesh" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-ink mb-2 block">Visa type</label>
                    <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none">
                      <option>Work visa</option>
                      <option>Student visa</option>
                      <option>Permanent residency</option>
                      <option>Tourist visa</option>
                      <option>Business / investor visa</option>
                      <option>Family sponsorship</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-ink mb-2 block">Destination country</label>
                    <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none">
                      <option>Australia</option><option>Serbia</option><option>Russia</option><option>Turkey</option>
                      <option>Singapore</option><option>Malaysia</option><option>Saudi Arabia</option><option>Bahrain</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-ink mb-2 block">Tell us about your situation</label>
                    <textarea rows={4} placeholder="Share your background, goals, and any questions..." className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none resize-none" />
                  </div>
                  <button type="submit" className="w-full py-4 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold shadow-lg shadow-brand-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-slate-500 text-center">
                    By submitting, you agree to our privacy policy. We never share your info.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl overflow-hidden border border-slate-100 aspect-[16/7]">
            <iframe
              title="Location"
              className="w-full h-full"
              src="https://maps.google.com/maps?q=Banani%20C%2FA%20Dhaka%20Bangladesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-semibold text-ink mb-2 block">{label}</label>
      <input {...rest} className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none" />
    </div>
  );
}
