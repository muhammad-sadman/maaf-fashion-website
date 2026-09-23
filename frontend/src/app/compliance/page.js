import PageHero from "@/components/PageHero";
import CertificationStrip from "@/components/CertificationStrip";
import { getCertifications } from "@/lib/api";

export const revalidate = 60;


export const metadata = {
  title: "Compliance & Safety | Maaf Fashion",
  description: "Certifications, fire safety systems, and worker welfare initiatives at Maaf Fashion.",
};

const SAFETY_SYSTEMS = [
  { title: "Fire Detection & Suppression", body: "Smoke detectors, sprinkler systems, and fire-rated stairwells inspected monthly and tested against BSCI and WRAP fire-safety criteria." },
  { title: "Evacuation Readiness", body: "Quarterly fire drills across all shifts, with clearly marked exits and assembly points reviewed by third-party auditors." },
  { title: "Structural & Electrical Safety", body: "Annual structural integrity assessments and certified electrical wiring audits, documented and available for buyer review." },
  { title: "Chemical & Effluent Management", body: "Dyeing effluent is treated on-site before discharge, and chemical storage follows OEKO-TEX and GOTS handling protocols." },
];

export default async function CompliancePage() {
  const certifications = await getCertifications();

  return (
    <>
      <PageHero
        eyebrow="Compliance & Safety"
        title="Documentation ready before your auditor asks for it."
        description="Every certification below is current, on file, and available for third-party verification ahead of a sourcing visit."
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          <CertificationStrip certifications={certifications} variant="grid" />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-navy-950 text-white">
        <div className="container-page">
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-[0.2em]">
            Fire Protection &amp; Safety
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-medium mt-3 max-w-xl">
            Safety systems built into daily operations, verified continuously.
          </h2>

          <div className="mt-12 grid sm:grid-cols-2 gap-8">
            {SAFETY_SYSTEMS.map((s) => (
              <div key={s.title} className="border-t border-white/15 pt-5">
                <h3 className="font-display text-lg font-medium">{s.title}</h3>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold-600 text-xs font-semibold uppercase tracking-[0.2em]">
              Worker Welfare Policy
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-medium mt-3">
              A written policy, enforced on the floor.
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Our welfare policy is reviewed annually against BSCI and SEDEX
              audit criteria, and covers working hours, wages, freedom of
              association, and grievance handling in line with ILO
              conventions.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "No forced, bonded, or child labor — verified by third-party audit",
              "Legally compliant working hours with documented overtime pay",
              "Freedom of association and collective bargaining respected",
              "Confidential grievance mechanism available to every worker",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate-700 bg-white border border-line rounded-sm p-4">
                <svg className="flex-shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
