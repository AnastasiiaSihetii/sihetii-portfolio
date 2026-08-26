"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { EMAIL } from "../_content/site";
import styles from "./SiteHeader.module.css";

/* Дві мови шапки. Тексту тут рівно два слова й один шлях, тож словник
   тримається поруч, а не в загальному файлі контенту: у ньому лежить те,
   що читають, а це — підписи до самої шапки. */
const CHROME = {
  en: { cases: "Cases", cta: "Get in touch", home: "/#cases", homeLabel: "Home" },
  uk: { cases: "Кейси", cta: "Написати", home: "/uk#cases", homeLabel: "На головну" },
} as const;

type Props = {
  /** Ширина пігулки. Збігається з колонкою контенту тієї сторінки, на якій вона стоїть. */
  width?: string;
  cta?: string;
  /** Мова підписів шапки. Йде за мовою сторінки, під якою вона стоїть. */
  lang?: "en" | "uk";
};

/** Скільки треба проїхати вниз, щоб пігулка зафіксувалась у стиснутому стані. */
const SHRINK_AT = 120;

/* Прочитане рахується по самому тексту, а не по документу: сторінка не
   закінчується останнім абзацом — під ним стоять «Інші роботи», і смуга,
   зведена до висоти документа, доповзала б до кінця вже в рекомендаціях.
   Кінець дистанції позначає [data-reading-end]; якщо його немає — це низ
   самої <article>. */
function readingRange() {
  const article = document.querySelector("main article");
  if (!article) return null;
  const top = article.getBoundingClientRect().top + window.scrollY;
  const marker = article.querySelector("[data-reading-end]");
  const end = marker
    ? marker.getBoundingClientRect().top + window.scrollY
    : article.getBoundingClientRect().bottom + window.scrollY;
  /* Останній екран тексту вже видно цілком, коли скрол ще не дійшов до end,
     тож дистанція — це end мінус вікно, а не end. */
  return { top, distance: Math.max(1, end - window.innerHeight - top) };
}

/* Стан залежить від напрямку скролу, а не від позиції: вниз — стискається,
   вгору — розгортається одразу з будь-якого місця сторінки, не чекаючи,
   поки доскролиш до самого верху. Так поводяться нативні панелі браузера.

   Напрямок живе в замиканні, не в стейті: скрол стріляє по кілька разів на
   кадр, і кожен такий сигнал коштував би ререндера. Замість цього читання
   притиснуте до rAF, а результат лягає атрибутом на DOM — далі все домальовує
   CSS. */
function useShrinkOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastY = window.scrollY;
    let compact = false;
    let queued = false;
    let range = readingRange();

    const read = () => {
      queued = false;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (y <= 0) compact = false;
      else if (delta > 0 && y >= SHRINK_AT) compact = true;
      else if (delta < 0) compact = false;
      el.dataset.compact = String(compact);

      /* Та сама rAF-читка, що й для стиснення: скрол стріляє по кілька разів
         на кадр, і смузі теж вистачає одного значення на кадр. Результат іде
         кастомною властивістю — ререндера тут немає так само. */
      if (range) {
        const p = Math.min(1, Math.max(0, (y - range.top) / range.distance));
        el.style.setProperty("--sh-progress", String(p));
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(read);
    };

    /* Перше читання — на випадок, коли сторінка відкрилась із відновленою
       позицією скролу або з якорем. */
    read();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Дистанцію задають висоти, а вони змінюються: догружається шрифт, кадри
       займають свою висоту, вікно повертають боком. Перерахунок дешевий і
       живе на тому ж кадрі, що й читка. */
    const remeasure = () => {
      range = readingRange();
      read();
    };
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  return ref;
}

/** Шапка внутрішніх сторінок: марка веде на головну, кнопка — на пошту. */
export function SiteHeader({ width, cta, lang = "en" }: Props) {
  const ref = useShrinkOnScroll<HTMLDivElement>();
  const chrome = CHROME[lang];

  return (
    <div
      ref={ref}
      className={styles.header}
      data-compact="false"
      style={width ? ({ "--sh-width": width } as React.CSSProperties) : undefined}
    >
      {/* Скільки тексту позаду. Смуга дублює те, що вже несе смуга прокрутки,
          тож для допоміжних технологій її немає — це підказка для ока.
          Стоїть поза пігулкою: вона фіксована до кромки вікна, не до неї. */}
      <span className={styles.progress} aria-hidden="true" />
      <nav className={styles.inner} aria-label="Site">
        <Link href={lang === "uk" ? "/uk" : "/"} className={styles.brand} aria-label={chrome.homeLabel}>
          <Image src="/articles/logos/sihetii.svg" alt="sihetii.com" width={87} height={24} priority />
        </Link>
        <div className={styles.actions}>
          {/* Дорога назад до решти робіт. Раніше вона стояла в кінці статті;
              у шапці вона доступна з будь-якого місця сторінки. */}
          <Link href={chrome.home} className={styles.navLink}>
            <span className={styles.mark}>{chrome.cases}</span>
          </Link>
          <a href={`mailto:${EMAIL}`} className={styles.cta}>
            {cta ?? chrome.cta}
          </a>
        </div>
      </nav>
    </div>
  );
}
