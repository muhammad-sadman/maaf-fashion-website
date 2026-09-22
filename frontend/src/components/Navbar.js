"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/capacity", label: "Capacity" },
  { href: "/compliance", label: "Compliance" },
  { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur border-b border-white/10">
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-display text-xl md:text-2xl font-semibold text-white tracking-tight">
            MAAF <span className="text-gold-400">FASHION</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide uppercase pb-1 transition-colors ${
                  active ? "text-gold-400" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-gold-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center rounded-sm bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-sm px-5 py-2.5 transition-colors"
          >
            Contact Us
          </Link>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden text-white p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden bg-navy-900 border-t border-white/10">
          <div className="container-page py-4 flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-white/85 hover:text-gold-400 text-sm font-medium uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center items-center rounded-sm bg-gold-500 text-navy-950 font-semibold text-sm px-5 py-2.5"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
