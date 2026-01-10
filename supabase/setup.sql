-- Supabase schema for blog posts and basic RLS
-- Run this in the Supabase SQL editor or psql connected to your project

-- Enable pgcrypto for gen_random_uuid()
create extension if not exists pgcrypto;

-- posts table
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text not null,
  excerpt text,
  content text not null,
  tag text,
  cover_url text,
  published boolean default false,
  published_at timestamptz,
  author uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists posts_published_idx on public.posts(published, published_at desc);
create index if not exists posts_slug_idx on public.posts(slug);

-- Enable Row Level Security and policies
alter table public.posts enable row level security;

-- Policy 1: Everyone can SELECT published posts
create policy "select_published" on public.posts
  for select using (published = true);

-- Policy 2: Authenticated users can select their own posts (draft + published)
create policy "select_own" on public.posts
  for select using (auth.uid() = author);

-- Policy 3: Anonymous and authenticated users can INSERT posts
-- For production, you should restrict this further (e.g., require authentication)
create policy "insert_allow_all" on public.posts
  for insert with check (true);

-- Policy 4: Only authors (or null author if anonymous) can UPDATE/DELETE their own posts
-- For posts with no author (anonymous), they can be modified if accessed via service role
create policy "author_manage_own" on public.posts
  for update using (auth.uid() = author OR author IS NULL) with check (auth.uid() = author OR author IS NULL);

create policy "author_delete_own" on public.posts
  for delete using (auth.uid() = author OR author IS NULL);

-- Note: For production, consider:
-- 1. Restricting inserts to authenticated users only
-- 2. Using the service_role key for admin operations via server endpoints
-- 3. Implementing more granular access controls

