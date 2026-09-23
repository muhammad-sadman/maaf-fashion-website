import Link from "next/link";
import { getStats, getCertifications } from "@/lib/api";
import StatCard from "@/components/StatCard";
import CertificationStrip from "@/components/CertificationStrip";
import StitchDivider from "@/components/StitchDivider";
import KnitPattern from "@/components/KnitPattern";


export const revalidate = 60;


export default async function HomePage() {
  const [stats, certifications] = await Promise.all([getStats(), getCertifications()]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <KnitPattern className="absolute inset-0 w-full h-full" opacity={0.14} />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/95 to-navy-800" />

        <div className="container-page relative py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="inline-block text-gold-400 font-mono-data text-xs tracking-[0.2em] uppercase mb-5 border border-gold-500/40 rounded-full px-3 py-1.5">
              Vertically Integrated Knitwear Manufacturer
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.08] tracking-tight">
              Built stitch by stitch for buyers who audit before they order.
            </h1>
            <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">
              Maaf Fashion knits, dyes, prints, and finishes apparel under one
              roof in Dhaka — with the certifications, capacity data, and
              compliance record international sourcing teams need to see
              before the first sample ships.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-sm bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-7 py-3.5 transition-colors"
              >
                Request a Quote
              </Link>
              <Link
                href="/capacity"
                className="inline-flex items-center rounded-sm border border-white/25 hover:border-white/60 text-white font-semibold px-7 py-3.5 transition-colors"
              >
                View Manufacturing Capacity
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {stats.map((stat) => (
                <StatCard key={stat.id} {...stat} />
              ))}
            </div>
          </div>
        </div>

        <StitchDivider className="relative" />
      </section>

      {/* CERTIFICATION STRIP */}
      <section className="bg-navy-900 py-10">
        <div className="container-page">
          <p className="text-center text-white/50 text-xs uppercase tracking-[0.2em] mb-6">
            Audited &amp; certified to international standards
          </p>
          <CertificationStrip certifications={certifications} variant="strip" />
        </div>
      </section>

      {/* ABOUT SNAPSHOT */}
      <section className="py-20 md:py-28">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="text-gold-600 text-xs font-semibold uppercase tracking-[0.2em]">
              Who we are
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-medium mt-3 leading-tight">
              A single factory floor, four production disciplines, one
              standard of accountability.
            </h2>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
            <SnapshotItem
              title="Founded on vertical integration"
              body="Knitting, dyeing, printing, embroidery, and finishing operate under one roof, cutting handoff delays and giving buyers a single point of accountability."
            />
            <SnapshotItem
              title="Quality control at every stage"
              body="In-line inspection at each department, with AQL-based final audits before goods leave the finishing floor."
            />
            <SnapshotItem
              title="Workforce-first operations"
              body="Fire detection systems, on-site medical care, and welfare facilities are built into daily operations, not bolted on for audits."
            />
            <SnapshotItem
              title="Export-ready documentation"
              body="Compliance records, certification logs, and capacity data are maintained continuously so buyer audits move quickly."
            />
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-charcoal text-white py-16">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-medium">
              Sourcing your next collection?
            </h2>
            <p className="text-white/60 mt-2 max-w-md">
              Send your specs and target volumes — our team responds with
              capacity and lead-time confirmation within two business days.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-sm bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-7 py-3.5 whitespace-nowrap transition-colors"
          >
            Start an Inquiry
          </Link>
        </div>
      </section>
    </>
  );
}

function SnapshotItem({ title, body }) {
  return (
    <div className="border-t border-line pt-4">
      <h3 className="font-display text-lg font-medium text-ink">{title}</h3>
      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{body}</p>
    </div>
  );
}
