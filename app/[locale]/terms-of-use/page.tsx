import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';

export const metadata: Metadata = {
  title: 'Website Terms of Use | Sassy Studio',
  description: 'Website Terms of Use for Sassy Studio.',
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
          <h1 className="font-serif text-5xl leading-tight md:text-7xl">Website Terms of Use</h1>
          <p className="text-sm text-white/55">Last updated: September 5, 2026</p>
        </header>

        <div className="space-y-14">
          <section className="space-y-4 text-lg leading-9 text-white/80">
            <p>Welcome to the Sassy Studio website.</p>
            <p>These Website Terms of Use govern your access to and use of the Sassy Studio website, including its content, materials, forms, and other available features.</p>
            <p>By using this website, you agree to these Terms of Use. If you do not agree with them, you should not use the website.</p>
          </section>

          <Section title="1. Website Operator">
            <p>The Sassy Studio website is operated by Avril Castañeda Meza, an individual operating commercially under the brand name Sassy Studio, with an address at José María Velasco 2148, San Bartolomé Tlaltelulco, Metepec, State of Mexico, Postal Code 52160, Mexico.</p>
            <p>For inquiries, please contact:</p>
            <p><a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
          </Section>

          <Section title="2. Purpose of the Website">
            <p>This website is intended to provide information about Sassy Studio, its services, experience, projects, capabilities, content, and contact methods.</p>
            <p>The information available on this website is provided for informational and commercial purposes.</p>
            <p>The availability, scope, pricing, timelines, deliverables, and other specific conditions applicable to each service will be established individually through the relevant proposal, quotation, contract, agreement, or other applicable document.</p>
          </Section>

          <Section title="3. Inquiries and Engagement of Services">
            <p>Submitting a contact form, email, message, or request for information through this website does not automatically constitute acceptance of a project or create a contractual relationship between you and Sassy Studio.</p>
            <p>Services will only be provided once the applicable commercial and contractual terms have been expressly agreed upon.</p>
            <p>Sassy Studio reserves the right to accept or decline service requests, projects, or collaboration opportunities.</p>
          </Section>

          <Section title="4. Permitted Use">
            <p>You may browse and use this website for legitimate personal, informational, or professional purposes.</p>
            <p>You may not use the website or its content for unlawful or fraudulent purposes or in a manner that infringes the rights of Sassy Studio or any third party.</p>
            <p>You may not copy, reproduce, distribute, modify, publish, commercially exploit, or substantially use content from this website without prior authorization, except where expressly permitted by applicable law.</p>
          </Section>

          <Section title="5. Intellectual Property">
            <p>Unless otherwise stated, the original text, concepts, design, structure, visual identity, graphic elements, presentations, methodologies, proprietary materials, and other original Sassy Studio content available on this website are owned by Sassy Studio or used with the appropriate authorization.</p>
            <p>Trademarks, logos, photographs, videos, trade names, designs, and other materials belonging to clients, collaborators, or other third parties remain the property of their respective owners.</p>
            <p>The inclusion of third party work, brands, or materials in Sassy Studio&apos;s portfolio, case studies, or content does not constitute a transfer of intellectual property rights.</p>
            <p>No content from this website may be used in a way that falsely suggests an association, collaboration, authorization, or endorsement by Sassy Studio.</p>
          </Section>

          <Section title="6. Portfolio, Projects, and Case Studies">
            <p>Sassy Studio may display selected projects, work, collaborations, photographs, videos, campaigns, brands, results, or case studies on its website where it has the applicable rights, permissions, or lawful basis to do so.</p>
            <p>Results from previous projects are presented solely as examples of our experience and capabilities.</p>
            <p>Results achieved by one client do not guarantee that another client will achieve identical or similar results, as the performance of marketing, content, advertising, and communication strategies may depend on numerous external factors.</p>
          </Section>

          <Section title="7. Information and Materials Submitted by Users">
            <p>When you provide information, documents, links, briefs, or other materials for the purpose of requesting a proposal or discussing a potential project, you retain any rights you may have in those materials.</p>
            <p>By providing them to Sassy Studio, you authorize us only to review and process them to the extent reasonably necessary to respond to your request, prepare a proposal, or develop the corresponding professional relationship.</p>
            <p>Personal information contained in these communications will be processed in accordance with our Privacy Notice.</p>
          </Section>

          <Section title="8. Third Party Links and Services">
            <p>The website may contain links to or integrations with services, social networks, platforms, or websites operated by third parties.</p>
            <p>Sassy Studio does not necessarily control the content, availability, security, or privacy practices of those external services.</p>
            <p>Your access to and use of external services will be subject to the terms and policies established by their respective operators.</p>
          </Section>

          <Section title="9. Website Availability">
            <p>We aim to keep the website available and updated, but we do not guarantee uninterrupted or error free operation at all times.</p>
            <p>We may modify, suspend, update, or temporarily remove any section or feature when necessary for technical, operational, security, or maintenance reasons.</p>
          </Section>

          <Section title="10. Website Information">
            <p>Sassy Studio makes reasonable efforts to provide clear and current information.</p>
            <p>However, errors may occur and services, availability, pricing, features, or other information may change.</p>
            <p>General information published on this website does not replace the specific conditions contained in a proposal, quotation, or contract entered into with Sassy Studio.</p>
          </Section>

          <Section title="11. Limitation of Liability">
            <p>To the extent permitted by applicable law, Sassy Studio will not be liable for damages arising solely from improper use of the website, interruptions caused by external services, circumstances outside our reasonable control, or decisions made solely in reliance on general information published on the website.</p>
            <p>Nothing in these Terms is intended to exclude or limit any liability that cannot lawfully be excluded or limited.</p>
          </Section>

          <Section title="12. Privacy and Tracking Technologies">
            <p>The processing of personal data through this website is governed by the Sassy Studio Comprehensive Privacy Notice.</p>
            <p>The website may use cookies and similar technologies for technical functionality, analytics, measurement, and advertising.</p>
            <p>Where applicable, visitors may accept, reject, or manage certain technologies through the preference tools available on the website.</p>
          </Section>

          <Section title="13. Changes to These Terms">
            <p>Sassy Studio may update these Terms of Use when necessary as a result of changes to our services, website operations, technology, or applicable law.</p>
            <p>The current version will be published on this page and will indicate the date of its most recent update.</p>
          </Section>

          <Section title="14. Governing Law">
            <p>These Terms of Use will be governed by and interpreted in accordance with the applicable laws of the United Mexican States.</p>
            <p>Any dispute relating to the use of this website will be subject to the jurisdiction of the competent authorities and courts of the State of Mexico, unless mandatory applicable law gives the user the right to bring a claim in another jurisdiction.</p>
            <p>Nothing in these Terms affects any rights that cannot legally be waived under mandatorily applicable law.</p>
          </Section>

          <Section title="15. Contact">
            <p>For questions relating to these Terms of Use, please contact:</p>
            <address className="space-y-2 not-italic">
              <p>Sassy Studio</p>
              <p>Operated by: Avril Castañeda Meza</p>
              <p>Email: <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
              <p>Address: José María Velasco 2148, San Bartolomé Tlaltelulco, Metepec, State of Mexico, Postal Code 52160, Mexico.</p>
              <p>Last updated: September 5, 2026</p>
            </address>
          </Section>
        </div>
      </article>
    </main>
  );
}
