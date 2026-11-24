import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { business } from "@/data/business";
import { isProductionDomain, siteUrl } from "@/lib/seo";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Phoenix Home Healthcare | Care at Home in Urapakkam, Chennai", template: "%s | Phoenix Home Healthcare" },
  description: "Compassionate home nursing, elderly care and medical equipment support in Urapakkam, Chennai. Speak with Phoenix about care for your loved ones.",
  robots: { index: isProductionDomain, follow: isProductionDomain },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "LocalBusiness", name: business.name, ...(isProductionDomain ? { url: siteUrl, "@id": `${siteUrl}/#business` } : {}), telephone: "+916374930178", description: "Home healthcare, elderly care assistance and medical equipment support.", address: { "@type": "PostalAddress", streetAddress: "4/54, Karanai Puducherry Road", addressLocality: "Urapakkam, Chennai", addressRegion: "Tamil Nadu", postalCode: "603202", addressCountry: "IN" }, sameAs: [business.instagram] };
  return <html lang="en-IN"><body><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" tabIndex={-1}>{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} /></body></html>;
}
