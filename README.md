# Visamotion — Global Visa Intelligence

Premium immigration consultancy platform. Clean White Theme (`#FFFFFF` background,
brand-blue `#2543E6`, amber `#FFB838`, slate `#0B1220`), Framer Motion animations,
mobile-first PWA layout, and an **isolated admin portal**.

## Architecture

```
project/
├── src/                     # Client web app (applicants, visitors, case tracking)
│   ├── App.tsx              # Public router — NO /admin route
│   ├── components/          # Navbar, Footer, VisaSpecimen, InstallPrompt, ui
│   ├── data/
│   │   ├── site.ts          # Localized contacts, pricing (BDT), countries (8)
│   │   └── destinations.ts  # 8 destinations: routes, fees, checklist, specimens
│   └── pages/               # Countries, CountryDetail, Dashboard, Profile, ...
├── admin-portal/            # Dedicated standalone admin app (separate deploy)
│   └── src/
│       ├── lib/supabaseClient.ts  # Supabase connection + shared types
│       ├── lib/adminStore.ts      # Data access (Supabase, mock fallback)
│       └── pages/                 # Overview, Applications, Leads, Pricing, Documents
├── supabase_schema.sql      # Tables: profiles, applications, destinations,
│                            #         documents, leads, cms_content + RLS + seed
├── public/
│   ├── manifest.webmanifest # PWA manifest
│   ├── sw.js                # Service worker (offline app shell)
│   └── icons/               # PWA icons 192 / 512
├── capacitor.config.json    # Capacitor / TWA (APK) wrapping config
└── vite.config.ts           # CAPACITOR=1 → relative fixed-viewport build
```

## Separation of concerns

| App | Audience | Route | Backend |
| --- | --- | --- | --- |
| Client (`src/`) | Applicants, visitors | `/`, `/countries/:slug`, `/dashboard`, `/profile` | Supabase (public read) |
| Admin (`admin-portal/`) | Staff | standalone origin | Supabase (admin RLS) |

The client app has **no** admin route, navigation link, or console control.
Admin capabilities live only in `admin-portal/`.

## Commands

```bash
# Client app
npm install
npm run build            # single-file production build (static hosting)
npm run build:capacitor  # relative-asset build for Capacitor / TWA (APK)
npm run dev              # dev server

# Admin portal
npm run admin:build      # build admin (output: admin-portal/dist)
npm run admin:dev        # dev server on :5174
```

## Admin portal environment

Copy `admin-portal/.env.example` → `admin-portal/.env`:

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

Without these, the portal runs in **demo mode** with mock data so the UI can be
previewed. Apply `supabase_schema.sql` in the Supabase SQL editor first.

## The 8 destinations

Australia, Serbia, Russia, Turkey, Singapore, Malaysia, Saudi Arabia, Bahrain —
each with dedicated routes, points/eligibility breakdown, processing timeline,
document checklist, and a high-fidelity **SPECIMEN** visa mock with lightbox viewer.

## Contacts

- Hotlines: `01619-064013`, `01335223267`, `01335223269`
- Email: `info.intlimmigrationconsultancy@gmail.com`
- Address: Banani C/A, Dhaka, Bangladesh

## APK / install prompt

On first visit the client shows a downloadable Android app prompt. In a hosted
PWA the native install prompt is used; otherwise it downloads `visamotion.apk`
produced by the Capacitor/TWA build (`npm run build:capacitor`).
