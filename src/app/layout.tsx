import type { Metadata, Viewport } from "next";
import { Archivo, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileCallBar } from "@/components/MobileCallBar";
import { business, indexable } from "@/content/business";
import { businessSchema, websiteSchema } from "@/lib/seo";
import "./globals.css";

const sans = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "600"],
  variable: "--font-serif",
  display: "swap",
  // Only used for small accents (logo lockup), so it shouldn't compete with the main font.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: `Concrete Contractor in New Haven, MI | ${business.name}`,
    template: `%s | ${business.shortName}`,
  },
  description:
    "Family-owned concrete contractor in New Haven, MI. Driveways, patios, walkways, retaining walls and pool decks across Macomb County. BBB A+ accredited.",
  applicationName: business.name,
  ...(indexable ? {} : { robots: { index: false, follow: false } }),
  formatDetection: { telephone: false },
  openGraph: {
    siteName: business.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Enzo’s Concrete LLC logo beside an exposed-aggregate patio edge" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.jpg"] },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#151515",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileCallBar />
        <JsonLd data={[businessSchema(), websiteSchema()]} />
        <Analytics />
      </body>
    </html>
  );
}
