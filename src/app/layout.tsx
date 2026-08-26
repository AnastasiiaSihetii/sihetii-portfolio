import type { Metadata } from "next";
import Script from "next/script";
import SiteCursor from "./site-cursor";
import { SITE_URL } from "./site-url";
import "./globals.css";

/* Заголовок і опис головної живуть у home-metadata.ts: вони різні для двох
   мовних адрес. Тут лишається лише те, що спільне на весь сайт. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Anastasiia Sihetii — Product Designer · Design Engineer",
  description:
    "Portfolio of Anastasiia Sihetii: I design products and build the front end myself, from idea to production.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        {/* Шрифт стоїть у @font-face всередині globals.css, тобто браузер
            дізнається про нього аж коли розбере CSS — на один рейс пізніше,
            ніж міг би. До того часу текст уже намальований запасним шрифтом,
            а коли Fixel приходить, рядки перемальовуються: саме цей другий
            малюнок і був LCP головної. Preload забирає той зайвий рейс. */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/fixel-variable-100900-var-0.woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <SiteCursor />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y46c2lbj60");
          `}
        </Script>
      </body>
    </html>
  );
}
