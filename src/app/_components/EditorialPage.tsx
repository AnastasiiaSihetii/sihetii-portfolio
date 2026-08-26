import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "../_content/blocks";
import { otherWorkExcept } from "../_content/other-work";
import { SiteHeader } from "./SiteHeader";
import { typo } from "./typo";
import styles from "./editorial.module.css";

export type Fact = { label: string; value: ReactNode };

export type EditorialPageProps = {
  /** Роут сторінки — щоб виключити її саму з блоку «Інші роботи» */
  href: string;
  title: string;
  lead?: ReactNode[];
  facts?: Fact[];
  byline?: { name: string; date: string; avatar: string };
  /** Кадр одразу під хедером */
  hero?: { src: string; alt: string; width: number; height: number };
  /** Де стоїть кадр: під заголовком і лідом (типово) чи над заголовком. */
  heroPosition?: "below-title" | "above-title";
  blocks: Block[];
  moreHeading?: string;
  /** Колір виділених цифр. За замовчуванням синій, як на решті сайту. */
  accent?: string;
  /** Стаття обводить кадри волосяною рамкою, кейс — ні. */
  kind?: "case" | "article";
  /**
   * Мова тексту сторінки. Сайт віддається з lang="en", але кейси англійські,
   * а стаття українська — і це різниця, яку браузер має знати: від неї
   * залежить словник переносів, голос скрінрідера й мова, яку бачить пошук.
   * Атрибут стоїть на <article>, тобто рівно на тому піддереві, якого
   * стосується, — це і є те, для чого lang існує.
   */
  lang?: "en" | "uk";
};

const SIZE = { hero: "wide", mid: "mid", wide: "wide" } as const;

/* Реальна ширина кадру в макеті. Без цього браузер тягне файл під 3840px
   там, де колонка всього 832px. */
const SIZES = {
  hero: "(max-width: 1120px) 100vw, 1120px",
  wide: "(max-width: 1120px) 100vw, 1120px",
  mid: "(max-width: 832px) 100vw, 832px",
} as const;

