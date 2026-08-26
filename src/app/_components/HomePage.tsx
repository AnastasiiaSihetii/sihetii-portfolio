"use client";

import { useEffect } from "react";
import Image from "next/image";
import { articles, content, type Lang } from "../lang-content";
import { EMAIL } from "../_content/site";
import { birthday } from "../_content/birthday";
import { birthdayUk } from "../_content/birthday.uk";
import { careerPlatform } from "../_content/career-platform";
import { careerPlatformUk } from "../_content/career-platform.uk";
import { napa } from "../_content/napa";
import { napaUk } from "../_content/napa.uk";
import { ArticleCard } from "../article-card";
import { typo } from "./typo";
import { setCreativeCursor, useCreativeCursor, useCursorSupported } from "../cursor-pref";
import { ArrowGlyph, InstrumentSwitch, TrailGlyph } from "./InstrumentSwitch";

/** Адреса кожної мовної версії головної. Мова живе тут, а не в стейті. */
export const HOME_PATH: Record<Lang, string> = { en: "/", uk: "/uk" };

export function HomePage({ lang }: { lang: Lang }) {
  const t = content[lang];
  const creativeCursor = useCreativeCursor();
  const cursorSupported = useCursorSupported();

  /* Кореневий layout віддає <html lang="en"> на обидві адреси: щоб зробити
     його різним на рівні сервера, довелося б перенести всі роути під
     app/[lang]/ і тим зламати наявні адреси кейсів. Тому мову документа
     виставляє клієнт — від неї залежать переноси й голос скрінрідера.
     Пошук мову бере з видимого тексту й hreflang, а не з цього атрибута. */
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  /* Адреса й кадр беруться з файлів контенту самих кейсів: онови картку там —
     і головна оновиться сама. Кадр картки окремий від героя сторінки, бо
     плитка тут 2:1, а на сторінці кадр вищий.

     Кейс існує двома мовами, тож картка веде на версію тією мовою, якою
     людина зараз читає головну: інакше вона обіцяє одну мову й відкриває
     іншу. Кадр у обох версій той самий. */
  const cases = lang === "uk"
    ? { career: careerPlatformUk, birthday: birthdayUk, napa: napaUk }
    : { career: careerPlatform, birthday, napa };

  const caseCards = [
    /* Найновіша робота йде першою. Кейс під NDA: кадру немає, тому замість
       плитки зображення — той самий слот із поясненням, чому він порожній. */
    {
      ...t.cases.career,
      href: cases.career.href,
      accent: "case-card--gray",
      image: null,
      /* Стрілка в ассеті залита білим — на світлій картці потрібна темна копія */
      arrow: "/case-arrow-ink.svg",
    },
    {
      ...t.cases.birthday,
      href: cases.birthday.href,
      accent: "case-card--ink",
      image: cases.birthday.card.src,
    },
    {
      ...t.cases.loops,
      href: cases.napa.href,
      accent: "case-card--blue",
      image: cases.napa.card.src,
    },
  ];

  return (
    <>
      {/* Перше, на що потрапляє Tab: обкладинка йде на весь перший екран, і без
          цього посилання дорога до вмісту лежить крізь неї. Видиме тільки у
          фокусі — див. .skip-link. */}
      <a className="skip-link" href="#main">
        {t.skipToContent}
      </a>
      <main id="main" lang={lang}>
        {/* ---------- Cover hero (Figma: Portfolio 2026, node 99:628) ---------- */}
        <section className="hero-cover">
          {/* Марка — це і є заголовок сторінки: імені більше ніде в тексті
              немає, тож саме вона має бути h1, а не просто картинкою. Alt несе
              ім'я з роллю повністю — на обкладинці літери йдуть під зріз, і
              прочитати їх очима можна не завжди. */}
          <h1 className="hero-cover-title">
            <Image
              src="/sihetii-wordmark.svg"
              alt="Anastasiia Sihetii — Product Designer · Design Engineer"
              width={1440}
              height={356}
              priority
              className="hero-cover-img"
            />
          </h1>
          <div className="hero-cover-header">
            <p className="hero-cover-bio">{typo(t.bio)}</p>
            <div className="hero-cta-group">
              {/* TODO: swap href for the Google Drive CV link once it's ready */}
              <a href="#" className="btn btn--cta btn--cta-sm">
                {t.downloadCv}
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="btn btn--cta btn--cta-light btn--cta-sm"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </section>

        <div className="page">
          {/* ---------- Cases (Figma: Portfolio 2026, node 98:102) ---------- */}
          <section id="cases" className="cases-section" aria-labelledby="cases-h">
            <div className="cases-group">
              <h2 className="section-heading" id="cases-h">
                {t.cases.heading}
              </h2>
              <div className="cases-grid">
                {caseCards.map((card) => (
                  <article className={`case-card ${card.accent}`} key={card.href}>
                    <div className="case-card-head">
                      <div className="case-card-text">
                        {/* Заголовок картки — справжній h3: у списку заголовків
                            скрінрідера роботи мають стояти під своєю секцією, а
                            не бути невидимими для нього посиланнями. */}
                        <h3 className="case-card-title">
                          <a href={card.href} className="case-card-link">
                            <span className="link-mark">{typo(card.title)}</span>
                          </a>
                        </h3>
                        <p className="case-card-desc">{typo(card.desc)}</p>
                        {/* Дужки — те саме позначення мети, що вже стоїть у Public
                            і в датах «Інших робіт». Тут воно каже, що робота триває. */}
                        {"status" in card && (
                          <p className="case-card-meta">{typo(card.status)}</p>
                        )}
                      </div>
                      <Image
                        src={"arrow" in card ? card.arrow : "/case-arrow.svg"}
                        alt=""
                        width={32}
                        height={32}
                        className="case-card-arrow"
                      />
                    </div>
                    <div
                      className={`case-card-media${card.image ? "" : " case-card-media--empty"}`}
                    >
                      {card.image ? (
                        <Image
                          src={card.image}
                          alt=""
                          fill
                          /* One card per row now, so the shot is served at the column
                             width rather than at half of it. */
                          sizes="(max-width: 1200px) 100vw, 1120px"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <p>{"noVisuals" in card ? card.noVisuals : null}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- Public: talks (Figma: Portfolio 2026, node 99:625) ---------- */}
          <section className="public-section" aria-labelledby="public-h">
            <div className="public-group">
              <h2 className="section-heading" id="public-h">
                {t.public.heading}
              </h2>
              <div className="public-grid">
                <div className="public-item">
                  <div className="public-item-media public-item-media--dark">
                    <Image
                      src="/projector-logo-white.svg"
                      alt=""
                      width={246}
                      height={30}
                      className="public-item-logo"
                    />
                  </div>
                  <div className="public-item-body">
                    <div className="public-item-text">
                      <h3 className="item-title">{typo(t.public.projectorTitle)}</h3>
                      <p className="item-subtitle">{typo(t.public.projectorMeta)}</p>
                    </div>
                  </div>
                </div>

                <div className="public-item">
                  <div className="public-item-media">
                    <Image
                      src="/public-item-image.png"
                      alt={t.public.itemPhotoAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 548px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="public-item-body">
                    <div className="public-item-text">
                      <h3 className="item-title">
                        <a
                          href="https://itct.com.ua/news/ux-ui-design-meetup-rinok-dizainu-2026-ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="item-link item-link--external"
                        >
                          <span className="link-mark">{typo(t.public.itemTitle)}</span>
                        </a>
                      </h3>
                      <p className="item-subtitle">{typo(t.public.itemSubtitle)}</p>
                    </div>
                    <div className="public-item-meta">
                      <span>{t.public.itemMeta[0]}</span>
                      <span>{t.public.itemMeta[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- Articles ---------- */}
          <section className="articles-section" aria-labelledby="articles-h">
            <div className="articles-group">
              <h2 className="section-heading" id="articles-h">
                {t.articlesHeading}
              </h2>

              <div className="article-list">
                {articles.map((article) => (
                  <ArticleCard key={article.href[lang]} article={article} lang={lang} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ---------- Footer: CTAs, grouped links, badge ---------- */}
      <footer className="site-footer">
        {/* TODO: swap href for the Google Drive CV link once it's ready */}
        <a href="#" className="btn btn--cta">
          {t.downloadCv}
        </a>
        <a href={`mailto:${EMAIL}`} className="btn btn--cta btn--cta-light">
          {EMAIL}
        </a>

        {/* Two columns below the CTAs: the mark and its notice sign off on the
            left, everything you can act on stacks on the right. The side column
            comes first in the DOM because links outrank a sign-off for anyone
            reading in order; row-reverse is what puts it on the right. */}
        <div className="footer-body">
          <div className="footer-side">
            {/* One list, one column, hard left: six destinations read faster stacked
                than split across two columns that invited a wrong reading order. */}
            <nav className="footer-link-group" aria-label={t.footer.profilesLabel}>
              <a href="https://www.linkedin.com/in/anastasiia-sihetii/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://github.com/AnastasiiaSihetii" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://dou.ua/users/anastasiya-sigetij/" target="_blank" rel="noopener noreferrer">
                Dou
              </a>
              <a href="https://www.behance.net/anastasiiasihetii" target="_blank" rel="noopener noreferrer">
                Behance
              </a>
              <a href="https://dribbble.com/anastasiia_sihetii" target="_blank" rel="noopener noreferrer">
                Dribbble
              </a>
              <a href="https://wa.me/380683540164" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </nav>
            <div className="footer-prefs">
              {/* Touch screens have no pointer to redraw, so there is nothing to
                  offer there and the control stays out of the way entirely. */}
              {cursorSupported && (
                <InstrumentSwitch
                  label={t.footer.cursorLabel}
                  value={creativeCursor ? "on" : "off"}
                  onChange={(next) => setCreativeCursor(next === "on")}
                  accent={creativeCursor ? "blue" : "ink"}
                  options={[
                    { value: "on", label: t.footer.cursorCreative, glyph: TrailGlyph },
                    { value: "off", label: t.footer.cursorPlain, glyph: ArrowGlyph },
                  ]}
                />
              )}
              {/* Мова — це адреса, тож комірки ведуть на неї, а не міняють
                  стейт: перехід лишається в історії, ділиться посиланням і
                  його бачить пошук. */}
              <InstrumentSwitch
                label={t.footer.langLabel}
                value={lang}
                options={[
                  { value: "en", label: "EN", href: HOME_PATH.en },
                  { value: "uk", label: "UA", href: HOME_PATH.uk },
                ]}
              />
            </div>
            <Image
              src="/badges/stand-with-ukraine.svg"
              alt="Stand with Ukraine"
              width={205}
              height={85}
              className="footer-badge"
            />
          </div>

          {/* Left column: the mark alone. */}
          <div className="footer-signoff">
            <Image
              src="/articles/logos/sihetii.svg"
              alt={t.footer.logoAlt}
              /* The mark's own proportions, so the reserved box matches the drawn
                 width at every column size and nothing shifts on load. */
              width={1734}
              height={479}
              className="footer-logo"
            />
          </div>

          {/* Копірайт лежить у сітці окремою областю, а не всередині колонки:
              на широкому екрані він закриває праву колонку під бейджем, на
              вузькому стає найостаннішим рядком підвалу, вже під маркою. */}
          <p className="footer-copyright">{t.footer.copyright}</p>
        </div>
      </footer>
    </>
  );
}
