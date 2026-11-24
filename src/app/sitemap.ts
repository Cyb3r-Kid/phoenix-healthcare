import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { isProductionDomain, siteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionDomain) return [];
  return ["", "/about", "/services", ...services.map(s => `/services/${s.slug}`), "/medical-equipment", "/contact", "/privacy"].map(path => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : .7 }));
}