export function EditorialPage({
  href,
  title,
  lead,
  facts,
  byline,
  hero,
  heroPosition = "below-title",
  blocks,
  moreHeading = "Other work",
  accent,
  kind = "case",
  lang = "en",
}: EditorialPageProps) {
  /* Ліміт у дві рекомендації живе в other-work.ts, а не тут. */
  const more = otherWorkExcept(href, lang);

  const heroShot = hero ? (
    <figure
      className={`${styles.shot} ${styles.hero} ${styles.wide}${
        heroPosition === "above-title" ? ` ${styles.heroTop}` : ""
      }`}
    >
      {/* Кадр статті — різкий моноширинний текст, тому дефолтна якість 75 його
          помітно розмиває.

          sizes тут обов'язковий. Без нього next/image вважає кадр фіксованим і
          віддає один-єдиний кандидат на 3840px — той самий і телефону, і
          десктопу, ще й із preload'ом. Саме він був LCP-елементом кейсів і
          вантажився близько чотирьох секунд на мобільному.

          Колишнє розмиття було не від sizes як такого, а від неправильного
          значення: воно описувало вужчу колонку, ніж та, в якій кадр реально
          стоїть, і браузер брав кандидата під 828px на слот 1080px. Тут стоїть
          ширина саме цього слота — .hero лежить у .wide, тобто до 1120px. */}
      <Image
        src={hero.src}
        alt={hero.alt}
        width={hero.width}
        height={hero.height}
        sizes={SIZES.wide}
        quality={92}
        priority
      />
    </figure>
  ) : null;

  return (
    <>
      {/* Шапка липне до верху й лишається першою зупинкою Tab — посилання повз
          неї веде одразу в текст. Видиме тільки у фокусі. */}
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader lang={lang} />
      <main id="main">
      <article
        lang={lang}
        className={`${styles.article}${kind === "article" ? ` ${styles.framedShots}` : ""}`}
        style={accent ? ({ "--accent": accent } as React.CSSProperties) : undefined}
      >
        {heroPosition === "above-title" && heroShot}

        <header className={styles.head}>
          <h1>{typo(title)}</h1>
          {lead?.map((line, i) => (
            <p className={styles.lead} key={i}>{typo(line)}</p>
          ))}
        </header>

        {heroPosition === "below-title" && heroShot}

        {byline && (
          <div className={styles.byline}>
            <Image src={byline.avatar} alt="" width={56} height={56} />
            <div>
              <b>{byline.name}</b>
              <span>{byline.date}</span>
            </div>
          </div>
        )}

        {facts && (
          <dl className={styles.facts}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{typo(f.label)}</dt>
                <dd>{typo(f.value)}</dd>
              </div>
            ))}
          </dl>
        )}

        {blocks.map((block, i) => (
          <RenderBlock key={i} block={block} />
        ))}

        {more.length > 0 && (
          /* Смуга прочитаного в шапці міряє дистанцію до цієї межі: далі йдуть
             рекомендації, а не текст сторінки. */
          <aside data-reading-end className={styles.more} aria-labelledby="more-h">
            <h2 id="more-h">{moreHeading}</h2>
            <ul className={styles.moreList}>
              {more.map((w) => (
                <li key={w.href}>
                  <div className={styles.moreRow}>
                    {/* Кейс під NDA не має кадру — на його місці той самий
                        прямокутник, але з написом, щоб рядок не з'їхав. */}
                    <div
                      className={[
                        styles.moreThumb,
                        !w.thumb ? styles.moreThumbEmpty : "",
                        /* Марку друкують на аркуші, тож logo = кадр статті і
                           слот 179x122 намальовано під нього. Кейс несе свій
                           продуктовий кадр 16:9 і показує його як є. */
                        w.thumb && !w.logo ? styles.moreThumbPlain : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {w.thumb ? (
                        <Image src={w.thumb} alt="" width={179} height={122} />
                      ) : (
                        <span>Under NDA</span>
                      )}
                      {w.thumb && w.logo && (
                        <Image
                          className={styles.moreLogo}
                          src={w.logo.src}
                          alt={w.logo.alt}
                          width={179}
                          height={122}
                          style={{ "--logo-scale": w.logo.scale } as React.CSSProperties}
                        />
                      )}
                    </div>
                    <div className={styles.moreBody}>
                      <Link className={styles.moreTitle} href={w.href}>
                        <span className={styles.mark}>{typo(w.title)}</span>
                      </Link>
                      <p className={styles.moreDesc}>{typo(w.desc)}</p>
                      <div className={styles.moreDate}><span>{w.date}</span></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        )}

      </article>
      </main>
    </>
  );
}

/* Стрілка між двома числами набирається тим самим гліфом, але дрібніше: на
   повному кеглі вона важить як ще одна цифра й розбиває пару значень. */
function withSmallArrow(value: string) {
  const parts = value.split("→");
  if (parts.length === 1) return value;
  return parts.map((part, i) => (
    <span key={i}>
      {i > 0 && <span className={styles.statArrow}>→</span>}
      {part.trim()}
    </span>
  ));
}

function RenderBlock({ block }: { block: Block }) {
  return typo(renderBlock(block));
}

function renderBlock(block: Block) {
  switch (block.kind) {
    case "heading": {
      const cls = block.variant ? styles[block.variant] : undefined;
      return block.level === 2
        ? <h2 id={block.id} className={cls}>{block.text}</h2>
        : <h3 id={block.id}>{block.text}</h3>;
    }

    case "text":
      return <>{block.items.map((t, i) => <p key={i}>{t}</p>)}</>;

    case "list": {
      const items = block.items.map((t, i) => <li key={i}>{t}</li>);
      return block.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
    }

    case "figure":
      return (
        <figure className={`${styles.shot} ${styles[SIZE[block.size]]} ${block.size === "hero" ? styles.hero : ""}`}>
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes={SIZES[block.size]}
          />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    case "stats":
      return (
        <div className={styles.stats}>
          {block.items.map((s, i) => (
            <div className={styles.stat} key={i}>
              <b>{withSmallArrow(s.value)}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      );

    case "quote":
      return (
        <blockquote>
          {block.text}
          {block.cite && <cite>{block.cite}</cite>}
        </blockquote>
      );

    case "cards":
      return (
        <div className={styles.cards}>
          {block.items.map((c) => (
            <div className={styles.card} key={c.num}>
              <div className={styles.cardHead}>
                <span className={styles.cardNum}>{c.num}</span>
                <span className={styles.cardMeta}>{c.meta}</span>
              </div>
              <p>{c.text}</p>
              {/* Кома замість крапки-роздільника: перелік не розпадається при переносі */}
              {c.steps && <span className={styles.cardSteps}>{c.steps.join(", ")}</span>}
            </div>
          ))}
        </div>
      );

    case "defs":
      return (
        <dl className={styles.defs}>
          {block.items.map((d) => (
            <div key={d.term}>
              <dt>{d.term}</dt>
              <dd>{d.desc}</dd>
            </div>
          ))}
        </dl>
      );

    case "note":
      return <p className={styles.note}>{block.text}</p>;

    case "separator":
      return <div className={styles.sep} aria-hidden="true">· · ·</div>;
  }
}
