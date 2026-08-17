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
