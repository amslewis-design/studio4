import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad | Sassy Studio',
  description: 'Aviso de Privacidad Integral de Sassy Studio.',
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
  return (
    <section className="space-y-5">
      <h2 className="font-serif text-3xl text-[#FC7CA4] md:text-4xl">{title}</h2>
      <div className="space-y-4 text-base leading-8 text-white/75">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-[#FC7CA4]">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function PrivacyNoticePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-36 md:px-10">
        <header className="mb-16 space-y-5 border-b border-white/15 pb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#FC7CA4]">Sassy Studio</p>
          <h1 className="font-serif text-5xl leading-tight md:text-7xl">Aviso de Privacidad</h1>
          <p className="text-sm text-white/55">Última actualización: 5 de septiembre de 2026</p>
        </header>

        <div className="space-y-14">
          <p className="text-lg leading-9 text-white/80">
            En Sassy Studio valoramos y respetamos la privacidad de las personas que visitan nuestro sitio web, solicitan información sobre nuestros servicios, trabajan con nosotros o mantienen algún tipo de relación profesional o comercial con el estudio.
          </p>
          <p className="text-lg leading-9 text-white/80">
            El presente Aviso de Privacidad Integral describe la forma en que recopilamos, utilizamos, almacenamos y protegemos datos personales de prospectos, clientes, proveedores, freelancers, colaboradores, creadores de contenido y otras personas relacionadas con nuestras actividades.
          </p>

          <Section title="1. Responsable del tratamiento de los datos personales">
            <p>Avril Castañeda Meza, persona física que opera comercialmente bajo la marca Sassy Studio, con domicilio para oír y recibir notificaciones en José María Velasco 2148, San Bartolomé Tlaltelulco, Metepec, Estado de México, C.P. 52160, México, es responsable del tratamiento de los datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y demás disposiciones aplicables.</p>
            <p>Para cualquier asunto relacionado con privacidad o protección de datos personales puedes comunicarte con el Área de Privacidad de Sassy Studio mediante:</p>
            <p>Correo electrónico: <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
          </Section>

          <Section title="2. Datos personales que podemos tratar">
            <p>Los datos personales tratados dependerán de la relación que mantengas con Sassy Studio.</p>
            <p>Podemos tratar las siguientes categorías de información:</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Datos de identificación y contacto</h3>
            <p>Nombre completo, correo electrónico, número telefónico cuando sea proporcionado, empresa, marca o proyecto al que perteneces, cargo o actividad profesional y perfiles o nombres de usuario en redes sociales.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Información profesional y comercial</h3>
            <p>Información relacionada con tu empresa, proyecto, servicios requeridos, necesidades de marketing, contenido, redes sociales, branding, publicidad, producción, sitio web, campañas, presupuestos, propuestas, reuniones, comunicaciones, contratos y demás información necesaria para establecer o desarrollar una relación profesional o comercial.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Datos fiscales</h3>
            <p>Cuando sean necesarios para facturación, contratación o cumplimiento de obligaciones fiscales, podremos tratar datos como nombre o razón social, RFC, domicilio fiscal, código postal, régimen fiscal, uso de CFDI y Constancia de Situación Fiscal.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Datos financieros o patrimoniales</h3>
            <p>Cuando exista una relación comercial, profesional o contractual, podremos tratar información necesaria para realizar o verificar pagos, como institución bancaria, número de cuenta, CLABE interbancaria, datos para depósitos, comprobantes de pago o información relacionada con honorarios y contraprestaciones.</p>
            <p>Estos datos serán utilizados únicamente cuando sean necesarios para gestionar pagos, cumplir obligaciones contractuales, fiscales o administrativas y, cuando la legislación aplicable así lo requiera, se recabará el consentimiento correspondiente.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Datos relacionados con proyectos de contenido</h3>
            <p>Dependiendo del proyecto, podremos tratar fotografías, videos, voz, imagen, perfiles profesionales, redes sociales, portafolios, materiales creativos u otra información proporcionada por clientes, proveedores, colaboradores, freelancers o creadores.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Información derivada de nuestras comunicaciones</h3>
            <p>Podremos conservar información proporcionada mediante formularios, correos electrónicos, mensajes, llamadas, reuniones, redes sociales, contratos, briefings y otras comunicaciones relacionadas con nuestros servicios o proyectos.</p>
          </Section>

          <Section title="3. Datos personales sensibles">
            <p>Sassy Studio no solicita ni trata de manera ordinaria datos personales sensibles.</p>
            <p>Te pedimos no proporcionar información relativa a salud, origen racial o étnico, creencias religiosas, opiniones políticas, información genética, orientación sexual u otros datos considerados sensibles, salvo cuando exista una necesidad específica y legítima relacionada con un proyecto.</p>
            <p>En caso de que excepcionalmente resulte necesario tratar datos personales sensibles, se informará previamente a la persona titular y se obtendrá el consentimiento expreso correspondiente cuando así lo exija la legislación aplicable.</p>
          </Section>

          <Section title="4. Finalidades primarias">
            <p>Los datos personales podrán utilizarse para las siguientes finalidades necesarias para establecer, mantener o desarrollar la relación con Sassy Studio:</p>
            <List items={[
              'Atender solicitudes de información o contacto.',
              'Dar seguimiento a consultas y oportunidades comerciales.',
              'Agendar y realizar llamadas, reuniones o sesiones de trabajo.',
              'Conocer las necesidades de una empresa, marca o proyecto.',
              'Elaborar y presentar propuestas, cotizaciones, presupuestos y planes de trabajo.',
              'Prestar servicios relacionados con estrategia digital, marketing, social media, creación de contenido, producción audiovisual, influencer marketing, publicidad digital, reporting, diseño, desarrollo web, automatizaciones u otros servicios profesionales ofrecidos por Sassy Studio.',
              'Gestionar relaciones con clientes, proveedores, freelancers, colaboradores, fotógrafos, videógrafos, diseñadores, editores, community managers, creadores y otros profesionales.',
              'Coordinar proyectos, producciones, campañas, entregables, sesiones fotográficas, grabaciones, eventos y colaboraciones.',
              'Elaborar y gestionar contratos, convenios y demás documentación relacionada con una relación profesional o comercial.',
              'Realizar procesos de facturación, contabilidad, pagos, cobros y cumplimiento de obligaciones fiscales y administrativas.',
              'Verificar y dar seguimiento a pagos, honorarios, contraprestaciones y comprobantes.',
              'Mantener comunicaciones relacionadas con proyectos, entregables, servicios contratados y relaciones profesionales.',
              'Gestionar archivos, documentos e información necesaria para la operación de Sassy Studio.',
              'Cumplir obligaciones legales, contractuales, fiscales o administrativas.',
              'Proteger los derechos e intereses legítimos de Sassy Studio y de las personas con las que mantiene una relación jurídica.',
              'Mejorar nuestros servicios, procesos internos y experiencia de atención.',
            ]} />
          </Section>

          <Section title="5. Finalidades secundarias">
            <p>De manera adicional, y cuando corresponda, podremos utilizar determinados datos de contacto para:</p>
            <List items={[
              'Enviar newsletters de Sassy Studio.',
              'Compartir novedades, contenidos, artículos, proyectos, servicios o actualizaciones del estudio.',
              'Enviar comunicaciones promocionales o comerciales.',
              'Informar sobre nuevos servicios, disponibilidad, eventos, colaboraciones u otras novedades relacionadas con Sassy Studio.',
            ]} />
            <p>Estas finalidades no son necesarias para mantener una relación comercial o profesional con nosotros.</p>
            <p>Podrás solicitar en cualquier momento que tus datos no sean utilizados para estas finalidades escribiendo a <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a>.</p>
            <p>Cuando nuestro sitio incluya un mecanismo específico para suscribirse a newsletters o comunicaciones comerciales, la suscripción será voluntaria. La negativa a recibir este tipo de comunicaciones no afectará el acceso a nuestros servicios ni la atención de solicitudes.</p>
            <p>Cuando las comunicaciones se envíen mediante una plataforma de email marketing, también podrás utilizar el mecanismo para cancelar la suscripción incluido en los propios mensajes.</p>
          </Section>

          <Section title="6. Medios por los que obtenemos datos personales">
            <p>Podemos obtener datos personales directamente de la persona titular mediante:</p>
            <List items={[
              'Nuestro sitio web y formularios de contacto.', 'Correo electrónico.', 'Redes sociales y mensajes directos.', 'Llamadas y videollamadas.', 'Reuniones presenciales o virtuales.', 'Contratos, propuestas, facturas y documentación administrativa.', 'Comunicaciones relacionadas con proyectos.', 'Plataformas digitales utilizadas para gestionar nuestros servicios y operaciones.',
            ]} />
            <p>También podemos recibir información de terceros cuando resulte necesaria para desarrollar un proyecto o cumplir una relación contractual.</p>
            <p>Cuando una persona proporcione a Sassy Studio datos personales pertenecientes a terceros, deberá contar con las facultades, autorización o fundamento correspondiente para compartir dicha información.</p>
          </Section>

          <Section title="7. Proveedores tecnológicos y personas encargadas del tratamiento">
            <p>Para operar nuestro negocio y prestar nuestros servicios podemos utilizar proveedores tecnológicos y profesionales que traten información por cuenta de Sassy Studio y conforme a nuestras instrucciones.</p>
            <p>Estos pueden incluir servicios de:</p>
            <List items={[
              'Hosting e infraestructura web, incluyendo Vercel y tecnologías relacionadas con GitHub.', 'Correo electrónico y herramientas de productividad.', 'Gestión de proyectos y documentación, incluyendo plataformas como Notion y ClickUp.', 'Email marketing y gestión de comunicaciones, incluyendo Mailchimp.', 'Analítica web y medición.', 'Gestión de campañas publicitarias.', 'Facturación, contabilidad y servicios administrativos.', 'Almacenamiento y gestión de archivos.', 'Producción, edición y ejecución de proyectos de marketing y contenido.',
            ]} />
            <p>Algunos de estos proveedores pueden operar o almacenar información utilizando infraestructura ubicada fuera de México. Sassy Studio procurará que el tratamiento se realice de conformidad con las finalidades descritas en este Aviso de Privacidad y con las disposiciones aplicables.</p>
          </Section>

          <Section title="8. Transferencias de datos personales">
            <p>Sassy Studio no vende, renta ni comercializa bases de datos personales.</p>
            <p>Podremos realizar transferencias de datos personales cuando sean necesarias para cumplir obligaciones derivadas de una relación jurídica, ejecutar un contrato celebrado en interés de la persona titular, cumplir una obligación legal, atender requerimientos de autoridades competentes, ejercer o defender derechos o cuando se actualice cualquier otro supuesto permitido por la legislación aplicable.</p>
            <p>En aquellos casos en que una transferencia de datos personales requiera el consentimiento de la persona titular conforme a la legislación aplicable, dicho consentimiento será solicitado previamente.</p>
            <p>Sassy Studio no realizará transferencias que requieran consentimiento sin haber obtenido previamente dicho consentimiento.</p>
          </Section>

          <Section title="9. Tratamiento de datos por cuenta de nuestros clientes">
            <p>En determinados proyectos, Sassy Studio puede tener acceso a datos personales controlados por alguno de nuestros clientes, por ejemplo información relacionada con campañas, formularios, audiencias, creadores, participantes, empleados o usuarios.</p>
            <p>Cuando Sassy Studio trate datos personales únicamente por instrucciones de un cliente que actúe como responsable de dichos datos, Sassy Studio actuará como persona encargada del tratamiento y utilizará la información exclusivamente para prestar los servicios correspondientes, de acuerdo con las instrucciones del cliente, la relación contractual y la legislación aplicable.</p>
          </Section>

          <Section title="10. Cookies y tecnologías de rastreo">
            <p>El sitio web de Sassy Studio puede utilizar cookies, píxeles, etiquetas y tecnologías similares para permitir su funcionamiento, analizar el tráfico, comprender la interacción de las personas con el sitio, medir el desempeño de nuestras campañas y realizar actividades de publicidad y medición.</p>
            <p>Entre las herramientas que utilizamos o podremos utilizar se encuentran:</p>
            <List items={['Google Analytics: Para obtener estadísticas sobre navegación, tráfico y uso del sitio.', 'Google Ads Tag: Para medir campañas publicitarias, conversiones e interacción con anuncios.', 'Meta Pixel: Para medir la efectividad de campañas publicitarias, conversiones y audiencias relacionadas con las plataformas de Meta.']} />
            <p>Estas tecnologías pueden recopilar automáticamente determinada información técnica, como:</p>
            <List items={['Dirección IP.', 'Tipo de dispositivo.', 'Sistema operativo.', 'Navegador utilizado.', 'Páginas visitadas.', 'Fecha y hora de navegación.', 'Duración aproximada de las visitas.', 'Fuente u origen del tráfico.', 'Interacciones realizadas dentro del sitio.', 'Identificadores asociados con cookies, píxeles u otras tecnologías similares.']} />
            <p>La información específica tratada dependerá de cada herramienta y de su configuración.</p>
            <p>Puedes eliminar, restringir o bloquear cookies mediante la configuración de tu navegador. Cuando el sitio cuente con una herramienta para administrar preferencias de cookies, también podrás utilizarla para modificar tus elecciones.</p>
            <p>La desactivación de determinadas cookies puede afectar algunas funciones o mediciones del sitio.</p>
          </Section>

          <Section title="11. Conservación de los datos personales">
            <p>Los datos personales serán conservados durante el tiempo necesario para cumplir las finalidades para las que fueron recopilados, mantener una relación profesional o comercial y cumplir las obligaciones legales, contractuales, fiscales o administrativas aplicables.</p>
            <p>Cuando la información deje de ser necesaria, será eliminada, suprimida o sometida al periodo de bloqueo correspondiente conforme a la legislación aplicable.</p>
            <p>Determinados documentos podrán conservarse durante periodos adicionales cuando exista una obligación legal, fiscal, contractual o la necesidad de atender posibles responsabilidades.</p>
          </Section>

          <Section title="12. Seguridad y confidencialidad">
            <p>Sassy Studio mantiene medidas administrativas, técnicas y organizacionales razonables para proteger los datos personales contra daño, pérdida, alteración, destrucción, acceso, divulgación, uso o tratamiento no autorizado.</p>
            <p>Las personas que intervengan en el tratamiento de datos personales deberán mantener la confidencialidad de la información correspondiente.</p>
            <p>No obstante, ningún sistema electrónico, plataforma o transmisión a través de Internet puede garantizar una seguridad absoluta, por lo que recomendamos evitar el envío de información sensible o innecesaria a través de medios que no sean adecuados para ello.</p>
          </Section>

          <Section title="13. Derechos ARCO">
            <p>La persona titular o su representante legal podrá ejercer en cualquier momento sus derechos de:</p>
            <List items={['Acceso: conocer qué datos personales tenemos y las condiciones de su tratamiento.', 'Rectificación: solicitar la corrección o actualización de datos que sean incorrectos, incompletos o desactualizados.', 'Cancelación: solicitar que los datos sean eliminados cuando resulte legalmente procedente.', 'Oposición: solicitar el cese de determinado tratamiento cuando exista una causa legal para ello.']} />
            <p>Para ejercer cualquiera de estos derechos deberá enviarse una solicitud al Área de Privacidad de Sassy Studio mediante:</p>
            <p>Correo electrónico: <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
            <p>La solicitud deberá contener:</p>
            <List items={['Nombre completo de la persona titular.', 'Medio para recibir comunicaciones o notificaciones.', 'Documentación que permita acreditar su identidad y, en su caso, la representación legal.', 'Descripción clara de los datos personales respecto de los cuales desea ejercer algún derecho.', 'Derecho que desea ejercer o descripción precisa de su solicitud.', 'En su caso, cualquier información o documento que facilite la localización de los datos.']} />
            <p>Para solicitudes de rectificación deberá indicarse además la modificación solicitada y proporcionar, cuando corresponda, la documentación que la sustente.</p>
            <p>Sassy Studio comunicará la determinación correspondiente dentro del plazo máximo establecido por la legislación aplicable, actualmente veinte días hábiles contados a partir de la recepción de la solicitud. Si la solicitud resulta procedente, se hará efectiva dentro de los quince días hábiles siguientes a la comunicación de la respuesta.</p>
            <p>Los plazos podrán ampliarse cuando la legislación aplicable lo permita y las circunstancias lo justifiquen.</p>
          </Section>

          <Section title="14. Revocación del consentimiento">
            <p>Cuando el tratamiento de datos personales se encuentre basado en consentimiento, podrás solicitar su revocación en cualquier momento, siempre que legalmente resulte procedente.</p>
            <p>Para hacerlo deberás enviar tu solicitud a: <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
            <p>La revocación no tendrá efectos retroactivos y no será procedente cuando el tratamiento deba continuar para cumplir obligaciones legales, fiscales, contractuales o derivadas de una relación jurídica.</p>
          </Section>

          <Section title="15. Limitación del uso o divulgación de los datos personales">
            <p>También puedes solicitar la limitación del uso o divulgación de tus datos personales, especialmente respecto de comunicaciones promocionales, publicidad, newsletters o prospección comercial.</p>
            <p>Puedes ejercer esta opción enviando un correo a: <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
            <p>Cuando se trate de newsletters enviados mediante una plataforma de email marketing, también podrás utilizar el enlace para cancelar la suscripción incluido en dichas comunicaciones.</p>
          </Section>

          <Section title="16. Cambios al Aviso de Privacidad">
            <p>Sassy Studio podrá modificar o actualizar este Aviso de Privacidad como consecuencia de cambios legales, regulatorios, tecnológicos, administrativos, operativos o relacionados con nuestros servicios.</p>
            <p>Las modificaciones serán publicadas en esta misma sección del sitio web y se indicará la fecha de la actualización más reciente.</p>
            <p>Cuando los cambios requieran obtener nuevamente el consentimiento de las personas titulares conforme a la legislación aplicable, se implementarán los mecanismos correspondientes.</p>
          </Section>

          <Section title="17. Contacto">
            <p>Para cualquier pregunta, solicitud o comentario relacionado con este Aviso de Privacidad o con el tratamiento de tus datos personales puedes contactar al Área de Privacidad de Sassy Studio:</p>
            <address className="space-y-2 not-italic">
              <p>Sassy Studio</p>
              <p>Responsable: Avril Castañeda Meza</p>
              <p>Correo electrónico: <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
              <p>Domicilio: José María Velasco 2148, San Bartolomé Tlaltelulco, Metepec, Estado de México, C.P. 52160, México.</p>
              <p>Última actualización: 5 de septiembre de 2026</p>
            </address>
          </Section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
