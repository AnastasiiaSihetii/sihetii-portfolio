import type { ReactNode } from "react";
import styles from "./editorial.module.css";

/**
 * Посилання, що веде за межі сайту.
 * Той самий вигляд, що й у посилань на головній: ховер заливає слова
 * прямокутником, стрілка проявляється. Заливка тримається на внутрішньому
 * span — фон на самому <a> розтягнувся б на всю колонку.
 */
export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
      <span className={styles.mark}>{children}</span>
    </a>
  );
}
