import type { Metadata } from "next";
import Portfolio from "@/components/portfolio";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  ...(siteUrl ? { alternates: { canonical: siteUrl.href } } : {}),
};
export default function Home() {
  return <Portfolio />;
}
