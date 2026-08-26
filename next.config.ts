import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* До дефолтної драбинки бракувало сходинки між 2048 і 3840. Найширший слот
       на сайті — 1120px (.wide), на екрані 2x це рівно 2240 реальних пікселів:
       2048 трохи не дотягує й дає м'який кадр, тож браузер стрибав аж на 3840 і
       тягнув удвічі більше, ніж треба. 2560 закриває цей слот точно. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
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
