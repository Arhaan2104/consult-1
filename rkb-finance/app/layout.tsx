import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import MotionProvider from "@/components/MotionProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/content/site";

// Plus Jakarta Sans — the site family, one variable grotesque for display
// and body. Heavy weights carry the headlines; the geometry stays clean.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// EB Garamond — a classic, high-legibility serif used sparingly as a "engraved"
// accent (e.g. the term text on the metal loan card), for a premium, classy feel.
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rkbfinance.in"),
  title: {
    default: "R.K. Bansal Finance: Personal lending since 1984",
    template: "%s · R.K. Bansal Finance",
  },
  description:
    "R.K. Bansal Finance Private Limited, an RBI-registered NBFC empowering borrowers to meet all their financial needs. Transparent, fully digital personal lending since 1984.",
  keywords: [
    "R.K. Bansal Finance",
    "NBFC",
    "personal loan",
    "short term loan",
    "RBI registered",
    "instant loan India",
  ],
  applicationName: site.name,
  openGraph: {
    type: "website",
    title: "R.K. Bansal Finance: Personal lending since 1984",
    description:
      "An RBI-registered NBFC. Transparent, fully digital personal lending since 1984.",
    siteName: site.legalName,
    locale: "en_IN",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "R.K. Bansal Finance: Personal lending since 1984",
    description:
      "An RBI-registered NBFC. Transparent, fully digital personal lending since 1984.",
  },
  appleWebApp: {
    capable: true,
    title: site.short,
    statusBarStyle: "black-translucent",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#081c38",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${geistMono.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas">
        {/* Vertical framing rails bounding the content column, run full-page. */}
        <div className="page-rails" aria-hidden />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>
        <LenisProvider>
          <MotionProvider>
            <ScrollProgressBar />
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </MotionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
