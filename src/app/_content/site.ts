/** Дані, які повторюються на кожній сторінці. Одне місце, щоб міняти в одному. */
export const EMAIL = "anastasiia.sihetii@gmail.com";
export const AUTHOR = "Анастасія Сігетій";

/** Резюме лежить у public/, тому шлях від кореня сайту. Файл міняємо на місці —
 *  адреса лишається тією самою для всіх, кому її вже дали. */
export const CV_PATH = "/anastasiia-sihetii-cv.pdf";

/** Стаття-дослідження тимчасово знята з сайту: її немає ні на головній, ні в
 *  «Інших роботах», ні в мапі сайту. Повернути — поставити false. */
export const HIDE_RESEARCH_ARTICLE = true;

/** Адреси статті обома мовами — за ними її й ховаємо зі списків. */
export const RESEARCH_ARTICLE_PATH = "articles/design-engineer-2026";

/** Профілі поза сайтом. Один список на дві поверхні: підвал головної і меню
 *  шапки внутрішніх сторінок. Порядок відрефлексований — спершу те, на що
 *  дивиться рекрутер, далі майданчики робіт, останнім прямий контакт. */
export const PROFILES = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anastasiia-sihetii/" },
  { label: "GitHub", href: "https://github.com/AnastasiiaSihetii" },
  { label: "Dou", href: "https://dou.ua/users/anastasiya-sigetij/" },
  { label: "Behance", href: "https://www.behance.net/anastasiiasihetii" },
  { label: "Dribbble", href: "https://dribbble.com/anastasiia_sihetii" },
  { label: "WhatsApp", href: "https://wa.me/380683540164" },
] as const;

