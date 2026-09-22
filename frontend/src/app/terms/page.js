import PageHero from "@/components/PageHero";

export const metadata = { title: "Terms of Service | Maaf Fashion" };

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <section className="py-14 md:py-20">
        <div className="container-page max-w-3xl">
          <LegalSection title="1. Use of This Website">
            This website is provided for informational and B2B sourcing
            purposes. By using it, you agree not to misuse the contact form
            or attempt to access non-public areas of the site or its
            underlying systems.
          </LegalSection>
          <LegalSection title="2. Product Information">
            Product images, style codes, and descriptions are indicative.
            Actual samples, fabric compositions, and finishes are confirmed
            in writing during the order process.
          </LegalSection>
          <LegalSection title="3. Quotations & Orders">
            Quotations provided in response to inquiries are estimates and
            do not constitute a binding contract until confirmed in writing
            by both parties via a formal purchase order or proforma
            invoice.
          </LegalSection>
          <LegalSection title="4. Intellectual Property">
            All content on this website, including text, images, and
            design, is the property of Maaf Fashion unless otherwise
            noted, and may not be reproduced without written permission.
          </LegalSection>
          <LegalSection title="5. Limitation of Liability">
            Maaf Fashion is not liable for indirect or consequential
            losses arising from reliance on information published on this
            website. Formal contracts govern actual production
            engagements.
          </LegalSection>
          <LegalSection title="6. Governing Law">
            These terms are governed by the laws of Bangladesh.
          </LegalSection>
          <p className="text-sm text-slate-400 mt-10">Last updated: [Date]</p>
        </div>
      </section>
    </>
  );
}

function LegalSection({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-xl font-medium mb-2.5">{title}</h2>
      <p className="text-slate-600 leading-relaxed">{children}</p>
    </div>
  );
}
