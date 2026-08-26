"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { EMAIL } from "../_content/site";
import styles from "./SiteHeader.module.css";

type Props = {
  /** Ширина пігулки. Збігається з колонкою контенту тієї сторінки, на якій вона стоїть. */
  width?: string;
  cta?: string;
};

/** Скільки треба проїхати вниз, щоб пігулка зафіксувалась у стиснутому стані. */
const SHRINK_AT = 120;

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

    const read = () => {
      queued = false;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (y <= 0) compact = false;
      else if (delta > 0 && y >= SHRINK_AT) compact = true;
      else if (delta < 0) compact = false;
      el.dataset.compact = String(compact);
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return ref;
}

/** Шапка внутрішніх сторінок: марка веде на головну, кнопка — на пошту. */
export function SiteHeader({ width, cta = "Get in touch" }: Props) {
  const ref = useShrinkOnScroll<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={styles.header}
      data-compact="false"
      style={width ? ({ "--sh-width": width } as React.CSSProperties) : undefined}
    >
      <nav className={styles.inner} aria-label="Site">
        <Link href="/" className={styles.brand} aria-label="Home">
          <Image src="/articles/logos/sihetii.svg" alt="sihetii.com" width={87} height={24} priority />
        </Link>
        <div className={styles.actions}>
          {/* Дорога назад до решти робіт. Раніше вона стояла в кінці статті;
              у шапці вона доступна з будь-якого місця сторінки. */}
          <Link href="/#cases" className={styles.navLink}>
            <span className={styles.mark}>Cases</span>
          </Link>
          <a href={`mailto:${EMAIL}`} className={styles.cta}>
            {cta}
          </a>
        </div>
      </nav>
    </div>
  );
}
