import PageHero from "@/components/PageHero";

export const metadata = { title: "Privacy Policy | Maaf Fashion" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-14 md:py-20">
        <div className="container-page max-w-3xl prose-legal">
          <LegalSection title="1. Information We Collect">
            When you submit an inquiry through this website, we collect your
            name, email address, phone number, and message content. We do
            not collect payment information through this website.
          </LegalSection>
          <LegalSection title="2. How We Use Your Information">
            Inquiry details are used solely to respond to your sourcing
            request and are stored securely in our internal systems. We do
            not sell or share your information with third parties for
            marketing purposes.
          </LegalSection>
          <LegalSection title="3. Data Retention">
            Inquiry records are retained for as long as necessary to manage
            the business relationship, after which they may be archived or
            deleted in line with applicable data protection requirements.
          </LegalSection>
          <LegalSection title="4. Cookies">
            This website may use essential cookies required for basic
            functionality. No third-party advertising cookies are used.
          </LegalSection>
          <LegalSection title="5. Your Rights">
            You may request access to, correction of, or deletion of your
            personal data at any time by emailing sales@maaffashion.com.
          </LegalSection>
          <LegalSection title="6. Contact">
            Questions about this policy can be directed to
            sales@maaffashion.com.
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
