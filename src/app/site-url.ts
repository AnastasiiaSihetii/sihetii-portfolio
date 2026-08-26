/** Абсолютна база сайту. Береться з оточення, щоб не зашивати домен: на
 *  Vercel це продакшн-урл проєкту, локально — localhost.
 *
 *  Живе окремим модулем, бо потрібна трьом місцям: layout (metadataBase),
 *  sitemap і robots. Двом останнім — обов'язково абсолютною: відносний <loc>
 *  у мапі сайту невалідний, і краулер таку мапу відкидає цілком. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Шлях від кореня → абсолютна адреса. */
export const abs = (path: string) => new URL(path, SITE_URL).toString();
