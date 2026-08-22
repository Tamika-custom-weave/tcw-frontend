import { MetadataRoute } from "next";
import { fetchCategories, fetchProducts } from "@/services/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.tamikascustomweaves.com";

  // Base static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.1,
    }
  ];

  try {
    // Dynamic Product Routes
    const products = await fetchProducts();
    const productRoutes: MetadataRoute.Sitemap = products
      .filter(p => p.isActive)
      .map(product => ({
        url: `${baseUrl}/product/${product.slug}`,
        lastModified: new Date(product.updatedAt || new Date()),
        changeFrequency: "daily",
        priority: 0.8,
      }));

    routes.push(...productRoutes);

    // Dynamic Category Routes
    const categories = await fetchCategories();
    const categoryRoutes: MetadataRoute.Sitemap = categories
      .map(category => ({
        url: `${baseUrl}/shop?category=${category.slug}`,
        lastModified: new Date(category.updatedAt || new Date()),
        changeFrequency: "weekly",
        priority: 0.7,
      }));

    routes.push(...categoryRoutes);
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }

  return routes;
}
