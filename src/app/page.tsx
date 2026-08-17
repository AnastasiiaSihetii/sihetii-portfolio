export default function Home() {
  return (
    <div className="page">
      {/* ---------- Title page ---------- */}
      <section className="block block--candle">
        <div className="sticker sticker--hero">
          <strong>4</strong>
          дні від ідеї до релізу
        </div>
        <div className="block-inner">
          <p className="eyebrow">Portfolio</p>
          <h1 className="hero-title" style={{ fontSize: "clamp(2.8rem, 7vw, 5.2rem)", maxWidth: "10ch", marginBottom: "0.9rem" }}>
            Anastasiia Sihetii
          </h1>
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
          style={{ marginTop: "2.5rem", marginBottom: 0, opacity: 0.55 }}
        >
          ↓ Вихідні дані
        </p>
      </section>

      {/* ---------- Colophon: printed-imprint facts ---------- */}
      <section className="block block--ink">
        <div className="block-inner" style={{ maxWidth: "44rem" }}>
          <p className="eyebrow">Вихідні дані</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: "2rem" }}>
            Як зроблено це портфоліо
          </h2>
          <ul className="colophon-list">
            <li>
              <span className="colophon-key">Роль</span>
              <span className="colophon-val">Product Designer · Design Engineer</span>
            </li>
            <li>
              <span className="colophon-key">Інструменти</span>
              <span className="colophon-val">
                <div className="tag-row">
                  <span className="tag">Claude Code</span>
                  <span className="tag">Figma</span>
                  <span className="tag">Next.js</span>
                  <span className="tag">Impeccable</span>
                </div>
              </span>
            </li>
            <li>
              <span className="colophon-key">Контакти</span>
              <span className="colophon-val">
                <a href="mailto:sihetii.ai@gmail.com">sihetii.ai@gmail.com</a>
                {" · "}
                <a
                  href="https://github.com/AnastasiiaSihetii"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                {" · "}
                <a
                  href="https://www.linkedin.com/in/anastasiia-sihetii/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- Case study index ---------- */}
      <section className="block block--card">
        <div className="block-inner" style={{ maxWidth: "44rem" }}>
          <p className="eyebrow">Кейси · 01</p>
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginBottom: "1rem" }}>
            Сайт на мій день народження
          </h2>
          <p style={{ marginBottom: "1.6rem" }}>
            До свого дня народження я створила сайт для друзів із програмою
            святкування та wishlist-ом, де подарунки можна анонімно
            забронювати в один клік — від ідеї до релізу за 4 дні.
          </p>
          <div className="tag-row" style={{ marginBottom: "2rem" }}>
            <span className="tag">Next.js</span>
            <span className="tag">Supabase</span>
            <span className="tag">Claude Code</span>
            <span className="tag">Figma</span>
            <span className="tag">Vercel</span>
          </div>
          <a href="/case-studies/birthday-website.html" className="btn">
            Відкрити кейс →
          </a>
        </div>
      </section>

      <footer className="colophon">
        sihetii-portfolio · зроблено в Claude Code
      </footer>
    </div>
  );
}
