import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import InstallPrompt from "./components/InstallPrompt";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Countries from "./pages/Countries";
import CountryDetail from "./pages/CountryDetail";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Login, Signup } from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const hideChrome = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideChrome && <Navbar />}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/services/:slug" element={<PageTransition><ServiceDetail /></PageTransition>} />
            <Route path="/countries" element={<PageTransition><Countries /></PageTransition>} />
            <Route path="/countries/:slug" element={<PageTransition><CountryDetail /></PageTransition>} />
            <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </div>
      {!hideChrome && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-white text-ink font-sans">
        <ScrollToTop />
        <AnimatedRoutes />
        <FloatingCta />
        <InstallPrompt />
      </div>
    </AuthProvider>
  );
}

function FloatingCta() {
  const location = useLocation();
  if (["/login", "/signup"].includes(location.pathname)) return null;
  return (
    <a
      href="https://wa.me/8801619064013"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-emerald-500 text-white grid place-items-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor">
        <path d="M16 3C9 3 3 9 3 16c0 2.3.6 4.5 1.8 6.5L3 29l6.7-1.8c2 1 4.2 1.5 6.3 1.5 7 0 13-6 13-13S23 3 16 3zm0 23.6c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4 1 1-3.9-.2-.4C6 20 5.4 18 5.4 16c0-5.9 4.8-10.7 10.7-10.7S26.8 10.1 26.8 16 22 26.6 16 26.6zm5.9-8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2c-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
      </svg>
    </a>
  );
}
