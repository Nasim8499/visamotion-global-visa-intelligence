/**
 * Supabase client for the dedicated Admin Portal.
 *
 * Set the following in your environment (e.g. admin-portal/.env):
 *   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
 *   VITE_SUPABASE_ANON_KEY=<anon-key>
 *
 * When the env vars are absent the portal runs against an in-memory mock so the
 * UI can be previewed locally without a backend. Swap in real keys to connect.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = supabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

export type ApplicationStatus =
  | "pending"
  | "under_review"
  | "pending_docs"
  | "approved"
  | "refused";

export type Application = {
  id: string;
  applicant_name: string;
  email: string;
  country: string;
  route: string;
  status: ApplicationStatus;
  created_at: string;
  documents?: Document[];
};

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  visa_type: string;
  message: string;
  created_at: string;
};

export type Destination = {
  id: string;
  slug: string;
  name: string;
  flag: string;
  gov_fee_bdt: number;
  service_fee_bdt: number;
};

export type Document = {
  id: string;
  application_id: string;
  name: string;
  status: "pending" | "verified" | "rejected";
  url: string;
};
