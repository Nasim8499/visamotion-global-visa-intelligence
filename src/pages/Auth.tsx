import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User as UserIcon, Eye, EyeOff, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function GoogleBadge() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.5 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.4 34.9 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.6 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.2 5.5l6.3 5.3C41.4 35.5 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5z"/>
    </svg>
  );
}

function AuthShell({ children, side }: { children: React.ReactNode; side: "login" | "signup" }) {
  return (
    <section className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-ink text-white">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        <div className="absolute inset-0 bg-dots opacity-20" />
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-16 right-16 w-32 h-32 rounded-3xl bg-accent/20 blur-2xl" />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-16 left-16 w-40 h-40 rounded-full bg-brand-400/30 blur-3xl" />
        <div className="relative h-full flex flex-col justify-center px-16">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/20 grid place-items-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-accent" fill="currentColor">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/>
              </svg>
            </div>
            <span className="font-display text-xl font-bold">Visamotion</span>
          </Link>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl xl:text-5xl font-bold leading-tight">
            {side === "login" ? "Welcome back to your journey." : "Start your move today."}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-white/70 text-lg">
            {side === "login"
              ? "Log in to track your visa progress, chat with your advisor, and manage documents."
              : "Create your free account and unlock personalized visa pathways in seconds."}
          </motion.p>
          <div className="mt-10 space-y-4">
            {["Real-time case tracking", "Direct chat with your advisor", "Free 30-min consultation", "Priority filing access"].map((f, i) => (
              <motion.div key={f} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 grid place-items-center">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                </div>
                <span className="text-white/90">{f}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10">
            <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/60?img=32" className="w-11 h-11 rounded-full ring-2 ring-white/20" />
              <div>
                <div className="text-sm font-semibold">Sofia Martinez</div>
                <div className="text-xs text-white/60">Just approved · UK Student Visa 🇬🇧</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/80 italic">"Signing up was the best 2 minutes I ever spent."</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ icon: Icon, ...rest }: { icon: any } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input {...rest} className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none transition-all text-sm" />
    </div>
  );
}

export function Login() {
  const { login, loginWithGoogle } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as any;
  const to = loc.state?.from || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = login(email, password);
    if (!r.ok) setErr(r.error || "Login failed");
    else nav(to);
  };

  return (
    <AuthShell side="login">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
          <Sparkles className="w-3 h-3" /> Sign in
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink">Welcome back</h1>
        <p className="mt-2 text-slate-500 text-sm">Log in to your Visamotion account.</p>

        <button
          onClick={() => {
            const email = prompt("Enter your Gmail address:", "you@gmail.com") || "";
            if (!email) return;
            const name = prompt("Your name:", "New User") || "New User";
            loginWithGoogle(email, name);
            nav(to);
          }}
          className="mt-6 w-full py-3.5 rounded-xl border-2 border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/50 flex items-center justify-center gap-3 font-semibold text-ink transition-all"
        >
          <GoogleBadge /> Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
          <div className="flex-1 h-px bg-slate-200" /> OR <div className="flex-1 h-px bg-slate-200" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Field icon={Mail} type="email" placeholder="you@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type={showPw ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none text-sm" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {err && <div className="text-sm text-rose-600 bg-rose-50 px-4 py-2 rounded-lg">{err}</div>}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600"><input type="checkbox" className="rounded" /> Remember me</label>
            <a href="#" className="text-brand-600 font-semibold">Forgot password?</a>
          </div>
          <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold shadow-lg shadow-brand-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2">
            Sign in <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here? <Link to="/signup" className="text-brand-600 font-bold">Create an account</Link>
        </p>
        <p className="mt-4 text-xs text-slate-400 text-center">
          Demo: sign in with <span className="font-mono">aarav@gmail.com</span> to preview the client dashboard.
        </p>
      </motion.div>
    </AuthShell>
  );
}

export function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return setErr("Password must be at least 6 characters.");
    const r = signup(name, email, password);
    if (!r.ok) setErr(r.error || "Signup failed");
    else nav("/dashboard");
  };

  return (
    <AuthShell side="signup">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-brand-800 text-xs font-bold">
          <Sparkles className="w-3 h-3" /> Free forever
        </div>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink">Create your account</h1>
        <p className="mt-2 text-slate-500 text-sm">Join 12,000+ people moving abroad with Visamotion.</p>

        <button
          onClick={() => {
            const em = prompt("Sign up with Gmail — enter your email:", "you@gmail.com") || "";
            if (!em) return;
            const nm = prompt("Your full name:", "Your Name") || "New User";
            loginWithGoogle(em, nm);
            nav("/dashboard");
          }}
          className="mt-6 w-full py-3.5 rounded-xl border-2 border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50/50 flex items-center justify-center gap-3 font-semibold text-ink transition-all"
        >
          <GoogleBadge /> Sign up with Gmail
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
          <div className="flex-1 h-px bg-slate-200" /> OR <div className="flex-1 h-px bg-slate-200" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Field icon={UserIcon} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Field icon={Mail} type="email" placeholder="you@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type={showPw ? "text" : "password"} placeholder="Create password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-slate-200 bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-100 focus:outline-none text-sm" />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {err && <div className="text-sm text-rose-600 bg-rose-50 px-4 py-2 rounded-lg">{err}</div>}
          <label className="flex items-start gap-2 text-xs text-slate-500">
            <input type="checkbox" required className="mt-0.5" />
            I agree to Visamotion's <a href="#" className="text-brand-600 font-semibold">Terms</a> & <a href="#" className="text-brand-600 font-semibold">Privacy Policy</a>.
          </label>
          <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold shadow-lg shadow-brand-500/30 hover:shadow-xl transition-all flex items-center justify-center gap-2">
            Create account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account? <Link to="/login" className="text-brand-600 font-bold">Sign in</Link>
        </p>
      </motion.div>
    </AuthShell>
  );
}
