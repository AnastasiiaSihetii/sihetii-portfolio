import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* Картка для соцмереж: марка на білому, той самий світ, яким відкривається
   сайт. Слів на картці немає навмисно — їх несуть og:title і og:description,
   а тут працює тільки марка. Через це картці не потрібен шрифт: Fixel лежить
   у репозиторії єдиним змінним woff2, якого рендерер OG-зображень не читає, а
   підставити замість нього системний гротеск означало б віддати назовні
   картку не тим шрифтом, яким набраний сайт.

   На обкладинці сайту марка йде під зріз — ім'я там і так стоїть поруч у
   тексті. Картці зрізати нічого не можна: у неї одна робота — назвати ім'я.
   Тому береться не обкладинковий файл, а підвальна марка: її viewBox збігається
   з повними межами контурів, тобто це те саме лого цілком, без вікна.

   Контури починаються з від'ємної координати (x = -209.6). Рендерер OG-зображень
   не застосовує ні зсув viewBox, ні clip-path — перевірено, — тому вміст
   зсувається трансформом, і файл більше не залежить від того, читає рендерер
   viewBox чи ні. */

export const alt = "Anastasiia Sihetii — Product Designer · Design Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Повні межі контурів марки, зняті з getBBox() у браузері. */
const ART = { x: 209.6, w: 1734, h: 479.2 };

export default async function OpengraphImage() {
  const raw = await readFile(
    join(process.cwd(), "public", "articles", "logos", "sihetii.svg"),
    "utf8",
  );
  const inner = raw.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  const framed =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${ART.w}" height="${ART.h}" ` +
    `viewBox="0 0 ${ART.w} ${ART.h}" fill="none">` +
    `<g transform="translate(${ART.x} 0)">${inner}</g></svg>`;
  const mark = `data:image/svg+xml;base64,${Buffer.from(framed).toString("base64")}`;

  /* Марка сідає в поля картки по ширині; висота йде за її власною пропорцією. */
  const width = size.width - 160;
  const height = Math.round((width * ART.h) / ART.w);

  return (
    new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
          }}
        >
          <img src={mark} width={width} height={height} alt="" />
        </div>
      ),
      size,
    )
  );
}
