import type { Metadata, Viewport } from "next";
import {
  Libre_Caslon_Display,
  Libre_Caslon_Text,
  Manrope,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import MotionProvider from "@/components/MotionProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/content/site";

// Libre Caslon — the foundational English book/legal serif. Display cut for
// large headlines; Text cut (sturdier, lower contrast) for smaller serif set,
// mirroring the optical-size behaviour we relied on before.
const caslonDisplay = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caslon-display",
  display: "swap",
});

const caslonText = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-caslon-text",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rkbfinance.in"),
  title: {
    default: "R.K. Bansal Finance — Personal lending since 1984",
    template: "%s · R.K. Bansal Finance",
  },
  description:
    "R.K. Bansal Finance Private Limited — an RBI-registered NBFC empowering borrowers to meet all their financial needs. Transparent, fully digital personal lending since 1984.",
  keywords: [
    "R.K. Bansal Finance",
    "NBFC",
    "personal loan",
    "short term loan",
    "RBI registered",
    "instant loan India",
  ],
  openGraph: {
    type: "website",
    title: "R.K. Bansal Finance — Personal lending since 1984",
    description:
      "An RBI-registered NBFC. Transparent, fully digital personal lending since 1984.",
    siteName: site.legalName,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f2",
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
      className={`${caslonDisplay.variable} ${caslonText.variable} ${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas">
        {/* Brand-blue frame hugging all four viewport edges (see .site-frame). */}
        <div className="site-frame" aria-hidden />
        {/* Vertical framing rails bounding the content column, run full-page. */}
        <div className="page-rails" aria-hidden />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>
        <LenisProvider>
          <ScrollProgressBar />
          <MotionProvider>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
          </MotionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
