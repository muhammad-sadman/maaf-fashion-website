// Self-hosted fonts (no runtime dependency on fonts.googleapis.com — safer
// for shared hosting environments that may sit behind a restrictive proxy).
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Maaf Fashion | Precision Knitwear Manufacturing & Export",
  description:
    "Maaf Fashion is a vertically integrated garment manufacturer producing knitwear for global buyers, backed by international compliance certifications and 65,000+ pcs/day capacity.",
  keywords: [
    "garment manufacturer",
    "knitwear exporter",
    "Bangladesh apparel manufacturer",
    "B2B clothing sourcing",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-paper text-ink">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
