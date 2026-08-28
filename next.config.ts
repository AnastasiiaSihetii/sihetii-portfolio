import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* До дефолтної драбинки бракувало сходинки між 2048 і 3840. Найширший слот
       на сайті — 1120px (.wide), на екрані 2x це рівно 2240 реальних пікселів:
       2048 трохи не дотягує й дає м'який кадр, тож браузер стрибав аж на 3840 і
       тягнув удвічі більше, ніж треба. 2560 закриває цей слот точно. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
  /* Резюме віддаємо людям, але не пускаємо в пошук окремим документом: до нього
     має вести сторінка сайту, а не видача. */
  async headers() {
    return [
      {
        source: "/anastasiia-sihetii-cv.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
  /* Сторінки колись лежали як статичні .html у public/. Зараз це роути,
     але старі адреси вже розійшлися посиланнями — тримаємо їх живими. */
  async redirects() {
    return [
      { source: "/case-studies/birthday-website.html", destination: "/case-studies/birthday-website", permanent: true },
      { source: "/case-studies/loops-app.html", destination: "/case-studies/loops-app", permanent: true },
      { source: "/articles/design-engineer-2026.html", destination: "/articles/design-engineer-2026", permanent: true },
      /* Український оригінал знятий із сайту: він вийшов на DOU, і головна
         веде туди. Редирект навмисно тимчасовий (307): постійний осів би в
         кешах браузерів і в індексі, і повернути статтю на її адресу було б
         значно важче, ніж прибрати цей рядок. Англійський переклад редиректу
         не має — на DOU його немає, тож картка на головній веде саме сюди. */
      { source: "/articles/design-engineer-2026", destination: "/uk", permanent: false },
    ];
  },
};

export default nextConfig;
