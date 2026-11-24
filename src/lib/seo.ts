import type { Metadata } from "next";
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (configured && (!/^https:\/\//.test(configured) || new URL(configured).pathname !== "/")) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path.");
}
export const siteUrl = configured ? new URL(configured).origin : "http://localhost:3000";
export const isProductionDomain = Boolean(configured);
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title: `${title} | Phoenix Home Healthcare`, description, url: path, type: "website", locale: "en_IN", siteName: "Phoenix Home Healthcare", images: [{ url: "/images/hero.webp", width: 1400, height: 933, alt: "Compassionate support at home" }] }, twitter: { card: "summary_large_image", title, description, images: ["/images/hero.webp"] } };
}
