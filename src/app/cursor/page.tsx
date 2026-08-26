import type { Metadata } from "next";
import CursorLab from "./CursorLab";

export const metadata: Metadata = {
  title: "Курсори — вибір варіанта",
  robots: { index: false, follow: false },
};

export default function CursorPage() {
  return <CursorLab />;
}
