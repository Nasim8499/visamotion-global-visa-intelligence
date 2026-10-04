/**
 * DEPRECATED — the admin console has been moved out of the client app.
 *
 * The dedicated Admin Portal now lives in the standalone `admin-portal/` app
 * (see /admin-portal). It is built and deployed separately and connects via
 * `admin-portal/src/lib/supabaseClient.ts`.
 *
 * This file is intentionally not routed in src/App.tsx. It is kept only as a
 * pointer for anyone looking for the old /admin route.
 */
export default function Admin() {
  return null;
}
