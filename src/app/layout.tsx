import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "mapbox-gl/dist/mapbox-gl.css";

import "@/app/globals.css";

import { SiteChrome } from "@/components/site-chrome";
import { AppToaster } from "@/components/ui/toaster";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "Elettricista a Bari e impianti elettrici",
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.siteName,
  manifest: siteConfig.manifestPath,
  openGraph: {
    title: siteConfig.siteName,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.siteName,
    locale: siteConfig.ogLocale,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.siteName} - impianti elettrici ed elettronici a Bari`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: siteConfig.domain,
    languages: {
      "it-IT": siteConfig.domain,
    },
  },
  icons: {
    icon: [{ url: "/favicon.jpg", type: "image/jpeg" }],
    shortcut: [{ url: "/favicon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/apple-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} font-sans`}>
        <SiteChrome>{children}</SiteChrome>
        <AppToaster />
      </body>
    </html>
  );
}
