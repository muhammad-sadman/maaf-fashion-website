import PageHero from "@/components/PageHero";
import { getCategories, getProducts } from "@/lib/api";
import ProductsExplorer from "./ProductsExplorer";

export const revalidate = 60;


export const metadata = {
  title: "Products | Maaf Fashion",
  description: "Browse the Maaf Fashion catalogue by category: Men's, Women's, Kids', and Baby wear.",
};

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <>
      <PageHero
        eyebrow="Product Catalogue"
        title="Browse styles by category and style code."
        description="Every style below is production-ready and can be adapted to your fabric, colorway, and trim specifications."
      />
      <section className="py-14 md:py-20">
        <div className="container-page">
          <ProductsExplorer initialCategories={categories} initialProducts={products} />
        </div>
      </section>
    </>
  );
}
