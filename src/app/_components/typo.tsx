import { Fragment, cloneElement, isValidElement, type ReactNode } from "react";

const NBSP = " ";
const APOS = "’"; // ’ — правильний апостроф і в українській, і в англійській

/* ──────────────────────────────────────────────────────────────
   Типографський прохід над готовим текстом.

   Сайт двомовний, і правила набору в двох мовах різні — не «майже
   однакові», а різні по суті. Тому мова визначається для кожного
   рядка окремо, за наявністю кирилиці, і далі до нього застосовується
   свій набір правил. Спільного лишається небагато.

   Прохід іде на рендері, а не в контенті: у файлах контенту й далі
   пишуть звичайну лапку й звичайний апостроф, а на сторінку виходять
   правильні знаки. Так не треба стежити за розкладкою в кожному рядку
   й неможливо забути.
   ────────────────────────────────────────────────────────────── */

const isCyrillic = (s: string) => /[Ѐ-ӿ]/.test(s);

/** ’ замість прямого апострофа: між літерами він завжди апостроф, а не лапка. */
function apostrophes(text: string): string {
  return text.replace(/(\p{L})'(\p{L})/gu, `$1${APOS}$2`);
}

/**
 * Прямі лапки → парні, за правилами мови рядка: «ялинки» в українській,
 * “англійські” в англійській.
 *
 * Тільки за парної кількості лапок. Непарна означає, що це не пара —
 * дюйми, код, обірваний фрагмент, — і тоді краще не чіпати нічого, ніж
 * поставити відкривальну лапку без закривальної.
 */
function quotes(text: string, cyrillic: boolean): string {
  const straight = (text.match(/"/g) || []).length;
  if (straight === 0 || straight % 2 !== 0) return text;
  const [open, close] = cyrillic ? ["«", "»"] : ["“", "”"];
  let opening = true;
  return text.replace(/"/g, () => {
    const mark = opening ? open : close;
    opening = !opening;
    return mark;
  });
}

/**
 * Нерозривні пробіли.
 *
 * Українською висячий однобуквений чи двобуквений прийменник у кінці рядка
 * вважається помилкою набору, тому «в», «у», «і», «з», «на», «до», «за»
 * тримаються наступного слова. Це правило мови, не смак.
 *
 * Англійською такого правила немає. Раніше тут в'язалися й однолітерні
 * «a» та «I» — за аналогією з українською, — але це перенесення чужого
 * правила: англійський набір спокійно лишає артикль у кінці рядка, а на
 * вузькій колонці кожен такий зв'язок вибиває дірку в правому краї.
 * Тому латиниця отримує тільки те, що справді не можна розривати.
 *
 * В обох мовах число тримається зі своєю одиницею (4 days, 40 екранів,
 * 5+ років), а тире не починає рядок.
 */
function nonBreaking(text: string, cyrillic: boolean): string {
  // Число разом з наступним словом
  let out = text.replace(/(\d+[+%]?)[ ](?=\S)/g, `$1${NBSP}`);

  // Тире не переходить на новий рядок само по собі: пробіл перед ним нерозривний
  out = out.replace(/[ ](?=[—–][ ])/g, NBSP);

  if (cyrillic) {
    // Слово з однієї-двох літер тримається наступного
    const short = /(^|[\s(«"'—–-])(\p{L}{1,2})[ ](?=\S)/gu;
    // Двічі: «і в тексті» — перший прохід з'їдає пробіл, потрібний другому
    out = out.replace(short, `$1$2${NBSP}`).replace(short, `$1$2${NBSP}`);
  }

  return out;
}

function typeset(text: string): string {
  const cyrillic = isCyrillic(text);
  return nonBreaking(quotes(apostrophes(text), cyrillic), cyrillic);
}

/**
 * Проходить дерево вузлів і обробляє кожен рядок. Елементи клонуються тільки
 * тоді, коли в них є діти, — інакше зламався б next/image та інші самозакриті.
 */
export function typo(node: ReactNode): ReactNode {
  if (typeof node === "string") return typeset(node);
  if (Array.isArray(node)) {
    return node.map((child, i) => <Fragment key={i}>{typo(child)}</Fragment>);
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    const kids = node.props.children;
    if (kids === undefined || kids === null) return node;
    return cloneElement(node, undefined, typo(kids));
  }
  return node;
}
