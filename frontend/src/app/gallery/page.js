import PageHero from "@/components/PageHero";
import { getGallery } from "@/lib/api";
import GalleryExplorer from "./GalleryExplorer";

export const revalidate = 60;

export const metadata = {
  title: "Gallery | Maaf Fashion",
  description: "Visual proof of Maaf Fashion's infrastructure, manufacturing process, and worker welfare facilities.",
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="What our production floor actually looks like."
        description="Infrastructure, live process shots, and the welfare facilities our workforce uses every day."
      />
      <section className="py-14 md:py-20">
        <div className="container-page">
          <GalleryExplorer initialItems={items} />
        </div>
      </section>
    </>
  );
}
