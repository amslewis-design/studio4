import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';

export const metadata: Metadata = {
  title: 'Términos de Uso | Sassy Studio',
  description: 'Términos de Uso de Sassy Studio.',
};

type SectionProps = { title: string; children: React.ReactNode };

function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-5">
      <h2 className="font-serif text-3xl text-[#FC7CA4] md:text-4xl">{title}</h2>
      <div className="space-y-4 text-base leading-8 text-white/75">{children}</div>
    </section>
  );
}

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-36 md:px-10">
        <header className="mb-16 space-y-5 border-b border-white/15 pb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#FC7CA4]">Sassy Studio</p>
          <h1 className="font-serif text-5xl leading-tight md:text-7xl">Términos de Uso</h1>
          <p className="text-sm text-white/55">Última actualización: 5 de septiembre de 2026</p>
        </header>

        <div className="space-y-14">
          <section className="space-y-4 text-lg leading-9 text-white/80">
            <p>Bienvenido al sitio web de Sassy Studio.</p>
            <p>Los presentes Términos de Uso regulan el acceso y utilización del sitio web de Sassy Studio, incluyendo sus contenidos, materiales, formularios y demás funcionalidades disponibles.</p>
            <p>Al utilizar este sitio web aceptas estos Términos de Uso. Si no estás de acuerdo con ellos, te recomendamos no utilizar el sitio.</p>
          </section>

          <Section title="1. Titular del sitio">
            <p>El sitio web de Sassy Studio es operado por Avril Castañeda Meza, persona física que opera comercialmente bajo la marca Sassy Studio, con domicilio en José María Velasco 2148, San Bartolomé Tlaltelulco, Metepec, Estado de México, C.P. 52160, México.</p>
            <p>Para cualquier consulta puedes escribir a:</p>
            <p><a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
          </Section>

          <Section title="2. Finalidad del sitio web">
            <p>Este sitio tiene como finalidad presentar información acerca de Sassy Studio, sus servicios, experiencia, proyectos, capacidades, contenidos y formas de contacto.</p>
            <p>La información publicada tiene carácter informativo y comercial.</p>
            <p>La disponibilidad, alcance, precio, tiempos, entregables y demás condiciones específicas de cada servicio se determinarán individualmente mediante la propuesta, cotización, contrato, acuerdo o documento correspondiente.</p>
          </Section>

          <Section title="3. Solicitudes de información y contratación">
            <p>El envío de un formulario, correo electrónico, mensaje o solicitud de información a través del sitio web no implica la aceptación automática de un proyecto ni genera por sí mismo una relación contractual entre el usuario y Sassy Studio.</p>
            <p>La prestación de servicios estará sujeta a la aceptación expresa de las condiciones comerciales y contractuales correspondientes.</p>
            <p>Sassy Studio se reserva el derecho de aceptar o rechazar solicitudes de servicios, proyectos o colaboraciones.</p>
          </Section>

          <Section title="4. Uso permitido del sitio">
            <p>Puedes navegar y utilizar este sitio para fines personales, informativos o profesionales legítimos.</p>
            <p>No está permitido utilizar el sitio o sus contenidos para actividades ilícitas, fraudulentas o que puedan afectar los derechos de Sassy Studio o de terceros.</p>
            <p>Tampoco está permitido copiar, reproducir, distribuir, modificar, publicar, explotar comercialmente o utilizar de manera sustancial los contenidos del sitio sin autorización previa, salvo en los casos permitidos expresamente por la legislación aplicable.</p>
          </Section>

          <Section title="5. Propiedad intelectual">
            <p>Salvo que se indique lo contrario, los textos, conceptos, diseño, estructura, identidad visual, elementos gráficos, presentaciones, metodologías, materiales propios y demás contenidos originales de Sassy Studio disponibles en este sitio pertenecen a Sassy Studio o se utilizan con las autorizaciones correspondientes.</p>
            <p>Las marcas, logotipos, fotografías, videos, nombres comerciales, diseños y demás materiales pertenecientes a clientes, colaboradores o terceros continúan siendo propiedad de sus respectivos titulares.</p>
            <p>La aparición de trabajos, marcas o materiales de terceros dentro del portafolio, casos de estudio o contenidos de Sassy Studio no implica transferencia de derechos de propiedad intelectual.</p>
            <p>Ningún contenido de este sitio podrá utilizarse de forma que sugiera una asociación, colaboración, autorización o respaldo inexistente por parte de Sassy Studio.</p>
          </Section>

          <Section title="6. Portafolio, proyectos y casos de estudio">
            <p>Sassy Studio puede mostrar en su sitio web determinados proyectos, trabajos, colaboraciones, fotografías, videos, campañas, marcas, resultados o casos de estudio cuando cuente con los derechos, permisos o fundamentos correspondientes para hacerlo.</p>
            <p>Los resultados de proyectos anteriores se presentan únicamente como referencia de experiencia y capacidades.</p>
            <p>Los resultados obtenidos por un cliente no constituyen una garantía de que otro cliente obtendrá resultados idénticos o similares, ya que el desempeño de estrategias de marketing, contenido, publicidad y comunicación puede depender de numerosos factores externos.</p>
          </Section>

          <Section title="7. Información y materiales enviados por usuarios">
            <p>Cuando nos envías información, documentos, enlaces, briefings o materiales con el propósito de solicitar una propuesta o valorar un posible proyecto, conservas los derechos que correspondan sobre dichos materiales.</p>
            <p>Al proporcionarlos a Sassy Studio autorizas únicamente su revisión y tratamiento en la medida necesaria para atender tu solicitud, preparar una propuesta o desarrollar la relación profesional correspondiente.</p>
            <p>La información personal incluida en estas comunicaciones será tratada conforme a nuestro Aviso de Privacidad.</p>
          </Section>

          <Section title="8. Enlaces y servicios de terceros">
            <p>El sitio puede contener enlaces o integraciones con servicios, redes sociales, plataformas o sitios web operados por terceros.</p>
            <p>Sassy Studio no controla necesariamente el contenido, disponibilidad, seguridad o prácticas de privacidad de dichas plataformas.</p>
            <p>El acceso y uso de servicios externos estará sujeto a los términos y políticas establecidos por sus respectivos operadores.</p>
          </Section>

          <Section title="9. Disponibilidad y funcionamiento">
            <p>Procuramos mantener el sitio disponible y actualizado, pero no garantizamos que funcione de manera ininterrumpida o libre de errores en todo momento.</p>
            <p>Podemos modificar, suspender, actualizar o retirar temporalmente cualquier sección o funcionalidad cuando resulte necesario por razones técnicas, operativas, de seguridad o actualización.</p>
          </Section>

          <Section title="10. Información publicada">
            <p>Sassy Studio procura que la información publicada sea clara y actualizada.</p>
            <p>Sin embargo, pueden producirse errores, cambios en servicios, disponibilidad, precios, características u otra información.</p>
            <p>Ninguna información general publicada en el sitio sustituye las condiciones específicas establecidas en una propuesta, cotización o contrato celebrado con Sassy Studio.</p>
          </Section>

          <Section title="11. Limitación de responsabilidad">
            <p>En la medida permitida por la legislación aplicable, Sassy Studio no será responsable por daños derivados exclusivamente del uso inadecuado del sitio, interrupciones ocasionadas por servicios externos, fallas ajenas a nuestro control o decisiones adoptadas únicamente con base en información general publicada en el sitio.</p>
            <p>Nada de lo establecido en estos Términos pretende excluir o limitar responsabilidades que legalmente no puedan excluirse o limitarse.</p>
          </Section>

          <Section title="12. Privacidad y tecnologías de seguimiento">
            <p>El tratamiento de datos personales realizado a través de este sitio se rige por el Aviso de Privacidad Integral de Sassy Studio.</p>
            <p>El sitio puede utilizar cookies y tecnologías similares para funciones técnicas, analítica, medición y publicidad.</p>
            <p>Cuando corresponda, los visitantes podrán aceptar, rechazar o administrar determinadas tecnologías mediante las herramientas de preferencias disponibles en el sitio.</p>
          </Section>

          <Section title="13. Modificaciones">
            <p>Sassy Studio podrá actualizar estos Términos de Uso cuando resulte necesario por cambios en nuestros servicios, funcionamiento del sitio, tecnología o legislación aplicable.</p>
            <p>La versión vigente estará disponible en esta página e indicará la fecha de su última actualización.</p>
          </Section>

          <Section title="14. Legislación aplicable">
            <p>Estos Términos de Uso se regirán e interpretarán conforme a las leyes aplicables de los Estados Unidos Mexicanos.</p>
            <p>Cualquier controversia relacionada con el uso de este sitio estará sujeta a la jurisdicción de las autoridades y tribunales competentes del Estado de México, salvo que una disposición legal imperativa otorgue al usuario el derecho de acudir a otra jurisdicción.</p>
            <p>Nada de lo establecido en estos Términos afectará derechos que no puedan ser renunciados conforme a la legislación que resulte obligatoriamente aplicable.</p>
          </Section>

          <Section title="15. Contacto">
            <p>Para cualquier consulta relacionada con estos Términos de Uso puedes comunicarte con:</p>
            <address className="space-y-2 not-italic">
              <p>Sassy Studio</p>
              <p>Operado por: Avril Castañeda Meza</p>
              <p>Correo electrónico: <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
              <p>Domicilio: José María Velasco 2148, San Bartolomé Tlaltelulco, Metepec, Estado de México, C.P. 52160, México.</p>
              <p>Última actualización: 5 de septiembre de 2026</p>
            </address>
          </Section>
        </div>
      </article>
    </main>
  );
}
