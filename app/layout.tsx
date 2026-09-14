import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import JsonLd from "./JsonLd";
import "./globals.css";

const siteUrl = "https://mantleplatform.com/";
const title = "Mantle — Publish a multiplayer world in seconds";
const description = "Mantle is a platform built on Unreal Engine 5 where creators publish multiplayer worlds in seconds and players join instantly, with no downloads.";
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title: { default: title, template: "%s — Mantle" }, description,
  keywords: ["Mantle", "Unreal Engine 5", "multiplayer worlds", "UGC platform", "QBCore Studios"], authors: [{ name: "QBCore Studios" }], alternates: { canonical: siteUrl }, icons: { icon: "/assets/mantle-logo.png" },
  openGraph: { type: "website", url: siteUrl, siteName: "Mantle", title, description, images: [{ url: "/assets/mantle-logo.png", alt: "Mantle" }] },
  twitter: { card: "summary", title, description, images: ["/assets/mantle-logo.png"] },
};
export const viewport: Viewport = { themeColor: "#090c13", colorScheme: "dark" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}><body><JsonLd /><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>;
}
