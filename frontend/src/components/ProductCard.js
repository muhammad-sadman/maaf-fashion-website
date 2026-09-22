import { mediaUrl } from "@/lib/api";

export default function ProductCard({ product }) {
  const img = mediaUrl(product.image);

  return (
    <article className="group bg-white border border-line rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[4/5] bg-paper-dim relative overflow-hidden">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" strokeWidth="1.2">
              <path d="M4 4h16v16H4z" />
              <path d="M4 16l5-5 3 3 4-6 4 8" />
            </svg>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-navy-950/90 text-gold-400 text-[11px] font-mono-data px-2 py-1 rounded-sm tracking-wide">
          {product.sku_style_code}
        </span>
      </div>
      <div className="p-4">
        <span className="text-[11px] uppercase tracking-wide text-gold-600 font-semibold">
          {product.category?.name}
        </span>
        <h3 className="font-display text-lg font-medium text-ink mt-1">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-slate-600 mt-1.5 line-clamp-2">{product.description}</p>
        )}
      </div>
    </article>
  );
}
