import Image from "next/image";
import type { CSSProperties } from "react";

import type { Article, Lang } from "./lang-content";

/* Anything off sihetii.com is flagged so its title can show the leaves-the-site arrow. */
const isExternal = (href: string) => /^https?:\/\//.test(href);

/* One row of the Articles list: a photographed newsprint sheet with the platform's
   masthead printed on it, then the title, blurb and date. Kept in its own file so the
   article pages can render the same card instead of restating its markup. */
export function ArticleCard({ article, lang }: { article: Article; lang: Lang }) {
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
        <Image
          src={article.logo.src}
          alt={article.source}
          width={article.logo.width}
          height={article.logo.height}
          className="article-logo"
          style={{ "--logo-scale": article.logo.scale } as CSSProperties}
        />
      </div>
      <div className="article-body">
        <a
          href={article.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            isExternal(article.href)
              ? "item-title item-title--external"
              : "item-title"
          }
        >
          <span className="link-mark">{article.title[lang]}</span>
        </a>
        <p className="article-desc">{article.desc[lang]}</p>
        <div className="article-meta">
          <span>[{article.date[lang]}]</span>
        </div>
      </div>
    </div>
  );
}
