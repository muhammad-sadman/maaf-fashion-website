import Link from "next/link";

const SITEMAP = [
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/capacity", label: "Manufacturing Capacity" },
  { href: "/compliance", label: "Compliance & Safety" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

const LEGAL = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70 mt-24">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <span className="font-display text-xl font-semibold text-white">
            MAAF <span className="text-gold-400">FASHION</span>
          </span>
          <p className="mt-4 text-sm leading-relaxed max-w-sm">
            A vertically integrated knitwear manufacturer and exporter,
            built on compliance, capacity, and consistency for global
            sourcing partners.
          </p>
          <p className="mt-6 text-sm font-mono-data text-white/50">
            maaffashion.com
          </p>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">
            Sitemap
          </h3>
          <ul className="space-y-2.5 text-sm">
            {SITEMAP.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold-400 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">
            Get in touch
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>Corporate Address: Plot #111 (8th Floor), Ranavola Avenue, Road #13, Sector #10, Uttara, Dhaka-1230</li>
            <li>Factory Address: South Debipur (Ranigonj), Ghoraghat, Dinajpur, (post code- 5290), Bangladesh.</li>
            <li>
              <a href="tel:+880177-7304871" className="hover:text-gold-400">
                Phone: +8801777304871
              </a>
            </li>
            <li>
              <a href="mailto:sales@maaffashion.com" className="hover:text-gold-400">
                Email: sales@maafcraft.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Maaf Fashion. All rights reserved.</p>
          <div className="flex gap-5">
            {LEGAL.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-gold-400">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
