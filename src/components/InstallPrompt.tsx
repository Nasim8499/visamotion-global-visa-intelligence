import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Smartphone, ShieldCheck } from "lucide-react";

const STORAGE_KEY = "vm_install_prompt_seen";
const APK_URL = "/visamotion.apk";

/**
 * First-load notification: prompts the visitor to download the Android APK
 * (or install the PWA where a native prompt is available).
 * Shows once per browser, on first visit, after a short delay.
 */
export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [deferred, setDeferred] = useState<any>(null);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    const t = setTimeout(() => setShow(true), 1800);
    return () => {
      clearTimeout(t);
      window.removeEventListener("beforeinstallprompt", onPrompt);
    };
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setShow(false);
  };

  const install = async () => {
    if (deferred) {
      deferred.prompt();
      try { await deferred.userChoice; } catch { /* ignore */ }
      close();
      return;
    }
    // Fallback: trigger APK download (Capacitor / TWA build artifact)
    const a = document.createElement("a");
    a.href = APK_URL;
    a.download = "visamotion.apk";
    a.click();
    close();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed bottom-24 right-5 z-50 w-[min(92vw,22rem)]"
        >
          <div className="relative rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-600 via-brand-500 to-accent" />
            <button onClick={close} aria-label="Dismiss" className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 grid place-items-center text-slate-500">
              <X className="w-4 h-4" />
            </button>
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 grid place-items-center shadow-lg shadow-brand-500/30">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-display font-bold text-ink leading-tight">Get the Visamotion App</div>
                  <div className="text-xs text-slate-500">Android APK · install in one tap</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Track your visa case, upload documents and chat with your advisor — installed on your phone, works offline.
              </p>
              <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-500">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure</span>
                <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5 text-brand-600" /> ~8 MB</span>
                <span>v1.0</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={install} className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold shadow-lg shadow-brand-500/30 hover:-translate-y-0.5 transition-all">
                  <Download className="w-4 h-4" /> Download APK
                </button>
                <button onClick={close} className="px-4 py-3 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
