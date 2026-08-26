import type { Metadata } from "next";
import { HomePage } from "../_components/HomePage";
import { homeMetadata } from "../home-metadata";

/* Українська версія головної. Та сама сторінка, той самий компонент — різна
   тільки мова, і саме тому в неї власна адреса: інакше цей текст не існує
   для пошуку й ним не можна поділитись. */
export const metadata: Metadata = homeMetadata("uk");

export default function HomeUk() {
  return <HomePage lang="uk" />;
}
