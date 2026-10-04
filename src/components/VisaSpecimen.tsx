import { type Destination } from "../data/destinations";

/**
 * High-fidelity visual visa specimen mockup.
 * Official-style header, applicant code, barcode/QR placeholder, approval stamp
 * and a prominent diagonal semi-transparent red "SPECIMEN" watermark.
 */
export default function VisaSpecimen({ dest, compact = false }: { dest: Destination; compact?: boolean }) {
  const { specimen, name, flag } = dest;
  const ref = `VM/${dest.slug.slice(0, 3).toUpperCase()}/26/${specimen.controlNo.split("-").pop()}`;

  return (
    <div className="relative w-full aspect-[1.58/1] rounded-2xl overflow-hidden bg-gradient-to-br from-[#f7f9fc] via-white to-[#eef4ff] border border-slate-200 shadow-lg select-none">
      {/* guilloche security pattern */}
      <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: "repeating-linear-gradient(45deg,#2543e6 0,#2543e6 1px,transparent 1px,transparent 9px), repeating-linear-gradient(-45deg,#2543e6 0,#2543e6 1px,transparent 1px,transparent 9px)" }} />
      <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full border-[10px] border-brand-200/40" />
      <div className="absolute -left-10 -bottom-14 w-44 h-44 rounded-full border-[10px] border-accent/20" />

      {/* Header */}
      <div className="relative px-4 pt-3.5 pb-3 bg-gradient-to-r from-brand-800 to-brand-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-white/15 border border-white/25 grid place-items-center text-sm">{flag}</div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Immigration Authority</div>
              <div className="text-sm font-display font-extrabold leading-none">{name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase tracking-widest text-white/70">Document</div>
            <div className="text-[10px] font-bold">{specimen.documentType.split("—")[0].trim()}</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="relative px-4 py-3 grid grid-cols-[1.35fr_1fr] gap-3">
        <div className="space-y-1.5">
          <Row k="Applicant code" v={specimen.controlNo} />
          <Row k="Reference" v={ref} />
          <Row k="Route" v={dest.routes[0]?.code ?? "—"} />
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <Mini k="Valid from" v={specimen.validFrom} />
            <Mini k="Valid to" v={specimen.validTo} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between">
          <div className="w-16 h-16 rounded-lg bg-white border border-slate-300 grid place-items-center">
            <div className="grid grid-cols-4 gap-0.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-[1px] ${i % 3 === 0 ? "bg-ink" : "bg-slate-300"}`} />
              ))}
            </div>
          </div>
          <div className="text-[8px] uppercase tracking-widest text-slate-500">Biometric</div>
        </div>
      </div>

      {/* Footer: barcode + stamp */}
      <div className="absolute bottom-2.5 left-4 right-4 flex items-end justify-between">
        <div>
          <div className="flex items-end gap-[2px] h-6">
            {Array.from({ length: 42 }).map((_, i) => (
              <span key={i} style={{ height: `${40 + ((i * 7) % 60)}%` }} className={`${i % 2 ? "w-[1.5px]" : "w-[2.5px]"} bg-ink/80`} />
            ))}
          </div>
          <div className="text-[7px] tracking-[0.3em] text-slate-500 mt-0.5">{specimen.controlNo}</div>
        </div>
        <div className="relative">
          <div className="w-16 h-16 -rotate-12 rounded-full border-[2.5px] border-emerald-600/70 grid place-items-center">
            <div className="text-center leading-none">
              <div className="text-[6px] font-bold uppercase text-emerald-700/80">Approved</div>
              <div className="text-[9px] font-extrabold text-emerald-700/80">GRANTED</div>
              <div className="text-[6px] text-emerald-700/70">2026 · BD</div>
            </div>
          </div>
        </div>
      </div>

      {/* SPECIMEN watermark */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className={`font-display font-black text-rose-600/25 tracking-[0.12em] -rotate-[24deg] whitespace-nowrap ${compact ? "text-2xl" : "text-4xl md:text-5xl"}`}>
          SPECIMEN
        </span>
      </div>
      <div className="absolute top-0 right-0 bg-rose-600 text-white text-[7px] font-bold px-2 py-0.5 rounded-bl-md uppercase tracking-widest">
        Specimen · Not valid
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[8px] uppercase tracking-widest text-slate-400">{k}</div>
      <div className="text-[11px] font-bold text-ink font-mono leading-tight">{v}</div>
    </div>
  );
}

function Mini({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-white/70 border border-slate-200 rounded-md px-2 py-1">
      <div className="text-[7px] uppercase tracking-widest text-slate-400">{k}</div>
      <div className="text-[10px] font-semibold text-ink">{v}</div>
    </div>
  );
}
