"use client";

import { useEffect, useState, useTransition } from "react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default function ProductsExplorer({ initialCategories, initialProducts }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState(initialProducts);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data = await getProducts(
        activeCategory === "all" ? {} : { category: activeCategory }
      );
      setProducts(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-10">
        <FilterPill
          active={activeCategory === "all"}
          onClick={() => setActiveCategory("all")}
          label="All Categories"
        />
        {initialCategories.map((cat) => (
          <FilterPill
            key={cat.slug}
            active={activeCategory === cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            label={cat.name}
          />
        ))}
      </div>

      {isPending ? (
        <p className="text-slate-400 text-sm">Loading styles…</p>
      ) : products.length === 0 ? (
        <p className="text-slate-400 text-sm">No styles found in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
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
