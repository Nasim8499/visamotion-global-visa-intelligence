import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatBDT = (n: number) => "৳ " + n.toLocaleString("en-BD");

export const statusMeta: Record<string, { label: string; cls: string; dot: string }> = {
  pending: { label: "Pending", cls: "bg-slate-100 text-slate-700", dot: "bg-slate-400" },
  under_review: { label: "Under Review", cls: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  pending_docs: { label: "Pending Docs", cls: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
  approved: { label: "Approved", cls: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  refused: { label: "Refused", cls: "bg-rose-100 text-rose-700", dot: "bg-rose-500" },
};
