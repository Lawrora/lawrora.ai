import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "./components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://lawrora.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lawrora | AI Paralegal for Law Firms",
    template: "%s | Lawrora",
  },
  description:
    "Lawrora is your AI paralegal — capturing leads 24/7, qualifying clients instantly, matching them to the right attorney, and drafting legal documents in seconds. HIPAA & SOC 2 Type II compliant. Built for law firms.",
  keywords: [
    "AI paralegal",
    "legal AI software",
    "law firm automation",
    "legal intake software",
    "attorney matching",
    "demand letter generator",
    "legal lead capture",
    "HIPAA compliant legal software",
    "SOC 2 legal technology",
    "personal injury intake automation",
    "real estate law software",
    "AI legal assistant",
    "legal case management AI",
    "Lawrora",
    "AI for lawyers",
  ],
  authors: [{ name: "Lawrora", url: siteUrl }],
  creator: "Lawrora",
  publisher: "Lawrora",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Lawrora",
    title: "Lawrora | AI Paralegal for Law Firms",
    description:
      "Capture every lead. Match every client. Draft every document. Lawrora is the AI paralegal built for law firms — HIPAA & SOC 2 Type II compliant.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lawrora — AI Paralegal for Law Firms",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawrora | AI Paralegal for Law Firms",
    description:
      "Capture every lead. Match every client. Draft every document. The AI paralegal built for law firms.",
    images: ["/og-image.png"],
    creator: "@lawrora_ai",
    site: "@lawrora_ai",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Legal Technology",
  verification: {
    google: "lawrora-google-site-verification",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Lawrora",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
        width: 200,
        height: 60,
      },
      description:
        "Lawrora is an AI paralegal platform for law firms — capturing leads, qualifying clients, matching them to the right attorney, and drafting legal documents automatically. HIPAA & SOC 2 Type II compliant.",
      sameAs: [
        "https://x.com/lawrora_ai",
        "https://www.linkedin.com/company/lawrora/",
        "https://github.com/Lawrora",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "hello@lawrora.ai",
        availableLanguage: "English",
      },
      areaServed: {
        "@type": "Country",
        name: "United States",
      },
      knowsAbout: [
        "Legal Technology",
        "Artificial Intelligence",
        "Law Firm Management",
        "Legal Intake Automation",
        "Attorney Matching",
        "Legal Document Drafting",
        "HIPAA Compliance",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Lawrora",
      description: "AI Paralegal for Law Firms",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Lawrora",
      applicationCategory: "LegalService",
      operatingSystem: "Web",
      description:
        "AI-powered legal paralegal software for law firms. Features lead capture, client qualification, attorney matching, document drafting, case research, and scheduling.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Book a demo to get pricing for your firm",
      },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
