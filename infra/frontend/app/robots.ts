import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/client/", "/chat/", "/login/"],
      },
    ],
    sitemap: "https://lawrora.ai/sitemap.xml",
    host: "https://lawrora.ai",
  };
}
