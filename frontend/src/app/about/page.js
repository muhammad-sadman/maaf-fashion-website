import PageHero from "@/components/PageHero";
import { getAboutImages, groupAboutImagesBySection, mediaUrl } from "@/lib/api";

export const revalidate = 60;

export const metadata = {
  title: "About Us | Maaf Fashion",
  description: "Company history, credentials, quality control process, and employee welfare at Maaf Fashion.",
};

const CREDENTIALS = [
  { label: "Founded", value: "2011" },
  { label: "Legal Status", value: "Private Limited Company" },
  { label: "Business Type", value: "Manufacturer & Exporter" },
  { label: "Registered Office", value: "Dhaka, Bangladesh" },
];

const QC_STEPS = [
  { step: "01", title: "Incoming Fabric Inspection", body: "Every roll is checked for GSM, shade consistency, and defects against the 4-point system before it reaches the cutting floor." },
  { step: "02", title: "In-Line Process Checks", body: "Quality inspectors are stationed at knitting, dyeing, and sewing lines to catch deviations as they happen, not after the fact." },
  { step: "03", title: "Pre-Final & Final AQL Audit", body: "Statistical sampling audits run before packing, with full traceability back to the production line and shift." },
  { step: "04", title: "Pre-Shipment Sign-Off", body: "A final documented sign-off, available to buyers and third-party auditors on request, closes out every shipment." },
];

export default async function AboutPage() {
  const images = await getAboutImages();
  const bySection = groupAboutImagesBySection(images);

  return (
    <>
      <PageHero
        eyebrow="About Maaf Fashion"
        title="Fifteen years of production discipline, built for buyers who verify."
        description="From a single knitting line to a vertically integrated export house — our story is one of reinvesting in capacity, compliance, and people."
      />

      {/* Story + credentials */}
      <section className="py-16 md:py-24">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <SectionImage images={bySection.story} fallbackLabel="Add a photo from Django Admin → About Page Images → section: Our Story" className="mb-10" />

            <h2 className="font-display text-2xl md:text-3xl font-medium">Our story</h2>
            <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">
              <p>
                Maaf Fashion began as a contract knitting operation supplying
                regional buyers. As demand for accountable, audit-ready
                manufacturing grew across the industry, we reinvested in
                dyeing, printing, and embroidery capacity so the entire
                production chain could sit under one roof and one quality
                standard.
              </p>
              <p>
                Today we manufacture for brands across Men&apos;s, Women&apos;s, Kids&apos;,
                and Baby wear categories, shipping to more than twenty export
                markets. Our clientele includes both established
                international labels and growing D2C brands who need a
                manufacturing partner that can scale with them.
              </p>
              <p>
                Every stage of that growth has been paired with a matching
                investment in compliance — from our first ISO certification
                to our current WRAP, BSCI, and SEDEX memberships.
              </p>
            </div>

            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 rounded-sm border border-navy-900 text-navy-900 hover:bg-navy-950 hover:text-white font-semibold px-6 py-3 transition-colors"
            >
              Download Company Profile (PDF)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-navy-950 text-white rounded-sm p-8">
              <h3 className="font-display text-lg font-medium text-gold-400 mb-6">
                Company Credentials
              </h3>
              <dl className="space-y-5">
                {CREDENTIALS.map((c) => (
                  <div key={c.label} className="flex justify-between border-b border-white/10 pb-3">
                    <dt className="text-white/60 text-sm">{c.label}</dt>
                    <dd className="font-mono-data text-sm text-right">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <SectionImage images={bySection.credentials} fallbackLabel={null} className="mt-6" aspect="aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* Quality control process — genuine sequence, numbering is meaningful here */}
      <section className="py-16 md:py-24 bg-white border-y border-line">
        <div className="container-page">
          <span className="text-gold-600 text-xs font-semibold uppercase tracking-[0.2em]">
            Quality Control
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-medium mt-3 max-w-xl">
            A four-stage checkpoint process, from raw fabric to final shipment.
          </h2>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {QC_STEPS.map((s) => (
              <div key={s.step} className="relative pl-1">
                <span className="font-mono-data text-4xl text-gold-500/50 font-semibold">{s.step}</span>
                <h3 className="font-display text-lg font-medium mt-3">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <ImageRow images={bySection.quality_control} className="mt-12" />
        </div>
      </section>

      {/* Employee welfare */}
      <section className="py-16 md:py-24">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold-600 text-xs font-semibold uppercase tracking-[0.2em]">
              Employee Welfare
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-medium mt-3">
              Compliance that shows up in daily operations, not just audit binders.
            </h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Our welfare program covers on-site medical care, subsidized
              meals, a dedicated grievance channel, and paid leave
              administered in line with local labor law and buyer codes of
              conduct such as BSCI and SEDEX.
            </p>
          </div>
          <SectionImage images={bySection.welfare} fallbackLabel="Add a photo from Django Admin → About Page Images → section: Employee Welfare" aspect="aspect-[4/3]" />
        </div>

        <div className="container-page mt-10">
          <ul className="grid sm:grid-cols-2 gap-5">
            {[
              "On-site medical center with a full-time nurse",
              "Fire safety training every quarter, factory-wide",
              "Confidential worker grievance hotline",
              "Subsidized canteen and clean drinking water stations",
              "Childcare facility for factory-floor staff",
              "Written anti-harassment and non-discrimination policy",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-slate-700">
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

/**
 * Renders the first admin-uploaded image for a section, or a subtle empty
 * state telling the editor exactly which section to upload into.
 */
function SectionImage({ images, fallbackLabel, className = "", aspect = "aspect-[16/9]" }) {
  const item = images?.[0];

  if (!item) {
    if (!fallbackLabel) return null;
    return (
      <div className={`${aspect} rounded-sm border border-dashed border-line bg-paper-dim flex items-center justify-center text-center p-6 ${className}`}>
        <p className="text-xs text-slate-400 max-w-[220px]">{fallbackLabel}</p>
      </div>
    );
  }

  return (
    <div className={`rounded-sm overflow-hidden border border-line ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mediaUrl(item.image)}
        alt={item.caption || item.title}
        className={`w-full ${aspect} object-cover`}
      />
    </div>
  );
}

/** Renders every admin-uploaded image in a section as a horizontal row (used for QC). */
function ImageRow({ images, className = "" }) {
  if (!images?.length) return null;
  return (
    <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {images.map((item) => (
        <div key={item.id} className="rounded-sm overflow-hidden border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mediaUrl(item.image)} alt={item.caption || item.title} className="w-full aspect-[4/3] object-cover" />
        </div>
      ))}
    </div>
  );
}
