import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServiciosIndexPage({ params }: Props) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white selection:bg-[#FC7CA4] selection:text-black">
      <Navbar />
      <section className="pt-36 pb-20 px-6 max-w-5xl mx-auto">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 mb-8 tracking-wide">
          <Link href={`/${locale}`} className="hover:text-white">Inicio</Link>
          <span className="mx-2">→</span>
          <span className="text-white">Servicios</span>
        </nav>

        <h1 className="text-5xl md:text-6xl font-serif font-thin mb-6">Servicios</h1>
        <p className="text-gray-300 mb-10 max-w-3xl">
          Explora nuestras soluciones editoriales para marcas de hospitalidad, lifestyle y ecommerce.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/${locale}/servicios/produccion-editorial`}
            className="border border-white/10 p-6 bg-white/[0.02] hover:border-[#D4AF37] transition-colors"
          >
            <h2 className="text-2xl font-serif mb-2">Producción editorial (Foto + Video)</h2>
            <p className="text-gray-400 text-sm">Servicio especializado en producción editorial foto y video para redes, web y campañas.</p>
          </Link>

          <Link
            href={`/${locale}/servicios/estrategia-digital`}
            className="border border-white/10 p-6 bg-white/[0.02] hover:border-[#D4AF37] transition-colors"
          >
            <h2 className="text-2xl font-serif mb-2">Estrategia digital</h2>
            <p className="text-gray-400 text-sm">Mantenimiento web, optimización UX, enlaces internos, CTAs, blog, newsletter y soporte para campañas.</p>
          </Link>

          <Link
            href={`/${locale}/servicios/contenido-social`}
            className="border border-white/10 p-6 bg-white/[0.02] hover:border-[#D4AF37] transition-colors"
          >
            <h2 className="text-2xl font-serif mb-2">Contenido social</h2>
            <p className="text-gray-400 text-sm">Fotos, reels, carruseles y stories con narrativa consistente, optimización de perfil y calendario de contenido.</p>
          </Link>

          <Link
            href={`/${locale}/services`}
            className="border border-white/10 p-6 bg-white/[0.02] hover:border-[#D4AF37] transition-colors"
          >
            <h2 className="text-2xl font-serif mb-2">Ver catálogo completo</h2>
            <p className="text-gray-400 text-sm">Revisa servicios de contenido social, estrategia digital, branding y soporte web.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
