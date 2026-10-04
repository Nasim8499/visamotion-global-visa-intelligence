import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Globe2, ChevronDown, User as UserIcon, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/countries", label: "Countries" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const nav2 = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMenu(false); }, [pathname]);

  return (
    <>
      <div className="hidden md:block bg-[#0b1220] text-white/80 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> 01619-064013</span>
            <span className="flex items-center gap-2"><Globe2 className="w-3.5 h-3.5" /> info.intlimmigrationconsultancy@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Sat – Thu: 9:00 AM – 7:00 PM</span>
            <select className="bg-transparent text-white/80 text-xs border border-white/10 rounded px-2 py-0.5">
              <option className="text-black">EN</option><option className="text-black">ES</option><option className="text-black">FR</option>
            </select>
          </div>
        </div>
      </div>

      <motion.header
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}
        className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-sm" : "bg-white/60 backdrop-blur"}`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 12 }} className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 grid place-items-center shadow-lg shadow-brand-500/30">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2l7.5 3.75L12 11.7 4.5 7.95 12 4.2z" />
              </svg>
            </motion.div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-extrabold text-lg text-ink">Visamotion</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-600 font-semibold">Immigration</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `relative px-4 py-2 text-sm font-medium transition-colors ${isActive ? "text-brand-600" : "text-slate-700 hover:text-brand-600"}`}>
                {({ isActive }) => (
                  <>
                    {n.label}
                    {isActive && <motion.span layoutId="nav-underline" className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-brand-600" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button onClick={() => setMenu(!menu)} className="flex items-center gap-2 pr-2 pl-1 py-1 rounded-full bg-white border border-slate-200 hover:border-brand-300 transition-colors">
                  <img src={user.avatar} className="w-8 h-8 rounded-full" />
                  <span className="hidden sm:inline text-sm font-semibold text-ink">{user.name.split(" ")[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <AnimatePresence>
                  {menu && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                        <img src={user.avatar} className="w-11 h-11 rounded-full ring-2 ring-brand-100" />
                        <div className="min-w-0">
                          <div className="font-semibold text-ink truncate">{user.name}</div>
                          <div className="text-xs text-slate-500 truncate">{user.email}</div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50">
                          <LayoutDashboard className="w-4 h-4 text-brand-600" /> My Dashboard
                        </Link>
                        <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50">
                          <Settings className="w-4 h-4 text-brand-600" /> Profile Settings
                        </Link>
                        <button onClick={() => { logout(); nav2("/"); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-600 hover:bg-rose-50">
                          <LogOut className="w-4 h-4" /> Sign out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-brand-600">Sign in</Link>
                <Link to="/signup" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white text-sm font-semibold shadow-lg shadow-brand-500/30 hover:-translate-y-0.5 transition-all">
                  Get Started <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                </Link>
              </div>
            )}
            <button onClick={() => setOpen((v) => !v)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100" aria-label="Menu">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="lg:hidden overflow-hidden border-t border-slate-200 bg-white">
              <div className="px-4 py-4 flex flex-col gap-1">
                {nav.map((n, i) => (
                  <motion.div key={n.to} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <NavLink to={n.to} className={({ isActive }) => `block px-4 py-3 rounded-xl font-medium ${isActive ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-50"}`}>{n.label}</NavLink>
                  </motion.div>
                ))}
                {!user && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Link to="/login" className="px-4 py-3 rounded-xl border border-slate-200 text-center font-semibold text-ink">Sign in</Link>
                    <Link to="/signup" className="px-4 py-3 rounded-xl bg-brand-600 text-white text-center font-semibold">Sign up</Link>
                  </div>
                )}
                {user && (
                  <>
                    <Link to="/dashboard" className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50"><LayoutDashboard className="w-4 h-4" /> Dashboard</Link>
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50"><UserIcon className="w-4 h-4" /> Profile</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
