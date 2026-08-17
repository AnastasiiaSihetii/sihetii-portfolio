import Image from "next/image";

export default function Home() {
  return (
    <div className="page">
      {/* ---------- Title page ---------- */}
      <section className="block block--candle hero">
        <div className="sticker sticker--hero">
          <strong>4</strong>
          дні від ідеї до релізу
        </div>
        <div className="block-inner">
          <p className="eyebrow">Portfolio</p>
          <h1 className="hero-title">Anastasiia Sihetii</h1>
          <p className="lead" style={{ fontWeight: 600, marginBottom: "1.4rem" }}>
            Product Designer · Design Engineer
          </p>
          <p className="hero-context" style={{ fontSize: "1.02rem", maxWidth: "48ch", opacity: 0.92 }}>
            Проєктую і збираю продукти сама — від ідеї до продакшену, без передачі
            розробнику. Працюю на швидкості AI-інструментів: рішення, які раніше
            займали тижні, тепер займають дні.
          </p>
          <div className="meta-row" style={{ marginTop: "1.8rem", paddingTop: "1.5rem", borderTop: "1px solid var(--line-on-light)" }}>
            <div className="meta-item">
              <span className="meta-k">Фокус</span>
              Product Design · Design Engineering
            </div>
            <div className="meta-item">
              <span className="meta-k">Доступна для</span>
              Full-time ролі · Проєкти
            </div>
          </div>
        </div>
        <p
          className="eyebrow"
          style={{ marginTop: "2.5rem", marginBottom: 0, opacity: 0.55, background: "none", padding: 0 }}
        >
          ↓ Кейс
        </p>
      </section>

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
  );
}
