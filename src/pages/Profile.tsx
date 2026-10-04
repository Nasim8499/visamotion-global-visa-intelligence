import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Camera, Save, LogOut, Bell, Shield, CreditCard, HelpCircle } from "lucide-react";

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  if (!user) return <Navigate to="/login" state={{ from: "/profile" }} replace />;

  const [name, setName] = useState(user.name);
  const [country, setCountry] = useState(user.country || "");
  const [visaType, setVisaType] = useState(user.visaType || "");
  const [saved, setSaved] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, country, visaType });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-700 to-ink text-white p-8 mb-6">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-5">
            <div className="relative">
              <img src={user.avatar} className="w-24 h-24 rounded-2xl ring-4 ring-white/20 shadow-xl" />
              <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent text-ink grid place-items-center shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-display text-2xl md:text-3xl font-bold">{user.name}</h1>
              <p className="text-white/70">{user.email}</p>
              <div className="mt-2 flex justify-center sm:justify-start gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20">{user.role === "admin" ? "🛡️ Admin" : "🌍 Client"}</span>
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20">Joined {user.joined}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-white rounded-2xl border border-slate-100 p-3 h-fit">
            {[
              { icon: Shield, label: "Profile", active: true },
              { icon: Bell, label: "Notifications" },
              { icon: CreditCard, label: "Billing" },
              { icon: HelpCircle, label: "Help" },
            ].map((i) => (
              <button key={i.label} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${i.active ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"}`}>
                <i.icon className="w-4 h-4" /> {i.label}
              </button>
            ))}
            <button onClick={logout} className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </aside>

          {/* Form */}
          <form onSubmit={save} className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8">
            <h2 className="font-display text-xl font-bold text-ink">Personal information</h2>
            <p className="text-sm text-slate-500 mt-1">Update your profile so your advisor can serve you best.</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-ink mb-1.5 block">Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none text-sm" />
              </div>
              <div>
                <label className="text-sm font-semibold text-ink mb-1.5 block">Email</label>
                <input value={user.email} disabled className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm" />
              </div>
              <div>
                <label className="text-sm font-semibold text-ink mb-1.5 block">Destination country</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none text-sm">
                  <option value="">Select...</option>
                  {["Canada", "Australia", "USA", "UK", "Germany", "New Zealand", "Singapore", "UAE"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-ink mb-1.5 block">Visa type</label>
                <select value={visaType} onChange={(e) => setVisaType(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none text-sm">
                  <option value="">Select...</option>
                  {["Work", "Student", "PR", "Tourist", "Business", "Family"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold text-ink mb-1.5 block">Bio</label>
              <textarea rows={4} placeholder="A little about yourself..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:outline-none text-sm resize-none" />
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button type="submit" className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold shadow-lg shadow-brand-500/30 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save changes
              </button>
              {saved && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-emerald-600 font-semibold">✓ Saved</motion.span>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
