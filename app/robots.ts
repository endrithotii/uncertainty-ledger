import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/projects", "/api/"] },
    sitemap: "https://uncertainty-ledger.vercel.app/sitemap.xml",
  }
}
