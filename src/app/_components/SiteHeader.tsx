"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CV_PATH, EMAIL, PROFILES } from "../_content/site";
import styles from "./SiteHeader.module.css";

/* Дві мови шапки. Тексту тут рівно два слова й один шлях, тож словник
   тримається поруч, а не в загальному файлі контенту: у ньому лежить те,
   що читають, а це — підписи до самої шапки. */
const CHROME = {
  en: {
    cases: "Cases",
    cta: "Get in touch",
    home: "/#cases",
    homeLabel: "Home",
    menu: "Menu",
    closeMenu: "Close menu",
    sectionsLabel: "Sections",
    articles: "Articles",
    articlesHref: "/#articles",
    public: "Public",
    publicHref: "/#public",
    cv: "Download CV",
    profilesLabel: "Profiles",
  },
  uk: {
    cases: "Кейси",
    cta: "Написати",
    home: "/uk#cases",
    homeLabel: "На головну",
    menu: "Меню",
    closeMenu: "Закрити меню",
    sectionsLabel: "Розділи",
    articles: "Статті",
    articlesHref: "/uk#articles",
    public: "Публічна активність",
    publicHref: "/uk#public",
    cv: "Завантажити CV",
    profilesLabel: "Профілі",
  },
} as const;

/** Скільки треба проїхати вниз, щоб пігулка зафіксувалась у стиснутому стані. */
const SHRINK_AT = 120;

/* Ширина, вище якої меню не існує: там у пігулці стоїть той самий набір, що
   й завжди, — марка, «Кейси» і кнопка. Те саме число живе брейкпоінтом у
   SiteHeader.module.css; тут воно потрібне, щоб закрити відкрите меню, коли
   телефон повертають боком і сторінка переходить у широкий стан. */
const MENU_UNTIL = 640;

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

/* Дві риски, що складаються в хрест. Малюємо їх, а не беремо гліф зі шрифту:
   у системі немає жодної іконки, взятої з тексту, і ця не стане першою.
   Порядок трансформів має значення — спершу риска їде на центр (12), і вже
   там повертається; зворотний порядок обертав би її навколо чужої точки. */
function MenuGlyph() {
  return (
    <svg
      className={styles.glyph}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <line className={styles.barTop} x1="4" y1="9" x2="20" y2="9" />
      <line className={styles.barBottom} x1="4" y1="15" x2="20" y2="15" />
    </svg>
  );
}

type Props = {
  /** Ширина пігулки. Збігається з колонкою контенту тієї сторінки, на якій вона стоїть. */
  width?: string;
  cta?: string;
  /** Мова підписів шапки. Йде за мовою сторінки, під якою вона стоїть. */
  lang?: "en" | "uk";
};

/** Шапка внутрішніх сторінок: марка веде на головну, кнопка — на пошту.
 *  На телефоні до неї додається меню: та сама пігулка розгортається в аркуш
 *  і несе те, що на головній лежить у підвалі. */
