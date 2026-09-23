import PageHero from "@/components/PageHero";
import { getDepartments } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

export const revalidate = 60;

export const metadata = {
  title: "Manufacturing Capacity | Maaf Fashion",
  description: "Departmental breakdown of Knitting, Dyeing, and Printing & Embroidery capacity at Maaf Fashion.",
};

export default async function CapacityPage() {
  const departments = await getDepartments();

  return (
    <>
      <PageHero
        eyebrow="Manufacturing Capacity"
        title="One production line, three departments, full traceability."
        description="Goods move from knitting through dyeing to printing and embroidery without leaving the building — cutting lead time and giving buyers a single audit trail."
      />

      <section className="py-14 md:py-20">
        <div className="container-page">
          {/* Process flow — genuine sequence, so numbered stages are meaningful */}
          <div className="hidden md:flex items-center justify-between mb-16 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-line -translate-y-1/2" />
            {departments.map((dept, i) => (
              <div key={dept.id} className="relative bg-paper px-6 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-gold-500 mb-3" />
                <span className="text-sm font-mono-data text-slate-600">
                  {String(i + 1).padStart(2, "0")} — {dept.name}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-14">
            {departments.map((dept, i) => (
              <DepartmentBlock key={dept.id} dept={dept} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function DepartmentBlock({ dept, index }) {
  const reversed = index % 2 === 1;
  const photo = mediaUrl(dept.photo);

  return (
    <div className={`grid lg:grid-cols-12 gap-10 items-start ${reversed ? "" : ""}`}>
      <div className={`lg:col-span-5 ${reversed ? "lg:order-2" : ""}`}>
        <div className="aspect-[4/3] bg-navy-900 rounded-sm relative overflow-hidden flex items-center justify-center">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={dept.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-display text-white/20 text-6xl">{String(index + 1).padStart(2, "0")}</span>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-navy-950/85 px-5 py-3 flex justify-between items-center">
            <span className="text-white text-sm font-medium">Daily Capacity</span>
            <span className="font-mono-data text-gold-400 text-sm">{dept.daily_capacity}</span>
          </div>
        </div>
      </div>

      <div className={`lg:col-span-7 ${reversed ? "lg:order-1" : ""}`}>
        <h2 className="font-display text-2xl md:text-3xl font-medium">{dept.name}</h2>
        <p className="text-slate-600 mt-3 leading-relaxed max-w-xl">{dept.description}</p>

        <div className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gold-600 mb-3">
            Equipment
          </h3>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {dept.equipment_items.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-slate-700">
                <span className="text-gold-500 mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
