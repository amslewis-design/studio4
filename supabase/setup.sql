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

-- Policy 3: Only authenticated users can INSERT posts
create policy "insert_authenticated_only" on public.posts
  for insert with check (auth.role() = 'authenticated');

-- Policy 4: Only authors can UPDATE their own posts
create policy "author_manage_own" on public.posts
  for update using (auth.uid() = author) with check (auth.uid() = author);

create policy "author_delete_own" on public.posts
  for delete using (auth.uid() = author);

-- Note: For production, consider:
-- 1. ✅ Restricting inserts to authenticated users only (IMPLEMENTED)
-- 2. Using the service_role key for admin operations via server endpoints
-- 3. Implementing more granular access controls (e.g., roles table for admin/editor/viewer)

