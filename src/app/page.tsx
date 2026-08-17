"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { articles, content, type Lang } from "./lang-content";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = content[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
      {/* ---------- Case study ---------- */}
      <section className="block block--card block-wide">
        <div className="block-inner">
          {/* TODO: swap for the real case-study cover photo */}
          <div className="case-study-photo" aria-hidden="true" />
          <p className="eyebrow">{t.caseStudy.eyebrow}</p>
          <h2 className="sec-title">{t.caseStudy.title}</h2>
          <p style={{ marginBottom: "1.6rem" }}>{t.caseStudy.desc}</p>
          <div className="tag-row" style={{ marginBottom: "2rem" }}>
            <span className="tag">Next.js</span>
            <span className="tag">Supabase</span>
            <span className="tag">Claude Code</span>
            <span className="tag">Figma</span>
            <span className="tag">Vercel</span>
          </div>
          <a href="/case-studies/birthday-website.html" className="btn">
            {t.caseStudy.linkLabel} <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>

      {/* ---------- Public: talks (Figma: Portfolio 2026, node 98:90) ---------- */}
      <section className="public-section">
        <div className="public-group">
          <h2 className="section-heading">{t.public.heading}</h2>
          <div className="public-item">
            <div className="public-item-media">
              <Image
                src="/public-item-image.png"
                alt="Виступ на UX/UI Design Meetup"
                fill
                sizes="(max-width: 900px) 100vw, 1120px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="public-item-row">
              <div className="public-item-text">
                <a
                  href="https://itct.com.ua/news/ux-ui-design-meetup-rinok-dizainu-2026-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="item-title"
                >
                  {t.public.itemTitle}
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
      </section>

      {/* ---------- Articles ---------- */}
      <section className="articles-section">
        <div className="articles-group">
          <h2 className="section-heading">{t.articlesHeading}</h2>

          <div className="article-list">
            {articles.map((article) => (
              <div className="article-row" key={article.href}>
                <div className="article-thumb-group">
                  <Image
                    src="/article-image.png"
                    alt=""
                    width={179}
                    height={122}
                    className="article-thumb"
                  />
                  <div className="article-meta">
                    <span>[{article.source}]</span>
                    <span>[{article.date[lang]}]</span>
                  </div>
                </div>
                <div className="article-body">
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="item-title"
                  >
                    {article.title[lang]}
                  </a>
                  <p className="article-desc">{article.desc[lang]}</p>
                </div>
              </div>
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
