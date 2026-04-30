-- Supabase schema for blog posts and basic RLS
-- Run this in the Supabase SQL editor or psql connected to your project

-- Enable pgcrypto for gen_random_uuid()
create extension if not exists pgcrypto;

-- posts table
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  translation_group_id uuid,
  language text default 'es' check (language in ('es', 'en')),
  title text not null,
  seo_title text,
  seo_description text,
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

-- Ensure existing projects gain new columns safely
alter table public.posts add column if not exists translation_group_id uuid;
alter table public.posts add column if not exists language text default 'es';
alter table public.posts add column if not exists seo_title text;
alter table public.posts add column if not exists seo_description text;

create index if not exists posts_published_idx on public.posts(published, published_at desc);
create index if not exists posts_slug_idx on public.posts(slug);
create index if not exists posts_language_idx on public.posts(language);
create index if not exists posts_translation_group_idx on public.posts(translation_group_id, language) where translation_group_id is not null;
create unique index if not exists posts_translation_group_language_uidx on public.posts(translation_group_id, language) where translation_group_id is not null;

-- Enable Row Level Security and policies
alter table public.posts enable row level security;

drop policy if exists "select_published" on public.posts;
drop policy if exists "select_own" on public.posts;
drop policy if exists "insert_authenticated_only" on public.posts;
drop policy if exists "author_manage_own" on public.posts;
drop policy if exists "author_delete_own" on public.posts;

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

-- Seed post: Wellness content strategy for yoga/pilates studios
-- Safe to re-run thanks to ON CONFLICT on slug
insert into public.posts (
  slug,
  language,
  title,
  seo_title,
  seo_description,
  excerpt,
  content,
  tag,
  cover_url,
  published,
  published_at,
  author
) values (
  'tu-marketing-para-tu-estudio-de-pilates-o-yoga-puede-estar-alejando-clientes-y-no-lo-sabes',
  'es',
  'Tu marketing para tu estudio de pilates o yoga puede estar alejando clientes y no lo sabes',
  'Marketing para estudios de pilates y yoga | El error de grabar demasiado',
  'Grabar demasiado tus clases puede afectar la percepción de tu estudio. Así se ve una estrategia de contenido más cuidada para estudios de yoga, pilates y wellness premium.',
  'Grabar demasiado tus clases puede afectar la percepción de tu estudio. Así se ve una estrategia de contenido más cuidada para estudios de yoga, pilates y wellness premium.',
  '<p>En el tema de wellness, mostrar la experiencia sí importa. La iluminación del estudio, la energía de la clase (cuántas personas van), el ritmo del instructor (su vibra), los detalles del espacio: todo eso ayuda a una marca a construir deseo antes de que alguien reserve. Y claro tiene sentido, McKinsey ha seguido de cerca la categoría y ha señalado que el wellness sigue creciendo, mientras que el fitness presencial ocupa un lugar cada vez más importante, especialmente entre consumidores jóvenes que lo integran a su identidad y a su estilo de vida.</p><p><em>"Pero una cosa es mostrar la experiencia y otra muy distinta es convertir cada clase en una sesión de contenido."</em></p><p>Ahí es donde muchos estudios de yoga y pilates empiezan a perder algo muy valioso: la sensación de intimidad y exclusividad. Lo que debería disfrutarse como un momento presente y personal, empieza a sentirse observado. Yoga Journal ya ha puesto este tema sobre la mesa de forma muy directa, recogiendo el malestar de alumnos que fueron fotografiados o grabados durante clase y después vieron esas imágenes publicadas en redes (donde no hay vuelta atrás). No como una excepción incómoda, sino como parte de una conversación que claramente va en aumento dentro del propio mundo del wellness.</p><figure><img src="https://res.cloudinary.com/ds86m2xm0/image/upload/v1777566392/roxana-popovici-5JQxj-zc5ng-unsplash_jko3ay.jpg" alt="Ambiente wellness en estudio de yoga y pilates" style="width:100%;height:auto;border-radius:4px;margin:24px 0;" /></figure><p>La sensibilidad del consumidor también se está moviendo en esa dirección. Deloitte habla de una fatiga digital persistente y de preocupaciones continuas alrededor de privacidad y seguridad. Para una marca premium, eso no es un detalle menor. Si tu cliente llega buscando bienestar, desconexión y presencia, sentirse parte involuntaria de una pieza de marketing en cada clase puede romper por completo la experiencia y su preferencia a tu marca.</p><p>Por eso, el mejor contenido para un estudio no es el que documenta todo, sino el que sabe qué mostrar y qué respetar. No por nada Equinox, un club wellness premium con locaciones en diferentes partes del mundo, limita la grabación durante sus clases grupales y protege la imagen de otros miembros dentro de sus políticas. El mensaje es claro: hoy, una marca de alto nivel no solo debe verse bien o con clases llenas; también debe saber cuidar a su comunidad.</p><p>Y sí, hay que crear contenido. Pero con intención. Con consentimiento. Con sesiones planeadas, talento adecuado y una dirección visual que transmita la esencia del lugar sin invadir el momento. Ahí es donde una estrategia social-first bien pensada puede hacer mucho más por tu marca que grabar cada clase sin consentimiento.</p><p>Si tienes un estudio de yoga, pilates o una experiencia wellness premium y quieres una presencia digital que atraiga clientes sin comprometer la experiencia, en Sassy Studio te ayudamos a desarrollar una estrategia social-first y contenido premium que refleje esa experiencia íntima y relajante que ofrece tu marca.</p>',
  'Wellness Marketing',
  'https://res.cloudinary.com/ds86m2xm0/image/upload/v1777566394/Estudio_pilates_x8czuk.png',
  true,
  now(),
  null
)
on conflict (slug) do update set
  language = excluded.language,
  title = excluded.title,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  excerpt = excluded.excerpt,
  content = excluded.content,
  tag = excluded.tag,
  cover_url = excluded.cover_url,
  published = excluded.published,
  published_at = excluded.published_at,
  updated_at = now();

-- Note: For production, consider:
-- 1. ✅ Restricting inserts to authenticated users only (IMPLEMENTED)
-- 2. Using the service_role key for admin operations via server endpoints
-- 3. Implementing more granular access controls (e.g., roles table for admin/editor/viewer)

