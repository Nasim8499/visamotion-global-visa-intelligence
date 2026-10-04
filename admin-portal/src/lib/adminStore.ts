import { supabase, supabaseConfigured, type Application, type Destination, type Lead, type Document, type ApplicationStatus } from "./supabaseClient";

// ---------------------------------------------------------------------------
// Mock dataset used when Supabase env vars are not configured.
// ---------------------------------------------------------------------------
const mockApplications: Application[] = [
  { id: "a1", applicant_name: "Rakib Hasan", email: "rakib@gmail.com", country: "australia", route: "Subclass 189", status: "under_review", created_at: "2026-03-02", documents: [] },
  { id: "a2", applicant_name: "Nusrat Jahan", email: "nusrat@gmail.com", country: "serbia", route: "d.o.o.", status: "pending_docs", created_at: "2026-02-26", documents: [] },
  { id: "a3", applicant_name: "Tanvir Ahmed", email: "tanvir@gmail.com", country: "singapore", route: "EP (COMPASS)", status: "approved", created_at: "2026-02-19", documents: [] },
  { id: "a4", applicant_name: "Farhana Akter", email: "farhana@gmail.com", country: "turkey", route: "İkamet", status: "pending", created_at: "2026-03-08", documents: [] },
  { id: "a5", applicant_name: "Imran Khan", email: "imran@gmail.com", country: "russia", route: "HQS", status: "refused", created_at: "2026-01-30", documents: [] },
  { id: "a6", applicant_name: "Sadia Islam", email: "sadia@gmail.com", country: "malaysia", route: "EMGS Student", status: "under_review", created_at: "2026-03-05", documents: [] },
];

const mockLeads: Lead[] = [
  { id: "l1", name: "Arif Chowdhury", email: "arif@gmail.com", phone: "01619-064013", country: "australia", visa_type: "Work visa", message: "Want to apply for 482 sponsorship.", created_at: "2026-03-09" },
  { id: "l2", name: "Mitu Rahman", email: "mitu@gmail.com", phone: "01335223267", country: "singapore", visa_type: "PR", message: "COMPASS score check needed.", created_at: "2026-03-08" },
  { id: "l3", name: "Jahid Hasan", email: "jahid@gmail.com", phone: "01335223269", country: "turkey", visa_type: "Tourist", message: "Real estate investor route.", created_at: "2026-03-07" },
];

const mockDestinations: Destination[] = [
  { id: "d1", slug: "australia", name: "Australia", flag: "🇦🇺", gov_fee_bdt: 552000, service_fee_bdt: 360000 },
  { id: "d2", slug: "serbia", name: "Serbia", flag: "🇷🇸", gov_fee_bdt: 14400, service_fee_bdt: 90000 },
  { id: "d3", slug: "russia", name: "Russia", flag: "🇷🇺", gov_fee_bdt: 24000, service_fee_bdt: 210000 },
  { id: "d4", slug: "turkey", name: "Turkey", flag: "🇹🇷", gov_fee_bdt: 10800, service_fee_bdt: 84000 },
  { id: "d5", slug: "singapore", name: "Singapore", flag: "🇸🇬", gov_fee_bdt: 25200, service_fee_bdt: 240000 },
  { id: "d6", slug: "malaysia", name: "Malaysia", flag: "🇲🇾", gov_fee_bdt: 16800, service_fee_bdt: 168000 },
  { id: "d7", slug: "saudi-arabia", name: "Saudi Arabia", flag: "🇸🇦", gov_fee_bdt: 25200, service_fee_bdt: 168000 },
  { id: "d8", slug: "bahrain", name: "Bahrain", flag: "🇧🇭", gov_fee_bdt: 21600, service_fee_bdt: 156000 },
];

const mockDocuments: Document[] = [
  { id: "doc1", application_id: "a1", name: "Passport bio page", status: "verified", url: "#" },
  { id: "doc2", application_id: "a1", name: "IELTS report", status: "verified", url: "#" },
  { id: "doc3", application_id: "a2", name: "Company registration", status: "pending", url: "#" },
  { id: "doc4", application_id: "a3", name: "Employment contract", status: "verified", url: "#" },
  { id: "doc5", application_id: "a5", name: "Medical certificate", status: "rejected", url: "#" },
];

// ---------------------------------------------------------------------------
// Store — talks to Supabase when configured, else the mock above.
// ---------------------------------------------------------------------------
export const usingSupabase = supabaseConfigured;

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.warn("[admin] query failed, using fallback", e);
    return fallback;
  }
}

export async function fetchApplications(): Promise<Application[]> {
  const sb = supabase;
  if (!sb) return mockApplications;
  return safe(async () => {
    const { data, error } = await sb.from("applications").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Application[]) ?? [];
  }, mockApplications);
}

export async function updateApplicationStatus(id: string, status: ApplicationStatus): Promise<void> {
  const sb = supabase;
  if (!sb) {
    const a = mockApplications.find((x) => x.id === id);
    if (a) a.status = status;
    return;
  }
  await sb.from("applications").update({ status }).eq("id", id);
}

export async function fetchLeads(): Promise<Lead[]> {
  const sb = supabase;
  if (!sb) return mockLeads;
  return safe(async () => {
    const { data, error } = await sb.from("leads").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return (data as Lead[]) ?? [];
  }, mockLeads);
}

export async function fetchDestinations(): Promise<Destination[]> {
  const sb = supabase;
  if (!sb) return mockDestinations;
  return safe(async () => {
    const { data, error } = await sb.from("destinations").select("*").order("name");
    if (error) throw error;
    return (data as Destination[]) ?? [];
  }, mockDestinations);
}

export async function updateDestination(
  id: string,
  patch: Partial<Pick<Destination, "gov_fee_bdt" | "service_fee_bdt">>
): Promise<void> {
  const sb = supabase;
  if (!sb) {
    const d = mockDestinations.find((x) => x.id === id);
    if (d) Object.assign(d, patch);
    return;
  }
  await sb.from("destinations").update(patch).eq("id", id);
}

export async function fetchDocuments(applicationId: string): Promise<Document[]> {
  const sb = supabase;
  if (!sb) return mockDocuments.filter((d) => d.application_id === applicationId);
  return safe(async () => {
    const { data, error } = await sb.from("documents").select("*").eq("application_id", applicationId);
    if (error) throw error;
    return (data as Document[]) ?? [];
  }, mockDocuments.filter((d) => d.application_id === applicationId));
}

export type { Application, Destination, Lead, Document, ApplicationStatus };
