"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { articles, content, type Lang } from "./lang-content";
import { ArticleCard } from "./article-card";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = content[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const caseCards = [
    {
      ...t.cases.birthday,
      href: "/case-studies/birthday-website.html",
      accent: "case-card--ink",
      image: "/case-birthday.png",
    },
    {
      ...t.cases.loops,
      // TODO: swap href for the Loops case-study page once it exists
      href: "#",
      accent: "case-card--blue",
      image: "/case-loops.png",
    },
  ];

  return (
    <>
      {/* ---------- Cover hero (Figma: Portfolio 2026, node 99:628) ---------- */}
      <section className="hero-cover">
        <div className="hero-cover-image">
          <Image
            src="/sihetii-wordmark.svg"
            alt="Sihetii"
            width={1440}
            height={356}
            priority
            className="hero-cover-img"
          />
        </div>
        <div className="hero-cover-header">
          <p className="hero-cover-bio">{t.bio}</p>
          <div className="hero-cta-group">
            {/* TODO: swap href for the Google Drive CV link once it's ready */}
            <a href="#" className="btn btn--cta btn--cta-sm">
              {t.downloadCv}
            </a>
            <a
              href="mailto:anastasiia.sihetii@gmail.com"
              className="btn btn--cta btn--cta-light btn--cta-sm"
            >
              anastasiia.sihetii@gmail.com
            </a>
          </div>
        </div>
      </section>

      <div className="page">
      {/* ---------- Cases (Figma: Portfolio 2026, node 98:102) ---------- */}
      <section className="cases-section">
        <div className="cases-group">
          <h2 className="section-heading">{t.cases.heading}</h2>
          <div className="cases-grid">
            {caseCards.map((card) => (
              <article className={`case-card ${card.accent}`} key={card.image}>
                <div className="case-card-head">
                  <div className="case-card-text">
                    <a href={card.href} className="case-card-title">
                      <span className="link-mark">{card.title}</span>
                    </a>
                    <p className="case-card-desc">{card.desc}</p>
                  </div>
                  <Image
                    src="/case-arrow.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="case-card-arrow"
                  />
                </div>
                <div className="case-card-media">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    /* One card per row now, so the shot is served at the column
                       width rather than at half of it. */
                    sizes="(max-width: 1200px) 100vw, 1120px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Public: talks (Figma: Portfolio 2026, node 99:625) ---------- */}
      <section className="public-section">
        <div className="public-group">
          <h2 className="section-heading">{t.public.heading}</h2>
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
                  <h3 className="item-title">{t.public.projectorTitle}</h3>
                  <p className="item-subtitle">{t.public.projectorMeta}</p>
                </div>
              </div>
            </div>

            <div className="public-item">
              <div className="public-item-media">
                <Image
                  src="/public-item-image.png"
                  alt="Виступ на UX/UI Design Meetup"
                  fill
                  sizes="(max-width: 900px) 100vw, 548px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="public-item-body">
                <div className="public-item-text">
                  <a
                    href="https://itct.com.ua/news/ux-ui-design-meetup-rinok-dizainu-2026-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="item-title item-title--external"
                  >
                    <span className="link-mark">{t.public.itemTitle}</span>
                  </a>
                  <p className="item-subtitle">{t.public.itemSubtitle}</p>
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
      <section className="articles-section">
        <div className="articles-group">
          <h2 className="section-heading">{t.articlesHeading}</h2>

          <div className="article-list">
            {articles.map((article) => (
              <ArticleCard key={article.href} article={article} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Footer: CTAs, grouped links, badge ---------- */}
      <footer className="site-footer">
        {/* TODO: swap href for the Google Drive CV link once it's ready */}
        <a href="#" className="btn btn--cta">
          {t.downloadCv}
        </a>
        <a href="mailto:anastasiia.sihetii@gmail.com" className="btn btn--cta btn--cta-light">
          anastasiia.sihetii@gmail.com
        </a>

        <div className="footer-links">
          <div className="footer-link-group">
            <a href="https://www.linkedin.com/in/anastasiia-sihetii/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/AnastasiiaSihetii" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://dou.ua/users/anastasiya-sigetij/" target="_blank" rel="noopener noreferrer">
              Dou
            </a>
          </div>
          <div className="footer-link-group">
            <a href="https://www.behance.net/anastasiiasihetii" target="_blank" rel="noopener noreferrer">
              Behance
            </a>
            <a href="https://dribbble.com/anastasiia_sihetii" target="_blank" rel="noopener noreferrer">
              Dribbble
            </a>
            <a href="https://wa.me/380683540164" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
          <div className="footer-badge-group">
            <Image
              src="/badges/stand-with-ukraine.svg"
              alt="Stand with Ukraine"
              width={205}
              height={85}
              className="footer-badge"
            />
            <div className="lang-toggle" role="group" aria-label="Language">
              <button
                type="button"
                className={lang === "en" ? "active" : undefined}
                aria-pressed={lang === "en"}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={lang === "uk" ? "active" : undefined}
                aria-pressed={lang === "uk"}
                onClick={() => setLang("uk")}
              >
                UA
              </button>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
