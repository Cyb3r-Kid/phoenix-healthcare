import type { MetadataRoute } from "next";
import { isProductionDomain, siteUrl } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return isProductionDomain ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` } : { rules: { userAgent: "*", disallow: "/" } };
}
