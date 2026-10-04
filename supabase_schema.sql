-- =============================================================================
-- Visamotion Global Visa Intelligence — Supabase Schema
-- Client app + dedicated Admin Portal share these tables.
-- Run this in the Supabase SQL editor (Database > SQL Editor > New query).
-- =============================================================================

-- Needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles  (mirrors auth.users, one row per client / admin)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  full_name    text,
  email        text,
  phone        text,
  nationality  text,
  avatar_url   text,
  role         text not null default 'client' check (role in ('client', 'admin')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- destinations  (pricing per country / route, editable by admin)
-- ---------------------------------------------------------------------------
create table if not exists public.destinations (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  name              text not null,
  flag              text,
  tagline           text,
  gov_fee_bdt       numeric not null default 0,
  gov_fee_usd       numeric not null default 0,
  service_fee_bdt   numeric not null default 0,
  processing_time   text,
  active            boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- applications  (visa cases submitted by clients)
-- ---------------------------------------------------------------------------
create table if not exists public.applications (
  id              uuid primary key default gen_random_uuid(),
  profile_id      uuid references public.profiles (id) on delete set null,
  applicant_name  text not null,
  email           text not null,
  phone           text,
  country_slug    text references public.destinations (slug) on delete set null,
  route           text,
  status          text not null default 'pending'
                    check (status in ('pending', 'under_review', 'pending_docs', 'approved', 'refused')),
  notes           text,
  submitted_at    timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- documents  (files uploaded against an application)
-- ---------------------------------------------------------------------------
create table if not exists public.documents (
  id              uuid primary key default gen_random_uuid(),
  application_id  uuid references public.applications (id) on delete cascade,
  name            text not null,
  storage_path    text,
  status          text not null default 'pending'
                    check (status in ('pending', 'verified', 'rejected')),
  uploaded_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- leads  (submissions from the booking / contact form)
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text,
  phone        text,
  country      text,
  visa_type    text,
  message      text,
  source       text default 'booking_form',
  status       text not null default 'new' check (status in ('new', 'contacted', 'converted', 'closed')),
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- cms_content  (editable site copy / banners / announcements)
-- ---------------------------------------------------------------------------
create table if not exists public.cms_content (
  id           uuid primary key default gen_random_uuid(),
  key          text unique not null,
  value        jsonb not null default '{}'::jsonb,
  locale       text default 'en',
  updated_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index if not exists idx_applications_status  on public.applications (status);
create index if not exists idx_applications_country on public.applications (country_slug);
create index if not exists idx_documents_app        on public.documents (application_id);
create index if not exists idx_leads_status         on public.leads (status);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists trg_applications_updated on public.applications;
create trigger trg_applications_updated before update on public.applications
  for each row execute function public.set_updated_at();

drop trigger if exists trg_destinations_updated on public.destinations;
create trigger trg_destinations_updated before update on public.destinations
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles     enable row level security;
alter table public.applications enable row level security;
alter table public.destinations enable row level security;
alter table public.documents    enable row level security;
alter table public.leads        enable row level security;
alter table public.cms_content  enable row level security;

-- helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer;

-- profiles: users read/update their own; admins read all
drop policy if exists "profiles self read"   on public.profiles;
create policy "profiles self read" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
  for update using (auth.uid() = id or public.is_admin());

-- destinations: public read, admin write
drop policy if exists "destinations public read" on public.destinations;
create policy "destinations public read" on public.destinations
  for select using (true);
drop policy if exists "destinations admin write" on public.destinations;
create policy "destinations admin write" on public.destinations
  for all using (public.is_admin());

-- applications: owner read/insert, admin full
drop policy if exists "applications owner" on public.applications;
create policy "applications owner" on public.applications
  for select using (auth.uid() = profile_id or public.is_admin());
drop policy if exists "applications insert" on public.applications;
create policy "applications insert" on public.applications
  for insert with check (auth.uid() = profile_id or public.is_admin());
drop policy if exists "applications admin write" on public.applications;
create policy "applications admin write" on public.applications
  for all using (public.is_admin());

-- documents: owner via application, admin full
drop policy if exists "documents owner" on public.documents;
create policy "documents owner" on public.documents
  for select using (
    public.is_admin() or exists (
      select 1 from public.applications a
      where a.id = documents.application_id and a.profile_id = auth.uid()
    )
  );
drop policy if exists "documents admin write" on public.documents;
create policy "documents admin write" on public.documents
  for all using (public.is_admin());

-- leads: anyone may insert (booking form), only admin read/update
drop policy if exists "leads insert" on public.leads;
create policy "leads insert" on public.leads
  for insert with check (true);
drop policy if exists "leads admin" on public.leads;
create policy "leads admin" on public.leads
  for all using (public.is_admin());

-- cms_content: public read, admin write
drop policy if exists "cms public read" on public.cms_content;
create policy "cms public read" on public.cms_content
  for select using (true);
drop policy if exists "cms admin write" on public.cms_content;
create policy "cms admin write" on public.cms_content
  for all using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Seed destinations (8 target markets)
-- ---------------------------------------------------------------------------
insert into public.destinations (slug, name, flag, gov_fee_bdt, gov_fee_usd, service_fee_bdt, processing_time)
values
  ('australia',    'Australia',    '🇦🇺', 552000, 4600, 360000, '3 to 8 months'),
  ('serbia',       'Serbia',       '🇷🇸',  14400,  120,  90000, '45 to 60 days'),
  ('russia',       'Russia',       '🇷🇺',  24000,  200, 210000, '2 to 4 months'),
  ('turkey',       'Turkey',       '🇹🇷',  10800,   90,  84000, '30 to 90 days'),
  ('singapore',    'Singapore',    '🇸🇬',  25200,  210, 240000, '3 to 6 weeks'),
  ('malaysia',     'Malaysia',     '🇲🇾',  16800,  140, 168000, '4 to 8 weeks'),
  ('saudi-arabia', 'Saudi Arabia', '🇸🇦',  25200,  210, 168000, '4 to 10 weeks'),
  ('bahrain',      'Bahrain',      '🇧🇭',  21600,  180, 156000, '3 to 6 weeks')
on conflict (slug) do nothing;
