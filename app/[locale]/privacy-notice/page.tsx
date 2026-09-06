import type { Metadata } from 'next';
import Navbar from '@/app/components/Navbar';

export const metadata: Metadata = {
  title: 'Comprehensive Privacy Notice | Sassy Studio',
  description: 'Sassy Studio Comprehensive Privacy Notice.',
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
          <h1 className="font-serif text-5xl leading-tight md:text-7xl">Comprehensive Privacy Notice</h1>
          <p className="text-sm text-white/55">Last updated: September 5, 2026</p>
        </header>

        <div className="space-y-14">
          <p className="text-lg leading-9 text-white/80">At Sassy Studio, we value and respect the privacy of individuals who visit our website, request information about our services, work with us, or maintain any professional or commercial relationship with the studio.</p>
          <p className="text-lg leading-9 text-white/80">This Comprehensive Privacy Notice describes how we collect, use, store, and protect the personal data of prospects, clients, suppliers, freelancers, collaborators, content creators, and other individuals related to our activities.</p>

          <Section title="1. Data Controller">
            <p>Avril Castañeda Meza, an individual operating commercially under the brand name Sassy Studio, with an address for receiving notices at José María Velasco 2148, San Bartolomé Tlaltelulco, Metepec, State of Mexico, Postal Code 52160, Mexico, is responsible for the processing of personal data in accordance with the Mexican Federal Law on Protection of Personal Data Held by Private Parties and other applicable regulations.</p>
            <p>For any matter related to privacy or personal data protection, you may contact Sassy Studio&apos;s Privacy Area at:</p>
            <p>Email: <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
          </Section>

          <Section title="2. Personal Data We May Process">
            <p>The personal data we process will depend on your relationship with Sassy Studio.</p>
            <p>We may process the following categories of information:</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Identification and Contact Data</h3>
            <p>Full name, email address, telephone number when provided, company, brand or project you are associated with, job title or professional activity, and social media profiles or usernames.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Professional and Commercial Information</h3>
            <p>Information related to your company, project, requested services, marketing needs, content, social media, branding, advertising, production, website, campaigns, budgets, proposals, meetings, communications, contracts, and any other information necessary to establish or develop a professional or commercial relationship.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Tax Information</h3>
            <p>When necessary for invoicing, contracting, or compliance with tax obligations, we may process information such as name or legal entity name, Mexican tax identification number, tax address, postal code, tax regime, CFDI use, and Mexican tax status certificates.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Financial or Asset Related Data</h3>
            <p>When there is a commercial, professional, or contractual relationship, we may process information necessary to make or verify payments, such as banking institution, account number, interbank CLABE, deposit information, payment receipts, or information related to fees and compensation.</p>
            <p>Such information will only be used when necessary to manage payments, comply with contractual, tax, or administrative obligations, and, where required by applicable law, the corresponding consent will be obtained.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Data Related to Content Projects</h3>
            <p>Depending on the project, we may process photographs, videos, voice recordings, image, professional profiles, social media profiles, portfolios, creative materials, or other information provided by clients, suppliers, collaborators, freelancers, or content creators.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Information Derived from Communications</h3>
            <p>We may retain information provided through forms, emails, messages, calls, meetings, social media, contracts, briefs, and other communications related to our services or projects.</p>
          </Section>

          <Section title="3. Sensitive Personal Data">
            <p>Sassy Studio does not ordinarily request or process sensitive personal data.</p>
            <p>Please do not provide information related to health, racial or ethnic origin, religious beliefs, political opinions, genetic information, sexual orientation, or any other information considered sensitive, unless there is a specific and legitimate need related to a project.</p>
            <p>If the processing of sensitive personal data becomes exceptionally necessary, the individual will be informed in advance and express consent will be obtained whenever required by applicable law.</p>
          </Section>

          <Section title="4. Primary Purposes of Processing">
            <p>Personal data may be used for the following purposes necessary to establish, maintain, or develop a relationship with Sassy Studio:</p>
            <List items={[
              'Responding to requests for information or contact.', 'Following up on inquiries and commercial opportunities.', 'Scheduling and conducting calls, meetings, or work sessions.', 'Understanding the needs of a company, brand, or project.', 'Preparing and presenting proposals, quotations, budgets, and work plans.', 'Providing services related to digital strategy, marketing, social media, content creation, audiovisual production, influencer marketing, digital advertising, reporting, design, web development, automation, or other professional services offered by Sassy Studio.', 'Managing relationships with clients, suppliers, freelancers, collaborators, photographers, videographers, designers, editors, community managers, creators, and other professionals.', 'Coordinating projects, productions, campaigns, deliverables, photo shoots, recordings, events, and collaborations.', 'Preparing and managing contracts, agreements, and other documentation related to professional or commercial relationships.', 'Managing invoicing, accounting, payments, collections, and compliance with tax and administrative obligations.', 'Verifying and following up on payments, professional fees, compensation, and payment receipts.', 'Maintaining communications related to projects, deliverables, contracted services, and professional relationships.', "Managing files, documents, and information necessary for Sassy Studio's operations.", 'Complying with legal, contractual, tax, or administrative obligations.', 'Protecting the rights and legitimate interests of Sassy Studio and of individuals with whom it maintains a legal relationship.', 'Improving our services, internal processes, and client experience.',
            ]} />
          </Section>

          <Section title="5. Secondary Purposes">
            <p>Additionally, where applicable, we may use certain contact information for the following purposes:</p>
            <List items={['Sending Sassy Studio newsletters.', 'Sharing news, content, articles, projects, services, or studio updates.', 'Sending promotional or commercial communications.', 'Informing you about new services, availability, events, collaborations, or other Sassy Studio updates.']} />
            <p>These purposes are not necessary to maintain a commercial or professional relationship with us.</p>
            <p>You may request at any time that your personal data not be used for these purposes by contacting us at <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a>.</p>
            <p>When our website includes a specific mechanism for subscribing to newsletters or commercial communications, subscription will be voluntary. Refusing to receive this type of communication will not affect access to our services or the handling of your requests.</p>
            <p>When communications are sent through an email marketing platform, you may also use the unsubscribe mechanism included in those communications.</p>
          </Section>

          <Section title="6. How We Collect Personal Data">
            <p>We may collect personal data directly from individuals through:</p>
            <List items={['Our website and contact forms.', 'Email.', 'Social media and direct messages.', 'Telephone calls and video calls.', 'In person or virtual meetings.', 'Contracts, proposals, invoices, and administrative documentation.', 'Communications related to projects.', 'Digital platforms used to manage our services and operations.']} />
            <p>We may also receive information from third parties when necessary to carry out a project or fulfill a contractual relationship.</p>
            <p>When an individual provides Sassy Studio with personal data relating to third parties, that individual must have the appropriate authority, authorization, or legal basis to share such information.</p>
          </Section>

          <Section title="7. Technology Providers and Data Processors">
            <p>To operate our business and provide our services, we may use technology providers and professional service providers that process information on behalf of Sassy Studio and according to our instructions.</p>
            <p>These may include services related to:</p>
            <List items={['Web hosting and infrastructure, including Vercel and technologies related to GitHub.', 'Email and productivity tools.', 'Project and document management, including platforms such as Notion and ClickUp.', 'Email marketing and communication management, including Mailchimp.', 'Web analytics and measurement.', 'Advertising campaign management.', 'Invoicing, accounting, and administrative services.', 'File storage and management.', 'Production, editing, and execution of marketing and content projects.']} />
            <p>Some of these providers may operate or store information using infrastructure located outside Mexico. Sassy Studio will seek to ensure that processing is carried out in accordance with the purposes described in this Privacy Notice and with applicable regulations.</p>
          </Section>

          <Section title="8. Transfers of Personal Data">
            <p>Sassy Studio does not sell, rent, or commercialize personal databases.</p>
            <p>We may transfer personal data when necessary to comply with obligations arising from a legal relationship, perform a contract entered into in the interest of the data subject, comply with a legal obligation, respond to requests from competent authorities, exercise or defend legal rights, or where any other circumstance permitted under applicable law applies.</p>
            <p>Where a transfer of personal data requires the individual&apos;s consent under applicable law, such consent will be requested in advance.</p>
            <p>Sassy Studio will not carry out transfers that require consent without first obtaining such consent.</p>
          </Section>

          <Section title="9. Processing of Personal Data on Behalf of Our Clients">
            <p>For certain projects, Sassy Studio may have access to personal data controlled by one of our clients, for example information related to campaigns, forms, audiences, creators, participants, employees, or users.</p>
            <p>When Sassy Studio processes personal data solely under the instructions of a client acting as the data controller, Sassy Studio will act as a data processor and will use the information exclusively to provide the relevant services, in accordance with the client&apos;s instructions, the contractual relationship, and applicable law.</p>
          </Section>

          <Section title="10. Cookies and Tracking Technologies">
            <p>Sassy Studio&apos;s website may use cookies, pixels, tags, and similar technologies to enable website functionality, analyze traffic, understand how individuals interact with the website, measure campaign performance, and carry out advertising and measurement activities.</p>
            <p>Tools that we use or may use include:</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Google Analytics</h3>
            <p>Used to obtain statistics regarding navigation, traffic, and website usage.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Google Ads Tag</h3>
            <p>Used to measure advertising campaigns, conversions, and interactions with advertisements.</p>
            <h3 className="pt-2 text-xl font-semibold text-white">Meta Pixel</h3>
            <p>Used to measure advertising campaign performance, conversions, and audiences related to Meta platforms.</p>
            <p>These technologies may automatically collect certain technical information, such as:</p>
            <List items={['IP address.', 'Device type.', 'Operating system.', 'Browser used.', 'Pages visited.', 'Date and time of browsing.', 'Approximate duration of visits.', 'Traffic source or origin.', 'Interactions carried out on the website.', 'Identifiers associated with cookies, pixels, or similar technologies.']} />
            <p>The specific information processed will depend on each tool and its configuration.</p>
            <p>You can delete, restrict, or block cookies through your browser settings. When the website provides a tool to manage cookie preferences, you may also use it to modify your choices.</p>
            <p>Disabling certain cookies may affect some website functions or measurement capabilities.</p>
          </Section>

          <Section title="11. Retention of Personal Data">
            <p>Personal data will be retained for as long as necessary to fulfill the purposes for which it was collected, maintain a professional or commercial relationship, and comply with applicable legal, contractual, tax, or administrative obligations.</p>
            <p>When the information is no longer necessary, it will be deleted, erased, or subject to the applicable blocking period in accordance with applicable law.</p>
            <p>Certain documents may be retained for additional periods when required by legal, tax, or contractual obligations, or where necessary to address potential liabilities.</p>
          </Section>

          <Section title="12. Security and Confidentiality">
            <p>Sassy Studio maintains reasonable administrative, technical, and organizational measures designed to protect personal data against damage, loss, alteration, destruction, unauthorized access, disclosure, use, or processing.</p>
            <p>Individuals involved in the processing of personal data must maintain the confidentiality of the relevant information.</p>
            <p>However, no electronic system, platform, or Internet transmission can guarantee absolute security. We therefore recommend avoiding the transmission of sensitive or unnecessary information through unsuitable channels.</p>
          </Section>

          <Section title="13. ARCO Rights">
            <p>The data subject or their legal representative may exercise the following rights at any time:</p>
            <List items={['Access: to know what personal data we hold and the conditions under which it is processed.', 'Rectification: to request the correction or updating of inaccurate, incomplete, or outdated personal data.', 'Cancellation: to request the deletion of personal data where legally appropriate.', 'Objection: to request that certain processing cease where there is a legal basis for doing so.']} />
            <p>To exercise any of these rights, a request must be submitted to Sassy Studio&apos;s Privacy Area at:</p>
            <p>Email: <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
            <p>The request must include:</p>
            <List items={["The data subject's full name.", 'A means of receiving communications or notices.', 'Documentation sufficient to verify the identity of the data subject and, where applicable, their legal representative.', 'A clear description of the personal data in relation to which a right is being exercised.', 'The right being exercised or a precise description of the request.', 'Where applicable, any information or documentation that may help locate the relevant personal data.']} />
            <p>For requests for rectification, the requested correction must also be specified and, where applicable, supporting documentation must be provided.</p>
            <p>Sassy Studio will communicate its decision within the maximum period established by applicable law, currently twenty business days from receipt of the request. If the request is approved, it will be implemented within fifteen business days following communication of the decision.</p>
            <p>These periods may be extended when permitted by applicable law and justified by the circumstances.</p>
          </Section>

          <Section title="14. Withdrawal of Consent">
            <p>Where the processing of personal data is based on consent, you may request withdrawal of that consent at any time where legally appropriate.</p>
            <p>Requests should be submitted to: <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
            <p>Withdrawal of consent will not have retroactive effect and will not apply where processing must continue in order to comply with legal, tax, contractual, or other obligations arising from a legal relationship.</p>
          </Section>

          <Section title="15. Limiting the Use or Disclosure of Personal Data">
            <p>You may also request that the use or disclosure of your personal data be limited, particularly in relation to promotional communications, advertising, newsletters, or commercial prospecting.</p>
            <p>You may exercise this option by contacting: <a className="text-[#FC7CA4] underline" href="mailto:contacto@sassystudio.com.mx">contacto@sassystudio.com.mx</a></p>
            <p>Where newsletters are sent through an email marketing platform, you may also use the unsubscribe link included in those communications.</p>
          </Section>

          <Section title="16. Changes to this Privacy Notice">
            <p>Sassy Studio may modify or update this Privacy Notice as a result of legal, regulatory, technological, administrative, operational, or service related changes.</p>
            <p>Any modifications will be published in this section of the website and the date of the most recent update will be indicated.</p>
            <p>Where changes require obtaining the data subject&apos;s consent again under applicable law, the corresponding mechanisms will be implemented.</p>
          </Section>

          <Section title="17. Contact">
            <p>For any questions, requests, or comments regarding this Privacy Notice or the processing of your personal data, you may contact Sassy Studio&apos;s Privacy Area:</p>
            <address className="space-y-2 not-italic">
              <p>Sassy Studio</p>
              <p>Data Controller: Avril Castañeda Meza</p>
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