export function SiteHeader({ width, cta, lang = "en" }: Props) {
  const ref = useShrinkOnScroll<HTMLDivElement>();
  const chrome = CHROME[lang];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const sheetId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  /* Перехід усередині сайту не перезавантажує сторінку, тож аркуш сам собою не
     зникає — його закриває зміна адреси. Правка йде під час рендера, а не
     ефектом: ефект коштував би зайвого проходу й одного кадру, у якому меню
     вже на новій сторінці, але ще відкрите. */
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    if (open) setOpen(false);
  }

  /* Escape закриває, і фокус повертається на кнопку, з якої меню відкрили —
     інакше він лишився б у щойно згорнутому аркуші. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* Поки аркуш відкритий, сторінка під ним не їздить: він займає майже весь
     екран телефона, і скрол за ним читався б як зламаний. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  /* Меню живе тільки на вузькому екрані. Телефон, повернутий боком, переносить
     сторінку в широкий стан, де кнопки вже немає, — відкритий аркуш там завис
     би без жодного способу його закрити. */
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia(`(min-width: ${MENU_UNTIL + 1}px)`);
    const sync = () => mq.matches && setOpen(false);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [open]);

  /* Відкрите меню віддає фокус собі: наступний Tab іде по його ж посиланнях,
     а не по тексту, схованому за ним. */
  useEffect(() => {
    if (open) sheetRef.current?.focus();
  }, [open]);

  return (
    <div
      ref={ref}
      className={styles.header}
      data-compact="false"
      data-open={open}
      style={
        width ? ({ "--sh-width": width } as React.CSSProperties) : undefined
      }
    >
      {/* Скільки тексту позаду. Смуга дублює те, що вже несе смуга прокрутки,
          тож для допоміжних технологій її немає — це підказка для ока.
          Стоїть поза пігулкою: вона фіксована до кромки вікна, не до неї. */}
      <span className={styles.progress} aria-hidden="true" />

      {/* Перехоплювач кліку повз аркуш. Прозорий і без затемнення: аркуш — це
          розгорнута пігулка, а не вікно поверх сторінки, і плівка зробила б із
          нього друге. Потрібен, щоб тап по тексту закривав меню, а не вів
          кудись посиланням під пальцем. */}
      {open && (
        <span
          className={styles.catcher}
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Оболонка тримає в потоці рівно висоту смуги. Сама пігулка лежить у ній
          абсолютно, тож коли аркуш розкривається, він накриває текст, а не
          відсуває його вниз. */}
      <div className={styles.shell}>
        <nav className={styles.inner} aria-label="Site">
          <div className={styles.bar}>
            <Link
              href={lang === "uk" ? "/uk" : "/"}
              className={styles.brand}
              aria-label={chrome.homeLabel}
            >
              <Image
                src="/articles/logos/sihetii.svg"
                alt="sihetii.com"
                width={87}
                height={24}
                priority
              />
            </Link>
            <div className={styles.actions}>
              {/* Дорога назад до решти робіт. Раніше вона стояла в кінці статті;
                у шапці вона доступна з будь-якого місця сторінки. На телефоні
                її місце займає меню, де ті самі роботи названі поіменно. */}
              <Link href={chrome.home} className={styles.navLink}>
                <span className={styles.mark}>{chrome.cases}</span>
              </Link>
              <a href={`mailto:${EMAIL}`} className={styles.cta}>
                {cta ?? chrome.cta}
              </a>
              <button
                ref={buttonRef}
                type="button"
                className={styles.menuBtn}
                aria-expanded={open}
                aria-controls={sheetId}
                aria-label={open ? chrome.closeMenu : chrome.menu}
                onClick={() => setOpen((v) => !v)}
              >
                <MenuGlyph />
              </button>
            </div>
          </div>

          {/* Аркуш. Висоту веде grid-template-rows від 0fr до 1fr — єдиний спосіб
            анімувати «до власної висоти», не знаючи її наперед. Закритий аркуш
            inert: він лишається в розмітці, але не ловить Tab і не читається
            вголос. */}
          <div className={styles.sheet} id={sheetId} inert={!open}>
            <div className={styles.sheetInner} ref={sheetRef} tabIndex={-1}>
              <div className={styles.sheetBody}>
                <section
                  className={styles.group}
                  style={{ "--i": 0 } as React.CSSProperties}
                >
                  <h2 className="sr-only">{chrome.sectionsLabel}</h2>
                  {/* Три розділи головної, а не кожна робота поіменно: меню веде
                    до списку, далі людина вибирає сама. */}
                  <ul className={styles.list}>
                    <li>
                      <Link href={chrome.home} className={styles.section}>
                        <span className={styles.mark}>{chrome.cases}</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={chrome.articlesHref}
                        className={styles.section}
                      >
                        <span className={styles.mark}>{chrome.articles}</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={chrome.publicHref} className={styles.section}>
                        <span className={styles.mark}>{chrome.public}</span>
                      </Link>
                    </li>
                  </ul>
                </section>

                <div
                  className={styles.group}
                  style={{ "--i": 1 } as React.CSSProperties}
                >
                  <div className={styles.sheetActions}>
                    <a
                      href={CV_PATH}
                      target="_blank"
                      rel="noopener"
                      className={`${styles.sheetCta} ${styles.sheetCtaBlue}`}
                    >
                      {chrome.cv}
                    </a>
                    <a
                      href={`mailto:${EMAIL}`}
                      className={`${styles.sheetCta} ${styles.sheetCtaGray}`}
                    >
                      {cta ?? chrome.cta}
                    </a>
                  </div>
                </div>

                <section
                  className={styles.group}
                  style={{ "--i": 2 } as React.CSSProperties}
                >
                  <h2 className="sr-only">{chrome.profilesLabel}</h2>
                  <ul className={styles.list}>
                    {PROFILES.map((p) => (
                      <li key={p.href}>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.profile}
                        >
                          <span className={styles.mark}>{p.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
