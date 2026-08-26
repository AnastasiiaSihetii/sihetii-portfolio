import Image from "next/image";
import type { CSSProperties } from "react";

import type { Article, Lang } from "./lang-content";
import { typo } from "./_components/typo";

/* Anything off sihetii.com is flagged so its title can show the leaves-the-site arrow. */
const isExternal = (href: string) => /^https?:\/\//.test(href);

/* One row of the Articles list: a photographed newsprint sheet with the platform's
   masthead printed on it, then the title, blurb and date. Kept in its own file so the
   article pages can render the same card instead of restating its markup. */
export function ArticleCard({ article, lang }: { article: Article; lang: Lang }) {
  const href = article.href[lang];
  const external = isExternal(href);

  return (
    <div className="article-row">
      <div className="article-thumb-group">
        <Image
          src="/article-image.png"
          alt=""
          width={179}
          height={122}
          className="article-thumb"
        />
        {/* Марка видавця намальована на всю ширину свого файлу (до 1734px), а
            стоїть у слоті 179px, з якого займає 88.8%. Без sizes next/image
            бере ці намальовані розміри за справжні й віддає кандидата на 2048px
            на слот у 159px. Тут стоїть реальна ширина слота. */}
        <Image
          src={article.logo.src}
          alt={article.source}
          width={article.logo.width}
          height={article.logo.height}
          sizes="160px"
          className="article-logo"
          style={{ "--logo-scale": article.logo.scale } as CSSProperties}
        />
      </div>
      <div className="article-body">
        {/* Заголовок рядка — h3, як і в кейсах: перелік статей має стояти в
            структурі сторінки, а не лежати набором посилань поза нею. */}
        <h3 className="item-title">
          <a
            href={href}
            /* Нова вкладка — тільки тому, що лишаєш сайт. Власна стаття
               відкривається в цій самій, як і будь-який внутрішній перехід. */
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={external ? "item-link item-link--external" : "item-link"}
          >
            <span className="link-mark">{typo(article.title[lang])}</span>
          </a>
        </h3>
        <p className="article-desc">{typo(article.desc[lang])}</p>
        <div className="article-meta">
          <span>[{article.date[lang]}]</span>
        </div>
      </div>
    </div>
  );
}
