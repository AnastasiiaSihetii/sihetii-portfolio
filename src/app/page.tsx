import Image from "next/image";

export default function Home() {
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
          <p className="hero-cover-bio">
            Hi there 👋
            <br />
            <br />
            {"I'm a "}
            <strong>product designer</strong>
            {" moving into "}
            <strong>design engineering</strong>
            {
              ". That shift comes from 5+ years designing product interfaces across agency, startup, and enterprise environments—most recently at OneReach.ai, where I designed a UI builder and an agent/skills-based task platform for enterprise users."
            }
            <br />
            <br />
            {"I've since advised another product team on AI-integrated design workflows and write about AI in design for DOU."}
          </p>
          <div className="hero-cta-group">
            {/* TODO: swap href for the Google Drive CV link once it's ready */}
            <a href="#" className="btn btn--cta btn--cta-sm">
              Download CV
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
      <section className="block block--card">
        <div className="block-inner" style={{ maxWidth: "44rem" }}>
          <p className="eyebrow">Кейс</p>
          <h2 className="sec-title">Сайт на мій день народження</h2>
          <p style={{ marginBottom: "1.6rem" }}>
            До свого дня народження я створила сайт для друзів із програмою
            святкування та wishlist-ом, де подарунки можна анонімно
            забронювати в один клік.
          </p>
          <div className="tag-row" style={{ marginBottom: "1.8rem" }}>
            <span className="tag">Next.js</span>
            <span className="tag">Supabase</span>
            <span className="tag">Claude Code</span>
            <span className="tag">Figma</span>
            <span className="tag">Vercel</span>
          </div>
          <div className="meta-row" style={{ marginBottom: "2rem" }}>
            <div className="meta-item">
              <span className="meta-k">Роль</span>
              Product Designer · Design Engineer
            </div>
            <div className="meta-item">
              <span className="meta-k">Строк</span>
              4 дні від ідеї до релізу
            </div>
          </div>
          <a href="/case-studies/birthday-website.html" className="btn">
            Відкрити кейс →
          </a>
        </div>
      </section>

      {/* ---------- Public: talks + articles (Figma: Portfolio 2026, node 98:90) ---------- */}
      <section className="public-section">
        <div className="public-group">
          <h2 className="section-heading">Public</h2>
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
                  AI tools in UX/UI daily design process: practical cases
                </a>
                <p className="item-subtitle">
                  Speaker at UX/UI Design Meetup by IT Cluster Transcarpathia
                </p>
              </div>
              <div className="public-item-meta">
                <span>[Offline]</span>
                <span>[Feb 2026]</span>
              </div>
            </div>
          </div>
        </div>

        <div className="articles-group">
          <h2 className="section-heading section-heading--sm">Articles</h2>

          <div className="article-row">
            <div className="article-thumb-group">
              <Image
                src="/article-image.png"
                alt=""
                width={179}
                height={122}
                className="article-thumb"
              />
              <div className="article-meta">
                <span>[High Bar Journal]</span>
                <span>[Травень 2026]</span>
              </div>
            </div>
            <div className="article-body">
              <a
                href="https://journal.gen.tech/post/claude-design-figma-make-canva-magic"
                target="_blank"
                rel="noopener noreferrer"
                className="item-title"
              >
                Claude Design, Figma Make та Canva Magic: великий тест-драйв ШІ-інструментів
              </a>
              <p className="article-desc">
                Поділилася своїм досвідом використання Claude Design, Figma Make та Canva Magic
                Design для нового матеріалу в High Bar Journal від{" "}
                <a
                  href="https://www.linkedin.com/company/genesis-technology-partners/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Genesis Tech
                </a>
                .
              </p>
            </div>
          </div>

          <div className="article-row">
            <div className="article-thumb-group">
              <Image
                src="/article-image.png"
                alt=""
                width={179}
                height={122}
                className="article-thumb"
              />
              <div className="article-meta">
                <span>[DOU]</span>
                <span>[Квітень 2026]</span>
              </div>
            </div>
            <div className="article-body">
              <a
                href="https://dou.ua/forums/topic/58173/"
                target="_blank"
                rel="noopener noreferrer"
                className="item-title"
              >
                Design system with Figma MCP and Claude Code: how to reduce manual work
              </a>
              <p className="article-desc">
                Дизайнерка Анастасія у своєму блозі розповідає про інтеграцію Claude Code та
                Figma MCP у щоденну роботу. Вона на практиці показує як будувати
                дизайн-системи через термінал і перетворювати дні рутини на години творчості.
              </p>
            </div>
          </div>

          <div className="article-row">
            <div className="article-thumb-group">
              <Image
                src="/article-image.png"
                alt=""
                width={179}
                height={122}
                className="article-thumb"
              />
              <div className="article-meta">
                <span>[DOU]</span>
                <span>[Березень 2026]</span>
              </div>
            </div>
            <div className="article-body">
              <a
                href="https://dou.ua/forums/topic/58654/"
                target="_blank"
                rel="noopener noreferrer"
                className="item-title"
              >
                AI in everyday design tasks: from brief to prototype in hours
              </a>
              <p className="article-desc">
                Що відбувається з роботою дизайнера, коли AI стає частиною щоденної рутини? У
                своєму блозі дизайнерка Анастасія показує на практиці, як використовує ШІ для
                ресерчу, UX-копі, візуалів і прототипів і як це скорочує робочий цикл із днів до
                годин. А ще розповідає, які навички для дизайнерів тепер маст-хев.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Footer: CTAs, grouped links, badge ---------- */}
      <footer className="site-footer">
        {/* TODO: swap href for the Google Drive CV link once it's ready */}
        <a href="#" className="btn btn--cta">
          Download CV
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
          <Image
            src="/badges/stand-with-ukraine.svg"
            alt="Stand with Ukraine"
            width={205}
            height={85}
            className="footer-badge"
          />
        </div>
      </footer>
      </div>
    </>
  );
}
