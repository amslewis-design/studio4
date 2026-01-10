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

-- Public can select posts that are published
create policy "public_select_published" on public.posts
  for select using (published = true);

-- Authenticated users can insert posts where they are the author
create policy "insert_author" on public.posts
  for insert with check (auth.uid() = author);

-- Authors can update/delete their own posts
create policy "author_manage_own" on public.posts
  for all using (auth.uid() = author) with check (auth.uid() = author);

-- Note: Admin operations (bulk import, publishing, moderation) should use the
-- service_role key via a trusted server environment — do NOT expose that key
-- to client-side code. Adjust policies as necessary for your workflow.
