# VisaMOTion

Mobile-first, installable web-app prototype for a visa agency case workspace.

## Included

- VisaMOTion logo and app identity
- Eight destination workspaces with links to the supplied official portals
- Client creation and local browser persistence
- Editable preparation checklist, case activity, and responsive navigation
- Chat, voice-input, integration-settings, and document UI entry points
- Web app manifest, icon, and offline service worker

## Run locally

Serve this directory over HTTP (service workers and install prompts do not work from `file://`). For example, with Node installed:

```sh
npx serve .
```

Open the local address in Safari or Chrome. On iOS, use Share > Add to Home Screen.

## Production integration still required

This app stores demo case data in the current browser's `localStorage`. It has no authentication, encrypted database, server API, live AI integration, or government application submission. Configure a backend before using real client records. Keep provider and Neon credentials only in server-side environment secrets; never ship them in client code. The API credential shared in chat should be rotated before production use.

The app only opens the listed official portals. It does not claim to verify visa eligibility, file forms, or submit applications.

## Security setup required before connecting the existing database

The inspected `visamotion-hub` Supabase project currently has anonymous/public full-access policies on its `applicants`, `api_keys`, `alerts`, `deadlines`, and `pipeline_events` tables. Applicant columns include passport number, date of birth, and MRZ; the API-key table includes a `key_value` column. Do not connect this browser app to that project until those policies are removed, row-level security is enabled with authenticated and tenant-scoped policies, and any exposed credentials are rotated. Use a separate staging project for setup and test with synthetic data.
