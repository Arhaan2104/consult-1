import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import MotionProvider from "@/components/MotionProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { site } from "@/content/site";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

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

export const metadata: Metadata = {
  metadataBase: new URL("https://avafinances.com"),
  title: {
    default: "AVA Finance — Tailored, smart, fast financing",
    template: "%s · AVA Finance",
  },
  description:
    "AVA Finance Private Limited — an RBI-registered NBFC and technology-driven lending platform. Instant access to funds with transparent terms. 157k+ customers served.",
  keywords: [
    "AVA Finance",
    "Kamakshi Money",
    "NBFC",
    "personal loan",
    "instant loan",
    "RBI registered",
    "fintech India",
  ],
  openGraph: {
    type: "website",
    title: "AVA Finance — Tailored, smart, fast financing",
    description:
      "An RBI-registered NBFC and technology-driven lending platform. Instant access to funds with transparent terms.",
    siteName: site.legalName,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${jakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas">
        <SmoothScroll />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-none focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
