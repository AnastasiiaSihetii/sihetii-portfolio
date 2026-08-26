import type { Metadata } from "next";
import { HomePage } from "./_components/HomePage";
import { homeMetadata } from "./home-metadata";

export const metadata: Metadata = homeMetadata("en");

export default function Home() {
  return <HomePage lang="en" />;
}
