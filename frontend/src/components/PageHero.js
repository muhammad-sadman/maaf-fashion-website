import StitchDivider from "./StitchDivider";

export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative bg-navy-950 text-white py-16 md:py-20">
      <div className="container-page">
        {eyebrow && (
          <span className="text-gold-400 font-mono-data text-xs tracking-[0.2em] uppercase">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-3xl md:text-5xl font-medium mt-3 leading-tight max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-white/65 mt-5 max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
      <StitchDivider className="absolute -bottom-3 left-0" />
    </section>
  );
}
