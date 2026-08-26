import type { MetadataRoute } from "next";
import { abs } from "./site-url";

/* Лабораторія курсора вже віддає robots: noindex у своїх метаданих. Тут вона
   названа ще раз, щоб краулер не витрачав на неї обхід узагалі, і щоб мапа
   сайту мала явну адресу. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/cursor" },
    sitemap: abs("/sitemap.xml"),
  };
}
