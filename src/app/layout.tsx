import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/dm-serif-display/400.css";
import "./globals.css";
import { profile } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ?? new URL("http://localhost:3000"),
  title: { default: `${profile.name} — Projects & experiments`, template: `%s · ${profile.name}` },
  description:
    "Explore Charles’s projects in AI, media, knowledge, developer tools, event discovery, and content automation.",
  openGraph: {
    title: `${profile.name} — Projects & experiments`,
    description: "Ideas, turned into useful things.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
