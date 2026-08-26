import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Сторінки колись лежали як статичні .html у public/. Зараз це роути,
     але старі адреси вже розійшлися посиланнями — тримаємо їх живими. */
  async redirects() {
    return [
      { source: "/case-studies/birthday-website.html", destination: "/case-studies/birthday-website", permanent: true },
      { source: "/case-studies/loops-app.html", destination: "/case-studies/loops-app", permanent: true },
      { source: "/articles/design-engineer-2026.html", destination: "/articles/design-engineer-2026", permanent: true },
    ];
  },
};

export default nextConfig;
