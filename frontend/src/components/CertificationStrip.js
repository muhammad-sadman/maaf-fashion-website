import { mediaUrl } from "@/lib/api";

export default function CertificationStrip({ certifications, variant = "strip" }) {
  if (!certifications?.length) return null;

  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-white border border-line rounded-sm p-5 flex flex-col items-start gap-2 hover:border-gold-500 transition-colors"
          >
            <CertBadge cert={cert} />
            <h3 className="font-display text-base font-medium text-ink">{cert.name}</h3>
            {cert.description && (
              <p className="text-sm text-slate-600">{cert.description}</p>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-6 justify-center">
      {certifications.map((cert) => (
        <div key={cert.id} className="flex items-center gap-2.5 opacity-90">
          <CertBadge small cert={cert} />
          <span className="text-sm font-medium text-white/85 whitespace-nowrap">{cert.name}</span>
        </div>
      ))}
    </div>
  );
}

function CertBadge({ cert, small = false }) {
  const logo = mediaUrl(cert.logo);
  const size = small ? 28 : 40;
  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo} alt={cert.name} width={size} height={size} className="object-contain" />;
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-gold-500/15 border border-gold-500 flex items-center justify-center text-gold-500 font-mono-data font-semibold"
    >
      {cert.name.slice(0, 1)}
    </div>
  );
}
