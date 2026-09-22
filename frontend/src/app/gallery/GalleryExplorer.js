"use client";

import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { mediaUrl } from "@/lib/api";

const CATEGORY_LABELS = {
  infrastructure: "Infrastructure",
  process: "Manufacturing Process",
  welfare: "Sustainability & Welfare",
};

export default function GalleryExplorer({ initialItems }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return initialItems;
    return initialItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, initialItems]);

  const slides = filtered.map((item) => ({
    src: mediaUrl(item.image) || placeholderDataUri(item.title),
    title: item.title,
    description: item.caption,
  }));

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-10">
        <FilterPill active={activeCategory === "all"} onClick={() => setActiveCategory("all")} label="All" />
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <FilterPill
            key={key}
            active={activeCategory === key}
            onClick={() => setActiveCategory(key)}
            label={label}
          />
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setLightboxIndex(i)}
            className="block w-full text-left group relative overflow-hidden rounded-sm border border-line break-inside-avoid"
          >
            <div className="aspect-[4/3] bg-navy-900 relative flex items-center justify-center">
              {mediaUrl(item.image) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mediaUrl(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="text-white/25 font-display text-2xl px-4 text-center">{item.title}</span>
              )}
              <span className="absolute bottom-0 left-0 right-0 bg-navy-950/85 text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {CATEGORY_LABELS[item.category]}
              </span>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </div>
  );
}

function FilterPill({ active, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium px-4 py-2 rounded-full border transition-colors ${
        active
          ? "bg-navy-950 border-navy-950 text-white"
          : "border-line text-slate-600 hover:border-navy-900 hover:text-navy-900"
      }`}
    >
      {label}
    </button>
  );
}

function placeholderDataUri(title) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="800" height="600" fill="%230f2242"/><text x="50%" y="50%" fill="%23dcb466" font-size="28" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif">${title}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
