import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { FileText, MessageCircle, Clock, CheckCircle2, TrendingUp, Calendar, Bell, Download, Upload, Sparkles, ChevronRight, Globe2 } from "lucide-react";
import { chatPreview } from "../data/extra";

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" state={{ from: "/dashboard" }} replace />;

  const progress = 74;
  const steps = [
    { name: "Eligibility check", done: true },
    { name: "Documents collected", done: true },
    { name: "Application submitted", done: true },
    { name: "Biometrics scheduled", done: true },
    { name: "Interview complete", done: false, active: true },
    { name: "Decision received", done: false },
  ];

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="text-sm text-slate-500">Welcome back,</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-ink">Hi {user.name.split(" ")[0]} 👋</h1>
            <p className="text-slate-600 mt-1">Here's what's happening with your case today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-11 h-11 rounded-full bg-white border border-slate-200 grid place-items-center">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
            <img src={user.avatar} className="w-11 h-11 rounded-full ring-2 ring-brand-100" />
          </div>
        </motion.div>

        {/* Progress hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-ink text-white p-6 md:p-8 mb-6">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid md:grid-cols-[1.5fr_1fr] gap-6 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-bold text-accent border border-white/20">
                <Sparkles className="w-3 h-3" /> Active case · #VM-{user.id.toUpperCase()}42
              </div>
              <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold">{user.visaType || "Australia Skilled 189"} Application</h2>
              <p className="mt-1 text-white/70">Estimated decision: <span className="text-accent font-semibold">April 28, 2026</span></p>
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/80">Overall progress</span>
                  <span className="font-bold">{progress}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.2, delay: 0.2 }} className="h-full bg-gradient-to-r from-accent to-orange-400 rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {steps.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${
                  s.done ? "bg-white/5" : s.active ? "bg-accent/20 border border-accent/40" : "bg-white/5 opacity-50"
                }`}>
                  <div className={`w-6 h-6 rounded-full grid place-items-center flex-shrink-0 ${
                    s.done ? "bg-emerald-500" : s.active ? "bg-accent text-ink" : "bg-white/10"
                  }`}>
                    {s.done ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                  </div>
                  <span className="text-sm">{s.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: FileText, label: "Documents", value: "12/14", color: "bg-blue-50 text-blue-600" },
            { icon: MessageCircle, label: "Messages", value: "3 new", color: "bg-emerald-50 text-emerald-600" },
            { icon: Clock, label: "Days elapsed", value: "127", color: "bg-amber-50 text-amber-600" },
            { icon: TrendingUp, label: "Points score", value: "85 pts", color: "bg-violet-50 text-violet-600" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }} className="bg-white rounded-2xl p-5 border border-slate-100 card-hover">
              <div className={`w-10 h-10 rounded-xl ${s.color} grid place-items-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500">{s.label}</div>
              <div className="font-display text-xl font-bold text-ink">{s.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Two column */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Documents */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-bold text-lg text-ink">Documents</h3>
              <button className="text-sm font-semibold text-brand-600 flex items-center gap-1"><Upload className="w-4 h-4" /> Upload</button>
            </div>
            <div className="space-y-2">
              {[
                { name: "Passport bio page", status: "Verified", size: "1.2 MB" },
                { name: "IELTS score report", status: "Verified", size: "480 KB" },
                { name: "Bachelor's degree", status: "Verified", size: "2.4 MB" },
                { name: "Employment letters (3)", status: "Under review", size: "3.1 MB" },
                { name: "Police clearance", status: "Pending", size: "—" },
                { name: "Medical exam", status: "Pending", size: "—" },
              ].map((d, i) => (
                <motion.div key={d.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.04 }} className="flex items-center justify-between py-3 px-3 rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 grid place-items-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-ink truncate">{d.name}</div>
                      <div className="text-xs text-slate-500">{d.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      d.status === "Verified" ? "bg-emerald-100 text-emerald-700" :
                      d.status === "Under review" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"
                    }`}>{d.status}</span>
                    <Download className="w-4 h-4 text-slate-400 hidden sm:block" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
              <div className="relative">
                <img src="https://i.pravatar.cc/60?img=12" className="w-11 h-11 rounded-full" />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-ink text-sm">Marcus Chen</div>
                <div className="text-xs text-emerald-600">Online · your advisor</div>
              </div>
              <MessageCircle className="w-5 h-5 text-brand-600" />
            </div>
            <div className="flex-1 space-y-3 mb-4 max-h-72 overflow-y-auto">
              {chatPreview.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
                  <div className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm ${
                    m.from === "me" ? "bg-brand-600 text-white rounded-br-sm" : "bg-slate-100 text-ink rounded-bl-sm"
                  }`}>
                    {m.text}
                    <div className={`text-[10px] mt-0.5 ${m.from === "me" ? "text-white/60" : "text-slate-500"}`}>{m.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2">
              <input placeholder="Type a message..." className="flex-1 bg-transparent text-sm focus:outline-none" />
              <button className="w-8 h-8 rounded-full bg-brand-600 text-white grid place-items-center">→</button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Upcoming */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Upcoming</h3>
            <div className="space-y-3">
              {[
                { title: "Biometrics appointment", when: "Apr 05 · 10:30 AM", loc: "VAC Dhaka" },
                { title: "Follow-up call", when: "Apr 12 · 3:00 PM", loc: "Video call" },
                { title: "Interview slot", when: "Apr 22 · 9:00 AM", loc: "Consulate" },
              ].map((u) => (
                <div key={u.title} className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 grid place-items-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-brand-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-ink">{u.title}</div>
                    <div className="text-xs text-slate-500">{u.when}</div>
                    <div className="text-xs text-slate-400">{u.loc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Journey map */}
          <div className="bg-gradient-to-br from-brand-50 to-white rounded-2xl border border-brand-100 p-6">
            <Globe2 className="w-8 h-8 text-brand-600 mb-3" />
            <h3 className="font-display font-bold text-lg text-ink">Your journey</h3>
            <p className="text-sm text-slate-600 mt-1">Dhaka 🇧🇩 → Sydney 🇦🇺</p>
            <div className="mt-5 relative h-2 bg-slate-200 rounded-full">
              <motion.div initial={{ width: 0 }} animate={{ width: "74%" }} transition={{ duration: 1.5, delay: 0.5 }} className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-500 to-accent rounded-full" />
              <motion.div initial={{ left: "0%" }} animate={{ left: "74%" }} transition={{ duration: 1.5, delay: 0.5 }} className="absolute -top-2 w-6 h-6 rounded-full bg-white border-2 border-brand-600 grid place-items-center text-xs">✈️</motion.div>
            </div>
            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>Start</span><span>Landed 🎉</span>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="font-display font-bold text-lg text-ink mb-4">Quick actions</h3>
            <div className="space-y-2">
              {[
                { icon: Upload, label: "Upload document" },
                { icon: MessageCircle, label: "Message advisor" },
                { icon: Calendar, label: "Book a call" },
                { icon: FileText, label: "Download case file" },
              ].map((a) => (
                <button key={a.label} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-left">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 grid place-items-center">
                    <a.icon className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-ink">{a.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>
            <Link to="/profile" className="mt-4 block text-center text-sm text-brand-600 font-semibold">Edit profile →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
